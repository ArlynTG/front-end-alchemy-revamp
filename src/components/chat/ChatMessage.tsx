
import React from "react";

// This should match the type in ChatInterface.tsx
export type MessageType = {
  text: string;
  sender: "user" | "ai";
  isError?: boolean;
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          message.sender === 'user'
            ? 'bg-tobey-orange text-white rounded-tr-none'
            : message.isError
              ? 'bg-red-100 text-red-800 rounded-tl-none'
              : 'bg-gray-200 text-gray-800 rounded-tl-none'
        }`}
      >
        <div className="flex items-center space-x-2 mb-1">
          {message.sender === 'ai' ? (
            <div className="font-medium text-sm">Tobey AI</div>
          ) : (
            <div className="font-medium text-sm text-right w-full">You</div>
          )}
        </div>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
