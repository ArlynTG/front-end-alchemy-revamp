
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { sendMessageToOpenAI } from "@/utils/openaiService";

// Hardcoded API key for demo purposes
// In a production environment, this would be handled server-side
const DEMO_API_KEY = ""; // Add your API key here or handle in backend

// Type for chat messages
export type MessageType = {
  text: string;
  sender: "user" | "ai";
  isError?: boolean;
};

interface ChatInterfaceProps {
  apiKey?: string; // Making this optional since we'll use the hardcoded key
}

const ChatInterface = ({ apiKey }: ChatInterfaceProps) => {
  const [chatHistory, setChatHistory] = useState<MessageType[]>([
    { text: "Hi there! I'm your Tobey AI assistant. How can I help you today?", sender: "ai" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Use hardcoded key if no apiKey prop is provided
  const effectiveApiKey = apiKey || DEMO_API_KEY;

  // Scroll to bottom when chat history updates
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableArea = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableArea) {
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
      }
    }
  }, [chatHistory]);

  // Clear thread when unmounting
  useEffect(() => {
    return () => {
      // Clear the thread ID when component unmounts
      sessionStorage.removeItem("openai_thread_id");
    };
  }, []);

  const handleSendMessage = async (message: string) => {
    if (!effectiveApiKey) {
      toast({
        title: "API Connection Error",
        description: "Unable to connect to the AI service at this time.",
        variant: "destructive",
      });
      return;
    }

    // Add user message to chat
    const userMessage: MessageType = { text: message.trim(), sender: "user" };
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call OpenAI service
      const response = await sendMessageToOpenAI(effectiveApiKey, userMessage.text, chatHistory);
      
      // Add AI response to chat
      setChatHistory(prev => [...prev, {
        text: response || "Sorry, I couldn't process your request at this time.",
        sender: "ai"
      }]);
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      
      // Add error message to the chat
      const errorMessage = error instanceof Error 
        ? `Connection error: ${error.message}` 
        : "Unknown connection error";
      
      setChatHistory(prev => [...prev, {
        text: errorMessage,
        sender: "ai",
        isError: true
      }]);
      
      toast({
        title: "Connection Error",
        description: "There was an error connecting to the AI service. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ScrollArea ref={scrollAreaRef} className="h-96 p-4 bg-gray-50">
        <div className="space-y-4">
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} message={chat} />
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default ChatInterface;
