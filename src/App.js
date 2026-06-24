import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/ui/LoadingScreen';
import './App.css';
const LandingPage = lazy(() => import('./pages/LandingPage'));
const JuliusCaesarGuide = lazy(() => import('./pages/JuliusCaesarGuide'));
const ResourceLibrary = lazy(() => import('./pages/ResourceLibrary'));
function AppRoutes() {
    const location = useLocation();
    return (_jsxs(Routes, { location: location, children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/julius-caesar", element: _jsx(JuliusCaesarGuide, {}) }), _jsx(Route, { path: "/resources", element: _jsx(ResourceLibrary, {}) })] }, location.pathname));
}
function App() {
    const [initialLoading, setInitialLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);
    return (_jsx(Router, { children: _jsxs("div", { className: "app-layout", children: [_jsx(Navbar, {}), _jsx("main", { className: "main-content", children: _jsx(AnimatePresence, { mode: "wait", children: initialLoading ? (_jsx(LoadingScreen, {}, "initial-loading")) : (_jsx(Suspense, { fallback: _jsx(LoadingScreen, {}, "suspense-loading"), children: _jsx(AppRoutes, {}) })) }) }), _jsx(Footer, {})] }) }));
}
export default App;
