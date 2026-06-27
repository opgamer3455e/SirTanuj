import React, { useState } from 'react';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { Save, Lock, Shield, User, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { appUser } = useFirebaseAuth();
  const [name, setName] = useState(appUser?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock save delay
    setTimeout(() => {
      setIsSaving(false);
      setMessage('Settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  return (
    <>
      <header className="mb-10">
        <h1 className="text-4xl font-bold font-['Cinzel'] flex items-center gap-3">
          CMS Settings
        </h1>
        <p className="text-zinc-400 mt-2">Manage your administrative profile and security preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Settings Navigation (Static for layout) */}
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#FC642D]/10 text-[#FC642D] border border-[#FC642D]/20 rounded-xl font-bold transition-all text-left">
            <User size={18} /> Profile Details
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl transition-all text-left">
            <Lock size={18} /> Security & Passwords
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl transition-all text-left">
            <Shield size={18} /> Access Control
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl transition-all text-left">
            <Bell size={18} /> Notifications
          </button>
        </div>

        {/* Main Settings Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Profile Information</h2>
          
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2 block">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC642D] transition-colors"
                />
              </div>
              
              <div>
                <label className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2 block">Email Address (Read-only)</label>
                <input 
                  type="email" 
                  readOnly
                  value={appUser?.email || ''}
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-zinc-500 cursor-not-allowed focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2 block">Administrator Role</label>
              <div className="px-4 py-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl font-mono text-sm inline-flex items-center gap-2">
                <Shield size={16} /> {appUser?.role || 'TEACHER'}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <p className="text-sm text-emerald-400 font-bold h-5">{message}</p>
              
              <button 
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-[#FC642D] hover:bg-[#ff7544] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(252,100,45,0.3)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <><Save size={18} /> Save Changes</>
                )}
              </button>
            </div>
          </form>
        </motion.div>

      </div>
    </>
  );
}
