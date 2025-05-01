
import React from "react";
import ChatContainer from "@/components/chat/ChatContainer";

/**
 * ChatInterface component
 * - Main entry point for the chat functionality
 * - Refactored into smaller components for better maintainability
 */
const ChatInterface: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <ChatContainer />
    </div>
  );
};

export default ChatInterface; 
