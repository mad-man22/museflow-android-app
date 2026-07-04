import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Search as SearchIcon, Play, Plus, Loader2, Sparkles, FolderHeart, ListPlus } from 'lucide-react-native';
import { usePlaybackStore } from '../store/usePlaybackStore';
import { YTMusic, Track } from '../services/ytmusic';
import AlbumDetailScreen from './AlbumDetailScreen';
import ArtistDetailScreen from './ArtistDetailScreen';

const OFFLINE_DATABASE: Track[] = [
  { track_id: "dQw4w9WgXcQ", title: "Blinding Lights", artists: "The Weeknd", album: "After Hours", thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300", category: "songs" },
  { track_id: "kJQP7kiw5Fk", title: "Fix You", artists: "Coldplay", album: "X&Y", thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300", category: "songs" },
  { track_id: "y6120QOlsfU", title: "Sandstorm", artists: "Darude", album: "Before the Storm", thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=300", category: "songs" },
  { track_id: "8UVNT4cl5yY", title: "Resonance", artists: "HOME", album: "Odyssey", thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300", category: "songs" },
  { track_id: "L_XJ_s5074", title: "Midnight City", artists: "M83", album: "Hurry Up, We're Dreaming", thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300", category: "songs" }
];

const PRE_SEARCH_VIBES = [
  { name: "Late Night Coding", query: "lofi coding focus" },
  { name: "High-Energy Workout", query: "gym motivation hype" },
  { name: "Rainy Day Chill", query: "acoustic chill indie" },
  { name: "Synthwave Highway", query: "synthwave retro" },
  { name: "Deep Focus Ambient", query: "binaural ambient drone" }
];

const cleanDisplayArtist = (artistName: string): string => {
  if (!artistName) return '';
  return artistName.replace(/^(Song|Video|Artist|Album|Single|Playlist)\s*/i, '');
};

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "songs" | "albums" | "artists">("all");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Playlists modal states
  const [playlistModalVisible, setPlaylistModalVisible] = useState(false);
  const [selectedTrackForPlaylist, setSelectedTrackForPlaylist] = useState<Track | null>(null);
  const [playlists, setPlaylists] = useState<Array<{ id: string; name: string; tracks: Track[] }>>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<{ id: string; title: string; artist: string; thumbnail: string } | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<{ id: string; name: string; thumbnail: string } | null>(null);
  const [albumSource, setAlbumSource] = useState<'search' | 'artist'>('search');

  const playTrack = usePlaybackStore((s) => s.playTrack);
  const setQueue = usePlaybackStore((s) => s.setQueue);
  const addToQueue = usePlaybackStore((s) => s.addToQueue);
  const playNext = usePlaybackStore((s) => s.playNext);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setStatusMsg(null);
      return;
    }

    const timer = setTimeout(() => {
      triggerSearch(query, activeFilter);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, activeFilter]);

  const triggerSearch = async (searchQuery: string, filter: "all" | "songs" | "albums" | "artists") => {
    setIsLoading(true);
    setStatusMsg(null);

    try {
      const data = await YTMusic.search(searchQuery, filter);
      if (data && data.length > 0) {
        setResults(data);
      } else {
        triggerLocalSearch(searchQuery, filter);
      }
    } catch (err) {
      console.warn("Direct InnerTube search failed, using local offline fallback", err);
      triggerLocalSearch(searchQuery, filter);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerLocalSearch = (searchQuery: string, filter: string) => {
    setStatusMsg("Offline: Searching local catalog");
    const regex = new RegExp(searchQuery, "i");
    const matched = OFFLINE_DATABASE.filter(item => {
      const matchesText = regex.test(item.title) || regex.test(item.artists) || regex.test(item.album || "");
      if (!matchesText) return false;
      if (filter === "all") return true;
      return item.category === filter;
    });
    setResults(matched);
  };

  const playSong = async (track: any) => {
    const resolvedTrack: Track = {
      track_id: track.track_id || track.videoId,
      title: track.title,
      artists: track.artists,
      album: track.album || "Single",
      thumbnail: track.thumbnail
    };

    // Load track and start immediately
    playTrack(resolvedTrack, [resolvedTrack]);

    // Load recommendations in the background
    try {
      const recs = await YTMusic.getRelatedTracks(resolvedTrack.track_id);
      if (recs && recs.length > 0) {
        usePlaybackStore.setState({
          queue: [resolvedTrack, ...recs],
          currentIndex: 0
        });
      }
    } catch (e) {
      console.warn("Failed to fetch search recommendations:", e);
    }
  };

  const handleAddToPlaylistPrompt = async (track: any) => {
    const resolvedTrack: Track = {
      track_id: track.track_id || track.videoId,
      title: track.title,
      artists: track.artists,
      album: track.album || "Single",
      thumbnail: track.thumbnail
    };
    setSelectedTrackForPlaylist(resolvedTrack);
    
    // Load playlists
    try {
      const playlistsRaw = await AsyncStorage.getItem('museflow_playlists');
      const currentPlaylists = playlistsRaw ? JSON.parse(playlistsRaw) : [];
      setPlaylists(currentPlaylists);
      setPlaylistModalVisible(true);
    } catch (e) {
      Alert.alert('Error', 'Failed to retrieve playlists.');
    }
  };

  const addTrackToPlaylist = async (playlistId: string, playlistName: string) => {
    if (!selectedTrackForPlaylist) return;
    try {
      const updated = playlists.map(p => {
        if (p.id === playlistId) {
          const trackExists = p.tracks.some(t => t.track_id === selectedTrackForPlaylist.track_id);
          if (trackExists) return p;
          return { ...p, tracks: [...p.tracks, selectedTrackForPlaylist] };
        }
        return p;
      });

      await AsyncStorage.setItem('museflow_playlists', JSON.stringify(updated));
      setPlaylistModalVisible(false);
      setSelectedTrackForPlaylist(null);
      Alert.alert('Success', `Track added to "${playlistName}"`);
    } catch (e) {
      Alert.alert('Error', 'Failed to add track.');
    }
  };

  // If an album is selected, show the album details screen overlay
  if (selectedAlbum) {
    return (
      <AlbumDetailScreen
        albumId={selectedAlbum.id}
        albumTitle={selectedAlbum.title}
        albumArtist={selectedAlbum.artist}
        albumThumbnail={selectedAlbum.thumbnail}
        onBack={() => {
          setSelectedAlbum(null);
        }}
        onAddToPlaylist={(track) => {
          handleAddToPlaylistPrompt(track);
        }}
      />
    );
  }

  // If an artist is selected, show the artist details screen overlay
  if (selectedArtist) {
    return (
      <ArtistDetailScreen
        artistId={selectedArtist.id}
        artistName={selectedArtist.name}
        artistThumbnail={selectedArtist.thumbnail}
        onBack={() => setSelectedArtist(null)}
        onSelectAlbum={(album) => {
          setAlbumSource('artist');
          setSelectedAlbum(album);
        }}
        onAddToPlaylist={(track) => {
          handleAddToPlaylistPrompt(track);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Banner */}
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <Text style={styles.subtitle}>Explore tracks, albums, artists, or natural language prompts.</Text>
      </View>

      {/* Floating Glowing Search Bar */}
      <View style={styles.searchBarWrapper}>
        <SearchIcon size={20} color="#71717a" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Songs, albums, artists, or vibe prompts..."
          placeholderTextColor="#71717a"
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
        {isLoading && <ActivityIndicator size="small" color="#a855f7" style={styles.loader} />}
      </View>

      {/* Filter Chips */}
      <View style={styles.filtersWrapper}>
        {(["all", "songs", "albums", "artists"] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={[styles.filterChip, activeTabStyle(activeFilter === filter)]}
          >
            <Text style={[styles.filterChipText, activeTabTextStyle(activeFilter === filter)]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results / Vibes */}
      <View style={{ flex: 1 }}>
        {results.length > 0 ? (
          <View style={{ flex: 1 }}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Search Results</Text>
              {statusMsg && (
                <View style={styles.statusBadge}>
                  <Sparkles size={12} color="#a855f7" style={{ marginRight: 4 }} />
                  <Text style={styles.statusBadgeText}>{statusMsg}</Text>
                </View>
              )}
            </View>

            {/* Split layout representation in FlatList */}
            <FlatList
              data={results}
              keyExtractor={(item, index) => (item.track_id || item.album_id || item.artist_id || '') + index}
              contentContainerStyle={{ paddingBottom: 120 }}
              renderItem={({ item, index }) => {
                if (activeFilter === 'all' && index === 0) {
                  // Render a Top Result Card
                  return (
                    <TouchableOpacity 
                      style={styles.topResultCard} 
                      onPress={async () => {
                        const isTrack = item.category === 'songs' || item.track_id;
                        const isAlbum = item.category === 'albums' || item.album_id;
                        const isArtist = item.category === 'artists' || item.artist_id;

                        if (isTrack) {
                          playSong(item);
                        } else if (isAlbum) {
                          setSelectedAlbum({
                            id: item.album_id || item.id,
                            title: item.title || item.name,
                            artist: item.artist || item.artists || 'Unknown Artist',
                            thumbnail: item.thumbnail,
                          });
                        } else if (isArtist) {
                          setSelectedArtist({
                            id: item.artist_id || item.id,
                            name: item.title || item.name,
                            thumbnail: item.thumbnail,
                          });
                        }
                      }}
                    >
                      <Image source={{ uri: item.thumbnail }} style={styles.topResultImage as any} />
                      <View style={styles.topResultDetails}>
                        <View style={styles.badgeRow}>
                          <Text style={styles.topResultBadge}>{item.category?.toUpperCase() || 'SONG'}</Text>
                        </View>
                        <Text style={styles.topResultTitle} numberOfLines={1}>{item.title || item.name}</Text>
                        <Text style={styles.topResultSubtitle} numberOfLines={1}>{cleanDisplayArtist(item.artists || item.artist || 'Artist')}</Text>
                      </View>
                      <View style={styles.topResultPlay}>
                        <Play size={20} color="#000000" fill="#000000" style={{ marginLeft: 2 }} />
                      </View>
                    </TouchableOpacity>
                  );
                }

                // Render standard list item
                const isTrack = item.category === 'songs' || item.track_id;
                const isArtist = item.category === 'artists' || item.artist_id;
                const isAlbum = item.category === 'albums' || item.album_id;

                return (
                  <View style={styles.resultRow}>
                    <TouchableOpacity 
                      style={styles.resultRowPressable}
                      onPress={async () => {
                        if (isTrack) playSong(item);
                        else if (isAlbum) {
                          setSelectedAlbum({
                            id: item.album_id,
                            title: item.title || item.name,
                            artist: item.artist || item.artists || 'Unknown Artist',
                            thumbnail: item.thumbnail,
                          });
                        } else if (isArtist) {
                          setSelectedArtist({
                            id: item.artist_id || item.id,
                            name: item.title || item.name,
                            thumbnail: item.thumbnail,
                          });
                        }
                      }}
                    >
                      <Image source={{ uri: item.thumbnail }} style={styles.resultImage as any} />
                      <View style={styles.resultMeta}>
                        <Text style={styles.resultTitle} numberOfLines={1}>{item.title || item.name}</Text>
                        <Text style={styles.resultSubtitle} numberOfLines={1}>
                          {isTrack && cleanDisplayArtist(item.artists)}
                          {isArtist && 'Artist'}
                          {isAlbum && `Album • ${cleanDisplayArtist(item.artist)}`}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {isTrack && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => {
                            const t: any = item;
                            playNext({
                              track_id: t.track_id || t.videoId,
                              title: t.title,
                              artists: t.artists,
                              album: t.album || 'Single',
                              thumbnail: t.thumbnail,
                            });
                            Alert.alert('Play Next', `"${item.title}" will play next.`);
                          }}
                        >
                          <ListPlus size={18} color="#a855f7" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={() => handleAddToPlaylistPrompt(item)}>
                          <Plus size={18} color="#a1a1aa" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              }}
            />
          </View>
        ) : (
          <View style={styles.preSearchWrapper}>
            <Text style={styles.vibeSectionTitle}>Curated Vibe Presets</Text>
            <View style={styles.vibeChipsGrid}>
              {PRE_SEARCH_VIBES.map((vibe, idx) => (
                <TouchableOpacity
                  key={vibe.name + idx}
                  style={styles.vibeChip}
                  onPress={() => setQuery(vibe.query)}
                >
                  <Sparkles size={12} color="#a855f7" style={{ marginRight: 6 }} />
                  <Text style={styles.vibeChipText}>{vibe.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Add to Playlist Modal */}
      <Modal
        visible={playlistModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPlaylistModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Playlist</Text>
            
            {playlists.length === 0 ? (
              <View style={styles.modalEmpty}>
                <Text style={styles.modalEmptyText}>No Playlists Found</Text>
                <Text style={styles.modalEmptySubtitle}>Go to Library and create a playlist first.</Text>
                <TouchableOpacity style={styles.closeModalBtn} onPress={() => setPlaylistModalVisible(false)}>
                  <Text style={styles.closeModalBtnText}>Close</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ maxHeight: 300 }}>
                <FlatList
                  data={playlists}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      style={styles.modalPlaylistItem}
                      onPress={() => addTrackToPlaylist(item.id, item.name)}
                    >
                      <FolderHeart size={18} color="#a855f7" style={{ marginRight: 10 }} />
                      <Text style={styles.modalPlaylistName} numberOfLines={1}>{item.name}</Text>
                      <Text style={styles.modalPlaylistCount}>{item.tracks.length} tracks</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity style={styles.cancelModalBtn} onPress={() => setPlaylistModalVisible(false)}>
                  <Text style={styles.cancelModalBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Helpers
const activeTabStyle = (active: boolean) => ({
  backgroundColor: active ? '#ffffff' : '#ffffff0b',
  borderColor: active ? '#ffffff' : '#ffffff0b'
});

const activeTabTextStyle = (active: boolean) => ({
  color: active ? '#000000' : '#a1a1aa'
});

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
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
  },
  loader: {
    marginLeft: 8,
  },
  filtersWrapper: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filterChip: {
    borderRadius: 99,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
    paddingBottom: 8,
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a855f710',
    borderWidth: 1,
    borderColor: '#a855f730',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    color: '#a855f7',
    fontWeight: '700',
  },
  topResultCard: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  topResultImage: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: '#27272a',
  },
  topResultDetails: {
    flex: 1,
    marginLeft: 16,
    marginRight: 10,
    justifyContent: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  topResultBadge: {
    fontSize: 9,
    color: '#a855f7',
    backgroundColor: '#a855f715',
    borderWidth: 1,
    borderColor: '#a855f730',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 99,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  topResultTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  topResultSubtitle: {
    fontSize: 13,
    color: '#a1a1aa',
    marginTop: 2,
  },
  topResultPlay: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
    shadowColor: '#a855f7',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#18181b30',
    borderWidth: 1,
    borderColor: '#27272a20',
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
  },
  resultRowPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  resultImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#27272a',
  },
  resultMeta: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  resultSubtitle: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 2,
  },
  actionButton: {
    padding: 8,
  },
  preSearchWrapper: {
    flex: 1,
    marginTop: 20,
  },
  vibeSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#a1a1aa',
    marginBottom: 12,
  },
  vibeChipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  vibeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  vibeChipText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
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
  modalHeader: {
    fontSize: 18,
    fontWeight: '700',
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
  closeModalBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  closeModalBtnText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '700',
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
});
