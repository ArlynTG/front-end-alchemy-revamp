
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";

// Optimized imports using React.lazy for code splitting
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-tobey-orange"></div>
  </div>
);

// Router observer to fix navigation issues
const RouterObserver = () => {
  const location = useLocation();
  
  // Log route changes to help debug navigation
  console.log("Navigation to:", location.pathname);
  
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
      <RouterObserver />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
