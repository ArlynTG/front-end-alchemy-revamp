import { redirect } from 'next/navigation';

export default function Page() {
  // Directly redirect to the chat page
  redirect('/chat');
} 