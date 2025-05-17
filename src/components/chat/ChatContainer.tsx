
import React, { useState, useEffect } from "react";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInputArea from "@/components/chat/ChatInputArea";
import FilePreview from "@/components/chat/FilePreview";
import { useChatState } from "@/hooks/useChatState";
import ReactConfetti from "react-confetti";
import { motion } from "framer-motion";

interface ChatContainerProps {
  removeConfetti?: boolean;
}

/**
 * ChatContainer - Main component that orchestrates the chat interface
 */
const ChatContainer: React.FC<ChatContainerProps> = ({ removeConfetti = false }) => {
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
  
  const [showConfetti, setShowConfetti] = useState(!removeConfetti);
  const [confettiHeight, setConfettiHeight] = useState(0);
  const [confettiWidth, setConfettiWidth] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Set confetti dimensions to window size for full width effect (only used if removeConfetti=false)
  useEffect(() => {
    if (removeConfetti) return;
    
    const updateDimensions = () => {
      setConfettiWidth(window.innerWidth);
      setConfettiHeight(400); // Fixed height for top of page effect
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [removeConfetti]);

  // Hide confetti after 5 seconds (only used if removeConfetti=false)
  useEffect(() => {
    if (removeConfetti) return;
    
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [removeConfetti]);
  
  // Trigger welcome message with scroll (only used if removeConfetti=false)
  useEffect(() => {
    if (removeConfetti) return;
    
    const handleScroll = () => {
      if (!hasScrolled) {
        setHasScrolled(true);
        setShowConfetti(true);
        // Reset confetti after triggering
        setTimeout(() => setShowConfetti(false), 5000);
      }
    };
    
    const container = document.querySelector('.chat-messages-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [hasScrolled, removeConfetti]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden font-sans chat-container relative">
      {/* Header with branded gradient */}
      <div className="bg-gradient-to-r from-[#f97316] to-[#c2410c] text-white px-4 py-3 font-semibold text-lg">
        Tobey AI Tutor
      </div>

      {/* Confetti effect - positioned absolutely (only shown if removeConfetti=false) */}
      {showConfetti && !removeConfetti && (
        <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
          <ReactConfetti
            width={confettiWidth}
            height={confettiHeight}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
            initialVelocityY={10}
            confettiSource={{x: 0, y: 0, w: confettiWidth, h: 0}}
          />
        </div>
      )}
      
      {/* Welcome back message (only shown if removeConfetti=false) */}
      {showConfetti && !removeConfetti && (
        <motion.div 
          className="bg-gradient-to-r from-indigo-100 to-purple-100 p-3 mx-4 mt-2 rounded-lg text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-bold text-indigo-800">Welcome back, Alex! 🎉</p>
          <p className="text-sm text-indigo-600">Ready to continue your learning journey?</p>
        </motion.div>
      )}

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
