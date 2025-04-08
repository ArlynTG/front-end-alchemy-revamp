
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import ChatApiKeySection from "@/components/chat/ChatApiKeySection";
import { sendMessageToOpenAI } from "@/utils/openaiService";
import { ASSISTANT_ID, setAssistantId } from "@/utils/openaiApi";

// Type for chat messages
export type MessageType = {
  text: string;
  sender: "user" | "ai";
  isError?: boolean;
};

const ChatInterface = () => {
  const [chatHistory, setChatHistory] = useState<MessageType[]>([
    { text: "Hi there! I'm your Tobey AI assistant. How can I help you today?", sender: "ai" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [assistantId, setLocalAssistantId] = useState(ASSISTANT_ID);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load API key and assistant ID from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    const savedAssistantId = localStorage.getItem("openai_assistant_id");
    if (savedAssistantId) {
      setLocalAssistantId(savedAssistantId);
      setAssistantId(savedAssistantId);
    }
  }, []);

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

  const handleUpdateAssistantId = (id: string) => {
    setLocalAssistantId(id);
    setAssistantId(id);
    localStorage.setItem("openai_assistant_id", id);
    toast({
      title: "Assistant ID Updated",
      description: "Your OpenAI Assistant ID has been saved successfully.",
    });
  };

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    const userMessage: MessageType = { text: message.trim(), sender: "user" };
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Check if API key is provided
      if (!apiKey) {
        throw new Error("Please enter your OpenAI API key first");
      }
      
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
        ? `I'm sorry, I couldn't process your request: ${error.message}` 
        : "I'm sorry, I couldn't process your request right now.";
      
      setChatHistory(prev => [...prev, {
        text: errorMessage,
        sender: "ai",
        isError: true
      }]);
      
      toast({
        title: "Connection Error",
        description: "There was an error processing your message. Please try again later.",
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
        
        <ChatApiKeySection 
          apiKey={apiKey} 
          setApiKey={setApiKey} 
          assistantId={assistantId}
          setAssistantId={handleUpdateAssistantId}
        />
      </div>
    </>
  );
};

export default ChatInterface;
