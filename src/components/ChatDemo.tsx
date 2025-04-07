
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Info, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const urlSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }).min(1, { message: "URL is required" }),
});

const ChatDemo = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{text: string, sender: "user" | "ai", isError?: boolean}>>([
    { text: "Hi there! How can I help with your questions about Tobey AI tutoring?", sender: "ai" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [n8nUrl, setN8nUrl] = useState<string>("");
  const [testInProgress, setTestInProgress] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
    },
  });

  // Load saved URL on component mount
  useEffect(() => {
    const savedUrl = localStorage.getItem("n8nUrl");
    if (savedUrl) {
      setN8nUrl(savedUrl);
      form.setValue("url", savedUrl);
    }
  }, [form]);

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
        const errorData = await response.text();
        console.error("Error response body:", errorData);
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const testConnection = async () => {
    const url = form.getValues().url || n8nUrl;
    
    if (!url) {
      toast({
        title: "Missing URL",
        description: "Please enter an n8n workflow URL before testing the connection.",
        variant: "destructive",
      });
      return;
    }

    setTestInProgress(true);
    try {
      console.log("Testing connection to:", url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "test_connection",
          history: []
        }),
      });

      console.log("Test response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Test error response:", errorText);
        
        if (response.status === 500) {
          throw new Error(`Server error (500): This usually indicates a problem within the n8n workflow itself.`);
        } else {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
      }

      // Try to parse the response
      const data = await response.json();
      console.log("Test response data:", data);

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

  const onUrlSubmit = (values: z.infer<typeof urlSchema>) => {
    saveN8nUrl(values.url);
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
            
            <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-500" /> 
                <h3 className="text-sm font-medium">n8n Workflow Connection</h3>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onUrlSubmit)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">n8n Webhook URL</FormLabel>
                        <div className="flex space-x-2">
                          <FormControl>
                            <input
                              placeholder="Enter your n8n workflow webhook URL here"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs"
                              {...field}
                            />
                          </FormControl>
                          <Button 
                            type="submit"
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            Save
                          </Button>
                          <Button 
                            type="button"
                            onClick={testConnection}
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            disabled={testInProgress}
                          >
                            {testInProgress ? "Testing..." : "Test"}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>

              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <div className="flex gap-2 items-start">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-medium text-amber-800">Troubleshooting 500 Errors</h4>
                    <ul className="text-xs text-amber-700 mt-1 list-disc list-inside space-y-1">
                      <li>Check your n8n workflow is published and active</li>
                      <li>Verify your webhook node is correctly configured</li>
                      <li>Make sure your workflow expects "message" and "history" in the payload</li>
                      <li>Check if your workflow returns a JSON response with a "response" property</li>
                      <li>View the n8n execution logs for more detailed error information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
