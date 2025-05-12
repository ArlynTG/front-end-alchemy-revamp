
import React from "react";
import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";

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
      icon: <Award className="w-5 h-5 text-green-500" />, 
      label: "Badges Earned", 
      value: "12",
      color: "bg-green-100" 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className={`${stat.color} py-3 px-4 rounded-xl shadow-sm border-2 border-dashed border-${stat.color.split('-')[1]}-300`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {stat.icon}
              <span className="ml-2 font-bold text-gray-700">{stat.label}</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StudentStats;
