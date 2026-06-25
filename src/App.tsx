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

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/julius-caesar" element={<JuliusCaesarGuide />} />
      <Route path="/resources" element={<ResourceLibrary />} />
    </Routes>
  );
}

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);
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
              <Suspense fallback={<LoadScreen key="suspense-loading" />}>
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
