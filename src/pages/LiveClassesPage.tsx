import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Play, Video } from 'lucide-react';

const mockLiveClasses = [
  {
    id: 1,
    title: 'Advanced Grammar: Clauses & Complex Sentences',
    instructor: 'Prof. Michael Chen',
    date: '2026-06-26',
    time: '10:00 AM',
    duration: '90 min',
    isUpcoming: false,
    classTag: 'Class 10'
  },
  {
    id: 2,
    title: 'Poetry Analysis: The Road Not Taken',
    instructor: 'Dr. Sarah Jenkins',
    date: '2026-06-27',
    time: '02:00 PM',
    duration: '60 min',
    isUpcoming: true,
    classTag: 'Class 9'
  },
  {
    id: 3,
    title: 'Writing Skills: Analytical Paragraph',
    instructor: 'Emma Roberts',
    date: '2026-06-28',
    time: '11:00 AM',
    duration: '60 min',
    isUpcoming: true,
    classTag: 'Class 10'
  }
];

export default function LiveClassesPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [_currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const isClassActive = useCallback((id: number) => {
    return id === 2; // Mocking one active class for demo
  }, []);

  const filteredSessions = useMemo(() => {
    return mockLiveClasses.filter(cls => 
      activeTab === 'upcoming' ? cls.isUpcoming : !cls.isUpcoming
    );
  }, [activeTab]);

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#050505] bg-noise relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-full h-full atmospheric-gradient pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-16 border-b border-white/10 pb-10 flex flex-col md:flex-row justify-between items-end">
          <div>
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FC642D]/10 border border-[#FC642D]/20 text-[#FC642D] text-xs font-bold mb-6 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FC642D] animate-pulse" />
              Live Sessions
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
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-3 rounded-full text-sm font-['Cinzel'] font-bold transition-all ${
                activeTab === 'upcoming' 
                ? 'bg-white/10 text-white shadow-lg backdrop-blur-md' 
                : 'text-zinc-500 hover:text-white'
              }`}
            >
              Upcoming Classes
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`px-8 py-3 rounded-full text-sm font-['Cinzel'] font-bold transition-all ${
                activeTab === 'past' 
                ? 'bg-white/10 text-white shadow-lg backdrop-blur-md' 
                : 'text-zinc-500 hover:text-white'
              }`}
            >
              Past Recordings
            </button>
          </div>
        </div>

        {/* Class List */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {filteredSessions.map((session, index) => {
              const active = isClassActive(session.id);
              
              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`glass-panel rounded-3xl p-6 md:p-8 border hover:border-white/20 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden ${
                    active ? 'border-[#FC642D]/30 shadow-[0_0_30px_rgba(252,100,45,0.1)]' : ''
                  }`}
                >
                  {active && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#FC642D]/10 blur-[80px] rounded-full pointer-events-none" />
                  )}

                  <div className="flex-1 relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="bg-black/50 border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {session.classTag}
                      </span>
                      {active ? (
                        <span className="bg-[#FC642D]/10 border border-[#FC642D]/30 text-[#FC642D] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#FC642D] rounded-full animate-pulse" /> LIVE NOW
                        </span>
                      ) : (
                        <span className="bg-white/5 border border-white/10 text-zinc-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                          Scheduled
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 font-['Cinzel'] leading-snug">{session.title}</h3>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 font-['Playfair_Display']">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-[#C9A84C]" />
                        {session.instructor}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#00A699]" />
                        <time dateTime={session.date}>{session.date}</time>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[#FF5A5F]" />
                        <time dateTime={`${session.date}T${session.time}`}>{session.time}</time> ({session.duration})
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto mt-4 md:mt-0 relative z-10">
                    {activeTab === 'upcoming' ? (
                      <button 
                        className={`w-full md:w-auto px-8 py-4 rounded-full font-bold font-['Cinzel'] text-sm tracking-widest transition-all flex items-center justify-center gap-2 ${
                          active 
                          ? 'bg-[#FC642D] hover:bg-[#ff7544] text-white shadow-[0_0_20px_rgba(252,100,45,0.4)]' 
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                        }`}
                      >
                        {active ? (
                          <>
                            <Video size={18} /> Join Broadcast
                          </>
                        ) : 'Set Reminder'}
                      </button>
                    ) : (
                      <button className="w-full md:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold font-['Cinzel'] text-sm tracking-widest border border-white/10 transition-colors flex items-center justify-center gap-2">
                        <Play size={18} /> Watch Replay
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredSessions.length === 0 && (
            <div className="text-center py-20 glass-panel rounded-3xl">
              <Calendar className="mx-auto text-zinc-600 mb-6" size={48} />
              <h3 className="text-2xl font-bold text-white mb-2 font-['Cinzel']">No {activeTab} classes</h3>
              <p className="text-zinc-400 font-['Playfair_Display'] text-lg">Check back later for updates to the schedule.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
