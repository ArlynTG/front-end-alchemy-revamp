
import React, { useRef, useEffect } from "react";
import { Message } from "@/hooks/useChatState";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll whenever messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(msg => (
        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-wrap ${
            msg.sender === 'user'
              ? 'bg-[#f97316] text-white rounded-tr-none'
              : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}>
            <div className="font-medium text-sm mb-1">
              {msg.sender === 'user' ? 'You' : 'Tobey'}
            </div>
            <div className="text-sm leading-relaxed">{msg.text}</div>
          </div>
        </div>
      ))}
      {isLoading && <div className="text-gray-500 italic text-center">Tobey is typing...</div>}
    </div>
  );
};

export default ChatMessages;
