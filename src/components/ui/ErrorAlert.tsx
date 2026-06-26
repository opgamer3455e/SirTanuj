import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ErrorAlertProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  title = "Please try again", 
  description = "An unexpected error occurred.", 
  isOpen, 
  onClose 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 w-72 sm:w-80 text-xs shadow-2xl"
        >
          <div className="error-alert cursor-default flex items-center justify-between w-full p-3 rounded-xl glass-panel border border-[#FF5A5F]/20">
            <div className="flex gap-3 items-center">
              <div className="text-[#FF5A5F] bg-[#FF5A5F]/10 p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-white font-['Cinzel'] font-bold tracking-wider">{title}</p>
                <p className="text-zinc-400 font-['Playfair_Display'] text-xs mt-0.5">{description}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-zinc-500 hover:text-white hover:bg-white/10 p-1.5 rounded-md transition-colors ease-linear"
              aria-label="Close Error Alert"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ErrorAlert;
