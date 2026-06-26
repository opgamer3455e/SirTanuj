import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

import portraitBase from '@/assets/hero images/convert_to_16_9_ratio_2K_202606252347.jpeg';
import helmetOverlay from '@/assets/hero images/convert_to_16_9_ratio_2K_202606252344.jpeg';

// Generate an organic, jagged ink splatter blob that continuously morphs using SMIL animation
const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <path fill="black">
    <animate attributeName="d" dur="4s" repeatCount="indefinite" values="
      M70,20 C120,-10 160,30 180,80 C210,140 150,190 90,180 C30,170 -10,130 10,70 C20,30 40,40 70,20 Z;
      M60,30 C110,-20 170,40 190,90 C220,130 140,200 80,190 C20,180 -20,120 0,60 C20,20 30,50 60,30 Z;
      M80,10 C130,0 150,20 170,70 C190,150 160,180 100,170 C40,160 0,140 20,80 C30,40 50,30 80,10 Z;
      M70,20 C120,-10 160,30 180,80 C210,140 150,190 90,180 C30,170 -10,130 10,70 C20,30 40,40 70,20 Z
    "/>
  </path>
  <circle cx="160" cy="40" r="15" fill="black">
    <animate attributeName="r" dur="2s" values="15;10;17;15" repeatCount="indefinite"/>
    <animate attributeName="cy" dur="3.5s" values="40;45;35;40" repeatCount="indefinite"/>
  </circle>
  <circle cx="40" cy="150" r="12" fill="black">
    <animate attributeName="r" dur="3s" values="12;16;8;12" repeatCount="indefinite"/>
    <animate attributeName="cx" dur="4.2s" values="40;35;45;40" repeatCount="indefinite"/>
  </circle>
  <circle cx="180" cy="150" r="8" fill="black">
    <animate attributeName="r" dur="2.5s" values="8;11;5;8" repeatCount="indefinite"/>
  </circle>
  <circle cx="30" cy="50" r="10" fill="black">
    <animate attributeName="cy" dur="2.8s" values="50;55;45;50" repeatCount="indefinite"/>
  </circle>
</svg>
`.trim().replace(/\s+/g, ' ');
const blobSvgUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;

export function InteractiveHelmet() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Exact pixel coordinates for the center of the blob
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  
  // Opacity of the spotlight (fades out when mouse leaves)
  const spotlightOpacity = useMotionValue(0);

  // Smooth out the movement for the rapid, fluid follow
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 200 });
  const smoothOpacity = useSpring(spotlightOpacity, { damping: 30, stiffness: 150 });

  // Size of the blob mask
  const maskSize = 350; 
  const halfMask = maskSize / 2;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
    spotlightOpacity.set(1);
  };

  const handleMouseLeave = () => {
    spotlightOpacity.set(0);
  };

  // Convert exact coordinates to CSS positioning string
  const maskPositionX = useTransform(smoothX, v => `${v - halfMask}px`);
  const maskPositionY = useTransform(smoothY, v => `${v - halfMask}px`);
  const maskPosition = useMotionTemplate`${maskPositionX} ${maskPositionY}`;

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden bg-black cursor-crosshair group"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base Image */}
      <img 
        src={portraitBase} 
        alt="Base Portrait" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
      />

      {/* Spotlight Reveal Layer containing both Smoke and Overlay */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: smoothOpacity,
          WebkitMaskImage: `url("${blobSvgUrl}")`,
          WebkitMaskSize: `${maskSize}px ${maskSize}px`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: maskPosition,
          willChange: 'opacity, mask-position',
          maskImage: `url("${blobSvgUrl}")`,
          maskSize: `${maskSize}px ${maskSize}px`,
          maskRepeat: 'no-repeat',
          maskPosition: maskPosition,
        }}
      >
        {/* Smoke Backdrop Graphic */}
        <div className="absolute inset-0 bg-gray-400/20 mix-blend-multiply backdrop-blur-sm" />
        <div className="absolute inset-0 bg-white/20 mix-blend-screen backdrop-blur-md" />

        {/* Helmet Overlay */}
        <img 
          src={helmetOverlay} 
          alt="Overlay Helmet" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}
