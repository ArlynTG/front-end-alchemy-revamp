
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// PasswordProtection import removed

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
const ParentDashboard = lazy(() => import("./pages/ParentDashboard"));

// Create a reusable loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-tobey-orange"></div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute stale time for better cache performance
      retry: 1, // Limit retries to reduce network load on failure
    },
  },
});

// Password protection removed from the app

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* PasswordProtection component removed here */}
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/parent-login" element={<ParentLogin />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/demo-v5" element={<DemoV5 />} />
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/beta-confirmed" element={<BetaConfirmed />} />
            <Route path="/beta-registration" element={<BetaRegistration />} />
            <Route path="/beta-confirmation" element={<BetaConfirmation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
