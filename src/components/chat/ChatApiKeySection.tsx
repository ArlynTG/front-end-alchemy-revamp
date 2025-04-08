
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { KeyIcon, Loader2 } from "lucide-react";
import { testOpenAIConnection } from "@/utils/openaiService";

interface ChatApiKeySectionProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ChatApiKeySection = ({ apiKey, setApiKey }: ChatApiKeySectionProps) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [testInProgress, setTestInProgress] = useState(false);
  const { toast } = useToast();

  // Load saved API key on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, [setApiKey]);

  const saveApiKey = (key: string) => {
    if (!key.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("openai_api_key", key);
    setApiKey(key);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved successfully.",
    });
  };

  const testConnection = async () => {
    if (!apiKey) {
      toast({
        title: "Missing API Key",
        description: "Please enter your OpenAI API key before testing the connection.",
        variant: "destructive",
      });
      return;
    }

    setTestInProgress(true);
    try {
      await testOpenAIConnection(apiKey);
      
      toast({
        title: "Connection Successful",
        description: "Successfully connected to your OpenAI Assistant.",
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

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-sm font-medium mb-2 flex items-center">
        <KeyIcon className="w-4 h-4 mr-1" /> OpenAI API Key
      </h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Input
            type={showApiKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API key"
            className="flex-1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowApiKey(!showApiKey)}
            className="whitespace-nowrap"
          >
            {showApiKey ? "Hide" : "Show"}
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => saveApiKey(apiKey)}
            className="bg-tobey-orange hover:bg-tobey-darkOrange text-white"
            size="sm"
          >
            Save Key
          </Button>
          <Button
            onClick={testConnection}
            variant="outline"
            size="sm"
            disabled={testInProgress}
          >
            {testInProgress ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" /> Testing...
              </>
            ) : (
              "Test Connection"
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Your API key is stored only in your browser's local storage and is never sent to our servers.
        </p>
      </div>
    </div>
  );
};

export default ChatApiKeySection;
