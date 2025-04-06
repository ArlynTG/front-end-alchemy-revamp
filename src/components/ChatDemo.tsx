
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const ChatDemo = () => {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://tobeys-tutor-demo.fly.dev/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        // If the response is not OK, throw an error with the status
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error('Failed to send message', {
        description: err instanceof Error ? err.message : 'Unknown error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-16 md:py-24 bg-white">
      <div className="container">
        <span className="section-tag">Demo</span>
        
        <h2 className="section-title">Chat with Tobey</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Wondering how all this AI works? What's a tutoring session look like? How is progress measured? Just ask!
        </p>
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <ScrollArea 
            className="h-[300px] mb-4 p-4 rounded-md border"
            ref={chatContainerRef}
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`mb-3 p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-tobey-blue/10 ml-auto max-w-[80%]' 
                    : 'bg-tobey-orange/10 mr-auto max-w-[80%]'
                }`}
              >
                <p className="text-sm font-medium mb-1">
                  {msg.role === 'user' ? 'You' : 'Tobey'}
                </p>
                <p className="text-gray-700">{msg.content}</p>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-gray-500 italic">
                <div className="animate-pulse">Tobey is thinking</div>
                <div className="animate-bounce delay-100">.</div>
                <div className="animate-bounce delay-200">.</div>
                <div className="animate-bounce delay-300">.</div>
              </div>
            )}
            {messages.length === 0 && !loading && (
              <div className="h-full flex items-center justify-center text-gray-400 italic">
                Your conversation with Tobey will appear here
              </div>
            )}
          </ScrollArea>
          
          <div className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask Tobey something..."
              className="flex-1"
            />
            <Button 
              className="btn-primary"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;

