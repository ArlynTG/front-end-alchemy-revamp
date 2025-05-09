
import React from 'react';
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
