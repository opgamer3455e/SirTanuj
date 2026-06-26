import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, CheckCircle, Clock, Bell } from 'lucide-react';

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
    <div className="pt-24 pb-24 px-4 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        
        {/* Sticky Notification Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#FC642D]/10 border border-[#FC642D]/20 rounded-xl p-4 mb-8 flex items-center justify-between sticky top-24 z-20 backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#FC642D] animate-pulse" />
            <span className="text-[#FC642D] font-medium">Live Class: Advanced Grammar starting in 15 mins!</span>
          </div>
          <button className="px-4 py-1.5 bg-[#FC642D] text-white text-sm font-semibold rounded-lg hover:bg-[#e55726] transition-colors">
            Join Now
          </button>
        </motion.div>

        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Bricolage_Grotesque']">
            Welcome back, <span className="text-[#00A699]">Alex</span> 👋
          </h1>
          <p className="text-zinc-400">Here's your learning summary for this week.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Enrolled Courses */}
            <section>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="text-[#00A699]" size={20} /> My Courses
              </h2>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <motion.div 
                    key={course.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-[#121212] p-6 rounded-2xl border border-white/5"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-white">{course.name}</h3>
                      <span className="text-sm text-zinc-500">{course.completedModules} / {course.totalModules} modules</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-[#00A699] h-2.5 rounded-full transition-all duration-1000"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="text-right text-sm text-[#00A699] font-medium">{course.progress}% Completed</div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Assignments Submission Portal */}
            <section>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="text-[#FF5A5F]" size={20} /> Assignments & Quizzes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignments.map(item => (
                  <div key={item.id} className="bg-[#121212] p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-medium line-clamp-1">{item.title}</h3>
                        {item.status === 'completed' ? (
                          <span className="text-xs bg-[#00A699]/10 text-[#00A699] px-2 py-1 rounded font-semibold">Done</span>
                        ) : (
                          <span className="text-xs bg-[#FF5A5F]/10 text-[#FF5A5F] px-2 py-1 rounded font-semibold">Pending</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-4">
                        <Clock size={14} /> Due: {item.dueDate}
                      </div>
                    </div>
                    {item.status === 'pending' ? (
                      <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-lg border border-white/10 transition-colors">
                        Submit Work
                      </button>
                    ) : (
                      <div className="w-full py-2 bg-[#00A699]/5 text-[#00A699] text-sm font-semibold rounded-lg text-center border border-[#00A699]/10">
                        Score: {item.score}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-8">
            <div className="bg-[#121212] p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="text-[#FC642D]" size={20} /> Performance
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="text-zinc-400 text-sm mb-1">Average Quiz Score</div>
                  <div className="text-3xl font-bold text-white">88%</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-sm mb-1">Classes Attended</div>
                  <div className="text-3xl font-bold text-white">12/14</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-sm mb-1">Study Hours</div>
                  <div className="text-3xl font-bold text-white">24h</div>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Bell className="text-white" size={20} /> Reminders
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#FF5A5F] mt-1.5 flex-shrink-0" />
                  <span className="text-zinc-300">Submit Analytical Paragraph draft by tomorrow night.</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#00A699] mt-1.5 flex-shrink-0" />
                  <span className="text-zinc-300">New Study Material added: Modals Worksheet.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
