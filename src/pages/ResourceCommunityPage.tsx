import { motion } from 'framer-motion';
import { Download, Play, Camera, Globe, Send, Mail, Check } from 'lucide-react';

export default function ResourceCommunityPage() {
  const resources = [
    "Chapter-wise Notes (PDF)",
    "Grammar Rules & Worksheets",
    "Vocabulary Lists",
    "Mock Tests & Quizzes",
    "Previous Year Papers"
  ];

  const socialLinks = [
    { name: 'YouTube', icon: Play },
    { name: 'Telegram', icon: Send },
    { name: 'Instagram', icon: Camera },
    { name: 'Facebook', icon: Globe },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-4 flex items-center">
      <div className="max-w-[1000px] mx-auto w-full relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Cinzel'] mb-6 tracking-tight">
            Resources & <span className="text-[#FF5A5F]">Community</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-['Playfair_Display'] max-w-2xl mx-auto leading-relaxed">
            Everything you need to excel, meticulously curated and organized<br />in one central hub.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Left Column: Free Resources Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="bg-[#121212] rounded-3xl p-10 md:p-12 flex flex-col h-full border border-white/[0.03]"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-zinc-300 text-xs font-semibold uppercase tracking-widest mb-8 w-max">
              <Download size={14} />
              <span>Free Downloads</span>
            </div>
            
            <h2 className="text-3xl md:text-[2rem] font-bold text-white mb-6 font-['Cinzel'] leading-tight">
              Accelerate your<br />learning journey.
            </h2>
            
            <p className="text-zinc-400 text-lg mb-10 font-['Playfair_Display'] leading-relaxed">
              Curated materials, built to help<br />you move fast and retain more.
            </p>
            
            <ul className="space-y-6 mb-12 flex-1">
              {resources.map((res, idx) => (
                <motion.li 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="flex items-center gap-4 group/item"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-[#00A699]/30 transition-colors group-hover/item:bg-[#00A699]/10">
                    <Check size={14} className="text-[#00A699]" />
                  </div>
                  <span className="text-lg text-zinc-300 font-['Playfair_Display'] transition-colors group-hover/item:text-white">
                    {res}
                  </span>
                </motion.li>
              ))}
            </ul>

            <button className="w-full py-4 bg-[#1A1A1A] text-white font-semibold rounded-xl border border-white/10 hover:bg-[#222] transition-colors flex items-center justify-center gap-3 shadow-sm mt-auto">
              <Download size={18} />
              <span>Download Free Now</span>
            </button>
          </motion.div>

          {/* Right Column: Community Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-[#121212] rounded-3xl p-10 md:p-12 flex flex-col h-full border border-white/[0.03]"
          >
            {/* Icon Box */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-[#FF5A5F]/20 mb-8">
              <Mail size={24} className="text-[#FF5A5F]" />
            </div>
            
            <h2 className="text-3xl md:text-[2rem] font-bold text-white mb-6 font-['Cinzel'] leading-tight">
              Join the Inner<br />Circle
            </h2>
            
            <p className="text-zinc-400 text-lg mb-10 font-['Playfair_Display'] leading-relaxed">
              Subscribe for exclusive weekly<br />tips and exam strategies —<br />delivered straight to your inbox.
            </p>

            <form className="relative mb-12" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-stretch bg-[#1A1A1A] rounded-xl p-1 border border-white/10 focus-within:border-white/20 transition-colors overflow-hidden">
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com" 
                  className="w-full bg-transparent px-4 text-zinc-300 placeholder-zinc-500 focus:outline-none text-base font-['Playfair_Display']"
                />
                <button 
                  type="submit" 
                  className="px-6 py-2.5 bg-[#0A0A0A] text-white font-semibold rounded-lg border border-white/10 hover:bg-[#1A1A1A] transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>

            <div className="mt-auto pt-10 border-t border-white/5">
              <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-6 font-['Cinzel']">
                Connect With Us
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((platform, idx) => (
                  <a 
                    key={idx} 
                    href="#" 
                    aria-label={platform.name}
                    className="w-12 h-12 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all duration-300"
                  >
                    <platform.icon size={18} strokeWidth={1.5} />
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
