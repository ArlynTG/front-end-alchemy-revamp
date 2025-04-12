
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizontal, Settings, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the n8n webhook URL
const DEFAULT_WEBHOOK_URL = "https://tobiasedtech.app.n8n.cloud/webhook/eb528532-1df2-4d01-924e-69fb7b29dc25/chat";

// Available CORS proxies for fallback
const CORS_PROXIES = [
  "https://corsproxy.io/?",
  "https://api.allorigins.win/raw?url=",
  "https://cors-anywhere.herokuapp.com/"
];

// Define message types
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const N8nChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm Tobey, your AI tutor. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState(DEFAULT_WEBHOOK_URL);
  const [showSettings, setShowSettings] = useState(false);
  const [currentProxyIndex, setCurrentProxyIndex] = useState(0);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Function to scroll to bottom of chat
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableArea = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableArea) {
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
      }
    }
  }, [messages]);

  // Function to get a proxied URL
  const getProxiedUrl = (url: string, proxyIndex: number) => {
    if (proxyIndex >= CORS_PROXIES.length) {
      // If we've tried all proxies, try direct connection
      return url;
    }
    return `${CORS_PROXIES[proxyIndex]}${encodeURIComponent(url)}`;
  };

  // Try the next proxy if available
  const tryNextProxy = () => {
    const nextIndex = currentProxyIndex + 1;
    if (nextIndex <= CORS_PROXIES.length) {
      setCurrentProxyIndex(nextIndex);
      toast({
        title: "Trying different proxy",
        description: nextIndex >= CORS_PROXIES.length 
          ? "Trying direct connection" 
          : `Using proxy ${nextIndex + 1} of ${CORS_PROXIES.length}`,
      });
      setError(null);
    } else {
      toast({
        title: "All proxies failed",
        description: "Please check webhook URL or try again later",
        variant: "destructive",
      });
    }
  };

  // Handle sending a message
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Create a new user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setError(null);

    try {
      // Get proxied URL
      const proxiedUrl = getProxiedUrl(webhookUrl, currentProxyIndex);
      console.log("Sending message using URL:", proxiedUrl);
      
      const response = await fetch(proxiedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: userMessage.text,
          history: messages.map(msg => ({
            content: msg.text,
            role: msg.sender === "user" ? "user" : "assistant"
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from n8n:", data);

      // Extract the bot's reply from the response
      let botReply = "";
      if (data.reply) {
        botReply = data.reply;
      } else if (data.response) {
        botReply = data.response;
      } else if (typeof data === "string") {
        botReply = data;
      } else {
        botReply = "I received your message but couldn't process it properly.";
      }

      // Add bot message to chat
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      setError(`Failed to send message: ${err instanceof Error ? err.message : "Unknown error"}`);
      
      if (currentProxyIndex < CORS_PROXIES.length) {
        // Try next proxy automatically if this one failed
        tryNextProxy();
      } else {
        toast({
          title: "Error",
          description: "Failed to send message to Tobey AI. Please try again or check webhook URL.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press (send on Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Handle settings changes
  const updateWebhookUrl = (url: string) => {
    // Reset proxy index when URL changes
    setCurrentProxyIndex(0);
    setWebhookUrl(url);
    localStorage.setItem("n8n_webhook_url", url);
    toast({
      title: "Settings updated",
      description: "Webhook URL has been updated.",
    });
    setShowSettings(false);
  };

  // Reset to default webhook URL
  const resetToDefault = () => {
    setWebhookUrl(DEFAULT_WEBHOOK_URL);
    setCurrentProxyIndex(0);
    localStorage.removeItem("n8n_webhook_url");
    toast({
      title: "Settings reset",
      description: "Webhook URL has been reset to default.",
    });
  };

  // Load webhook URL from localStorage on mount
  useEffect(() => {
    const savedUrl = localStorage.getItem("n8n_webhook_url");
    if (savedUrl) {
      setWebhookUrl(savedUrl);
    }
  }, []);

  // Toggle settings
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2 p-2 bg-gray-50 rounded">
        <h3 className="font-medium text-gray-800">Tobey AI Chat</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSettings}
          className="text-gray-500"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-800 p-3 mb-3 rounded-md border border-red-200 flex items-start">
          <div className="flex-grow">
            <p className="text-sm font-medium">{error}</p>
            <p className="text-xs mt-1">Click retry to try a different connection method.</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={tryNextProxy} 
            className="text-red-600 hover:text-red-800"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {showSettings && (
        <div className="p-3 mb-3 bg-gray-50 border border-gray-200 rounded">
          <h4 className="font-medium text-sm mb-2">Chat Settings</h4>
          <div className="flex flex-col space-y-2">
            <label className="text-xs text-gray-600">n8n Webhook URL</label>
            <div className="flex space-x-2">
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="Enter webhook URL"
                className="flex-grow text-xs"
              />
              <Button 
                size="sm" 
                onClick={() => updateWebhookUrl(webhookUrl)}
                className="bg-tobey-orange hover:bg-tobey-darkOrange"
              >
                Save
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetToDefault}
              >
                Reset
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              You can customize the n8n webhook URL that powers the chat interface.
            </p>
          </div>
        </div>
      )}
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-tobey-orange text-white rounded-tr-none"
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.sender === "bot" ? (
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
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
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
            placeholder="Type your question here..."
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

export default N8nChatInterface;
