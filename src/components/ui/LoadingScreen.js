import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export default function LoadingScreen() {
    return (_jsx(motion.div, { className: "loading-screen", initial: { y: 0 }, exit: { y: '-100%' }, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }, style: {
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
        }, children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.4, ease: 'easeOut' }, style: { color: '#fff', fontSize: '2.5rem', fontFamily: '"Instrument Sans", sans-serif', fontWeight: 600, letterSpacing: '-0.02em' }, children: _jsx("span", { style: { display: 'inline-block', overflow: 'hidden' }, children: _jsx(motion.span, { initial: { y: '100%' }, animate: { y: 0 }, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }, style: { display: 'inline-block' }, children: "Nexus" }) }) }) }));
}
