
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
        await response.json();
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
      
      // Extract the AI response based on the structure returned from n8n
      let aiResponse = "";
      
      // Check for OpenAI format with message.content
      if (data.message && data.message.content) {
        aiResponse = data.message.content;
      }
      // Check for simple response format
      else if (data.response) {
        aiResponse = data.response;
      }
      // Check for OpenAI completion format (with array)
      else if (data.index !== undefined && data.message && data.message.content) {
        aiResponse = data.message.content;
      }
      else {
        console.log("Unexpected response format:", data);
        throw new Error("Invalid response format from the workflow");
      }
      
      // Add AI response to chat
      setChatHistory(prev => [...prev, {
        text: aiResponse,
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
