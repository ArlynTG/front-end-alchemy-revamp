
import React, { useRef, KeyboardEvent } from "react";

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

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 flex items-center space-x-2">
      <label htmlFor="file-input" className="text-2xl text-gray-600 hover:text-gray-900 cursor-pointer">
        📎
      </label>
      <input 
        id="file-input" 
        type="file" 
        ref={fileInputRef} 
        accept="application/pdf,image/*" 
        onChange={(e) => onFileChange(e.target.files?.[0] || null)} 
        className="hidden" 
      />

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        rows={1}
        placeholder="Ask Tobey anything..."
        className="flex-1 resize-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
        aria-label="Chat input"
      />

      <button
        onClick={onSend}
        disabled={isLoading}
        className="bg-[#f97316] hover:bg-[#c2410c] text-white px-4 py-2 rounded-lg disabled:opacity-50"
        aria-label="Send message"
      >Send</button>
    </div>
  );
};

export default ChatInputArea;
