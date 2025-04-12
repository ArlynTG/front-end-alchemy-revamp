
import React, { useState } from "react";
import ChatHistory from "@/components/chat/ChatHistory";
import ChatInput from "@/components/chat/ChatInput";
import WorkflowUrlForm from "@/components/chat/WorkflowUrlForm";
import { useChatWithN8n } from "@/hooks/useChatWithN8n";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

// Updated to use the workflow URL provided by the user
const WEBHOOK_URL = "https://tobiasedtech.app.n8n.cloud/workflow/C8smCHXCM3WITZmL";

const ChatInterface = () => {
  const [showWorkflowUrlForm, setShowWorkflowUrlForm] = useState(false);

  const {
    chatHistory,
    isLoading,
    webhookUrl,
    testingConnection,
    handleUpdateWebhookUrl,
    testConnection,
    handleSendMessage
  } = useChatWithN8n(WEBHOOK_URL);

  const toggleWorkflowUrlForm = () => {
    setShowWorkflowUrlForm(prev => !prev);
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleWorkflowUrlForm}
          className="text-gray-500"
        >
          <Settings className="h-4 w-4 mr-1" />
          {showWorkflowUrlForm ? "Hide Settings" : "Settings"}
        </Button>
      </div>
      
      <ChatHistory messages={chatHistory} />
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
        
        {showWorkflowUrlForm && (
          <WorkflowUrlForm 
            initialUrl={webhookUrl} 
            onSaveUrl={handleUpdateWebhookUrl}
            onTestConnection={testConnection}
            testInProgress={testingConnection}
          />
        )}
      </div>
    </>
  );
};

export default ChatInterface;
