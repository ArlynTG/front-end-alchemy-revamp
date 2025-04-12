
import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal, AlertCircle, RefreshCw, Settings, X } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const DEFAULT_WEBHOOK_URL = "https://tobiasedtech.app.n8n.cloud/webhook/eb528532-1df2-4d01-924e-69fb7b29dc25/chat";

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
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem("tobey_webhook_url") || DEFAULT_WEBHOOK_URL;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [tempWebhookUrl, setTempWebhookUrl] = useState(webhookUrl);
  
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

  const applyCorsProxy = (url: string) => {
    // Check if the URL already has a CORS proxy
    if (url.includes("corsproxy.io")) {
      return url;
    }
    
    // Try multiple CORS proxies to increase chances of success
    // Option 1: corsproxy.io
    return `https://corsproxy.io/?${encodeURIComponent(url)}`;
    
    // If one proxy fails, you could try others:
    // Option 2: cors-anywhere (commented out as fallback example)
    // return `https://cors-anywhere.herokuapp.com/${url}`;
  };

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
    setConnectionError(null);
    
    try {
      const proxiedUrl = applyCorsProxy(webhookUrl);
      console.log("Sending message to webhook:", inputMessage);
      console.log("Using proxied URL:", proxiedUrl);
      
      const response = await fetch(proxiedUrl, {
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
      } else {
        throw new Error("Invalid response format: missing 'reply' field");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Show error in UI and add error message to chat
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to connect to the chat service";
      
      setConnectionError(errorMessage);
      
      setMessages(prev => [...prev, {
        id: `error-${messageId}`,
        text: "I'm sorry, I couldn't process your message right now. Please try again later.",
        sender: "bot",
        timestamp: new Date()
      }]);
      
      toast({
        title: "Connection Error",
        description: errorMessage,
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
      const proxiedUrl = applyCorsProxy(webhookUrl);
      console.log("Testing connection with URL:", proxiedUrl);
      
      // Send a simple test message
      const response = await fetch(proxiedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "connection_test" }),
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
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to connect to the chat service";
      
      setConnectionError(errorMessage);
      
      toast({
        title: "Connection error",
        description: "Still unable to connect to the chat service. Please check settings or try again later.",
        variant: "destructive",
      });
    }
  };

  const saveWebhookUrl = () => {
    setWebhookUrl(tempWebhookUrl);
    localStorage.setItem("tobey_webhook_url", tempWebhookUrl);
    setShowSettings(false);
    toast({
      title: "Settings Saved",
      description: "Webhook URL has been updated.",
    });
  };

  const resetToDefault = () => {
    setTempWebhookUrl(DEFAULT_WEBHOOK_URL);
    setWebhookUrl(DEFAULT_WEBHOOK_URL);
    localStorage.setItem("tobey_webhook_url", DEFAULT_WEBHOOK_URL);
    setShowSettings(false);
    toast({
      title: "Settings Reset",
      description: "Webhook URL has been reset to default.",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end mb-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            setTempWebhookUrl(webhookUrl);
            setShowSettings(true);
          }}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      
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

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chat Settings</DialogTitle>
            <DialogDescription>
              Configure the chat connection settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="webhook-url">
                Webhook URL
              </label>
              <Input
                id="webhook-url"
                value={tempWebhookUrl}
                onChange={(e) => setTempWebhookUrl(e.target.value)}
                placeholder="Enter webhook URL"
              />
              <p className="text-xs text-gray-500">
                The URL for the n8n webhook that handles chat messages
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetToDefault}>
              Reset to Default
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button onClick={saveWebhookUrl}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SimpleChatInterface;
