
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TobeyChat from "@/components/chat/TobeyChat";
import ReportCardUpload from "@/components/chat/ReportCardUpload";

export default function ChatPage() {
  const [reportText, setReportText] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUploadComplete = (text: string) => {
    setReportText(text);
    toast({
      title: "Report Card Uploaded",
      description: "Your report card has been processed and is ready for analysis.",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page title matching brand styling */}
        <h1 className="text-3xl font-bold text-center text-[#f97316] mb-8">
          Chat with Tobey AI Tutor
        </h1>

        <ReportCardUpload onUploadComplete={handleUploadComplete} />
        
        {/* Chat container with fixed height and shadow */}
        <div className="h-[600px] bg-white rounded-xl shadow-lg overflow-hidden mt-8">
          <TobeyChat reportText={reportText} />
        </div>
      </div>
    </main>
  );
}
