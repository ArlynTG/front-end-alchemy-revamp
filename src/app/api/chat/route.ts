// @ts-ignore: createStreamHandler is provided by the ai package
import { createStreamHandler } from "ai";

// Increase JSON body size limit to accommodate Base64 file uploads
export const config = {
  api: { bodyParser: { sizeLimit: "10mb" } },
};

// Base handler with streaming via OpenAI provider
const handler = createStreamHandler({ provider: "openai" });

// POST /api/chat
export async function POST(request: Request) {
  // Parse incoming JSON: message, threadId, optional fileName/fileData
  const { message, threadId, fileName, fileData } = await request.json();

  // If a file is attached, append its Base64 payload to the message content
  let userContent = message;
  if (fileName && fileData) {
    userContent += `\n\nAttachment: ${fileName}\nData (base64): ${fileData}`;
  }

  // Create a new Request for the stream handler, preserving headers and URL
  const proxyReq = new Request(request.url, {
    method: "POST",
    headers: request.headers,
    body: JSON.stringify({ message: userContent, threadId }),
  });

  // Delegate to the built-in streaming handler
  return handler(proxyReq);
} 