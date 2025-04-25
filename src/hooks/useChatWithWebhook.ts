import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

// Define the n8n webhook URL (with workflow ID) so thread is correctly routed
export const DEFAULT_WEBHOOK_URL = "https://n8n.tobeystutor.com:5678/webhook/chat";

// Available CORS proxies for fallback (direct first)
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
  // useRef to store threadId for threaded conversations
  const threadIdRef = useRef<string | null>(null);
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
    toast({
      title: "Trying different proxy",
      description: "Trying direct connection",
    });
    setConnectionError(null);
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
      console.log("Attempting fetch on direct URL");
      // Retrieve stored threadId
      const storedId = localStorage.getItem("tt_threadId")?.trim() || "";
      // Build payload with stored threadId if available
      const payload: { message: string; threadId?: string } = { message: userMessage.text };
      if (storedId) {
        payload.threadId = storedId;
      }
      // Only try direct URL
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      // Parse JSON response
      const data = await response.json();
      console.log("Response from n8n:", data);

      // Store the returned threadId for follow-ups
      if (data.threadId) {
        localStorage.setItem("tt_threadId", data.threadId.trim());
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
    localStorage.removeItem("n8n_webhook_url");
    toast({
      title: "Settings reset",
      description: "Webhook URL has been reset to default.",
    });
  };

  // Load webhook URL from localStorage on mount, but only accept it if it matches the workflow ID
  useEffect(() => {
    const savedUrl = localStorage.getItem("n8n_webhook_url");
    if (savedUrl && savedUrl.includes("/eb528532-1df2-4d01-924e-69fb7b29dc25/chat")) {
      setWebhookUrl(savedUrl);
    } else {
      localStorage.removeItem("n8n_webhook_url");
      setWebhookUrl(DEFAULT_WEBHOOK_URL);
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
