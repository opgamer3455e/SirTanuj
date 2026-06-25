import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = memo(function Navbar() {
  return (
    <motion.div 
      className="navbar-wrapper"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ top: 0, position: 'fixed', width: '100%', left: 0, right: 0, padding: 0 }}
    >
      <nav 
        className="navbar"
        style={{ 
          background: '#ffffff', 
          borderRadius: 0, 
          maxWidth: '100%', 
          padding: '1.5rem 3rem',
          boxShadow: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#6b21a8' }} />
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ color: '#000', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <Link to="/" style={{ color: '#000', textDecoration: 'none', fontWeight: 600 }}>About</Link>
          <Link to="/" style={{ color: '#000', textDecoration: 'none', fontWeight: 600 }}>Contact</Link>
        </div>
      </nav>
    </motion.div>
  );
});

export default Navbar;
