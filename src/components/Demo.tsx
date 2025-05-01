
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SimpleChatInterface from "@/components/chat/SimpleChatInterface";
import ReportCardUpload from "@/components/chat/ReportCardUpload";
import { useState } from "react";

const Demo = () => {
  const [reportText, setReportText] = useState<string | null>(null);

  const handleUploadComplete = (text: string) => {
    setReportText(text);
  };

  return (
    <section id="demo-faq" className="py-16 md:py-24 bg-white">
      <div className="container max-w-5xl mx-auto">
        <span className="section-tag block text-left">Try it</span>
        <h2 className="section-title mb-4"><strong>Got Questions?</strong></h2>
        <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Wondering how we use AI or want to sample tutoring session? Just ask.
        </p>
        
        <div className="relative rounded-xl overflow-hidden shadow-xl mb-16 bg-white border border-gray-200">
          <div className="p-4">
            <SimpleChatInterface reportText={reportText} />
          </div>
        </div>

        <ReportCardUpload onUploadComplete={handleUploadComplete} />
        
        <div className="text-center mt-8 space-y-4">
          <Link to="/demo-v4">
            <Button className="bg-tobey-orange hover:bg-tobey-darkOrange text-white font-medium">
              Try Our Full-Screen Demo
            </Button>
          </Link>
          <div className="mt-2">
            <Link to="/demo-v5">
              <Button variant="outline" className="border-tobey-orange text-tobey-orange hover:bg-tobey-peach/20 font-medium">
                Try Our Latest Demo Version
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
