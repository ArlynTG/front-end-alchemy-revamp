
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const DEFAULT_WEBHOOK_URL = "https://tobiasedtech.app.n8n.cloud/webhook/eb528532-1df2-4d01-924e-69fb7b29dc25/chat";

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
  
  const { toast } = useToast();

  const applyCorsProxy = (url: string) => {
    // Check if the URL already has a CORS proxy
    if (url.includes("corsproxy.io")) {
      return url;
    }
    
    // Try multiple CORS proxies to increase chances of success
    // Option 1: corsproxy.io
    return `https://corsproxy.io/?${encodeURIComponent(url)}`;
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

  const saveWebhookUrl = (newUrl: string) => {
    setWebhookUrl(newUrl);
    localStorage.setItem("tobey_webhook_url", newUrl);
    toast({
      title: "Settings Saved",
      description: "Webhook URL has been updated.",
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
