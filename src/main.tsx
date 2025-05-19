
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'sonner'
import { HelmetProvider } from 'react-helmet-async'

// Import pages
import SignupTest from './pages/SignupTest.tsx'
import Onboarding from './pages/Onboarding.tsx'
import Index from './pages/Index.tsx'
import NotFound from './pages/NotFound.tsx'
import PrivacyPolicy from './pages/PrivacyPolicy.tsx'
import TermsOfService from './pages/TermsOfService.tsx'
import CookiePolicy from './pages/CookiePolicy.tsx'
import ParentLogin from './pages/ParentLogin.tsx'
import StudentLogin from './pages/StudentLogin.tsx'
import BetaConfirmed from './pages/BetaConfirmed.tsx'
import BetaRegistration from './pages/BetaRegistration.tsx'
import BetaConfirmation from './pages/BetaConfirmation.tsx'
import DemoV5 from './pages/DemoV5.tsx'
import ParentDashboardV2 from './pages/ParentDashboardV2.tsx'
import ParentDashboardV3B from './pages/ParentDashboardV3B.tsx'
import StudentDashboard from './pages/StudentDashboard.tsx'
import AccountManagement from './pages/AccountManagement.tsx'
import HeroTest from './pages/HeroTest.tsx'
import OnboardingSuccess from './pages/OnboardingSuccess.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Index />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/parent-login" element={<ParentLogin />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/demo-v5" element={<DemoV5 />} />
      <Route path="/beta-confirmed" element={<BetaConfirmed />} />
      <Route path="/beta-registration" element={<BetaRegistration />} />
      <Route path="/beta-confirmation" element={<BetaConfirmation />} />
      <Route path="/parent-dashboard-v2" element={<ParentDashboardV2 />} />
      <Route path="/parent-dashboard-v3B" element={<ParentDashboardV3B />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/account-management" element={<AccountManagement />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/onboarding/success" element={<OnboardingSuccess />} />
      <Route path="/herotest" element={<HeroTest />} />
      <Route path="/signup-test" element={<SignupTest />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
      <Toaster />
    </HelmetProvider>
  </React.StrictMode>,
)
