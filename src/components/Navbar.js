import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const Navbar = memo(function Navbar() {
    return (_jsx(motion.div, { className: "navbar-wrapper", initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, children: _jsxs("nav", { className: "navbar", children: [_jsxs(Link, { to: "/", className: "brand-link", children: [_jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "12", cy: "12", r: "10", fill: "black" }), _jsx("path", { d: "M15 12L9 16V8L15 12Z", fill: "white" })] }), _jsx("span", { className: "brand-text", children: "Skolla" })] }), _jsxs("div", { className: "nav-links", children: [_jsx(Link, { to: "/julius-caesar", className: "nav-item", children: "Experience" }), _jsx(Link, { to: "/resources", className: "nav-item", children: "Teachers" }), _jsx(Link, { to: "/", className: "nav-item", children: "Plans" }), _jsx(Link, { to: "/", className: "nav-item", children: "FAQ" })] }), _jsx("div", { className: "nav-actions", children: _jsx("button", { className: "btn btn-primary", style: { padding: '0.4rem 1rem', fontSize: '0.8rem' }, children: "Get Started" }) })] }) }));
});
export default Navbar;
