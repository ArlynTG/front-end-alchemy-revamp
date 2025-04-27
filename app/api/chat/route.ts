import { createStreamHandler } from "ai";

/**
 * Edge function that streams your OpenAI Assistant.
 * Requires env-vars:
 *   OPENAI_API_KEY
 *   OPENAI_ASSISTANT_ID
 */
export const runtime = "edge";

export const POST = createStreamHandler({
  provider: "openai",
  // No extra config needed if the env-vars have the standard names.
});
