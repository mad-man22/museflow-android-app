import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Play, Sparkles, Flame, RefreshCw, Plus, Layers } from 'lucide-react-native';
import { usePlaybackStore } from '../store/usePlaybackStore';
import { YTMusic, Track } from '../services/ytmusic';
import { GeminiService } from '../services/gemini';

const PRESET_VIBES = [
  { label: "💻 Late Night Coding", prompt: "ambient lofi beats for late night coding focus" },
  { label: "⚡ Gym Pump", prompt: "high energy synthwave and hyperpop for intense gym workout" },
  { label: "🌧️ Rainy Day Chill", prompt: "melancholy acoustic indie songs for a cozy rainy day chill" },
  { label: "🌌 Cyber Highway", prompt: "retro synthwave driving tunes with deep bass" }
];

const cleanDisplayArtist = (artistName: string): string => {
  if (!artistName) return '';
  return artistName.replace(/^(Song|Video|Artist|Album|Single|Playlist)\s*/i, '');
};

export default function HomeScreen() {
  const [trending, setTrending] = useState<Track[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [recSourceTrackName, setRecSourceTrackName] = useState("");
  
  // AI Playlist states
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiTracks, setAiTracks] = useState<Track[]>([]);
  const [aiVibeName, setAiVibeName] = useState("");

  const playTrack = usePlaybackStore((s) => s.playTrack);
  const setQueue = usePlaybackStore((s) => s.setQueue);
  const currentTrack = usePlaybackStore((s) => s.currentTrack);

  // Load recently played and charts on mount/song transition
  useEffect(() => {
    loadRecentlyPlayed();
    loadTrendingCharts();
  }, [currentTrack]);

  // Fetch recommendations based on recently played or trending seed
  useEffect(() => {
    fetchRecommendations();
  }, [recentlyPlayed, trending]);

  const loadRecentlyPlayed = async () => {
    try {
      const stored = await AsyncStorage.getItem('museflow_history');
      if (stored) {
        const parsed = JSON.parse(stored) as Track[];
        setRecentlyPlayed(parsed.slice(0, 4));
      }
    } catch (e) {
      console.warn("Failed to load playback history:", e);
    }
  };

  const loadTrendingCharts = async () => {
    try {
      const data = await YTMusic.getTrending();
      setTrending(data);
    } catch (e) {
      console.warn("Failed to load trending charts:", e);
    }
  };

  const fetchRecommendations = async () => {
    let seedTrack: Track | null = null;
    if (recentlyPlayed.length > 0) {
      seedTrack = recentlyPlayed[0];
    } else if (trending.length > 0) {
      seedTrack = trending[0];
    }

    if (!seedTrack) return;

    try {
      const data = await YTMusic.getRelatedTracks(seedTrack.track_id, 6);
      if (data && data.length > 0) {
        setRecommendations(data);
        setRecSourceTrackName(seedTrack.title);
      }
    } catch (e) {
      console.warn("Failed to load recommendations:", e);
    }
  };

  const handleGenerateVibe = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setAiTracks([]);
    setAiVibeName("");

    try {
      console.log(`Generating AI queries for prompt: ${prompt}`);
      const vibe = await GeminiService.generatePlaylistQueries(prompt);
      console.log("Gemini query results resolved:", vibe.search_queries);

      const compiledTracks: Track[] = [];
      
      // Execute YouTube Music searches for each query in parallel
      const searchPromises = vibe.search_queries.map(async (q) => {
        try {
          const results = await YTMusic.search(q, "songs");
          if (results.length > 0) {
            // Take top 2 match tracks for each query
            return results.slice(0, 2);
          }
        } catch (err) {
          console.warn(`Vibe query search failed for "${q}":`, err);
        }
        return [];
      });

      const searchResults = await Promise.all(searchPromises);
      for (const list of searchResults) {
        compiledTracks.push(...list);
      }

      // Filter duplicates
      const uniqueTracks = compiledTracks.filter(
        (t, idx, self) => self.findIndex(s => s.track_id === t.track_id) === idx
      );

      if (uniqueTracks.length > 0) {
        setAiTracks(uniqueTracks);
        setAiVibeName(prompt);
      } else {
        Alert.alert("Empty Vibe", "Could not find matching music for this AI prompt. Try another.");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to resolve AI Vibe compilation.");
    } finally {
      setIsGenerating(false);
    }
  };

  const playVibeMix = () => {
    if (aiTracks.length === 0) return;
    setQueue(aiTracks, 0);
  };

  const playTrendingMix = () => {
    if (trending.length === 0) return;
    setQueue(trending, 0);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      {/* Welcome Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover the Vibe</Text>
        <Text style={styles.subtitle}>High-fidelity music streaming client-side.</Text>
      </View>

      {/* AI Vibe Section */}
      <View style={styles.vibeCard}>
        <View style={styles.vibeHeader}>
          <Sparkles size={20} color="#a855f7" />
          <Text style={styles.vibeTitle}>Gemini AI Playlists</Text>
        </View>
        <Text style={styles.vibeDescription}>
          Describe a mood, activity, or aesthetic to generate a custom playlist instantly on your phone.
        </Text>

        <View style={styles.vibeInputWrapper}>
          <TextInput
            style={styles.vibeInput}
            placeholder="e.g. Energetic cyberpunk gym tunes..."
            placeholderTextColor="#71717a"
            value={prompt}
            onChangeText={setPrompt}
          />
          <TouchableOpacity 
            style={styles.generateBtn} 
            onPress={handleGenerateVibe}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              <Sparkles size={16} color="#000000" />
            )}
          </TouchableOpacity>
        </View>

        {/* AI Vibe Presets */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetsScroll}>
          {PRESET_VIBES.map((item, idx) => (
            <TouchableOpacity 
              key={item.label + idx} 
              style={styles.presetChip}
              onPress={() => setPrompt(item.prompt)}
            >
              <Text style={styles.presetChipText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* AI Vibe Results */}
        {aiTracks.length > 0 && (
          <View style={styles.aiTracksWrapper}>
            <View style={styles.aiTracksHeader}>
              <Text style={styles.aiTracksTitle} numberOfLines={1}>Vibe: "{aiVibeName}"</Text>
              <TouchableOpacity style={styles.playVibeBtn} onPress={playVibeMix}>
                <Play size={12} color="#000000" fill="#000000" style={{ marginRight: 4 }} />
                <Text style={styles.playVibeText}>Play Mix</Text>
              </TouchableOpacity>
            </View>
            {aiTracks.slice(0, 3).map((item, idx) => (
              <TouchableOpacity 
                key={item.track_id + idx} 
                style={styles.aiTrackRow}
                onPress={() => playTrack(item, aiTracks)}
              >
                <Image source={{ uri: item.thumbnail }} style={styles.aiTrackImage} />
                <View style={styles.aiTrackDetails}>
                  <Text style={styles.aiTrackTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.aiTrackSubtitle} numberOfLines={1}>{cleanDisplayArtist(item.artists)}</Text>
                </View>
                <Play size={14} color="#a855f7" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Recently Played */}
      {recentlyPlayed.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Layers size={18} color="#a855f7" style={{ marginRight: 8 }} />
            <Text style={styles.sectionTitle}>Recently Played</Text>
          </View>
          <View style={styles.historyGrid}>
            {recentlyPlayed.map((track, idx) => (
              <TouchableOpacity 
                key={track.track_id + idx} 
                style={styles.historyCard}
                onPress={() => playTrack(track, recentlyPlayed)}
              >
                <Image source={{ uri: track.thumbnail }} style={styles.historyImage} />
                <View style={styles.historyMeta}>
                  <Text style={styles.historyTitle} numberOfLines={1}>{track.title}</Text>
                  <Text style={styles.historySubtitle} numberOfLines={1}>{cleanDisplayArtist(track.artists)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Recommended Grid */}
      {recommendations.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sparkles size={18} color="#f43f5e" style={{ marginRight: 8 }} />
            <View>
              <Text style={styles.sectionTitle}>Recommended for You</Text>
              <Text style={styles.sectionSubtitle}>Inspired by "{recSourceTrackName}"</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {recommendations.map((track, idx) => (
              <TouchableOpacity 
                key={track.track_id + idx} 
                style={styles.recommendCard}
                onPress={() => playTrack(track, recommendations)}
              >
                <Image source={{ uri: track.thumbnail }} style={styles.recommendImage} />
                <Text style={styles.recommendTitle} numberOfLines={1}>{track.title}</Text>
                <Text style={styles.recommendSubtitle} numberOfLines={1}>{cleanDisplayArtist(track.artists)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Trending Tracks */}
      {trending.length > 0 && (
        <View style={[styles.section, { marginBottom: 120 }]}>
          <View style={styles.sectionHeader}>
            <Flame size={18} color="#f97316" style={{ marginRight: 8 }} />
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.sectionTitle}>Trending Charts</Text>
              <TouchableOpacity onPress={playTrendingMix}>
                <Text style={styles.seeAllLink}>Play Charts</Text>
              </TouchableOpacity>
            </View>
          </View>
          {trending.slice(0, 5).map((track, idx) => (
            <TouchableOpacity 
              key={track.track_id + idx} 
              style={styles.trendingRow}
              onPress={() => playTrack(track, trending)}
            >
              <Text style={styles.trendingIndex}>{idx + 1}</Text>
              <Image source={{ uri: track.thumbnail }} style={styles.trendingImage} />
              <View style={styles.trendingMeta}>
                <Text style={styles.trendingTitle} numberOfLines={1}>{track.title}</Text>
                <Text style={styles.trendingSubtitle} numberOfLines={1}>{cleanDisplayArtist(track.artists)}</Text>
              </View>
              <Play size={16} color="#a1a1aa" />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  scrollContainer: {
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
  vibeCard: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 24,
    padding: 20,
    marginBottom: 25,
  },
  vibeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  vibeTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    marginLeft: 8,
  },
  vibeDescription: {
    fontSize: 13,
    color: '#a1a1aa',
    lineHeight: 18,
    marginBottom: 16,
  },
  vibeInputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#09090b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 14,
    height: 48,
    alignItems: 'center',
    paddingLeft: 14,
    overflow: 'hidden',
  },
  vibeInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
  },
  generateBtn: {
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetsScroll: {
    marginTop: 12,
    flexDirection: 'row',
  },
  presetChip: {
    backgroundColor: '#27272a50',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  presetChipText: {
    fontSize: 11,
    color: '#a1a1aa',
    fontWeight: '600',
  },
  aiTracksWrapper: {
    backgroundColor: '#09090b50',
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
  },
  aiTracksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a40',
    paddingBottom: 6,
  },
  aiTracksTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
    marginRight: 10,
  },
  playVibeBtn: {
    backgroundColor: '#a855f7',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  playVibeText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '800',
  },
  aiTrackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a20',
  },
  aiTrackImage: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#27272a',
  },
  aiTrackDetails: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  aiTrackTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  aiTrackSubtitle: {
    color: '#71717a',
    fontSize: 10,
    marginTop: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  sectionSubtitle: {
    fontSize: 10,
    color: '#71717a',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginTop: 1,
  },
  seeAllLink: {
    fontSize: 12,
    color: '#a855f7',
    fontWeight: '700',
  },
  historyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  historyCard: {
    width: '48%',
    backgroundColor: '#18181b40',
    borderWidth: 1,
    borderColor: '#27272a20',
    borderRadius: 16,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#27272a',
  },
  historyMeta: {
    flex: 1,
    marginLeft: 10,
  },
  historyTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  historySubtitle: {
    color: '#71717a',
    fontSize: 10,
    marginTop: 2,
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  recommendCard: {
    width: 110,
    marginRight: 14,
  },
  recommendImage: {
    width: 110,
    height: 110,
    borderRadius: 16,
    backgroundColor: '#27272a',
    marginBottom: 8,
  },
  recommendTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  recommendSubtitle: {
    color: '#71717a',
    fontSize: 10,
    marginTop: 1,
  },
  trendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b30',
    borderWidth: 1,
    borderColor: '#27272a15',
    borderRadius: 16,
    padding: 10,
    marginBottom: 8,
  },
  trendingIndex: {
    color: '#71717a',
    fontSize: 14,
    fontWeight: '700',
    width: 24,
    textAlign: 'center',
  },
  trendingImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#27272a',
    marginLeft: 4,
  },
  trendingMeta: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  trendingTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  trendingSubtitle: {
    color: '#71717a',
    fontSize: 11,
    marginTop: 2,
  },
});
