import { useState, useEffect } from 'react';
import { Plus, GripVertical, Calendar, Clock, Trash2, Settings2, FileVideo, FileText, HelpCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';

export default function TeacherDashboard() {
  useFirebaseAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [modules, setModules] = useState([
    {
      id: 'm1',
      title: 'Module 1: Foundations',
      unlockDate: '',
      lessons: [
        { id: 'l1', title: 'Introduction to Course', type: 'VIDEO', duration: 15 },
        { id: 'l2', title: 'Course Syllabus & Guidelines', type: 'PDF' },
      ]
    }
  ]);

  useEffect(() => {
    // In a real app, we'd fetch the specific course modules here
    // secureFetch('/api/curriculum/courses').then(res => res.json()).then(console.log);
  }, []);

  const addModule = () => {
    setModules([...modules, { id: `m${Date.now()}`, title: 'New Module', unlockDate: '', lessons: [] }]);
  };

  const addLesson = (moduleId: string, type: 'VIDEO' | 'PDF' | 'QUIZ') => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [...m.lessons, { id: `l${Date.now()}`, title: `New ${type}`, type, duration: type === 'VIDEO' ? 10 : undefined }]
        };
      }
      return m;
    }));
  };

  const saveCurriculum = async () => {
    setIsSaving(true);
    try {
      // Example of saving to our secure backend
      // await secureFetch('/api/curriculum/courses/courseId123', {
      //   method: 'PUT',
      //   body: JSON.stringify({ modules })
      // });
      await new Promise(r => setTimeout(r, 1000)); // simulate network delay
      alert("Curriculum Saved Successfully to Secure Database");
    } catch (err) {
      alert("Failed to save. Session may be expired.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <header className="mb-10">
        <h1 className="text-4xl font-bold font-['Cinzel']">Curriculum Builder</h1>
        <p className="text-zinc-400 mt-2">Design your course structure with extreme customization. Set prerequisites, drip content by date, and securely attach media.</p>
      </header>

      <div className="space-y-8">
        {modules.map((mod, mIndex) => (
          <motion.div 
            key={mod.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Module Header */}
            <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center group">
              <div className="flex items-center gap-4 flex-1">
                <GripVertical className="text-zinc-600 cursor-grab active:cursor-grabbing" />
                <div className="flex-1">
                  <input 
                    type="text" 
                    value={mod.title} 
                    onChange={(e) => {
                      const newMods = [...modules];
                      newMods[mIndex].title = e.target.value;
                      setModules(newMods);
                    }}
                    className="bg-transparent text-xl font-bold focus:outline-none focus:border-b border-[#FC642D] w-full"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-zinc-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                  <Calendar size={14} />
                  <input 
                    type="date" 
                    className="bg-transparent focus:outline-none" 
                    title="Drip Unlock Date"
                  />
                </div>
                <button className="text-zinc-500 hover:text-red-400 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Lessons List */}
            <div className="p-6 space-y-3">
              {mod.lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-white/5 hover:border-white/10 transition-all group">
                  <GripVertical className="text-zinc-700 cursor-grab" size={16} />
                  
                  <div className={`p-2 rounded-lg ${
                    lesson.type === 'VIDEO' ? 'bg-blue-500/10 text-blue-400' : 
                    lesson.type === 'PDF' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {lesson.type === 'VIDEO' && <FileVideo size={16} />}
                    {lesson.type === 'PDF' && <FileText size={16} />}
                    {lesson.type === 'QUIZ' && <HelpCircle size={16} />}
                  </div>

                  <div className="flex-1">
                     <input 
                       type="text"
                       defaultValue={lesson.title}
                       className="bg-transparent text-sm font-semibold w-full focus:outline-none"
                     />
                  </div>

                  {lesson.type === 'VIDEO' && (
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                      <Clock size={12} /> {lesson.duration}m
                    </div>
                  )}

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    <button className="p-1.5 text-zinc-400 hover:text-white bg-white/5 rounded-md" title="Settings (Prerequisites, Secure URL)">
                      <Settings2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Lesson Controls */}
              <div className="pt-4 flex gap-2">
                <button onClick={() => addLesson(mod.id, 'VIDEO')} className="text-xs px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-md font-bold transition-colors border border-blue-500/20">
                  + Video Lesson
                </button>
                <button onClick={() => addLesson(mod.id, 'PDF')} className="text-xs px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md font-bold transition-colors border border-red-500/20">
                  + PDF Material
                </button>
                <button onClick={() => addLesson(mod.id, 'QUIZ')} className="text-xs px-3 py-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-md font-bold transition-colors border border-emerald-500/20">
                  + Interactive Quiz
                </button>
              </div>
            </div>

          </motion.div>
        ))}
        
        <button 
          onClick={addModule}
          className="w-full py-6 border-2 border-dashed border-white/10 hover:border-[#FC642D]/50 rounded-2xl flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-[#FC642D] transition-colors bg-white/5 hover:bg-[#FC642D]/5"
        >
          <Plus size={24} />
          <span className="font-bold">Add New Module</span>
        </button>
      </div>

      <div className="mt-12 flex justify-end">
        <button 
          onClick={saveCurriculum}
          disabled={isSaving}
          className="px-8 py-3 bg-[#FC642D] hover:bg-[#ff7544] disabled:opacity-50 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(252,100,45,0.4)] transition-all flex items-center gap-2"
        >
          {isSaving && <Loader2 size={18} className="animate-spin" />}
          {isSaving ? 'Saving...' : 'Save Curriculum Changes'}
        </button>
      </div>
    </>
  );
}
