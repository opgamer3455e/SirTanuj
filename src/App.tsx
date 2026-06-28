import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider } from './context/AuthContext';
import LoadScreen from './components/ui/LoadScreen';
import PublicLayout from './components/PublicLayout';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const JuliusCaesarGuide = lazy(() => import('./pages/JuliusCaesarGuide'));
const ResourceLibrary = lazy(() => import('./pages/ResourceLibrary'));
const ResourceCommunityPage = lazy(() => import('./pages/ResourceCommunityPage'));

// New Pages
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const LiveClassesPage = lazy(() => import('./pages/LiveClassesPage'));
const StudyMaterialsPage = lazy(() => import('./pages/StudyMaterialsPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const ParentPortal = lazy(() => import('./pages/ParentPortal'));
const LoginSuccessPage = lazy(() => import('./pages/LoginSuccessPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const LiveClassroom = lazy(() => import('./pages/LiveClassroom'));

const AuthGuard = lazy(() => import('./components/cms/AuthGuard'));
const CMSLayout = lazy(() => import('./components/cms/CMSLayout'));
const TeacherDashboard = lazy(() => import('./pages/cms/TeacherDashboard'));
const BroadcastStudio = lazy(() => import('./pages/cms/BroadcastStudio'));
const StudentsPage = lazy(() => import('./pages/cms/StudentsPage'));
const SettingsPage = lazy(() => import('./pages/cms/SettingsPage'));
const StudyMaterialsManager = lazy(() => import('./pages/cms/StudyMaterialsManager'));

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      {/* Public Routes with Navbar/Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/julius-caesar" element={<JuliusCaesarGuide />} />
        <Route path="/resources" element={<ResourceLibrary />} />
        <Route path="/community" element={<ResourceCommunityPage />} />
        
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/live-classes" element={<LiveClassesPage />} />
        <Route path="/live/:roomId?" element={<LiveClassroom />} />
        <Route path="/study-materials" element={<StudyMaterialsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/parent-portal" element={<ParentPortal />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login-success" element={<LoginSuccessPage />} />
      </Route>

      {/* Protected CMS Routes with Sidebar */}
      <Route element={<AuthGuard requiredRole="TEACHER" />}>
        <Route element={<CMSLayout />}>
          <Route path="/cms" element={<TeacherDashboard />} />
          <Route path="/cms/curriculum" element={<TeacherDashboard />} />
          <Route path="/cms/broadcast" element={<BroadcastStudio />} />
          <Route path="/cms/students" element={<StudentsPage />} />
          <Route path="/cms/materials" element={<StudyMaterialsManager />} />
          <Route path="/cms/settings" element={<SettingsPage />} />
        </Route>
      </Route>
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
      <AuthProvider>
        <AnimatePresence mode="wait">
          {initialLoading ? (
            <LoadScreen key="initial-loading" />
          ) : (
            <Suspense fallback={<div className="w-full h-screen bg-[#0a0014]" />}>
              <AppRoutes />
            </Suspense>
          )}
        </AnimatePresence>
      </AuthProvider>
    </Router>
  );
}

export default App;
