
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import StudentStats from "@/components/dashboard/StudentStats";
import AchievementBadges from "@/components/dashboard/AchievementBadges";
import ScheduleManager from "@/components/dashboard/ScheduleManager";
import NotificationSettings from "@/components/dashboard/NotificationSettings";
import ChatSection from "@/components/dashboard/ChatSection";
import RecentProgress from "@/components/dashboard/RecentProgress";
import UploadFiles from "@/components/dashboard/UploadFiles";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ParentDashboardV2 = () => {
  const [studentData, setStudentData] = useState({
    name: "Alex Johnson",
    totalLessons: 24,
    averageSessionDuration: 45, // minutes
    longTermPlan: "Improve reading comprehension, writing speed, and executive functioning skills by the end of the semester"
  });

  const [isLoading, setIsLoading] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  
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

  // Fetch data for the specific UUID from Supabase
  const fetchStudentFromSupabase = async () => {
    setIsLoading(true);
    setSupabaseError(null);

    try {
      // Get registration data for the specified UUID
      const { data, error } = await supabase
        .from('beta_registrations')
        .select('*')
        .eq('id', 'c5732622-1580-4b3a-ba6a-57501d1636a8')
        .single();

      if (error) {
        console.error("Error fetching student data:", error);
        setSupabaseError(error.message);
        toast({
          title: "Error fetching data",
          description: error.message,
          variant: "destructive"
        });
      } else if (data) {
        console.log("Retrieved student data:", data);
        
        // Update student data with values from Supabase
        setStudentData(prevData => ({
          ...prevData,
          name: data.student_name || `${data.first_name} ${data.last_name}`,
          // Keep existing values for totalLessons and averageSessionDuration
          longTermPlan: data.goals_summary || prevData.longTermPlan
        }));
        
        toast({
          title: "Connection successful",
          description: "Successfully retrieved data from Supabase",
          variant: "default"
        });
      }
    } catch (err) {
      console.error("Exception during fetch:", err);
      setSupabaseError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add an effect to fetch data when the component mounts
  useEffect(() => {
    console.log("ParentDashboardV2 component mounted");
    fetchStudentFromSupabase();
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
          Parent Dashboard V2 (Supabase Testing)
        </motion.h1>
        
        {/* Testing Banner */}
        <div className="w-full bg-blue-600 rounded-lg p-4 mb-4 md:mb-8">
          <p className="text-center text-white font-medium text-lg md:text-xl">
            TESTING VERSION: For Supabase integration testing only
          </p>
        </div>
        
        {/* Supabase Connection Status */}
        <motion.div 
          className={`w-full rounded-lg p-4 mb-4 md:mb-6 ${supabaseError ? 'bg-red-100' : 'bg-green-100'}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <p className="text-center font-medium">
            {isLoading ? (
              "Loading data from Supabase..."
            ) : supabaseError ? (
              `Supabase Error: ${supabaseError}`
            ) : (
              `Connected to Supabase for UUID: c5732622-1580-4b3a-ba6a-57501d1636a8`
            )}
          </p>
        </motion.div>
        
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
              
              {/* Add Upload Files component */}
              <motion.div 
                variants={itemVariants}
                transition={{ delay: 0.3 }}
                className="mt-4 md:mt-6"
              >
                <UploadFiles studentId="c5732622-1580-4b3a-ba6a-57501d1636a8" />
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

export default ParentDashboardV2;
