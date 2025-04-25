import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export const useChatWebhook = (reportText?: string | null) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I'm here to help...",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const { toast } = useToast();
  const CORS_PROXIES = [
    "https://corsproxy.io/?",
    "https://api.allorigins.win/raw?url=",
    "https://cors-anywhere.herokuapp.com/",
  ];

  const formatMessageText = (text: string): string => {
    return text
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'");
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setError(null);

    try {
      const webhookUrl = "https://n8n.tobeystutor.com/webhook/chat";
      const urlsToTry = CORS_PROXIES.map(proxy => `${proxy}${encodeURIComponent(webhookUrl)}`).concat(webhookUrl);
      let response: Response | undefined;
      let lastError: any;
      for (const url of urlsToTry) {
        try {
          response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: messageText, threadId, reportText }),
          });
          if (response.ok) break;
          lastError = new Error(`HTTP error! Status: ${response.status}`);
        } catch (err) {
          lastError = err;
        }
      }
      if (!response || !response.ok) {
        throw lastError || new Error("Unknown error");
      }
      const jsonResponse = await response.json();
      
      if (jsonResponse.threadId) {
        setThreadId(jsonResponse.threadId);
      }
      
      const assistantMessage: Message = {
        role: "assistant",
        content: jsonResponse.reply || "I couldn't process that response.",
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

  return {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    error,
    sendMessage,
    formatMessageText
  };
};

