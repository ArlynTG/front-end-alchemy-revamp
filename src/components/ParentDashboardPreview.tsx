
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";

const ParentDashboardPreview = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-tobey-blue to-soft-purple text-tobey-text">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
              Monitor Progress. Guide Success.
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Our comprehensive parent dashboard gives you real-time insights into your child's learning journey. Track achievements, monitor progress reports, and stay informed with detailed analytics—all designed to help you support your student's development.
            </p>
            <div className="space-y-4">
              {[
                "View skill-based achievement badges earned through practice",
                "Access detailed progress reports and assessments",
                "Easily manage tutoring schedules and receive timely reminders",
                "Communicate directly with Tobey's Tutor through integrated chat"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                  <p className="ml-3 text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 shadow-xl rounded-xl overflow-hidden border border-gray-200">
            <ScrollArea className="h-[500px] bg-white rounded-xl">
              <img 
                src="/lovable-uploads/a97f5981-c114-408c-a498-58594b8dde86.png" 
                alt="Parent Dashboard Interface" 
                className="object-contain w-full"
              />
            </ScrollArea>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentDashboardPreview;
