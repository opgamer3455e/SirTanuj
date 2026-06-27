import { useState, useEffect } from 'react';
import { Video, Copy, Play, CheckCircle2, Trash2, Radio, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';

interface LiveClassEntry {
  _id: string;
  title: string;
  description: string;
  roomId: string;
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED';
  scheduledFor: string;
  teacherName: string;
  createdAt: string;
}

export default function BroadcastStudio() {
  const [roomId, setRoomId] = useState('');
  const [classTitle, setClassTitle] = useState('');
  const [classDescription, setClassDescription] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [classes, setClasses] = useState<LiveClassEntry[]>([]);
  const navigate = useNavigate();
  const { secureFetch } = useFirebaseAuth();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await secureFetch('/api/live-classes');
      if (res.ok) {
        const data = await res.json();
        setClasses(data);
      }
    } catch (err) {
      console.error('Failed to fetch classes:', err);
    }
  };

  const generateRoom = () => {
    const newRoomId = 'class-' + Math.random().toString(36).substring(2, 10);
    setRoomId(newRoomId);
    setIsCopied(false);
  };

  const saveAndGoLive = async () => {
    if (!classTitle.trim()) {
      alert('Please enter a class title.');
      return;
    }

    setIsSaving(true);
    try {
      const res = await secureFetch('/api/live-classes', {
        method: 'POST',
        body: JSON.stringify({
          title: classTitle,
          description: classDescription,
          roomId,
          scheduledFor: new Date().toISOString()
        })
      });

      if (res.ok) {
        const created = await res.json();
        // Mark it as LIVE immediately
        await secureFetch(`/api/live-classes/${created._id}/status`, {
          method: 'PATCH',
          body: JSON.stringify({ status: 'LIVE' })
        });
        navigate(`/live/${roomId}`);
      }
    } catch (err) {
      console.error('Failed to create class:', err);
      alert('Failed to create class. Are you logged in as a teacher?');
    } finally {
      setIsSaving(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await secureFetch(`/api/live-classes/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      fetchClasses();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteClass = async (id: string) => {
    try {
      await secureFetch(`/api/live-classes/${id}`, { method: 'DELETE' });
      fetchClasses();
    } catch (err) {
      console.error(err);
    }
  };

  const copyInviteLink = () => {
    const link = `${window.location.origin}/live/${roomId}`;
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const statusColors: Record<string, string> = {
    LIVE: 'bg-red-500/10 text-red-500 border-red-500/20',
    SCHEDULED: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    COMPLETED: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  };

  const statusIcons: Record<string, React.ReactNode> = {
    LIVE: <Radio size={12} className="animate-pulse" />,
    SCHEDULED: <Clock size={12} />,
    COMPLETED: <CheckCircle2 size={12} />,
  };

  return (
    <>
      <header className="mb-10">
        <h1 className="text-4xl font-bold font-['Cinzel'] flex items-center gap-3">
          Broadcast Studio
          <span className="px-3 py-1 bg-red-500/10 text-red-500 text-xs tracking-widest rounded-full border border-red-500/20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            SECURE WEBRTC
          </span>
        </h1>
        <p className="text-zinc-400 mt-2">Create, schedule, and launch encrypted classroom sessions. All meetings are saved to the database.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Stream Creation Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FC642D] to-red-600" />

          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Video className="text-[#FC642D]" />
            New Broadcast
          </h2>

          <div className="space-y-6">
            {!roomId ? (
              <div className="py-8 text-center border-2 border-dashed border-white/10 rounded-xl bg-black/20">
                <p className="text-zinc-500 mb-4">No active sessions.</p>
                <button
                  onClick={generateRoom}
                  className="px-6 py-3 bg-[#FC642D] hover:bg-[#ff7544] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(252,100,45,0.3)] transition-all"
                >
                  Generate Secure Room
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <p className="text-emerald-400 text-sm font-bold flex items-center gap-2 mb-1">
                    <CheckCircle2 size={16} /> Room Generated Successfully
                  </p>
                  <p className="text-emerald-500/60 text-xs">Fill in details below and go live.</p>
                </div>

                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2 block">Class Title *</label>
                  <input
                    type="text"
                    value={classTitle}
                    onChange={(e) => setClassTitle(e.target.value)}
                    placeholder="e.g. Julius Caesar Act III Discussion"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC642D] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2 block">Description (optional)</label>
                  <textarea
                    value={classDescription}
                    onChange={(e) => setClassDescription(e.target.value)}
                    placeholder="Brief description of the session..."
                    rows={2}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC642D] transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2 block">Room ID</label>
                  <input
                    type="text"
                    readOnly
                    value={roomId}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:outline-none opacity-60"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2 block">Student Invite Link</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`${window.location.origin}/live/${roomId}`}
                      className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none opacity-50"
                    />
                    <button
                      onClick={copyInviteLink}
                      className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center gap-2"
                    >
                      {isCopied ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={saveAndGoLive}
                    disabled={isSaving}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Play size={18} />
                    {isSaving ? 'Saving...' : 'Save & Go Live'}
                  </button>
                  <button
                    onClick={() => { setRoomId(''); setClassTitle(''); setClassDescription(''); }}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Meeting History Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="text-blue-400" />
              Meeting History
            </h2>
            <span className="text-xs text-zinc-500">{classes.length} sessions</span>
          </div>

          <div className="max-h-[500px] overflow-y-auto divide-y divide-white/5">
            {classes.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 text-sm">
                No sessions created yet. Generate your first room above!
              </div>
            ) : (
              classes.map((cls) => (
                <div key={cls._id} className="p-4 hover:bg-white/5 transition-colors group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-sm text-white truncate">{cls.title}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[cls.status]}`}>
                          {statusIcons[cls.status]} {cls.status}
                        </span>
                      </div>
                      {cls.description && (
                        <p className="text-xs text-zinc-500 truncate mb-1">{cls.description}</p>
                      )}
                      <p className="text-xs text-zinc-600 font-mono">
                        {new Date(cls.scheduledFor).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        {' · '}
                        <span className="text-zinc-500">{cls.roomId}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-3">
                      {cls.status === 'SCHEDULED' && (
                        <button
                          onClick={() => { updateStatus(cls._id, 'LIVE'); navigate(`/live/${cls.roomId}`); }}
                          className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                          title="Go Live"
                        >
                          <Radio size={14} />
                        </button>
                      )}
                      {cls.status === 'LIVE' && (
                        <button
                          onClick={() => updateStatus(cls._id, 'COMPLETED')}
                          className="p-2 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors"
                          title="End Class"
                        >
                          <CheckCircle2 size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteClass(cls._id)}
                        className="p-2 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
