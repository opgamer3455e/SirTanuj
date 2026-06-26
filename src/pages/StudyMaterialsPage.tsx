import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Play, Download, Filter, BookOpen } from 'lucide-react';
import AnimatedCheckbox from '../components/ui/AnimatedCheckbox';
import AnimatedInput from '../components/ui/AnimatedInput';

const mockMaterials = [
  { id: 1, title: 'The Road Not Taken - Deep Analytical Breakdown', type: 'PDF', category: 'Poetry', class: 'Class 9', size: '2.4 MB', featured: true },
  { id: 2, title: 'Tenses Revision Guide', type: 'Video', category: 'Grammar', class: 'Class 10', duration: '15 mins', featured: false },
  { id: 3, title: 'Beehive: Chapter 1 Summary', type: 'PDF', category: 'Prose', class: 'Class 9', size: '1.8 MB', featured: false },
  { id: 4, title: 'Analytical Paragraph Masterclass', type: 'Video', category: 'Writing', class: 'Class 10', duration: '22 mins', featured: true },
  { id: 5, title: 'First Flight: Core Board Questions', type: 'PDF', category: 'Prose', class: 'Class 10', size: '3.1 MB', featured: false },
  { id: 6, title: 'Figures of Speech Demystified', type: 'Video', category: 'Poetry', class: 'Class 9', duration: '18 mins', featured: false },
  { id: 7, title: 'Grammar Worksheets Vol 1', type: 'PDF', category: 'Grammar', class: 'Class 9', size: '1.2 MB', featured: false },
];

export default function StudyMaterialsPage() {
  const [activeClasses, setActiveClasses] = useState<string[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleClass = useCallback((cls: string) => {
    setActiveClasses(prev => 
      prev.includes(cls) ? prev.filter(c => c !== cls) : [...prev, cls]
    );
  }, []);

  const toggleCategory = useCallback((cat: string) => {
    setActiveCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }, []);

  const filteredMaterials = useMemo(() => {
    return mockMaterials.filter(m => 
      (activeClasses.length === 0 || activeClasses.includes(m.class)) &&
      (activeCategories.length === 0 || activeCategories.includes(m.category)) &&
      (m.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [activeClasses, activeCategories, searchQuery]);

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#050505] bg-noise relative overflow-hidden">
      
      {/* Deep Atmospheric Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{
        background: 'radial-gradient(circle at top left, rgba(0, 166, 153, 0.08), transparent 50%), radial-gradient(circle at bottom right, rgba(255, 90, 95, 0.05), transparent 50%)'
      }} />

      <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-10 relative z-10">
        
        {/* Sidebar Filters - Editorial Style */}
        <div className="w-full xl:w-80 flex-shrink-0">
          <div className="glass-panel rounded-[2rem] p-8 sticky top-28">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-full bg-[#00A699]/20 flex items-center justify-center border border-[#00A699]/30">
                <Filter className="text-[#00A699]" size={20} />
              </div>
              <h3 className="text-2xl font-bold text-white font-['Cinzel'] tracking-wide">Archives</h3>
            </div>

            {/* Class Filter */}
            <div className="mb-10">
              <h4 className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-6">Academic Level</h4>
              <div className="flex flex-col gap-4 pl-2">
                {['Class 9', 'Class 10'].map(cls => (
                  <AnimatedCheckbox 
                    key={cls}
                    id={`class-${cls}`}
                    label={cls}
                    checked={activeClasses.includes(cls)}
                    onChange={() => toggleClass(cls)}
                  />
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold text-[#FF5A5F] uppercase tracking-widest mb-6">Subject Matter</h4>
              <div className="flex flex-col gap-4 pl-2">
                {['Poetry', 'Prose', 'Grammar', 'Writing'].map(cat => (
                  <AnimatedCheckbox 
                    key={cat}
                    id={`category-${cat}`}
                    label={cat}
                    checked={activeCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Bento Box */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end mb-12">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white font-['Cinzel'] mb-4 leading-none tracking-tight">
                Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A699] to-[#34d399]">Repository</span>
              </h1>
              <p className="text-zinc-400 font-['Playfair_Display'] text-lg italic border-l-2 border-[#00A699]/30 pl-4">Curated materials for academic excellence.</p>
            </div>
            
            <div className="flex-1 w-full relative z-10">
              <AnimatedInput 
                label="Search the archives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[250px]">
            <AnimatePresence mode="popLayout">
              {filteredMaterials.map((material, idx) => {
                const isFeatured = material.featured && idx < 2; // Only feature top items
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    key={material.id}
                    className={`glass-panel rounded-3xl p-8 border hover:border-white/30 transition-all duration-500 hover:-translate-y-2 flex flex-col group relative overflow-hidden ${
                      isFeatured ? 'md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1'
                    }`}
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    {/* Atmospheric Glow inside Card */}
                    {isFeatured && (
                       <div className={`absolute -right-20 -bottom-20 w-64 h-64 blur-[80px] rounded-full pointer-events-none transition-colors duration-700 ${material.type === 'PDF' ? 'bg-[#FF5A5F]/10 group-hover:bg-[#FF5A5F]/20' : 'bg-[#00A699]/10 group-hover:bg-[#00A699]/20'}`} />
                    )}

                    <div className="flex items-start justify-between mb-auto relative z-10">
                      <div className={`p-4 rounded-2xl flex items-center justify-center backdrop-blur-md border ${
                        material.type === 'PDF' 
                          ? 'bg-[#FF5A5F]/10 text-[#FF5A5F] border-[#FF5A5F]/20' 
                          : 'bg-[#FC642D]/10 text-[#FC642D] border-[#FC642D]/20'
                      }`}>
                        {material.type === 'PDF' ? <FileText size={isFeatured ? 32 : 24} /> : <Play size={isFeatured ? 32 : 24} />}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="px-3 py-1 bg-black/50 border border-white/10 rounded-full text-xs font-bold text-zinc-300 tracking-wider uppercase">
                          {material.class}
                        </span>
                        <span className="text-xs font-['Playfair_Display'] text-zinc-500 italic">{material.category}</span>
                      </div>
                    </div>
                    
                    <div className="relative z-10 mt-6">
                      <h3 className={`font-bold text-white mb-3 font-['Cinzel'] leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${material.type === 'PDF' ? 'group-hover:from-[#FF5A5F] group-hover:to-[#ff999c]' : 'group-hover:from-[#FC642D] group-hover:to-[#ffb299]'} transition-all ${isFeatured ? 'text-3xl md:text-4xl max-w-md' : 'text-xl line-clamp-2'}`}>
                        {material.title}
                      </h3>
                      
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-sm text-zinc-400 font-['Playfair_Display'] flex items-center gap-2">
                          <BookOpen size={14} className="text-zinc-500" />
                          {material.type === 'PDF' ? material.size : material.duration}
                        </span>

                        {material.type === 'PDF' ? (
                          <button 
                            aria-label={`Download ${material.title} PDF`}
                            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10"
                          >
                            <Download size={16} />
                          </button>
                        ) : (
                          <button 
                            aria-label={`Play ${material.title} Video`}
                            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10"
                          >
                            <Play size={16} className="ml-1" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredMaterials.length === 0 && (
              <div className="col-span-full py-32 text-center glass-panel rounded-[2rem]">
                <FileText className="mx-auto text-zinc-600 mb-6" size={64} />
                <h3 className="text-2xl font-bold text-white mb-3 font-['Cinzel']">The Archives are Empty</h3>
                <p className="text-zinc-400 font-['Playfair_Display'] text-lg">No manuscripts found matching your criteria.</p>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
