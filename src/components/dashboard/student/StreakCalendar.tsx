
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Star } from "lucide-react";

const StreakCalendar: React.FC = () => {
  // Get current date info
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  // Sample data for days with completed activities
  const completedDays = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12]; // Assuming today is the 12th
  
  // Generate calendar days
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <Card className="border-4 border-green-200 bg-green-50">
      <CardHeader className="pb-2 bg-gradient-to-r from-green-200 to-yellow-200 rounded-t-lg">
        <CardTitle className="text-lg font-bold flex items-center text-green-900">
          <Star className="h-6 w-6 mr-2 text-yellow-500" />
          Your Awesome Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="text-base font-bold mb-3 text-green-800">{currentMonth}</div>
        <div className="grid grid-cols-7 gap-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center text-sm font-bold text-green-700">
              {day}
            </div>
          ))}
          
          {/* Empty cells for proper alignment */}
          {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() }, (_, i) => (
            <div key={`empty-${i}`} className="h-9"></div>
          ))}
          
          {/* Calendar days */}
          {calendarDays.map((day) => {
            const isCompleted = completedDays.includes(day);
            const isToday = day === currentDate.getDate();
            
            return (
              <div 
                key={day} 
                className={`
                  h-9 flex items-center justify-center text-sm rounded-full
                  ${isCompleted ? 'bg-green-500 text-white font-bold' : 'bg-white text-gray-700 border-2 border-green-100'}
                  ${isToday && !isCompleted ? 'border-4 border-yellow-400' : ''}
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-5 bg-yellow-100 p-3 rounded-lg border-2 border-yellow-200">
          <div className="text-sm text-amber-900">Current streak: <span className="font-bold text-lg">7 days</span></div>
          <div className="text-sm text-amber-900">Best streak: <span className="font-bold text-lg">14 days</span></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCalendar;
