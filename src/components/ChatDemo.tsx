
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ChatDemo = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{text: string, sender: "user" | "ai", isError?: boolean}>>([
    { text: "Hi there! How can I help with your questions about Tobey AI tutoring?", sender: "ai" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [n8nUrl, setN8nUrl] = useState<string>("");
  const { toast } = useToast();

  // Load saved URL on component mount
  useEffect(() => {
    const savedUrl = localStorage.getItem("n8nUrl");
    if (savedUrl) {
      setN8nUrl(savedUrl);
    }
  }, []);

  const saveN8nUrl = (url: string) => {
    localStorage.setItem("n8nUrl", url);
    setN8nUrl(url);
    toast({
      title: "URL Saved",
      description: "Your n8n workflow URL has been saved successfully.",
    });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    if (!n8nUrl) {
      toast({
        title: "Missing n8n Workflow URL",
        description: "Please enter your n8n workflow webhook URL below to connect the chat.",
        variant: "destructive",
      });
      return;
    }

    // Add user message to chat
    const userMessage = { text: message.trim(), sender: "user" as const };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      console.log("Sending request to n8n workflow:", n8nUrl);
      console.log("Payload:", {
        message: userMessage.text,
        history: chatHistory.map(entry => ({
          role: entry.sender === "ai" ? "assistant" : "user",
          content: entry.text
        }))
      });

      // Call n8n webhook
      const response = await fetch(n8nUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.text,
          history: chatHistory.map(entry => ({
            role: entry.sender === "ai" ? "assistant" : "user",
            content: entry.text
          }))
        }),
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
      
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
        text: `${errorMessage}. Please check your n8n workflow URL and ensure your workflow is properly configured to receive and respond to messages.`,
        sender: "ai",
        isError: true
      }]);
      
      toast({
        title: "Connection Error",
        description: "Failed to connect to your n8n workflow. Please check the URL and your workflow configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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

    setIsLoading(true);
    try {
      const response = await fetch(n8nUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "test_connection",
          history: []
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Try to parse the response
      await response.json();

      toast({
        title: "Connection Successful",
        description: "Successfully connected to your n8n workflow.",
      });
    } catch (error) {
      console.error("Connection test failed:", error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
                <div 
                  key={index} 
                  className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      chat.sender === 'user' 
                        ? 'bg-tobey-orange text-white rounded-tr-none' 
                        : chat.isError
                          ? 'bg-red-100 text-red-800 rounded-tl-none'
                          : 'bg-gray-200 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {chat.sender === 'ai' ? (
                        <div className="font-medium text-sm">Tobey AI</div>
                      ) : (
                        <div className="font-medium text-sm text-right w-full">You</div>
                      )}
                    </div>
                    <p className="text-sm">{chat.text}</p>
                  </div>
                </div>
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
            <div className="flex space-x-2">
              <Textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question here..."
                className="flex-1 resize-none border-gray-300 focus:border-tobey-orange focus:ring-tobey-orange"
                rows={1}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-tobey-orange hover:bg-tobey-darkOrange text-white"
                type="submit"
                disabled={!message.trim() || isLoading}
              >
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-4">
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <Info className="h-3 w-3" /> n8n Workflow URL:
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={n8nUrl}
                  onChange={(e) => setN8nUrl(e.target.value)}
                  placeholder="Enter your n8n workflow webhook URL here"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-xs"
                />
                <Button 
                  onClick={() => saveN8nUrl(n8nUrl)}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  Save
                </Button>
                <Button 
                  onClick={testConnection}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  Test
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your n8n workflow should accept a message and history and return a response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;

