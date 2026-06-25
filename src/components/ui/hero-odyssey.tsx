import React from 'react';
import { motion } from 'framer-motion';
import AdvancedInteractivePortrait from './AdvancedInteractivePortrait';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-[100vh] bg-[#0a0014] text-white overflow-hidden flex items-center justify-center pt-16">
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
      >
        <AdvancedInteractivePortrait 
          baseImage="/assets/caesar.png"
          revealImage="/assets/antony.png"
        />
      </motion.div>
    </div>
  );
};
