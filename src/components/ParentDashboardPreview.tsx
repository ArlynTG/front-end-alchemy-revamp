
import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const ParentDashboardPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const scrollAnimationRef = useRef<number | null>(null);

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

  // Auto-scroll animation when component is visible
  useEffect(() => {
    const scrollImage = () => {
      if (!imageRef.current || !scrollAreaRef.current || !isVisible) return;
      
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (!scrollContainer) return;

      // Get the total scrollable height
      const scrollHeight = imageRef.current.scrollHeight - scrollContainer.clientHeight;
      
      // Scroll speed (pixels per animation frame)
      const scrollSpeed = 0.5;
      
      // Current scroll position
      let currentScroll = scrollContainer.scrollTop;
      
      // Animation function
      const animate = () => {
        if (!isVisible) return;
        
        if (currentScroll >= scrollHeight) {
          // Reset to top when reaching the bottom
          currentScroll = 0;
        } else {
          // Increment scroll position
          currentScroll += scrollSpeed;
        }
        
        // Apply scroll
        if (scrollContainer) {
          scrollContainer.scrollTop = currentScroll;
        }
        
        // Continue animation
        scrollAnimationRef.current = requestAnimationFrame(animate);
      };
      
      // Start animation
      scrollAnimationRef.current = requestAnimationFrame(animate);
    };

    // Start scrolling when component becomes visible
    if (isVisible) {
      scrollImage();
    }

    // Cleanup animation on unmount or when not visible
    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
        scrollAnimationRef.current = null;
      }
    };
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-r from-tobey-blue to-soft-purple text-tobey-text"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-10">
          <Button variant="outline" className="btn-secondary">
            Parent Dashboard
          </Button>
          <div className="text-center flex-grow">
            <span className="section-tag">Parent Dashboard</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
              Monitor Progress.<br/>
              Guide Success.
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
                  <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
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
            ref={scrollAreaRef}
          >
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-b from-purple-500/30 to-transparent ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}></div>
              <ScrollArea className="h-[500px] bg-white rounded-xl">
                <img 
                  ref={imageRef}
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
