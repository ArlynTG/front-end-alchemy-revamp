
import { useState, useCallback } from "react";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
}

export const useChatState = () => {
  // Chat history
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", sender: "assistant", text: "👋 Hi! I'm Tobey, your AI tutor. How can I help you today?" }
  ]);
  const [input, setInput] = useState<string>("");                      // chat text
  const [isLoading, setIsLoading] = useState<boolean>(false);          // typing indicator
  const [threadId, setThreadId] = useState<string | null>(null);       // OpenAI thread context

  // File upload states
  const [fileData, setFileData] = useState<string | null>(null);       // Base64 payload
  const [fileName, setFileName] = useState<string | null>(null);       // original filename
  const [filePreview, setFilePreview] = useState<string | null>(null); // data URL preview

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
  const handleSend = useCallback(() => {
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
  }, [input, isLoading, fileData, fileName, appendMessage, runChat, setInput]);

  return {
    messages,
    input,
    isLoading,
    threadId,
    fileData,
    fileName,
    filePreview,
    setInput,
    setFileData,
    setFileName,
    setFilePreview,
    appendMessage,
    runChat,
    handleSend
  };
};
