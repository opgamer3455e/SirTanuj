import { Users, FileText, Calendar, CreditCard, Download, ArrowUpRight } from 'lucide-react';

export default function ParentPortal() {
  return (
    <div className="pt-24 pb-24 px-4 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 text-zinc-500 mb-2">
              <Users size={18} />
              <span className="text-sm font-medium uppercase tracking-wider">Parent Portal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-['Bricolage_Grotesque']">
              Student Overview: <span className="text-[#00A699]">Alex Johnson</span>
            </h1>
          </div>
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-semibold flex items-center gap-2 transition-colors">
            <Download size={16} /> Download Full Report
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            {/* Academic Health / Progress Reports */}
            <section className="bg-[#121212] rounded-3xl p-6 md:p-8 border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FileText className="text-[#FF5A5F]" size={20} /> Academic Health
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#0A0A0A] p-5 rounded-2xl border border-white/5">
                  <div className="text-sm text-zinc-400 mb-1">Current Grade</div>
                  <div className="text-3xl font-bold text-[#00A699]">A-</div>
                  <div className="text-xs text-[#00A699] flex items-center gap-1 mt-1">
                    <ArrowUpRight size={12} /> Top 15% of class
                  </div>
                </div>
                <div className="bg-[#0A0A0A] p-5 rounded-2xl border border-white/5">
                  <div className="text-sm text-zinc-400 mb-1">Completed Assignments</div>
                  <div className="text-3xl font-bold text-white">24<span className="text-xl text-zinc-600">/26</span></div>
                  <div className="text-xs text-zinc-500 mt-1">2 pending tasks</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Subject Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1 text-zinc-300">
                      <span>Grammar & Vocabulary</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5"><div className="bg-[#00A699] h-1.5 rounded-full w-[92%]" /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1 text-zinc-300">
                      <span>Literature Analysis</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5"><div className="bg-[#00A699] h-1.5 rounded-full w-[85%]" /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1 text-zinc-300">
                      <span>Creative Writing</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5"><div className="bg-[#FF5A5F] h-1.5 rounded-full w-[78%]" /></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Attendance History */}
            <section className="bg-[#121212] rounded-3xl p-6 md:p-8 border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="text-[#00A699]" size={20} /> Attendance History
              </h2>
              <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-2xl border border-white/5 mb-4">
                <div>
                  <div className="text-white font-medium">Last 30 Days</div>
                  <div className="text-sm text-zinc-500">12 Classes Scheduled</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">92%</div>
                  <div className="text-xs text-[#00A699]">Present (11/12)</div>
                </div>
              </div>
              <p className="text-sm text-zinc-400">Alex missed the "Figures of Speech" class on June 15th. A recording has been provided in the Student Dashboard.</p>
            </section>

          </div>

          {/* Right Column: Billing */}
          <div className="space-y-8">
            
            <section className="bg-[#121212] rounded-3xl p-6 md:p-8 border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="text-[#FC642D]" size={20} /> Payment History
              </h2>
              
              <div className="bg-[#0A0A0A] p-5 rounded-2xl border border-white/5 mb-6">
                <div className="text-sm text-zinc-400 mb-2">Active Plan</div>
                <div className="text-xl font-bold text-white mb-1">Annual Mastery</div>
                <div className="text-sm text-zinc-500">Next billing date: Jan 15, 2027</div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Recent Invoices</h3>
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div>
                      <div className="text-sm text-white font-medium">Invoice #{(4392 - i).toString()}</div>
                      <div className="text-xs text-zinc-500">{i === 0 ? 'Jan 15, 2026' : `Jan 15, 202${5-i}`}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">$199.00</div>
                      <div className="text-xs text-[#00A699]">Paid</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
}
