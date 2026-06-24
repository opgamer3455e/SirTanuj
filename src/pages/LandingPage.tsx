import { motion } from 'framer-motion';
import { Plus, Play, Shield, MessageSquare, BookOpen } from 'lucide-react';

import { HeroSection } from '@/components/ui/hero-odyssey';

// Shared Framer Motion Variants
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

export default function LandingPage() {
  return (
    <div className="landing-page">
      
      {/* WEBGL HERO SECTION */}
      <HeroSection />

      {/* GLOWING METHOD PANEL */}
      <section className="page-container pt-0">
        <motion.div 
          className="method-panel" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          variants={fadeUp}
        >
          <div className="method-features">
            <div className="feature-pill"><Plus size={16} /> Brain-Based Learning</div>
            <div className="feature-pill"><Plus size={16} /> Communication First</div>
            <div className="feature-pill"><Plus size={16} /> Online Experience</div>
            <div className="feature-pill"><Plus size={16} /> Personalized Paths</div>
            <div className="feature-pill"><Plus size={16} /> Anytime, Anywhere</div>
          </div>
          <div className="method-graphics relative flex justify-center items-center">
            {/* Placeholder for the 3D graphics in the screenshot */}
            <div style={{ width: '300px', height: '300px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '40px', transform: 'rotate(45deg)' }}></div>
          </div>
        </motion.div>
      </section>

      {/* THE EXPERIENCE */}
      <motion.section 
        className="page-container text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeUp} className="section-title">The Experience</motion.h2>
        <motion.p variants={fadeUp} className="section-subtitle mx-auto">Designed for real conversations, not textbooks</motion.p>

        <div className="experience-layout text-left mt-8">
          <motion.div className="experience-grid" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="exp-card hover:bg-[#1f1f1f] transition-colors cursor-pointer">
              <Play className="exp-card-icon" size={24} />
              <h3>Outcome-Focused</h3>
            </motion.div>
            <motion.div variants={fadeUp} className="exp-card hover:bg-[#1f1f1f] transition-colors cursor-pointer">
              <Shield className="exp-card-icon" size={24} />
              <h3>More Trust, Less Fluff</h3>
            </motion.div>
            <motion.div variants={fadeUp} className="exp-card hover:bg-[#1f1f1f] transition-colors cursor-pointer">
              <MessageSquare className="exp-card-icon" size={24} />
              <h3>Make It Human</h3>
            </motion.div>
            <motion.div variants={fadeUp} className="exp-card hover:bg-[#1f1f1f] transition-colors cursor-pointer">
              <BookOpen className="exp-card-icon" size={24} />
              <h3>All Materials Included</h3>
            </motion.div>
          </motion.div>
          <motion.div variants={fadeUp} className="exp-photo overflow-hidden rounded-[24px]">
            <motion.img 
              whileHover={{ scale: 1.05 }} 
              transition={{ duration: 0.5 }}
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" 
              alt="Student learning" 
              className="exp-image" 
            />
          </motion.div>
        </div>
      </motion.section>

      {/* MEET TEACHERS */}
      <motion.section 
        className="page-container text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="section-title">Meet Teachers</h2>
        <p className="section-subtitle mx-auto">Teachers who listen, adapt, and guide you forward</p>
      </motion.section>

      {/* STATS SECTION */}
      <motion.section 
        className="page-container pb-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="stats-grid text-left">
          <motion.div variants={fadeUp} className="stat-item">
            <h4>More Than</h4>
            <div className="stat-number">0+</div>
            <p>Students Enrolled Worldwide</p>
          </motion.div>
          <motion.div variants={fadeUp} className="stat-item">
            <h4>More Than</h4>
            <div className="stat-number">0k+</div>
            <p>Guided Language Practice</p>
          </motion.div>
          <motion.div variants={fadeUp} className="stat-item">
            <h4>More Than</h4>
            <div className="stat-number">0%</div>
            <p>Student Satisfaction Rate</p>
          </motion.div>
        </div>
      </motion.section>

      {/* LEARNING PLANS (3D PRICING) */}
      <motion.section 
        className="page-container text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeUp} className="section-title">Learning Plans</motion.h2>
        <motion.p variants={fadeUp} className="section-subtitle mx-auto">Personalized learning that adapts to you</motion.p>
        
        <motion.div variants={staggerContainer} className="pricing-wrapper text-left">
          <motion.div variants={fadeUp} whileHover={{ scale: 0.95 }} className="pricing-card left cursor-pointer hover:border-white/20">
            <div className="text-xs text-secondary uppercase mb-2">Best for beginners</div>
            <h3>Starter</h3>
            <div className="price" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>$19 <span style={{fontSize:'0.9rem'}}>/ Week</span></div>
            <div className="text-xs text-secondary font-bold mb-4">What's included</div>
            <ul>
              <li><Plus size={14} className="text-secondary"/> 1 live lesson per week</li>
              <li><Plus size={14} className="text-secondary"/> Certified language teacher</li>
              <li><Plus size={14} className="text-secondary"/> Personalized feedback</li>
            </ul>
            <button className="btn btn-primary w-full mt-4">Get Started</button>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ scale: 1.08 }} className="pricing-card center cursor-pointer hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(0,136,255,0.2)]">
            <div className="text-xs text-secondary uppercase mb-2">Best for fast progress</div>
            <h3>Progress</h3>
            <div className="price">$39 <span>/ Week</span></div>
            <div className="text-xs text-primary font-bold mb-4">What's included</div>
            <ul>
              <li><Plus size={16} className="text-[#0088FF]"/> 2 live lessons per week</li>
              <li><Plus size={16} className="text-[#0088FF]"/> Certified teachers</li>
              <li><Plus size={16} className="text-[#0088FF]"/> Personalized feedback</li>
              <li><Plus size={16} className="text-[#0088FF]"/> All learning materials included</li>
              <li><Plus size={16} className="text-[#0088FF]"/> Online, flexible scheduling</li>
            </ul>
            <button className="btn btn-primary w-full mt-4" style={{ padding: '1rem', background: '#0088FF', color: 'white' }}>Get Started</button>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ scale: 0.95 }} className="pricing-card right cursor-pointer hover:border-white/20">
            <div className="text-xs text-secondary uppercase mb-2">Master real conversations</div>
            <h3>Fluent</h3>
            <div className="price" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>$79 <span style={{fontSize:'0.9rem'}}>/ Week</span></div>
            <div className="text-xs text-secondary font-bold mb-4">What's included</div>
            <ul>
              <li><Plus size={14} className="text-secondary"/> 4 live lessons per week</li>
              <li><Plus size={14} className="text-secondary"/> Certified expert teachers</li>
              <li><Plus size={14} className="text-secondary"/> In-depth personalized feedback</li>
            </ul>
            <button className="btn btn-primary w-full mt-4">Get Started</button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* FAQ */}
      <motion.section 
        className="page-container pt-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="section-title">Got Questions?</h2>
        <p className="section-subtitle">We've got clear answers</p>
      </motion.section>
    </div>
  );
}
