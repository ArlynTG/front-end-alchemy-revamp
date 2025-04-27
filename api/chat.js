import { createStreamHandler } from "ai";

export const config = { runtime: "edge" };

export default createStreamHandler({
  provider: "openai",
  onError(err) {
    console.error("chat-edge error:", err);
  },
});
