import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WatermarkProps {
  userId: string;
}

export const Watermark: React.FC<WatermarkProps> = ({ userId }) => {
  const [position, setPosition] = useState({ top: '50%', left: '50%' });

  useEffect(() => {
    // Move the watermark to a random position every 7 seconds
    const interval = setInterval(() => {
      setPosition({
        top: `${Math.floor(Math.random() * 80) + 10}%`,
        left: `${Math.floor(Math.random() * 80) + 10}%`,
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 text-white/10 font-bold text-2xl tracking-widest uppercase select-none mix-blend-difference drop-shadow-md"
      animate={{
        top: position.top,
        left: position.left,
        opacity: [0.1, 0.4, 0.1],
      }}
      transition={{
        duration: 7,
        ease: 'easeInOut',
        opacity: {
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut'
        }
      }}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      {userId}
    </motion.div>
  );
};
