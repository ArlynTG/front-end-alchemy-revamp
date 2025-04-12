
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { MessageType } from "@/components/chat/ChatMessage";

export function useChatWithN8n(initialWebhookUrl: string) {
  const [chatHistory, setChatHistory] = useState<MessageType[]>([
    { text: "Hi there! I'm your Tobey AI assistant. How can I help you today?", sender: "ai" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(initialWebhookUrl);
  const [testingConnection, setTestingConnection] = useState(false);
  const { toast } = useToast();

  // Load webhook URL from localStorage on mount
  useEffect(() => {
    const savedWebhookUrl = localStorage.getItem("n8n_webhook_url");
    if (savedWebhookUrl) {
      setWebhookUrl(savedWebhookUrl);
    }
  }, []);

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
    console.log("Testing connection to URL:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "connection_test",
          history: []
        }),
      });

      console.log("Test connection response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Test connection successful response:", data);
        
        toast({
          title: "Connection Successful",
          description: "Successfully connected to your n8n workflow",
        });
      } else {
        const errorText = await response.text();
        console.error("Test connection error response:", errorText);
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
      
      // Log the actual URL being used
      console.log("Sending message to URL:", webhookUrl);
      
      // Detailed log of the payload for debugging
      console.log("Sending payload to n8n:", {
        prompt: message,
        history: chatHistory.map(msg => ({
          content: msg.text,
          role: msg.sender === "user" ? "user" : "assistant"
        }))
      });
      
      // Call n8n webhook with the correct payload structure
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: message,
          history: chatHistory.map(msg => ({
            content: msg.text,
            role: msg.sender === "user" ? "user" : "assistant"
          }))
        }),
      });
      
      console.log("Message response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from n8n:", errorText);
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      
      // Log the full response for debugging
      console.log("Received response from n8n:", data);
      
      // Handle different possible response formats
      let aiResponse = "";
      
      if (data.response) {
        aiResponse = data.response;
      } else if (data.message) {
        // Additional check for different response formats
        aiResponse = typeof data.message === 'string' ? data.message : 
                   (data.message.content ? data.message.content : JSON.stringify(data.message));
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        // For direct text response without wrapping
        aiResponse = typeof data === 'string' ? data : JSON.stringify(data);
      }
      
      // Add AI response to chat
      setChatHistory(prev => [...prev, {
        text: aiResponse,
        sender: "ai"
      }]);
    } catch (error) {
      console.error("Detailed error calling n8n workflow:", error);
      
      // More informative error message
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
        description: error instanceof Error ? error.message : "Unable to connect to the AI service",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chatHistory,
    isLoading,
    webhookUrl,
    testingConnection,
    handleUpdateWebhookUrl,
    testConnection,
    handleSendMessage
  };
}
