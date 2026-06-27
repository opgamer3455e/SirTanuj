import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebRTC } from '../hooks/useWebRTC';
import { useAntiRecording } from '../hooks/useAntiRecording';
import { Watermark } from '../components/ui/Watermark';
import { Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff, MessageSquare, Users, Disc } from 'lucide-react';
import { Instance as PeerInstance } from 'simple-peer';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

const VideoStream = ({ peerData }: { peerData: any }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current && peerData.stream) {
      ref.current.srcObject = peerData.stream;
    }
  }, [peerData.stream]);

  if (!peerData.videoEnabled) {
    return (
      <div className="w-full h-full bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-3xl font-bold uppercase ring-4 ring-zinc-800/50">
          {(peerData.peerId || 'P').substring(0, 2)}
        </div>
        {peerData.isSpeaking && (
          <motion.div 
            className="absolute inset-0 border-2 border-emerald-500 rounded-2xl"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden relative border border-white/10 shadow-xl ${peerData.isSpeaking ? 'ring-2 ring-emerald-500' : ''}`}>
      <video
        ref={ref}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md text-xs font-semibold text-white/90">
        {(peerData.peerId || 'Peer').substring(0, 8)}
      </div>
    </div>
  );
};

export default function LiveClassroom() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  // Using a mock user ID based on random string for demo, normally from auth context
  const [userId] = useState(() => `student_${Math.random().toString(36).substring(2, 8)}`);
  
  const { isBlurred } = useAntiRecording();
  const {
    peers,
    localVideoRef,
    isMuted,
    isVideoOff,
    isScreenSharing,
    toggleMute,
    toggleVideo,
    toggleScreenShare,
  } = useWebRTC(roomId || 'main-room', userId);

  const { appUser } = useFirebaseAuth();
  const isTeacher = appUser?.role === 'TEACHER' || appUser?.role === 'ADMIN';

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        mediaRecorderRef.current = recorder;
        recordedChunksRef.current = [];
        
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) recordedChunksRef.current.push(e.data);
        };
        
        recorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = `recording_${roomId}.webm`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          
          // Stop all tracks to remove the screen sharing icon from browser tab
          stream.getTracks().forEach(track => track.stop());
        };
        
        recorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Recording failed", err);
        alert("Recording permission denied or failed.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-[#0a0a0a] text-white overflow-hidden">
      <Watermark userId={userId} />

      {/* Anti-Recording Blur Overlay */}
      <AnimatePresence>
        {isBlurred && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(30px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 z-50 bg-black/40 flex flex-col items-center justify-center pointer-events-none"
          >
            <MonitorUp className="w-16 h-16 text-white/50 mb-4" />
            <h2 className="text-2xl font-bold tracking-wider">Stream Paused</h2>
            <p className="text-white/60 mt-2">Click inside the window to resume the class.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-3">
            Classroom: {roomId}
            {isRecording && (
              <span className="px-2 py-0.5 bg-red-500/20 text-red-500 text-xs tracking-widest rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> REC
              </span>
            )}
          </h1>
          <p className="text-xs text-white/50 font-mono mt-1">Encrypted Hybrid Mesh • {peers.length + 1} Participants</p>
        </div>
      </div>

      {/* Video Grid Area */}
      <div className={`pt-24 pb-32 px-6 h-screen flex transition-all duration-300 ${isChatOpen ? 'pr-[340px]' : ''}`}>
        <div className="w-full h-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          
          {/* Local Video */}
          <div className="w-full h-full rounded-2xl overflow-hidden relative border border-white/10 bg-zinc-900 shadow-xl group">
             {!isVideoOff ? (
               <video
                 ref={localVideoRef}
                 autoPlay
                 playsInline
                 muted
                 className={`w-full h-full object-cover ${isScreenSharing ? 'object-contain' : ''} ${!isScreenSharing ? 'scale-x-[-1]' : ''}`}
               />
             ) : (
               <div className="w-full h-full flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-3xl font-bold uppercase ring-4 ring-zinc-800/50">
                    You
                  </div>
               </div>
             )}
             <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md text-xs font-semibold text-white/90">
               You {isMuted && <span className="ml-2 text-red-400">Muted</span>}
             </div>
          </div>

          {/* Remote Peers */}
          {peers.map((peerData, index) => (
            <VideoStream key={index} peerData={peerData} />
          ))}

        </div>
      </div>

      {/* Bottom Floating Control Dock */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-3 p-3 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
          
          <button 
            onClick={toggleMute}
            className={`p-4 rounded-xl flex items-center justify-center transition-all ${isMuted ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/5 text-white hover:bg-white/10'}`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button 
            onClick={toggleVideo}
            className={`p-4 rounded-xl flex items-center justify-center transition-all ${isVideoOff ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/5 text-white hover:bg-white/10'}`}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          <button 
            onClick={toggleScreenShare}
            className={`p-4 rounded-xl flex items-center justify-center transition-all ${isScreenSharing ? 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30' : 'bg-white/5 text-white hover:bg-white/10'}`}
          >
            <MonitorUp className="w-5 h-5" />
          </button>

          <div className="w-px h-8 bg-white/10 mx-2" />

          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`p-4 rounded-xl flex items-center justify-center transition-all ${isChatOpen ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-white hover:bg-white/10'}`}
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {isTeacher && (
            <button 
              onClick={toggleRecording}
              className={`p-4 rounded-xl flex items-center justify-center transition-all ${isRecording ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'}`}
              title={isRecording ? "Stop Recording" : "Start Recording"}
            >
              <Disc className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
            </button>
          )}

          <button 
            onClick={() => navigate('/live')}
            className="p-4 px-6 rounded-xl flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-lg shadow-red-500/20 ml-2"
          >
            <PhoneOff className="w-5 h-5" />
            <span>Leave</span>
          </button>

        </div>
      </div>

      {/* Slide-out Chat Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 bottom-0 w-[320px] bg-[#111] border-l border-white/5 shadow-2xl z-30 flex flex-col"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
              <h3 className="font-bold tracking-tight">Class Chat</h3>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Users className="w-3 h-3" /> {peers.length + 1}
              </div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-end space-y-4">
              <div className="text-center text-xs text-white/30 uppercase tracking-widest my-4">Chat Started</div>
              <div className="p-3 bg-white/5 rounded-xl text-sm border border-white/5">
                <span className="font-bold text-emerald-400 text-xs block mb-1">System</span>
                Welcome to the live class. This session is end-to-end encrypted and unrecordable.
              </div>
            </div>

            <div className="p-4 border-t border-white/5 bg-black/20">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-white placeholder:text-white/30"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
