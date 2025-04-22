
import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ConnectionErrorAlert from "@/components/chat/ConnectionErrorAlert";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// The webhook endpoint
const WEBHOOK_URL = "https://n8n.tobeystutor.com/webhook/chat";

const WebhookChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm Tobey AI. How can I help you today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableArea = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableArea) {
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
      }
    }
  }, [messages]);

  // Format message text - handle newlines and escape characters
  const formatMessageText = (text: string): string => {
    // Replace escaped newlines with actual line breaks for rendering
    return text
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'");
  };

  const sendMessage = async () => {
    const messageText = inputMessage.trim();
    if (!messageText || isLoading) return;

    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setError(null);

    try {
      console.log("Sending message to webhook:", WEBHOOK_URL);

      // Send the message to the webhook with the required format
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messageText
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse JSON response
      const jsonResponse = await response.json();
      
      // Extract the reply field from the response or use the raw response
      let responseText = "";
      if (jsonResponse && jsonResponse.reply) {
        responseText = jsonResponse.reply;
      } else {
        responseText = JSON.stringify(jsonResponse);
      }
      
      // Add assistant message to chat
      const assistantMessage: Message = {
        role: "assistant",
        content: responseText,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to connect to the chat service. Please try again later.");
      
      toast({
        title: "Connection Error",
        description: "Could not connect to the chat service.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
              onRetry={sendMessage} 
              onShowSettings={() => {}}
            />
          )}
        
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-tobey-orange text-white rounded-tr-none'
                    : 'bg-gray-200 text-gray-800 rounded-tl-none'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.role === 'assistant' ? (
                    <div className="font-medium text-sm">Tobey</div>
                  ) : (
                    <div className="font-medium text-sm text-right w-full">You</div>
                  )}
                </div>
                <p className="text-sm whitespace-pre-wrap">{formatMessageText(message.content)}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                <div className="font-medium text-sm mb-1">Tobey</div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Thinking</span>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
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
            onClick={sendMessage}
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
