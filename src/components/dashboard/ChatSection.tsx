
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Creating a detailed mock chat interface with parent questions about homework and book report
const MockChatInterface = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-gray-50 rounded p-3 overflow-y-auto mb-3">
        {/* Detailed mock conversation about homework help and book report */}
        <div className="flex justify-start mb-3">
          <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">Tobey AI Tutor • 10:15 AM</p>
            <p className="text-gray-800 text-sm">Hello! How can I help you and Alex today?</p>
          </div>
        </div>
        
        <div className="flex justify-end mb-3">
          <div className="bg-blue-100 p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">You • 10:16 AM</p>
            <p className="text-gray-800 text-sm">Alex is struggling with the fractions homework. Do you have any tips to help explain dividing fractions?</p>
          </div>
        </div>
        
        <div className="flex justify-start mb-3">
          <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">Tobey AI Tutor • 10:17 AM</p>
            <p className="text-gray-800 text-sm">I'd be happy to help with fractions! A great way to explain division is using the "Keep, Change, Flip" method. When dividing fractions:</p>
            <ol className="list-decimal pl-5 mt-1 text-sm text-gray-800">
              <li>Keep the first fraction as is</li>
              <li>Change the division sign to multiplication</li>
              <li>Flip the second fraction (find its reciprocal)</li>
            </ol>
            <p className="text-sm text-gray-800 mt-1">For example, 2/3 ÷ 1/4 becomes 2/3 × 4/1 = 8/3.</p>
            <p className="text-sm text-gray-800 mt-1">Would you like me to create a practice worksheet on this topic for Alex?</p>
          </div>
        </div>
        
        <div className="flex justify-end mb-3">
          <div className="bg-blue-100 p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">You • 10:19 AM</p>
            <p className="text-gray-800 text-sm">That's really helpful! Yes, a worksheet would be great. Also, Alex has a book report due next Friday on "Charlotte's Web" - any suggestions for how to structure it?</p>
          </div>
        </div>
        
        <div className="flex justify-start mb-3">
          <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">Tobey AI Tutor • 10:21 AM</p>
            <p className="text-gray-800 text-sm">I'll prepare a worksheet for fractions practice today.</p>
            <p className="text-gray-800 text-sm mt-1">For the "Charlotte's Web" book report, I suggest this structure:</p>
            <ol className="list-decimal pl-5 mt-1 text-sm text-gray-800">
              <li><strong>Introduction</strong>: Basic info about the book and a brief summary</li>
              <li><strong>Main Characters</strong>: Focus on Wilbur and Charlotte, their friendship</li>
              <li><strong>Setting</strong>: The farm and how it affects the story</li>
              <li><strong>Main Themes</strong>: Friendship, loyalty, and the cycle of life</li>
              <li><strong>Favorite Part</strong>: Alex can share what resonated most</li>
              <li><strong>Conclusion</strong>: Personal thoughts on the message of the book</li>
            </ol>
            <p className="text-gray-800 text-sm mt-1">Would Alex benefit from a graphic organizer to plan these sections?</p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className="bg-blue-100 p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">You • 10:23 AM</p>
            <p className="text-gray-800 text-sm">A graphic organizer would be perfect! Alex does better with visual aids. When can we expect these materials?</p>
          </div>
        </div>
        
        <div className="flex justify-start">
          <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">Tobey AI Tutor • 10:24 AM</p>
            <p className="text-gray-800 text-sm">I'll have both the fractions worksheet and the graphic organizer ready for your review by the end of today. I'll make sure the fractions examples are similar to what's in Alex's current homework, and the graphic organizer will include prompting questions to help develop ideas for each section of the book report.</p>
            <p className="text-gray-800 text-sm mt-1">Is there anything specific about either topic that you'd like me to emphasize?</p>
          </div>
        </div>
      </div>
      
      {/* Disabled input area */}
      <div className="border-t border-gray-200 p-4 bg-white rounded">
        <div className="flex flex-col gap-2">
          <textarea
            placeholder="Type a message... (Preview only)"
            disabled
            className="flex-1 min-h-[80px] resize-none bg-gray-100 border border-gray-200 rounded p-2 text-gray-500"
            aria-label="Type your message"
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">This is a preview. Chat functionality will be available to Beta subscribers.</div>
            <button
              disabled
              className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0 py-3">
        <CardTitle className="flex items-center text-base">
          <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
          Chat with Tobey's Tutor
        </CardTitle>
        <CardDescription className="text-xs">
          {!isMobile && "Get homework help, learning resources, and personalized assistance"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden flex flex-col p-2">
        <div className="h-full">
          <MockChatInterface />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatSection;
