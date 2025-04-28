// app/api/chat/route.ts
// Run this route at the edge
export const runtime = 'edge';

import OpenAI from "openai";

// Allow larger request bodies for Base64 uploads
export const config = { api: { bodyParser: { sizeLimit: "10mb" } } };

// Initialize OpenAI client (token from env)
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

  // Create a streaming chat completion (returns an async iterable)
  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_ASSISTANT_ID!,
    messages: [{ role: "user", content }],
    stream: true
  });

  // Convert async iterable to a web ReadableStream for streaming
  const stream = new ReadableStream({
    async pull(controller) {
      for await (const part of completion) {
        const text = part.choices?.[0]?.delta?.content;
        if (text) {
          controller.enqueue(new TextEncoder().encode(text));
        }
      }
      controller.close();
    }
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream" } });
}
