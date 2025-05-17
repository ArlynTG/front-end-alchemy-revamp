
import React, { useRef, useEffect, useState } from "react";
import { Message } from "@/hooks/useChatState";
import { Mic, Speaker, Bot } from "lucide-react";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

// Mock conversation data for initial display - Updated to focus on math word problems and executive functioning
const mockConversation: Message[] = [
  {
    id: "welcome",
    sender: "assistant",
    text: "👋 Hi Alex! Welcome back! I see you're working on math word problems today. How can I help you with today's assignment?"
  },
  {
    id: "user1",
    sender: "user",
    text: "I have this word problem for homework and I'm completely stuck. 'If a train travels 240 miles in 4 hours, how far will it travel in 7 hours?' There's too many steps and I keep getting confused."
  },
  {
    id: "ai1",
    sender: "assistant",
    text: "I understand how these multi-step problems can feel overwhelming. Let's break this down into smaller pieces so it's easier to manage:\n\n1️⃣ First, let's find how far the train travels in 1 hour (the rate)\n2️⃣ Then we'll use that rate to calculate the distance for 7 hours\n\nFor step 1: If the train travels 240 miles in 4 hours, the rate is 240 ÷ 4 = 60 miles per hour\n\nFor step 2: At 60 miles per hour, in 7 hours it will travel: 60 × 7 = 420 miles\n\nDoes this approach make more sense when we break it down?"
  },
  {
    id: "user2",
    sender: "user",
    text: "Yeah, that helps! But I have 5 more problems to do and I'm already out of time. I'm supposed to finish this and start my science project tonight too. I don't know how to get it all done."
  },
  {
    id: "ai2",
    sender: "assistant",
    text: "I can tell you're feeling overwhelmed with the workload. That's completely understandable! Let's create a quick plan to help you manage your time:\n\n📝 HOMEWORK PLAN 📝\n\n1. Math problems (30 mins total):\n   - Break them into 5-minute chunks with short breaks\n   - We can solve them one at a time together\n\n2. Science project (start tonight, continue tomorrow):\n   - Tonight: Just gather materials and create outline (15 mins)\n   - Tomorrow: Work on the actual project\n\nWould this help? We can set a timer for each math problem to stay focused. Which math problem should we tackle next?"
  },
  {
    id: "user3",
    sender: "user",
    text: "That sounds better. Ok, here's the next one: 'A rectangle has an area of 72 square feet. If the width is 8 feet, what is the length?' I know there's a formula but I keep mixing them up."
  },
  {
    id: "ai3",
    sender: "assistant",
    text: "You're doing great by tackling one problem at a time! For rectangles, here's an easy way to remember:\n\nArea = Length × Width\n\nLet's use that formula with your problem:\n- Area = 72 square feet\n- Width = 8 feet\n- Length = ?\n\nWe can rearrange the formula to find length:\nLength = Area ÷ Width\nLength = 72 ÷ 8\nLength = 9 feet\n\nVisualizing this: imagine a rectangle with 8 feet across, and to make 72 square feet total, it needs to be 9 feet long.\n\nDoes this make sense? Should we move on to the next problem?"
  },
  {
    id: "user4",
    sender: "user",
    text: "That makes sense! I'm feeling better about this now. I think I can try the next ones on my own, but can you remind me how to organize my science project? I have to compare plant growth with different types of water."
  },
  {
    id: "ai4",
    sender: "assistant",
    text: "I'm so glad you're feeling more confident with the math problems! For your science project on plant growth, here's a simple organization plan:\n\n🌱 SCIENCE PROJECT STEPS 🌱\n\n1. Materials List (Tonight - 5 mins):\n   - 3 identical plants\n   - 3 types of water\n   - Measuring tape\n   - Notebook for observations\n\n2. Project Schedule (Tonight - 10 mins):\n   - Day 1: Set up plants with different water types\n   - Days 2-7: Measure plants daily at the same time (make a chart!)\n   - Day 8: Create results & conclusion\n\nTIP: Take a picture every day with a ruler next to each plant - this visual record helps if you miss a day, and it's perfect for your presentation!\n\nDo you want me to help you create a simple tracking chart for your observations?"
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
                  <div className="flex items-center">
                    <Bot className="h-4 w-4 mr-1 text-[#f97316]" />
                  </div>
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
      {isLoading && <div className="text-gray-500 italic text-center">Typing...</div>}
    </div>
  );
};

export default ChatMessages;
