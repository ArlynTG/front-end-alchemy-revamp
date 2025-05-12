
import React, { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const StudentDashboardPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section enters the viewport, set isVisible to true
        if (entry.isIntersecting) {
          setIsVisible(true);
          console.log("Student Dashboard component is now visible");
        }
      },
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

  const handleImageClick = () => {
    navigate('/student-dashboard');
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-r from-indigo-50 to-purple-100 text-tobey-text"
    >
      <div className="container mx-auto">
        <div className="mb-10">
          <Link to="/student-dashboard">
            <Button 
              variant="outline"
              size="sm"
              className="bg-tobey-orange text-white hover:bg-orange-600 border-none text-xs font-medium uppercase tracking-wider px-4 py-1 h-auto rounded-full"
            >
              Student Dashboard
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div 
            className={`order-1 md:order-1 shadow-xl rounded-xl overflow-hidden border border-gray-200 transition-all duration-1000 ${
              isVisible 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-32 scale-95"
            }`}
            onClick={handleImageClick}
            role="button"
            tabIndex={0}
            aria-label="View student dashboard"
            style={{ cursor: 'pointer' }}
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/89c797ba-8f21-4bb2-add3-143aa5485688.png" 
                alt="Student Dashboard Interface" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="order-2 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
              Custom-Created.<br/>
              Crush Goals.
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Our student dashboard ignites personalized learning that hooks kids instantly. Bold visuals, real-time achievement tracking, and seamless chat keep students engaged and building academic confidence.
            </p>
            <div className="space-y-4">
              {[
                "Engaging, gamified mechanics—earn badges, unlock rewards, navigating challenges",
                "24/7 AI tutoring is always on and ready to help",
                "Visual progress trackers show concrete growth, not just effort",
                "Streak system reinforces persistence",
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/student-dashboard">
                <Button className="bg-tobey-orange hover:bg-orange-600 text-white px-6 py-2">
                  View Dashboard Preview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentDashboardPreview;
