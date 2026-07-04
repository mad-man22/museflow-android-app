import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChevronLeft, Play, ListPlus, Trash2, FolderHeart, ArrowUp, ArrowDown } from 'lucide-react-native';
import { usePlaybackStore } from '../store/usePlaybackStore';
import { Track } from '../services/ytmusic';

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

interface Props {
  playlist: Playlist;
  onBack: () => void;
  onPlaylistChange: (updated: Playlist) => void;
}

const cleanDisplayArtist = (artistName: string): string => {
  if (!artistName) return '';
  return artistName.replace(/^(Song|Video|Artist|Album|Single|Playlist)\s*/i, '');
};

export default function PlaylistDetailScreen({ playlist, onBack, onPlaylistChange }: Props) {
  const [tracks, setTracks] = useState<Track[]>(playlist.tracks);
  const setQueue = usePlaybackStore((s) => s.setQueue);
  const playNext = usePlaybackStore((s) => s.playNext);
  const currentTrack = usePlaybackStore((s) => s.currentTrack);

  const savePlaylist = async (newTracks: Track[]) => {
    try {
      const raw = await AsyncStorage.getItem('museflow_playlists');
      const playlists: Playlist[] = raw ? JSON.parse(raw) : [];
      const updated = playlists.map(p =>
        p.id === playlist.id ? { ...p, tracks: newTracks } : p
      );
      await AsyncStorage.setItem('museflow_playlists', JSON.stringify(updated));
      onPlaylistChange({ ...playlist, tracks: newTracks });
    } catch (e) {
      console.warn('Failed to save playlist:', e);
    }
  };

  const handlePlayAll = () => {
    if (tracks.length === 0) {
      Alert.alert('Empty Playlist', 'This playlist has no songs yet.');
      return;
    }
    setQueue(tracks, 0);
  };

  const handlePlayTrack = (_track: Track, idx: number) => {
    setQueue(tracks, idx);
  };

  const handlePlayNext = (track: Track) => {
    playNext(track);
    Alert.alert('Play Next', `"${track.title}" will play next.`);
  };

  const handleRemoveTrack = (trackId: string, title: string) => {
    Alert.alert(
      'Remove Track',
      `Remove "${title}" from this playlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            const newTracks = tracks.filter(t => t.track_id !== trackId);
            setTracks(newTracks);
            await savePlaylist(newTracks);
          },
        },
      ]
    );
  };

  const moveTrack = async (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= tracks.length) return;
    const newTracks = [...tracks];
    const [moved] = newTracks.splice(fromIdx, 1);
    newTracks.splice(toIdx, 0, moved);
    setTracks(newTracks);
    await savePlaylist(newTracks);
  };

  const renderItem = ({ item, index }: { item: Track; index: number }) => {
    const isPlaying = currentTrack?.track_id === item.track_id;

    return (
      <View style={[styles.trackRow, isPlaying && styles.activeTrackRow]}>
        {/* Reorder buttons */}
        <View style={styles.reorderCol}>
          <TouchableOpacity
            onPress={() => moveTrack(index, index - 1)}
            style={styles.reorderBtn}
            disabled={index === 0}
          >
            <ArrowUp size={14} color={index === 0 ? '#3f3f46' : '#71717a'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => moveTrack(index, index + 1)}
            style={styles.reorderBtn}
            disabled={index === tracks.length - 1}
          >
            <ArrowDown size={14} color={index === tracks.length - 1 ? '#3f3f46' : '#71717a'} />
          </TouchableOpacity>
        </View>

        {/* Main pressable area */}
        <TouchableOpacity
          style={styles.trackPressable}
          onPress={() => handlePlayTrack(item, index)}
          activeOpacity={0.7}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.trackImage as any} />
          <View style={styles.trackMeta}>
            <Text style={[styles.trackTitle, isPlaying && styles.activeTrackTitle]} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.trackSubtitle} numberOfLines={1}>
              {cleanDisplayArtist(item.artists)}
            </Text>
          </View>
          <Play
            size={14}
            color={isPlaying ? '#a855f7' : '#3f3f46'}
            fill={isPlaying ? '#a855f7' : undefined}
          />
        </TouchableOpacity>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handlePlayNext(item)}>
            <ListPlus size={18} color="#a855f7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleRemoveTrack(item.track_id, item.title)}>
            <Trash2 size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <ChevronLeft size={26} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerMeta}>
          <FolderHeart size={18} color="#a855f7" />
          <Text style={styles.headerTitle} numberOfLines={1}>{playlist.name}</Text>
        </View>
      </View>

      {/* Hero banner */}
      <View style={styles.hero}>
        <View style={styles.heroArtworkGrid}>
          {tracks.slice(0, 4).map((t, i) => (
            <Image key={t.track_id + i} source={{ uri: t.thumbnail }} style={styles.heroThumb as any} />
          ))}
          {tracks.length < 4 && [...Array(4 - tracks.length)].map((_, i) => (
            <View key={'empty' + i} style={[styles.heroThumb, styles.heroThumbEmpty]} />
          ))}
        </View>
        <View style={styles.heroInfo}>
          <Text style={styles.heroName} numberOfLines={2}>{playlist.name}</Text>
          <Text style={styles.heroCount}>
            {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
          </Text>
          <TouchableOpacity style={styles.playAllBtn} onPress={handlePlayAll}>
            <Play size={16} color="#000000" fill="#000000" style={{ marginRight: 8 }} />
            <Text style={styles.playAllText}>Play All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Track list */}
      {tracks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FolderHeart size={52} color="#27272a" />
          <Text style={styles.emptyTitle}>No Songs Yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the{' '}
            <Text style={{ color: '#a855f7' }}>+</Text>{' '}
            button in Now Playing or Search to add songs here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item, idx) => item.track_id + idx}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },
  backBtn: {
    padding: 4,
  },
  headerMeta: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 16,
  },
  heroArtworkGrid: {
    width: 110,
    height: 110,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#18181b',
  },
  heroThumb: {
    width: 55,
    height: 55,
    backgroundColor: '#27272a',
  },
  heroThumbEmpty: {
    backgroundColor: '#18181b',
  },
  heroInfo: {
    flex: 1,
  },
  heroName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  heroCount: {
    fontSize: 13,
    color: '#71717a',
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
  },
  playAllBtn: {
    backgroundColor: '#a855f7',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  playAllText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '800',
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b50',
    borderWidth: 1,
    borderColor: '#27272a30',
    borderRadius: 16,
    marginBottom: 10,
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 4,
  },
  activeTrackRow: {
    borderColor: '#a855f740',
    backgroundColor: '#a855f708',
  },
  reorderCol: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    marginRight: 4,
  },
  reorderBtn: {
    padding: 4,
  },
  trackPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 4,
  },
  trackImage: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#27272a',
  },
  trackMeta: {
    flex: 1,
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
  },
  actionBtn: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#71717a',
    textAlign: 'center',
    lineHeight: 20,
  },
});
