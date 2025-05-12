
import React, { useRef, KeyboardEvent, useState } from "react";
import { Mic, Send, Loader2, Paperclip } from "lucide-react";

interface ChatInputAreaProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  onSend: () => void;
  onFileChange: (file: File | null) => void;
}

const ChatInputArea: React.FC<ChatInputAreaProps> = ({ 
  input, 
  setInput, 
  isLoading, 
  onSend,
  onFileChange 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const toggleSpeechToText = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Try Chrome or Edge.');
      return;
    }
    
    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setIsListening(false);
      return;
    }
    
    // Start listening
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + ' ' + transcript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div className="border-t border-gray-200 p-4 flex items-center space-x-2">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100"
        aria-label="Attach file"
      >
        <Paperclip className="h-5 w-5" />
      </button>
      <input 
        id="file-input" 
        type="file" 
        ref={fileInputRef} 
        accept="application/pdf,image/*" 
        onChange={(e) => onFileChange(e.target.files?.[0] || null)} 
        className="hidden" 
      />

      <div className="flex-1 relative">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={1}
          placeholder="Ask Tobey anything..."
          className="flex-1 w-full resize-none border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
          aria-label="Chat input"
        />
        <button
          onClick={toggleSpeechToText}
          className={`absolute right-2 top-2 p-1 rounded-full ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-gray-500 hover:bg-gray-100'}`}
          aria-label="Speech to text"
        >
          <Mic className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={onSend}
        disabled={isLoading}
        className="bg-[#f97316] hover:bg-[#c2410c] text-white px-4 py-2 rounded-lg disabled:opacity-50 flex items-center justify-center min-w-[60px]"
        aria-label="Send message"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default ChatInputArea;
