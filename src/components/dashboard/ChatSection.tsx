
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Creating a detailed mock chat interface with parent questions about homework and accommodations for dyslexia and executive functioning
const MockChatInterface = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-gray-50 rounded p-3 overflow-y-auto mb-3">
        {/* Detailed mock conversation about homework help and accommodations */}
        <div className="flex justify-start mb-3">
          <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">Tobey AI Tutor • 10:15 AM</p>
            <p className="text-gray-800 text-sm">Hello! How can I help you and Alex today?</p>
          </div>
        </div>
        
        <div className="flex justify-end mb-3">
          <div className="bg-blue-100 p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">You • 10:16 AM</p>
            <p className="text-gray-800 text-sm">Alex is struggling with reading comprehension for his homework. The text is too overwhelming and he gets frustrated. Do you have any strategies that could help?</p>
          </div>
        </div>
        
        <div className="flex justify-start mb-3">
          <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">Tobey AI Tutor • 10:17 AM</p>
            <p className="text-gray-800 text-sm">I'd be happy to help with reading strategies for Alex! For students with dyslexia, breaking down text into smaller chunks can make a big difference. Here are some approaches:</p>
            <ul className="list-disc pl-5 mt-1 text-sm text-gray-800">
              <li>Try the "chunking" method - read one paragraph at a time</li>
              <li>Use colored overlays or reading guides to focus on one line</li>
              <li>Take short breaks between sections to process information</li>
              <li>Create a visual mind map of main ideas as you read</li>
            </ul>
            <p className="text-sm text-gray-800 mt-1">Would you like me to create a visual reading guide specifically for Alex's current assignment?</p>
          </div>
        </div>
        
        <div className="flex justify-end mb-3">
          <div className="bg-blue-100 p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">You • 10:19 AM</p>
            <p className="text-gray-800 text-sm">That would be so helpful! Also, Alex keeps forgetting when assignments are due. He has a book report on "Charlotte's Web" due next Friday and hasn't started. He gets overwhelmed with planning longer assignments.</p>
          </div>
        </div>
        
        <div className="flex justify-start mb-3">
          <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">Tobey AI Tutor • 10:21 AM</p>
            <p className="text-gray-800 text-sm">I'll create that reading guide today. For the book report, let's break it down into smaller steps to help with executive functioning:</p>
            <ol className="list-decimal pl-5 mt-1 text-sm text-gray-800">
              <li><strong>Today</strong>: Just brainstorm 3 favorite characters (10 min)</li>
              <li><strong>Tomorrow</strong>: Write one paragraph about the setting (15 min)</li>
              <li><strong>Weekend</strong>: Create a simple timeline of main events</li>
              <li><strong>Monday</strong>: Draft conclusion about favorite parts</li>
              <li><strong>Tuesday</strong>: Put sections together & review</li>
              <li><strong>Wednesday</strong>: Final edits before Friday due date</li>
            </ol>
            <p className="text-gray-800 text-sm mt-1">Would a visual checklist with these steps help Alex track his progress?</p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className="bg-blue-100 p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">You • 10:23 AM</p>
            <p className="text-gray-800 text-sm">A visual checklist would be perfect! Breaking it down like that makes it seem much more manageable. Alex also benefits from text-to-speech - is there a way to use that for his reading assignments?</p>
          </div>
        </div>
        
        <div className="flex justify-start">
          <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-xs text-gray-500 mb-1">Tobey AI Tutor • 10:24 AM</p>
            <p className="text-gray-800 text-sm">Absolutely! I'll include text-to-speech options with the reading guide. I recommend using the built-in screen readers on your device, or apps like Speechify or Natural Reader that can read text aloud. For "Charlotte's Web," there are also excellent audiobook versions that Alex can listen to while following along with the text.</p>
            <p className="text-gray-800 text-sm mt-1">I'll prepare a complete package with the reading guide, visual book report checklist, and text-to-speech instructions by the end of today. Each item will use larger fonts, high contrast colors, and dyslexia-friendly formatting to make them easier for Alex to use independently.</p>
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
