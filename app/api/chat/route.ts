// app/api/chat/route.ts
// @ts-ignore: 'ai' has no type declarations
import { createStreamHandler } from "ai";

// Allow larger request bodies for Base64 uploads
export const config = {
  api: { bodyParser: { sizeLimit: "10mb" } },
};

// Create a streaming handler using the OpenAI provider (reads OPENAI_API_KEY & ASSISTANT_ID from env)
const handler = createStreamHandler({ provider: "openai" });

// POST /api/chat
export async function POST(request: Request) {
  // Parse JSON: { message, threadId, fileName?, fileData? }
  const { message, threadId, fileName, fileData } = await request.json();

  // Append Base64 attachment if provided
  let userContent = message;
  if (fileName && fileData) {
    userContent += `\n\nAttachment: ${fileName}\nData (base64): ${fileData}`;
  }

  // Forward to the ai handler
  const proxyReq = new Request(request.url, {
    method: "POST",
    headers: request.headers,
    body: JSON.stringify({ message: userContent, threadId }),
  });

  return handler(proxyReq);
}
