import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Onboarding from './pages/Onboarding';
import ParentDashboard from './pages/ParentDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Registration from './pages/Registration';
import PasswordReset from './pages/PasswordReset';
import { useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { supabase } from './integrations/supabase/client';
import { Toast } from '@/components/ui/toast';
import ParentDashboardV2 from './pages/ParentDashboardV2';

function App() {
  const { isLoggedIn, setIsLoggedIn, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        setIsLoggedIn(true);
        setUser(session.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        // Redirect to home only if the user is not already there
        if (location.pathname !== '/') {
          navigate('/');
        }
      }
    };

    checkAuthentication();

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
        setUser(session?.user || null);
        setShowToast(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
      }
    });
  }, [setIsLoggedIn, setUser, navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/onboarding" element={
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <Onboarding />
        </ProtectedRoute>
      } />
      <Route path="/parent-dashboard" element={
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <ParentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/student-dashboard" element={
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/cookies" element={<CookiePolicy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/parent-dashboard" element={<ParentDashboard />} />
      <Route path="/parent-dashboard-v2" element={<ParentDashboardV2 />} />
    </Routes>
  );
}

export default App;
