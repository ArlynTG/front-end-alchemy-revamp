
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export const useChatWebhook = () => {
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
      const response = await fetch("https://n8n.tobeystutor.com/webhook/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messageText,
          threadId: threadId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      
      if (jsonResponse.threadId) {
        setThreadId(jsonResponse.threadId);
      }
      
      let responseText = "";
      if (jsonResponse && jsonResponse.reply) {
        responseText = jsonResponse.reply;
      } else {
        responseText = JSON.stringify(jsonResponse);
      }
      
      const assistantMessage: Message = {
        role: "assistant",
        content: responseText,
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
