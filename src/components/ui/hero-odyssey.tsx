import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, FileText } from 'lucide-react';
import LorenzoInteractivePortrait from './LorenzoInteractivePortrait';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[90vh] bg-[#050505] text-white overflow-hidden rounded-b-[40px]"
    >
      {/* Cinematic Background Elements */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        {/* Background Rome Images (Low Opacity) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url('/assets/rome_after.png')` }}
          />
        </div>

        {/* Lorenzo Interactive Portrait */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-full h-full max-w-4xl max-h-[80vh]">
            <LorenzoInteractivePortrait 
              baseImageUrl="/assets/caesar.png"
              revealImageUrl="/assets/antony.png"
              backgroundColor="transparent"
              blobRadius={0.4}
              blobFadeSpeed={2.0}
              colorBgVec3="0.0, 0.0, 0.0"
              colorSoftShapeVec3="0.05, 0.0, 0.0"
              colorLineVec3="0.8, 0.6, 0.2"
            />
          </div>
        </div>

        {/* Overlay Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none z-30" />
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-30" />
      </motion.div>

      {/* Content */}
      <div className="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center pt-20 pointer-events-none">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-[0_0_20px_rgba(255,255,255,0.1)] pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
          <span className="text-sm font-medium tracking-widest uppercase text-[#C9A84C] font-['Cinzel']">ICSE Class 9 & 10</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-8xl font-bold mb-4 font-['Cinzel'] tracking-tight text-white drop-shadow-2xl"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
        >
          The Tragedy of<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8D08A] to-[#C9A84C]">Julius Caesar</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 font-['Playfair_Display'] italic mb-10 max-w-2xl drop-shadow-md"
        >
          "The fault, dear Brutus, is not in our stars, but in ourselves, that we are underlings."
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 pointer-events-auto"
        >
          <a href="/julius-caesar" className="flex items-center gap-2 px-8 py-4 bg-[#8B0000] text-white font-bold rounded-full hover:bg-red-800 transition-colors shadow-[0_0_20px_rgba(139,0,0,0.4)] font-['Lato'] tracking-wide">
            <BookOpen size={18} /> Read the Guide
          </a>
          <a href="/assets/Main File CLass 10-1.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all font-['Lato'] tracking-wide">
            <FileText size={18} /> ICSE Notes PDF
          </a>
        </motion.div>
      </div>

      {/* Decorative CSS Lighting Glow (Replaces WebGL) */}
      <div className="absolute top-[-10%] left-1/2 transform -translate-x-1/2 w-[80%] h-[400px] bg-[#C9A84C] rounded-full blur-[150px] opacity-10 pointer-events-none mix-blend-screen z-30" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#8B0000] rounded-full blur-[150px] opacity-20 pointer-events-none mix-blend-screen z-30" />
    </div>
  );
};
