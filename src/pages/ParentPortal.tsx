import { Users, FileText, Calendar, CreditCard, Download, ArrowUpRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ParentPortal() {
  return (
    <div className="pt-24 pb-24 px-4 min-h-screen bg-[#050505] bg-noise relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A84C]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00A699]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10"
        >
          <div>
            <div className="flex items-center gap-3 text-[#C9A84C] mb-4">
              <Users size={20} />
              <span className="text-sm font-bold uppercase tracking-[0.2em] font-['Cinzel']">Guardian Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-['Cinzel'] leading-tight">
              Academic Report: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#E8D08A] italic">Alex Johnson</span>
            </h1>
          </div>
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-['Cinzel'] font-bold flex items-center gap-3 transition-colors shadow-lg">
            <Download size={18} /> Download Dossier
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
            
            {/* Academic Health / Progress Reports */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A699]/5 blur-[80px] rounded-full group-hover:bg-[#00A699]/10 transition-colors duration-700" />
              
              <h2 className="text-2xl font-bold text-white mb-8 font-['Cinzel'] flex items-center gap-3 relative z-10">
                <TrendingUp className="text-[#00A699]" size={24} /> Academic Standing
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 relative z-10">
                <div className="bg-black/40 p-8 rounded-2xl border border-white/10 shadow-inner">
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Current Grade</div>
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#00A699] to-[#34d399] font-['Cinzel'] mb-2">A-</div>
                  <div className="text-sm text-[#00A699] font-['Playfair_Display'] flex items-center gap-2 italic">
                    <ArrowUpRight size={16} /> Top 15% of cohort
                  </div>
                </div>
                <div className="bg-black/40 p-8 rounded-2xl border border-white/10 shadow-inner">
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Assignments</div>
                  <div className="text-5xl font-bold text-white font-['Cinzel'] mb-3">24<span className="text-2xl text-zinc-600">/26</span></div>
                  <div className="text-sm text-[#FF5A5F] font-['Playfair_Display'] italic">2 pending submissions</div>
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-6 font-['Cinzel']">Competency Breakdown</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between font-['Playfair_Display'] mb-2 text-zinc-300">
                      <span>Grammar & Syntax</span>
                      <span className="font-bold">92%</span>
                    </div>
                    <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#00A699] to-[#34d399] h-2 rounded-full w-[92%] relative">
                         <div className="absolute right-0 top-0 bottom-0 w-6 bg-white/50 blur-[2px]" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-['Playfair_Display'] mb-2 text-zinc-300">
                      <span>Literature Analysis</span>
                      <span className="font-bold">85%</span>
                    </div>
                    <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#00A699] to-[#34d399] h-2 rounded-full w-[85%] relative">
                        <div className="absolute right-0 top-0 bottom-0 w-6 bg-white/50 blur-[2px]" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-['Playfair_Display'] mb-2 text-zinc-300">
                      <span>Creative Writing</span>
                      <span className="font-bold text-[#FF5A5F]">78%</span>
                    </div>
                    <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#FF5A5F] to-[#ff999c] h-2 rounded-full w-[78%] relative">
                        <div className="absolute right-0 top-0 bottom-0 w-6 bg-white/50 blur-[2px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Attendance History */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel rounded-3xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold text-white mb-8 font-['Cinzel'] flex items-center gap-3">
                <Calendar className="text-[#C9A84C]" size={24} /> Attendance Record
              </h2>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-black/40 rounded-2xl border border-white/10 mb-6 shadow-inner gap-4">
                <div>
                  <div className="text-white font-['Cinzel'] text-lg mb-1">Previous 30 Days</div>
                  <div className="text-sm text-zinc-500 font-['Playfair_Display']">12 Sessions Scheduled</div>
                </div>
                <div className="md:text-right">
                  <div className="text-4xl font-bold text-white font-['Cinzel'] mb-1">92<span className="text-2xl text-zinc-500">%</span></div>
                  <div className="text-sm text-[#00A699] font-bold tracking-wider uppercase">Present (11/12)</div>
                </div>
              </div>
              <p className="text-lg text-zinc-400 font-['Playfair_Display'] italic border-l-2 border-[#FF5A5F]/30 pl-4">
                Note: Alex missed the "Figures of Speech" seminar on June 15th. A recording has been provided in the Student Dashboard for review.
              </p>
            </motion.section>

          </div>

          {/* Right Column: Billing */}
          <div className="space-y-10">
            
            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden group"
            >
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#C9A84C]/10 blur-[80px] rounded-full group-hover:bg-[#C9A84C]/20 transition-colors duration-700" />
              
              <h2 className="text-2xl font-bold text-white mb-8 font-['Cinzel'] flex items-center gap-3 relative z-10">
                <CreditCard className="text-[#C9A84C]" size={24} /> Financials
              </h2>
              
              <div className="bg-black/40 p-6 rounded-2xl border border-[#C9A84C]/20 mb-8 shadow-inner relative z-10">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Active Plan</div>
                <div className="text-2xl font-bold text-white mb-2 font-['Cinzel'] text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#E8D08A]">Annual Mastery</div>
                <div className="text-sm text-zinc-400 font-['Playfair_Display']">Next billing cycle: Jan 15, 2027</div>
              </div>

              <div className="space-y-4 relative z-10">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Ledger History</h3>
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-colors cursor-pointer group/item">
                    <div>
                      <div className="text-white font-['Cinzel'] mb-1 group-hover/item:text-[#C9A84C] transition-colors">Invoice #{(4392 - i).toString()}</div>
                      <div className="text-sm text-zinc-500 font-['Playfair_Display']">{i === 0 ? 'Jan 15, 2026' : `Jan 15, 202${5-i}`}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white font-['Cinzel']">$199.00</div>
                      <div className="text-xs text-[#00A699] font-bold tracking-widest uppercase mt-1">Settled</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

          </div>

        </div>
      </div>
    </div>
  );
}
