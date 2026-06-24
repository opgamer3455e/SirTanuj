import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export default function PricingSection() {
  return (
    <motion.section 
      className="page-container text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <motion.h2 variants={fadeUp} className="section-title font-['Cinzel'] text-[#C9A84C]">Learning Plans</motion.h2>
      <motion.p variants={fadeUp} className="section-subtitle mx-auto font-['Playfair_Display']">Conquer the ICSE boards with our guided plans</motion.p>
      
      <motion.div variants={staggerContainer} className="pricing-wrapper text-left">
        <motion.div variants={fadeUp} whileHover={{ scale: 0.95 }} className="pricing-card left cursor-pointer hover:border-[#C9A84C]/50 bg-[#0A0A0A] border-[#333]">
          <div className="text-xs text-[#E8D08A] uppercase mb-2">The Plebeian</div>
          <h3 className="font-['Cinzel'] text-white">Starter</h3>
          <div className="price" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>$19 <span style={{fontSize:'0.9rem', color: '#888'}}>/ Week</span></div>
          <div className="text-xs text-[#E8D08A] font-bold mb-4">What's included</div>
          <ul className="text-gray-300">
            <li><Plus size={14} className="text-[#C9A84C]"/> 1 live lesson per week</li>
            <li><Plus size={14} className="text-[#C9A84C]"/> Access to study guides</li>
            <li><Plus size={14} className="text-[#C9A84C]"/> Monthly feedback</li>
          </ul>
          <button className="btn w-full mt-4 bg-transparent border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black">Join Forces</button>
        </motion.div>

        <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }} className="pricing-card center cursor-pointer border-[#8B0000] bg-[#1A0505] shadow-[0_0_40px_rgba(139,0,0,0.3)]">
          <div className="text-xs text-red-300 uppercase mb-2">The Senator</div>
          <h3 className="font-['Cinzel'] text-white">Mastery</h3>
          <div className="price text-white">$39 <span className="text-red-300">/ Week</span></div>
          <div className="text-xs text-red-400 font-bold mb-4">What's included</div>
          <ul className="text-white">
            <li><Plus size={16} className="text-red-500"/> 2 live lessons per week</li>
            <li><Plus size={16} className="text-red-500"/> Julius Caesar premium guide</li>
            <li><Plus size={16} className="text-red-500"/> Physics lab manual</li>
            <li><Plus size={16} className="text-red-500"/> 24/7 doubt resolution</li>
            <li><Plus size={16} className="text-red-500"/> Mock test series</li>
          </ul>
          <button className="btn w-full mt-4" style={{ padding: '1rem', background: '#8B0000', color: 'white', fontWeight: 'bold' }}>Claim Your Empire</button>
        </motion.div>

        <motion.div variants={fadeUp} whileHover={{ scale: 0.95 }} className="pricing-card right cursor-pointer hover:border-[#C9A84C]/50 bg-[#0A0A0A] border-[#333]">
          <div className="text-xs text-[#E8D08A] uppercase mb-2">The Emperor</div>
          <h3 className="font-['Cinzel'] text-white">Intensive</h3>
          <div className="price" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>$79 <span style={{fontSize:'0.9rem', color: '#888'}}>/ Week</span></div>
          <div className="text-xs text-[#E8D08A] font-bold mb-4">What's included</div>
          <ul className="text-gray-300">
            <li><Plus size={14} className="text-[#C9A84C]"/> 4 live lessons per week</li>
            <li><Plus size={14} className="text-[#C9A84C]"/> 1-on-1 mentorship</li>
            <li><Plus size={14} className="text-[#C9A84C]"/> All premium resources</li>
          </ul>
          <button className="btn w-full mt-4 bg-transparent border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black">Ascend the Throne</button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
