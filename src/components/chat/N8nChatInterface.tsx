
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useChatWithWebhook } from "@/hooks/useChatWithWebhook";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ConnectionErrorAlert from "@/components/chat/ConnectionErrorAlert";
import SettingsDialog from "@/components/chat/SettingsDialog";
import MessageInput from "@/components/chat/MessageInput";
import { Message as WebhookMessage } from "@/hooks/useChatWebhook";

const N8nChatInterface: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    connectionError,
    webhookUrl,
    sendMessage,
    retryConnection,
    saveWebhookUrl,
    resetToDefault
  } = useChatWithWebhook();

  // Transform messages from useChatWithWebhook format to useChatWebhook format
  const transformedMessages: WebhookMessage[] = messages.map(message => ({
    role: message.sender === 'user' ? 'user' : 'assistant',
    content: message.text
  }));

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2 p-2 bg-gray-50 rounded">
        <h3 className="font-medium text-gray-800">Tobey AI Chat</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowSettings(true)}
          className="text-gray-500"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      
      {connectionError && (
        <ConnectionErrorAlert 
          errorMessage={connectionError} 
          onRetry={retryConnection}
          onShowSettings={() => setShowSettings(true)}
        />
      )}
      
      <ChatMessageList 
        messages={transformedMessages} 
        isLoading={isLoading} 
      />
      
      <MessageInput
        value={inputMessage}
        onChange={setInputMessage}
        onSend={handleSendMessage}
        disabled={isLoading}
      />

      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        currentWebhookUrl={webhookUrl}
        onSave={saveWebhookUrl}
        onReset={resetToDefault}
      />
    </div>
  );
};

export default N8nChatInterface;
