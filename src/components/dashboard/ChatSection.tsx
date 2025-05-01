
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import N8nChatInterface from "@/components/chat/N8nChatInterface";
import { useIsMobile } from "@/hooks/use-mobile";

const ChatSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0 py-3">
        <CardTitle className="flex items-center text-base">
          <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
          Chat with Tobey's Tutor
        </CardTitle>
        <CardDescription className="text-xs">
          {!isMobile && "Would you like me to focus on anything new? Just let me know."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden flex flex-col p-2">
        <div className="h-full">
          <N8nChatInterface />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatSection;
