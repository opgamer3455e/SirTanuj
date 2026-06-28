import { useState, useEffect } from 'react';
import { Plus, Trash2, FileText, Play, Loader2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

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

export default function StudyMaterialsManager() {
  const { secureFetch } = useAuth();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'PDF' | 'Video'>('PDF');
  const [category, setCategory] = useState('Grammar');
  const [classLevel, setClassLevel] = useState('Class 10');
  const [fileUrl, setFileUrl] = useState('');
  const [size, setSize] = useState('');
  const [duration, setDuration] = useState('');
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await secureFetch('/api/study-materials');
      const data = await res.json();
      setMaterials(data);
    } catch (err) {
      console.error('Failed to fetch materials:', err);
    } finally {
      setLoading(false);
    }
  };

  const addMaterial = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      const res = await secureFetch('/api/study-materials', {
        method: 'POST',
        body: JSON.stringify({ title, type, category, classLevel, fileUrl, size, duration, featured })
      });
      const created = await res.json();
      setMaterials([created, ...materials]);
      resetForm();
      setShowForm(false);
      setStatusMsg('Material added!');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (err) {
      setStatusMsg('Failed to add material');
    } finally {
      setSaving(false);
    }
  };

  const deleteMaterial = async (id: string) => {
    try {
      await secureFetch(`/api/study-materials/${id}`, { method: 'DELETE' });
      setMaterials(materials.filter(m => m._id !== id));
      setStatusMsg('Material deleted');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (err) {
      setStatusMsg('Failed to delete');
    }
  };

  const resetForm = () => {
    setTitle('');
    setType('PDF');
    setCategory('Grammar');
    setClassLevel('Class 10');
    setFileUrl('');
    setSize('');
    setDuration('');
    setFeatured(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-10 h-10 text-[#FC642D] animate-spin" />
      </div>
    );
  }

  return (
    <>
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-['Cinzel']">Study Materials</h1>
          <p className="text-zinc-400 mt-2">Upload and manage PDFs, video links, and resources for your students.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-[#FC642D] hover:bg-[#ff7544] text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2"
        >
          <Plus size={16} /> Add Material
        </button>
      </header>

      {/* Status */}
      <AnimatePresence>
        {statusMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 px-4 py-3 bg-[#00A699]/20 text-[#00A699] rounded-xl font-bold text-sm border border-[#00A699]/30"
          >
            {statusMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Material Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-white font-['Cinzel'] mb-6">Add Study Material</h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title (e.g. Tenses Revision Guide)"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC642D]"
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as 'PDF' | 'Video')}
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC642D]"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Video">Video</option>
                  </select>

                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC642D]"
                  >
                    <option>Grammar</option>
                    <option>Poetry</option>
                    <option>Prose</option>
                    <option>Writing</option>
                    <option>Literature</option>
                    <option>Other</option>
                  </select>
                </div>

                <select
                  value={classLevel}
                  onChange={e => setClassLevel(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC642D]"
                >
                  <option>Class 9</option>
                  <option>Class 10</option>
                  <option>Class 11</option>
                  <option>Class 12</option>
                </select>

                <input
                  type="text"
                  placeholder="File URL (Google Drive, YouTube, etc.)"
                  value={fileUrl}
                  onChange={e => setFileUrl(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC642D]"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={type === 'PDF' ? 'Size (e.g. 2.4 MB)' : 'Duration (e.g. 15 mins)'}
                    value={type === 'PDF' ? size : duration}
                    onChange={e => type === 'PDF' ? setSize(e.target.value) : setDuration(e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC642D]"
                  />
                  
                  <label className="flex items-center gap-3 cursor-pointer bg-black/50 border border-white/10 rounded-xl px-4 py-3">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={e => setFeatured(e.target.checked)}
                      className="accent-[#C9A84C]"
                    />
                    <span className="text-zinc-300 text-sm">Featured</span>
                    <Star size={14} className={featured ? 'text-[#C9A84C]' : 'text-zinc-600'} />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => { setShowForm(false); resetForm(); }}
                  className="flex-1 py-2.5 bg-white/5 text-zinc-400 rounded-xl font-bold transition-colors hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={addMaterial}
                  disabled={saving || !title.trim()}
                  className="flex-1 py-2.5 bg-[#FC642D] text-white rounded-xl font-bold transition-all hover:bg-[#ff7544] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  Add Material
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Materials List */}
      {materials.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-3xl">
          <FileText className="w-16 h-16 text-zinc-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white font-['Cinzel'] mb-3">No Materials Yet</h3>
          <p className="text-zinc-500 mb-6">Add your first study material for students to access.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {materials.map((material, idx) => (
            <motion.div
              key={material._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="bg-[#111] border border-white/10 rounded-xl p-5 flex items-center gap-4 group hover:border-white/20 transition-all"
            >
              <div className={`p-2.5 rounded-lg ${
                material.type === 'PDF' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
              }`}>
                {material.type === 'PDF' ? <FileText size={18} /> : <Play size={18} />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-sm truncate">{material.title}</h3>
                  {material.featured && (
                    <Star size={12} className="text-[#C9A84C] shrink-0" fill="#C9A84C" />
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                  <span>{material.category}</span>
                  <span>·</span>
                  <span>{material.classLevel}</span>
                  {material.size && <><span>·</span><span>{material.size}</span></>}
                  {material.duration && <><span>·</span><span>{material.duration}</span></>}
                </div>
              </div>

              {material.fileUrl && (
                <a
                  href={material.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-500 hover:text-[#00A699] transition-colors underline"
                >
                  View
                </a>
              )}

              <button
                onClick={() => deleteMaterial(material._id)}
                className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
