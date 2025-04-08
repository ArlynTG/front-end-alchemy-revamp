
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { sendMessageToOpenAI } from "@/utils/openaiService";

// Type for chat messages
export type MessageType = {
  text: string;
  sender: "user" | "ai";
  isError?: boolean;
};

interface ChatInterfaceProps {
  apiKey: string;
}

const ChatInterface = ({ apiKey }: ChatInterfaceProps) => {
  const [chatHistory, setChatHistory] = useState<MessageType[]>([
    { text: "Hi there! I'm your Tobey AI assistant. How can I help you today?", sender: "ai" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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
    if (!apiKey) {
      toast({
        title: "Missing OpenAI API Key",
        description: "Please enter your OpenAI API key below to connect the chat.",
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
      const response = await sendMessageToOpenAI(apiKey, userMessage.text, chatHistory);
      
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
        description: "There was an error connecting to OpenAI. Please check your API key and try again.",
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
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-200 text-gray-800 rounded-tl-none">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="font-medium text-sm">Tobey AI</div>
                </div>
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
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
