
import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal, AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

// Using a CORS proxy to handle the cross-origin requests
const WEBHOOK_URL = "https://corsproxy.io/?https%3A%2F%2Ftobiasedtech.app.n8n.cloud%2Fwebhook%2Feb528532-1df2-4d01-924e-69fb7b29dc25%2Fchat";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const SimpleChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: "welcome",
    text: "Hello! I'm Tobey, your AI tutor. How can I help you today?",
    sender: "bot",
    timestamp: new Date()
  }]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
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

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    // Generate a unique ID for the message
    const messageId = Date.now().toString();
    
    // Add user message to chat
    const userMessage: Message = {
      id: messageId,
      text: inputMessage.trim(),
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      console.log("Sending message to webhook:", inputMessage);
      
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Received response:", data);
      
      if (data.reply) {
        // Add bot response to chat
        setMessages(prev => [...prev, {
          id: `response-${messageId}`,
          text: data.reply,
          sender: "bot",
          timestamp: new Date()
        }]);
        setConnectionError(null);
      } else {
        throw new Error("Invalid response format: missing 'reply' field");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Show error in UI
      setConnectionError(
        error instanceof Error 
          ? error.message 
          : "Failed to connect to the chat service"
      );
      
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
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

  const retryConnection = async () => {
    setConnectionError(null);
    toast({
      title: "Retrying connection",
      description: "Attempting to reconnect to the chat service...",
    });
    
    try {
      // Send a simple test message
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Hello" }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      await response.json();
      
      toast({
        title: "Connection restored",
        description: "Successfully connected to the chat service.",
      });
      
      // Add a system message indicating connection restored
      setMessages(prev => [...prev, {
        id: `system-${Date.now()}`,
        text: "Connection to the chat service has been restored.",
        sender: "bot",
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error("Error testing connection:", error);
      
      setConnectionError(
        error instanceof Error 
          ? error.message 
          : "Failed to connect to the chat service"
      );
      
      toast({
        title: "Connection error",
        description: "Still unable to connect to the chat service. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {connectionError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>{connectionError}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="self-start mt-2"
              onClick={retryConnection}
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Retry Connection
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-tobey-orange text-white rounded-tr-none'
                    : 'bg-gray-200 text-gray-800 rounded-tl-none'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.sender === 'bot' ? (
                    <div className="font-medium text-sm">Tobey AI</div>
                  ) : (
                    <div className="font-medium text-sm text-right w-full">You</div>
                  )}
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                <div className="font-medium text-sm mb-1">Tobey AI</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            className="bg-tobey-orange hover:bg-tobey-darkOrange text-white"
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SimpleChatInterface;
