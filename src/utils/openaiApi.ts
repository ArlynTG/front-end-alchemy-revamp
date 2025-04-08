/**
 * Low-level API communication with OpenAI
 */

// OpenAI Assistant ID - Replace with your actual Assistant ID
export const ASSISTANT_ID = "your-assistant-id-here";

// Create a new thread
export const createThread = async (apiKey: string): Promise<string> => {
  console.log("Creating new thread");
  
  const response = await fetch("https://api.openai.com/v1/threads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "OpenAI-Beta": "assistants=v2"
    },
    body: JSON.stringify({})
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    console.error("Thread creation error:", errorData);
    throw new Error(`Error creating thread: ${response.status}`);
  }
  
  const data = await response.json();
  console.log("Thread created:", data.id);
  return data.id;
};

// Add a message to a thread
export const addMessageToThread = async (
  apiKey: string, 
  threadId: string, 
  message: string
): Promise<void> => {
  console.log("Adding message to thread:", threadId);
  
  const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "OpenAI-Beta": "assistants=v2"
    },
    body: JSON.stringify({
      role: "user",
      content: message
    })
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    console.error("Message creation error:", errorData);
    throw new Error(`Error adding message: ${response.status}`);
  }
};

// Run assistant on a thread
export const runAssistantOnThread = async (
  apiKey: string, 
  threadId: string
): Promise<string> => {
  console.log("Running assistant on thread");
  
  const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "OpenAI-Beta": "assistants=v2"
    },
    body: JSON.stringify({
      assistant_id: ASSISTANT_ID
    })
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    console.error("Run creation error:", errorData);
    throw new Error(`Error starting run: ${response.status}`);
  }
  
  const data = await response.json();
  return data.id;
};

// Check run status
export const checkRunStatus = async (
  apiKey: string, 
  threadId: string, 
  runId: string
): Promise<string> => {
  const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "OpenAI-Beta": "assistants=v2"
    }
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    console.error("Run check error:", errorData);
    throw new Error(`Error checking run: ${response.status}`);
  }
  
  const data = await response.json();
  return data.status;
};

// Get messages from thread
export const getMessagesFromThread = async (
  apiKey: string, 
  threadId: string
): Promise<any> => {
  const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "OpenAI-Beta": "assistants=v2"
    }
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    console.error("Messages retrieval error:", errorData);
    throw new Error(`Error retrieving messages: ${response.status}`);
  }
  
  return await response.json();
};

// Check if assistant exists (for testing connection)
export const checkAssistantExists = async (apiKey: string): Promise<boolean> => {
  const response = await fetch(`https://api.openai.com/v1/assistants/${ASSISTANT_ID}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "OpenAI-Beta": "assistants=v2"
    }
  });
  
  console.log("Test response status:", response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Test error response:", errorText);
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  
  await response.json();
  return true;
};
