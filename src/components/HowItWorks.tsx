
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Upload, BookOpen, BarChart2, ArrowRight } from "lucide-react";
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
  const iconRef = useRef<HTMLDivElement>(null);
  
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
        <div 
          ref={iconRef}
          className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4 relative z-10"
          data-icon-container
        >
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

const ConnectingArrow = ({ 
  isAnimated, 
  isMobile, 
  index,
  fromElement,
  toElement
}: { 
  isAnimated: boolean; 
  isMobile: boolean; 
  index: number;
  fromElement: HTMLDivElement | null;
  toElement: HTMLDivElement | null;
}) => {
  const arrowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!fromElement || !toElement || !arrowRef.current) return;

    const updateArrowPosition = () => {
      if (!fromElement || !toElement || !arrowRef.current) return;
      
      const fromRect = fromElement.getBoundingClientRect();
      const toRect = toElement.getBoundingClientRect();
      const arrow = arrowRef.current;
      
      if (isMobile) {
        // Mobile - vertical arrow
        const fromX = fromRect.left + fromRect.width / 2;
        const fromY = fromRect.bottom;
        const toX = toRect.left + toRect.width / 2;
        const toY = toRect.top;
        
        const centerX = (fromX + toX) / 2;
        
        // Set position and size for the vertical arrow
        arrow.style.top = `${fromY}px`;
        arrow.style.left = `${centerX}px`;
        arrow.style.height = `${toY - fromY}px`;
        arrow.style.width = '2px';
        
        // Rotate for vertical arrow
        arrow.style.transform = 'translateX(-50%)';
        
        // Add arrowhead at the bottom
        if (isAnimated) {
          setTimeout(() => {
            const arrowhead = document.createElement('div');
            arrowhead.className = 'absolute -bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-0 w-0 h-0 border-l-4 border-r-4 border-t-6 border-t-orange-300 border-l-transparent border-r-transparent';
            arrow.appendChild(arrowhead);
          }, 800 + index * 200);
        }
      } else {
        // Desktop - horizontal arrow
        const fromX = fromRect.right;
        const fromY = fromRect.top + fromRect.height / 2;
        const toX = toRect.left;
        const toY = toRect.top + toRect.height / 2;
        
        // Set position for horizontal arrow
        arrow.style.top = `${fromY}px`;
        arrow.style.left = `${fromX}px`;
        arrow.style.width = `${toX - fromX}px`;
        arrow.style.height = '2px';
        
        // Transform for horizontal arrow with translation
        arrow.style.transform = 'translateY(-50%)';
      }
      
      // Trigger the animation after positioning if animated
      if (isAnimated) {
        setTimeout(() => {
          if (arrowRef.current) {
            if (isMobile) {
              arrowRef.current.style.height = '100%';
            } else {
              arrowRef.current.style.width = '100%';
              
              // Add arrow head for desktop view
              const arrowhead = document.createElement('div');
              arrowhead.className = 'absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-6 border-l-orange-300 border-t-transparent border-b-transparent';
              arrowRef.current.appendChild(arrowhead);
            }
            
            arrowRef.current.style.opacity = '1';
          }
        }, 800 + index * 200);
      }
    };

    // Initial positioning
    updateArrowPosition();
    
    // Update on resize
    window.addEventListener('resize', updateArrowPosition);
    
    return () => {
      window.removeEventListener('resize', updateArrowPosition);
    };
  }, [fromElement, toElement, isAnimated, isMobile, index]);

  return (
    <div 
      ref={arrowRef}
      className="fixed bg-orange-300 z-0 opacity-0"
      style={{
        width: '0%', 
        height: '0%',
        transition: 'all 0.8s cubic-bezier(0.65, 0, 0.35, 1)'
      }}
    />
  );
};

const HowItWorks = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [iconRefs, setIconRefs] = React.useState<(HTMLDivElement | null)[]>([]);
  
  // Animation for the section title
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
          
          // Find all icon containers and update iconRefs
          const iconContainers = document.querySelectorAll('[data-icon-container]');
          setIconRefs(Array.from(iconContainers) as HTMLDivElement[]);
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
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white to-orange-50 relative">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4 opacity-0">
            Smarter Learning. Brighter Futures.
          </h2>
          <p ref={descriptionRef} className="max-w-3xl mx-auto text-lg text-gray-600 opacity-0">
            Our patent-pending platform uses advanced AI to create highly personalized learning plans that actually work for your child. We combine cutting-edge technology with robust security measures to ensure your child gets exactly what they need to succeed while keeping their information completely protected.
          </p>
        </div>
        
        <div className={`${isMobile ? 'grid gap-8' : 'flex items-center relative'}`}>
          {steps.map((step, index) => (
            <React.Fragment key={step.step}>
              <div className={isMobile ? '' : 'flex-1 relative'}>
                <StepCard
                  step={step.step}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  delay={step.delay}
                />
              </div>
              
              {index < steps.length - 1 && iconRefs.length >= steps.length && (
                <ConnectingArrow 
                  isAnimated={isVisible} 
                  isMobile={isMobile}
                  index={index}
                  fromElement={iconRefs[index]}
                  toElement={iconRefs[index + 1]}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Add some custom CSS to handle the arrow styling */}
        <style jsx global>{`
          @keyframes drawArrow {
            from { width: 0; }
            to { width: 100%; }
          }
          
          @keyframes drawArrowVertical {
            from { height: 0; }
            to { height: 100%; }
          }
          
          .border-t-6 {
            border-top-width: 6px;
          }
          
          .border-l-6 {
            border-left-width: 6px;
          }
        `}</style>
      </div>
    </section>
  );
};

export default HowItWorks;
