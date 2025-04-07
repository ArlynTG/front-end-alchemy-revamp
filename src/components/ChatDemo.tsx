
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import WorkflowUrlForm from "@/components/chat/WorkflowUrlForm";
import { sendMessageToWorkflow, testWorkflowConnection } from "@/utils/n8nService";

// Type for chat messages
type MessageType = {
  text: string;
  sender: "user" | "ai";
  isError?: boolean;
};

const ChatDemo = () => {
  const [chatHistory, setChatHistory] = useState<MessageType[]>([
    { text: "Hi there! How can I help with your questions about Tobey AI tutoring?", sender: "ai" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [n8nUrl, setN8nUrl] = useState<string>("");
  const [testInProgress, setTestInProgress] = useState(false);
  const { toast } = useToast();

  // Load saved URL on component mount
  useEffect(() => {
    const savedUrl = localStorage.getItem("n8nUrl");
    if (savedUrl) {
      setN8nUrl(savedUrl);
    }
  }, []);

  const saveN8nUrl = (url: string) => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a valid n8n workflow URL",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(url); // Validate URL format
      localStorage.setItem("n8nUrl", url);
      setN8nUrl(url);
      toast({
        title: "URL Saved",
        description: "Your n8n workflow URL has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL format",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!n8nUrl) {
      toast({
        title: "Missing n8n Workflow URL",
        description: "Please enter your n8n workflow webhook URL below to connect the chat.",
        variant: "destructive",
      });
      return;
    }

    // Add user message to chat
    const userMessage: MessageType = { text: message.trim(), sender: "user" };
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call n8n webhook service
      const data = await sendMessageToWorkflow(n8nUrl, userMessage.text, chatHistory);
      
      // Add AI response to chat
      setChatHistory(prev => [...prev, {
        text: data.response || "Sorry, I couldn't process your request at this time.",
        sender: "ai"
      }]);
    } catch (error) {
      console.error("Error calling n8n workflow:", error);
      
      // Add more detailed error message to the chat
      const errorMessage = error instanceof Error 
        ? `Connection error: ${error.message}` 
        : "Unknown connection error";
      
      setChatHistory(prev => [...prev, {
        text: `${errorMessage}. Your n8n workflow returned a 500 error, which usually indicates an issue within the workflow itself. Please check your workflow configuration, webhook node settings, and any error logs in n8n.`,
        sender: "ai",
        isError: true
      }]);
      
      toast({
        title: "Connection Error (500)",
        description: "Your n8n workflow returned a server error. Please check your workflow configuration in n8n.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    if (!n8nUrl) {
      toast({
        title: "Missing URL",
        description: "Please enter an n8n workflow URL before testing the connection.",
        variant: "destructive",
      });
      return;
    }

    setTestInProgress(true);
    try {
      await testWorkflowConnection(n8nUrl);
      
      toast({
        title: "Connection Successful",
        description: "Successfully connected to your n8n workflow.",
      });
    } catch (error) {
      console.error("Connection test failed:", error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error 
          ? error.message 
          : "Unknown error occurred while testing the connection",
        variant: "destructive",
      });
    } finally {
      setTestInProgress(false);
    }
  };

  return (
    <section id="demo" className="py-16 md:py-24 bg-white">
      <div className="container">
        <span className="section-tag">FAQ</span>
        
        <h2 className="section-title">Got Questions?</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Wondering how all this AI works? What's a tutoring session look like? How is progress measured?
        </p>
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <ScrollArea className="h-96 p-4 bg-gray-50">
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
            
            <WorkflowUrlForm
              initialUrl={n8nUrl}
              onSaveUrl={saveN8nUrl}
              onTestConnection={testConnection}
              testInProgress={testInProgress}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
