import { lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InViewChunk } from '@/components/ui/InViewChunk';
import { InteractiveHelmet } from '@/components/ui/InteractiveHelmet';
import AnimatedHeroButton from '@/components/ui/AnimatedHeroButton';
import Accordion from '@/components/ui/Accordion';

const MethodPanel = lazy(() => import('./LandingPageSections/MethodPanel'));
const ExperienceSection = lazy(() => import('./LandingPageSections/ExperienceSection'));
const PricingSection = lazy(() => import('./LandingPageSections/PricingSection'));

// New Coaching Sections
import CoreOfferings from './LandingPageSections/CoreOfferings';
import FeaturesSection from './LandingPageSections/FeaturesSection';
import StatsBanner from './LandingPageSections/StatsBanner';

// FAQ Items
const faqItems = [
  { id: 'q1', title: 'How do the lessons work?', content: <p>Each lesson is a live video session with interactive exercises.</p> },
  { id: 'q2', title: 'What is the duration?', content: <p>Courses run for 12 weeks with weekly live classes.</p> },
  // Add more items as needed
];

export default function LandingPage() {
  return (
    <div className="landing-page bg-[#121212]">
      
      {/* Interactive Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-center text-center px-4 bg-black/40">
          <h1 className="text-5xl md:text-7xl font-bold text-[#FF5A5F] font-['Cinzel'] mb-4 tracking-tight drop-shadow-2xl">
            Learn English with Tanuj Sir
          </h1>
          <p className="text-2xl md:text-3xl font-['Playfair_Display'] text-white font-medium mb-6 drop-shadow-xl">
            Your Complete English Learning Platform
          </p>
          <div className="max-w-3xl mx-auto mb-10 p-6 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10">
            <p className="text-xl md:text-2xl italic text-gray-200 font-['Playfair_Display']">
              "The beautiful thing about learning is that no one can take it away from you."
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto items-center">
            <Link to="/courses" className="block">
              <AnimatedHeroButton>
                Explore Courses
              </AnimatedHeroButton>
            </Link>
            <Link to="/study-materials" className="px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors backdrop-blur-md border border-white/20 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Free Study Materials
            </Link>
          </div>
        </div>
        <InteractiveHelmet />
      </section>

      {/* Chunk loaded sections to prevent heavy initial bundle and rendering */}
      <InViewChunk>
        <MethodPanel />
      </InViewChunk>

      <InViewChunk>
        <ExperienceSection />
      </InViewChunk>

      {/* New Coaching Content */}
      <CoreOfferings />
      <FeaturesSection />
      <StatsBanner />

      <InViewChunk>
        <PricingSection />
      </InViewChunk>

      {/* FAQ Section */}
      <section className="page-container pt-20 pb-20 text-center md:text-left flex flex-col md:flex-row items-start gap-12">
        <div className="flex-1">
          <h2 className="section-title text-[#C9A84C] font-['Cinzel']">Got Questions?</h2>
          <p className="section-subtitle font-['Playfair_Display'] text-gray-400">Consult the Senate.</p>
        </div>
        <div className="flex-1 max-w-xl">
          <Accordion items={faqItems} />
        </div>
      </section>
    </div>
  );
}
