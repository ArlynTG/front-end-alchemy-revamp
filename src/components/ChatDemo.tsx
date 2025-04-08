
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { sendMessageToOpenAI, testOpenAIConnection } from "@/utils/openaiService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyIcon, Loader2 } from "lucide-react";

// Type for chat messages
type MessageType = {
  text: string;
  sender: "user" | "ai";
  isError?: boolean;
};

const ChatDemo = () => {
  const [chatHistory, setChatHistory] = useState<MessageType[]>([
    { text: "Hi there! I'm your Tobey AI assistant. How can I help you today?", sender: "ai" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [testInProgress, setTestInProgress] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load saved API key on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
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

  const saveApiKey = (key: string) => {
    if (!key.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("openai_api_key", key);
    setApiKey(key);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved successfully.",
    });
  };

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

  const testConnection = async () => {
    if (!apiKey) {
      toast({
        title: "Missing API Key",
        description: "Please enter your OpenAI API key before testing the connection.",
        variant: "destructive",
      });
      return;
    }

    setTestInProgress(true);
    try {
      await testOpenAIConnection(apiKey);
      
      toast({
        title: "Connection Successful",
        description: "Successfully connected to your OpenAI Assistant.",
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
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <KeyIcon className="w-4 h-4 mr-1" /> OpenAI API Key
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your OpenAI API key"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="whitespace-nowrap"
                  >
                    {showApiKey ? "Hide" : "Show"}
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => saveApiKey(apiKey)}
                    className="bg-tobey-orange hover:bg-tobey-darkOrange text-white"
                    size="sm"
                  >
                    Save Key
                  </Button>
                  <Button
                    onClick={testConnection}
                    variant="outline"
                    size="sm"
                    disabled={testInProgress}
                  >
                    {testInProgress ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" /> Testing...
                      </>
                    ) : (
                      "Test Connection"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Your API key is stored only in your browser's local storage and is never sent to our servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
