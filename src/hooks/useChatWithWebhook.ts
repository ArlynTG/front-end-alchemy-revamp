
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Define the n8n webhook URL
export const DEFAULT_WEBHOOK_URL = "https://tobiasedtech.app.n8n.cloud/webhook/eb528532-1df2-4d01-924e-69fb7b29dc25/chat";

// Available CORS proxies for fallback
const CORS_PROXIES = [
  "https://corsproxy.io/?",
  "https://api.allorigins.win/raw?url=",
  "https://cors-anywhere.herokuapp.com/"
];

// Define message types
export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const useChatWithWebhook = () => {
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
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState(DEFAULT_WEBHOOK_URL);
  const [currentProxyIndex, setCurrentProxyIndex] = useState(0);
  const { toast } = useToast();

  // Function to get a proxied URL
  const getProxiedUrl = (url: string, proxyIndex: number) => {
    if (proxyIndex >= CORS_PROXIES.length) {
      // If we've tried all proxies, try direct connection
      return url;
    }
    return `${CORS_PROXIES[proxyIndex]}${encodeURIComponent(url)}`;
  };

  // Try the next proxy if available
  const retryConnection = () => {
    const nextIndex = currentProxyIndex + 1;
    if (nextIndex <= CORS_PROXIES.length) {
      setCurrentProxyIndex(nextIndex);
      toast({
        title: "Trying different proxy",
        description: nextIndex >= CORS_PROXIES.length 
          ? "Trying direct connection" 
          : `Using proxy ${nextIndex + 1} of ${CORS_PROXIES.length}`,
      });
      setConnectionError(null);
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
    setConnectionError(null);

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
          prompt: userMessage.text,
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
      setConnectionError(`Failed to send message: ${err instanceof Error ? err.message : "Unknown error"}`);
      
      if (currentProxyIndex < CORS_PROXIES.length) {
        // Don't automatically retry to avoid confusion
        // Just show the error message with retry option
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

  // Save webhook URL
  const saveWebhookUrl = (url: string) => {
    // Reset proxy index when URL changes
    setCurrentProxyIndex(0);
    setWebhookUrl(url);
    localStorage.setItem("n8n_webhook_url", url);
    toast({
      title: "Settings updated",
      description: "Webhook URL has been updated.",
    });
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
};
