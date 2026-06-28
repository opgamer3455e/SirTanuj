import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Play, Filter, BookOpen, Loader2 } from 'lucide-react';
import AnimatedCheckbox from '../components/ui/AnimatedCheckbox';
import AnimatedInput from '../components/ui/AnimatedInput';
import AnimatedDownloadButton from '../components/ui/AnimatedDownloadButton';
import { API_BASE_URL } from '@/config';

interface Material {
  _id: string;
  title: string;
  type: 'PDF' | 'Video';
  category: string;
  classLevel: string;
  fileUrl: string;
  size: string;
  duration: string;
  featured: boolean;
}

export default function StudyMaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeClasses, setActiveClasses] = useState<string[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/study-materials`);
        if (res.ok) {
          const data = await res.json();
          setMaterials(data);
        }
      } catch (err) {
        console.error('Failed to fetch materials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

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

  const allClasses = useMemo(() => [...new Set(materials.map(m => m.classLevel))], [materials]);
  const allCategories = useMemo(() => [...new Set(materials.map(m => m.category))], [materials]);

  const filteredMaterials = useMemo(() => {
    return materials.filter(m => 
      (activeClasses.length === 0 || activeClasses.includes(m.classLevel)) &&
      (activeCategories.length === 0 || activeCategories.includes(m.category)) &&
      (m.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [materials, activeClasses, activeCategories, searchQuery]);

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#050505] bg-noise relative overflow-hidden">
      
      {/* Deep Atmospheric Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{
        background: 'radial-gradient(circle at top left, rgba(0, 166, 153, 0.08), transparent 50%), radial-gradient(circle at bottom right, rgba(255, 90, 95, 0.05), transparent 50%)'
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white font-['Cinzel'] mb-4">Study Materials</h1>
          <p className="text-zinc-400 font-['Playfair_Display'] text-lg max-w-xl border-l-2 border-[#00A699]/30 pl-4">
            Access curated resources uploaded by your teacher — PDFs, video lessons, and more.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-[#FC642D] animate-spin" />
          </div>
        ) : materials.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel p-16 rounded-3xl text-center max-w-lg mx-auto"
          >
            <BookOpen className="w-16 h-16 text-zinc-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white font-['Cinzel'] mb-3">No Materials Yet</h3>
            <p className="text-zinc-500 font-['Playfair_Display']">Your teacher hasn't uploaded any study materials yet. Check back soon!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Filters Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1 space-y-8"
            >
              <div className="glass-panel p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <Filter size={18} className="text-[#FC642D]" />
                  <h3 className="text-white font-['Cinzel'] font-bold">Filters</h3>
                </div>

                <div className="mb-6">
                  <AnimatedInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    label="Search materials..."
                  />
                </div>

                {allClasses.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-zinc-400 text-xs uppercase tracking-widest font-bold mb-3">Class Level</h4>
                    <div className="space-y-2">
                      {allClasses.map(cls => (
                        <AnimatedCheckbox
                          key={cls}
                          id={`class-${cls.replace(/\s+/g, '-')}`}
                          checked={activeClasses.includes(cls)}
                          onChange={() => toggleClass(cls)}
                          label={cls}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {allCategories.length > 0 && (
                  <div>
                    <h4 className="text-zinc-400 text-xs uppercase tracking-widest font-bold mb-3">Category</h4>
                    <div className="space-y-2">
                      {allCategories.map(cat => (
                        <AnimatedCheckbox
                          key={cat}
                          id={`cat-${cat.replace(/\s+/g, '-')}`}
                          checked={activeCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          label={cat}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Materials Grid */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredMaterials.map((material, idx) => (
                    <motion.div
                      key={material._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`glass-panel p-6 rounded-2xl group hover:border-white/20 transition-all relative overflow-hidden ${
                        material.featured ? 'border-[#C9A84C]/30 shadow-[0_0_30px_rgba(201,168,76,0.1)]' : ''
                      }`}
                    >
                      {material.featured && (
                        <div className="absolute top-4 right-4 px-2 py-0.5 bg-[#C9A84C]/20 text-[#C9A84C] text-[10px] font-bold uppercase rounded-full tracking-wider">
                          Featured
                        </div>
                      )}

                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-xl ${
                          material.type === 'PDF' 
                            ? 'bg-red-500/10 text-red-400' 
                            : 'bg-blue-500/10 text-blue-400'
                        }`}>
                          {material.type === 'PDF' ? <FileText size={20} /> : <Play size={20} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-bold font-['Cinzel'] text-sm leading-snug mb-1 group-hover:text-[#00A699] transition-colors">{material.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-zinc-500 font-['Playfair_Display']">
                            <span>{material.category}</span>
                            <span>·</span>
                            <span>{material.classLevel}</span>
                            {material.type === 'Video' && material.duration && (
                              <>
                                <span>·</span>
                                <span>{material.duration}</span>
                              </>
                            )}
                            {material.type === 'PDF' && material.size && (
                              <>
                                <span>·</span>
                                <span>{material.size}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {material.fileUrl ? (
                        <AnimatedDownloadButton href={material.fileUrl} />
                      ) : (
                        <div className="text-xs text-zinc-600 font-['Playfair_Display'] italic">No file attached</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>

              {filteredMaterials.length === 0 && materials.length > 0 && (
                <div className="text-center py-16">
                  <p className="text-zinc-500 font-['Playfair_Display'] text-lg">No materials match your filters.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
