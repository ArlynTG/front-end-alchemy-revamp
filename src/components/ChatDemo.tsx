
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { PaperPlaneIcon, User2Icon } from "lucide-react";

const ChatDemo = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{text: string, sender: "user" | "ai"}>>([
    { text: "Hi there! How can I help with your questions about Tobey AI tutoring?", sender: "ai" }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message to chat
      setChatHistory([...chatHistory, { text: message, sender: "user" }]);
      
      // Clear input field
      setMessage("");
      
      // Simulating response for now - later this will be replaced with webhook call
      setTimeout(() => {
        setChatHistory(prev => [...prev, {
          text: "This is a placeholder response. In the future, this will be connected to an actual API.",
          sender: "ai"
        }]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
          {/* Chat messages area */}
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
            </div>
          </ScrollArea>
          
          {/* Message input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <Textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question here..."
                className="flex-1 resize-none border-gray-300 focus:border-tobey-orange focus:ring-tobey-orange"
                rows={1}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-tobey-orange hover:bg-tobey-darkOrange text-white"
                type="submit"
                disabled={!message.trim()}
              >
                <PaperPlaneIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
