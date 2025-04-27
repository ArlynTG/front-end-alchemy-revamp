import { createStreamHandler } from "ai";

/**
 * Edge function that streams your OpenAI Assistant and
 * keeps multi-turn memory automatically (cookie-stored thread_id).
 *
 * Environment variables that must already exist in Vercel:
 *   OPENAI_API_KEY
 *   OPENAI_ASSISTANT_ID
 *
 * Nothing else is required—`createStreamHandler` reads those vars
 * and handles streaming + cookies for you.
 */
export const runtime = "edge";

export const POST = createStreamHandler({
  provider: "openai",
});
