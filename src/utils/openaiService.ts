
/**
 * Service for interacting with OpenAI Assistants API
 */
import { MessageType } from "@/components/chat/ChatMessage";
import { 
  createThread, 
  addMessageToThread, 
  runAssistantOnThread,
  checkRunStatus,
  getMessagesFromThread,
  checkAssistantExists
} from "./openaiApi";
import { 
  getThreadId, 
  saveThreadId 
} from "./threadManager";

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
    let threadId = getThreadId();
    
    if (!threadId) {
      threadId = await createThread(apiKey);
      saveThreadId(threadId);
    }
    
    // Step 2: Add the user message to the thread
    await addMessageToThread(apiKey, threadId, message);
    
    // Step 3: Run the assistant on the thread
    const runId = await runAssistantOnThread(apiKey, threadId);
    
    // Step 4: Poll for the completion of the run
    let runStatus = "queued";
    
    // Poll until the run is completed
    while (runStatus !== "completed" && runStatus !== "failed" && runStatus !== "expired") {
      // Wait before polling again (1 second)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      runStatus = await checkRunStatus(apiKey, threadId, runId);
      console.log("Updated run status:", runStatus);
    }
    
    if (runStatus !== "completed") {
      throw new Error(`Run did not complete successfully. Status: ${runStatus}`);
    }
    
    // Step 5: Retrieve messages from the thread
    const messagesData = await getMessagesFromThread(apiKey, threadId);
    
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
    return await checkAssistantExists(apiKey);
  } catch (error) {
    console.error("Test connection failed:", error);
    throw error;
  }
};
