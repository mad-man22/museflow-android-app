import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated, Dimensions, Platform, ActivityIndicator, Modal, TextInput, Alert, PanResponder, LayoutRectangle } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Play, Pause, SkipForward, SkipBack, Heart, Shuffle, Repeat, ChevronDown, ListMusic, AlignLeft, Volume2, VolumeX, Plus, FolderHeart, GripVertical } from 'lucide-react-native';
import { usePlaybackStore, isNativeVolumeManagerAvailable, VolumeManager } from '../store/usePlaybackStore';
import { useShallow } from 'zustand/react/shallow';
import { LyricsService, LyricsResponse } from '../services/lyrics';
import { Track } from '../services/ytmusic';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const MINI_PLAYER_HEIGHT = 64;

interface LyricLine {
  time: number;
  text: string;
}

const cleanDisplayArtist = (artistName: string): string => {
  if (!artistName) return '';
  return artistName.replace(/^(Song|Video|Artist|Album|Single|Playlist)\s*/i, '');
};

export default function PersistentPlayer() {
  // --- SELECTIVE SUBSCRIPTIONS (prevents re-render every 100ms) ---
  // Static track info & controls - only re-renders when track/mode changes
  const { currentTrack, isPlaying, isBuffering, queue, currentIndex, isRepeat, isShuffle } =
    usePlaybackStore(useShallow((s) => ({
      currentTrack: s.currentTrack,
      isPlaying: s.isPlaying,
      isBuffering: s.isBuffering,
      queue: s.queue,
      currentIndex: s.currentIndex,
      isRepeat: s.isRepeat,
      isShuffle: s.isShuffle,
    })));

  // Actions - stable references, never cause re-renders
  const togglePlay = usePlaybackStore((s) => s.togglePlay);
  const nextTrack = usePlaybackStore((s) => s.nextTrack);
  const prevTrack = usePlaybackStore((s) => s.prevTrack);
  const removeFromQueue = usePlaybackStore((s) => s.removeFromQueue);

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'lyrics' | 'queue'>('lyrics');
  const [isLiked, setIsLiked] = useState(false);

  // Layout refs for accurate slider math
  const progressBarLayout = useRef<LayoutRectangle | null>(null);
  const volumeBarLayout = useRef<LayoutRectangle | null>(null);

  // ── Drag-to-reorder (all refs = zero re-renders during gesture) ──
  const QUEUE_ROW_HEIGHT = 62; // row height + margin
  const dragTranslateY = useRef(new Animated.Value(0)).current;
  const dragActiveIndex = useRef(-1);       // which item is being dragged
  const dragDropIndex = useRef(-1);         // which slot we'd drop into
  const queueRef = useRef(queue);           // live queue without stale closure
  const currentIndexRef = useRef(currentIndex);
  const [dragState, setDragState] = useState<{ active: number; target: number } | null>(null);
  // keep refs in sync each render
  useEffect(() => { queueRef.current = queue; }, [queue]);
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);
  
  // Playlist selector modal states
  const [playlistModalVisible, setPlaylistModalVisible] = useState(false);
  const [playlists, setPlaylists] = useState<Array<{ id: string; name: string; tracks: Track[] }>>([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  
  // Animated translation for expanding sheet
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Toggle slide up/down animation
  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isExpanded ? 0 : SCREEN_HEIGHT - MINI_PLAYER_HEIGHT - 65, // Adjust for bottom tab nav offset
      useNativeDriver: true,
      tension: 40,
      friction: 8
    }).start();
  }, [isExpanded]);

  // Track changed: check like and save history
  useEffect(() => {
    if (currentTrack) {
      checkLikeStatus(currentTrack.track_id);
      saveToHistory(currentTrack);
    }
  }, [currentTrack]);

  // Listen for system volume changes in real-time
  useEffect(() => {
    if (isNativeVolumeManagerAvailable()) {
      const volumeListener = VolumeManager.addVolumeListener((result: any) => {
        usePlaybackStore.setState({ volume: result.volume, isMuted: result.volume === 0 });
      });
      return () => volumeListener.remove();
    }
  }, []);

  const checkLikeStatus = async (trackId: string) => {
    try {
      const favsRaw = await AsyncStorage.getItem('museflow_favorites');
      const favs = favsRaw ? JSON.parse(favsRaw) : [];
      setIsLiked(favs.some((t: Track) => t.track_id === trackId));
    } catch (e) {
      console.warn("Failed to check favorite status:", e);
    }
  };

  const toggleLike = async () => {
    if (!currentTrack) return;
    try {
      const favsRaw = await AsyncStorage.getItem('museflow_favorites');
      let favs = favsRaw ? JSON.parse(favsRaw) : [];
      
      if (isLiked) {
        favs = favs.filter((t: Track) => t.track_id !== currentTrack.track_id);
        setIsLiked(false);
      } else {
        favs.push(currentTrack);
        setIsLiked(true);
      }
      await AsyncStorage.setItem('museflow_favorites', JSON.stringify(favs));
    } catch (e) {
      console.warn("Failed to save favorite:", e);
    }
  };

  const saveToHistory = async (track: Track) => {
    try {
      const historyRaw = await AsyncStorage.getItem('museflow_history');
      let history = historyRaw ? JSON.parse(historyRaw) : [];
      
      // Filter duplicates
      history = history.filter((t: Track) => t.track_id !== track.track_id);
      // Prepend to front
      history.unshift(track);
      
      await AsyncStorage.setItem('museflow_history', JSON.stringify(history.slice(0, 30)));
    } catch (e) {
      console.warn("Failed to save history:", e);
    }
  };

  const handleAddToPlaylistPrompt = async () => {
    if (!currentTrack) return;
    try {
      const playlistsRaw = await AsyncStorage.getItem('museflow_playlists');
      const currentPlaylists = playlistsRaw ? JSON.parse(playlistsRaw) : [];
      setPlaylists(currentPlaylists);
      setPlaylistModalVisible(true);
      setIsCreatingNew(false);
      setNewPlaylistName('');
    } catch (e) {
      console.warn('Failed to load playlists:', e);
    }
  };

  const addTrackToPlaylist = async (playlistId: string, playlistName: string) => {
    if (!currentTrack) return;
    try {
      const playlistsRaw = await AsyncStorage.getItem('museflow_playlists');
      const currentPlaylists = playlistsRaw ? JSON.parse(playlistsRaw) : [];
      
      const updated = currentPlaylists.map((p: any) => {
        if (p.id === playlistId) {
          const trackExists = p.tracks.some((t: Track) => t.track_id === currentTrack.track_id);
          if (trackExists) return p;
          return { ...p, tracks: [...p.tracks, currentTrack] };
        }
        return p;
      });

      await AsyncStorage.setItem('museflow_playlists', JSON.stringify(updated));
      setPlaylistModalVisible(false);
      Alert.alert('Success', `Track added to "${playlistName}"`);
    } catch (e) {
      Alert.alert('Error', 'Failed to add track.');
    }
  };

  const handleCreateAndAdd = async () => {
    if (!newPlaylistName.trim() || !currentTrack) return;
    try {
      const playlistsRaw = await AsyncStorage.getItem('museflow_playlists');
      const currentPlaylists = playlistsRaw ? JSON.parse(playlistsRaw) : [];
      
      const newPlaylist = {
        id: Date.now().toString(),
        name: newPlaylistName.trim(),
        tracks: [currentTrack]
      };

      const updated = [...currentPlaylists, newPlaylist];
      await AsyncStorage.setItem('museflow_playlists', JSON.stringify(updated));
      setPlaylistModalVisible(false);
      Alert.alert('Success', `Created and added to "${newPlaylist.name}"`);
    } catch (e) {
      Alert.alert('Error', 'Failed to create playlist.');
    }
  };



  // Build one stable PanResponder per queue item index.
  // Uses refs to read live values — never stale, never recreated.
  const makeDragResponder = useCallback((idx: number) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 4,
      onPanResponderGrant: () => {
        dragActiveIndex.current = idx;
        dragDropIndex.current = idx;
        dragTranslateY.setValue(0);
        dragTranslateY.setOffset(0);
        setDragState({ active: idx, target: idx });
      },
      onPanResponderMove: (_, gestureState) => {
        dragTranslateY.setValue(gestureState.dy);
        const rawTarget = idx + Math.round(gestureState.dy / QUEUE_ROW_HEIGHT);
        const clampedTarget = Math.max(0, Math.min(queueRef.current.length - 1, rawTarget));
        if (clampedTarget !== dragDropIndex.current) {
          dragDropIndex.current = clampedTarget;
          setDragState({ active: idx, target: clampedTarget });
        }
      },
      onPanResponderRelease: () => {
        dragTranslateY.flattenOffset();
        const fromIdx = dragActiveIndex.current;
        const toIdx = dragDropIndex.current;
        dragActiveIndex.current = -1;
        dragDropIndex.current = -1;
        setDragState(null);
        Animated.timing(dragTranslateY, {
          toValue: 0,
          duration: 120,
          useNativeDriver: false,
        }).start(() => {
          dragTranslateY.setValue(0);
          if (fromIdx !== toIdx) {
            const q = [...queueRef.current];
            const [moved] = q.splice(fromIdx, 1);
            q.splice(toIdx, 0, moved);
            let newCI = currentIndexRef.current;
            if (fromIdx === newCI) newCI = toIdx;
            else if (fromIdx < newCI && toIdx >= newCI) newCI--;
            else if (fromIdx > newCI && toIdx <= newCI) newCI++;
            usePlaybackStore.getState().reorderQueue(q, newCI);
          }
        });
      },
      onPanResponderTerminate: () => {
        Animated.timing(dragTranslateY, { toValue: 0, duration: 80, useNativeDriver: false }).start();
        dragActiveIndex.current = -1;
        dragDropIndex.current = -1;
        setDragState(null);
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty: uses refs for live values

  // Stable responders map — built once per queue item, stable as long as length doesn't change
  const dragResponders = useRef<ReturnType<typeof PanResponder.create>[]>([]);
  useEffect(() => {
    dragResponders.current = queue.map((_, i) => makeDragResponder(i));
  }, [queue.length, makeDragResponder]);

  if (!currentTrack) return null;

  return (
    <Animated.View pointerEvents="box-none" style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
      
      {/* ─── MINI PLAYER (DOCKED BAR) ─── */}
      {!isExpanded && (
        <TouchableOpacity style={styles.miniPlayer} activeOpacity={0.9} onPress={() => setIsExpanded(true)}>
          <Image source={{ uri: currentTrack.thumbnail }} style={styles.miniImage as any} />
          
          <View style={styles.miniDetails}>
            <Text style={styles.miniTitle} numberOfLines={1}>{currentTrack.title}</Text>
            <Text style={styles.miniSubtitle} numberOfLines={1}>{cleanDisplayArtist(currentTrack.artists)}</Text>
          </View>

          {isBuffering && !isPlaying ? (
            <ActivityIndicator size="small" color="#a855f7" style={styles.miniActionBtn} />
          ) : (
            <TouchableOpacity style={styles.miniActionBtn} onPress={togglePlay}>
              {isPlaying ? <Pause size={20} color="#ffffff" /> : <Play size={20} color="#ffffff" style={{ marginLeft: 2 }} />}
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.miniActionBtn} onPress={nextTrack}>
            <SkipForward size={20} color="#ffffff" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      {/* ─── FULLSCREEN EXPANDED PLAYER ─── */}
      {isExpanded && (
        <View style={styles.expandedContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setIsExpanded(false)} style={styles.headerBtn}>
              <ChevronDown size={28} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>Now Playing</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <TouchableOpacity onPress={toggleLike} style={styles.headerBtn}>
                <Heart size={22} color={isLiked ? "#f43f5e" : "#ffffff"} fill={isLiked ? "#f43f5e" : "transparent"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddToPlaylistPrompt} style={styles.headerBtn}>
                <Plus size={22} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Dynamic tabs selector */}
          <View style={styles.playerTabs}>
            <TouchableOpacity 
              style={[styles.playerTab, activeTab === 'lyrics' && styles.activePlayerTab]} 
              onPress={() => setActiveTab('lyrics')}
            >
              <AlignLeft size={16} color={activeTab === 'lyrics' ? '#a855f7' : '#a1a1aa'} />
              <Text style={[styles.playerTabText, activeTab === 'lyrics' && styles.activePlayerTabText]}>Lyrics</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.playerTab, activeTab === 'queue' && styles.activePlayerTab]} 
              onPress={() => setActiveTab('queue')}
            >
              <ListMusic size={16} color={activeTab === 'queue' ? '#a855f7' : '#a1a1aa'} />
              <Text style={[styles.playerTabText, activeTab === 'queue' && styles.activePlayerTabText]}>Queue ({queue.length})</Text>
            </TouchableOpacity>
          </View>

          {/* Main Content Area */}
          <View style={styles.mainContent}>
            
            {/* Tab: Lyrics */}
            {activeTab === 'lyrics' && (
              <LyricsDisplay />
            )}

            {/* Tab: Queue */}
            {activeTab === 'queue' && (
              <View style={styles.queueContainer}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 50 }}
                  scrollEnabled={dragState === null}
                >
                  {queue.map((track, idx) => {
                    const isCurrent = idx === currentIndex;
                    const isBeingDragged = dragState?.active === idx;
                    const isDropTarget = dragState !== null && dragState.target === idx && dragState.active !== idx;
                    const responder = dragResponders.current[idx];

                    return (
                      <View key={track.track_id + idx}>
                        {/* Drop target insertion line — appears above target slot */}
                        {isDropTarget && dragState!.active > idx && (
                          <View style={styles.dropLine} />
                        )}

                        <Animated.View
                          style={[
                            styles.queueRow,
                            isCurrent && styles.activeQueueRow,
                            isBeingDragged && styles.draggingQueueRow,
                            isBeingDragged && {
                              transform: [{ translateY: dragTranslateY }],
                              zIndex: 999,
                            },
                          ]}
                        >
                          {/* Drag handle — only this zone activates the pan responder */}
                          {responder && (
                            <View
                              {...responder.panHandlers}
                              style={styles.dragHandle}
                              hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
                            >
                              <GripVertical size={18} color={isBeingDragged ? '#a855f7' : '#3f3f46'} />
                            </View>
                          )}

                          <Image source={{ uri: track.thumbnail }} style={styles.queueImage as any} />
                          <TouchableOpacity
                            style={styles.queueMeta}
                            onPress={() => {
                              if (dragState) return; // ignore taps while dragging
                              usePlaybackStore.getState().setQueue(queue, idx);
                            }}
                          >
                            <Text style={[styles.queueTitle, isCurrent && styles.activeQueueText]} numberOfLines={1}>
                              {track.title}
                            </Text>
                            <Text style={styles.queueSubtitle} numberOfLines={1}>
                              {cleanDisplayArtist(track.artists)}
                            </Text>
                          </TouchableOpacity>

                          {isCurrent ? (
                            <View style={styles.nowPlayingDot} />
                          ) : (
                            <TouchableOpacity
                              onPress={() => removeFromQueue(track.track_id)}
                              style={styles.queueDelete}
                              disabled={dragState !== null}
                            >
                              <ChevronDown size={18} color="#ef4444" style={{ transform: [{ rotate: '45deg' }] }} />
                            </TouchableOpacity>
                          )}
                        </Animated.View>

                        {/* Drop target insertion line — appears below target slot */}
                        {isDropTarget && dragState!.active < idx && (
                          <View style={styles.dropLine} />
                        )}
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Interactive Artwork Details */}
          <View style={styles.playerMetaWrapper}>
            <Image source={{ uri: currentTrack.thumbnail }} style={styles.artworkImage as any} />
            <View style={styles.metaTextWrapper}>
              <Text style={styles.metaTitle} numberOfLines={1}>{currentTrack.title}</Text>
              <Text style={styles.metaSubtitle} numberOfLines={1}>{cleanDisplayArtist(currentTrack.artists)}</Text>
            </View>
          </View>

          {/* Audio Progress Scrubber */}
          <ProgressScrubber />

          {/* Playback Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity onPress={usePlaybackStore.getState().toggleShuffle} style={styles.subControlBtn}>
              <Shuffle size={20} color={isShuffle ? "#a855f7" : "#71717a"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={prevTrack} style={styles.controlBtn}>
              <SkipBack size={26} color="#ffffff" fill="#ffffff" />
            </TouchableOpacity>

            {isBuffering && !isPlaying ? (
              <View style={styles.playPauseWrapper}>
                <ActivityIndicator size="small" color="#000000" />
              </View>
            ) : (
              <TouchableOpacity onPress={togglePlay} style={styles.playPauseBtn}>
                {isPlaying ? (
                  <Pause size={30} color="#000000" fill="#000000" />
                ) : (
                  <Play size={30} color="#000000" fill="#000000" />
                )}
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={nextTrack} style={styles.controlBtn}>
              <SkipForward size={26} color="#ffffff" fill="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity onPress={usePlaybackStore.getState().toggleRepeat} style={styles.subControlBtn}>
              <Repeat size={20} color={isRepeat !== 'none' ? "#a855f7" : "#71717a"} />
              {isRepeat === 'one' && <Text style={styles.repeatBadge}>1</Text>}
            </TouchableOpacity>
          </View>

          {/* Volume Control */}
          <VolumeScrubber />
        </View>
      )}
      {/* Add to Playlist Modal */}
      <Modal
        visible={playlistModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPlaylistModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {isCreatingNew ? (
              <View>
                <Text style={styles.modalHeader}>Create Playlist</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Vibe name (e.g. Chill Coding)"
                  placeholderTextColor="#71717a"
                  value={newPlaylistName}
                  onChangeText={setNewPlaylistName}
                  autoFocus
                />
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
                  <TouchableOpacity 
                    style={[styles.cancelModalBtn, { flex: 1, marginTop: 0 }]} 
                    onPress={() => setIsCreatingNew(false)}
                  >
                    <Text style={styles.cancelModalBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.createModalBtn, { flex: 1 }]} 
                    onPress={handleCreateAndAdd}
                  >
                    <Text style={styles.createModalBtnText}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.modalHeader}>Select Playlist</Text>
                
                {playlists.length === 0 ? (
                  <View style={styles.modalEmpty}>
                    <Text style={styles.modalEmptyText}>No Playlists Found</Text>
                    <Text style={styles.modalEmptySubtitle}>Create a new vibe playlist directly below.</Text>
                  </View>
                ) : (
                  <ScrollView style={{ maxHeight: 200, marginVertical: 10 }} showsVerticalScrollIndicator={false}>
                    {playlists.map((item) => (
                      <TouchableOpacity 
                        key={item.id} 
                        style={styles.modalPlaylistItem}
                        onPress={() => addTrackToPlaylist(item.id, item.name)}
                      >
                        <FolderHeart size={18} color="#a855f7" style={{ marginRight: 10 }} />
                        <Text style={styles.modalPlaylistName} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.modalPlaylistCount}>{item.tracks.length} tracks</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}

                <TouchableOpacity 
                  style={styles.modalCreateTrigger} 
                  onPress={() => setIsCreatingNew(true)}
                >
                  <Plus size={16} color="#ffffff" style={{ marginRight: 8 }} />
                  <Text style={styles.modalCreateTriggerText}>Create New Playlist</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelModalBtn} onPress={() => setPlaylistModalVisible(false)}>
                  <Text style={styles.cancelModalBtnText}>Close</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

// Helper time formatter
const formatTime = (secs: number) => {
  if (isNaN(secs)) return "0:00";
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Sub-Component 1: ProgressScrubber (Isolates 100ms progress re-renders and handles smooth scrubbing via Animated.Value)
const ProgressScrubber = memo(() => {
  const duration = usePlaybackStore((s) => s.duration);
  const seekTo = usePlaybackStore((s) => s.seekTo);

  const progressRatio = useRef(new Animated.Value(0)).current;
  const isDragging = useRef(false);
  const dragRatio = useRef(0);
  const progressBarLayout = useRef<LayoutRectangle | null>(null);

  // Time text state (isolated to this component to keep it light)
  const [scrubTime, setScrubTime] = useState<number | null>(null);

  const storeTime = usePlaybackStore((s) => s.currentTime);
  const activeTime = scrubTime !== null ? scrubTime : storeTime;

  // Sync animation value with playing time when not dragging
  useEffect(() => {
    if (!isDragging.current && duration > 0) {
      progressRatio.setValue(storeTime / duration);
    }
  }, [storeTime, duration]);

  // handleTouchRef is overwritten on EVERY render with fresh duration/setScrubTime.
  // The stable panResponder (created once via useRef) always calls handleTouchRef.current()
  // to get the latest values — this fixes the stale-closure bug where duration was frozen at 0.
  const handleTouchRef = useRef<(pageX: number) => void>(() => {});
  handleTouchRef.current = (pageX: number) => {
    const currentDuration = usePlaybackStore.getState().duration;
    if (!currentDuration || !progressBarLayout.current) return;
    const { x, width } = progressBarLayout.current;
    const ratio = Math.max(0, Math.min(1, (pageX - x) / width));
    dragRatio.current = ratio;
    progressRatio.setValue(ratio);
    const calculatedTime = ratio * currentDuration;
    setScrubTime(calculatedTime);
    usePlaybackStore.getState().updateCurrentTime(calculatedTime);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        isDragging.current = true;
        usePlaybackStore.getState().setIsScrubbing(true);
        handleTouchRef.current(e.nativeEvent.pageX);
      },
      onPanResponderMove: (e) => {
        handleTouchRef.current(e.nativeEvent.pageX);
      },
      onPanResponderRelease: () => {
        isDragging.current = false;
        // seekTo internally holds isScrubbing=true until the native player
        // confirms the new position. Do NOT call setIsScrubbing(false) here.
        seekTo(dragRatio.current * usePlaybackStore.getState().duration);
        setScrubTime(null);
      },
      onPanResponderTerminate: () => {
        // Gesture stolen (e.g. by a scroll view). Snap back and release lock.
        isDragging.current = false;
        setScrubTime(null);
        usePlaybackStore.getState().setIsScrubbing(false);
        const { currentTime: c, duration: d } = usePlaybackStore.getState();
        if (d > 0) progressRatio.setValue(c / d);
      },
    })
  ).current;

  const fillWidth = progressRatio.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.scrubberWrapper}>
      <View
        style={styles.progressBar}
        onLayout={(e) => { progressBarLayout.current = e.nativeEvent.layout; }}
        {...panResponder.panHandlers}
      >
        <View style={styles.progressBg} pointerEvents="none">
          <Animated.View
            style={[
              styles.progressFill,
              { width: fillWidth }
            ]}
          />
        </View>
        <Animated.View
          style={[
            styles.progressKnob,
            { left: fillWidth }
          ]}
          pointerEvents="none"
        />
      </View>
      <View style={styles.timeLabelRow}>
        <Text style={styles.timeLabel}>{formatTime(activeTime)}</Text>
        <Text style={styles.timeLabel}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
});

// Sub-Component 2: VolumeScrubber (Isolates volume changes and handles smooth dragging via Animated.Value)
const VolumeScrubber = memo(() => {
  const storeVolume = usePlaybackStore((s) => s.volume);
  const isMuted = usePlaybackStore((s) => s.isMuted);
  const setVolume = usePlaybackStore((s) => s.setVolume);
  const toggleMute = usePlaybackStore((s) => s.toggleMute);

  const volumeRatio = useRef(new Animated.Value(0)).current;
  const isDragging = useRef(false);
  const dragVolume = useRef(0);
  const volumeBarLayout = useRef<LayoutRectangle | null>(null);

  // Sync animation value with store volume when not dragging
  useEffect(() => {
    if (!isDragging.current) {
      volumeRatio.setValue(isMuted ? 0 : storeVolume);
    }
  }, [storeVolume, isMuted]);

  // handleTouchRef is overwritten every render — fixes stale closure over setVolume
  const handleTouchRef = useRef<(pageX: number) => void>(() => {});
  handleTouchRef.current = (pageX: number) => {
    if (!volumeBarLayout.current) return;
    const { x, width } = volumeBarLayout.current;
    const ratio = Math.max(0, Math.min(1, (pageX - x) / width));
    dragVolume.current = ratio;
    volumeRatio.setValue(ratio);
    usePlaybackStore.getState().setVolume(ratio);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        isDragging.current = true;
        handleTouchRef.current(e.nativeEvent.pageX);
      },
      onPanResponderMove: (e) => {
        handleTouchRef.current(e.nativeEvent.pageX);
      },
      onPanResponderRelease: () => {
        isDragging.current = false;
        usePlaybackStore.getState().setVolume(dragVolume.current);
      },
      onPanResponderTerminate: () => {
        isDragging.current = false;
        const { isMuted: m, volume: v } = usePlaybackStore.getState();
        volumeRatio.setValue(m ? 0 : v);
      },
    })
  ).current;

  const fillWidth = volumeRatio.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.volumeRow}>
      <TouchableOpacity onPress={toggleMute} style={{ padding: 4 }}>
        {isMuted ? <VolumeX size={18} color="#71717a" /> : <Volume2 size={18} color="#71717a" />}
      </TouchableOpacity>
      <View
        style={styles.volumeBar}
        onLayout={(e) => { volumeBarLayout.current = e.nativeEvent.layout; }}
        {...panResponder.panHandlers}
      >
        <View style={styles.volumeBg} pointerEvents="none">
          <Animated.View style={[styles.volumeFill, { width: fillWidth }]} />
        </View>
        <Animated.View
          style={[
            styles.volumeKnob,
            { left: fillWidth }
          ]}
          pointerEvents="none"
        />
      </View>
    </View>
  );
});

interface LyricListProps {
  lyrics: Array<{ time: number; text: string }>;
  activeLyricIndex: number;
  lineOffsets: React.MutableRefObject<number[]>;
  lyricsScrollRef: React.RefObject<ScrollView | null>;
}
const LyricList = memo(({ lyrics, activeLyricIndex, lineOffsets, lyricsScrollRef }: LyricListProps) => {
  return (
    <ScrollView 
      ref={lyricsScrollRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 180, paddingHorizontal: 10 }}
    >
      {lyrics.map((line, idx) => {
        const isActive = idx === activeLyricIndex;
        return (
          <Text 
            key={idx} 
            onLayout={(e) => {
              lineOffsets.current[idx] = e.nativeEvent.layout.y;
            }}
            style={[styles.lyricLine, isActive && styles.activeLyricLine]}
          >
            {line.text}
          </Text>
        );
      })}
    </ScrollView>
  );
});

// Sub-Component 3: LyricsDisplay (Isolates lyrics sync scrolling and highlighting)
const LyricsDisplay = memo(() => {
  const currentTrack = usePlaybackStore((s) => s.currentTrack);
  const currentTime = usePlaybackStore((s) => s.currentTime);
  const duration = usePlaybackStore((s) => s.duration);

  const [lyrics, setLyrics] = useState<Array<{ time: number; text: string }>>([]);
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [activeLyricIndex, setActiveLyricIndex] = useState(-1);
  const lyricsScrollRef = useRef<ScrollView>(null);
  const lineOffsets = useRef<number[]>([]);

  // Load lyrics reactively when currentTrack changes
  const lastFetchedTrackId = useRef<string | null>(null);
  useEffect(() => {
    if (currentTrack) {
      if (lastFetchedTrackId.current !== currentTrack.track_id) {
        lastFetchedTrackId.current = currentTrack.track_id;
        loadTrackLyrics(currentTrack);
      }
    }
  }, [currentTrack]);

  // Sync lyrics scroll with 300ms look-ahead to compensate for Scroll animation lag
  useEffect(() => {
    if (lyrics.length > 0 && currentTime > 0) {
      const timeWithOffset = currentTime + 0.3; // 300ms look-ahead offset
      const idx = lyrics.findIndex((line, i) => {
        const nextLine = lyrics[i + 1];
        return timeWithOffset >= line.time && (!nextLine || timeWithOffset < nextLine.time);
      });

      if (idx !== -1 && idx !== activeLyricIndex) {
        setActiveLyricIndex(idx);
        if (lyricsScrollRef.current) {
          const targetY = lineOffsets.current[idx];
          lyricsScrollRef.current.scrollTo({
            y: targetY !== undefined ? targetY - 140 : idx * 40 - 120,
            animated: true
          });
        }
      }
    }
  }, [currentTime, lyrics, activeLyricIndex]);

  const loadTrackLyrics = async (track: Track) => {
    setLyrics([]);
    setLyricsLoading(true);
    setActiveLyricIndex(-1);
    lineOffsets.current = [];

    try {
      const activeDuration = track.duration || duration || 180;
      const data = await LyricsService.getLyrics(track.track_id, track.title, track.artists, activeDuration);
      const parsed = parseLRC(data.lyrics);
      setLyrics(parsed);
    } catch (e) {
      console.warn("Lyrics load failed:", e);
    } finally {
      setLyricsLoading(false);
    }
  };

  const parseLRC = (lrcString: string): Array<{ time: number; text: string }> => {
    const lines = lrcString.split('\n');
    const result: Array<{ time: number; text: string }> = [];
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
    
    for (const line of lines) {
      const match = timeRegex.exec(line);
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const msString = match[3];
        const msVal = parseInt(msString, 10);
        const msFraction = msVal / Math.pow(10, msString.length);
        const time = minutes * 60 + seconds + msFraction;
        const text = line.replace(timeRegex, '').trim();
        result.push({ time, text });
      }
    }
    return result.sort((a, b) => a.time - b.time);
  };

  if (!currentTrack) return null;

  return (
    <View style={styles.lyricsContainer}>
      {lyricsLoading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#a855f7" />
          <Text style={styles.loadingText}>Fetching Synced Lyrics...</Text>
        </View>
      ) : lyrics.length === 0 ? (
        <View style={styles.centerBox}>
          <AlignLeft size={36} color="#27272a" style={{ marginBottom: 10 }} />
          <Text style={styles.noLyricsText}>No lyrics resolved.</Text>
        </View>
      ) : (
        <LyricList
          lyrics={lyrics}
          activeLyricIndex={activeLyricIndex}
          lineOffsets={lineOffsets}
          lyricsScrollRef={lyricsScrollRef}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT,
    zIndex: 1000,
  },
  miniPlayer: {
    height: MINI_PLAYER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#18181be5',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  miniImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#27272a',
  },
  miniDetails: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  miniTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  miniSubtitle: {
    color: '#a1a1aa',
    fontSize: 12,
    marginTop: 2,
  },
  miniActionBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedContainer: {
    height: SCREEN_HEIGHT,
    paddingTop: Platform.OS === 'ios' ? 50 : 25,
    paddingBottom: 40,
    backgroundColor: '#09090b',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 48,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    flex: 1,
    textAlign: 'center',
  },
  headerBtn: {
    padding: 8,
  },
  playerTabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 12,
  },
  playerTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#18181b50',
    borderWidth: 1,
    borderColor: '#27272a30',
  },
  activePlayerTab: {
    backgroundColor: '#a855f710',
    borderColor: '#a855f725',
  },
  playerTabText: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  activePlayerTabText: {
    color: '#a855f7',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  lyricsContainer: {
    flex: 1,
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 12,
  },
  noLyricsText: {
    color: '#71717a',
    fontSize: 14,
    fontWeight: '600',
  },
  lyricLine: {
    color: '#71717a',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  activeLyricLine: {
    color: '#ffffff',
    fontSize: 24,
    transform: [{ scale: 1.05 }],
  },
  queueContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  queueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#18181b40',
    borderWidth: 1,
    borderColor: '#27272a20',
    borderRadius: 16,
    marginBottom: 8,
  },
  activeQueueRow: {
    borderColor: '#a855f750',
    backgroundColor: '#a855f705',
  },
  queueImage: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#27272a',
  },
  queueMeta: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  queueTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  activeQueueText: {
    color: '#a855f7',
  },
  queueSubtitle: {
    color: '#71717a',
    fontSize: 10,
    marginTop: 1,
  },
  queueDelete: {
    padding: 8,
  },
  dragHandle: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draggingQueueRow: {
    backgroundColor: '#a855f720',
    borderColor: '#a855f760',
    shadowColor: '#a855f7',
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  dropLine: {
    height: 2,
    backgroundColor: '#a855f7',
    borderRadius: 1,
    marginHorizontal: 10,
    marginVertical: 2,
    shadowColor: '#a855f7',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  nowPlayingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#a855f7',
    marginRight: 8,
  },
  playerMetaWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  artworkImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#27272a',
  },
  metaTextWrapper: {
    flex: 1,
    marginLeft: 16,
  },
  metaTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  metaSubtitle: {
    fontSize: 13,
    color: '#a1a1aa',
    marginTop: 2,
  },
  scrubberWrapper: {
    paddingHorizontal: 30,
    marginBottom: 24,
  },
  progressBar: {
    paddingVertical: 10,
  },
  progressBg: {
    height: 4,
    backgroundColor: '#27272a',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  progressKnob: {
    position: 'absolute',
    top: 6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    transform: [{ translateX: -6 }],
  },
  timeLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -2,
  },
  timeLabel: {
    fontSize: 11,
    color: '#71717a',
    fontWeight: '600',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  playPauseBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPauseWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtn: {
    padding: 10,
  },
  subControlBtn: {
    padding: 10,
    position: 'relative',
  },
  repeatBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#a855f7',
    color: '#000000',
    fontSize: 8,
    fontWeight: '800',
    borderRadius: 99,
    width: 12,
    height: 12,
    textAlign: 'center',
  },
  volumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  volumeBar: {
    paddingVertical: 10,
  },
  volumeBg: {
    width: 180,
    height: 3,
    backgroundColor: '#27272a',
    borderRadius: 1.5,
  },
  volumeFill: {
    height: '100%',
    backgroundColor: '#a1a1aa',
    borderRadius: 1.5,
  },
  volumeKnob: {
    position: 'absolute',
    top: 5.5,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    transform: [{ translateX: -6 }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000b0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    zIndex: 9999,
  },
  modalContent: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 24,
    padding: 24,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 16,
  },
  modalEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  modalEmptyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  modalEmptySubtitle: {
    fontSize: 12,
    color: '#71717a',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalPlaylistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a50',
  },
  modalPlaylistName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  modalPlaylistCount: {
    color: '#71717a',
    fontSize: 11,
    marginLeft: 8,
  },
  modalCreateTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#27272a',
    borderRadius: 12,
  },
  modalCreateTriggerText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  cancelModalBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  cancelModalBtnText: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '600',
  },
  createModalBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createModalBtnText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '700',
  },
  modalInput: {
    backgroundColor: '#09090b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 12,
    color: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 14,
  },
});
