import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Share, Clipboard } from 'react-native';
import { Radio, Users, Play, Pause, LogOut, Copy, Share2, Music, CheckCircle } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer from 'react-native-track-player';
import { usePlaybackStore } from '../store/usePlaybackStore';
import { Track } from '../services/ytmusic';

// Lazy load PeerJS to prevent compilation issues in standard environments
let Peer: any = null;
try {
  Peer = require('peerjs').Peer;
} catch (e) {
  console.warn('[JamScreen] PeerJS require failed');
}

export default function JamScreen() {
  const [role, setRole] = useState<'host' | 'guest' | null>(null);
  const [roomId, setRoomId] = useState('');
  const [joinId, setJoinId] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  // PeerJS refs
  const peerRef = useRef<any>(null);
  const connectionsRef = useRef<any[]>([]);
  const [activeConnections, setActiveConnections] = useState<number>(0);

  // Playback store selectors
  const currentTrack = usePlaybackStore((s) => s.currentTrack);
  const isPlaying = usePlaybackStore((s) => s.isPlaying);
  const playTrack = usePlaybackStore((s) => s.playTrack);
  const setPlaying = usePlaybackStore((s) => s.setPlaying);
  // Note: sound is always null with react-native-track-player (handled natively)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnectSession();
    };
  }, []);

  // 1. HOST SYNC: Detect and broadcast playback state changes
  useEffect(() => {
    if (role !== 'host' || connectionsRef.current.length === 0) return;

    const unsubscribe = usePlaybackStore.subscribe(
      (state, prevState) => {
        const trackChanged = state.currentTrack?.track_id !== prevState.currentTrack?.track_id;
        const playStateChanged = state.isPlaying !== prevState.isPlaying;
        const seeked = Math.abs(state.currentTime - prevState.currentTime) > 1.8 && !state.isScrubbing && !prevState.isScrubbing;

        if (trackChanged || playStateChanged || seeked) {
          broadcastData({
            type: 'SYNC',
            currentTrack: state.currentTrack,
            isPlaying: state.isPlaying,
            currentTime: state.currentTime,
            sentAt: Date.now(),
          });
        }
      }
    );

    return () => unsubscribe();
  }, [role, activeConnections]);

  // Periodic alignment tick to prevent clock drift
  useEffect(() => {
    if (role !== 'host' || connectionsRef.current.length === 0) return;

    const tickInterval = setInterval(() => {
      const state = usePlaybackStore.getState();
      if (state.isPlaying) {
        broadcastData({
          type: 'TICK',
          currentTime: state.currentTime,
          sentAt: Date.now(),
        });
      }
    }, 4000);

    return () => clearInterval(tickInterval);
  }, [role, activeConnections]);

  // 2. PeerJS Setup Helper
  const initPeer = (customId?: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!Peer) {
        reject(new Error('PeerJS module not loaded'));
        return;
      }

      try {
        const newPeer = new Peer(customId, {
          host: '0.peerjs.com',
          port: 443,
          secure: true,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' },
            ],
          },
        });

        newPeer.on('open', (id: string) => {
          console.log(`[JamPeer] Connection open. Peer ID: ${id}`);
          resolve(newPeer);
        });

        newPeer.on('error', (err: any) => {
          console.error('[JamPeer] Peer error:', err);
          reject(err);
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  // 3. Create Session (Acting as Host)
  const handleCreateSession = async () => {
    if (connecting) return;
    setConnecting(true);
    setRole(null);

    // Generate random 5 character uppercase room ID
    const randomId = Math.random().toString(36).substring(2, 7).toUpperCase();
    const finalRoomId = `MF-${randomId}`;

    try {
      const peer = await initPeer(finalRoomId);
      peerRef.current = peer;
      setRoomId(finalRoomId);
      setRole('host');

      // Listen for incoming guest connections
      peer.on('connection', (conn: any) => {
        console.log(`[JamHost] Guest connected: ${conn.peer}`);
        
        conn.on('open', () => {
          connectionsRef.current.push(conn);
          setActiveConnections(connectionsRef.current.length);
          setParticipants((prev) => [...prev, `Listener-${conn.peer.substring(3, 7)}`]);

          // Immediately sync current track state with the newly joined guest
          const state = usePlaybackStore.getState();
          conn.send({
            type: 'SYNC',
            currentTrack: state.currentTrack,
            isPlaying: state.isPlaying,
            currentTime: state.currentTime,
            sentAt: Date.now(),
          });
        });

        conn.on('close', () => {
          connectionsRef.current = connectionsRef.current.filter((c) => c.peer !== conn.peer);
          setActiveConnections(connectionsRef.current.length);
          setParticipants((prev) => prev.filter((p) => !p.endsWith(conn.peer.substring(3, 7))));
          console.log(`[JamHost] Guest disconnected: ${conn.peer}`);
        });

        conn.on('error', (err: any) => {
          console.warn(`[JamHost] Connection error for ${conn.peer}:`, err);
        });
      });

    } catch (err) {
      Alert.alert('Connection Failed', 'Failed to initialize Jam room. Check network connection.');
      disconnectSession();
    } finally {
      setConnecting(false);
    }
  };

  // 4. Join Session (Acting as Guest)
  const handleJoinSession = async () => {
    if (!joinId.trim() || connecting) return;
    setConnecting(true);
    setRole(null);

    const targetRoomId = joinId.trim().toUpperCase();

    try {
      const peer = await initPeer();
      peerRef.current = peer;

      console.log(`[JamGuest] Connecting to host: ${targetRoomId}`);
      const conn = peer.connect(targetRoomId, {
        reliable: true,
      });

      conn.on('open', () => {
        console.log('[JamGuest] Connected to host!');
        connectionsRef.current.push(conn);
        setActiveConnections(connectionsRef.current.length);
        setRoomId(targetRoomId);
        setRole('guest');
        setConnecting(false);
      });

      // Handle synchronization data incoming from the host
      conn.on('data', (data: any) => {
        handleIncomingData(data);
      });

      conn.on('close', () => {
        Alert.alert('Session Ended', 'The Host has disconnected or closed the Jam session.');
        disconnectSession();
      });

      conn.on('error', (err: any) => {
        console.error('[JamGuest] Connection error:', err);
        Alert.alert('Error', 'Connection to host lost.');
        disconnectSession();
      });

    } catch (err) {
      Alert.alert('Join Failed', 'Unable to find or connect to the requested Room ID.');
      disconnectSession();
      setConnecting(false);
    }
  };

  // 5. Broadcast Helper
  const broadcastData = (data: any) => {
    connectionsRef.current.forEach((conn) => {
      if (conn.open) {
        conn.send(data);
      }
    });
  };

  // 6. Handle Incoming Synchronizations (Guest side)
  const handleIncomingData = (data: any) => {
    if (!data) return;
    const state = usePlaybackStore.getState();

    if (data.type === 'SYNC') {
      // Sync active track
      if (data.currentTrack && state.currentTrack?.track_id !== data.currentTrack.track_id) {
        state.playTrack(data.currentTrack);
      }
      
      // Sync playing state
      if (state.isPlaying !== data.isPlaying) {
        state.setPlaying(data.isPlaying);
      }

      // Sync position with latency compensation
      const latency = (Date.now() - data.sentAt) / 1000;
      const compensatedTime = data.currentTime + latency;
      const drift = Math.abs(state.currentTime - compensatedTime);

      if (drift > 1.8) {
        TrackPlayer.seekTo(compensatedTime).catch(() => {});
      }
    } else if (data.type === 'TICK') {
      // Check clock alignment periodically
      const latency = (Date.now() - data.sentAt) / 1000;
      const compensatedTime = data.currentTime + latency;
      const drift = Math.abs(state.currentTime - compensatedTime);

      if (drift > 1.8 && state.isPlaying) {
        TrackPlayer.seekTo(compensatedTime).catch(() => {});
      }
    }
  };

  // 7. Close and Disconnect
  const disconnectSession = () => {
    // Close connections
    connectionsRef.current.forEach((conn) => {
      try { conn.close(); } catch (_) {}
    });
    connectionsRef.current = [];
    setActiveConnections(0);

    // Destroy Peer instance
    if (peerRef.current) {
      try { peerRef.current.destroy(); } catch (_) {}
      peerRef.current = null;
    }

    setRole(null);
    setRoomId('');
    setParticipants([]);
  };

  const handleCopyId = () => {
    Clipboard.setString(roomId);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🎵 Join my Jam session on MuseFlow!\nRoom ID: ${roomId}\nLet's listen together!`,
      });
    } catch (e) {
      console.warn('Share sheet failed:', e);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Jam Room</Text>
        <Text style={styles.subtitle}>Synchronized real-time co-listening via Peer WebRTC.</Text>
      </View>

      {/* State: Not Connected */}
      {role === null && (
        <View style={styles.lobbyWrapper}>
          {/* Card: Host */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Radio size={20} color="#a855f7" />
              <Text style={styles.cardTitle}>Host a Session</Text>
            </View>
            <Text style={styles.cardDescription}>
              Generate a unique Room ID. Share the ID with friends so they can tune in and listen to your active queue in real-time.
            </Text>

            <TouchableOpacity 
              style={[styles.actionButton, styles.hostButton]} 
              onPress={handleCreateSession}
              disabled={connecting}
            >
              {connecting ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <Radio size={18} color="#ffffff" style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Start Jam Session</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Card: Join Guest */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Users size={20} color="#3b82f6" />
              <Text style={styles.cardTitle}>Join a Session</Text>
            </View>
            <Text style={styles.cardDescription}>
              Enter a friend's active Jam Room ID to connect and synchronize your playback with theirs.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. MF-XM8K2"
              placeholderTextColor="#71717a"
              value={joinId}
              onChangeText={setJoinId}
              autoCapitalize="characters"
              autoCorrect={false}
              editable={!connecting}
            />

            <TouchableOpacity 
              style={[styles.actionButton, styles.joinButton]} 
              onPress={handleJoinSession}
              disabled={!joinId.trim() || connecting}
            >
              {connecting ? (
                <ActivityIndicator size="small" color="#000000" />
              ) : (
                <>
                  <Users size={18} color="#000000" style={{ marginRight: 8 }} />
                  <Text style={styles.joinButtonText}>Connect to Jam</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* State: Connected (Host or Guest) */}
      {role !== null && (
        <View style={styles.sessionWrapper}>
          {/* Room ID Info Panel */}
          <View style={styles.card}>
            <View style={styles.sessionHeaderRow}>
              <View>
                <Text style={styles.sessionLabel}>ACTIVE ROOM ID</Text>
                <Text style={styles.sessionRoomId}>{roomId}</Text>
              </View>
              <View style={styles.shareActions}>
                <TouchableOpacity style={styles.iconButton} onPress={handleCopyId}>
                  {copySuccess ? <CheckCircle size={18} color="#10b981" /> : <Copy size={18} color="#ffffff" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
                  <Share2 size={18} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.statusDivider} />

            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>My Role:</Text>
              <Text style={[styles.statusValue, role === 'host' ? styles.hostValue : styles.guestValue]}>
                {role.toUpperCase()}
              </Text>
            </View>

            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Connected Listeners:</Text>
              <Text style={styles.statusValue}>{activeConnections}</Text>
            </View>
          </View>

          {/* Sync Playback Card */}
          {currentTrack ? (
            <View style={styles.nowPlayingCard}>
              <View style={styles.nowPlayingRow}>
                <Music size={24} color="#a855f7" />
                <View style={styles.trackDetails}>
                  <Text style={styles.trackTitle} numberOfLines={1}>{currentTrack.title}</Text>
                  <Text style={styles.trackSubtitle} numberOfLines={1}>{currentTrack.artists}</Text>
                </View>
                <View style={styles.playingStatusBadge}>
                  {isPlaying ? (
                    <Text style={styles.badgePlaying}>SYNCING</Text>
                  ) : (
                    <Text style={styles.badgePaused}>PAUSED</Text>
                  )}
                </View>
              </View>
              {role === 'guest' && (
                <Text style={styles.guestDisclaimer}>
                  🔒 Playback is synchronized and controlled by the Host.
                </Text>
              )}
            </View>
          ) : (
            <View style={styles.nowPlayingCard}>
              <Text style={styles.noTrackText}>No active track playing in session.</Text>
            </View>
          )}

          {/* Participants List */}
          {role === 'host' && participants.length > 0 && (
            <View style={styles.card}>
              <Text style={styles.participantsTitle}>Room Participants</Text>
              {participants.map((person, idx) => (
                <View key={idx} style={styles.participantRow}>
                  <Users size={14} color="#a1a1aa" style={{ marginRight: 8 }} />
                  <Text style={styles.participantName}>{person}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Leave Button */}
          <TouchableOpacity style={styles.leaveButton} onPress={disconnectSession}>
            <LogOut size={18} color="#f43f5e" style={{ marginRight: 8 }} />
            <Text style={styles.leaveButtonText}>Leave Jam Session</Text>
          </TouchableOpacity>
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
    paddingBottom: 120,
  },
  header: {
    marginBottom: 25,
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
  lobbyWrapper: {
    width: '100%',
  },
  card: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 10,
  },
  cardDescription: {
    fontSize: 13,
    color: '#a1a1aa',
    lineHeight: 18,
    marginBottom: 20,
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hostButton: {
    backgroundColor: '#a855f7',
  },
  joinButton: {
    backgroundColor: '#ffffff',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  joinButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#09090b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 12,
    padding: 12,
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: 2,
  },
  sessionWrapper: {
    width: '100%',
  },
  sessionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionLabel: {
    fontSize: 10,
    color: '#71717a',
    fontWeight: '700',
  },
  sessionRoomId: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: 1.5,
  },
  shareActions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    backgroundColor: '#27272a',
    borderRadius: 10,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDivider: {
    height: 1,
    backgroundColor: '#27272a',
    marginVertical: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 13,
    color: '#a1a1aa',
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '600',
  },
  hostValue: {
    color: '#a855f7',
  },
  guestValue: {
    color: '#3b82f6',
  },
  nowPlayingCard: {
    backgroundColor: '#a855f710',
    borderWidth: 1,
    borderColor: '#a855f730',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  nowPlayingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackDetails: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
  },
  trackTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  trackSubtitle: {
    fontSize: 11,
    color: '#a1a1aa',
    marginTop: 2,
  },
  playingStatusBadge: {
    backgroundColor: '#a855f725',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgePlaying: {
    fontSize: 9,
    color: '#a855f7',
    fontWeight: '800',
  },
  badgePaused: {
    fontSize: 9,
    color: '#71717a',
    fontWeight: '800',
  },
  guestDisclaimer: {
    fontSize: 10,
    color: '#a1a1aa',
    marginTop: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  noTrackText: {
    textAlign: 'center',
    color: '#71717a',
    fontSize: 13,
    fontStyle: 'italic',
  },
  participantsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a20',
  },
  participantName: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '500',
  },
  leaveButton: {
    backgroundColor: '#f43f5e15',
    borderWidth: 1,
    borderColor: '#f43f5e30',
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  leaveButtonText: {
    color: '#f43f5e',
    fontSize: 14,
    fontWeight: '700',
  },
});
