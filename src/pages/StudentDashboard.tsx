import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, CheckCircle, Clock, Bell, ChevronRight, Award, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '@/config';

interface CourseData {
  _id: string;
  title: string;
  description: string;
  modules: { title: string; lessons: any[] }[];
  isPublished: boolean;
}

export default function StudentDashboard() {
  const { appUser } = useAuth();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/public/courses`);
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const userName = appUser?.name?.split(' ')[0] || 'Student';

  return (
    <div className="pt-24 pb-24 px-4 min-h-screen bg-[#050505] bg-noise relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#00A699]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF5A5F]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Welcome Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Cinzel']">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A699] to-[#34d399] italic">{userName}</span>
          </h1>
          <p className="text-zinc-400 font-['Playfair_Display'] text-xl border-l-2 border-[#00A699]/30 pl-4">Your academic journey continues.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Available Courses */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-8 font-['Cinzel'] flex items-center gap-3">
                <BookOpen className="text-[#00A699]" size={24} /> Available Courses
              </h2>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 text-[#FC642D] animate-spin" />
                </div>
              ) : courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course, idx) => {
                    const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={course._id}
                        className="glass-panel p-8 rounded-3xl group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex justify-between items-start mb-6 relative z-10">
                          <h3 className="text-xl font-bold text-white font-['Cinzel'] leading-snug pr-4">{course.title}</h3>
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 font-['Playfair_Display'] border border-white/10 shrink-0">
                            {course.modules.length}
                          </div>
                        </div>
                        
                        <p className="text-zinc-400 text-sm mb-4 font-['Playfair_Display'] line-clamp-2 relative z-10">{course.description}</p>
                        
                        <div className="relative z-10">
                          <div className="flex justify-between text-sm text-zinc-400 font-['Playfair_Display'] mb-3">
                            <span>{course.modules.length} Modules</span>
                            <span>{totalLessons} Lessons</span>
                          </div>
                          <div className="w-full bg-black/50 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-[#00A699] to-[#34d399] h-1.5 rounded-full relative"
                              style={{ width: '0%' }}
                            >
                              <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-[2px]" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-panel p-12 rounded-3xl text-center"
                >
                  <BookOpen className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white font-['Cinzel'] mb-2">No Courses Published Yet</h3>
                  <p className="text-zinc-500 font-['Playfair_Display']">Your teacher is preparing exciting new content. Check back soon!</p>
                </motion.div>
              )}
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-8 font-['Cinzel'] flex items-center gap-3">
                <CheckCircle className="text-[#FF5A5F]" size={24} /> Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.a 
                  href="/live-classes"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-white/20 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FC642D]/10 flex items-center justify-center">
                    <Clock className="text-[#FC642D]" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-['Cinzel']">Live Classes</h3>
                    <p className="text-zinc-500 text-sm">Join or view upcoming sessions</p>
                  </div>
                  <ChevronRight className="ml-auto text-zinc-600 group-hover:text-white transition-colors" size={18} />
                </motion.a>

                <motion.a 
                  href="/study-materials"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-white/20 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00A699]/10 flex items-center justify-center">
                    <Award className="text-[#00A699]" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-['Cinzel']">Study Materials</h3>
                    <p className="text-zinc-500 text-sm">PDFs, videos & worksheets</p>
                  </div>
                  <ChevronRight className="ml-auto text-zinc-600 group-hover:text-white transition-colors" size={18} />
                </motion.a>
              </div>
            </section>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            
            {/* Profile Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-8 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#C9A84C]/10 blur-[40px] rounded-full" />
              
              <h3 className="text-xl font-bold text-white mb-8 font-['Cinzel'] flex items-center gap-3 relative z-10">
                <TrendingUp className="text-[#C9A84C]" size={20} /> Your Profile
              </h3>
              
              <div className="space-y-8 relative z-10">
                <div className="group">
                  <div className="text-zinc-500 font-['Playfair_Display'] text-sm mb-1 uppercase tracking-widest">Name</div>
                  <div className="text-2xl font-bold text-white font-['Cinzel'] group-hover:text-[#C9A84C] transition-colors">{appUser?.name || 'Student'}</div>
                </div>
                
                <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent" />
                
                <div className="group">
                  <div className="text-zinc-500 font-['Playfair_Display'] text-sm mb-1 uppercase tracking-widest">Email</div>
                  <div className="text-sm font-bold text-white font-['Cinzel']">{appUser?.email || '—'}</div>
                </div>
                
                <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent" />
                
                <div className="group">
                  <div className="text-zinc-500 font-['Playfair_Display'] text-sm mb-1 uppercase tracking-widest">Role</div>
                  <div className="text-lg font-bold text-[#00A699] font-['Cinzel'] uppercase">{appUser?.role || '—'}</div>
                </div>
              </div>
            </motion.div>

            {/* Courses Summary */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-panel p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 font-['Cinzel'] flex items-center gap-3">
                <Bell className="text-white" size={20} /> Summary
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00A699]/10 border border-[#00A699]/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#00A699]" />
                  </div>
                  <div>
                    <p className="text-white font-['Playfair_Display'] leading-snug">{courses.length} Course{courses.length !== 1 ? 's' : ''} Available</p>
                    <span className="text-xs text-[#00A699] font-bold mt-1 block tracking-wider uppercase">Published</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FF5A5F]/10 border border-[#FF5A5F]/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#FF5A5F]" />
                  </div>
                  <div>
                    <p className="text-white font-['Playfair_Display'] leading-snug">Check Live Classes for upcoming sessions</p>
                    <span className="text-xs text-[#FF5A5F] font-bold mt-1 block tracking-wider uppercase">Stay Updated</span>
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
