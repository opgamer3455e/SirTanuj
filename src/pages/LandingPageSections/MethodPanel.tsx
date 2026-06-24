import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
};

export default function MethodPanel() {
  return (
    <section className="page-container pt-10">
      <motion.div 
        className="method-panel border border-[#C9A84C]/30 bg-[#0A0A0A]/80 backdrop-blur-md shadow-[0_0_30px_rgba(201,168,76,0.1)]" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }} 
        variants={fadeUp}
      >
        <div className="method-features">
          <div className="feature-pill border-[#C9A84C]/50 text-[#E8D08A]"><Plus size={16} /> Classical Methods</div>
          <div className="feature-pill border-[#C9A84C]/50 text-[#E8D08A]"><Plus size={16} /> ICSE Focused</div>
          <div className="feature-pill border-[#C9A84C]/50 text-[#E8D08A]"><Plus size={16} /> Premium Notes</div>
          <div className="feature-pill border-[#C9A84C]/50 text-[#E8D08A]"><Plus size={16} /> Live Masterclasses</div>
          <div className="feature-pill border-[#C9A84C]/50 text-[#E8D08A]"><Plus size={16} /> Mythological Context</div>
        </div>
        <div className="method-graphics relative flex justify-center items-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            style={{ width: '300px', height: '300px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
             <div style={{ width: '250px', height: '250px', border: '1px solid rgba(139,0,0,0.4)', borderRadius: '50%', transform: 'rotate(45deg)' }}></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
