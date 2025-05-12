
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book } from "lucide-react";

const LearningProgress: React.FC = () => {
  // Sample progress data
  const subjects = [
    { name: "Reading", progress: 65 },
    { name: "Math", progress: 42 },
    { name: "Writing", progress: 78 }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Book className="h-5 w-5 mr-2 text-blue-500" />
          Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{subject.name}</span>
              <span className="font-medium">{subject.progress}%</span>
            </div>
            <Progress value={subject.progress} className="h-2" />
          </div>
        ))}
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Next Goal:</h4>
          <p className="text-sm text-gray-600">Complete Reading Chapter 5 by Friday</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningProgress;
