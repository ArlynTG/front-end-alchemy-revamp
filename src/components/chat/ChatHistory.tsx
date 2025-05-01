
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage, { MessageType } from "@/components/chat/ChatMessage";

interface ChatHistoryProps {
  messages: MessageType[];
}

const ChatHistory = ({ messages }: ChatHistoryProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when chat history updates
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableArea = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableArea) {
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <ScrollArea ref={scrollAreaRef} className="flex-grow overflow-auto p-4 bg-gray-50">
      <div className="space-y-4">
        {messages.map((chat, index) => (
          <ChatMessage key={index} message={chat} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatHistory;
