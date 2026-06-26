import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = memo(function Navbar() {
  return (
    <motion.div 
      className="navbar-wrapper flex justify-center z-50 fixed w-full top-6 px-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav 
        className="navbar"
        style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '9999px', 
          width: '100%',
          maxWidth: '600px', 
          padding: '1rem 2rem',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#FF5A5F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{color: '#fff', fontWeight: 'bold', fontSize: '14px'}}>TS</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', letterSpacing: '0.5px' }} className="hover:text-[#FF5A5F] transition-colors">Home</Link>
          <Link to="/courses" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', letterSpacing: '0.5px' }} className="hover:text-[#FF5A5F] transition-colors">Courses</Link>
          <Link to="/live-classes" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', letterSpacing: '0.5px' }} className="hover:text-[#FF5A5F] transition-colors">Live</Link>
          <Link to="/study-materials" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', letterSpacing: '0.5px' }} className="hover:text-[#FF5A5F] transition-colors">Materials</Link>
          <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', letterSpacing: '0.5px' }} className="hover:text-[#FF5A5F] transition-colors">Dashboard</Link>
        </div>
      </nav>
    </motion.div>
  );
});

export default Navbar;
