
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";

const ChatDemo = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I'm Tobey's Tutor! I'm designed to help you learn in a way that works best for you. What would you like to explore today?"
    }
  ]);
  
  const [input, setInput] = useState("");
  
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    
    try {
      const response = await fetch('https://tobiasced2.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const botMessage = { role: 'assistant', content: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting. Please try again later." 
      }]);
    }
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
            <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
              <div className="text-xs font-bold text-white">T</div>
            </div>
            <div>
              <p className="font-medium">Tobey's Tutor</p>
              <p className="text-xs opacity-80">AI Learning Assistant</p>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="p-4 h-80 overflow-y-auto flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === "user" 
                      ? "bg-blue-100 text-gray-800 rounded-br-none" 
                      : "bg-tobey-orange/10 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          
          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about dinosaurs, math help, or reading strategies..."
                className="flex-1 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-tobey-orange"
              />
              <Button 
                onClick={sendMessage}
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
