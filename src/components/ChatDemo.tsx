
import React, { useState, useRef, useEffect } from "react";
import { sendMessageToWorkflow } from "@/utils/n8nService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChatMessage {
  text: string;
  sender: "user" | "ai";
  isError?: boolean;
}

const ChatDemo = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hello! I'm Tobey's Tutor AI assistant. How can I help you today?", sender: "ai" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Webhook URL for the n8n workflow
  const WEBHOOK_URL = "https://tobiasedtech.app.n8n.cloud/webhook/eb528532-1df2-4d01-924e-69fb7b29dc25/chat";

  // Auto-scroll to the bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to chat
    const userMessage = { text: userInput.trim(), sender: "user" as const };
    setMessages(prev => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      // Send message to n8n workflow
      const response = await sendMessageToWorkflow(
        WEBHOOK_URL,
        userMessage.text,
        messages
      );

      // Add AI response to chat
      setMessages(prev => [
        ...prev,
        { text: response.response, sender: "ai" }
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [
        ...prev,
        { 
          text: "Sorry, I encountered an error. Please try again later.", 
          sender: "ai", 
          isError: true 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="demo" className="py-16 md:py-24 bg-white">
      <div className="container">
        <span className="section-tag">Ask Questions</span>
        
        <h2 className="section-title">Chat with Tobey's Tutor</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Have questions about our AI tutoring? Try out our demo chat and see how our AI assistant can help!
        </p>
        
        <div className="max-w-2xl mx-auto">
          <Card className="border-gray-200 shadow-md">
            <CardHeader className="bg-tobey-blue/20 border-b border-gray-200">
              <CardTitle className="text-center text-lg font-medium">
                Demo Chat
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Chat messages container */}
              <div 
                ref={chatContainerRef}
                className="h-80 overflow-y-auto p-4 space-y-4"
              >
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.sender === "user" 
                          ? "bg-tobey-orange text-white rounded-br-none" 
                          : msg.isError 
                            ? "bg-red-100 text-red-800 rounded-bl-none" 
                            : "bg-tobey-blue/20 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-tobey-blue/20 text-gray-800 rounded-lg rounded-bl-none px-4 py-2 flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "200ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "400ms" }}></div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Chat input */}
              <div className="border-t border-gray-200 p-4 flex gap-2">
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message here..."
                  className="resize-none min-h-[60px]"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !userInput.trim()}
                  className="bg-tobey-orange hover:bg-tobey-darkOrange self-end"
                >
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
