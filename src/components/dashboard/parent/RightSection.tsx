
import React from 'react';
import { motion } from 'framer-motion';
import NotificationSettings from '@/components/dashboard/NotificationSettings';
import ChatSection from '@/components/dashboard/ChatSection';

interface RightSectionProps {
  itemVariants: any;
  isMobile: boolean;
}

const RightSection: React.FC<RightSectionProps> = ({
  itemVariants,
  isMobile
}) => {
  return (
    <motion.div 
      className={`space-y-4 md:space-y-6 ${isMobile ? "order-1" : ""}`}
      variants={itemVariants}
    >
      <NotificationSettings />
      <motion.div 
        className="h-[550px] md:h-[600px]" // Further increased height for better chat visibility
        variants={itemVariants}
        transition={{ delay: 0.3 }}
      >
        <ChatSection />
      </motion.div>
    </motion.div>
  );
};

export default RightSection;
