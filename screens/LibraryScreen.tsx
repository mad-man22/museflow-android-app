import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, TextInput, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Play, Plus, Heart, ListMusic, History, Trash2, FolderHeart, ListPlus } from 'lucide-react-native';
import { usePlaybackStore } from '../store/usePlaybackStore';
import { Track } from '../services/ytmusic';
import PlaylistDetailScreen from './PlaylistDetailScreen';

type Playlist = { id: string; name: string; tracks: Track[] };

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState<'favorites' | 'playlists' | 'history'>('favorites');
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [history, setHistory] = useState<Track[]>([]);
  const [currentPlaybackTrack, setCurrentPlaybackTrack] = useState<Track | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  
  const { playTrack, setQueue, addToQueue, currentTrack } = usePlaybackStore();

  useEffect(() => {
    setCurrentPlaybackTrack(currentTrack);
  }, [currentTrack]);

  // Load library data
  useEffect(() => {
    loadLibraryData();
  }, [activeTab, currentPlaybackTrack]);

  const loadLibraryData = async () => {
    try {
      if (activeTab === 'favorites') {
        const favsRaw = await AsyncStorage.getItem('museflow_favorites');
        if (favsRaw) setFavorites(JSON.parse(favsRaw));
      } else if (activeTab === 'playlists') {
        const playlistsRaw = await AsyncStorage.getItem('museflow_playlists');
        if (playlistsRaw) setPlaylists(JSON.parse(playlistsRaw));
      } else if (activeTab === 'history') {
        const historyRaw = await AsyncStorage.getItem('museflow_history');
        if (historyRaw) setHistory(JSON.parse(historyRaw));
      }
    } catch (e) {
      console.warn("Failed to load library data:", e);
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      const storedPlaylists = await AsyncStorage.getItem('museflow_playlists');
      const currentPlaylists = storedPlaylists ? JSON.parse(storedPlaylists) : [];
      
      const newPlaylist = {
        id: Date.now().toString(),
        name: newPlaylistName.trim(),
        tracks: []
      };

      const updated = [...currentPlaylists, newPlaylist];
      await AsyncStorage.setItem('museflow_playlists', JSON.stringify(updated));
      setPlaylists(updated);
      setNewPlaylistName('');
      setCreateModalVisible(false);
      Alert.alert('Created', `Playlist "${newPlaylist.name}" created!`);
    } catch (e) {
      Alert.alert('Error', 'Failed to create playlist.');
    }
  };

  const handleDeletePlaylist = (playlistId: string, name: string) => {
    Alert.alert(
      'Delete Playlist',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updated = playlists.filter(p => p.id !== playlistId);
              await AsyncStorage.setItem('museflow_playlists', JSON.stringify(updated));
              setPlaylists(updated);
            } catch (e) {
              console.warn("Delete playlist failed:", e);
            }
          }
        }
      ]
    );
  };

  const playFavoriteTrack = (track: Track) => {
    playTrack(track, favorites);
  };

  const playHistoryTrack = (track: Track) => {
    playTrack(track, history);
  };

  const playPlaylist = (tracks: Track[]) => {
    if (tracks.length === 0) {
      Alert.alert('Empty Playlist', 'Add tracks from the search screen to play.');
      return;
    }
    setQueue(tracks, 0);
  };

  const renderTrackItem = ({ item }: { item: Track }, onPlay: (track: Track) => void, onDelete?: (id: string) => void) => {
    const isPlayingThis = currentPlaybackTrack?.track_id === item.track_id;
    return (
      <View style={[styles.trackRow, isPlayingThis && styles.activeTrackRow]}>
        <TouchableOpacity style={styles.trackPressable} onPress={() => onPlay(item)}>
          <Image source={{ uri: item.thumbnail }} style={styles.trackImage as any} />
          <View style={styles.trackDetails}>
            <Text style={[styles.trackTitle, isPlayingThis && styles.activeTrackTitle]} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.trackSubtitle} numberOfLines={1}>
              {item.artists}
            </Text>
          </View>
          <Play size={16} color={isPlayingThis ? "#a855f7" : "#3f3f46"} fill={isPlayingThis ? "#a855f7" : undefined} style={{ marginRight: 6 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { addToQueue(item); Alert.alert('Queue', `"${item.title}" added to queue.`); }} style={styles.actionIconBtn}>
          <ListPlus size={18} color="#a855f7" />
        </TouchableOpacity>
        {onDelete && (
          <TouchableOpacity onPress={() => onDelete(item.track_id)} style={styles.actionIconBtn}>
            <Trash2 size={16} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const removeFavorite = async (trackId: string) => {
    try {
      const updated = favorites.filter(t => t.track_id !== trackId);
      await AsyncStorage.setItem('museflow_favorites', JSON.stringify(updated));
      setFavorites(updated);
    } catch (e) {
      console.warn("Remove favorite failed:", e);
    }
  };

  // If a playlist is selected, show detail screen
  if (selectedPlaylist) {
    return (
      <PlaylistDetailScreen
        playlist={selectedPlaylist}
        onBack={() => {
          setSelectedPlaylist(null);
          loadLibraryData();
        }}
        onPlaylistChange={(updated) => {
          setSelectedPlaylist(updated);
          setPlaylists(prev => prev.map(p => p.id === updated.id ? updated : p));
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Library</Text>
        <Text style={styles.subtitle}>Offline playlists, favorites, and history.</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['favorites', 'playlists', 'history'] as const).map(tab => (
          <TouchableOpacity 
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
            onPress={() => setActiveTab(tab)}
          >
            {tab === 'favorites' && <Heart size={14} color={activeTab === tab ? '#000000' : '#a1a1aa'} style={{ marginRight: 5 }} />}
            {tab === 'playlists' && <ListMusic size={14} color={activeTab === tab ? '#000000' : '#a1a1aa'} style={{ marginRight: 5 }} />}
            {tab === 'history' && <History size={14} color={activeTab === tab ? '#000000' : '#a1a1aa'} style={{ marginRight: 5 }} />}
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'favorites' && (
          favorites.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Heart size={48} color="#27272a" style={{ marginBottom: 15 }} />
              <Text style={styles.emptyText}>No Favorites Yet</Text>
              <Text style={styles.emptySubtitle}>Tap the heart icon on the music player to add tracks here.</Text>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={styles.playMixButton} onPress={() => playPlaylist(favorites)}>
                <Play size={16} color="#000000" fill="#000000" style={{ marginRight: 8 }} />
                <Text style={styles.playMixText}>Play Favorites Mix</Text>
              </TouchableOpacity>
              <FlatList
                data={favorites}
                keyExtractor={(item) => item.track_id}
                renderItem={(info) => renderTrackItem(info, playFavoriteTrack, removeFavorite)}
                contentContainerStyle={{ paddingBottom: 120 }}
              />
            </View>
          )
        )}

        {activeTab === 'playlists' && (
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.createButton} onPress={() => setCreateModalVisible(true)}>
              <Plus size={16} color="#000000" style={{ marginRight: 8 }} />
              <Text style={styles.createButtonText}>Create Playlist</Text>
            </TouchableOpacity>

            {playlists.length === 0 ? (
              <View style={styles.emptyContainer}>
                <ListMusic size={48} color="#27272a" style={{ marginBottom: 15 }} />
                <Text style={styles.emptyText}>No Playlists Created</Text>
                <Text style={styles.emptySubtitle}>Create a playlist and add songs to build custom local vibes.</Text>
              </View>
            ) : (
              <FlatList
                data={playlists}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 120 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.playlistCard}
                    onPress={() => setSelectedPlaylist(item)}
                    activeOpacity={0.75}
                  >
                    {/* Artwork mosaic */}
                    <View style={styles.playlistCardInner}>
                      <View style={styles.playlistMosaicWrapper}>
                        {item.tracks.slice(0, 4).map((t, i) => (
                          <Image key={t.track_id + i} source={{ uri: t.thumbnail }} style={styles.playlistMosaicThumb as any} />
                        ))}
                        {item.tracks.length < 4 && [...Array(4 - item.tracks.length)].map((_, i) => (
                          <View key={'e' + i} style={styles.playlistMosaicThumbEmpty} />
                        ))}
                      </View>
                      <View style={styles.playlistInfo}>
                        <View style={styles.playlistMeta}>
                          <FolderHeart size={16} color="#a855f7" />
                          <Text style={styles.playlistName} numberOfLines={1}>{item.name}</Text>
                        </View>
                        <Text style={styles.playlistCount}>{item.tracks.length} {item.tracks.length === 1 ? 'track' : 'tracks'}</Text>
                        <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
                          <TouchableOpacity
                            style={styles.playlistPlay}
                            onPress={(e) => { e.stopPropagation?.(); playPlaylist(item.tracks); }}
                          >
                            <Play size={13} color="#000000" fill="#000000" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.playlistDelete}
                            onPress={(e) => { e.stopPropagation?.(); handleDeletePlaylist(item.id, item.name); }}
                          >
                            <Trash2 size={15} color="#ef4444" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        )}

        {activeTab === 'history' && (
          history.length === 0 ? (
            <View style={styles.emptyContainer}>
              <History size={48} color="#27272a" style={{ marginBottom: 15 }} />
              <Text style={styles.emptyText}>No Playback History</Text>
              <Text style={styles.emptySubtitle}>Play music search tracks or trending hits to build history logs.</Text>
            </View>
          ) : (
            <FlatList
              data={history}
              keyExtractor={(item, index) => item.track_id + index}
              renderItem={(info) => renderTrackItem(info, playHistoryTrack)}
              contentContainerStyle={{ paddingBottom: 120 }}
            />
          )
        )}
      </View>

      {/* Playlist Create Modal */}
      <Modal
        visible={createModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setCreateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Playlist</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Vibe name (e.g. Cyber Punk Coding)"
              placeholderTextColor="#71717a"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelModalBtn} onPress={() => setCreateModalVisible(false)}>
                <Text style={styles.cancelModalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createModalBtn} onPress={handleCreatePlaylist}>
                <Text style={styles.createModalBtnText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#a1a1aa',
    marginTop: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#18181b',
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  activeTabButton: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '700',
  },
  activeTabText: {
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#71717a',
    textAlign: 'center',
    lineHeight: 18,
  },
  playMixButton: {
    backgroundColor: '#a855f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 16,
  },
  playMixText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
  },
  createButton: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 16,
  },
  createButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b50',
    borderWidth: 1,
    borderColor: '#27272a30',
    borderRadius: 16,
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 4,
    marginBottom: 10,
  },
  activeTrackRow: {
    borderColor: '#a855f750',
    backgroundColor: '#a855f705',
  },
  trackPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackImage: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#27272a',
  },
  trackDetails: {
    flex: 1,
    marginLeft: 12,
    marginRight: 6,
  },
  trackTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTrackTitle: {
    color: '#a855f7',
  },
  trackSubtitle: {
    color: '#71717a',
    fontSize: 12,
    marginTop: 2,
  },
  actionIconBtn: {
    padding: 8,
  },
  playlistCard: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
  },
  playlistCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  playlistMosaicWrapper: {
    width: 80,
    height: 80,
    borderRadius: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#27272a',
  },
  playlistMosaicThumb: {
    width: 40,
    height: 40,
    backgroundColor: '#3f3f46',
  },
  playlistMosaicThumbEmpty: {
    width: 40,
    height: 40,
    backgroundColor: '#27272a',
  },
  playlistInfo: {
    flex: 1,
  },
  playlistMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  playlistName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
  },
  playlistPlay: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistDelete: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ef444420',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistCount: {
    color: '#71717a',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  previewText: {
    fontSize: 11,
    color: '#a1a1aa',
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000a0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#09090b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 12,
    padding: 12,
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelModalBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelModalBtnText: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '600',
  },
  createModalBtn: {
    flex: 1,
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
});
