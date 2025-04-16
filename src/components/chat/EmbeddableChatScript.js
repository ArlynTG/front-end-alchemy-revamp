
/**
 * Tobey AI Chat Widget
 * 
 * This script can be embedded in any website's header to add the Tobey AI chatbot.
 * Usage: Add this script to your website's <head> section.
 */

(function() {
  // Create and inject CSS
  const style = document.createElement('style');
  style.innerHTML = `
    #tobey-chat-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      font-family: 'Arial', sans-serif;
    }
    
    #tobey-chat-button {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background: linear-gradient(to right, #FF7518, #FF7518);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
    }
    
    #tobey-chat-button:hover {
      transform: scale(1.05);
    }
    
    #tobey-chat-window {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 350px;
      height: 500px;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      display: none;
      flex-direction: column;
    }
    
    #tobey-chat-header {
      background: linear-gradient(to right, #FF7518, #FF7518);
      color: white;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    #tobey-chat-title {
      font-weight: 600;
      font-size: 16px;
    }
    
    .tobey-header-button {
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 15px;
    }
    
    .tobey-header-button:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    #tobey-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .tobey-message {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 18px;
      font-size: 14px;
      line-height: 1.4;
    }
    
    .tobey-assistant-message {
      background-color: #f0f0f0;
      color: #333;
      border-top-left-radius: 4px;
      align-self: flex-start;
    }
    
    .tobey-user-message {
      background-color: #FF7518;
      color: white;
      border-top-right-radius: 4px;
      align-self: flex-end;
    }
    
    .tobey-message-sender {
      font-size: 12px;
      margin-bottom: 4px;
      font-weight: 600;
    }
    
    #tobey-chat-input-container {
      border-top: 1px solid #eee;
      padding: 12px;
      display: flex;
      gap: 8px;
    }
    
    #tobey-chat-input {
      flex: 1;
      border: 1px solid #ddd;
      border-radius: 18px;
      padding: 8px 14px;
      font-size: 14px;
      outline: none;
    }
    
    #tobey-chat-input:focus {
      border-color: #FF7518;
    }
    
    #tobey-chat-send {
      background-color: #FF7518;
      color: white;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    
    #tobey-chat-send:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    
    .tobey-typing-indicator {
      display: flex;
      gap: 4px;
      padding: 10px 14px;
      background-color: #f0f0f0;
      border-radius: 18px;
      border-top-left-radius: 4px;
      align-self: flex-start;
      max-width: 80%;
    }
    
    .tobey-typing-dot {
      width: 8px;
      height: 8px;
      background-color: #888;
      border-radius: 50%;
      animation: tobey-typing-animation 1s infinite ease-in-out;
    }
    
    .tobey-typing-dot:nth-child(1) { animation-delay: 0ms; }
    .tobey-typing-dot:nth-child(2) { animation-delay: 200ms; }
    .tobey-typing-dot:nth-child(3) { animation-delay: 400ms; }
    
    @keyframes tobey-typing-animation {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    
    .tobey-error-message {
      background-color: #fee2e2;
      color: #b91c1c;
      padding: 10px;
      border-radius: 8px;
      font-size: 14px;
      margin: 8px 0;
      align-self: stretch;
    }
  `;
  document.head.appendChild(style);

  // Create the widget HTML
  const chatWidget = document.createElement('div');
  chatWidget.id = 'tobey-chat-widget';
  chatWidget.innerHTML = `
    <div id="tobey-chat-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>
    <div id="tobey-chat-window">
      <div id="tobey-chat-header">
        <div id="tobey-chat-title">Tobey AI Assistant</div>
        <div class="tobey-header-actions">
          <button class="tobey-header-button" id="tobey-restart-chat">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 2v6h6"></path>
              <path d="M3 8 12 17l9-9"></path>
            </svg>
          </button>
          <button class="tobey-header-button" id="tobey-close-chat">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      <div id="tobey-chat-messages"></div>
      <div id="tobey-chat-input-container">
        <input type="text" id="tobey-chat-input" placeholder="Type your message...">
        <button id="tobey-chat-send" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z"></path>
            <path d="M22 2 11 13"></path>
          </svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(chatWidget);

  // Chat functionality
  let messages = [];
  let isOpen = false;
  let isLoading = false;

  // Initialize with welcome message
  messages.push({
    role: "assistant",
    content: "Hi there! I'm Tobey AI. How can I help you today?"
  });

  // DOM Elements
  const chatButton = document.getElementById('tobey-chat-button');
  const chatWindow = document.getElementById('tobey-chat-window');
  const closeButton = document.getElementById('tobey-close-chat');
  const restartButton = document.getElementById('tobey-restart-chat');
  const messagesContainer = document.getElementById('tobey-chat-messages');
  const inputField = document.getElementById('tobey-chat-input');
  const sendButton = document.getElementById('tobey-chat-send');

  // Toggle chat window
  chatButton.addEventListener('click', () => {
    isOpen = !isOpen;
    chatWindow.style.display = isOpen ? 'flex' : 'none';
    if (isOpen) {
      renderMessages();
      inputField.focus();
    }
  });

  closeButton.addEventListener('click', () => {
    chatWindow.style.display = 'none';
    isOpen = false;
  });

  restartButton.addEventListener('click', () => {
    messages = [{
      role: "assistant",
      content: "Hi there! I'm Tobey AI. How can I help you today?"
    }];
    renderMessages();
  });

  // Handle input
  inputField.addEventListener('input', () => {
    sendButton.disabled = !inputField.value.trim() || isLoading;
  });

  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !sendButton.disabled) {
      e.preventDefault();
      sendMessage();
    }
  });

  sendButton.addEventListener('click', sendMessage);

  // Render messages
  function renderMessages() {
    messagesContainer.innerHTML = '';
    
    messages.forEach(msg => {
      const messageEl = document.createElement('div');
      messageEl.className = `tobey-message ${msg.role === 'user' ? 'tobey-user-message' : 'tobey-assistant-message'}`;
      
      const senderEl = document.createElement('div');
      senderEl.className = 'tobey-message-sender';
      senderEl.textContent = msg.role === 'user' ? 'You' : 'Tobey';
      
      const contentEl = document.createElement('div');
      contentEl.textContent = msg.content;
      
      messageEl.appendChild(senderEl);
      messageEl.appendChild(contentEl);
      messagesContainer.appendChild(messageEl);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Show typing indicator
  function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'tobey-typing-indicator';
    typingIndicator.id = 'tobey-typing';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'tobey-typing-dot';
      typingIndicator.appendChild(dot);
    }
    
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Remove typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('tobey-typing');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Show error message
  function showError(message) {
    const errorEl = document.createElement('div');
    errorEl.className = 'tobey-error-message';
    errorEl.textContent = message;
    messagesContainer.appendChild(errorEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Send message
  async function sendMessage() {
    const messageText = inputField.value.trim();
    if (!messageText || isLoading) return;
    
    // Add user message
    messages.push({
      role: "user",
      content: messageText
    });
    
    // Clear input and render messages
    inputField.value = '';
    sendButton.disabled = true;
    isLoading = true;
    renderMessages();
    showTypingIndicator();
    
    try {
      // Send message to webhook
      const response = await fetch('http://174.138.51.74:5678/webhook/demo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentMessage: messageText,
          chatHistory: messages
        })
      });
      
      const data = await response.json();
      removeTypingIndicator();
      
      if (data.status === 'error') {
        showError(data.response || 'An error occurred. Please try again.');
      } else {
        // Add assistant response
        messages.push({
          role: "assistant",
          content: data.response
        });
        renderMessages();
      }
    } catch (error) {
      removeTypingIndicator();
      showError('Failed to connect to the chat service. Please try again later.');
      console.error('Chat error:', error);
    } finally {
      isLoading = false;
      sendButton.disabled = !inputField.value.trim();
    }
  }

  // Initial render
  renderMessages();
})();
