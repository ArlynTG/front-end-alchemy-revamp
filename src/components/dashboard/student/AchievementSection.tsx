
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star } from "lucide-react";
import { motion } from "framer-motion";
import { BadgeIcon } from "../dashboard/badges/BadgeIcon";

const AchievementSection: React.FC = () => {
  // Sample achievements
  const recentAchievements = [
    { id: 1, name: "Reading Champion", date: "2 days ago", type: "reading" },
    { id: 2, name: "Math Wizard", date: "1 week ago", type: "math" },
    { id: 3, name: "Writing Star", date: "2 weeks ago", type: "writing" }
  ];
  
  // Sample badges with different levels
  const badges = [
    { name: "Reading Rockstar", level: "Gold", color: "bg-amber-500" },
    { name: "Math Mastermind", level: "Silver", color: "bg-gray-300" },
    { name: "Wordsmith Wizard", level: "Bronze", color: "bg-amber-700" },
    { name: "Focus & Stamina", level: "Diamond", color: "bg-blue-300" },
    { name: "Creative Spark", level: "Gold", color: "bg-amber-500" },
    { name: "Problem Solver", level: "Silver", color: "bg-gray-300" },
  ];

  return (
    <Card className="h-full border-4 border-purple-200 bg-purple-50">
      <CardHeader className="bg-gradient-to-r from-purple-200 to-blue-200 rounded-t-lg">
        <CardTitle className="flex items-center text-lg font-bold text-purple-900">
          <Award className="h-6 w-6 mr-2 text-amber-500" />
          Your Cool Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div>
          <h3 className="text-base font-bold mb-3 text-purple-800 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Recent Wins
          </h3>
          <div className="space-y-3">
            {recentAchievements.map((achievement) => (
              <motion.div 
                key={achievement.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-purple-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div>
                  <p className="font-medium text-base">{achievement.name}</p>
                  <p className="text-sm text-gray-500">{achievement.date}</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-sm px-3">
                  New!
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold mb-3 text-purple-800 flex items-center">
            <Award className="h-5 w-5 mr-2 text-amber-500" />
            Your Awesome Badges
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center bg-white p-3 rounded-lg shadow-sm border-2 border-blue-100"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="mb-2">
                  <BadgeIcon name={badge.name} level={badge.level} size="h-10 w-10" />
                </div>
                <span className="text-sm font-medium text-center">{badge.name}</span>
                <Badge variant="outline" className="mt-1 bg-amber-50 border-amber-200 text-amber-700">
                  {badge.level}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          className="text-center pt-3"
          whileHover={{ scale: 1.05 }}
        >
          <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium shadow-md">
            See All Your Badges
          </button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default AchievementSection;
