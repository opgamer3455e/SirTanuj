import { lazy } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/ui/hero-odyssey';
import { InViewChunk } from '@/components/ui/InViewChunk';

const MethodPanel = lazy(() => import('./LandingPageSections/MethodPanel'));
const ExperienceSection = lazy(() => import('./LandingPageSections/ExperienceSection'));
const PricingSection = lazy(() => import('./LandingPageSections/PricingSection'));

export default function LandingPage() {
  return (
    <div className="landing-page bg-[#050505]">
      
      {/* Butter smooth hardware accelerated Hero Section */}
      <HeroSection />

      {/* Chunk loaded sections to prevent heavy initial bundle and rendering */}
      <InViewChunk>
        <MethodPanel />
      </InViewChunk>

      <InViewChunk>
        <ExperienceSection />
      </InViewChunk>

      <InViewChunk>
        <PricingSection />
      </InViewChunk>

      {/* FAQ */}
      <motion.section 
        className="page-container pt-20 pb-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="section-title text-[#C9A84C] font-['Cinzel']">Got Questions?</h2>
        <p className="section-subtitle font-['Playfair_Display'] text-gray-400">Consult the Senate.</p>
      </motion.section>
    </div>
  );
}
