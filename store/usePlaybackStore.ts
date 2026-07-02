import { create } from 'zustand';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { YTMusic, Track } from '../services/ytmusic';
import { NativeModules } from 'react-native';

const hasNativeVolumeManager = () => {
  try {
    return !!(NativeModules.VolumeManager || NativeModules.RNVolumeManager);
  } catch (e) {
    return false;
  }
};

let VolumeManager: any = null;
if (hasNativeVolumeManager()) {
  try {
    VolumeManager = require('react-native-volume-manager').VolumeManager;
  } catch (e) {
    console.warn("react-native-volume-manager require failed:", e);
  }
}

export const isNativeVolumeManagerAvailable = () => {
  return !!VolumeManager;
};

export { VolumeManager };

// Each call to playTrack increments this token.
// Any in-flight load that sees a newer token knows it was superseded and aborts.
let loadToken = 0;
let sessionHistory: Track[] = [];
// Tracks the target seek position — cleared once native player confirms arrival
let pendingSeekTime: number | null = null;

interface PlaybackState {
  currentTrack: Track | null;
  isPlaying: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  queue: Track[];
  currentIndex: number;
  isRepeat: 'none' | 'all' | 'one';
  isShuffle: boolean;
  sound: Audio.Sound | null;

  isScrubbing: boolean;
  setIsScrubbing: (scrubbing: boolean) => void;
  updateCurrentTime: (seconds: number) => void;

  playTrack: (track: Track, queueList?: Track[]) => Promise<void>;
  togglePlay: () => Promise<void>;
  setPlaying: (playing: boolean) => Promise<void>;
  nextTrack: () => Promise<void>;
  prevTrack: () => Promise<void>;
  seekTo: (seconds: number) => Promise<void>;
  setVolume: (value: number) => Promise<void>;
  toggleMute: () => Promise<void>;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => Promise<void>;
  reorderQueue: (newQueue: Track[], newIndex: number) => void;
  clearQueue: () => Promise<void>;
  setQueue: (tracks: Track[], startIndex?: number) => Promise<void>;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
}

export const usePlaybackStore = create<PlaybackState>((set, get) => {
  // Helper to configure audio mode for background playback on Android/iOS
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
    playThroughEarpieceAndroid: false,
  }).catch(e => console.warn("Failed to set audio mode:", e));

  // Initialize store volume with native system volume if available
  if (isNativeVolumeManagerAvailable()) {
    VolumeManager.getVolume().then((result: any) => {
      set({ volume: result.volume });
    }).catch((e: any) => console.warn("Failed to get initial system volume:", e));
  }

  // Preload history from AsyncStorage so playTrack starts completely synchronously
  AsyncStorage.getItem('museflow_history').then(raw => {
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        sessionHistory = parsed.slice(0, 10);
      }
    }
  }).catch(() => {});

  // Helper to unload active sound
  const unloadCurrentSound = async () => {
    const { sound } = get();
    if (sound) {
      // Stop first to prevent any continued audio output
      try { await sound.stopAsync(); } catch (_) {}
      try { await sound.unloadAsync(); } catch (e) {
        console.warn("Unloading sound failed:", e);
      }
    }
    set({ sound: null, isPlaying: false, isBuffering: false, currentTime: 0, duration: 0 });
  };

  // Callback to track status updates from Expo AV
  const onPlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) {
      if (status.error) {
        console.error("Playback error:", status.error);
        get().nextTrack(); // Auto-skip on failure
      }
      return;
    }

    if (get().isScrubbing) {
      // Still waiting for the native player to arrive at the scrub target.
      // Accept the tick only when positionMillis is within 0.5s of the target.
      if (pendingSeekTime !== null) {
        const reportedSec = status.positionMillis / 1000;
        if (Math.abs(reportedSec - pendingSeekTime) <= 0.5) {
          pendingSeekTime = null;
          set({ isScrubbing: false, currentTime: reportedSec, duration: (status.durationMillis || 0) / 1000 });
        }
      }
      return;
    }

    set({
      isPlaying: status.isPlaying,
      isBuffering: status.shouldPlay ? status.isBuffering : false,
      currentTime: status.positionMillis / 1000,
      duration: (status.durationMillis || 0) / 1000,
    });

    if (status.didJustFinish) {
      console.log("Track finished. Transitioning...");
      const { isRepeat, sound } = get();
      if (isRepeat === 'one' && sound) {
        sound.replayAsync().catch(() => get().nextTrack());
      } else {
        get().nextTrack();
      }
    }
  };

  return {
    currentTrack: null,
    isPlaying: false,
    isBuffering: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    isMuted: false,
    queue: [],
    currentIndex: -1,
    isRepeat: 'none',
    isShuffle: false,
    isScrubbing: false,
    sound: null,

    setIsScrubbing: (scrubbing) => set({ isScrubbing: scrubbing }),
    updateCurrentTime: (seconds) => set({ currentTime: seconds }),

    playTrack: async (track, queueList) => {
      // Issue a new token — any previous load will detect this and abort.
      const myToken = ++loadToken;

      // Maintain session history of played tracks
      const currentTrackAtStart = get().currentTrack;
      if (currentTrackAtStart) {
        sessionHistory = sessionHistory.filter(t => t.track_id !== currentTrackAtStart.track_id);
        sessionHistory.push(currentTrackAtStart);
        if (sessionHistory.length > 10) {
          sessionHistory.shift();
        }
      }

      // Preceding tracks (exactly 2)
      const preceding: Track[] = [];
      const sourceQueue = queueList || get().queue || [];
      const sourceIdx = sourceQueue.findIndex((t) => t.track_id === track.track_id);

      if (sourceIdx !== -1) {
        if (sourceIdx >= 1) preceding.push(sourceQueue[sourceIdx - 1]);
        if (sourceIdx >= 2) preceding.unshift(sourceQueue[sourceIdx - 2]);
      }

      // If we don't have 2 preceding tracks, fill from session history (latest to oldest)
      const historyCopy = [...sessionHistory].reverse();
      for (const histTrack of historyCopy) {
        if (preceding.length >= 2) break;
        if (histTrack.track_id !== track.track_id && !preceding.some(p => p.track_id === histTrack.track_id)) {
          preceding.unshift(histTrack);
        }
      }

      // If still not enough (e.g. fresh install, first play), pad with duplicate of track
      while (preceding.length < 2) {
        preceding.unshift(track);
      }

      // Upcoming tracks (exactly 12)
      let upcoming: Track[] = [];
      if (sourceIdx !== -1) {
        upcoming = sourceQueue.slice(sourceIdx + 1, sourceIdx + 13);
      }

      let initialQueue = [...preceding, track, ...upcoming];
      if (initialQueue.length > 15) {
        initialQueue = initialQueue.slice(0, 15);
      }

      // Set playing index to exactly 2 (the 3rd position)
      const newIndex = 2;

      // *** INSTANT UI UPDATE — happens synchronously before any await ***
      // The track artwork / title / artist change on the very same frame.
      set({
        currentTrack: track,
        queue: initialQueue,
        currentIndex: newIndex,
        isBuffering: true,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
      });

      // Silence + unload the old sound in the background — don't await it
      // so we never block the UI. The token check below will catch any race.
      const oldSound = get().sound;
      set({ sound: null });
      if (oldSound) {
        oldSound.stopAsync().catch(() => {});
        oldSound.unloadAsync().catch(() => {});
      }

      try {
        console.log(`[playTrack #${myToken}] Resolving stream: ${track.title}`);

        // Pre-fetch recommendations in parallel to pad upcoming tracks to exactly 12 if needed
        let recsPromise = YTMusic.getRelatedTracks(track.track_id).catch(() => [] as Track[]);

        const [streamData, recs] = await Promise.all([
          YTMusic.resolveStream(track.track_id),
          recsPromise
        ]);

        const streamUrl = streamData.url;
        const headers = streamData.headers;

        // Stale check — a newer skip happened while we were fetching the URL
        if (myToken !== loadToken) {
          console.log(`[playTrack #${myToken}] Superseded. Aborting.`);
          return;
        }

        // Pad the queue to exactly 15 if it has fewer than 15 items
        let currentQ = get().queue;
        if (currentQ.length < 15 && recs && recs.length > 0) {
          const existingIds = new Set(currentQ.map(q => q.track_id));
          const freshRecs = recs.filter(r => !existingIds.has(r.track_id));
          const needed = 15 - currentQ.length;
          const pad = freshRecs.slice(0, needed);
          const updatedQ = [...currentQ, ...pad];
          set({ queue: updatedQ });
        }

        const { volume, isMuted } = get();
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: streamUrl, headers },
          {
            shouldPlay: true,
            volume: isMuted ? 0 : (isNativeVolumeManagerAvailable() ? 1.0 : volume),
            progressUpdateIntervalMillis: 250,
          },
          onPlaybackStatusUpdate
        );

        // Stale check — a newer skip happened while Audio was loading
        if (myToken !== loadToken) {
          console.log(`[playTrack #${myToken}] Superseded during audio load. Unloading.`);
          newSound.stopAsync().catch(() => {});
          newSound.unloadAsync().catch(() => {});
          return;
        }

        set({ sound: newSound, isPlaying: true, isBuffering: false });
        console.log(`[playTrack #${myToken}] ✓ Playing: ${track.title}`);
      } catch (err) {
        if (myToken === loadToken) {
          console.error(`[playTrack #${myToken}] Failed to stream:`, err);
          set({ isBuffering: false });
          setTimeout(() => {
            if (myToken === loadToken) get().nextTrack();
          }, 1500);
        }
      }
    },

    togglePlay: async () => {
      const { sound, isPlaying, currentTrack } = get();
      if (!sound || !currentTrack) return;

      const nextPlaying = !isPlaying;
      // Optimistic update
      set({ isPlaying: nextPlaying, isBuffering: false });

      if (nextPlaying) {
        sound.playAsync().catch(e => console.warn("playAsync failed:", e));
      } else {
        sound.pauseAsync().catch(e => console.warn("pauseAsync failed:", e));
      }
    },

    setPlaying: async (playing) => {
      const { sound } = get();
      if (!sound) return;
      
      // Optimistic update
      set({ isPlaying: playing, isBuffering: playing ? get().isBuffering : false });

      if (playing) {
        sound.playAsync().catch(e => console.warn("playAsync failed:", e));
      } else {
        sound.pauseAsync().catch(e => console.warn("pauseAsync failed:", e));
      }
    },

    nextTrack: async () => {
      const { queue, currentIndex, isRepeat, isShuffle, currentTrack } = get();
      if (queue.length === 0) return;

      let nextIndex = -1;
      if (isShuffle) {
        nextIndex = Math.floor(Math.random() * queue.length);
      } else {
        nextIndex = currentIndex + 1;
        if (nextIndex >= queue.length) {
          if (isRepeat === 'all') {
            nextIndex = 0;
          } else {
            // Endless autoplay: Load recommendations based on the last track played!
            if (currentTrack) {
              set({ isBuffering: true });
              try {
                console.log("[Endless Autoplay] Queue ended, fetching recommendations...");
                let recs = await YTMusic.getRelatedTracks(currentTrack.track_id);
                if (!recs || recs.length === 0) {
                  console.log("[Endless Autoplay] Related tracks empty, using search fallback...");
                  const cleanArtist = currentTrack.artists.replace(/^(Song|Video|Artist|Album|Single|Playlist)\s*/i, '');
                  recs = await YTMusic.search(`${cleanArtist} radio`, 'songs');
                }

                if (recs && recs.length > 0) {
                  // Append a full batch of unique recommendations (up to 15)
                  // so the queue looks like a proper endless-play list
                  const existingIds = new Set(queue.map(q => q.track_id));
                  const freshRecs = recs.filter(r => !existingIds.has(r.track_id));
                  const batch = (freshRecs.length > 0 ? freshRecs : recs).slice(0, 15);

                  const updatedQueue = [...queue, ...batch];
                  const nextIdx = queue.length; // first newly appended track
                  set({ queue: updatedQueue, currentIndex: nextIdx });
                  await get().playTrack(updatedQueue[nextIdx], updatedQueue);
                  return;
                }
              } catch (err) {
                console.warn("[Endless Autoplay] Autoplay recommendations failed:", err);
              }
            }
            
            // If no recommendations or failed, just halt
            await unloadCurrentSound();
            return;
          }
        }
      }

      const next = queue[nextIndex];
      if (!next) return;

      // Instant UI update — show next track metadata immediately
      set({ currentTrack: next, currentIndex: nextIndex, isBuffering: true, isPlaying: false, currentTime: 0, duration: 0 });
      await get().playTrack(next, queue);
    },

    prevTrack: async () => {
      const { queue, currentIndex, isRepeat, sound, currentTime } = get();
      if (queue.length === 0) return;

      // Replay from start if more than 3 seconds in
      if (sound && currentTime > 3) {
        try {
          await sound.setPositionAsync(0);
          set({ currentTime: 0 });
        } catch (e) {
          console.warn("Replay track failed:", e);
        }
        return;
      }

      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        if (isRepeat === 'all') {
          prevIndex = queue.length - 1;
        } else {
          // Restart first track
          if (sound) {
            await sound.setPositionAsync(0);
            set({ currentTime: 0 });
          }
          return;
        }
      }

      const prev = queue[prevIndex];
      if (!prev) return;

      // Instant UI update — show prev track metadata immediately
      set({ currentTrack: prev, currentIndex: prevIndex, isBuffering: true, isPlaying: false, currentTime: 0, duration: 0 });
      await get().playTrack(prev, queue);
    },

    seekTo: async (seconds) => {
      const { sound } = get();
      // Lock ticks immediately and record where we expect the player to land
      pendingSeekTime = seconds;
      set({ isScrubbing: true, currentTime: seconds });
      if (sound) {
        // Fire without awaiting — the status callback clears the lock once
        // the native player reports a position within 0.5s of pendingSeekTime
        sound.setPositionAsync(seconds * 1000).catch(e => {
          console.warn("seekTo failed:", e);
          pendingSeekTime = null;
          set({ isScrubbing: false });
        });
      } else {
        pendingSeekTime = null;
        set({ isScrubbing: false });
      }
    },

    setVolume: async (value) => {
      const { sound } = get();
      set({ volume: value, isMuted: value === 0 });
      if (isNativeVolumeManagerAvailable()) {
        VolumeManager.setVolume(value).catch((e: any) => console.warn("setVolume failed:", e));
      } else if (sound) {
        sound.setVolumeAsync(value).catch(e => console.warn("setVolume failed:", e));
      }
    },

    toggleMute: async () => {
      const { isMuted, volume, sound } = get();
      const nextMute = !isMuted;
      set({ isMuted: nextMute });
      if (isNativeVolumeManagerAvailable()) {
        VolumeManager.setVolume(nextMute ? 0 : volume).catch((e: any) => console.warn("toggleMute failed:", e));
      } else if (sound) {
        sound.setVolumeAsync(nextMute ? 0 : volume).catch(e => console.warn("toggleMute failed:", e));
      }
    },

    addToQueue: (track) => {
      const { queue, currentIndex } = get();
      if (queue.some((t) => t.track_id === track.track_id)) return;
      let newQueue = [...queue];

      // Insert right after the current playing track (which is at index currentIndex)
      const insertIdx = currentIndex !== -1 ? currentIndex + 1 : 0;
      newQueue.splice(insertIdx, 0, track);

      // Keep size capped at exactly 15 by removing from the end
      if (newQueue.length > 15) {
        newQueue.pop();
      }
      set({ queue: newQueue });
    },

    removeFromQueue: async (trackId) => {
      const { queue, currentIndex, currentTrack } = get();
      const targetIdx = queue.findIndex(t => t.track_id === trackId);
      if (targetIdx === -1) return;

      let newQueue = queue.filter(t => t.track_id !== trackId);
      let newIndex = currentIndex;

      if (targetIdx === currentIndex) {
        if (newQueue.length > 0) {
          if (newIndex >= newQueue.length) newIndex = 0;
          const next = newQueue[newIndex];
          await get().playTrack(next, newQueue);
        } else {
          set({ queue: [], currentIndex: -1, currentTrack: null });
          await unloadCurrentSound();
        }
      } else {
        if (targetIdx < currentIndex) newIndex -= 1;

        // If queue is smaller than 15, try to pad from recommendations
        if (newQueue.length < 15 && currentTrack) {
          try {
            const recs = await YTMusic.getRelatedTracks(currentTrack.track_id);
            const existingIds = new Set(newQueue.map(q => q.track_id));
            const freshRecs = recs.filter(r => !existingIds.has(r.track_id));
            const needed = 15 - newQueue.length;
            newQueue = [...newQueue, ...freshRecs.slice(0, needed)];
          } catch (_) {}
        }

        // Keep active track at exactly index 2 (3rd position)
        if (newIndex < 2 && currentTrack) {
          const preceding: Track[] = [...newQueue.slice(0, newIndex)];
          const historyCopy = [...sessionHistory].reverse();
          for (const histTrack of historyCopy) {
            if (preceding.length >= 2) break;
            if (histTrack.track_id !== currentTrack.track_id && !newQueue.some(q => q.track_id === histTrack.track_id)) {
              preceding.unshift(histTrack);
            }
          }
          while (preceding.length < 2) {
            preceding.unshift(currentTrack);
          }
          newQueue = [...preceding, ...newQueue.slice(newIndex)];
          newIndex = 2;
        }

        set({ queue: newQueue, currentIndex: newIndex });
      }
    },

    reorderQueue: (newQueue, newIndex) => {
      set({ queue: newQueue, currentIndex: newIndex });
    },

    clearQueue: async () => {
      set({ queue: [], currentIndex: -1, currentTrack: null });
      await unloadCurrentSound();
    },

    setQueue: async (tracks, startIndex = 0) => {
      const track = tracks[startIndex] || null;
      if (track) {
        await get().playTrack(track, tracks);
      } else {
        set({ queue: [], currentIndex: -1, currentTrack: null });
        await unloadCurrentSound();
      }
    },

    toggleRepeat: () => {
      const { isRepeat } = get();
      const cycle: Record<'none' | 'all' | 'one', 'none' | 'all' | 'one'> = { none: 'all', all: 'one', one: 'none' };
      set({ isRepeat: cycle[isRepeat] });
    },

    toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  };
});
