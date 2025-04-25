
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import ParentLogin from "./pages/ParentLogin";
import StudentLogin from "./pages/StudentLogin";
import BetaConfirmed from "./pages/BetaConfirmed";
import BetaRegistration from "./pages/BetaRegistration";
import BetaConfirmation from "./pages/BetaConfirmation";
import DemoV2 from "./pages/DemoV2";
import ParentDashboard from "./pages/ParentDashboard";
import PasswordProtection from "./components/PasswordProtection";

const queryClient = new QueryClient();

// You can change this password to anything you want
const SITE_PASSWORD = "tobey2025";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PasswordProtection password={SITE_PASSWORD}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/parent-login" element={<ParentLogin />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/demo-v2" element={<DemoV2 />} />
            <Route path="/demo-v3" element={<DemoV3 />} />
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/beta-confirmed" element={<BetaConfirmed />} />
            <Route path="/beta-registration" element={<BetaRegistration />} />
            <Route path="/beta-confirmation" element={<BetaConfirmation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PasswordProtection>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
