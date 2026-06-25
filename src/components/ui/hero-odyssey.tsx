import React from 'react';
import { motion } from 'framer-motion';
import AdvancedInteractivePortrait from './AdvancedInteractivePortrait';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-[100vh] bg-[#0a0014] text-white overflow-hidden flex items-center pt-24 px-12 md:px-24">
      {/* Background Shift handled by the component container color */}

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Text Elements (Left Side) */}
        <motion.div 
          className="flex flex-col z-20 md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-bold font-sans text-white leading-tight tracking-tight mb-4">
            SiteSmiths
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-lg">
            Crafting websites that work as hard as you do.
          </p>
        </motion.div>

        {/* Image Elements (Right) */}
        <motion.div 
          className="relative mt-16 md:mt-0 md:w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          <AdvancedInteractivePortrait 
            baseImage="/assets/caesar.png"
            revealImage="/assets/antony.png"
          />
        </motion.div>

      </div>
    </div>
  );
};
