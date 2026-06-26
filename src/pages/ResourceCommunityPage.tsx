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
    { name: 'YouTube', icon: Play, color: 'hover:bg-red-600 hover:border-red-600 hover:text-white' },
    { name: 'Telegram', icon: Send, color: 'hover:bg-blue-500 hover:border-blue-500 hover:text-white' },
    { name: 'Instagram', icon: Camera, color: 'hover:bg-pink-600 hover:border-pink-600 hover:text-white' },
    { name: 'Facebook', icon: Globe, color: 'hover:bg-blue-600 hover:border-blue-600 hover:text-white' },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-4 flex items-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF5A5F]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#00A699]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Cinzel'] mb-4 tracking-tight">
            Resources & <span className="text-[#FF5A5F]">Community</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-['Playfair_Display'] max-w-2xl mx-auto">
            Everything you need to excel, meticulously curated and organized in one central hub.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Left Column: Free Resources Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="group relative"
          >
            {/* Card Glow Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-zinc-900/60 border border-white/10 p-10 md:p-12 rounded-3xl backdrop-blur-xl h-full flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-semibold uppercase tracking-widest mb-6 w-max">
                <Download size={14} />
                <span>Free Downloads</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-8 font-['Cinzel'] leading-tight">
                Accelerate your learning journey.
              </h2>
              
              <ul className="space-y-5 mb-10 flex-1">
                {resources.map((res, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#00A699]/10 flex items-center justify-center border border-[#00A699]/30 transition-all duration-300 group-hover/item:scale-110 group-hover/item:bg-[#00A699]/20">
                      <CheckCircle2 size={14} className="text-[#00A699]" />
                    </div>
                    <span className="text-lg text-zinc-300 font-['Playfair_Display'] transition-colors duration-300 group-hover/item:text-white">{res}</span>
                  </motion.li>
                ))}
              </ul>

              <button className="relative w-full py-4 bg-white text-black font-bold text-lg rounded-2xl transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden shadow-lg hover:shadow-xl mt-auto">
                <Download size={20} className="relative z-10" />
                <span className="relative z-10">Download Free Now</span>
                <div className="absolute inset-0 bg-zinc-200 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Community Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="group relative"
          >
            {/* Card Glow Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-b from-[#FF5A5F]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-zinc-900/60 border border-white/10 p-10 md:p-12 rounded-3xl backdrop-blur-xl h-full flex flex-col">
              
              <div className="w-12 h-12 rounded-2xl bg-[#FF5A5F]/10 flex items-center justify-center border border-[#FF5A5F]/20 mb-6 text-[#FF5A5F]">
                <Mail size={24} />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4 font-['Cinzel'] leading-tight">
                Join the Inner Circle
              </h2>
              <p className="text-zinc-400 text-lg mb-8 font-['Playfair_Display'] leading-relaxed">
                Subscribe to our newsletter for exclusive weekly tips and strategies sent straight to your inbox.
              </p>

              <form className="relative mb-12">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-zinc-950/80 border border-white/10 rounded-2xl p-1.5 focus-within:border-white/30 transition-colors">
                  <input 
                    type="email" 
                    required
                    placeholder="name@example.com" 
                    className="w-full bg-transparent px-5 py-4 text-white placeholder-zinc-600 focus:outline-none text-base font-['Playfair_Display']"
                  />
                  <button 
                    type="submit" 
                    className="px-8 py-3.5 mt-2 sm:mt-0 bg-[#FF5A5F] text-white font-bold rounded-xl hover:bg-[#E04B50] transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
              </form>

              <div className="mt-auto pt-8 border-t border-white/10">
                <h3 className="text-white font-semibold mb-6 font-['Cinzel'] tracking-wide">CONNECT WITH US</h3>
                <div className="flex gap-4">
                  {socialLinks.map((platform, idx) => (
                    <a 
                      key={idx} 
                      href="#" 
                      aria-label={platform.name}
                      className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 transition-all duration-300 ${platform.color} hover:-translate-y-1`}
                    >
                      <platform.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
              
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
