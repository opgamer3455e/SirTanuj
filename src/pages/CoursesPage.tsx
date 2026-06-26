import { motion } from 'framer-motion';
import { BookOpen, PenTool, MessageSquare, Download, MapPin } from 'lucide-react';
import Accordion from '../components/ui/Accordion';

const class9Curriculum = [
  {
    id: 'grammar-9',
    title: 'Grammar',
    content: (
      <ul className="space-y-4 pt-2">
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FF5A5F] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Tenses and their advanced applications in narrative writing</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FF5A5F] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Active and Passive Voice transformations</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FF5A5F] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Direct and Indirect Speech for dialogue</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FF5A5F] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Subject-Verb Agreement nuances</span></li>
      </ul>
    )
  },
  {
    id: 'literature-9',
    title: 'Literature',
    content: (
      <ul className="space-y-4 pt-2">
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#00A699] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Prose: Deep dive into the Beehive Curriculum</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#00A699] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Poetry: Comprehensive analysis and literary devices</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#00A699] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Supplementary Reader: Moments character studies</span></li>
      </ul>
    )
  },
  {
    id: 'writing-9',
    title: 'Writing Skills',
    content: (
      <ul className="space-y-4 pt-2">
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FC642D] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Descriptive Paragraphs with sensory details</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FC642D] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Diary Entry & Article Writing structure</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FC642D] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Story Writing Principles & pacing</span></li>
      </ul>
    )
  }
];

const class10Curriculum = [
  {
    id: 'grammar-10',
    title: 'Grammar Mastery',
    content: (
      <ul className="space-y-4 pt-2">
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FF5A5F] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Advanced Tenses & complex structures</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FF5A5F] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Modals and Determiners mastery</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FF5A5F] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Clauses & Complex Sentences breakdown</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FF5A5F] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Error Correction & Omission drills</span></li>
      </ul>
    )
  },
  {
    id: 'literature-10',
    title: 'Board Literature',
    content: (
      <ul className="space-y-4 pt-2">
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#00A699] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Prose: First Flight critical themes</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#00A699] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Poetry Analysis & advanced Literary Devices</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#00A699] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Footprints Without Feet chapter summaries</span></li>
      </ul>
    )
  },
  {
    id: 'writing-10',
    title: 'Advanced Writing',
    content: (
      <ul className="space-y-4 pt-2">
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FC642D] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Formal Letter Writing (Inquiry, Complaint, Order)</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FC642D] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Analytical Paragraph Writing with data</span></li>
        <li className="flex items-start gap-3"><MapPin size={18} className="text-[#FC642D] mt-1 shrink-0" /> <span className="font-['Playfair_Display'] text-zinc-300">Essay Formatting for maximum Board marks</span></li>
      </ul>
    )
  }
];

export default function CoursesPage() {
  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#050505] bg-noise relative overflow-hidden">
      
      {/* Atmospheric Gradients */}
      <div className="absolute top-0 left-0 w-full h-full atmospheric-gradient pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
        >
          <div>
            <div className="w-16 h-1 bg-[#C9A84C] mb-8" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Cinzel'] leading-tight">
              The <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#E8D08A]">Curriculum</span>
            </h1>
          </div>
          <div className="pb-4">
            <p className="text-xl md:text-2xl text-zinc-400 font-['Playfair_Display'] italic border-l-2 border-[#C9A84C]/30 pl-6">
              "Mastery is not a destination, but a curated path of constant learning."
            </p>
          </div>
        </motion.div>

        {/* Asymmetrical Layout for Classes */}
        <div className="space-y-32">
          
          {/* Class 9 Section */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row gap-12 relative"
          >
            <div className="lg:w-1/3 relative">
              <div className="sticky top-32 glass-panel p-10 rounded-2xl">
                <div className="w-14 h-14 bg-[#FF5A5F]/20 rounded-full flex items-center justify-center mb-6 border border-[#FF5A5F]/30">
                  <BookOpen className="text-[#FF5A5F]" size={28} />
                </div>
                <h2 className="text-3xl font-bold text-white font-['Cinzel'] mb-4">Class 9<br/>Foundation</h2>
                <p className="text-zinc-400 font-['Playfair_Display'] text-lg">
                  Build a solid linguistic foundation. Our syllabus is designed to turn grammar rules into second nature.
                </p>
              </div>
            </div>
            
            <div className="lg:w-2/3 glass-panel p-8 md:p-12 rounded-3xl">
              <Accordion items={class9Curriculum} allowMultiple />
            </div>
          </motion.div>

          {/* Class 10 Section */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row-reverse gap-12 relative"
          >
            <div className="lg:w-1/3 relative">
              <div className="sticky top-32 glass-panel p-10 rounded-2xl border-t border-[#00A699]/30 shadow-[0_0_50px_rgba(0,166,153,0.1)]">
                <div className="w-14 h-14 bg-[#00A699]/20 rounded-full flex items-center justify-center mb-6 border border-[#00A699]/30">
                  <PenTool className="text-[#00A699]" size={28} />
                </div>
                <h2 className="text-3xl font-bold text-white font-['Cinzel'] mb-4">Class 10<br/>Board Prep</h2>
                <p className="text-zinc-400 font-['Playfair_Display'] text-lg">
                  Execute with precision. We focus on board formats, time management, and achieving maximum scores.
                </p>
              </div>
            </div>
            
            <div className="lg:w-2/3 glass-panel p-8 md:p-12 rounded-3xl">
              <Accordion items={class10Curriculum} allowMultiple />
            </div>
          </motion.div>

        </div>

        {/* Lead Generation Section - Staggered Bento */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="md:col-span-2 glass-panel p-12 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#FF5A5F]/20 blur-[120px] rounded-full group-hover:bg-[#FF5A5F]/30 transition-colors duration-700" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4 font-['Cinzel']">Before You Commit</h2>
              <p className="text-zinc-300 font-['Playfair_Display'] text-xl max-w-lg mb-8">
                Experience our teaching methodology firsthand. Book a free live demonstration class today.
              </p>
              <button className="px-8 py-4 bg-[#FF5A5F] hover:bg-[#ff4046] text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-3 shadow-[0_0_30px_rgba(255,90,95,0.4)]">
                <MessageSquare size={20} />
                Reserve Your Seat
              </button>
            </div>
          </div>
          
          <div className="glass-panel p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-white/5 transition-colors duration-500">
            <div className="w-16 h-16 rounded-full border border-[#C9A84C]/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 bg-[#C9A84C]/10">
              <Download className="text-[#C9A84C]" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white font-['Cinzel'] mb-3">Syllabus PDF</h3>
            <p className="text-zinc-400 font-['Playfair_Display'] text-sm">Download the complete academic planner and reading list.</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
