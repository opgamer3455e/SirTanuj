import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer, { Instance as PeerInstance } from 'simple-peer';

interface PeerData {
  peer: PeerInstance;
  peerId: string;
  stream?: MediaStream;
  isSpeaking: boolean;
  videoEnabled: boolean;
  audioEnabled: boolean;
}

const SIGNALING_SERVER = 'http://localhost:5001';

export function useWebRTC(roomId: string, currentUserId: string) {
  const [peers, setPeers] = useState<PeerData[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const peersRef = useRef<PeerData[]>([]);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let destroyed = false;
    const socket = io(SIGNALING_SERVER);
    socketRef.current = socket;

    // Get media first, THEN join room and set up signaling
    const init = async () => {
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      } catch (err) {
        console.warn('[WebRTC] getUserMedia failed, joining without camera:', err);
        // Create a silent dummy stream so peers still connect
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#1a1a1a';
          ctx.fillRect(0, 0, 640, 480);
        }
        const dummyVideoTrack = (canvas as any).captureStream(1).getVideoTracks()[0];
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const dest = audioCtx.createMediaStreamDestination();
        oscillator.connect(dest);
        const silentAudioTrack = dest.stream.getAudioTracks()[0];
        silentAudioTrack.enabled = false; // muted
        stream = new MediaStream([dummyVideoTrack, silentAudioTrack]);
      }

      if (destroyed) { stream.getTracks().forEach(t => t.stop()); return; }

      localStreamRef.current = stream;
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // --- JOIN THE ROOM ---
      socket.emit('join-room', roomId, currentUserId);
      console.log('[WebRTC] Emitted join-room for', roomId);

      // Server tells us who is already in the room. We initiate to each.
      socket.on('all-users', (userSocketIds: string[]) => {
        console.log('[WebRTC] all-users:', userSocketIds);
        userSocketIds.forEach((remoteSocketId) => {
          if (peersRef.current.find(p => p.peerId === remoteSocketId)) return; // no dupes

          const peer = new Peer({ initiator: true, trickle: true, stream });

          peer.on('signal', (signal) => {
            console.log('[WebRTC] Sending signal to', remoteSocketId, signal.type || 'candidate');
            socket.emit('relay-signal', { targetId: remoteSocketId, signal });
          });

          peer.on('stream', (remoteStream) => {
            console.log('[WebRTC] Got stream from', remoteSocketId);
            updatePeerStream(remoteSocketId, remoteStream);
          });

          peer.on('connect', () => console.log('[WebRTC] Peer connected:', remoteSocketId));
          peer.on('error', (err) => console.error('[WebRTC] Peer error:', remoteSocketId, err.message));

          const peerData: PeerData = {
            peer, peerId: remoteSocketId,
            isSpeaking: false, videoEnabled: true, audioEnabled: true,
          };
          peersRef.current.push(peerData);
        });
        setPeers([...peersRef.current]);
      });

      // Incoming signal (offer, answer, or ICE candidate)
      socket.on('relay-signal', (payload: { senderId: string; signal: any }) => {
        const { senderId, signal } = payload;
        console.log('[WebRTC] relay-signal from', senderId, signal.type || 'candidate');

        const existing = peersRef.current.find((p) => p.peerId === senderId);
        if (existing) {
          try { existing.peer.signal(signal); } catch(e) { console.error('[WebRTC] signal error:', e); }
        } else {
          // We are the responder — create a non-initiator peer
          console.log('[WebRTC] Creating responder peer for', senderId);
          const peer = new Peer({ initiator: false, trickle: true, stream });

          peer.on('signal', (sig) => {
            console.log('[WebRTC] Responding to', senderId, sig.type || 'candidate');
            socket.emit('relay-signal', { targetId: senderId, signal: sig });
          });

          peer.on('stream', (remoteStream) => {
            console.log('[WebRTC] Got stream from', senderId);
            updatePeerStream(senderId, remoteStream);
          });

          peer.on('connect', () => console.log('[WebRTC] Peer connected:', senderId));
          peer.on('error', (err) => console.error('[WebRTC] Peer error:', senderId, err.message));

          try { peer.signal(signal); } catch(e) { console.error('[WebRTC] initial signal error:', e); }

          const peerData: PeerData = {
            peer, peerId: senderId,
            isSpeaking: false, videoEnabled: true, audioEnabled: true,
          };
          peersRef.current.push(peerData);
          setPeers([...peersRef.current]);
        }
      });

      // Someone left
      socket.on('user-disconnected', (remoteSocketId: string) => {
        console.log('[WebRTC] user-disconnected:', remoteSocketId);
        const p = peersRef.current.find((p) => p.peerId === remoteSocketId);
        if (p) p.peer.destroy();
        peersRef.current = peersRef.current.filter((p) => p.peerId !== remoteSocketId);
        setPeers([...peersRef.current]);
      });

      // Media state from other users
      socket.on('user-media-state-changed', ({ userId, state }: { userId: string; state: any }) => {
        peersRef.current = peersRef.current.map((p) => {
          if (p.peerId === userId) return { ...p, ...state };
          return p;
        });
        setPeers([...peersRef.current]);
      });
    };

    init();

    return () => {
      destroyed = true;
      socket.disconnect();
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
      peersRef.current.forEach((p) => p.peer.destroy());
      peersRef.current = [];
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  function updatePeerStream(peerId: string, stream: MediaStream) {
    peersRef.current = peersRef.current.map((p) => {
      if (p.peerId === peerId) return { ...p, stream };
      return p;
    });
    setPeers([...peersRef.current]);
  }

  // --- Controls ---

  const broadcastMediaState = useCallback(() => {
    socketRef.current?.emit('update-media-state', roomId, {
      isSpeaking: !isMuted,
      videoEnabled: !isVideoOff,
      audioEnabled: !isMuted,
    });
  }, [roomId, isMuted, isVideoOff]);

  useEffect(() => {
    broadcastMediaState();
  }, [isMuted, isVideoOff, broadcastMediaState]);

  const toggleMute = () => {
    if (localStreamRef.current) {
      const track = localStreamRef.current.getAudioTracks()[0];
      if (track) { track.enabled = isMuted; setIsMuted(!isMuted); }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const track = localStreamRef.current.getVideoTracks()[0];
      if (track) { track.enabled = isVideoOff; setIsVideoOff(!isVideoOff); }
    }
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        peersRef.current.forEach(({ peer }) => {
          const camTrack = localStreamRef.current?.getVideoTracks()[0];
          if (camTrack && peer.streams[0]) {
            peer.replaceTrack(camTrack, screenTrack, peer.streams[0]);
          }
        });
        screenTrack.onended = () => stopScreenShare();
        if (localVideoRef.current) localVideoRef.current.srcObject = screenStream;
        setIsScreenSharing(true);
      } catch (err) {
        console.error('[WebRTC] Screen share error:', err);
      }
    } else {
      stopScreenShare();
    }
  };

  const stopScreenShare = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      peersRef.current.forEach(({ peer }) => {
        const senders = (peer as any)._pc?.getSenders() || [];
        const sender = senders.find((s: any) => s.track && s.track.kind === 'video');
        if (sender) sender.replaceTrack(videoTrack);
      });
      if (localVideoRef.current) localVideoRef.current.srcObject = localStreamRef.current;
      setIsScreenSharing(false);
    }
  };

  return {
    peers,
    localVideoRef,
    isMuted,
    isVideoOff,
    isScreenSharing,
    socket: socketRef.current,
    toggleMute,
    toggleVideo,
    toggleScreenShare,
  };
}
