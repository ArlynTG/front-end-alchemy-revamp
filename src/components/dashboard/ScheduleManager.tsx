
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface ScheduleManagerProps {
  studentName: string;
}

const ScheduleManager: React.FC<ScheduleManagerProps> = ({ studentName }) => {
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 3, 5]); // Monday, Wednesday, Friday
  const { toast } = useToast();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleSaveSchedule = () => {
    toast({
      title: "Schedule saved",
      description: "Your tutoring schedule has been updated successfully.",
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-green-500" />
          Tutoring Schedule & Calendar
        </CardTitle>
        <CardDescription>Manage when {studentName} should be tutored</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ResizablePanelGroup direction="horizontal" className="min-h-[400px]">
          {/* Schedule Panel */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="p-6 h-full">
              <h4 className="text-sm font-medium mb-4">Weekly Schedule</h4>
              {/* Days of Week Checkboxes */}
              <div className="grid grid-cols-1 gap-2 mb-6">
                {daysOfWeek.map((day, index) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`day-${index}`}
                      checked={selectedDays.includes(index)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedDays([...selectedDays, index].sort());
                        } else {
                          setSelectedDays(selectedDays.filter(d => d !== index));
                        }
                      }}
                    />
                    <Label htmlFor={`day-${index}`}>{day}</Label>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleSaveSchedule} 
                className="w-full"
              >
                Save Schedule
              </Button>
            </div>
          </ResizablePanel>
          
          {/* Resizable Handle */}
          <ResizableHandle withHandle />
          
          {/* Calendar Panel */}
          <ResizablePanel defaultSize={60}>
            <div className="p-6 h-full flex flex-col">
              <h4 className="text-sm font-medium mb-4">Session Calendar</h4>
              <div className="flex-grow flex items-center justify-center">
                <Calendar 
                  mode="single"
                  disabled={{
                    dayOfWeek: [0, 2, 4, 6].filter(day => !selectedDays.includes(day))
                  }}
                  className="rounded-md border"
                />
              </div>
              <div className="flex items-center mt-4">
                <div className="w-4 h-4 bg-purple-200 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Scheduled Session Days</span>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

export default ScheduleManager;
