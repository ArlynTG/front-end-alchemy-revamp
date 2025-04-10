
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const DemoV2 = () => {
  const [iframeError, setIframeError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [retryCount, setRetryCount] = useState<number>(0);
  const { toast } = useToast();

  const handleIframeLoad = () => {
    console.log("Iframe loaded successfully");
    setIsLoading(false);
    setIframeError(false);
  };

  const handleIframeError = () => {
    console.error("Error loading iframe content");
    setIsLoading(false);
    setIframeError(true);
    toast({
      title: "Connection Error",
      description: "Failed to load the chat interface. The service might be temporarily unavailable.",
      variant: "destructive",
    });
  };

  const handleRetry = () => {
    console.log("Retrying iframe load");
    setIsLoading(true);
    setIframeError(false);
    setRetryCount(prev => prev + 1);
  };

  // Log the current state for debugging
  useEffect(() => {
    console.log("DemoV2 component state:", { iframeError, isLoading, retryCount });
  }, [iframeError, isLoading, retryCount]);

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
            
            {iframeError ? (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was a problem loading the demo interface. The service might be temporarily unavailable.
                  <div className="mt-2">
                    <Button 
                      onClick={handleRetry}
                      variant="outline" 
                      size="sm"
                      className="gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Retry Connection
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            ) : null}
            
            <Card className="overflow-hidden shadow-xl border-gray-200">
              <CardContent className="p-0 aspect-video relative">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <div className="animate-spin h-8 w-8 border-4 border-tobey-orange border-t-transparent rounded-full mx-auto mb-2"></div>
                      <p className="text-gray-600">Loading demo...</p>
                    </div>
                  </div>
                )}
                <iframe 
                  key={`iframe-${retryCount}`} // Force reload when retry is clicked
                  src="https://tobiasedtech.app.n8n.cloud/webhook/eb528532-1df2-4d01-924e-69fb7b29dc25/chat" 
                  className="w-full h-full min-h-[600px]"
                  title="Tobey AI Demo"
                  allow="microphone"
                  loading="lazy"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                />
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
