import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Quote, PenTool, Lightbulb, GraduationCap } from 'lucide-react';

export default function JuliusCaesarGuide() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BookOpen size={18} /> },
    { id: 'acts', label: 'Acts & Scenes', icon: <PenTool size={18} /> },
    { id: 'characters', label: 'Characters', icon: <Users size={18} /> },
    { id: 'quotes', label: 'Key Quotes', icon: <Quote size={18} /> },
    { id: 'themes', label: 'Themes', icon: <Lightbulb size={18} /> },
    { id: 'exam', label: 'Exam Tips', icon: <GraduationCap size={18} /> },
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };
  
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }
  };

  return (
    <div className="page-container" style={{ paddingTop: '2rem' }}>
      <motion.header 
        className="guide-hero mb-12"
        initial="hidden" animate="visible" variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="badge mb-4">ICSE Study Guide</motion.div>
        <motion.h1 variants={fadeUp} className="section-title">The Tragedy of Julius Caesar</motion.h1>
        <motion.p variants={fadeUp} className="section-subtitle">William Shakespeare · c. 1599</motion.p>
      </motion.header>

      <motion.div 
        className="guide-tabs"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </motion.div>

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="guide-content mt-8"
      >
        {activeTab === 'overview' && (
          <motion.div className="guide-section" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h2 variants={fadeUp} className="text-2xl font-bold mb-6 font-display">Overview & Background</motion.h2>
            <motion.div variants={fadeUp} className="intro-quote mb-8 p-6 bg-glass border-l-4 border-accent rounded-r-lg italic">
              "The fault, dear Brutus, is not in our stars, but in ourselves, that we are underlings."
            </motion.div>
            <motion.div variants={staggerContainer} className="grid-2">
              <motion.div variants={fadeUp} className="card">
                <h3 className="text-xl mb-2 text-accent">Genre & Period</h3>
                <p>A political tragedy written c. 1599. It belongs to Shakespeare's Roman Plays trilogy. Set in 44 BC Rome, based on Plutarch's Lives.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="card">
                <h3 className="text-xl mb-2 text-accent">Central Conflict</h3>
                <p>Republicanism vs. tyranny. Is Caesar a dangerous tyrant or a great leader? Is Brutus a noble patriot or a treacherous friend?</p>
              </motion.div>
              <motion.div variants={fadeUp} className="card">
                <h3 className="text-xl mb-2 text-accent">Tragic Hero</h3>
                <p>Surprisingly, the true tragic hero is Brutus, not Caesar. His fatal flaw (hamartia) is his idealism — he is too noble for real politics.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'characters' && (
          <motion.div className="guide-section" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h2 variants={fadeUp} className="text-2xl font-bold mb-6 font-display">Character Sketches</motion.h2>
            <motion.div variants={staggerContainer} className="grid-3">
              <motion.div variants={fadeUp} className="card char-card hover:border-white/20 transition-colors">
                <h3 className="text-xl mb-1">Marcus Brutus</h3>
                <div className="text-xs text-accent uppercase tracking-wider mb-4">Tragic Hero · Conspirator</div>
                <div className="flex gap-2 mb-4">
                  <span className="trait">Honourable</span>
                  <span className="trait">Idealistic</span>
                </div>
                <p className="text-sm">Loves Caesar personally but loves Rome more. His fatal flaw is idealism and political naivety.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="card char-card hover:border-white/20 transition-colors">
                <h3 className="text-xl mb-1">Caius Cassius</h3>
                <div className="text-xs text-accent uppercase tracking-wider mb-4">Chief Conspirator</div>
                <div className="flex gap-2 mb-4">
                  <span className="trait">Manipulative</span>
                  <span className="trait">Shrewd</span>
                </div>
                <p className="text-sm">The engine of the conspiracy. Driven by genuine republicanism and personal jealousy of Caesar.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="card char-card hover:border-white/20 transition-colors">
                <h3 className="text-xl mb-1">Julius Caesar</h3>
                <div className="text-xs text-accent uppercase tracking-wider mb-4">Ruler · Symbol of Power</div>
                <div className="flex gap-2 mb-4">
                  <span className="trait">Powerful</span>
                  <span className="trait">Hubris</span>
                </div>
                <p className="text-sm">His fatal flaw is hubris — excessive pride that makes him dismiss warnings and omens.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'acts' && (
          <motion.div className="guide-section" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h2 variants={fadeUp} className="text-2xl font-bold mb-6 font-display">Acts & Scenes</motion.h2>
            <motion.div variants={staggerContainer} className="act-list">
              <motion.div variants={fadeUp} className="card mb-4 hover:border-white/20 transition-colors">
                <h3 className="text-xl text-accent mb-2">ACT I: The Seeds of Conspiracy</h3>
                <p>Establishes the political tension. Cassius courts Brutus during the Lupercalia festival. Supernatural omens reflect the political disorder.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="card mb-4 hover:border-white/20 transition-colors">
                <h3 className="text-xl text-accent mb-2">ACT II: The Night of Decision</h3>
                <p>Brutus decides Caesar must die. The conspirators plan the assassination. Calpurnia begs Caesar to stay home, but Decius manipulates him.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="card mb-4 hover:border-white/20 transition-colors">
                <h3 className="text-xl text-accent mb-2">ACT III: The Assassination</h3>
                <p>The climax. Caesar is killed. Brutus allows Antony to speak at the funeral, which turns the mob against the conspirators.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {['quotes', 'themes', 'exam'].includes(activeTab) && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="guide-section card">
            <p>This section is currently being migrated from the legacy HTML version into the new interactive module. Please check back soon or view the original raw file.</p>
            <a href="/assets/julius_caesar_icse_guide.html" target="_blank" rel="noreferrer" className="btn btn-outline mt-4">View Original Legacy HTML Guide</a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
