import React from 'react';
import { motion } from 'framer-motion';

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

        {/* Image Elements (Upper Center / Right) */}
        <motion.div 
          className="relative mt-16 md:mt-0 md:w-1/2 flex justify-center items-start h-[500px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          {/* Circular Toothy Smile Image (Upper Center) */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:translate-x-[-20%] w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#0a0014] shadow-2xl z-20">
            <img 
              src="/images/toothy_smile.png" 
              alt="Close-up toothy smile" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Square Dentist Image (Bottom Right Overlapping) */}
          <div className="absolute top-40 md:top-48 left-1/2 transform translate-x-[-10%] md:translate-x-[20%] w-56 h-56 md:w-72 md:h-72 border-4 border-[#0a0014] shadow-2xl z-30">
            <img 
              src="/images/dentist_woman.png" 
              alt="Dentist woman smiling in scrubs" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
};
