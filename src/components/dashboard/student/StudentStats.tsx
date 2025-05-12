
import React from "react";
import { motion } from "framer-motion";
import { Star, BookOpen, Award, Trophy } from "lucide-react";

const StudentStats: React.FC = () => {
  // Sample data - in a real app, this would come from an API
  const stats = [
    { 
      icon: <Star className="w-5 h-5 text-yellow-500" />, 
      label: "Current Streak", 
      value: "7 days",
      color: "bg-amber-100" 
    },
    { 
      icon: <BookOpen className="w-5 h-5 text-blue-500" />, 
      label: "Pages Read", 
      value: "128",
      color: "bg-blue-100" 
    },
    { 
      icon: <Award className="w-5 h-5 text-green-500" />, 
      label: "Badges Earned", 
      value: "12",
      color: "bg-green-100" 
    },
    { 
      icon: <Trophy className="w-5 h-5 text-purple-500" />, 
      label: "Total Wins", 
      value: "24",
      color: "bg-purple-100" 
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className={`${stat.color} p-4 rounded-lg shadow-sm`}
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center mb-2">
            {stat.icon}
            <h3 className="ml-2 font-medium text-gray-700">{stat.label}</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StudentStats;
