
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ChatInterface from "@/components/chat/ChatInterface";
import Navbar from "@/components/Navbar";
import { Book, Clock, CalendarIcon, MessageSquare, Bell } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const ParentDashboard = () => {
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 3, 5]); // Monday, Wednesday, Friday
  const [reminderHours, setReminderHours] = useState<number>(2); // 2 hours reminder
  const [emailReminders, setEmailReminders] = useState<boolean>(true);
  const [textReminders, setTextReminders] = useState<boolean>(true);
  const [parentNotifications, setParentNotifications] = useState<boolean>(true);
  const { toast } = useToast();

  // Sample data - in a real app, this would come from an API
  const studentData = {
    name: "Alex Johnson",
    totalLessons: 24,
    averageSessionDuration: 45, // minutes
    longTermPlan: "Improve reading comprehension, writing speed, and executive functioning skills by the end of the semester"
  };

  const handleSaveSchedule = () => {
    toast({
      title: "Schedule saved",
      description: "Your tutoring schedule has been updated successfully.",
    });
  };

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Parent Dashboard</h1>
        <p className="text-xl text-gray-700 mb-8">Welcome back! Here's how {studentData.name} is progressing</p>
        
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Combined Schedule and Calendar */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-green-500" />
                Tutoring Schedule & Calendar
              </CardTitle>
              <CardDescription>Manage when {studentData.name} should be tutored</CardDescription>
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
          
          {/* Right Section */}
          <div className="space-y-6">
            {/* Reminders and Notifications Card */}
            <Card>
              <CardHeader>
                <CardTitle>Reminders & Notifications</CardTitle>
                <CardDescription>Set how and when to receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Reminder hours before class */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Reminder Hours Before Session</Label>
                    <span className="font-medium">{reminderHours} hours</span>
                  </div>
                  <Slider 
                    value={[reminderHours]} 
                    min={1} 
                    max={24} 
                    step={1} 
                    onValueChange={(value) => setReminderHours(value[0])}
                  />
                </div>
                
                <div className="space-y-4">
                  {/* Email Reminders */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-reminders">Email Reminders</Label>
                      <p className="text-sm text-gray-500">Send reminders to student's email</p>
                    </div>
                    <Switch 
                      id="email-reminders" 
                      checked={emailReminders}
                      onCheckedChange={setEmailReminders}
                    />
                  </div>
                  
                  {/* Text Reminders */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="text-reminders">Text Reminders</Label>
                      <p className="text-sm text-gray-500">Send reminders via SMS</p>
                    </div>
                    <Switch 
                      id="text-reminders" 
                      checked={textReminders}
                      onCheckedChange={setTextReminders}
                    />
                  </div>
                  
                  {/* Parent Notifications */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="parent-notifications">Parent Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications about sessions</p>
                    </div>
                    <Switch 
                      id="parent-notifications" 
                      checked={parentNotifications}
                      onCheckedChange={setParentNotifications}
                    />
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    toast({
                      title: "Notification settings saved",
                      description: "Your notification preferences have been updated.",
                    });
                  }}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
            
            {/* Chat Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                  Chat with Tobey's Tutor
                </CardTitle>
                <CardDescription>Would you like me to focus on anything new? Just let me know.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChatInterface />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
