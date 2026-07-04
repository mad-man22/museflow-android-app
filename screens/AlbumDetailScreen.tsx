import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ChevronLeft, Play, ListPlus, Plus } from 'lucide-react-native';
import { usePlaybackStore } from '../store/usePlaybackStore';
import { YTMusic, Track, Album } from '../services/ytmusic';

interface Props {
  albumId: string;
  albumTitle: string;
  albumArtist: string;
  albumThumbnail: string;
  onBack: () => void;
  onAddToPlaylist: (track: Track) => void;
}

const cleanDisplayArtist = (artistName: string): string => {
  if (!artistName) return '';
  return artistName.replace(/^(Song|Video|Artist|Album|Single|Playlist)\s*/i, '');
};

export default function AlbumDetailScreen({
  albumId,
  albumTitle,
  albumArtist,
  albumThumbnail,
  onBack,
  onAddToPlaylist,
}: Props) {
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setQueue = usePlaybackStore((s) => s.setQueue);
  const playNext = usePlaybackStore((s) => s.playNext);
  const currentTrack = usePlaybackStore((s) => s.currentTrack);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      setIsLoading(true);
      try {
        const details = await YTMusic.getAlbumDetails(albumId);
        setAlbum(details);
      } catch (e) {
        console.warn('Failed to load album details:', e);
        Alert.alert('Error', 'Failed to load album tracks.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [albumId]);

  const handlePlayAll = () => {
    if (!album || album.tracks.length === 0) {
      Alert.alert('Empty Album', 'This album has no tracks.');
      return;
    }
    setQueue(album.tracks, 0);
  };

  const handlePlayTrack = (trackIndex: number) => {
    if (!album) return;
    setQueue(album.tracks, trackIndex);
  };

  const handlePlayNext = (track: Track) => {
    playNext(track);
    Alert.alert('Play Next', `"${track.title}" will play next.`);
  };

  const renderItem = ({ item, index }: { item: Track; index: number }) => {
    const isPlaying = currentTrack?.track_id === item.track_id;

    return (
      <View style={[styles.trackRow, isPlaying && styles.activeTrackRow]}>
        {/* Track Index */}
        <View style={styles.indexCol}>
          <Text style={[styles.trackIndex, isPlaying && styles.activeTrackIndex]}>{index + 1}</Text>
        </View>

        {/* Main Pressable Info */}
        <TouchableOpacity
          style={styles.trackPressable}
          onPress={() => handlePlayTrack(index)}
          activeOpacity={0.7}
        >
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
            color={isPlaying ? '#a855f7' : '#71717a'}
            fill={isPlaying ? '#a855f7' : undefined}
          />
        </TouchableOpacity>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handlePlayNext(item)}>
            <ListPlus size={18} color="#a855f7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => onAddToPlaylist(item)}>
            <Plus size={18} color="#a1a1aa" />
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
          <Text style={styles.headerTitle} numberOfLines={1}>Album</Text>
        </View>
      </View>

      {/* Loading state */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#a855f7" />
          <Text style={styles.loadingText}>Fetching Album Tracks...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* Hero Header */}
          <View style={styles.hero}>
            <Image source={{ uri: albumThumbnail }} style={styles.heroArtwork as any} />
            <View style={styles.heroInfo}>
              <Text style={styles.heroName} numberOfLines={2}>{albumTitle}</Text>
              <Text style={styles.heroArtist} numberOfLines={1}>{cleanDisplayArtist(albumArtist)}</Text>
              <Text style={styles.heroCount}>
                {album?.tracks.length || 0} {(album?.tracks.length === 1) ? 'track' : 'tracks'}
                {album?.year ? ` • ${album.year}` : ''}
              </Text>
              <TouchableOpacity style={styles.playAllBtn} onPress={handlePlayAll}>
                <Play size={16} color="#000000" fill="#000000" style={{ marginRight: 8 }} />
                <Text style={styles.playAllText}>Play Album</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tracks List */}
          {!album || album.tracks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No tracks resolved.</Text>
            </View>
          ) : (
            <FlatList
              data={album.tracks}
              keyExtractor={(item, idx) => item.track_id + idx}
              renderItem={renderItem}
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 160 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#a1a1aa',
    fontSize: 14,
    fontWeight: '600',
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 18,
  },
  heroArtwork: {
    width: 115,
    height: 115,
    borderRadius: 16,
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
  heroArtist: {
    fontSize: 15,
    color: '#a1a1aa',
    fontWeight: '600',
    marginTop: 4,
  },
  heroCount: {
    fontSize: 13,
    color: '#71717a',
    fontWeight: '500',
    marginTop: 2,
    marginBottom: 12,
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
    paddingLeft: 12,
    paddingRight: 4,
  },
  activeTrackRow: {
    borderColor: '#a855f740',
    backgroundColor: '#a855f708',
  },
  indexCol: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  trackIndex: {
    color: '#71717a',
    fontSize: 14,
    fontWeight: '700',
  },
  activeTrackIndex: {
    color: '#a855f7',
  },
  trackPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 4,
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
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#71717a',
  },
});
