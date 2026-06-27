import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Play, Video, Radio, Loader2 } from 'lucide-react';

interface LiveClassEntry {
  _id: string;
  title: string;
  description: string;
  roomId: string;
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED';
  scheduledFor: string;
  teacherName: string;
  createdAt: string;
}

export default function LiveClassesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'past'>('live');
  const [classes, setClasses] = useState<LiveClassEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
    // Poll every 15 seconds for live status updates
    const interval = setInterval(fetchClasses, 15000);
    return () => clearInterval(interval);
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/live-classes');
      if (res.ok) {
        const data = await res.json();
        setClasses(data);
      }
    } catch (err) {
      console.error('Failed to fetch classes:', err);
    } finally {
      setLoading(false);
    }
  };

  const liveClasses = useMemo(() => classes.filter(c => c.status === 'LIVE'), [classes]);
  const scheduledClasses = useMemo(() => classes.filter(c => c.status === 'SCHEDULED'), [classes]);
  const completedClasses = useMemo(() => classes.filter(c => c.status === 'COMPLETED'), [classes]);

  const displayedClasses = useMemo(() => {
    if (activeTab === 'live') return liveClasses;
    if (activeTab === 'upcoming') return scheduledClasses;
    return completedClasses;
  }, [activeTab, liveClasses, scheduledClasses, completedClasses]);

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#050505] bg-noise relative overflow-hidden">

      <div className="absolute top-0 right-0 w-full h-full atmospheric-gradient pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        <header className="mb-16 border-b border-white/10 pb-10 flex flex-col md:flex-row justify-between items-end">
          <div>
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FC642D]/10 border border-[#FC642D]/20 text-[#FC642D] text-xs font-bold mb-6 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FC642D] animate-pulse" />
              Live Sessions
              {liveClasses.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-red-500 text-white rounded-full text-[10px]">
                  {liveClasses.length} LIVE
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-['Cinzel'] leading-tight">
              Interactive <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FC642D] to-[#ffb299] italic">Broadcasts</span>
            </h1>
          </div>
          <p className="text-lg text-zinc-400 font-['Playfair_Display'] max-w-sm italic border-l-2 border-[#FC642D]/30 pl-4 mt-6 md:mt-0">
            Join real-time interactive sessions with expert educators. Ask questions, participate in polls, and learn collaboratively.
          </p>
        </header>

        {/* Filters / Tabs */}
        <div className="flex justify-start mb-12">
          <div className="bg-black/40 p-1.5 rounded-full border border-white/10 inline-flex shadow-inner">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-8 py-3 rounded-full text-sm font-['Cinzel'] font-bold transition-all flex items-center gap-2 ${
                activeTab === 'live'
                ? 'bg-red-500/20 text-red-400 shadow-lg backdrop-blur-md border border-red-500/20'
                : 'text-zinc-500 hover:text-white'
              }`}
            >
              <Radio size={14} className={activeTab === 'live' ? 'animate-pulse' : ''} />
              Live Now
              {liveClasses.length > 0 && (
                <span className="px-1.5 py-0.5 bg-red-500 text-white rounded-full text-[10px] font-bold">{liveClasses.length}</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-3 rounded-full text-sm font-['Cinzel'] font-bold transition-all ${
                activeTab === 'upcoming'
                ? 'bg-white/10 text-white shadow-lg backdrop-blur-md'
                : 'text-zinc-500 hover:text-white'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-8 py-3 rounded-full text-sm font-['Cinzel'] font-bold transition-all ${
                activeTab === 'past'
                ? 'bg-white/10 text-white shadow-lg backdrop-blur-md'
                : 'text-zinc-500 hover:text-white'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Class List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-20 glass-panel rounded-3xl">
              <Loader2 className="mx-auto text-zinc-500 mb-4 animate-spin" size={32} />
              <p className="text-zinc-500">Loading sessions...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {displayedClasses.map((session, index) => {
                const isLive = session.status === 'LIVE';

                return (
                  <motion.div
                    key={session._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`glass-panel rounded-3xl p-6 md:p-8 border hover:border-white/20 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden ${
                      isLive ? 'border-[#FC642D]/30 shadow-[0_0_30px_rgba(252,100,45,0.1)]' : ''
                    }`}
                  >
                    {isLive && (
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FC642D]/10 blur-[80px] rounded-full pointer-events-none" />
                    )}

                    <div className="flex-1 relative z-10">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        {isLive ? (
                          <span className="bg-[#FC642D]/10 border border-[#FC642D]/30 text-[#FC642D] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#FC642D] rounded-full animate-pulse" /> LIVE NOW
                          </span>
                        ) : session.status === 'SCHEDULED' ? (
                          <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                            Scheduled
                          </span>
                        ) : (
                          <span className="bg-white/5 border border-white/10 text-zinc-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                            Completed
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2 font-['Cinzel'] leading-snug">{session.title}</h3>
                      {session.description && (
                        <p className="text-sm text-zinc-400 mb-4">{session.description}</p>
                      )}

                      <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 font-['Playfair_Display']">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-[#C9A84C]" />
                          {session.teacherName || 'Teacher'}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-[#00A699]" />
                          <time dateTime={session.scheduledFor}>
                            {new Date(session.scheduledFor).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </time>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-[#FF5A5F]" />
                          <time dateTime={session.scheduledFor}>
                            {new Date(session.scheduledFor).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </time>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-auto mt-4 md:mt-0 relative z-10">
                      {isLive ? (
                        <button
                          onClick={() => navigate(`/live/${session.roomId}`)}
                          className="w-full md:w-auto px-8 py-4 rounded-full font-bold font-['Cinzel'] text-sm tracking-widest transition-all flex items-center justify-center gap-2 bg-[#FC642D] hover:bg-[#ff7544] text-white shadow-[0_0_20px_rgba(252,100,45,0.4)]"
                        >
                          <Video size={18} /> Join Broadcast
                        </button>
                      ) : session.status === 'COMPLETED' ? (
                        <button className="w-full md:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold font-['Cinzel'] text-sm tracking-widest border border-white/10 transition-colors flex items-center justify-center gap-2">
                          <Play size={18} /> Watch Replay
                        </button>
                      ) : (
                        <button className="w-full md:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold font-['Cinzel'] text-sm tracking-widest border border-white/10 transition-colors flex items-center justify-center gap-2">
                          Set Reminder
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}

          {!loading && displayedClasses.length === 0 && (
            <div className="text-center py-20 glass-panel rounded-3xl">
              <Calendar className="mx-auto text-zinc-600 mb-6" size={48} />
              <h3 className="text-2xl font-bold text-white mb-2 font-['Cinzel']">
                {activeTab === 'live' ? 'No live classes right now' : activeTab === 'upcoming' ? 'No upcoming classes' : 'No completed classes'}
              </h3>
              <p className="text-zinc-400 font-['Playfair_Display'] text-lg">Check back later for updates to the schedule.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
