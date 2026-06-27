import { memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar } from './ui/Avatar';

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
  const location = useLocation();

  return (
    <motion.div 
      className="navbar-wrapper z-50 fixed w-full top-6 px-4 flex flex-col items-center justify-center pointer-events-none"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full max-w-[800px] pointer-events-auto">
        <nav 
          className="w-full px-4 md:px-6 py-3.5 bg-black/60 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 flex justify-between items-center transition-all duration-300"
        >
          {/* Logo / Avatar */}
          <div className="flex items-center">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center">
              <Avatar 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="User Avatar" 
                fallback="TS" 
              />
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
            <Link 
              to="/auth" 
              className="whitespace-nowrap px-5 py-2 bg-[#FF5A5F] hover:bg-[#FC642D] text-white font-bold text-xs tracking-wider uppercase rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,90,95,0.3)] hover:scale-105 active:scale-95 ml-2"
            >
              Sign In
            </Link>
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
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3, ease: "easeOut" }}
                  className="pt-4 border-t border-white/10"
                >
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 bg-[#FF5A5F] hover:bg-[#FC642D] text-white font-bold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(255,90,95,0.3)]"
                  >
                    Sign In
                  </Link>
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
