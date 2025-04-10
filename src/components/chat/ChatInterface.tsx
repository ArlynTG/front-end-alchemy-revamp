
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import WorkflowUrlForm from "@/components/chat/WorkflowUrlForm";

// Type for chat messages
type MessageType = {
  text: string;
  sender: "user" | "ai";
  isError?: boolean;
};

const WEBHOOK_URL = "https://tobiasedtech.app.n8n.cloud/webhook/eb528532-1df2-4d01-924e-69fb7b29dc25/chat";

const ChatInterface = () => {
  const [chatHistory, setChatHistory] = useState<MessageType[]>([
    { text: "Hi there! I'm your Tobey AI assistant. How can I help you today?", sender: "ai" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(WEBHOOK_URL);
  const [testingConnection, setTestingConnection] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load webhook URL from localStorage on mount
  useEffect(() => {
    const savedWebhookUrl = localStorage.getItem("n8n_webhook_url");
    if (savedWebhookUrl) {
      setWebhookUrl(savedWebhookUrl);
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

  const handleUpdateWebhookUrl = (url: string) => {
    setWebhookUrl(url);
    localStorage.setItem("n8n_webhook_url", url);
    toast({
      title: "Webhook URL Updated",
      description: "Your n8n workflow URL has been saved.",
    });
  };

  const testConnection = async () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a webhook URL first",
        variant: "destructive",
      });
      return;
    }

    setTestingConnection(true);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Hello, this is a test message",
          history: []
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Connection Successful",
          description: "Successfully connected to your n8n workflow",
        });
      } else {
        const errorText = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error("Error testing connection:", error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error 
          ? error.message 
          : "Failed to connect to the workflow",
        variant: "destructive",
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage: MessageType = { text: message.trim(), sender: "user" };
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Check if webhook URL is provided
      if (!webhookUrl) {
        throw new Error("Please enter your n8n webhook URL first");
      }
      
      // Format history for the n8n workflow
      const history = chatHistory.map(msg => ({
        content: msg.text,
        role: msg.sender === "user" ? "user" : "assistant"
      }));
      
      // Call n8n webhook
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          history: history
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      
      if (!data.response) {
        throw new Error("Invalid response from the workflow");
      }
      
      // Add AI response to chat
      setChatHistory(prev => [...prev, {
        text: data.response,
        sender: "ai"
      }]);
    } catch (error) {
      console.error("Error calling n8n workflow:", error);
      
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
        description: "There was an error processing your message. Please check the workflow URL.",
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
        
        <WorkflowUrlForm 
          initialUrl={webhookUrl} 
          onSaveUrl={handleUpdateWebhookUrl}
          onTestConnection={testConnection}
          testInProgress={testingConnection}
        />
      </div>
    </>
  );
};

export default ChatInterface;
