
import React from 'react';
import { motion } from 'framer-motion';
import ScheduleManager from '@/components/dashboard/ScheduleManager';
import RecentProgress from '@/components/dashboard/RecentProgress';
import DocumentUploader from '@/components/dashboard/documents/DocumentUploader';

interface LeftSectionProps {
  studentName: string;
  studentId: string;
  itemVariants: any;
  isMobile: boolean;
}

const LeftSection: React.FC<LeftSectionProps> = ({
  studentName,
  studentId,
  itemVariants,
  isMobile
}) => {
  return (
    <motion.div 
      className={isMobile ? "order-2" : ""}
      variants={itemVariants}
    >
      <ScheduleManager studentName={studentName} />
      <motion.div 
        variants={itemVariants}
        transition={{ delay: 0.2 }}
      >
        <RecentProgress />
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        transition={{ delay: 0.3 }}
        className="mt-4 md:mt-6"
      >
        <DocumentUploader studentId={studentId} />
      </motion.div>
    </motion.div>
  );
};

export default LeftSection;
