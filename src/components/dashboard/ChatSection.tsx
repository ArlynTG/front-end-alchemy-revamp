
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Creating a simplified mock chat interface for display only
const MockChatInterface = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-gray-50 rounded p-3 overflow-y-auto mb-3">
        {/* Sample messages - read only */}
        <div className="flex justify-start mb-3">
          <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-gray-800 text-sm">Hi there! I'm Tobey, your AI tutor. How can I help you today?</p>
          </div>
        </div>
        <div className="flex justify-end mb-3">
          <div className="bg-blue-100 p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-gray-800 text-sm">When is the next reading assessment?</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-gray-800 text-sm">The next reading assessment is scheduled for May 15th. Would you like me to send a reminder?</p>
          </div>
        </div>
      </div>
      
      {/* Disabled input area */}
      <div className="border-t border-gray-200 p-4 bg-white rounded">
        <div className="flex items-end gap-2">
          <textarea
            placeholder="Type a message... (Preview only)"
            disabled
            className="flex-1 min-h-[80px] resize-none bg-gray-100 border border-gray-200 rounded p-2 text-gray-500"
            aria-label="Type your message"
          />
          <button
            disabled
            className="bg-gray-300 text-white p-2 rounded h-10 w-10 flex items-center justify-center"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">This is a preview. Chat functionality will be available to Beta subscribers.</p>
      </div>
    </div>
  );
};

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
          <MockChatInterface />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatSection;
