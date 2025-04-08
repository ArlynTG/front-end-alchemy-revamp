/**
 * Service for interacting with OpenAI Assistants API
 */
import { MessageType } from "@/components/chat/ChatInterface";

// OpenAI Assistant ID
const ASSISTANT_ID = "asst_FqUDE3yX9ySYqb8eUxUkU4lZ";

/**
 * Sends a message to OpenAI Assistant
 */
export const sendMessageToOpenAI = async (
  apiKey: string,
  message: string,
  history: MessageType[]
): Promise<string> => {
  console.log("Sending request to OpenAI Assistant");
  
  if (!apiKey) {
    throw new Error("OpenAI API Key is required");
  }

  try {
    // Step 1: Create a thread if it doesn't exist in session storage
    let threadId = sessionStorage.getItem("openai_thread_id");
    
    if (!threadId) {
      console.log("Creating new thread");
      const threadResponse = await fetch("https://api.openai.com/v1/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "OpenAI-Beta": "assistants=v1"
        },
        body: JSON.stringify({})
      });
      
      if (!threadResponse.ok) {
        const errorData = await threadResponse.text();
        console.error("Thread creation error:", errorData);
        throw new Error(`Error creating thread: ${threadResponse.status}`);
      }
      
      const threadData = await threadResponse.json();
      threadId = threadData.id;
      sessionStorage.setItem("openai_thread_id", threadId);
      console.log("Thread created:", threadId);
    }
    
    // Step 2: Add the user message to the thread
    console.log("Adding message to thread:", threadId);
    const messageResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "OpenAI-Beta": "assistants=v1"
      },
      body: JSON.stringify({
        role: "user",
        content: message
      })
    });
    
    if (!messageResponse.ok) {
      const errorData = await messageResponse.text();
      console.error("Message creation error:", errorData);
      throw new Error(`Error adding message: ${messageResponse.status}`);
    }
    
    // Step 3: Run the assistant on the thread
    console.log("Running assistant on thread");
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "OpenAI-Beta": "assistants=v1"
      },
      body: JSON.stringify({
        assistant_id: ASSISTANT_ID
      })
    });
    
    if (!runResponse.ok) {
      const errorData = await runResponse.text();
      console.error("Run creation error:", errorData);
      throw new Error(`Error starting run: ${runResponse.status}`);
    }
    
    const runData = await runResponse.json();
    let runId = runData.id;
    
    // Step 4: Poll for the completion of the run
    let runStatus = runData.status;
    console.log("Initial run status:", runStatus);
    
    // Poll until the run is completed
    while (runStatus !== "completed" && runStatus !== "failed" && runStatus !== "expired") {
      // Wait before polling again (500ms)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const runCheckResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "OpenAI-Beta": "assistants=v1"
        }
      });
      
      if (!runCheckResponse.ok) {
        const errorData = await runCheckResponse.text();
        console.error("Run check error:", errorData);
        throw new Error(`Error checking run: ${runCheckResponse.status}`);
      }
      
      const runCheckData = await runCheckResponse.json();
      runStatus = runCheckData.status;
      console.log("Updated run status:", runStatus);
    }
    
    if (runStatus !== "completed") {
      throw new Error(`Run did not complete successfully. Status: ${runStatus}`);
    }
    
    // Step 5: Retrieve messages from the thread
    const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "OpenAI-Beta": "assistants=v1"
      }
    });
    
    if (!messagesResponse.ok) {
      const errorData = await messagesResponse.text();
      console.error("Messages retrieval error:", errorData);
      throw new Error(`Error retrieving messages: ${messagesResponse.status}`);
    }
    
    const messagesData = await messagesResponse.json();
    
    // Get the most recent assistant message
    const assistantMessages = messagesData.data.filter(msg => msg.role === "assistant");
    if (assistantMessages.length === 0) {
      throw new Error("No assistant messages found");
    }
    
    const latestMessage = assistantMessages[0];
    const messageContent = latestMessage.content[0].text.value;
    
    console.log("Response received from OpenAI Assistant");
    return messageContent;
  } catch (error) {
    console.error("Error calling OpenAI Assistant:", error);
    throw error;
  }
};

/**
 * Tests the connection to OpenAI
 */
export const testOpenAIConnection = async (apiKey: string): Promise<boolean> => {
  console.log("Testing connection to OpenAI");
  
  if (!apiKey) {
    throw new Error("OpenAI API Key is required");
  }

  try {
    // Simple test to check if the assistant exists
    const response = await fetch(`https://api.openai.com/v1/assistants/${ASSISTANT_ID}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "OpenAI-Beta": "assistants=v1"
      }
    });

    console.log("Test response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Test error response:", errorText);
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    await response.json();
    console.log("Test successful");
    
    return true;
  } catch (error) {
    console.error("Test connection failed:", error);
    throw error;
  }
};
