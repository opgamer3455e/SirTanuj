import { useState, useEffect } from 'react';
import { Plus, GripVertical, Calendar, Clock, Trash2, Settings2, FileVideo, FileText, HelpCircle, Loader2, Save, PlusCircle, Eye, EyeOff, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

interface Lesson {
  _id?: string;
  title: string;
  type: 'VIDEO' | 'PDF' | 'QUIZ';
  contentUrl: string;
  duration?: number;
}

interface Module {
  _id?: string;
  title: string;
  order: number;
  lessons: Lesson[];
  unlockDate?: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  modules: Module[];
  isPublished: boolean;
  themeColor: string;
}

export default function TeacherDashboard() {
  const { secureFetch } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // New course form
  const [showNewCourse, setShowNewCourse] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await secureFetch('/api/curriculum/courses');
      const data = await res.json();
      setCourses(data);
      if (data.length > 0 && !selectedCourseId) {
        setSelectedCourseId(data[0]._id);
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedCourse = courses.find(c => c._id === selectedCourseId);

  const createCourse = async () => {
    if (!newTitle.trim() || !newDesc.trim()) return;
    setSaving(true);
    try {
      const res = await secureFetch('/api/curriculum/courses', {
        method: 'POST',
        body: JSON.stringify({
          title: newTitle,
          description: newDesc,
          modules: [],
          isPublished: false
        })
      });
      const created = await res.json();
      setCourses([...courses, created]);
      setSelectedCourseId(created._id);
      setNewTitle('');
      setNewDesc('');
      setShowNewCourse(false);
      setStatusMsg('Course created!');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (err) {
      setStatusMsg('Failed to create course');
    } finally {
      setSaving(false);
    }
  };

  const saveCourse = async () => {
    if (!selectedCourse) return;
    setSaving(true);
    try {
      const res = await secureFetch(`/api/curriculum/courses/${selectedCourse._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: selectedCourse.title,
          description: selectedCourse.description,
          modules: selectedCourse.modules,
          isPublished: selectedCourse.isPublished
        })
      });
      const updated = await res.json();
      setCourses(courses.map(c => c._id === updated._id ? updated : c));
      setStatusMsg('Saved successfully!');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (err) {
      setStatusMsg('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = () => {
    if (!selectedCourse) return;
    updateCourseField('isPublished', !selectedCourse.isPublished);
  };

  const updateCourseField = (field: string, value: any) => {
    setCourses(courses.map(c => 
      c._id === selectedCourseId ? { ...c, [field]: value } : c
    ));
  };

  const addModule = () => {
    if (!selectedCourse) return;
    const newModule: Module = {
      title: 'New Module',
      order: selectedCourse.modules.length + 1,
      lessons: [],
    };
    updateCourseField('modules', [...selectedCourse.modules, newModule]);
  };

  const deleteModule = (mIndex: number) => {
    if (!selectedCourse) return;
    updateCourseField('modules', selectedCourse.modules.filter((_, i) => i !== mIndex));
  };

  const addLesson = (mIndex: number, type: 'VIDEO' | 'PDF' | 'QUIZ') => {
    if (!selectedCourse) return;
    const newModules = [...selectedCourse.modules];
    newModules[mIndex] = {
      ...newModules[mIndex],
      lessons: [...newModules[mIndex].lessons, {
        title: `New ${type}`,
        type,
        contentUrl: '',
        duration: type === 'VIDEO' ? 10 : undefined
      }]
    };
    updateCourseField('modules', newModules);
  };

  const updateModuleTitle = (mIndex: number, title: string) => {
    const newModules = [...(selectedCourse?.modules || [])];
    newModules[mIndex] = { ...newModules[mIndex], title };
    updateCourseField('modules', newModules);
  };

  const updateLessonField = (mIndex: number, lIndex: number, field: string, value: any) => {
    const newModules = [...(selectedCourse?.modules || [])];
    const newLessons = [...newModules[mIndex].lessons];
    newLessons[lIndex] = { ...newLessons[lIndex], [field]: value };
    newModules[mIndex] = { ...newModules[mIndex], lessons: newLessons };
    updateCourseField('modules', newModules);
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
          <h1 className="text-4xl font-bold font-['Cinzel']">Curriculum Builder</h1>
          <p className="text-zinc-400 mt-2">Create courses, add modules & lessons, and publish for students.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewCourse(true)}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl border border-white/10 transition-all flex items-center gap-2"
          >
            <PlusCircle size={16} /> New Course
          </button>
        </div>
      </header>

      {/* Status Message */}
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

      {/* New Course Modal */}
      <AnimatePresence>
        {showNewCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewCourse(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-white font-['Cinzel'] mb-6">Create New Course</h2>
              <input
                type="text"
                placeholder="Course Title"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white mb-4 focus:outline-none focus:border-[#FC642D]"
              />
              <textarea
                placeholder="Course Description"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                rows={3}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white mb-6 focus:outline-none focus:border-[#FC642D] resize-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNewCourse(false)}
                  className="flex-1 py-2.5 bg-white/5 text-zinc-400 rounded-xl font-bold transition-colors hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={createCourse}
                  disabled={saving || !newTitle.trim()}
                  className="flex-1 py-2.5 bg-[#FC642D] text-white rounded-xl font-bold transition-all hover:bg-[#ff7544] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  Create
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Course Selector Tabs */}
      {courses.length > 0 && (
        <div className="flex gap-2 mb-8 flex-wrap">
          {courses.map(course => (
            <button
              key={course._id}
              onClick={() => setSelectedCourseId(course._id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedCourseId === course._id
                  ? 'bg-[#FC642D]/20 text-[#FC642D] border border-[#FC642D]/30'
                  : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              {course.title}
              {course.isPublished && <span className="ml-2 text-[10px] text-[#00A699]">● LIVE</span>}
            </button>
          ))}
        </div>
      )}

      {/* No courses state */}
      {courses.length === 0 && (
        <div className="text-center py-20 glass-panel rounded-3xl">
          <BookOpen className="w-16 h-16 text-zinc-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white font-['Cinzel'] mb-3">No Courses Yet</h3>
          <p className="text-zinc-500 mb-6">Create your first course to start building curriculum.</p>
          <button
            onClick={() => setShowNewCourse(true)}
            className="px-6 py-3 bg-[#FC642D] text-white font-bold rounded-xl hover:bg-[#ff7544] transition-all"
          >
            Create First Course
          </button>
        </div>
      )}

      {/* Course Editor */}
      {selectedCourse && (
        <>
          {/* Course Header */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={selectedCourse.title}
                onChange={e => updateCourseField('title', e.target.value)}
                className="bg-transparent text-2xl font-bold focus:outline-none focus:border-b border-[#FC642D] w-full text-white font-['Cinzel']"
              />
              <input
                type="text"
                value={selectedCourse.description}
                onChange={e => updateCourseField('description', e.target.value)}
                className="bg-transparent text-sm text-zinc-400 focus:outline-none focus:border-b border-[#FC642D] w-full mt-2"
                placeholder="Course description..."
              />
            </div>
            <button
              onClick={togglePublish}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                selectedCourse.isPublished
                  ? 'bg-[#00A699]/20 text-[#00A699] border border-[#00A699]/30'
                  : 'bg-zinc-800 text-zinc-400 border border-white/10'
              }`}
            >
              {selectedCourse.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
              {selectedCourse.isPublished ? 'Published' : 'Draft'}
            </button>
          </div>

          {/* Modules */}
          <div className="space-y-8">
            {selectedCourse.modules.map((mod, mIndex) => (
              <motion.div 
                key={mIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Module Header */}
                <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center group">
                  <div className="flex items-center gap-4 flex-1">
                    <GripVertical className="text-zinc-600 cursor-grab active:cursor-grabbing" />
                    <input 
                      type="text" 
                      value={mod.title} 
                      onChange={e => updateModuleTitle(mIndex, e.target.value)}
                      className="bg-transparent text-xl font-bold focus:outline-none focus:border-b border-[#FC642D] w-full"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                      <Calendar size={14} />
                      <input type="date" className="bg-transparent focus:outline-none" title="Drip Unlock Date" />
                    </div>
                    <button 
                      onClick={() => deleteModule(mIndex)}
                      className="text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Lessons List */}
                <div className="p-6 space-y-3">
                  {mod.lessons.map((lesson, lIndex) => (
                    <div key={lIndex} className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-white/5 hover:border-white/10 transition-all group">
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
                          value={lesson.title}
                          onChange={e => updateLessonField(mIndex, lIndex, 'title', e.target.value)}
                          className="bg-transparent text-sm font-semibold w-full focus:outline-none"
                        />
                      </div>

                      <input
                        type="text"
                        value={lesson.contentUrl}
                        onChange={e => updateLessonField(mIndex, lIndex, 'contentUrl', e.target.value)}
                        placeholder="Content URL..."
                        className="bg-black/30 text-xs text-zinc-400 px-3 py-1.5 rounded-lg border border-white/5 w-48 focus:outline-none focus:border-[#FC642D]"
                      />

                      {lesson.type === 'VIDEO' && (
                        <div className="flex items-center gap-1 text-xs text-zinc-500">
                          <Clock size={12} /> {lesson.duration}m
                        </div>
                      )}

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-zinc-400 hover:text-white bg-white/5 rounded-md" title="Settings">
                          <Settings2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add Lesson Controls */}
                  <div className="pt-4 flex gap-2">
                    <button onClick={() => addLesson(mIndex, 'VIDEO')} className="text-xs px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-md font-bold transition-colors border border-blue-500/20">
                      + Video Lesson
                    </button>
                    <button onClick={() => addLesson(mIndex, 'PDF')} className="text-xs px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md font-bold transition-colors border border-red-500/20">
                      + PDF Material
                    </button>
                    <button onClick={() => addLesson(mIndex, 'QUIZ')} className="text-xs px-3 py-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-md font-bold transition-colors border border-emerald-500/20">
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
              onClick={saveCourse}
              disabled={saving}
              className="px-8 py-3 bg-[#FC642D] hover:bg-[#ff7544] disabled:opacity-50 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(252,100,45,0.4)] transition-all flex items-center gap-2"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? 'Saving...' : 'Save Curriculum Changes'}
            </button>
          </div>
        </>
      )}
    </>
  );
}
