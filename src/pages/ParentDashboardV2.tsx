
import React, { useState, useEffect } from "react";
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
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

const ParentDashboardV2 = () => {
  // Updated to the new student ID
  const STUDENT_ID = "310e6d9d-d937-421f-8168-752fcb242881";
  const { studentData, isLoading, supabaseError } = useStudentData(STUDENT_ID);
  const isMobile = useIsMobile();
  const [isPageReady, setIsPageReady] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Console logs to help debug navigation issues
  useEffect(() => {
    console.log("ParentDashboardV2 component mounted");
    console.log("Current path:", location.pathname);
    
    // Prevent any automatic redirects
    return () => {
      console.log("ParentDashboardV2 component unmounted");
    };
  }, [location.pathname]);

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

  // Add a timer to ensure the page is ready after initial load
  useEffect(() => {
    // Small delay to ensure components mount properly
    const timer = setTimeout(() => {
      setIsPageReady(true);
      console.log("Dashboard page marked as ready");
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Add an error boundary fallback
  if (!isPageReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-tobey-orange"></div>
      </div>
    );
  }

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
