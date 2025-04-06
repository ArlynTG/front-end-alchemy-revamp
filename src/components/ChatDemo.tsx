import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const ChatDemo = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I'm Tobey's Tutor! I'm designed to help you learn in a way that works best for you. What would you like to explore today?"
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openAIKey, setOpenAIKey] = useState("");
  const [assistantId, setAssistantId] = useState("");
  const [showSetup, setShowSetup] = useState(true);
  const { toast } = useToast();
  
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      if (!openAIKey || !assistantId) {
        throw new Error("Please provide your OpenAI key and Assistant ID");
      }
      
      // First, create a thread if none exists
      const threadResponse = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`,
          'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({}),
      });
      
      if (!threadResponse.ok) {
        throw new Error('Failed to create thread');
      }
      
      const threadData = await threadResponse.json();
      const threadId = threadData.id;
      
      // Add message to thread
      const messageResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`,
          'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
          role: 'user',
          content: input
        }),
      });
      
      if (!messageResponse.ok) {
        throw new Error('Failed to add message');
      }
      
      // Run the assistant
      const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`,
          'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
          assistant_id: assistantId
        }),
      });
      
      if (!runResponse.ok) {
        throw new Error('Failed to run assistant');
      }
      
      const runData = await runResponse.json();
      const runId = runData.id;
      
      // Poll for completion
      let runStatus = 'in_progress';
      
      while (runStatus === 'in_progress' || runStatus === 'queued') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const runCheckResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${openAIKey}`,
            'OpenAI-Beta': 'assistants=v2'
          },
        });
        
        if (!runCheckResponse.ok) {
          throw new Error('Failed to check run status');
        }
        
        const runCheckData = await runCheckResponse.json();
        runStatus = runCheckData.status;
      }
      
      // Get messages
      const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${openAIKey}`,
          'OpenAI-Beta': 'assistants=v2'
        },
      });
      
      if (!messagesResponse.ok) {
        throw new Error('Failed to get messages');
      }
      
      const messagesData = await messagesResponse.json();
      const assistantMessage = messagesData.data.find(msg => msg.role === 'assistant');
      
      if (assistantMessage) {
        const botMessage = { 
          role: 'assistant', 
          content: assistantMessage.content[0].text.value 
        };
        
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      // Add error message to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error.message || "I'm having trouble connecting. Please try again later."}` 
      }]);
      toast({
        title: "Error",
        description: error.message || "Failed to connect to OpenAI",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSetup = () => {
    if (!openAIKey || !assistantId) {
      toast({
        title: "Error",
        description: "Please provide both your OpenAI key and Assistant ID",
        variant: "destructive"
      });
      return;
    }
    
    // Store in localStorage for persistence
    localStorage.setItem('openai_key', openAIKey);
    localStorage.setItem('assistant_id', assistantId);
    setShowSetup(false);
    toast({
      title: "Success",
      description: "OpenAI credentials set successfully",
    });
  };
  
  // Load credentials from localStorage on component mount
  useEffect(() => {
    const savedKey = localStorage.getItem('openai_key');
    const savedAssistantId = localStorage.getItem('assistant_id');
    
    if (savedKey && savedAssistantId) {
      setOpenAIKey(savedKey);
      setAssistantId(savedAssistantId);
      setShowSetup(false);
    }
  }, []);
  
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
        
        {showSetup ? (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h3 className="text-xl font-bold mb-4">Setup OpenAI Integration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OpenAI API Key
                </label>
                <Input
                  type="password"
                  value={openAIKey}
                  onChange={(e) => setOpenAIKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" className="text-tobey-orange">OpenAI dashboard</a>
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assistant ID
                </label>
                <Input
                  type="text"
                  value={assistantId}
                  onChange={(e) => setAssistantId(e.target.value)}
                  placeholder="asst_..."
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Get your Assistant ID from <a href="https://platform.openai.com/assistants" target="_blank" rel="noreferrer" className="text-tobey-orange">OpenAI Assistants</a>
                </p>
              </div>
              
              <Button 
                onClick={handleSetup}
                className="w-full btn-primary mt-4"
              >
                Save and Continue
              </Button>
              
              <p className="text-xs text-gray-500 mt-4">
                Your credentials are stored locally in your browser and never sent to our servers.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {/* Chat Header */}
            <div className="bg-tobey-orange text-white p-4 flex items-center gap-3 justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                  <div className="text-xs font-bold text-white">T</div>
                </div>
                <div>
                  <p className="font-medium">Tobey's Tutor</p>
                  <p className="text-xs opacity-80">AI Learning Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-white hover:bg-tobey-orange/80 h-8 text-xs"
                onClick={() => setShowSetup(true)}
              >
                Change API Keys
              </Button>
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
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-tobey-orange/10 text-gray-800 rounded-bl-none">
                    <div className="flex gap-2">
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
                  placeholder="Ask about dinosaurs, math help, or reading strategies..."
                  className="flex-1 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-tobey-orange"
                  disabled={isLoading}
                />
                <Button 
                  onClick={sendMessage}
                  className="btn-primary"
                  disabled={isLoading}
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatDemo;
