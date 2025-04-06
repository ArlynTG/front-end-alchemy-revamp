import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const ChatDemo = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      content: "Hi, I'm Tobey's Tutor! I'm designed to help you learn in a way that works best for you. What would you like to explore today?"
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages([...messages, { sender: "user", content: inputValue }]);
    setInputValue("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          sender: "bot", 
          content: "That's a great question about dinosaurs! The Tyrannosaurus Rex lived during the late Cretaceous Period, about 68-66 million years ago. Would you like to learn more about prehistoric creatures or explore a different topic?"
        }
      ]);
    }, 1000);
  };
  
  return (
    <section id="demo" className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="flex items-start justify-start mb-10">
          <Button className="btn-primary">Demo</Button>
        </div>
        
        <h2 className="section-title">Got Questions?</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Wondering how all this AI works? What's a tutoring session look like? How is progress measured? Just ask!
        </p>
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Chat Header */}
          <div className="bg-tobey-orange text-white p-4 flex items-center gap-3">
            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-tobey-orange font-bold">T</span>
            </div>
            <div>
              <p className="font-medium">Tobey's Tutor</p>
              <p className="text-xs opacity-80">AI Learning Assistant</p>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="p-4 h-80 overflow-y-auto flex flex-col gap-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user" 
                      ? "bg-blue-100 text-gray-800 rounded-br-none" 
                      : "bg-tobey-orange/10 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          
          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about dinosaurs, math help, or reading strategies..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-tobey-orange"
              />
              <Button 
                onClick={handleSendMessage}
                className="btn-primary"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
