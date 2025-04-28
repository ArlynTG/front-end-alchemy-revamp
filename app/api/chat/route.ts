// app/api/chat/route.ts
import OpenAI from "openai-edge";
import { NextResponse } from "next/server";

// Allow larger request bodies for Base64 uploads
export const config = { api: { bodyParser: { sizeLimit: "10mb" } } };

// Initialize edge-compatible OpenAI client (reads OPENAI_API_KEY & OPENAI_ASSISTANT_ID from env)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /api/chat
export async function POST(request: Request) {
  // Deserialize incoming payload
  const { message, threadId, fileName, fileData } = await request.json();

  // Build user content, including any attachment
  let content = message;
  if (fileName && fileData) {
    content += `\n\nAttachment: ${fileName}\nData (base64): ${fileData}`;
  }

  // Create a streaming chat completion
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_ASSISTANT_ID!,
    messages: [{ role: "user", content }],
    stream: true
  });

  // Return the raw streaming response
  return new Response(response.body, {
    headers: { "Content-Type": "text/event-stream" }
  });
}
