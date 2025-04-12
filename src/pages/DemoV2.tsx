
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ChatInterface from "@/components/chat/ChatInterface";

// Updated to use the workflow URL provided by the user
const WORKFLOW_URL = "https://tobiasedtech.app.n8n.cloud/workflow/C8smCHXCM3WITZmL";

const DemoV2 = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [useAlternativeUI, setUseAlternativeUI] = useState<boolean>(false);
  const { toast } = useToast();

  // Check connection on load
  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log("Testing initial connection to n8n workflow");
        const response = await fetch(WORKFLOW_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt: "connection_test",
            history: []
          })
        });
        
        console.log("Initial connection test status:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        
        await response.json();
        setHasError(false);
      } catch (err) {
        console.error("Connection test error:", err);
        setHasError(true);
        
        toast({
          title: "Connection Notice",
          description: "Using the fallback chat interface. You can still try the primary interface if you wish.",
          variant: "destructive",
        });
      }
    };
    
    checkConnection();
  }, [toast]);

  const toggleInterface = () => {
    setUseAlternativeUI(prev => !prev);
  };

  const handleRetryConnection = async () => {
    toast({
      title: "Retrying Connection",
      description: "Attempting to reconnect to the chat service...",
    });
    
    try {
      console.log("Retrying connection to n8n workflow");
      const response = await fetch(WORKFLOW_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: "connection_test",
          history: []
        })
      });
      
      console.log("Retry connection test status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      await response.json();
      setHasError(false);
      
      toast({
        title: "Connection Restored",
        description: "Successfully connected to the chat service.",
      });
    } catch (err) {
      console.error("Retry connection error:", err);
      setHasError(true);
      
      toast({
        title: "Connection Error",
        description: "Still unable to connect to the chat service. Using the fallback interface.",
        variant: "destructive",
      });
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
                <AlertTitle>Connection Status</AlertTitle>
                <AlertDescription className="flex flex-col gap-2">
                  <p>There was a problem connecting to the primary AI service. We've switched to the fallback interface.</p>
                  <div className="flex gap-2 mt-2">
                    <Button 
                      variant="outline" 
                      className="self-start"
                      onClick={handleRetryConnection}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry Connection
                    </Button>
                    <Button 
                      variant="outline" 
                      className="self-start"
                      onClick={toggleInterface}
                    >
                      {useAlternativeUI ? "Try Primary Interface" : "Try Alternative Interface"}
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}
            
            <Card className="overflow-hidden shadow-xl border-gray-200">
              <CardContent className="p-4">
                <div className="h-[600px]">
                  <ChatInterface />
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 text-sm text-gray-500 text-center">
              <p>
                Experience our AI tutor in action. This demo uses our n8n integration to process your questions.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DemoV2;
