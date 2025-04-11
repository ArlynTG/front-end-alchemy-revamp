
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  content: string;
  isUser: boolean;
  timestamp: Date;
};

const DemoV2 = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { toast } = useToast();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Add initial greeting message
  useEffect(() => {
    setMessages([
      {
        content: "Hi there! I'm your Tobey AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setHasError(false);
    
    try {
      const response = await fetch("https://tobiasedtech.app.n8n.cloud/webhook-test/faq-chat-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: inputMessage
        })
      });
      
      const data = await response.json();
      console.log("n8n replied:", data);
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to get response");
      }
      
      const aiMessage = {
        content: data.reply || "I'm sorry, I couldn't process that request.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error:", err);
      setHasError(true);
      
      const errorMessage = {
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Failed to connect to the AI service. It might be temporarily unavailable.",
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <span className="section-tag block text-left">Try it</span>
            <h2 className="section-title mb-4">
              <strong>Experience Tobey In Action</strong>
            </h2>
            <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Interact directly with our AI tutor through this live demo interface.
            </p>
            
            {hasError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Connection Error</AlertTitle>
                <AlertDescription>
                  There was a problem connecting to the AI service. The service might be temporarily unavailable.
                </AlertDescription>
              </Alert>
            )}
            
            <Card className="overflow-hidden shadow-xl border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col h-[600px]">
                  <ScrollArea className="flex-grow mb-4 p-4 bg-gray-50 rounded-md">
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <div 
                          key={index}
                          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                              message.isUser
                                ? 'bg-tobey-orange text-white rounded-tr-none'
                                : 'bg-gray-200 text-gray-800 rounded-tl-none'
                            }`}
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              {message.isUser ? (
                                <div className="font-medium text-sm text-right w-full">You</div>
                              ) : (
                                <div className="font-medium text-sm">Tobey AI</div>
                              )}
                            </div>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  <div className="flex space-x-2">
                    <Textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
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
                      disabled={!inputMessage.trim() || isLoading}
                    >
                      {isLoading ? (
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <SendHorizontal className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 text-sm text-gray-500 text-center">
              <p>If you're experiencing issues with the demo, please try refreshing the page or visit again later.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DemoV2;
