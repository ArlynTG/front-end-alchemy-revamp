import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-orange-50 p-6">
      <h1 className="text-4xl font-bold text-[var(--tobey-orange)] mb-4">Welcome to Tobey AI Tutor</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
        Empowering neurodiverse learners with personalized AI tutoring. Click below to start chatting.
      </p>
      <Link href="/chat">
        <Button className="bg-[var(--tobey-orange)] hover:bg-[var(--tobey-darkOrange)] text-white px-6 py-3 rounded-lg">
          Go to Chat
        </Button>
      </Link>
    </main>
  );
} 