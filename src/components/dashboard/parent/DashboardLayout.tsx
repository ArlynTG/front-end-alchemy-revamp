
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  containerVariants: any;
  itemVariants: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  containerVariants, 
  itemVariants 
}) => {
  // Log when the dashboard layout mounts to help with debugging
  useEffect(() => {
    console.log("DashboardLayout component mounted");
    return () => {
      console.log("DashboardLayout component unmounted");
    };
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[400px]" // Add minimum height to prevent layout shifts
    >
      {children}
    </motion.div>
  );
};

export default DashboardLayout;
