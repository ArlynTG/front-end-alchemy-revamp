
import React, { useState } from "react";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInputArea from "@/components/chat/ChatInputArea";
import FilePreview from "@/components/chat/FilePreview";
import { useChatState } from "@/hooks/useChatState";

/**
 * ChatContainer - Main component that orchestrates the chat interface
 */
const ChatContainer: React.FC = () => {
  const { 
    messages, 
    input, 
    isLoading, 
    appendMessage,
    setInput, 
    fileData,
    fileName,
    filePreview,
    setFileData,
    setFileName,
    setFilePreview,
    runChat,
    handleSend
  } = useChatState();

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden font-sans">
      {/* Header with branded gradient */}
      <div className="bg-gradient-to-r from-[#f97316] to-[#c2410c] text-white px-4 py-3 font-semibold text-lg">
        Tobey AI Tutor
      </div>

      {/* Chat messages */}
      <ChatMessages 
        messages={messages} 
        isLoading={isLoading} 
      />

      {/* File preview section */}
      {filePreview && fileName && (
        <FilePreview 
          filePreview={filePreview}
          fileName={fileName}
          onRemove={() => {
            setFileData(null);
            setFileName(null);
            setFilePreview(null);
          }}
        />
      )}

      {/* Input & controls */}
      <ChatInputArea
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        onSend={handleSend}
        onFileChange={(file) => {
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result as string;
            setFilePreview(dataUrl);
            setFileData(dataUrl.split(',')[1]);
            setFileName(file.name);
          };
          reader.readAsDataURL(file);
        }}
      />
    </div>
  );
};

export default ChatContainer;
