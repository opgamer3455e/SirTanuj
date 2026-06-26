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

        {/* Header */}
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

          {/* Left: Free Resources */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="bg-[#121212] rounded-[2.5rem] p-12 md:p-16 flex flex-col border border-white/[0.03]"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 text-zinc-300 text-xs font-semibold uppercase tracking-widest mb-10 w-max">
              <Download size={14} />
              <span>Free Downloads</span>
            </div>

            <h2 className="text-3xl md:text-[2rem] font-bold text-white mb-6 font-['Cinzel'] leading-tight">
              Accelerate your<br />learning journey.
            </h2>

            <p className="text-zinc-400 text-base mb-10 font-['Playfair_Display'] leading-relaxed">
              Curated materials, built to help you move fast and retain more.
            </p>

            <ul className="space-y-5 mb-10 flex-1">
              {resources.map((res, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.08 }}
                  className="flex items-center gap-4 group/item"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-[#00A699]/30 transition-colors group-hover/item:bg-[#00A699]/10">
                    <Check size={13} className="text-[#00A699]" />
                  </div>
                  <span className="text-base text-zinc-300 font-['Playfair_Display'] transition-colors group-hover/item:text-white">
                    {res}
                  </span>
                </motion.li>
              ))}
            </ul>

            <button className="w-full py-5 bg-[#1A1A1A] text-white font-semibold rounded-2xl border border-white/10 hover:bg-[#222] transition-colors flex items-center justify-center gap-3 mt-auto">
              <Download size={18} />
              <span>Download Free Now</span>
            </button>
          </motion.div>

          {/* Right: Community */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-[#121212] rounded-[2.5rem] p-12 md:p-16 flex flex-col border border-white/[0.03]"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-[#FF5A5F]/20 mb-10 bg-[#FF5A5F]/5">
              <Mail size={28} className="text-[#FF5A5F]" />
            </div>

            <h2 className="text-3xl md:text-[2rem] font-bold text-white mb-6 font-['Cinzel'] leading-tight">
              Join the Inner<br />Circle
            </h2>

            <p className="text-zinc-400 text-base mb-10 font-['Playfair_Display'] leading-relaxed">
              Subscribe for exclusive weekly tips and exam strategies — delivered straight to your inbox.
            </p>

            {/* Email row — no form tag */}
            <div className="flex items-stretch bg-[#1A1A1A] rounded-2xl p-2 border border-white/10 focus-within:border-white/20 transition-colors mb-10">
              <input
                type="email"
                placeholder="name@example.com"
                className="flex-1 min-w-0 bg-transparent px-5 py-3.5 text-zinc-300 placeholder-zinc-600 focus:outline-none text-base font-['Playfair_Display']"
              />
              <button
                type="button"
                className="px-6 py-3.5 bg-[#0A0A0A] text-white text-base font-semibold rounded-xl border border-white/10 hover:bg-[#1F1F1F] transition-colors whitespace-nowrap flex-shrink-0"
              >
                Subscribe
              </button>
            </div>

            <div className="mt-auto pt-8 border-t border-white/5">
              <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-5 font-['Cinzel']">
                Connect With Us
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((platform, idx) => (
                  <a
                    key={idx}
                    href="#"
                    aria-label={platform.name}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/30 transition-all duration-300"
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