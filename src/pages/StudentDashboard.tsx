
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatContainer from "@/components/chat/ChatContainer";
import StudentStats from "@/components/dashboard/student/StudentStats";
import AchievementSection from "@/components/dashboard/student/AchievementSection";
import LearningProgress from "@/components/dashboard/student/LearningProgress";
import StreakCalendar from "@/components/dashboard/student/StreakCalendar";
import { useIsMobile } from "@/hooks/use-mobile";

const StudentDashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("chat");
  
  // Animation variants
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
          Student Dashboard
        </motion.h1>
        
        {/* Beta Preview Banner */}
        <div className="w-full bg-[#ea384c] rounded-lg p-4 mb-4 md:mb-8">
          <p className="text-center text-white font-medium text-lg md:text-xl">
            SNEAK PEEK: This is a preview of the Student Dashboard available to Beta subscribers
          </p>
        </div>

        {/* Stats Row */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <StudentStats />
          </motion.div>
        </motion.div>

        {/* Main Content Area with Tabs for Mobile */}
        {isMobile ? (
          <Tabs 
            defaultValue="chat" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-6"
          >
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="mt-0">
              <div className="h-[500px]">
                <ChatContainer />
              </div>
            </TabsContent>
            <TabsContent value="progress" className="mt-0 space-y-4">
              <LearningProgress />
              <StreakCalendar />
            </TabsContent>
            <TabsContent value="achievements" className="mt-0">
              <AchievementSection />
            </TabsContent>
          </Tabs>
        ) : (
          /* Desktop Layout */
          <div className="grid grid-cols-12 gap-6 mt-6">
            {/* Left Column - Progress Tracking */}
            <div className="col-span-12 lg:col-span-3 space-y-6">
              <motion.div variants={itemVariants}>
                <LearningProgress />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StreakCalendar />
              </motion.div>
            </div>
            
            {/* Center Column - Chat */}
            <motion.div 
              variants={itemVariants}
              className="col-span-12 lg:col-span-6 h-[600px]"
            >
              <ChatContainer />
            </motion.div>
            
            {/* Right Column - Achievements */}
            <motion.div 
              variants={itemVariants}
              className="col-span-12 lg:col-span-3"
            >
              <AchievementSection />
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
