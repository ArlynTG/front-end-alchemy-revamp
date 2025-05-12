
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, Brain, Pencil, Star } from "lucide-react";

const LearningProgress: React.FC = () => {
  // Sample progress data
  const subjects = [
    { name: "Reading", progress: 65, icon: <Book className="h-5 w-5 text-blue-500" /> },
    { name: "Math", progress: 42, icon: <Brain className="h-5 w-5 text-purple-500" /> },
    { name: "Writing", progress: 78, icon: <Pencil className="h-5 w-5 text-green-500" /> }
  ];

  return (
    <Card className="border-4 border-blue-200 bg-blue-50">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-200 to-green-200 rounded-t-lg">
        <CardTitle className="text-lg font-bold flex items-center text-blue-900">
          <Book className="h-6 w-6 mr-2 text-blue-600" />
          Your Learning Journey
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-5">
        {subjects.map((subject, index) => (
          <div key={index} className="space-y-2 bg-white p-3 rounded-lg border-2 border-blue-100">
            <div className="flex justify-between text-sm font-medium">
              <div className="flex items-center">
                {subject.icon}
                <span className="ml-2">{subject.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-lg">{subject.progress}%</span>
              </div>
            </div>
            <Progress 
              value={subject.progress} 
              className="h-3 bg-gray-100" 
              indicatorClassName={
                subject.progress > 70 ? "bg-green-500" : 
                subject.progress > 40 ? "bg-blue-500" : 
                "bg-amber-500"
              }
            />
          </div>
        ))}
        
        <div className="pt-2 bg-yellow-100 p-3 rounded-lg border-2 border-yellow-200">
          <h4 className="text-sm font-bold mb-2 flex items-center text-amber-800">
            <Star className="h-5 w-5 mr-2 text-amber-500" />
            Your Next Goal:
          </h4>
          <p className="text-sm font-medium text-amber-900">Complete Reading Chapter 5 by Friday</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningProgress;
