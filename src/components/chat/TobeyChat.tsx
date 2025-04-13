
import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const TobeyChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm Tobey, your AI tutor. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Use different proxy URLs for CORS issues
  const CORS_PROXIES = [
    "", // Direct connection (no proxy)
    "https://corsproxy.io/?",
    "https://api.allorigins.win/raw?url="
  ];

  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableArea = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableArea) {
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
      }
    }
  }, [messages]);

  const getProxiedUrl = (url: string, proxyIndex: number = 0) => {
    if (proxyIndex >= CORS_PROXIES.length || proxyIndex === 0) {
      return url; // Use direct URL if no proxy or first attempt
    }
    return `${CORS_PROXIES[proxyIndex]}${encodeURIComponent(url)}`;
  };

  const handleRetry = () => {
    const nextRetryCount = (retryCount + 1) % CORS_PROXIES.length;
    setRetryCount(nextRetryCount);
    setConnectionError(null);
    
    toast({
      title: "Trying different connection method",
      description: nextRetryCount === 0 
        ? "Using direct connection" 
        : `Using proxy ${nextRetryCount} of ${CORS_PROXIES.length - 1}`,
    });
    
    // Re-send the last user message
    const lastUserMessage = [...messages].reverse().find(m => m.sender === "user");
    if (lastUserMessage) {
      sendMessage(lastUserMessage.text, nextRetryCount);
    }
  };

  const sendMessage = async (message?: string, proxyIndex = retryCount) => {
    const textToSend = message || inputMessage.trim();
    if (!textToSend || isLoading) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
    };

    if (!message) {
      // Only add to messages if this is a new message, not a retry
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage("");
    }
    
    setIsLoading(true);
    setConnectionError(null);

    try {
      const apiUrl = "https://v0-tobeys-tutor-proxy.vercel.app/api/chat";
      const proxiedUrl = getProxiedUrl(apiUrl, proxyIndex);
      console.log(`Attempting connection with ${proxyIndex === 0 ? 'direct URL' : 'proxy ' + proxyIndex}:`, proxiedUrl);
      
      const response = await fetch(proxiedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: textToSend,
          thread_id: threadId
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Save thread_id for future messages
      if (data.thread_id) {
        setThreadId(data.thread_id);
      }

      // Add bot message to chat
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "Sorry, I couldn't process your message.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      setConnectionError(
        `Failed to connect to Tobey AI service. ${error instanceof Error ? error.message : ""}`
      );
      
      if (proxyIndex === CORS_PROXIES.length - 1) {
        // We've tried all proxies, give up and show an error message
        toast({
          title: "Connection Failed",
          description: "All connection methods failed. Please try again later.",
          variant: "destructive",
        });
      }
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
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-4">
        <h3 className="font-medium">Tobey AI Tutor</h3>
      </div>
      
      {connectionError && (
        <Alert variant="destructive" className="mx-4 mt-4 mb-0">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>{connectionError}</p>
            <div className="flex gap-2 mt-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={handleRetry}
              >
                <RefreshCw className="h-4 w-4 mr-2" /> Try Different Connection
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 overflow-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-gray-200 text-gray-800 rounded-tl-none'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.sender === 'bot' ? (
                    <div className="font-medium text-sm">Tobey</div>
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
                <div className="font-medium text-sm mb-1">Tobey</div>
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
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Tobey anything..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={() => sendMessage()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={!inputMessage.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Having connection issues? Try the "Try Different Connection" button if the chat fails to respond.
        </p>
      </div>
    </div>
  );
};

export default TobeyChat;
