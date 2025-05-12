
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
import ParentDashboardV2 from './pages/ParentDashboardV2';
import Index from './pages/Index';
import AccountManagement from './pages/AccountManagement';

function App() {
  const { isLoggedIn, setIsLoggedIn, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsCheckingAuth(true);
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        setIsLoggedIn(true);
        setUser(session.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        
        // Only redirect away from protected routes, not from all routes
        const protectedRoutes = ['/onboarding', '/account', '/parent-dashboard', '/student-dashboard'];
        if (protectedRoutes.includes(location.pathname)) {
          navigate('/');
        }
      }
      
      setIsCheckingAuth(false);
    };

    checkAuthentication();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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

    return () => {
      subscription.unsubscribe();
    };
  }, [setIsLoggedIn, setUser, navigate, location.pathname]);

  // Show a temporary loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-tobey-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/onboarding" element={
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <Onboarding />
        </ProtectedRoute>
      } />
      <Route path="/account" element={
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <AccountManagement />
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
      <Route path="/parent-dashboard-v2" element={<ParentDashboardV2 />} />
    </Routes>
  );
}

export default App;
