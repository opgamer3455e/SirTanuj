import { motion } from 'framer-motion';
import { BookOpen, PenTool, MessageSquare, ArrowRight, Download } from 'lucide-react';
import Tabs from '../components/ui/Tabs';
import Accordion from '../components/ui/Accordion';

const class9Curriculum = [
  {
    id: 'grammar-9',
    title: 'Grammar',
    content: (
      <ul className="space-y-3">
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F]" /> Tenses and their applications</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F]" /> Active and Passive Voice</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F]" /> Direct and Indirect Speech</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F]" /> Subject-Verb Agreement</li>
      </ul>
    )
  },
  {
    id: 'literature-9',
    title: 'Literature',
    content: (
      <ul className="space-y-3">
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00A699]" /> Prose: Beehive Curriculum</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00A699]" /> Poetry: Comprehensive Analysis</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00A699]" /> Supplementary Reader: Moments</li>
      </ul>
    )
  },
  {
    id: 'writing-9',
    title: 'Writing Skills',
    content: (
      <ul className="space-y-3">
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FC642D]" /> Descriptive Paragraphs</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FC642D]" /> Diary Entry & Article Writing</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FC642D]" /> Story Writing Principles</li>
      </ul>
    )
  }
];

const class10Curriculum = [
  {
    id: 'grammar-10',
    title: 'Grammar',
    content: (
      <ul className="space-y-3">
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F]" /> Advanced Tenses</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F]" /> Modals and Determiners</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F]" /> Clauses & Complex Sentences</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F]" /> Error Correction & Omission</li>
      </ul>
    )
  },
  {
    id: 'literature-10',
    title: 'Literature',
    content: (
      <ul className="space-y-3">
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00A699]" /> Prose: First Flight</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00A699]" /> Poetry Analysis & Literary Devices</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00A699]" /> Footprints Without Feet</li>
      </ul>
    )
  },
  {
    id: 'writing-10',
    title: 'Writing Skills',
    content: (
      <ul className="space-y-3">
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FC642D]" /> Formal Letter Writing (Inquiry, Complaint, Order)</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FC642D]" /> Analytical Paragraph Writing</li>
        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FC642D]" /> Essay Formatting for Boards</li>
      </ul>
    )
  }
];

export default function CoursesPage() {
  const tabs = [
    {
      id: 'class9',
      label: 'Class 9 English',
      content: (
        <div className="bg-[#121212] p-8 rounded-3xl border border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#FF5A5F]/10 rounded-xl flex items-center justify-center">
              <BookOpen className="text-[#FF5A5F]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Class 9 Foundation</h3>
              <p className="text-zinc-400">Build a strong core in grammar and literature.</p>
            </div>
          </div>
          <Accordion items={class9Curriculum} allowMultiple />
        </div>
      )
    },
    {
      id: 'class10',
      label: 'Class 10 English',
      content: (
        <div className="bg-[#121212] p-8 rounded-3xl border border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#00A699]/10 rounded-xl flex items-center justify-center">
              <PenTool className="text-[#00A699]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Class 10 Board Prep</h3>
              <p className="text-zinc-400">Master the syllabus and excel in your board exams.</p>
            </div>
          </div>
          <Accordion items={class10Curriculum} allowMultiple />
        </div>
      )
    }
  ];

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Bricolage_Grotesque']">
            Our <span className="text-[#00A699]">Curriculum</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Comprehensive English courses designed specifically for Class 9 and 10 students, ensuring conceptual clarity and exam readiness.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-24"
        >
          <Tabs tabs={tabs} />
        </motion.div>

        {/* Lead Generation Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] p-10 rounded-[2.5rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#FF5A5F]/10 blur-[100px] rounded-full" />
          
          <div className="max-w-xl relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4 font-['Bricolage_Grotesque']">Try Before You Commit</h2>
            <p className="text-zinc-400 text-lg mb-0">
              Not sure yet? Download our sample study materials or watch a demo lesson for free. No credit card required.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
            <button className="px-6 py-4 bg-[#FF5A5F] hover:bg-[#ff4046] text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,90,95,0.3)]">
              <MessageSquare size={18} />
              Book a Demo
            </button>
            <button className="px-6 py-4 bg-[#1a1a1a] hover:bg-[#252525] text-white font-semibold rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2">
              <Download size={18} />
              Sample PDF
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
