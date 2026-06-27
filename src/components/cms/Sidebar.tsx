import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Video, Palette, Users, Settings, LogOut } from 'lucide-react';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';

export default function Sidebar() {
  const { logout } = useFirebaseAuth();

  const handleLogout = () => {
    logout();
  };

  const links = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/cms' },
    { name: 'Curriculum Builder', icon: <BookOpen size={20} />, path: '/cms/curriculum' },
    { name: 'Broadcast Studio', icon: <Video size={20} />, path: '/cms/broadcast' },
    { name: 'Students', icon: <Users size={20} />, path: '/cms/students' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/cms/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-[#0a0a0a] border-r border-white/10 p-6 flex flex-col fixed left-0 top-0">
      <div className="mb-12">
        <h2 className="text-2xl font-bold font-['Cinzel'] text-white">Educator CMS</h2>
        <p className="text-xs text-[#FC642D] uppercase tracking-widest mt-1 font-bold">Secure Portal</p>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/cms'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                isActive
                  ? 'bg-[#FC642D]/20 text-[#FC642D] shadow-[0_0_15px_rgba(252,100,45,0.15)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 mt-auto text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-semibold text-sm"
      >
        <LogOut size={20} />
        Sign Out
      </button>
    </div>
  );
}
