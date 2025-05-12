
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import { motion } from "framer-motion";

const AchievementSection: React.FC = () => {
  // Sample achievements
  const recentAchievements = [
    { id: 1, name: "Reading Champion", date: "2 days ago", type: "reading" },
    { id: 2, name: "Math Wizard", date: "1 week ago", type: "math" },
    { id: 3, name: "Writing Star", date: "2 weeks ago", type: "writing" }
  ];
  
  // Sample badges with different levels
  const badges = [
    { name: "Reading", level: "Gold", color: "bg-amber-500" },
    { name: "Math", level: "Silver", color: "bg-gray-300" },
    { name: "Writing", level: "Bronze", color: "bg-amber-700" },
    { name: "Focus", level: "Diamond", color: "bg-blue-300" },
    { name: "Creativity", level: "Gold", color: "bg-amber-500" },
    { name: "Problem Solving", level: "Silver", color: "bg-gray-300" },
  ];

  // Get badge color based on level
  const getBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'gold': return 'bg-amber-500';
      case 'silver': return 'bg-gray-300';
      case 'bronze': return 'bg-amber-700';
      case 'diamond': return 'bg-blue-300';
      case 'platinum': return 'bg-purple-300';
      default: return 'bg-gray-200';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Award className="h-5 w-5 mr-2 text-amber-500" />
          Your Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Recent Wins</h3>
          <div className="space-y-2">
            {recentAchievements.map((achievement) => (
              <motion.div 
                key={achievement.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                whileHover={{ scale: 1.01 }}
              >
                <div>
                  <p className="font-medium text-sm">{achievement.name}</p>
                  <p className="text-xs text-gray-500">{achievement.date}</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  New!
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Your Badges</h3>
          <div className="grid grid-cols-3 gap-2">
            {badges.map((badge, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className={`w-10 h-10 rounded-full ${badge.color} flex items-center justify-center mb-1`}>
                  <span className="text-white text-xs font-bold">{badge.level.charAt(0)}</span>
                </div>
                <span className="text-xs text-center">{badge.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center pt-2">
          <button className="text-sm text-blue-600 hover:underline">
            View All Achievements
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementSection;
