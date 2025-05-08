
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import StudentStats from "@/components/dashboard/StudentStats";
import AchievementBadges from "@/components/dashboard/AchievementBadges";
import ScheduleManager from "@/components/dashboard/ScheduleManager";
import NotificationSettings from "@/components/dashboard/NotificationSettings";
import ChatSection from "@/components/dashboard/ChatSection";
import RecentProgress from "@/components/dashboard/RecentProgress";
import { useIsMobile } from "@/hooks/use-mobile";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

const ParentDashboard = () => {
  // Sample data - in a real app, this would come from an API
  const studentData = {
    name: "Alex Johnson",
    totalLessons: 24,
    averageSessionDuration: 45, // minutes
    longTermPlan: "Improve reading comprehension, writing speed, and executive functioning skills by the end of the semester"
  };

  const isMobile = useIsMobile();

  // Badge data with different levels for various skills - using the old names that will be mapped in the component
  const skillBadges = [
    { name: "Accuracy", level: "Gold" },
    { name: "Creativity", level: "Silver" },
    { name: "Math Skills", level: "Platinum" },
    { name: "Executive Functioning", level: "Bronze" },
    { name: "Self Advocacy", level: "Diamond" },
    { name: "Writing", level: "Gold" },
    { name: "Phonics", level: "Silver" },
    { name: "Speed", level: "Bronze" },
    { name: "Attendance", level: "Platinum" },
    { name: "Focus", level: "Diamond" },
    { name: "Reading", level: "Gold" },
    { name: "Problem Solving", level: "Gold" },
  ];
  
  // Add an effect to log when the component mounts
  useEffect(() => {
    console.log("ParentDashboard component mounted");
  }, []);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <motion.div 
        className="container py-4 md:py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-2xl md:text-3xl font-bold mb-3 md:mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Parent Dashboard
        </motion.h1>
        
        {/* Red Banner - fixing styles to ensure it appears with the red background */}
        <div className="w-full bg-[#ea384c] rounded-lg p-4 mb-4 md:mb-8">
          <p className="text-center text-white font-medium text-lg md:text-xl">
            SNEAK PEAK: This is a preview of the Parent Dashboard available to Beta subscribers, June 2025
          </p>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Student Stats Section */}
          <motion.div variants={itemVariants}>
            <StudentStats studentData={studentData} />
          </motion.div>
          
          {/* Achievement Badges Section */}
          <motion.div variants={itemVariants}>
            <AchievementBadges skillBadges={skillBadges} />
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            {/* Left Section - Schedule Manager */}
            <motion.div 
              className={isMobile ? "order-2" : ""}
              variants={itemVariants}
            >
              <ScheduleManager studentName={studentData.name} />
              <motion.div 
                variants={itemVariants}
                transition={{ delay: 0.2 }}
              >
                <RecentProgress />
              </motion.div>
            </motion.div>
            
            {/* Right Section - Notifications and Chat */}
            <motion.div 
              className={`space-y-4 md:space-y-6 ${isMobile ? "order-1" : ""}`}
              variants={itemVariants}
            >
              <NotificationSettings />
              <motion.div 
                className="h-[350px] md:h-[400px]"
                variants={itemVariants}
                transition={{ delay: 0.3 }}
              >
                <ChatSection />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ParentDashboard;
