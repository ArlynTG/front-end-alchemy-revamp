
/**
 * Service for interacting with n8n workflows
 */
interface ChatMessage {
  text: string;
  sender: "user" | "ai";
  isError?: boolean;
}

interface N8nPayload {
  message: string;
  history: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

interface N8nResponse {
  response: string;
}

/**
 * Sends a message to the n8n workflow
 */
export const sendMessageToWorkflow = async (
  url: string,
  message: string,
  history: ChatMessage[]
): Promise<N8nResponse> => {
  console.log("Sending request to n8n workflow:", url);
  
  // Convert chat history to n8n expected format
  const payload: N8nPayload = {
    message,
    history: history.map(entry => ({
      role: entry.sender === "ai" ? "assistant" : "user",
      content: entry.text
    }))
  };
  
  console.log("Payload:", payload);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  console.log("Response status:", response.status);
  
  if (!response.ok) {
    const errorData = await response.text();
    console.error("Error response body:", errorData);
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  console.log("Response data:", data);
  
  return data;
};

/**
 * Tests the connection to an n8n workflow
 */
export const testWorkflowConnection = async (url: string): Promise<boolean> => {
  console.log("Testing connection to:", url);
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "test_connection",
      history: []
    }),
  });

  console.log("Test response status:", response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Test error response:", errorText);
    
    if (response.status === 500) {
      throw new Error(`Server error (500): This usually indicates a problem within the n8n workflow itself.`);
    } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  }

  // Try to parse the response
  const data = await response.json();
  console.log("Test response data:", data);
  
  return true;
};
