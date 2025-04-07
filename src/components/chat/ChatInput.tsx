
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex space-x-2">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your question here..."
        className="flex-1 resize-none border-gray-300 focus:border-tobey-orange focus:ring-tobey-orange"
        rows={1}
        disabled={isLoading}
      />
      <Button
        onClick={handleSend}
        className="bg-tobey-orange hover:bg-tobey-darkOrange text-white"
        type="submit"
        disabled={!message.trim() || isLoading}
      >
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatInput;
