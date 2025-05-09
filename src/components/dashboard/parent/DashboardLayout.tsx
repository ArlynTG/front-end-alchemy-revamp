
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

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
    >
      {children}
    </motion.div>
  );
};

export default DashboardLayout;
