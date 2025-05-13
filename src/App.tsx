
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

// Optimized imports using React.lazy for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const ParentLogin = lazy(() => import("./pages/ParentLogin"));
const StudentLogin = lazy(() => import("./pages/StudentLogin"));
const BetaConfirmed = lazy(() => import("./pages/BetaConfirmed"));
const BetaRegistration = lazy(() => import("./pages/BetaRegistration"));
const BetaConfirmation = lazy(() => import("./pages/BetaConfirmation"));
const DemoV5 = lazy(() => import("./pages/DemoV5"));
// Removed the ParentDashboard import
const ParentDashboardV2 = lazy(() => import("./pages/ParentDashboardV2"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const AccountManagement = lazy(() => import("./pages/AccountManagement"));
const Onboarding = lazy(() => import("./pages/Onboarding"));

// Create a reusable loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-tobey-orange"></div>
  </div>
);

// Router observer to fix navigation issues
const RouterObserver = () => {
  const location = useLocation();
  
  // Log route changes to help debug navigation
  useEffect(() => {
    console.log("Navigation to:", location.pathname);
  }, [location]);
  
  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute stale time for better cache performance
      retry: 1, // Limit retries to reduce network load on failure
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouterObserver />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/parent-login" element={<ParentLogin />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/demo-v5" element={<DemoV5 />} />
            {/* Removed the /parent-dashboard route */}
            <Route path="/beta-confirmed" element={<BetaConfirmed />} />
            <Route path="/beta-registration" element={<BetaRegistration />} />
            <Route path="/beta-confirmation" element={<BetaConfirmation />} />
            <Route path="/parent-dashboard-v2" element={<ParentDashboardV2 />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/account-management" element={<AccountManagement />} />
            <Route path="/onboarding" element={<Onboarding />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
