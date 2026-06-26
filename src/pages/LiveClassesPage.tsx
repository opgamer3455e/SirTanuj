import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, User, CheckCircle2 } from 'lucide-react';

// Mock schedule data
const scheduleData = [
  {
    id: 1,
    title: 'Advanced Grammar: Modals & Determiners',
    instructor: 'Prof. Michael Chen',
    date: '2026-06-27',
    time: '10:00 AM',
    duration: '90 min',
    isUpcoming: true,
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

  // Simulate real-time clock for "Join Class" button activation
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  // Mock logic: randomly activate a class if it's "close" to the time (just for demo purposes)
  const isClassActive = (id: number) => {
    // In a real app, we'd compare currentTime with the class date/time
    return id === 1; // Let's mock that the first class is active (within 10 minutes)
  };

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FC642D]/10 border border-[#FC642D]/20 text-[#FC642D] text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FC642D] animate-pulse" />
            LIVE SESSIONS
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Bricolage_Grotesque']">
            Interactive <span className="text-[#FC642D]">Live Classes</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Join real-time interactive sessions with expert educators. Ask questions, participate in polls, and learn collaboratively.
          </p>
        </motion.div>

        {/* Filters / Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#121212] p-1.5 rounded-xl border border-white/10 flex gap-2">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'upcoming' 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Upcoming Schedule
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'past' 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Past Recordings
            </button>
          </div>
        </div>

        {/* Schedule List */}
        <div className="space-y-6">
          {activeTab === 'upcoming' ? (
            scheduleData.map((session, index) => {
              const active = isClassActive(session.id);
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={session.id}
                  className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 ${
                    active 
                    ? 'bg-[#121212] border-[#FC642D]/30 shadow-[0_0_30px_rgba(252,100,45,0.1)]' 
                    : 'bg-[#121212] border-white/5 hover:border-white/10'
                  } flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-semibold text-zinc-300">
                        {session.classTag}
                      </span>
                      {active && (
                        <span className="px-3 py-1 bg-[#FC642D]/20 border border-[#FC642D]/30 rounded-md text-xs font-semibold text-[#FC642D] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FC642D] animate-pulse" />
                          Starting Soon
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{session.title}</h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <User size={16} className="text-zinc-500" />
                        {session.instructor}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} className="text-zinc-500" />
                        {session.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} className="text-zinc-500" />
                        {session.time} ({session.duration})
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto">
                    {active ? (
                      <button className="w-full md:w-auto px-8 py-4 bg-[#FC642D] hover:bg-[#e55726] text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(252,100,45,0.4)]">
                        <Video size={18} />
                        Join Class Now
                      </button>
                    ) : (
                      <button className="w-full md:w-auto px-8 py-4 bg-[#1a1a1a] hover:bg-[#252525] text-white font-semibold rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2">
                        <CheckCircle2 size={18} />
                        Book / Remind Me
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-[#121212] rounded-3xl border border-white/5">
              <Video size={48} className="mx-auto text-zinc-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Past Recordings</h3>
              <p className="text-zinc-500">Past classes will appear here after they conclude.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
