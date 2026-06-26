import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, CheckCircle, Clock, Bell, ChevronRight, Award } from 'lucide-react';

const enrolledCourses = [
  { id: 1, name: 'Class 10 English Masterclass', progress: 65, totalModules: 24, completedModules: 15 },
  { id: 2, name: 'Creative Writing Workshop', progress: 30, totalModules: 10, completedModules: 3 },
];

const assignments = [
  { id: 1, title: 'Analytical Paragraph Draft', dueDate: 'Tomorrow, 11:59 PM', status: 'pending' },
  { id: 2, title: 'First Flight Chapter 2 Quiz', dueDate: 'June 30', status: 'completed', score: '95%' },
];

export default function StudentDashboard() {
  return (
    <div className="pt-24 pb-24 px-4 min-h-screen bg-[#050505] bg-noise relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#00A699]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF5A5F]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Sticky Notification Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel border-l-4 border-l-[#FC642D] rounded-r-2xl p-5 mb-12 flex items-center justify-between sticky top-24 z-20"
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-[#FC642D] animate-pulse shadow-[0_0_15px_#FC642D]" />
            <span className="text-white font-['Playfair_Display'] text-lg">Live Class: <span className="font-bold text-[#FC642D]">Advanced Grammar</span> starting in 15 mins!</span>
          </div>
          <button className="px-6 py-2 bg-[#FC642D] text-white font-['Cinzel'] font-bold rounded-full hover:bg-[#e55726] transition-all shadow-[0_0_20px_rgba(252,100,45,0.4)] flex items-center gap-2">
            Join Now <ChevronRight size={16} />
          </button>
        </motion.div>

        {/* Welcome Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Cinzel']">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A699] to-[#34d399] italic">Alex</span>
          </h1>
          <p className="text-zinc-400 font-['Playfair_Display'] text-xl border-l-2 border-[#00A699]/30 pl-4">Your academic journey continues.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Enrolled Courses */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-8 font-['Cinzel'] flex items-center gap-3">
                <BookOpen className="text-[#00A699]" size={24} /> Active Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={course.id}
                    className="glass-panel p-8 rounded-3xl group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <h3 className="text-xl font-bold text-white font-['Cinzel'] leading-snug pr-4">{course.name}</h3>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 font-['Playfair_Display'] border border-white/10 shrink-0">
                        {course.progress}%
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between text-sm text-zinc-400 font-['Playfair_Display'] mb-3">
                        <span>Modules Completed</span>
                        <span>{course.completedModules} / {course.totalModules}</span>
                      </div>
                      <div className="w-full bg-black/50 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#00A699] to-[#34d399] h-1.5 rounded-full relative"
                          style={{ width: `${course.progress}%` }}
                        >
                          <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-[2px]" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Assignments Submission Portal */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-8 font-['Cinzel'] flex items-center gap-3">
                <CheckCircle className="text-[#FF5A5F]" size={24} /> Action Items
              </h2>
              <div className="space-y-4">
                {assignments.map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    key={item.id} 
                    className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/20 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {item.status === 'completed' ? (
                          <span className="w-2 h-2 rounded-full bg-[#00A699] shadow-[0_0_10px_#00A699]" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[#FF5A5F] shadow-[0_0_10px_#FF5A5F]" />
                        )}
                        <h3 className="text-white font-bold font-['Cinzel'] text-lg">{item.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400 font-['Playfair_Display'] ml-5">
                        <Clock size={14} /> Due: {item.dueDate}
                      </div>
                    </div>
                    
                    <div className="w-full md:w-auto ml-5 md:ml-0">
                      {item.status === 'pending' ? (
                        <button className="w-full md:w-auto px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-['Cinzel'] font-bold rounded-full border border-white/10 transition-all flex items-center justify-center gap-2">
                          Submit Work <ChevronRight size={14} />
                        </button>
                      ) : (
                        <div className="px-6 py-2.5 bg-[#00A699]/10 text-[#00A699] text-sm font-['Cinzel'] font-bold rounded-full border border-[#00A699]/20 flex items-center gap-2">
                          <Award size={16} /> Score: {item.score}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            
            {/* Performance Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-8 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#C9A84C]/10 blur-[40px] rounded-full" />
              
              <h3 className="text-xl font-bold text-white mb-8 font-['Cinzel'] flex items-center gap-3 relative z-10">
                <TrendingUp className="text-[#C9A84C]" size={20} /> Performance Matrix
              </h3>
              
              <div className="space-y-8 relative z-10">
                <div className="group">
                  <div className="text-zinc-500 font-['Playfair_Display'] text-sm mb-1 uppercase tracking-widest">Average Score</div>
                  <div className="text-5xl font-bold text-white font-['Cinzel'] group-hover:text-[#C9A84C] transition-colors">88<span className="text-2xl text-zinc-500">%</span></div>
                </div>
                
                <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent" />
                
                <div className="group">
                  <div className="text-zinc-500 font-['Playfair_Display'] text-sm mb-1 uppercase tracking-widest">Attendance</div>
                  <div className="text-4xl font-bold text-white font-['Cinzel'] group-hover:text-white transition-colors">12<span className="text-xl text-zinc-500">/14</span></div>
                </div>
                
                <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent" />
                
                <div className="group">
                  <div className="text-zinc-500 font-['Playfair_Display'] text-sm mb-1 uppercase tracking-widest">Study Hours</div>
                  <div className="text-4xl font-bold text-white font-['Cinzel']">24<span className="text-xl text-zinc-500">h</span></div>
                </div>
              </div>
            </motion.div>

            {/* Reminders */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-panel p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 font-['Cinzel'] flex items-center gap-3">
                <Bell className="text-white" size={20} /> Dispatch
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FF5A5F]/10 border border-[#FF5A5F]/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#FF5A5F]" />
                  </div>
                  <div>
                    <p className="text-white font-['Playfair_Display'] leading-snug">Submit Analytical Paragraph draft</p>
                    <span className="text-xs text-[#FF5A5F] font-bold mt-1 block tracking-wider uppercase">Due Tomorrow</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00A699]/10 border border-[#00A699]/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#00A699]" />
                  </div>
                  <div>
                    <p className="text-white font-['Playfair_Display'] leading-snug">New Material: Modals Worksheet</p>
                    <span className="text-xs text-[#00A699] font-bold mt-1 block tracking-wider uppercase">Just Added</span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
