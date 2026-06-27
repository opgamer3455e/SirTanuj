import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer, { Instance as PeerInstance } from 'simple-peer';

interface PeerData {
  peer: PeerInstance;
  peerId: string;       // socket.id of the remote peer
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
    const socket = io(SIGNALING_SERVER);
    socketRef.current = socket;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Tell the server we're joining
        socket.emit('join-room', roomId, currentUserId);

        // Server tells us who is already in the room.
        // WE are the initiator for each of those existing users.
        socket.on('all-users', (userSocketIds: string[]) => {
          console.log('[WebRTC] all-users:', userSocketIds);
          userSocketIds.forEach((remoteSocketId) => {
            const peer = new Peer({
              initiator: true,
              trickle: true,
              stream,
            });

            peer.on('signal', (signal) => {
              socket.emit('relay-signal', {
                targetId: remoteSocketId,
                signal,
              });
            });

            peer.on('stream', (remoteStream) => {
              updatePeerStream(remoteSocketId, remoteStream);
            });

            peer.on('error', (err) => console.error(`[WebRTC] Peer error (${remoteSocketId}):`, err));

            const peerData: PeerData = {
              peer,
              peerId: remoteSocketId,
              isSpeaking: false,
              videoEnabled: true,
              audioEnabled: true,
            };
            peersRef.current.push(peerData);
          });
          setPeers([...peersRef.current]);
        });

        // A new user joined AFTER us. They will NOT initiate — we wait for their signal.
        socket.on('user-joined', (remoteSocketId: string) => {
          console.log('[WebRTC] user-joined:', remoteSocketId);
          // Don't create peer yet; we'll create it when we receive their signal
        });

        // Generic signal relay — handles offers, answers, and ICE candidates.
        socket.on('relay-signal', (payload: { senderId: string; signal: any }) => {
          const { senderId, signal } = payload;
          console.log('[WebRTC] relay-signal from:', senderId, signal.type || 'candidate');

          const existing = peersRef.current.find((p) => p.peerId === senderId);
          if (existing) {
            // We already have a peer for this user — feed the signal
            existing.peer.signal(signal);
          } else {
            // We don't have a peer for this user yet — we are the responder
            const peer = new Peer({
              initiator: false,
              trickle: true,
              stream,
            });

            peer.on('signal', (sig) => {
              socket.emit('relay-signal', {
                targetId: senderId,
                signal: sig,
              });
            });

            peer.on('stream', (remoteStream) => {
              updatePeerStream(senderId, remoteStream);
            });

            peer.on('error', (err) => console.error(`[WebRTC] Peer error (${senderId}):`, err));

            // Feed the incoming signal that triggered creation
            peer.signal(signal);

            const peerData: PeerData = {
              peer,
              peerId: senderId,
              isSpeaking: false,
              videoEnabled: true,
              audioEnabled: true,
            };
            peersRef.current.push(peerData);
            setPeers([...peersRef.current]);
          }
        });

        // Someone left
        socket.on('user-disconnected', (remoteSocketId: string) => {
          console.log('[WebRTC] user-disconnected:', remoteSocketId);
          const peerToRemove = peersRef.current.find((p) => p.peerId === remoteSocketId);
          if (peerToRemove) {
            peerToRemove.peer.destroy();
          }
          peersRef.current = peersRef.current.filter((p) => p.peerId !== remoteSocketId);
          setPeers([...peersRef.current]);
        });

        // Media state broadcast from other users
        socket.on('user-media-state-changed', ({ userId, state }: { userId: string; state: any }) => {
          peersRef.current = peersRef.current.map((p) => {
            if (p.peerId === userId) {
              return { ...p, ...state };
            }
            return p;
          });
          setPeers([...peersRef.current]);
        });
      })
      .catch((err) => {
        console.error('[WebRTC] getUserMedia failed:', err);
      });

    return () => {
      socket.disconnect();
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
      peersRef.current.forEach((p) => p.peer.destroy());
      peersRef.current = [];
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  function updatePeerStream(peerId: string, stream: MediaStream) {
    peersRef.current = peersRef.current.map((p) => {
      if (p.peerId === peerId) {
        return { ...p, stream };
      }
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
      if (track) {
        track.enabled = isMuted; // toggle
        setIsMuted(!isMuted);
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const track = localStreamRef.current.getVideoTracks()[0];
      if (track) {
        track.enabled = isVideoOff; // toggle
        setIsVideoOff(!isVideoOff);
      }
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

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }
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
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
      }
      setIsScreenSharing(false);
    }
  };

  return {
    peers,
    localVideoRef,
    isMuted,
    isVideoOff,
    isScreenSharing,
    toggleMute,
    toggleVideo,
    toggleScreenShare,
  };
}
