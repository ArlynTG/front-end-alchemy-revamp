
/**
 * Service for interacting with OpenAI Assistants API
 */
interface ChatMessage {
  text: string;
  sender: "user" | "ai";
  isError?: boolean;
}

interface OpenAIRequest {
  message: string;
  history: ChatMessage[];
}

/**
 * Sends a message to OpenAI Assistant
 */
export const sendMessageToOpenAI = async (
  apiKey: string,
  message: string,
  history: ChatMessage[]
): Promise<string> => {
  console.log("Sending request to OpenAI Assistant");
  
  if (!apiKey) {
    throw new Error("OpenAI API Key is required");
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          ...history.map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
          })),
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error response body:", errorData);
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Response received from OpenAI");
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
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
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: "Hello! This is a test message." }
        ],
        max_tokens: 10
      })
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
