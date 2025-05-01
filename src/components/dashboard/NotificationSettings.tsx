
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";

const NotificationSettings: React.FC = () => {
  const [reminderHours, setReminderHours] = useState<number>(2); // 2 hours reminder
  const [emailReminders, setEmailReminders] = useState<boolean>(true);
  const [textReminders, setTextReminders] = useState<boolean>(true);
  const [parentNotifications, setParentNotifications] = useState<boolean>(true);
  const { toast } = useToast();

  return (
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
  );
};

export default NotificationSettings;
