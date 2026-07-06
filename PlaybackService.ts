/**
 * PlaybackService — react-native-track-player background service
 *
 * This file is registered as a Headless Task with Android's native Service
 * system. It runs independently of the React JS thread — meaning track
 * transitions, Bluetooth commands, and lock screen controls all keep working
 * even when the JS thread is throttled or suspended by Android Doze mode.
 *
 * DO NOT import React or any React hooks here.
 * This file MUST remain a plain async function.
 */
import TrackPlayer, { Event, State } from 'react-native-track-player';

export async function PlaybackService() {
  // ─── Remote Control Events (Bluetooth / Lock Screen / Headset) ───────────
  // These are fired natively by Android's MediaSession. TrackPlayer handles
  // the native side; we just need to tell the player what to do.

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    // Delegate to our Zustand store so it can manage queue index,
    // endless autoplay, and shuffle logic.
    const { usePlaybackStore } = require('./store/usePlaybackStore');
    usePlaybackStore.getState().nextTrack();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    const { usePlaybackStore } = require('./store/usePlaybackStore');
    usePlaybackStore.getState().prevTrack();
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, (event: { position: number }) => {
    TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener(Event.RemoteDuck, async (event: { permanent: boolean; paused: boolean }) => {
    // Audio focus loss — pause on permanent loss (e.g. phone call)
    if (event.permanent) {
      await TrackPlayer.pause();
    }
  });

  // ─── Track Change ──────────────────────────────────────────────────────────
  // Fired natively whenever the active track changes (i.e. a song just started).
  // We use this to: update Zustand currentTrack/currentIndex, and load the next
  // track's stream URL into the TrackPlayer queue so the native engine can
  // pre-buffer it without any JS involvement.

  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (event: any) => {
    try {
      const { usePlaybackStore } = require('./store/usePlaybackStore');
      const store = usePlaybackStore.getState();

      if (event.track) {
        // Sync Zustand's notion of "current track" with what TrackPlayer just started
        const newIndex = store.queue.findIndex(
          (t: any) => t.track_id === event.track.id
        );
        if (newIndex !== -1) {
          usePlaybackStore.setState({
            currentTrack: store.queue[newIndex],
            currentIndex: newIndex,
          });
        }
      }

      // Load the next track into TrackPlayer's native queue.
      // This is the key call — it happens right when the new song starts,
      // giving us maximum foreground window to make the network call.
      await store.loadNextIntoPlayer();
    } catch (e) {
      console.warn('[PlaybackService] PlaybackActiveTrackChanged handler failed:', e);
    }
  });

  // ─── Playback State Changes ────────────────────────────────────────────────
  TrackPlayer.addEventListener(Event.PlaybackState, (event: { state: State }) => {
    try {
      const { usePlaybackStore } = require('./store/usePlaybackStore');
      const playing = event.state === State.Playing;
      const buffering =
        event.state === State.Buffering || event.state === State.Loading;
      usePlaybackStore.setState({ isPlaying: playing, isBuffering: buffering });
    } catch (e) {}
  });

  // ─── Progress Updates ──────────────────────────────────────────────────────
  // Keep Zustand's currentTime/duration in sync for UI components that
  // read from the store (scrubber, mini player, lock screen metadata).
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, (event: any) => {
    try {
      const { usePlaybackStore } = require('./store/usePlaybackStore');
      usePlaybackStore.setState({
        currentTime: event.position ?? 0,
        duration: event.duration ?? 0,
      });
    } catch (e) {}
  });

  // ─── Queue Ended ──────────────────────────────────────────────────────────
  // The native queue ran out of tracks. This triggers endless autoplay.
  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async () => {
    try {
      const { usePlaybackStore } = require('./store/usePlaybackStore');
      await usePlaybackStore.getState().handleQueueEnded();
    } catch (e) {
      console.warn('[PlaybackService] PlaybackQueueEnded handler failed:', e);
    }
  });

  // ─── Playback Error ───────────────────────────────────────────────────────
  TrackPlayer.addEventListener(Event.PlaybackError, async (event: any) => {
    console.warn('[PlaybackService] Playback error:', event);
    try {
      const { usePlaybackStore } = require('./store/usePlaybackStore');
      // Skip to next on error
      setTimeout(() => {
        usePlaybackStore.getState().nextTrack();
      }, 1500);
    } catch (e) {}
  });
}
