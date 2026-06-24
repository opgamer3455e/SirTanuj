import { memo } from 'react';

const Footer = memo(function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Nexus Edu. Developed for ICSE Excellence.</p>
    </footer>
  );
});

export default Footer;
