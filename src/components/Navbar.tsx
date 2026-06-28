import { memo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, LayoutDashboard } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'Live', path: '/live-classes' },
  { name: 'Materials', path: '/study-materials' },
  { name: 'Dashboard', path: '/dashboard' },
];

const Navbar = memo(function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { appUser, isLoading, logout } = useAuth();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleAvatarClick = () => {
    if (appUser) {
      if (appUser.role === 'TEACHER' || appUser.role === 'ADMIN') {
        navigate('/cms');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <motion.div 
      className="navbar-wrapper z-50 fixed w-full top-0 px-4 flex flex-col items-center justify-center pointer-events-none"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full pointer-events-auto">
        <nav 
          className="w-full px-4 md:px-6 py-3.5 bg-black/50 backdrop-blur-md rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 flex justify-between items-center transition-all duration-300"
        >
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#FC642D] flex items-center justify-center text-white font-bold text-sm font-['Cinzel'] shadow-[0_0_15px_rgba(255,90,95,0.4)]">
                N
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div 
            className="hidden lg:flex items-center gap-1.5 relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-300 z-10 rounded-full ${
                    isActive ? 'text-[#FF5A5F]' : 'text-zinc-300 hover:text-white'
                  }`}
                  onMouseEnter={() => setHoveredIndex(idx)}
                >
                  {hoveredIndex === idx && (
                    <motion.span
                      layoutId="navbar-hover-highlight"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}

            {/* Auth Button / User Avatar */}
            {isLoading ? (
              <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse ml-2" />
            ) : appUser ? (
              <div className="relative ml-2">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00A699] to-[#34d399] flex items-center justify-center text-white font-bold text-xs font-['Cinzel'] shadow-[0_0_12px_rgba(0,166,153,0.4)] hover:scale-110 transition-transform cursor-pointer border-2 border-white/20"
                  title={appUser.name}
                >
                  {getInitials(appUser.name)}
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-56 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-white/10">
                        <p className="text-white font-bold font-['Cinzel'] text-sm truncate">{appUser.name}</p>
                        <p className="text-zinc-500 text-xs truncate mt-0.5">{appUser.email}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 bg-[#FC642D]/20 text-[#FC642D] text-[10px] font-bold uppercase rounded-full tracking-wider">
                          {appUser.role}
                        </span>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => { handleAvatarClick(); setShowUserMenu(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <LayoutDashboard size={16} />
                          {appUser.role === 'TEACHER' || appUser.role === 'ADMIN' ? 'Teacher CMS' : 'My Dashboard'}
                        </button>
                        <button
                          onClick={() => { navigate('/dashboard'); setShowUserMenu(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <User size={16} />
                          Student View
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="whitespace-nowrap px-5 py-2 bg-[#FF5A5F] hover:bg-[#FC642D] text-white font-bold text-xs tracking-wider uppercase rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,90,95,0.3)] hover:scale-105 active:scale-95 ml-2"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex lg:!hidden items-center justify-center p-2 rounded-full hover:bg-white/5 text-zinc-300 hover:text-white focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.line
                x1="4"
                y1="6"
                x2="20"
                y2="6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{ 
                  y: isOpen ? 6 : 0, 
                  rotate: isOpen ? 45 : 0 
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "center" }}
              />
              <motion.line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{ 
                  opacity: isOpen ? 0 : 1 
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.line
                x1="4"
                y1="18"
                x2="20"
                y2="18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{ 
                  y: isOpen ? -6 : 0, 
                  rotate: isOpen ? -45 : 0 
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "center" }}
              />
            </svg>
          </button>
        </nav>

        {/* Mobile Dropdown Menu Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 mt-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-40 flex flex-col lg:!hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3, ease: "easeOut" }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`block py-2 text-lg font-bold tracking-wide transition-colors ${
                          isActive ? 'text-[#FF5A5F]' : 'text-zinc-300 hover:text-white'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Auth */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3, ease: "easeOut" }}
                  className="pt-4 border-t border-white/10"
                >
                  {appUser ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00A699] to-[#34d399] flex items-center justify-center text-white font-bold text-sm">
                          {getInitials(appUser.name)}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{appUser.name}</p>
                          <p className="text-zinc-500 text-xs">{appUser.role}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { handleAvatarClick(); setIsOpen(false); }}
                        className="block w-full text-center py-3 bg-[#00A699]/20 text-[#00A699] font-bold tracking-wider uppercase rounded-xl transition-all"
                      >
                        {appUser.role === 'TEACHER' ? 'Teacher CMS' : 'My Dashboard'}
                      </button>
                      <button
                        onClick={() => { handleLogout(); setIsOpen(false); }}
                        className="block w-full text-center py-3 bg-red-500/10 text-red-400 font-bold tracking-wider uppercase rounded-xl transition-all"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center py-3 bg-[#FF5A5F] hover:bg-[#FC642D] text-white font-bold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(255,90,95,0.3)]"
                    >
                      Sign In
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

export default Navbar;
