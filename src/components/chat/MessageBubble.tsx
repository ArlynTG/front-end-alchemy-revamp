
import React, { memo } from "react";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  formatMessageText: (text: string) => string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content, formatMessageText }) => {
  // Precompute styles to avoid style calculations during rendering
  const bubbleClasses = role === 'user'
    ? 'bg-tobey-orange text-white rounded-tr-none'
    : 'bg-gray-200 text-gray-800 rounded-tl-none';

  const formattedContent = formatMessageText(content);
  
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${bubbleClasses}`}
      >
        <div className="flex items-center space-x-2 mb-1">
          {role === 'assistant' ? (
            <div className="font-medium text-sm">Tobey's Tutor</div>
          ) : (
            <div className="font-medium text-sm text-right w-full">You</div>
          )}
        </div>
        <p className="text-sm whitespace-pre-wrap">{formattedContent}</p>
      </div>
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(MessageBubble);
