
import React, { useRef, useEffect, useState } from "react";
import { Message } from "@/hooks/useChatState";
import { Mic, Speaker } from "lucide-react";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

// Mock conversation data for initial display
const mockConversation: Message[] = [
  {
    id: "welcome",
    sender: "assistant",
    text: "👋 Hi Alex! Welcome back! I noticed you've been practicing fractions. Great work on improving your skills!"
  },
  {
    id: "user1",
    sender: "user",
    text: "Thanks! I've been struggling with dividing fractions though. Can you help me?"
  },
  {
    id: "ai1",
    sender: "assistant",
    text: "Absolutely! I believe in you! Dividing fractions can be tricky at first, but I've got a simple trick: 'Keep, Change, Flip!' When dividing fractions, you keep the first fraction, change the division to multiplication, and flip the second fraction. Would you like to try an example together?"
  },
  {
    id: "user2",
    sender: "user",
    text: "Yes please! How about 3/4 ÷ 1/2?"
  },
  {
    id: "ai2",
    sender: "assistant",
    text: "Great question! Let's work through 3/4 ÷ 1/2 together:\n\n1. Keep the first fraction: 3/4\n2. Change division to multiplication: ×\n3. Flip the second fraction: 1/2 becomes 2/1\n\nSo 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 1.5 or 1½\n\nYou're doing fantastic! Would you like to try another one?"
  },
  {
    id: "user3",
    sender: "user",
    text: "This makes so much sense now! Can we try 2/3 ÷ 4/5?"
  },
  {
    id: "ai3",
    sender: "assistant",
    text: "Kai...\nYou're on fire today! 🔥 Let's solve 2/3 ÷ 4/5:\n\n1. Keep: 2/3\n2. Change: × \n3. Flip: 4/5 becomes 5/4\n\nSo 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6\n\nExcellent work! Your persistence is really paying off. I'm proud of how you're tackling these problems!"
  }
];

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayMessages, setDisplayMessages] = useState<Message[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  // Text-to-speech function
  const speakMessage = (text: string, id: string) => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    if (id === isSpeaking) {
      setIsSpeaking(null);
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Get available voices and set a friendly one if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Samantha') || 
      voice.name.includes('Female') || 
      voice.name.includes('Google')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.onend = () => setIsSpeaking(null);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(id);
  };

  // Combine real messages with mock conversation
  useEffect(() => {
    if (messages.length <= 1) {
      // If we only have the welcome message, show mock conversation
      setDisplayMessages(mockConversation);
    } else {
      // Otherwise use real messages
      setDisplayMessages(messages);
    }
  }, [messages]);

  // Auto-scroll whenever messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayMessages]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4 chat-messages-container">
      {displayMessages.map(msg => (
        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-wrap ${
            msg.sender === 'user'
              ? 'bg-[#f97316] text-white rounded-tr-none'
              : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}>
            <div className="font-medium text-sm mb-1 flex justify-between items-center">
              {msg.sender === 'user' ? (
                <span>You</span>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span>Kai</span>
                  <button 
                    onClick={() => speakMessage(msg.text, msg.id)}
                    className={`p-1 rounded-full ${
                      isSpeaking === msg.id 
                      ? 'bg-[#f97316] text-white' 
                      : 'text-[#f97316] hover:bg-orange-100'
                    }`}
                    aria-label="Text to speech"
                  >
                    <Speaker className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="text-sm leading-relaxed">{msg.text}</div>
          </div>
        </div>
      ))}
      {isLoading && <div className="text-gray-500 italic text-center">Kai is typing...</div>}
    </div>
  );
};

export default ChatMessages;
