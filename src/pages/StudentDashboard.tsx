
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatContainer from "@/components/chat/ChatContainer";
import StudentStats from "@/components/dashboard/student/StudentStats";
import AchievementSection from "@/components/dashboard/student/AchievementSection";
import LearningProgress from "@/components/dashboard/student/LearningProgress";
import StreakCalendar from "@/components/dashboard/student/StreakCalendar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sparkles } from "lucide-react";
import ReactConfetti from "react-confetti";

const StudentDashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("chat");
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiWidth, setConfettiWidth] = useState(0);
  const [confettiHeight, setConfettiHeight] = useState(0);
  
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
        stiffness: 90,
        damping: 10
      }
    }
  };
  
  // Set confetti dimensions to window size for full width effect
  useEffect(() => {
    const updateDimensions = () => {
      setConfettiWidth(window.innerWidth);
      setConfettiHeight(400); // Fixed height for top of page effect
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Hide confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />
      
      {/* Global confetti effect - positioned fixed */}
      {showConfetti && (
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
          <ReactConfetti
            width={confettiWidth}
            height={confettiHeight}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
            initialVelocityY={10}
            confettiSource={{x: 0, y: 0, w: confettiWidth, h: 0}}
          />
        </div>
      )}
      
      <motion.div 
        className="container py-4 md:py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="flex items-center justify-between mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-800">
            Your Learning Dashboard
          </h1>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full px-4 py-2 text-sm md:text-base font-bold flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            Level 12 Explorer
          </div>
        </motion.div>
        
        {/* Beta Preview Banner - Updated text */}
        <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 mb-6">
          <p className="text-center text-white font-bold text-lg md:text-xl">
            🚀SNEAK PEAK: This is a preview of the Student Dashboard. Available June 2025🎉
          </p>
        </div>

        {/* Welcome back message with confetti effect */}
        {showConfetti && (
          <motion.div 
            className="bg-gradient-to-r from-indigo-100 to-purple-100 p-3 mb-6 rounded-lg text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-bold text-indigo-800">Welcome back, Alex! 🎉</p>
            <p className="text-sm text-indigo-600">Ready to continue your learning journey?</p>
          </motion.div>
        )}

        {/* Stats Row */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="mb-6">
            <StudentStats />
          </motion.div>
        </motion.div>

        {/* Main Content Area with Tabs for Mobile */}
        {isMobile ? (
          <Tabs 
            defaultValue="chat" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-4"
          >
            <TabsList className="grid grid-cols-3 mb-6 bg-white border-2 border-purple-200 p-1">
              <TabsTrigger value="chat" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 font-bold">
                Chat
              </TabsTrigger>
              <TabsTrigger value="progress" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 font-bold">
                Progress
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800 font-bold">
                Awards
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="mt-0">
              <div className="h-[600px] rounded-xl overflow-hidden border-4 border-purple-300 shadow-lg">
                <ChatContainer />
              </div>
            </TabsContent>
            <TabsContent value="progress" className="mt-0 space-y-6">
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
            <motion.div 
              variants={itemVariants}
              className="col-span-12 lg:col-span-3 space-y-6"
            >
              <LearningProgress />
              <StreakCalendar />
            </motion.div>
            
            {/* Center Column - Chat - INCREASED HEIGHT */}
            <motion.div 
              variants={itemVariants}
              className="col-span-12 lg:col-span-6 h-[750px]"
            >
              <div className="h-full rounded-xl overflow-hidden border-4 border-purple-300 shadow-lg">
                <ChatContainer removeConfetti={true} />
              </div>
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
