
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const DEFAULT_WEBHOOK_URL = "https://tobiasedtech.app.n8n.cloud/webhook/eb528532-1df2-4d01-924e-69fb7b29dc25/chat";

// Array of CORS proxies to try in order
const CORS_PROXIES = [
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://cors-anywhere.herokuapp.com/${url}`,
  (url: string) => `https://cors-proxy.fringe.zone/${url}`
];

export function useChatWithWebhook() {
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
  const [currentProxyIndex, setCurrentProxyIndex] = useState(0);
  
  const { toast } = useToast();

  const getNextProxy = () => {
    const nextIndex = (currentProxyIndex + 1) % CORS_PROXIES.length;
    setCurrentProxyIndex(nextIndex);
    return nextIndex;
  };

  const applyCorsProxy = (url: string) => {
    // If the URL already has a CORS proxy, remove it first
    let cleanUrl = url;
    CORS_PROXIES.forEach(proxyFn => {
      const proxyPrefix = proxyFn('').replace(/\?$/, '');
      if (url.startsWith(proxyPrefix)) {
        cleanUrl = decodeURIComponent(url.substring(proxyPrefix.length));
      }
    });
    
    // Apply the current proxy
    return CORS_PROXIES[currentProxyIndex](cleanUrl);
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
    
    let attemptCount = 0;
    const maxAttempts = CORS_PROXIES.length;
    
    const attemptSend = async (proxyIndex: number): Promise<any> => {
      try {
        const proxiedUrl = CORS_PROXIES[proxyIndex](webhookUrl);
        console.log(`Sending message to webhook (Attempt ${attemptCount + 1}/${maxAttempts}, Proxy ${proxyIndex + 1}/${CORS_PROXIES.length})`);
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
        
        return await response.json();
      } catch (error) {
        console.error(`Error sending message with proxy ${proxyIndex + 1}:`, error);
        
        // If we have more proxies to try
        if (attemptCount < maxAttempts - 1) {
          attemptCount++;
          const nextProxyIndex = getNextProxy();
          return attemptSend(nextProxyIndex);
        }
        
        // If all proxies failed
        throw error;
      }
    };
    
    try {
      const data = await attemptSend(currentProxyIndex);
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
      console.error("Error sending message after all retries:", error);
      
      // Show error in UI and add error message to chat
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to connect to the chat service";
      
      setConnectionError(`Failed to connect after trying multiple proxies. ${errorMessage}`);
      
      setMessages(prev => [...prev, {
        id: `error-${messageId}`,
        text: "I'm sorry, I couldn't process your message right now. Please try again later or check your connection settings.",
        sender: "bot",
        timestamp: new Date()
      }]);
      
      toast({
        title: "Connection Error",
        description: `Failed to connect after trying ${maxAttempts} different proxies. Please check your webhook URL or try again later.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const retryConnection = async () => {
    setConnectionError(null);
    toast({
      title: "Retrying connection",
      description: "Attempting to reconnect to the chat service using a different proxy...",
    });
    
    const nextProxyIndex = getNextProxy();
    
    try {
      const proxiedUrl = CORS_PROXIES[nextProxyIndex](webhookUrl);
      console.log(`Testing connection with URL (Proxy ${nextProxyIndex + 1}/${CORS_PROXIES.length}):`, proxiedUrl);
      
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
        description: `Successfully connected to the chat service using proxy ${nextProxyIndex + 1}.`,
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

  const saveWebhookUrl = (newUrl: string) => {
    setWebhookUrl(newUrl);
    localStorage.setItem("tobey_webhook_url", newUrl);
    toast({
      title: "Settings Saved",
      description: "Webhook URL has been updated. The next message will use the new URL.",
    });
  };

  const resetToDefault = () => {
    setWebhookUrl(DEFAULT_WEBHOOK_URL);
    localStorage.setItem("tobey_webhook_url", DEFAULT_WEBHOOK_URL);
    toast({
      title: "Settings Reset",
      description: "Webhook URL has been reset to default.",
    });
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    connectionError,
    webhookUrl,
    sendMessage,
    retryConnection,
    saveWebhookUrl,
    resetToDefault
  };
}
