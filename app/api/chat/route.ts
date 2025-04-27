import { createStreamHandler } from "ai";

export const POST = createStreamHandler({
  provider: "openai"         // OPENAI_API_KEY + OPENAI_ASSISTANT_ID already in env
}); 