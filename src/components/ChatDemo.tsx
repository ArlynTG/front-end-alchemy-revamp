
import React, { useEffect, useRef, useState } from "react";

const ChatDemo = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your product assistant. How can I help you today?", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const chatMessagesRef = useRef(null);

  // OpenAI API credentials
  const OPENAI_API_KEY = "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";
  const ASSISTANT_ID = "asst_FqUDE3yX9ySYqb8eUxUkU4lZ";

  // Initialize a new thread when component mounts
  useEffect(() => {
    initializeThread();
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const initializeThread = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v1'
        },
        body: JSON.stringify({})
      });
      
      const data = await response.json();
      setThreadId(data.id);
      console.log('Thread initialized with ID:', data.id);
    } catch (error) {
      console.error('Failed to initialize thread:', error);
      addMessage('Sorry, I had trouble connecting. Please try again later.', 'bot');
    }
  };

  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    // Add user message to UI
    addMessage(userInput, 'user');
    
    // Clear input
    setUserInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Make sure we have a thread
    if (!threadId) {
      await initializeThread();
    }
    
    try {
      await sendMessageToAssistant(userInput);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessageToAssistant = async (userMessage) => {
    try {
      // Add the user message to the thread
      await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v1'
        },
        body: JSON.stringify({
          role: 'user',
          content: userMessage
        })
      });
      
      // Run the assistant on the thread
      const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v1'
        },
        body: JSON.stringify({
          assistant_id: ASSISTANT_ID
        })
      });
      
      const runData = await runResponse.json();
      const runId = runData.id;
      
      // Poll for the completion of the run
      await pollRunStatus(runId);
      
      // Get the latest messages
      const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v1'
        }
      });
      
      const messagesData = await messagesResponse.json();
      
      // Get the latest assistant message
      const assistantMessages = messagesData.data.filter(msg => msg.role === 'assistant');
      if (assistantMessages.length > 0) {
        const latestMessage = assistantMessages[0];
        addMessage(latestMessage.content[0].text.value, 'bot');
      }
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      throw error;
    }
  };

  const pollRunStatus = async (runId) => {
    let completed = false;
    
    while (!completed) {
      const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v1'
        }
      });
      
      const runData = await response.json();
      const status = runData.status;
      
      if (status === 'completed') {
        completed = true;
      } else if (status === 'failed' || status === 'cancelled' || status === 'expired') {
        throw new Error(`Run ended with status: ${status}`);
      } else {
        // Wait a second before polling again
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  return (
    <section id="demo" className="py-16 md:py-24 bg-white">
      <div className="container">
        <span className="section-tag">FAQ</span>
        
        <h2 className="section-title">Got Questions?</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Wondering how all this AI works? What's a tutoring session look like? How is progress measured?
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="chat-container" style={{
            width: '100%',
            height: '600px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white'
          }}>
            <div className="chat-header" style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '15px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              Product Support Chat
            </div>
            
            <div 
              className="chat-messages" 
              ref={chatMessagesRef}
              style={{
                flex: 1,
                padding: '15px',
                overflowY: 'auto'
              }}
            >
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`message ${message.sender}`}
                  style={{
                    marginBottom: '15px',
                    padding: '10px 15px',
                    borderRadius: '18px',
                    maxWidth: '80%',
                    wordWrap: 'break-word',
                    backgroundColor: message.sender === 'bot' ? '#f0f2f5' : '#d1ecf1',
                    alignSelf: message.sender === 'bot' ? 'flex-start' : 'flex-end',
                    borderBottomLeftRadius: message.sender === 'bot' ? '5px' : '18px',
                    borderBottomRightRadius: message.sender === 'bot' ? '18px' : '5px',
                    float: message.sender === 'bot' ? 'left' : 'right',
                    clear: 'both'
                  }}
                >
                  {message.text}
                </div>
              ))}
              
              {isTyping && (
                <div 
                  className="typing-indicator"
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#f0f2f5',
                    borderRadius: '18px',
                    marginBottom: '15px',
                    width: '60px',
                    float: 'left',
                    clear: 'both',
                    display: 'flex'
                  }}
                >
                  <span className="typing-dot" style={{
                    height: '8px',
                    width: '8px',
                    margin: '0 1px',
                    backgroundColor: '#9E9EA1',
                    display: 'block',
                    borderRadius: '50%',
                    opacity: 0.4,
                    animation: 'typing 1s infinite ease-in-out'
                  }}></span>
                  <span className="typing-dot" style={{
                    height: '8px',
                    width: '8px',
                    margin: '0 1px',
                    backgroundColor: '#9E9EA1',
                    display: 'block',
                    borderRadius: '50%',
                    opacity: 0.4,
                    animation: 'typing 1s infinite ease-in-out 0.2s'
                  }}></span>
                  <span className="typing-dot" style={{
                    height: '8px',
                    width: '8px',
                    margin: '0 1px',
                    backgroundColor: '#9E9EA1',
                    display: 'block',
                    borderRadius: '50%',
                    opacity: 0.4,
                    animation: 'typing 1s infinite ease-in-out 0.4s'
                  }}></span>
                </div>
              )}
            </div>
            
            <div className="chat-input" style={{
              display: 'flex',
              padding: '15px',
              borderTop: '1px solid #ddd',
              backgroundColor: 'white'
            }}>
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question here..."
                style={{
                  flex: 1,
                  padding: '10px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '20px',
                  outline: 'none'
                }}
              />
              <button 
                onClick={handleSendMessage}
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '10px 15px',
                  marginLeft: '10px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                Send
              </button>
            </div>
          </div>
          
          <style>
            {`
              @keyframes typing {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-7px); }
                100% { transform: translateY(0px); }
              }
            `}
          </style>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
