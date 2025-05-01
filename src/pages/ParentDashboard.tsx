
import React from "react";
import Navbar from "@/components/Navbar";
import StudentStats from "@/components/dashboard/StudentStats";
import AchievementBadges from "@/components/dashboard/AchievementBadges";
import ScheduleManager from "@/components/dashboard/ScheduleManager";
import NotificationSettings from "@/components/dashboard/NotificationSettings";
import ChatSection from "@/components/dashboard/ChatSection";

const ParentDashboard = () => {
  // Sample data - in a real app, this would come from an API
  const studentData = {
    name: "Alex Johnson",
    totalLessons: 24,
    averageSessionDuration: 45, // minutes
    longTermPlan: "Improve reading comprehension, writing speed, and executive functioning skills by the end of the semester"
  };

  // Badge data with different levels for various skills
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
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Parent Dashboard</h1>
        <p className="text-xl text-gray-700 mb-8">Welcome back! Here's how {studentData.name} is progressing</p>
        
        {/* Student Stats Section */}
        <StudentStats studentData={studentData} />
        
        {/* Achievement Badges Section */}
        <AchievementBadges skillBadges={skillBadges} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Schedule Manager */}
          <ScheduleManager studentName={studentData.name} />
          
          {/* Right Section - Notifications and Chat */}
          <div className="space-y-6">
            <NotificationSettings />
            <ChatSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
