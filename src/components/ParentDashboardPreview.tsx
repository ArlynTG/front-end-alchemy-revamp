
import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ParentDashboardPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section enters the viewport, set isVisible to true
        if (entry.isIntersecting) {
          setIsVisible(true);
          console.log("Dashboard component is now visible");
        }
      },
      // More aggressive threshold and margin for earlier animation triggering
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Cleanup observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-r from-tobey-blue to-soft-purple text-tobey-text"
    >
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
          <div 
            className={`order-1 md:order-2 shadow-xl rounded-xl overflow-hidden border border-gray-200 transition-all duration-1000 ${
              isVisible 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-32 scale-95"
            }`}
          >
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-b from-purple-500/30 to-transparent ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}></div>
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
      </div>
    </section>
  );
};

export default ParentDashboardPreview;
