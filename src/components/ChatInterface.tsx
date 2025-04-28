"use client";
import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";

/**
 * Message structure for chat bubbles
 */
interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
}

/**
 * ChatInterface component
 * - Streams assistant replies from /api/chat
 * - Maintains thread context via x-openai-thread-id
 * - Supports uploading and previewing PDF/image report cards as Base64
 * - Uses tobeystutor.com brand colors, gradients, and accessible design
 */
const ChatInterface: React.FC = () => {
  // Chat history
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", sender: "assistant", text: "👋 Hi! I'm Tobey, your AI tutor. How can I help you today?" }
  ]);
  const [input, setInput] = useState<string>("");                      // chat text
  const [isLoading, setIsLoading] = useState<boolean>(false);           // typing indicator
  const [threadId, setThreadId] = useState<string | null>(null);        // OpenAI thread context

  // File upload states
  const [fileData, setFileData] = useState<string | null>(null);       // Base64 payload
  const [fileName, setFileName] = useState<string | null>(null);       // original filename
  const [filePreview, setFilePreview] = useState<string | null>(null); // data URL preview

  // Refs for scroll container & file input reset
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll whenever messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  /** Append a new message to the chat history */
  const appendMessage = (msg: Message) => {
    setMessages(prev => [...prev, msg]);
  };

  /**
   * runChat
   * 1. POSTs to /api/chat with message/fileData
   * 2. Reads x-openai-thread-id header for context
   * 3. Streams token-by-token and updates the latest assistant bubble
   */
  const runChat = async (payload: { message: string; fileName?: string; fileData?: string }) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, threadId }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // preserve thread for next turn
      const newThread = res.headers.get('x-openai-thread-id');
      if (newThread) setThreadId(newThread);

      // prepare streaming reader
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let partial = '';

      // placeholder assistant bubble
      const assistId = Date.now().toString();
      appendMessage({ id: assistId, sender: 'assistant', text: '' });

      // stream loop
      while (!done && reader) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          partial += decoder.decode(value, { stream: !done });
          setMessages(prev => prev.map(m => m.id === assistId ? { ...m, text: partial } : m));
        }
      }
    } catch (err) {
      console.error('Chat stream error:', err);
      appendMessage({ id: Date.now().toString(), sender: 'assistant', text: '🚨 Sorry, something went wrong. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handleSend
   * - sends text or file payload
   * - resets input & file after
   */
  const handleSend = () => {
    if (isLoading) return;
    const text = input.trim();
    if (!text && !fileData) return;

    // user bubble
    appendMessage({ id: Date.now().toString(), sender: 'user', text: text || fileName || '' });
    setInput('');

    // build payload
    const payload: { message: string; fileName?: string; fileData?: string } = {
      message: text || `Please analyze this report card: ${fileName}`,
    };
    if (fileData && fileName) {
      payload.fileName = fileName;
      payload.fileData = fileData;
    }
    runChat(payload);

    // reset file
    setFileData(null);
    setFileName(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /**
   * handleFileChange
   * - reads file as DataURL
   * - extracts Base64 & stores preview
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setFilePreview(dataUrl);
      setFileData(dataUrl.split(',')[1]);
      setFileName(f.name);
    };
    reader.readAsDataURL(f);
  };

  /**
   * handleKeyDown
   * - Enter to send, Shift+Enter for newline
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden font-sans">
      {/* Header with branded gradient */}
      <div className="bg-gradient-to-r from-[#f97316] to-[#c2410c] text-white px-4 py-3 font-semibold text-lg">
        Tobey AI Tutor
      </div>

      {/* Chat history container */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-wrap ${
              msg.sender === 'user'
                ? 'bg-[#f97316] text-white rounded-tr-none'
                : 'bg-gray-100 text-gray-800 rounded-tl-none'
            }`}>
              <div className="font-medium text-sm mb-1">
                {msg.sender === 'user' ? 'You' : 'Tobey'}
              </div>
              <div className="text-sm leading-relaxed">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && <div className="text-gray-500 italic text-center">Tobey is typing...</div>}
      </div>

      {/* File preview section */}
      {filePreview && fileName && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {filePreview.startsWith('data:image') ? (
              <img src={filePreview} alt={fileName} className="h-16 rounded" />
            ) : (
              <embed src={filePreview} type="application/pdf" width="60" height="60" />
            )}
            <span className="text-sm">{fileName}</span>
          </div>
          <button onClick={() => {
              setFileData(null);
              setFileName(null);
              setFilePreview(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className="text-gray-500 hover:text-gray-900"
            aria-label="Remove uploaded file"
          >✕</button>
        </div>
      )}

      {/* Input & controls */}
      <div className="border-t border-gray-200 p-4 flex items-center space-x-2">
        <label htmlFor="file-input" className="text-2xl text-gray-600 hover:text-gray-900 cursor-pointer">
          📎
        </label>
        <input id="file-input" type="file" ref={fileInputRef} accept="application/pdf,image/*" onChange={handleFileChange} className="hidden" />

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
          onClick={handleSend}
          disabled={isLoading}
          className="bg-[#f97316] hover:bg-[#c2410c] text-white px-4 py-2 rounded-lg disabled:opacity-50"
          aria-label="Send message"
        >Send</button>
      </div>
    </div>
  );
};

export default ChatInterface; 