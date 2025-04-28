
import React, { KeyboardEvent, memo, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  disabled = false,
}) => {
  const handleKeyPress = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }, [onSend]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  // Check if send button should be disabled
  const isSendDisabled = disabled || !value.trim();

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-end gap-2">
        <Textarea
          placeholder="Type a message..."
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          disabled={disabled}
          className="flex-1 min-h-[80px] resize-none"
          aria-label="Type your message"
        />
        <Button
          onClick={onSend}
          disabled={isSendDisabled}
          className="bg-tobey-orange hover:bg-tobey-darkOrange text-white"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(MessageInput);
