import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Define the n8n webhook URL
export const DEFAULT_WEBHOOK_URL = "https://n8n.tobeystutor.com/webhook/chat";

// No CORS proxies needed
const CORS_PROXIES: string[] = [];

// Define message types
export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const useChatWithWebhook = (reportText?: string | null) => {
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
  const [currentProxyIndex, setCurrentProxyIndex] = useState(CORS_PROXIES.length);
  const [threadId, setThreadId] = useState<string>(""); // ← new for threaded memory
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
        description:
          nextIndex >= CORS_PROXIES.length
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
      // Use direct webhook URL
      console.log("Sending message using URL:", webhookUrl);
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text, threadId }),
      });
      if (!response.ok) {
        console.error(`HTTP error ${response.status}`);
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from n8n:", data);

      // Store the returned threadId for follow‑ups
      if (data.threadId) {
        setThreadId(data.threadId);
      }

      // Use the reply field for the bot's text
      const botReply: string = data.reply ?? "I couldn't process that properly.";

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
      setConnectionError(
        `Failed to send message: ${err instanceof Error ? err.message : "Unknown error"}`
      );
      toast({
        title: "Error",
        description:
          "Failed to send message to Tobey AI. Please try again or check webhook URL.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save webhook URL
  const saveWebhookUrl = (url: string) => {
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
    resetToDefault,
  };
};
