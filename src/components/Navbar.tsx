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
    >
      <nav className="navbar">
        <Link to="/" className="brand-link">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="black"/>
            <path d="M15 12L9 16V8L15 12Z" fill="white"/>
          </svg>
          <span className="brand-text">Skolla</span>
        </Link>
        <div className="nav-links">
          <Link to="/julius-caesar" className="nav-item">Experience</Link>
          <Link to="/resources" className="nav-item">Teachers</Link>
          <Link to="/" className="nav-item">Plans</Link>
          <Link to="/" className="nav-item">FAQ</Link>
        </div>
        <div className="nav-actions">
          <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
            Get Started
          </button>
        </div>
      </nav>
    </motion.div>
  );
});

export default Navbar;
