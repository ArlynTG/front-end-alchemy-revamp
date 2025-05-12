
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Upload, BookOpen, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const StepCard = ({ 
  step, 
  title, 
  description, 
  icon, 
  delay 
}: { 
  step: number; 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  delay: number; 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-scale-in');
            entry.target.classList.remove('opacity-0', 'scale-95');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  return (
    <Card 
      ref={cardRef}
      className={cn(
        "opacity-0 scale-95 transition-all duration-500 overflow-hidden relative",
        "border-2 border-gray-100 hover:border-orange-200"
      )}
    >
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center">
            {icon}
          </div>
        </div>
        
        <div className="mb-3">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-tobey-orange text-white text-xs font-medium mr-2">
            {step}
          </span>
          <h3 className="inline text-xl font-semibold text-tobey-text">{title}</h3>
        </div>
        
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const ConnectingLine = ({ isAnimated, isMobile, index }: { isAnimated: boolean; isMobile: boolean; index: number }) => {
  const lineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isAnimated && lineRef.current) {
      setTimeout(() => {
        if (lineRef.current) {
          lineRef.current.style.width = '100%';
        }
      }, 800 + (index * 200));
    }
  }, [isAnimated, index]);
  
  if (isMobile) return null;
  
  return (
    <div className="flex-1 px-2 flex items-center justify-center">
      <div 
        ref={lineRef}
        className="h-1 bg-orange-300 w-0 transition-all duration-1000"
        style={{ transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)' }}
      />
    </div>
  );
};

const HowItWorks = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  
  // Animation for the section title
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
          titleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const descObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }, 200);
          descObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }
    
    if (descriptionRef.current) {
      descObserver.observe(descriptionRef.current);
    }
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (titleRef.current) titleObserver.unobserve(titleRef.current);
      if (descriptionRef.current) descObserver.unobserve(descriptionRef.current);
    };
  }, []);
  
  const steps = [
    {
      step: 1,
      title: "Getting to Know You",
      description: "Once you sign up, you'll be able to securely upload your child's academic records—including IEPs, report cards, or neuropsych evaluations. Your child will also complete a fun, easy onboarding where they tell us their favorite books, shows, characters, hobbies, and sports so we can build lessons around what they already love.",
      icon: <Upload className="h-6 w-6 text-tobey-orange" />,
      delay: 300
    },
    {
      step: 2,
      title: "Leveraging the Power of AI",
      description: "Our AI analyzes your child's academic needs and interests, then uses evidence-based educational methods to create a personalized long-term learning plan. It breaks this plan into bite-sized daily lessons tailored to your child's current level—adjusting difficulty in real-time based on how they're doing. Lessons are gamified, fun, and challenging, so learning feels exciting—not like schoolwork.",
      icon: <BookOpen className="h-6 w-6 text-tobey-orange" />,
      delay: 500
    },
    {
      step: 3,
      title: "See Growth Happen",
      description: "Your child earns badges and achievements as they progress. Meanwhile, you get clear weekly and monthly reports showing what they're working on, how they're improving, and where support is still needed—with real examples pulled from their actual tutoring sessions.",
      icon: <BarChart2 className="h-6 w-6 text-tobey-orange" />,
      delay: 700
    }
  ];
  
  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white to-orange-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4 opacity-0">
            Smarter Learning. Brighter Futures.
          </h2>
          <p ref={descriptionRef} className="max-w-3xl mx-auto text-lg text-gray-600 opacity-0">
            Our patent-pending platform uses advanced AI to create highly personalized learning plans that actually work for your child. We combine cutting-edge technology with robust security measures to ensure your child gets exactly what they need to succeed while keeping their information completely protected.
          </p>
        </div>
        
        <div className={`${isMobile ? 'grid gap-8' : 'flex items-center'}`}>
          {steps.map((step, index) => (
            <React.Fragment key={step.step}>
              <div className={isMobile ? '' : 'flex-1'}>
                <StepCard
                  step={step.step}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  delay={step.delay}
                />
              </div>
              
              {index < steps.length - 1 && (
                <ConnectingLine 
                  isAnimated={isVisible} 
                  isMobile={isMobile}
                  index={index}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Mobile version of connecting dots - only shown on mobile */}
        {isMobile && (
          <div className="flex justify-center mt-4 space-x-2">
            {steps.map((_, index) => (
              <React.Fragment key={index}>
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  isVisible ? "bg-tobey-orange" : "bg-gray-300",
                  isVisible && "animate-pulse"
                )}
                style={{
                  animationDelay: `${index * 300}ms`,
                  opacity: isVisible ? 1 : 0.5,
                  transition: "opacity 0.5s ease",
                  transitionDelay: `${index * 300}ms`
                }}
                />
                
                {index < steps.length - 1 && (
                  <div className="relative w-12 h-2 flex items-center">
                    <div className="absolute w-full h-0.5 bg-gray-200" />
                    <div 
                      className="absolute h-0.5 bg-tobey-orange" 
                      style={{
                        width: isVisible ? '100%' : '0',
                        transition: 'width 0.8s ease',
                        transitionDelay: `${(index * 300) + 300}ms`
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
