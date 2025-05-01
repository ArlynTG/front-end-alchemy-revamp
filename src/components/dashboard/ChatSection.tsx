
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import ChatInterface from "@/components/chat/ChatInterface";

const ChatSection: React.FC = () => {
  return (
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
  );
};

export default ChatSection;
