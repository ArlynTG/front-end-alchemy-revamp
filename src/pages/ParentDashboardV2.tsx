
import React from "react";
import Navbar from "@/components/Navbar";
import StudentStats from "@/components/dashboard/StudentStats";
import AchievementBadges from "@/components/dashboard/AchievementBadges";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import DashboardHeader from "@/components/dashboard/parent/DashboardHeader";
import TestingBanner from "@/components/dashboard/parent/TestingBanner";
import SupabaseStatus from "@/components/dashboard/parent/SupabaseStatus";
import DashboardLayout from "@/components/dashboard/parent/DashboardLayout";
import LeftSection from "@/components/dashboard/parent/LeftSection";
import RightSection from "@/components/dashboard/parent/RightSection";
import { useStudentData } from "@/hooks/useStudentData";

const ParentDashboardV2 = () => {
  const STUDENT_ID = "c5732622-1580-4b3a-ba6a-57501d1636a8";
  const { studentData, isLoading, supabaseError } = useStudentData(STUDENT_ID);
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
        <DashboardHeader title="Parent Dashboard V2 (Supabase Testing)" />
        <TestingBanner />
        <SupabaseStatus isLoading={isLoading} supabaseError={supabaseError} />
        
        <DashboardLayout 
          containerVariants={containerVariants} 
          itemVariants={itemVariants}
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
            {/* Left Section */}
            <LeftSection 
              studentName={studentData.name} 
              studentId={STUDENT_ID}
              itemVariants={itemVariants}
              isMobile={isMobile}
            />
            
            {/* Right Section */}
            <RightSection 
              itemVariants={itemVariants}
              isMobile={isMobile}
            />
          </div>
        </DashboardLayout>
      </motion.div>
    </div>
  );
};

export default ParentDashboardV2;
