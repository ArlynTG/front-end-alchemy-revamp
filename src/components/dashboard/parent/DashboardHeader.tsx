
import React from 'react';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  return (
    <motion.h1 
      className="text-2xl md:text-3xl font-bold mb-3 md:mb-6"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {title}
    </motion.h1>
  );
};

export default DashboardHeader;
