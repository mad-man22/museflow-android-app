/**
 * usePlaybackStore — MuseFlow Playback Store (react-native-track-player)
 *
 * Architecture:
 * - TrackPlayer handles ALL native audio: playback, background service,
 *   foreground service, lock screen controls, Bluetooth — 100% in native code.
 * - This Zustand store manages: queue state, UI state, and delegates all
 *   audio operations to TrackPlayer.
 * - The PlaybackService.ts handles background events (track changes, etc.).
 */
import TrackPlayer, {
  Capability,
  State,
  RepeatMode,
} from 'react-native-track-player';

export { TrackPlayer, Capability, State, RepeatMode };

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { YTMusic, Track } from '../services/ytmusic';
import { NativeModules } from 'react-native';


// ─── Volume Manager (optional native volume) ────────────────────────────────
const hasNativeVolumeManager = () => {
  try {
    return !!(NativeModules.VolumeManager || NativeModules.RNVolumeManager);
  } catch (e) {
    return false;
  }
};

export let VolumeManager: any = null;
if (hasNativeVolumeManager()) {
  try {
    VolumeManager = require('react-native-volume-manager').VolumeManager;
  } catch (e) {
    console.warn('react-native-volume-manager require failed:', e);
  }
}

export const isNativeVolumeManagerAvailable = () => !!VolumeManager;

// ─── Session History (for queue padding) ────────────────────────────────────
let sessionHistory: Track[] = [];

// ─── Load token (abort stale playTrack calls) ────────────────────────────────
let loadToken = 0;

// ─── TrackPlayer initialised guard ────────────────────────────────────────
let playerReady = false;
let playerSetupPromise: Promise<void> | null = null;

export const ensurePlayerReady = async (): Promise<void> => {
  if (playerReady) return;
  if (playerSetupPromise) return playerSetupPromise;

  playerSetupPromise = (async () => {
    try {
      await TrackPlayer.setupPlayer({
        minBuffer: 15,
        maxBuffer: 50,
        playBuffer: 2,
        backBuffer: 30,
        waitForBuffer: true,
      } as any);

      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior: 1, // ContinuePlayback
        } as any,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
          Capability.Stop,
        ],
        compactCapabilities: [
          Capability.SkipToPrevious,
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ] as any,
        progressUpdateEventInterval: 1,
      });

      playerReady = true;
      console.log('[TrackPlayer] Setup complete');
    } catch (e) {
      console.warn('[TrackPlayer] Setup failed:', e);
      playerSetupPromise = null;
    }
  })();

  return playerSetupPromise;
};

// ─── State Interface ─────────────────────────────────────────────────────────
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
  isScrubbing: boolean;

  // Legacy field — kept for JamScreen compatibility (always null with RNTP)
  sound: null;

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
  playNext: (track: Track) => void;
  removeFromQueue: (trackId: string) => Promise<void>;
  reorderQueue: (newQueue: Track[], newIndex: number) => void;
  clearQueue: () => Promise<void>;
  setQueue: (tracks: Track[], startIndex?: number) => Promise<void>;
  toggleRepeat: () => void;
  toggleShuffle: () => void;

  // Internal: called from PlaybackService when active track changes
  loadNextIntoPlayer: () => Promise<void>;
  // Internal: called from PlaybackService when native queue ends
  handleQueueEnded: () => Promise<void>;
}

// ─── Store ──────────────────────────────────────────────────────────────────
export const usePlaybackStore = create<PlaybackState>((set, get) => {
  // Load volume from native on init
  if (isNativeVolumeManagerAvailable()) {
    VolumeManager.getVolume().then((result: any) => {
      set({ volume: result.volume });
    }).catch(() => {});
  }

  // Restore session history from AsyncStorage
  AsyncStorage.getItem('museflow_history').then(raw => {
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) sessionHistory = parsed.slice(0, 10);
      } catch (_) {}
    }
  }).catch(() => {});

  // ─── loadNextIntoPlayer ────────────────────────────────────────────────
  // Called by PlaybackService when the active track changes.
  // Resolves the NEXT track's stream URL and adds it to TrackPlayer's queue
  // so the native engine can pre-buffer it. This runs right after a new song
  // starts — while network access is guaranteed.
  const loadNextIntoPlayer = async () => {
    const { queue, currentIndex, isRepeat, isShuffle } = get();
    if (queue.length === 0) return;

    let nextIndex: number;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length) {
        if (isRepeat === 'all') {
          nextIndex = 0;
        } else {
          // End of queue — handleQueueEnded will deal with this
          return;
        }
      }
    }

    const nextTrack = queue[nextIndex];
    if (!nextTrack) return;

    try {
      // Check if it's already in TrackPlayer's native queue
      const tpQueue = await TrackPlayer.getQueue();
      const alreadyQueued = tpQueue.some((t: any) => t.id === nextTrack.track_id);
      if (alreadyQueued) return;

      console.log(`[loadNextIntoPlayer] Resolving N+1: ${nextTrack.title}`);
      const streamData = await YTMusic.resolveStream(nextTrack.track_id);

      await TrackPlayer.add({
        id: nextTrack.track_id,
        url: streamData.url,
        title: nextTrack.title,
        artist: nextTrack.artists,
        artwork: nextTrack.thumbnail,
        duration: nextTrack.duration,
        headers: streamData.headers,
      } as any);

      console.log(`[loadNextIntoPlayer] ✓ Added N+1 to native queue: ${nextTrack.title}`);
    } catch (e) {
      console.warn('[loadNextIntoPlayer] Failed:', e);
    }
  };

  // ─── handleQueueEnded ─────────────────────────────────────────────────────
  const handleQueueEnded = async () => {
    const { queue, currentIndex, currentTrack, isRepeat } = get();

    if (isRepeat === 'all' && queue.length > 0) {
      const first = queue[0];
      set({ currentIndex: 0 });
      await get().playTrack(first, queue);
      return;
    }

    if (!currentTrack) return;

    try {
      console.log('[handleQueueEnded] Fetching recommendations...');
      let recs = await YTMusic.getRelatedTracks(currentTrack.track_id);
      if (!recs || recs.length === 0) {
        const cleanArtist = currentTrack.artists.replace(/^(Song|Video|Artist|Album|Single|Playlist)\s*/i, '');
        recs = await YTMusic.search(`${cleanArtist} radio`, 'songs');
      }

      if (recs && recs.length > 0) {
        const existingIds = new Set(queue.map(q => q.track_id));
        const freshRecs = recs.filter(r => !existingIds.has(r.track_id));
        const batch = (freshRecs.length > 0 ? freshRecs : recs).slice(0, 15);
        const updatedQueue = [...queue, ...batch];
        set({ queue: updatedQueue });
        await loadNextIntoPlayer();
        console.log(`[handleQueueEnded] ✓ Appended ${batch.length} tracks`);
      }
    } catch (e) {
      console.warn('[handleQueueEnded] Recommendations failed:', e);
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
    updateCurrentTime: (seconds) => {
      if (!get().isScrubbing) set({ currentTime: seconds });
    },

    loadNextIntoPlayer,
    handleQueueEnded,

    // ─── playTrack ────────────────────────────────────────────────────────
    playTrack: async (track, queueList) => {
      const myToken = ++loadToken;

      // Save to session history
      const currentTrackAtStart = get().currentTrack;
      if (currentTrackAtStart) {
        sessionHistory = sessionHistory.filter(t => t.track_id !== currentTrackAtStart.track_id);
        sessionHistory.push(currentTrackAtStart);
        if (sessionHistory.length > 10) sessionHistory.shift();
        AsyncStorage.setItem('museflow_history', JSON.stringify(sessionHistory)).catch(() => {});
      }

      // Build queue with 2 preceding + track + up to 12 upcoming
      const sourceQueue = queueList || get().queue || [];
      const sourceIdx = sourceQueue.findIndex(t => t.track_id === track.track_id);

      const preceding: Track[] = [];
      if (sourceIdx !== -1) {
        if (sourceIdx >= 1) preceding.push(sourceQueue[sourceIdx - 1]);
        if (sourceIdx >= 2) preceding.unshift(sourceQueue[sourceIdx - 2]);
      }
      const historyCopy = [...sessionHistory].reverse();
      for (const histTrack of historyCopy) {
        if (preceding.length >= 2) break;
        if (histTrack.track_id !== track.track_id && !preceding.some(p => p.track_id === histTrack.track_id)) {
          preceding.unshift(histTrack);
        }
      }
      while (preceding.length < 2) preceding.unshift(track);

      let upcoming: Track[] = [];
      if (sourceIdx !== -1) {
        upcoming = sourceQueue.slice(sourceIdx + 1, sourceIdx + 13);
      }
      let initialQueue = [...preceding, track, ...upcoming];
      if (initialQueue.length > 15) initialQueue = initialQueue.slice(0, 15);
      const newIndex = 2;

      // Instant UI update
      set({
        currentTrack: track,
        queue: initialQueue,
        currentIndex: newIndex,
        isBuffering: true,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
      });

      try {
        await ensurePlayerReady();
        if (myToken !== loadToken) return;

        await TrackPlayer.reset();
        if (myToken !== loadToken) return;

        console.log(`[playTrack #${myToken}] Resolving stream: ${track.title}`);
        const streamData = await YTMusic.resolveStream(track.track_id);
        if (myToken !== loadToken) return;

        await TrackPlayer.add({
          id: track.track_id,
          url: streamData.url,
          title: track.title,
          artist: track.artists,
          artwork: track.thumbnail,
          duration: track.duration,
          headers: streamData.headers,
        } as any);

        await TrackPlayer.play();
        set({ isPlaying: true, isBuffering: false });
        console.log(`[playTrack #${myToken}] ✓ Playing: ${track.title}`);

        // Pad queue with recommendations in background
        YTMusic.getRelatedTracks(track.track_id).then(recs => {
          if (myToken !== loadToken) return;
          const currentQ = get().queue;
          if (currentQ.length < 15 && recs && recs.length > 0) {
            const existingIds = new Set(currentQ.map(q => q.track_id));
            const freshRecs = recs.filter(r => !existingIds.has(r.track_id));
            const needed = 15 - currentQ.length;
            const pad = freshRecs.slice(0, needed);
            if (pad.length > 0) set({ queue: [...currentQ, ...pad] });
          }
        }).catch(() => {});

        // Load next track into TrackPlayer's native queue while we have network
        setTimeout(async () => {
          if (myToken !== loadToken) return;
          await loadNextIntoPlayer();
        }, 2000);

      } catch (err) {
        if (myToken === loadToken) {
          console.error(`[playTrack #${myToken}] Failed:`, err);
          set({ isBuffering: false, isPlaying: false });
          setTimeout(() => {
            if (myToken === loadToken) get().nextTrack();
          }, 1500);
        }
      }
    },

    // ─── togglePlay ───────────────────────────────────────────────────────
    togglePlay: async () => {
      const { isPlaying, currentTrack } = get();
      if (!currentTrack) return;
      if (isPlaying) {
        set({ isPlaying: false });
        await TrackPlayer.pause();
      } else {
        set({ isPlaying: true });
        await TrackPlayer.play();
      }
    },

    // ─── setPlaying ───────────────────────────────────────────────────────
    setPlaying: async (playing) => {
      const { currentTrack } = get();
      if (!currentTrack) return;
      set({ isPlaying: playing });
      if (playing) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    },

    // ─── nextTrack ────────────────────────────────────────────────────────
    nextTrack: async () => {
      const { queue, currentIndex, isRepeat, isShuffle } = get();
      if (queue.length === 0) return;

      let nextIndex: number;
      if (isShuffle) {
        nextIndex = Math.floor(Math.random() * queue.length);
      } else {
        nextIndex = currentIndex + 1;
        if (nextIndex >= queue.length) {
          if (isRepeat === 'all') {
            nextIndex = 0;
          } else {
            await handleQueueEnded();
            return;
          }
        }
      }

      const next = queue[nextIndex];
      if (!next) return;

      set({ currentTrack: next, currentIndex: nextIndex, isBuffering: true, isPlaying: false, currentTime: 0, duration: 0 });
      await get().playTrack(next, queue);
    },

    // ─── prevTrack ────────────────────────────────────────────────────────
    prevTrack: async () => {
      const { queue, currentIndex, isRepeat, currentTime } = get();
      if (queue.length === 0) return;

      if (currentTime > 3) {
        await TrackPlayer.seekTo(0);
        set({ currentTime: 0 });
        return;
      }

      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        if (isRepeat === 'all') {
          prevIndex = queue.length - 1;
        } else {
          await TrackPlayer.seekTo(0);
          set({ currentTime: 0 });
          return;
        }
      }

      const prev = queue[prevIndex];
      if (!prev) return;

      set({ currentTrack: prev, currentIndex: prevIndex, isBuffering: true, isPlaying: false, currentTime: 0, duration: 0 });
      await get().playTrack(prev, queue);
    },

    // ─── seekTo ──────────────────────────────────────────────────────────
    seekTo: async (seconds) => {
      set({ isScrubbing: true, currentTime: seconds });
      try {
        await TrackPlayer.seekTo(seconds);
      } catch (e) {
        console.warn('seekTo failed:', e);
      } finally {
        set({ isScrubbing: false });
      }
    },

    // ─── setVolume ────────────────────────────────────────────────────────
    setVolume: async (value) => {
      set({ volume: value, isMuted: value === 0 });
      if (isNativeVolumeManagerAvailable()) {
        VolumeManager.setVolume(value).catch((e: any) => console.warn('setVolume failed:', e));
      } else {
        TrackPlayer.setVolume(value).catch(() => {});
      }
    },

    // ─── toggleMute ───────────────────────────────────────────────────────
    toggleMute: async () => {
      const { isMuted, volume } = get();
      const nextMute = !isMuted;
      set({ isMuted: nextMute });
      const targetVol = nextMute ? 0 : volume;
      if (isNativeVolumeManagerAvailable()) {
        VolumeManager.setVolume(targetVol).catch(() => {});
      } else {
        TrackPlayer.setVolume(targetVol).catch(() => {});
      }
    },

    // ─── Queue Management ─────────────────────────────────────────────────
    addToQueue: (track) => {
      const { queue, currentIndex } = get();
      if (queue.some(t => t.track_id === track.track_id)) return;
      let newQueue = [...queue, track];
      let newIndex = currentIndex;
      if (newQueue.length > 15) { newQueue.shift(); if (newIndex > 0) newIndex--; }
      set({ queue: newQueue, currentIndex: newIndex });
    },

    playNext: (track) => {
      const { queue, currentIndex } = get();
      let newQueue = queue.filter(t => t.track_id !== track.track_id);
      const currentTrack = queue[currentIndex];
      let newIndex = currentTrack ? newQueue.findIndex(t => t.track_id === currentTrack.track_id) : currentIndex;
      if (newIndex === -1) newIndex = currentIndex;
      const insertIdx = newIndex !== -1 ? newIndex + 1 : 0;
      newQueue.splice(insertIdx, 0, track);
      if (newQueue.length > 15) newQueue.pop();
      set({ queue: newQueue, currentIndex: newIndex });
    },

    removeFromQueue: async (trackId) => {
      const { queue, currentIndex } = get();
      const targetIdx = queue.findIndex(t => t.track_id === trackId);
      if (targetIdx === -1) return;
      let newQueue = queue.filter(t => t.track_id !== trackId);
      let newIndex = currentIndex;

      if (targetIdx === currentIndex) {
        if (newQueue.length > 0) {
          if (newIndex >= newQueue.length) newIndex = 0;
          await get().playTrack(newQueue[newIndex], newQueue);
        } else {
          set({ queue: [], currentIndex: -1, currentTrack: null });
          await TrackPlayer.reset();
        }
      } else {
        if (targetIdx < currentIndex) newIndex -= 1;
        set({ queue: newQueue, currentIndex: newIndex });
      }
    },

    reorderQueue: (newQueue, newIndex) => {
      set({ queue: newQueue, currentIndex: newIndex });
    },

    clearQueue: async () => {
      set({ queue: [], currentIndex: -1, currentTrack: null, isPlaying: false, isBuffering: false, currentTime: 0, duration: 0 });
      await TrackPlayer.reset();
    },

    setQueue: async (tracks, startIndex = 0) => {
      const track = tracks[startIndex] || null;
      if (track) {
        await get().playTrack(track, tracks);
      } else {
        set({ queue: [], currentIndex: -1, currentTrack: null });
        await TrackPlayer.reset();
      }
    },

    // ─── Repeat / Shuffle ─────────────────────────────────────────────────
    toggleRepeat: () => {
      const { isRepeat } = get();
      const cycle: Record<'none' | 'all' | 'one', 'none' | 'all' | 'one'> = { none: 'all', all: 'one', one: 'none' };
      const next = cycle[isRepeat];
      set({ isRepeat: next });
      const modeMap: Record<string, number> = {
        none: RepeatMode.Off,
        all: RepeatMode.Queue,
        one: RepeatMode.Track,
      };
      TrackPlayer.setRepeatMode(modeMap[next]).catch(() => {});
    },

    toggleShuffle: () => set(state => ({ isShuffle: !state.isShuffle })),
  };
});
