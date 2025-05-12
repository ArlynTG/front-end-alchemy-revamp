
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-green-500" />
          Your Streak Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium mb-2">{currentMonth}</div>
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center text-xs text-gray-500">
              {day}
            </div>
          ))}
          
          {/* Empty cells for proper alignment */}
          {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() }, (_, i) => (
            <div key={`empty-${i}`} className="h-7"></div>
          ))}
          
          {/* Calendar days */}
          {calendarDays.map((day) => {
            const isCompleted = completedDays.includes(day);
            const isToday = day === currentDate.getDate();
            
            return (
              <div 
                key={day} 
                className={`
                  h-7 flex items-center justify-center text-xs rounded-full
                  ${isCompleted ? 'bg-green-500 text-white' : 'text-gray-700'}
                  ${isToday && !isCompleted ? 'border border-green-500' : ''}
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-4 text-xs text-gray-600">
          <div>Current streak: <span className="font-bold">7 days</span></div>
          <div>Best streak: <span className="font-bold">14 days</span></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCalendar;
