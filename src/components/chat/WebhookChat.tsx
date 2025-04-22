
import React, { useRef, useEffect } from "react";
import { SendHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConnectionErrorAlert from "@/components/chat/ConnectionErrorAlert";
import MessageBubble from "@/components/chat/MessageBubble";
import LoadingIndicator from "@/components/chat/LoadingIndicator";
import { useChatWebhook } from "@/hooks/useChatWebhook";

export const selectSampleQuestion = (question: string) => {
  const event = new CustomEvent('sampleQuestionSelected', { detail: question });
  document.dispatchEvent(event);
};

const WebhookChat: React.FC = () => {
  const {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    error,
    sendMessage,
    formatMessageText
  } = useChatWebhook();
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSampleQuestion = (e: Event) => {
      const customEvent = e as CustomEvent;
      setInputMessage(customEvent.detail);
    };
    
    document.addEventListener('sampleQuestionSelected', handleSampleQuestion);
    
    return () => {
      document.removeEventListener('sampleQuestionSelected', handleSampleQuestion);
    };
  }, [setInputMessage]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableArea = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableArea) {
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
      }
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

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
            <MessageBubble
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
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={() => sendMessage(inputMessage)}
            className="bg-tobey-orange hover:bg-tobey-darkOrange text-white"
            disabled={!inputMessage.trim() || isLoading}
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
