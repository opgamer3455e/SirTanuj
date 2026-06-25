import { memo } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Globe, Play, Mail, ArrowRight } from 'lucide-react';

const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#0A0A0A] pt-20 pb-10 border-t border-white/10">
      {/* Cinematic Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#FF5A5F] to-transparent opacity-50 blur-[2px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#00A699] to-transparent opacity-80" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
        >
          {/* Brand & Newsletter */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="font-display text-2xl font-bold text-white mb-4">Join the vanguard.</h3>
            <p className="text-zinc-400 mb-6 max-w-sm">
              Stay updated with our latest educational breakthroughs and cinematic learning experiences.
            </p>
            <div className="relative max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5A5F]/50 focus:ring-1 focus:ring-[#FF5A5F]/50 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* Links Grid */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-4">
              {['Julius Caesar', 'Interactive Modules', 'Resource Library', 'Pricing'].map(link => (
                <li key={link}>
                  <a href="#" className="text-zinc-400 hover:text-white hover:translate-x-1 transition-transform inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map(link => (
                <li key={link}>
                  <a href="#" className="text-zinc-400 hover:text-white hover:translate-x-1 transition-transform inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Cinematic Massive Text */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center items-center w-full mt-20 mb-10 overflow-hidden"
        >
          <h1 className="font-display font-black text-[12vw] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none text-center">
            NEXUS EDU
          </h1>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <p className="text-zinc-500 text-sm">
            © {currentYear} Nexus Edu. Developed for Excellence.
          </p>
          <div className="flex items-center gap-4">
            {[MessageCircle, Globe, Play, Mail].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
