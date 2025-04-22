
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useChatWebhook } from "@/hooks/useChatWebhook";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ConnectionErrorAlert from "@/components/chat/ConnectionErrorAlert";
import SettingsDialog from "@/components/chat/SettingsDialog";
import MessageInput from "@/components/chat/MessageInput";

interface SimpleChatInterfaceProps {
  reportText?: string | null;
}

const SimpleChatInterface: React.FC<SimpleChatInterfaceProps> = ({ reportText }) => {
  const [showSettings, setShowSettings] = useState(false);
  const {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    error: connectionError,
    sendMessage,
    formatMessageText
  } = useChatWebhook(reportText);

  const handleRetry = () => {
    // Implement retry logic if needed
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
    }
  };

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
          onRetry={handleRetry}
          onShowSettings={() => setShowSettings(true)}
        />
      )}
      
      <ChatMessageList 
        messages={messages} 
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
        currentWebhookUrl=""
        onSave={() => {}}
        onReset={() => {}}
      />
    </div>
  );
};

export default SimpleChatInterface;
