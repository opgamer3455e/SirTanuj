import { motion } from 'framer-motion';
import { Download, Play, Camera, Globe, Send, Mail, CheckCircle2 } from 'lucide-react';

export default function ResourceCommunityPage() {
  const resources = [
    "Chapter-wise Notes (PDF)",
    "Grammar Rules & Worksheets",
    "Vocabulary Lists",
    "Mock Tests & Quizzes",
    "Previous Year Papers"
  ];

  const socialLinks = [
    { name: 'YouTube', icon: Play, color: 'hover:bg-red-600 hover:border-red-600' },
    { name: 'Telegram', icon: Send, color: 'hover:bg-blue-500 hover:border-blue-500' },
    { name: 'Instagram', icon: Camera, color: 'hover:bg-pink-600 hover:border-pink-600' },
    { name: 'Facebook', icon: Globe, color: 'hover:bg-blue-600 hover:border-blue-600' },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] pt-32 pb-24 px-4 flex items-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#FF5A5F]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00A699]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl md:leading-tight font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 font-['Cinzel'] mb-6 tracking-tight">
            Resources & <span className="text-[#FF5A5F]">Community</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-['Playfair_Display'] max-w-2xl mx-auto leading-relaxed">
            Everything you need to excel, meticulously curated and organized in one central hub.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Free Resources Card */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 group relative"
          >
            {/* Card Glow Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-b from-white/15 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative h-full bg-zinc-900/50 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-xl flex flex-col justify-between overflow-hidden">
              {/* Decorative subtle background pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,90,95,0.05),transparent_50%)] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-semibold uppercase tracking-widest mb-6">
                  <Download size={14} />
                  <span>Free Downloads</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-['Cinzel'] leading-tight">
                  Accelerate your learning journey.
                </h2>
                
                <ul className="space-y-4 mb-12">
                  {resources.map((res, idx) => (
                    <motion.li 
                      key={idx} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + (idx * 0.1) }}
                      className="flex items-center gap-4 group/item"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00A699]/10 flex items-center justify-center border border-[#00A699]/30 group-hover/item:bg-[#00A699] group-hover/item:border-[#00A699] transition-all duration-300">
                        <CheckCircle2 size={16} className="text-[#00A699] group-hover/item:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-lg text-zinc-300 font-['Playfair_Display'] group-hover/item:text-white transition-colors duration-300">{res}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <button className="relative z-10 w-full py-4 bg-white text-black font-bold text-lg rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group/btn shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                <Download size={20} className="transition-transform group-hover/btn:-translate-y-0.5" />
                <span>Download Free Now</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Community */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Newsletter Section */}
            <div className="bg-zinc-900/50 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-xl flex-1 flex flex-col justify-center">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5A5F]/10 flex items-center justify-center border border-[#FF5A5F]/20 mb-6 text-[#FF5A5F]">
                <Mail size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-['Cinzel']">
                Join the Inner Circle
              </h2>
              <p className="text-zinc-400 text-base mb-8 font-['Playfair_Display'] leading-relaxed">
                Subscribe to our newsletter for exclusive weekly tips and strategies sent straight to your inbox.
              </p>

              <form className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF5A5F] to-[#00A699] rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500" />
                <div className="relative flex items-center bg-zinc-950 border border-white/10 rounded-2xl p-1.5 focus-within:border-white/30 transition-colors">
                  <input 
                    type="email" 
                    required
                    placeholder="name@example.com" 
                    className="w-full bg-transparent px-4 py-3 text-white placeholder-zinc-600 focus:outline-none text-base font-['Playfair_Display']"
                  />
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-[#FF5A5F] text-white font-bold rounded-xl hover:bg-[#E04B50] transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            {/* Social Connect Section */}
            <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1 font-['Cinzel']">Social Connect</h3>
                <p className="text-zinc-500 text-sm font-['Playfair_Display']">Follow our daily updates</p>
              </div>
              <div className="flex gap-3">
                {socialLinks.map((platform, idx) => (
                  <a 
                    key={idx} 
                    href="#" 
                    aria-label={platform.name}
                    className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 transition-all duration-300 ${platform.color} hover:text-white hover:-translate-y-1`}
                  >
                    <platform.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
