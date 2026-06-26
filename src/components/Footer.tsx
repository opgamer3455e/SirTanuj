import { memo } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Globe, Play, Mail } from 'lucide-react';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';

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
    <footer className="relative w-full overflow-hidden bg-[#050505] pt-10 pb-10 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 mb-8"
        >
          {/* Brand & Description */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col items-start pr-8">
            <h3 className="font-['Cinzel'] text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-800 rounded-md flex items-center justify-center">
                <span className="text-[#FF5A5F] text-lg">T</span>
              </div>
              Tanuj Sir
            </h3>
            <p className="font-['Playfair_Display'] text-zinc-400 mb-8 max-w-sm text-base leading-relaxed">
              AI assistant designed to streamline your English learning workflows and handle mundane tasks, so you can focus on mastering the language.
            </p>
            {/* Badges */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white transition-colors cursor-pointer">
                <span className="text-[10px] font-bold text-center leading-tight">SOC<br/>2</span>
              </div>
              <div className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white transition-colors cursor-pointer">
                <span className="text-[10px] font-bold text-center leading-tight">HIPAA</span>
              </div>
              <div className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white transition-colors cursor-pointer">
                <span className="text-[10px] font-bold text-center leading-tight">GDPR</span>
              </div>
            </div>
          </motion.div>

          {/* Links Grid - 3 Columns */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-medium mb-6 text-sm tracking-wider">Company</h4>
            <ul className="space-y-4">
              {['About', 'Contact', 'Blog', 'Story'].map(link => (
                <li key={link}>
                  <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors inline-block text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-white font-medium mb-6 text-sm tracking-wider">Products</h4>
            <ul className="space-y-4">
              {['Courses', 'Platform', 'Press', 'More'].map(link => (
                <li key={link}>
                  <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors inline-block text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-white font-medium mb-6 text-sm tracking-wider">Resources</h4>
            <ul className="space-y-4">
              {['Free Materials', 'Careers', 'Newsletters', 'More'].map(link => (
                <li key={link}>
                  <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors inline-block text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Cinematic Massive Text with Dotted Effect */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex justify-center items-center w-full mb-8 overflow-hidden relative group"
        >
          {/* Older text preserved exactly */}
          <h1 
            className="font-black text-[12vw] leading-[0.8] tracking-tight text-center uppercase relative z-10 pointer-events-none"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
              backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)',
              backgroundSize: '8px 8px',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            TANUJ SIR
          </h1>
          
          {/* The effect applied as an overlay - perfectly matching size */}
          <div className="absolute inset-0 z-20 pointer-events-auto mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <TextHoverEffect 
               text="TANUJ SIR" 
               className="font-black text-[12vw] tracking-tight uppercase fill-transparent"
             />
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-white/5">
          <p className="text-zinc-600 text-sm">
            © {currentYear} Tanuj Sir. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[MessageCircle, Globe, Play, Mail].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="text-zinc-600 hover:text-white transition-colors duration-300"
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
