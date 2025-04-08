
/**
 * Manages OpenAI thread creation and retrieval
 */

// Get thread ID from session storage
export const getThreadId = (): string | null => {
  return sessionStorage.getItem("openai_thread_id");
};

// Save thread ID to session storage
export const saveThreadId = (threadId: string): void => {
  sessionStorage.setItem("openai_thread_id", threadId);
};

// Clear thread ID from session storage
export const clearThreadId = (): void => {
  sessionStorage.removeItem("openai_thread_id");
};
