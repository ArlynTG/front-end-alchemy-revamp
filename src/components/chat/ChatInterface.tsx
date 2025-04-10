
import React, { useState } from "react";
import ChatHistory from "@/components/chat/ChatHistory";
import ChatInput from "@/components/chat/ChatInput";
import WorkflowUrlForm from "@/components/chat/WorkflowUrlForm";
import { useChatWithN8n } from "@/hooks/useChatWithN8n";

// Default webhook URL
const WEBHOOK_URL = "https://tobiasedtech.app.n8n.cloud/webhook/eb528532-1df2-4d01-924e-69fb7b29dc25/chat";

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

  return (
    <>
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
