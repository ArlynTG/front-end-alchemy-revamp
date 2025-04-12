
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useChatWithWebhook } from "@/hooks/useChatWithWebhook";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ConnectionErrorAlert from "@/components/chat/ConnectionErrorAlert";
import SettingsDialog from "@/components/chat/SettingsDialog";
import MessageInput from "@/components/chat/MessageInput";

const SimpleChatInterface = () => {
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end mb-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowSettings(true)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      
      {connectionError && (
        <ConnectionErrorAlert 
          errorMessage={connectionError} 
          onRetry={retryConnection} 
        />
      )}
      
      <ChatMessageList 
        messages={messages} 
        isLoading={isLoading} 
      />
      
      <MessageInput
        value={inputMessage}
        onChange={setInputMessage}
        onSend={sendMessage}
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

export default SimpleChatInterface;
