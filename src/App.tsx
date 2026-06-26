import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadScreen from './components/ui/LoadScreen';
import './App.css';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const JuliusCaesarGuide = lazy(() => import('./pages/JuliusCaesarGuide'));
const ResourceLibrary = lazy(() => import('./pages/ResourceLibrary'));
const ResourceCommunityPage = lazy(() => import('./pages/ResourceCommunityPage'));

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/julius-caesar" element={<JuliusCaesarGuide />} />
      <Route path="/resources" element={<ResourceLibrary />} />
      <Route path="/community" element={<ResourceCommunityPage />} />
    </Routes>
  );
}

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <AnimatePresence mode="wait">
            {initialLoading ? (
              <LoadScreen key="initial-loading" />
            ) : (
              <Suspense fallback={<div className="w-full h-screen bg-[#0a0014]" />}>
                <AppRoutes />
              </Suspense>
            )}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
