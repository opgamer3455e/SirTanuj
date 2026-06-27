import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer, { Instance as PeerInstance } from 'simple-peer';

interface PeerData {
  peer: PeerInstance;
  userId: string;
  stream?: MediaStream;
  isSpeaking: boolean;
  videoEnabled: boolean;
  audioEnabled: boolean;
}

export function useWebRTC(roomId: string, currentUserId: string) {
  const [peers, setPeers] = useState<PeerData[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  const socketRef = useRef<Socket | null>(null);
  const peersRef = useRef<PeerData[]>([]);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Initialize socket and local stream
  useEffect(() => {
    socketRef.current = io('http://localhost:5001');

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      socketRef.current?.emit('join-room', roomId, currentUserId);

      socketRef.current?.on('all-users', (users: string[]) => {
        const newPeers: PeerData[] = [];
        users.forEach((userID) => {
          const peer = createPeer(userID, socketRef.current!.id, stream);
          const peerData = { peer, userId: userID, isSpeaking: false, videoEnabled: true, audioEnabled: true };
          peersRef.current.push(peerData);
          newPeers.push(peerData);
        });
        setPeers([...peersRef.current]);
      });

      socketRef.current?.on('user-connected', (userID: string) => {
        const peer = addPeer(userID, socketRef.current!.id, stream);
        const peerData = { peer, userId: userID, isSpeaking: false, videoEnabled: true, audioEnabled: true };
        peersRef.current.push(peerData);
        setPeers([...peersRef.current]);
      });

      socketRef.current?.on('offer', (payload) => {
        const peerToSignal = peersRef.current.find(p => p.userId === payload.callerID);
        if (peerToSignal) {
           peerToSignal.peer.signal(payload.signal);
        } else {
           // If we don't have this peer yet, create it and accept the offer
           const peer = addPeer(payload.callerID, socketRef.current!.id, stream);
           peer.signal(payload.signal);
           const peerData = { peer, userId: payload.callerID, isSpeaking: false, videoEnabled: true, audioEnabled: true };
           peersRef.current.push(peerData);
           setPeers([...peersRef.current]);
        }
      });
      
      socketRef.current?.on('answer', (payload) => {
        const item = peersRef.current.find((p) => p.userId === payload.id);
        if (item) {
          item.peer.signal(payload.signal);
        }
      });

      socketRef.current?.on('user-disconnected', (userId: string) => {
        const peerToRemove = peersRef.current.find((p) => p.userId === userId);
        if (peerToRemove) {
          peerToRemove.peer.destroy();
        }
        peersRef.current = peersRef.current.filter((p) => p.userId !== userId);
        setPeers([...peersRef.current]);
      });

      // Hybrid Mesh Smart Filtering: Listen for peer media state changes
      socketRef.current?.on('user-media-state-changed', ({ userId, state }) => {
        peersRef.current = peersRef.current.map(p => {
           if (p.userId === userId) {
             return { ...p, ...state };
           }
           return p;
        });
        setPeers([...peersRef.current]);
      });

    });

    return () => {
      socketRef.current?.disconnect();
      localStream?.getTracks().forEach((track) => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  function createPeer(userToSignal: string, callerID: string, stream: MediaStream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current?.emit('offer', {
        userToSignal,
        callerID,
        signal,
      });
    });

    peer.on('stream', (incomingStream) => {
      updatePeerStream(userToSignal, incomingStream);
    });

    return peer;
  }

  function addPeer(incomingSignalUserId: string, callerID: string, stream: MediaStream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current?.emit('answer', { signal, callerID: incomingSignalUserId });
    });

    peer.on('stream', (incomingStream) => {
       updatePeerStream(incomingSignalUserId, incomingStream);
    });

    return peer;
  }

  function updatePeerStream(userId: string, stream: MediaStream) {
     peersRef.current = peersRef.current.map(p => {
        if (p.userId === userId) {
          return { ...p, stream };
        }
        return p;
     });
     setPeers([...peersRef.current]);
  }

  // --- Hybrid Mesh Smart Bandwidth Controls ---
  
  const broadcastMediaState = useCallback(() => {
    socketRef.current?.emit('update-media-state', roomId, {
      isSpeaking: !isMuted, // Simplified active speaker metric
      videoEnabled: !isVideoOff,
      audioEnabled: !isMuted
    });
  }, [roomId, isMuted, isVideoOff]);

  useEffect(() => {
     broadcastMediaState();
  }, [isMuted, isVideoOff, broadcastMediaState]);

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks()[0].enabled = isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      // Smart Bandwidth: Disabling the track stops transmission on WebRTC
      localStream.getVideoTracks()[0].enabled = isVideoOff;
      setIsVideoOff(!isVideoOff);
    }
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ cursor: 'always' } as any);
        const screenTrack = screenStream.getVideoTracks()[0];
        
        // Replace video track for all peers
        peersRef.current.forEach(({ peer }) => {
           const videoTrack = localStream?.getVideoTracks()[0];
           if (videoTrack && peer.streams[0]) {
             peer.replaceTrack(videoTrack, screenTrack, peer.streams[0]);
           }
        });

        screenTrack.onended = () => {
           // Revert back to camera
           stopScreenShare();
        };

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }
        setIsScreenSharing(true);
      } catch (err) {
        console.error("Error sharing screen:", err);
      }
    } else {
      stopScreenShare();
    }
  };

  const stopScreenShare = () => {
    if (localStream) {
       const videoTrack = localStream.getVideoTracks()[0];
       peersRef.current.forEach(({ peer }) => {
          const senders = peer._pc?.getSenders() || [];
          const sender = senders.find(s => s.track && s.track.kind === 'video');
          if (sender) {
             sender.replaceTrack(videoTrack);
          }
       });
       if (localVideoRef.current) {
         localVideoRef.current.srcObject = localStream;
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
