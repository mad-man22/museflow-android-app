import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ChevronLeft, Play, ListPlus, Plus } from 'lucide-react-native';
import { usePlaybackStore } from '../store/usePlaybackStore';
import { YTMusic, Track, Album } from '../services/ytmusic';

interface Props {
  artistId: string;
  artistName: string;
  artistThumbnail: string;
  onBack: () => void;
  onSelectAlbum: (album: { id: string; title: string; artist: string; thumbnail: string }) => void;
  onAddToPlaylist: (track: Track) => void;
}

const cleanDisplayArtist = (artistName: string): string => {
  if (!artistName) return '';
  return artistName.replace(/^(Song|Video|Artist|Album|Single|Playlist)\s*/i, '');
};

export default function ArtistDetailScreen({
  artistId,
  artistName,
  artistThumbnail,
  onBack,
  onSelectAlbum,
  onAddToPlaylist,
}: Props) {
  const [details, setDetails] = useState<{
    name: string;
    thumbnail: string;
    description: string;
    topTracks: Track[];
    albums: Album[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setQueue = usePlaybackStore((s) => s.setQueue);
  const playNext = usePlaybackStore((s) => s.playNext);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      setIsLoading(true);
      try {
        const data = await YTMusic.getArtistDetails(artistId);
        setDetails(data);
      } catch (e) {
        console.warn('Failed to load artist details:', e);
        Alert.alert('Error', 'Failed to load artist details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtistDetails();
  }, [artistId]);

  const handlePlayTrack = (track: Track, index: number) => {
    if (!details) return;
    setQueue(details.topTracks, index);
  };

  const handlePlayNext = (track: Track) => {
    playNext(track);
    Alert.alert('Play Next', `"${track.title}" will play next.`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <ChevronLeft size={26} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerMeta}>
          <Text style={styles.headerTitle} numberOfLines={1}>Artist</Text>
        </View>
      </View>

      {/* Loading State */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#a855f7" />
          <Text style={styles.loadingText}>Fetching Artist Details...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
          {/* Circular Hero Profile */}
          <Image source={{ uri: details?.thumbnail || artistThumbnail }} style={styles.artistArtwork as any} />
          <Text style={styles.artistName}>{details?.name || artistName}</Text>
          
          {details?.description ? (
            <Text style={styles.bioText} numberOfLines={4}>
              {details.description}
            </Text>
          ) : null}

          {/* Curated Top Tracks Section */}
          {details?.topTracks && details.topTracks.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Top Songs</Text>
              {details.topTracks.slice(0, 5).map((track, idx) => (
                <View key={track.track_id + idx} style={styles.trackRow}>
                  <TouchableOpacity
                    style={styles.trackPressable}
                    onPress={() => handlePlayTrack(track, idx)}
                    activeOpacity={0.7}
                  >
                    <Image source={{ uri: track.thumbnail }} style={styles.trackImage as any} />
                    <View style={styles.trackMeta}>
                      <Text style={styles.trackTitle} numberOfLines={1}>
                        {track.title}
                      </Text>
                      <Text style={styles.trackSubtitle} numberOfLines={1}>
                        {cleanDisplayArtist(track.artists)}
                      </Text>
                    </View>
                    <Play size={14} color="#71717a" />
                  </TouchableOpacity>

                  <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => handlePlayNext(track)}>
                      <ListPlus size={18} color="#a855f7" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => onAddToPlaylist(track)}>
                      <Plus size={18} color="#a1a1aa" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Horizontal Albums Slider */}
          {details?.albums && details.albums.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Albums & Singles</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.albumsScrollContent}>
                {details.albums.map((album) => (
                  <TouchableOpacity
                    key={album.album_id}
                    style={styles.albumCard}
                    onPress={() =>
                      onSelectAlbum({
                        id: album.album_id,
                        title: album.title,
                        artist: details.name,
                        thumbnail: album.thumbnail,
                      })
                    }
                    activeOpacity={0.75}
                  >
                    <Image source={{ uri: album.thumbnail }} style={styles.albumImage as any} />
                    <Text style={styles.albumTitle} numberOfLines={1}>
                      {album.title}
                    </Text>
                    <Text style={styles.albumSubtitle} numberOfLines={1}>
                      {album.year || 'Album'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>
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
  artistArtwork: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#18181b',
  },
  artistName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginTop: 14,
  },
  bioText: {
    color: '#71717a',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 10,
  },
  section: {
    marginTop: 26,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 14,
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
  trackPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 4,
  },
  trackImage: {
    width: 44,
    height: 44,
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
  albumsScrollContent: {
    paddingRight: 16,
    gap: 14,
  },
  albumCard: {
    width: 110,
  },
  albumImage: {
    width: 110,
    height: 110,
    borderRadius: 14,
    backgroundColor: '#27272a',
    marginBottom: 6,
  },
  albumTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  albumSubtitle: {
    color: '#71717a',
    fontSize: 11,
    marginTop: 1,
  },
});
