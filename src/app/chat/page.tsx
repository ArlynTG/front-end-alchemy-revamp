
import ChatInterface from "@/components/ChatInterface";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page title matching brand styling */}
        <h1 className="text-3xl font-bold text-center text-[#f97316] mb-8">
          Chat with Tobey AI Tutor
        </h1>
        {/* Chat container with increased height and shadow */}
        <div className="h-[750px] bg-white rounded-xl shadow-lg overflow-hidden">
          <ChatInterface />
        </div>
      </div>
    </main>
  );
} 
