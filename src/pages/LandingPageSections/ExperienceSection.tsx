import { motion } from 'framer-motion';
import { Play, Shield, MessageSquare, BookOpen } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export default function ExperienceSection() {
  return (
    <motion.section 
      className="page-container text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <motion.h2 variants={fadeUp} className="section-title text-[#C9A84C] font-['Cinzel']">The Experience</motion.h2>
      <motion.p variants={fadeUp} className="section-subtitle mx-auto font-['Playfair_Display']">Designed for dramatic results and deep understanding</motion.p>

      <div className="experience-layout text-left mt-8">
        <motion.div className="experience-grid" variants={staggerContainer}>
          <motion.div variants={fadeUp} className="exp-card hover:bg-[#1f1f1f] border border-transparent hover:border-[#8B0000]/50 transition-colors cursor-pointer">
            <BookOpen className="exp-card-icon text-[#C9A84C]" size={24} />
            <h3 className="font-['Cinzel'] text-white">Literature Mastery</h3>
          </motion.div>
          <motion.div variants={fadeUp} className="exp-card hover:bg-[#1f1f1f] border border-transparent hover:border-[#8B0000]/50 transition-colors cursor-pointer">
            <Shield className="exp-card-icon text-[#C9A84C]" size={24} />
            <h3 className="font-['Cinzel'] text-white">Board Exam Ready</h3>
          </motion.div>
          <motion.div variants={fadeUp} className="exp-card hover:bg-[#1f1f1f] border border-transparent hover:border-[#8B0000]/50 transition-colors cursor-pointer">
            <MessageSquare className="exp-card-icon text-[#C9A84C]" size={24} />
            <h3 className="font-['Cinzel'] text-white">Expert Guidance</h3>
          </motion.div>
          <motion.div variants={fadeUp} className="exp-card hover:bg-[#1f1f1f] border border-transparent hover:border-[#8B0000]/50 transition-colors cursor-pointer">
            <Play className="exp-card-icon text-[#C9A84C]" size={24} />
            <h3 className="font-['Cinzel'] text-white">Interactive Sessions</h3>
          </motion.div>
        </motion.div>
        <motion.div variants={fadeUp} className="exp-photo overflow-hidden rounded-[24px] border-2 border-[#C9A84C]/30 relative">
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <motion.img 
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.5 }}
            src="/assets/rome_before.png" 
            alt="Roman Architecture" 
            className="exp-image filter contrast-125 sepia-[.3]" 
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
