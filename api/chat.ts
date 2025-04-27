// api/chat.ts   (Vercel Function for Vite projects)
import { createStreamHandler } from "ai";

/**
 * Streams an OpenAI Assistant conversation.
 * Needs these Environment variables (already set in Vercel):
 *   OPENAI_API_KEY
 *   OPENAI_ASSISTANT_ID
 */
export const config = {
  runtime: "edge",          // run at the edge
};

export default createStreamHandler({
  provider: "openai",
  // No extra options – env-vars are auto-read
});
