
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container py-4 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-6">Parent Dashboard</h1>
        
        {/* Red Banner - replacing welcome text */}
        <Alert className="bg-[#ea384c] border-none text-white font-medium mb-4 md:mb-8 w-full">
          <AlertDescription className="text-center text-lg md:text-xl">
            SNEAK PEAK: This is a preview of the Parent Dashboard available to Beta subscribers, June 2025
          </AlertDescription>
        </Alert>
        
        {/* Student Stats Section */}
        <StudentStats studentData={studentData} />
        
        {/* Achievement Badges Section */}
        <AchievementBadges skillBadges={skillBadges} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {/* Left Section - Schedule Manager */}
          <div className={isMobile ? "order-2" : ""}>
            <ScheduleManager studentName={studentData.name} />
            <RecentProgress />
          </div>
          
          {/* Right Section - Notifications and Chat */}
          <div className={`space-y-4 md:space-y-6 ${isMobile ? "order-1" : ""}`}>
            <NotificationSettings />
            <div className="h-[350px] md:h-[400px]">
              <ChatSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
