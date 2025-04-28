
import React, { useRef, useEffect, useCallback, memo } from "react";
import { SendHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConnectionErrorAlert from "@/components/chat/ConnectionErrorAlert";
import MessageBubble from "@/components/chat/MessageBubble";
import LoadingIndicator from "@/components/chat/LoadingIndicator";
import { useChatWebhook } from "@/hooks/useChatWebhook";

interface WebhookChatProps {
  reportText?: string | null;
}

export const selectSampleQuestion = (question: string) => {
  const event = new CustomEvent('sampleQuestionSelected', { detail: question });
  document.dispatchEvent(event);
};

// Memoized message bubble to prevent unnecessary re-renders
const MemoizedMessageBubble = memo(MessageBubble);

const WebhookChat: React.FC<WebhookChatProps> = ({ reportText }) => {
  const {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    error,
    sendMessage,
    formatMessageText
  } = useChatWebhook(reportText);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle sample question event
  useEffect(() => {
    const handleSampleQuestion = (e: Event) => {
      const customEvent = e as CustomEvent;
      setInputMessage(customEvent.detail);
      // Focus the input after setting a sample question
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    
    document.addEventListener('sampleQuestionSelected', handleSampleQuestion);
    
    return () => {
      document.removeEventListener('sampleQuestionSelected', handleSampleQuestion);
    };
  }, [setInputMessage]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableArea = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableArea) {
        // Use requestAnimationFrame to ensure DOM has updated before scrolling
        requestAnimationFrame(() => {
          scrollableArea.scrollTop = scrollableArea.scrollHeight;
        });
      }
    }
  }, [messages]);

  // Memoized event handlers to prevent recreation on each render
  const handleSubmit = useCallback(() => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
    }
  }, [inputMessage, sendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div className="flex flex-col h-full rounded-lg border shadow-lg bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-tobey-orange to-tobey-darkOrange text-white py-3 px-4 flex justify-between items-center">
        <h3 className="font-medium">Interactive Demo</h3>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 overflow-auto">
        <div className="space-y-4">
          {error && (
            <ConnectionErrorAlert 
              errorMessage={error}
              onRetry={() => sendMessage(inputMessage)} 
              onShowSettings={() => {}}
            />
          )}
        
          {messages.map((message, index) => (
            <MemoizedMessageBubble
              key={index}
              role={message.role}
              content={message.content}
              formatMessageText={formatMessageText}
            />
          ))}
          
          {isLoading && <LoadingIndicator />}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1"
            disabled={isLoading}
            aria-label="Chat message input"
          />
          <Button
            onClick={handleSubmit}
            className="bg-tobey-orange hover:bg-tobey-darkOrange text-white"
            disabled={!inputMessage.trim() || isLoading}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebhookChat;
