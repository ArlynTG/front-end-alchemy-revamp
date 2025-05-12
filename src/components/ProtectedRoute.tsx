
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isLoggedIn,
}) => {
  const location = useLocation();
  
  // Check for test mode
  const isTestMode = localStorage.getItem('testMode') === 'true';

  useEffect(() => {
    if (!isLoggedIn && !isTestMode) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page.",
        variant: "destructive"
      });
    }
  }, [isLoggedIn, isTestMode]);

  if (!isLoggedIn && !isTestMode) {
    // Preserve the attempted URL to redirect back after login
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};
