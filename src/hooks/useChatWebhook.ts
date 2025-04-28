
import { useState, useCallback, useRef } from "react";
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
  const threadIdRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { toast } = useToast();

  // Memoized text formatter to avoid recreation on each render
  const formatMessageText = useCallback((text: string): string => {
    return text
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'");
  }, []);

  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText || isLoading) return;

    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const userMessage: Message = {
      role: "user",
      content: messageText,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setError(null);
    
    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();
    
    try {
      const response = await fetch("https://v0-new-project-ea6ovpm0brm.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: messageText, 
          threadId: threadIdRef.current, 
          reportText 
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.threadId) {
        threadIdRef.current = data.threadId;
      }
      
      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "I couldn't process that properly.",
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Only show error if it's not due to an abort
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        console.error("Error sending message:", error);
        setError("Failed to connect to the chat service. Please try again later.");
        
        toast({
          title: "Connection Error",
          description: "Could not connect to the chat service.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [isLoading, reportText, toast]);

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
