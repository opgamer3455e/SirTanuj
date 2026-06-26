import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Play, Download, Search, Filter } from 'lucide-react';

const mockMaterials = [
  { id: 1, title: 'The Road Not Taken - Analysis', type: 'PDF', category: 'Poetry', class: 'Class 9', size: '2.4 MB' },
  { id: 2, title: 'Tenses Revision Guide', type: 'Video', category: 'Grammar', class: 'Class 10', duration: '15 mins' },
  { id: 3, title: 'Beehive: Chapter 1 Summary', type: 'PDF', category: 'Prose', class: 'Class 9', size: '1.8 MB' },
  { id: 4, title: 'Analytical Paragraph Writing', type: 'Video', category: 'Writing', class: 'Class 10', duration: '22 mins' },
  { id: 5, title: 'First Flight: Important Questions', type: 'PDF', category: 'Prose', class: 'Class 10', size: '3.1 MB' },
  { id: 6, title: 'Figures of Speech Explained', type: 'Video', category: 'Poetry', class: 'Class 9', duration: '18 mins' },
];

export default function StudyMaterialsPage() {
  const [activeClass, setActiveClass] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMaterials = mockMaterials.filter(m => 
    (activeClass === 'All' || m.class === activeClass) &&
    (activeCategory === 'All' || m.category === activeCategory) &&
    (m.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-[#121212] rounded-3xl p-6 border border-white/5 sticky top-28">
            <div className="flex items-center gap-2 mb-8">
              <Filter className="text-[#00A699]" size={20} />
              <h3 className="text-xl font-bold text-white font-['Bricolage_Grotesque']">Filters</h3>
            </div>

            {/* Class Filter */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">Class</h4>
              <div className="space-y-2">
                {['All', 'Class 9', 'Class 10'].map(cls => (
                  <label key={cls} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="class" 
                      checked={activeClass === cls}
                      onChange={() => setActiveClass(cls)}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${activeClass === cls ? 'bg-[#00A699] border-[#00A699]' : 'border-zinc-600 group-hover:border-zinc-400'}`}>
                      {activeClass === cls && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </div>
                    <span className={`text-sm transition-colors ${activeClass === cls ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>{cls}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">Topic</h4>
              <div className="space-y-2">
                {['All', 'Poetry', 'Prose', 'Grammar', 'Writing'].map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${activeCategory === cat ? 'bg-[#FF5A5F] border-[#FF5A5F]' : 'border-zinc-600 group-hover:border-zinc-400'}`}>
                      {activeCategory === cat && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </div>
                    <span className={`text-sm transition-colors ${activeCategory === cat ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white font-['Bricolage_Grotesque']">
              Study <span className="text-[#00A699]">Repository</span>
            </h1>
            
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121212] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#00A699] transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMaterials.map((material) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={material.id}
                  className="bg-[#121212] rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${material.type === 'PDF' ? 'bg-[#FF5A5F]/10 text-[#FF5A5F]' : 'bg-[#FC642D]/10 text-[#FC642D]'}`}>
                      {material.type === 'PDF' ? <FileText size={24} /> : <Play size={24} />}
                    </div>
                    <span className="px-2.5 py-1 bg-[#0A0A0A] border border-white/10 rounded-md text-xs font-semibold text-zinc-400">
                      {material.class}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{material.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6 flex-1">
                    <span>{material.category}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-600" />
                    <span>{material.type === 'PDF' ? material.size : material.duration}</span>
                  </div>

                  {material.type === 'PDF' ? (
                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2">
                      <Download size={16} /> Download PDF
                    </button>
                  ) : (
                    <button className="w-full py-3 bg-[#FC642D]/10 hover:bg-[#FC642D]/20 text-[#FC642D] text-sm font-semibold rounded-xl border border-[#FC642D]/20 transition-colors flex items-center justify-center gap-2">
                      <Play size={16} /> Watch Lesson
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredMaterials.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <FileText className="mx-auto text-zinc-700 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-white mb-2">No materials found</h3>
                <p className="text-zinc-500">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
