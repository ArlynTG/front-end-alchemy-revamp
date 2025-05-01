
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Clock, CalendarIcon } from "lucide-react";

interface StudentStatsProps {
  studentData: {
    name: string;
    totalLessons: number;
    averageSessionDuration: number;
    longTermPlan: string;
  };
}

const StudentStats: React.FC<StudentStatsProps> = ({ studentData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {/* Total Lessons Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Book className="h-5 w-5 mr-2 text-purple-500" />
            Total Lessons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{studentData.totalLessons}</p>
          <p className="text-sm text-gray-500">Sessions completed</p>
        </CardContent>
      </Card>
      
      {/* Session Duration Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-500" />
            Average Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{studentData.averageSessionDuration} min</p>
          <p className="text-sm text-gray-500">Per tutoring session</p>
        </CardContent>
      </Card>
      
      {/* Schedule Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-green-500" />
            Next Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">Tomorrow</p>
          <p className="text-sm text-gray-500">4:00 PM - 4:45 PM</p>
        </CardContent>
      </Card>
      
      {/* Long-term Plan Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Book className="h-5 w-5 mr-2 text-amber-500" />
            Long-term Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm line-clamp-3">{studentData.longTermPlan}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentStats;
