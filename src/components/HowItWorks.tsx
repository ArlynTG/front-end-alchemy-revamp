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
        "opacity-0 scale-95 transition-all duration-500 overflow-hidden relative h-full",
        "border-2 border-gray-100 hover:border-orange-200"
      )}
    >
      <CardContent className="p-6 flex flex-col h-full">
        {/* Number at the top in the orange circle (formerly icon position) */}
        <div 
          ref={iconRef}
          className="w-12 h-12 rounded-full bg-tobey-orange flex items-center justify-center mb-4 relative z-10"
          data-icon-container
        >
          <span className="text-white text-lg font-semibold">{step}</span>
        </div>
        
        <div className="mb-3">
          <div className="inline-flex items-center">
            {/* Icon next to title in light orange circle */}
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 mr-2">
              {icon}
            </span>
            <h3 className="inline text-xl font-semibold text-tobey-text">{title}</h3>
          </div>
        </div>
        
        <p className="text-gray-600 flex-grow">{description}</p>
      </CardContent>
    </Card>
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
      description: "After you sign up, simply upload any IEPs, report cards, or neuro-psych evaluations—securely and in minutes. Next, your child completes a quick, kid-friendly quiz about their favorite books, shows, and hobbies. We use that input to build lessons around what already excites them.",
      icon: <Upload className="h-5 w-5 text-tobey-orange" />,
      delay: 300
    },
    {
      step: 2,
      title: "Leveraging the Power of AI",
      description: "Our AI pinpoints your child's strengths, gaps, and passions, then designs a research-backed roadmap to mastery. Each day it serves up a 20-minute, gamified challenge that adapts in real time—easing up when they struggle, leveling up when they soar—so progress feels like play, not homework.",
      icon: <BookOpen className="h-5 w-5 text-tobey-orange" />,
      delay: 500
    },
    {
      step: 3,
      title: "See Growth Happen",
      description: "Every milestone unlocks a new badge, boosting your child's pride and motivation. On your side, crystal-clear weekly and monthly reports reveal their wins, next steps, and real lesson snapshots—so you can celebrate progress together and spot any gaps before they grow.",
      icon: <BarChart2 className="h-5 w-5 text-tobey-orange" />,
      delay: 700
    }
  ];
  
  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white to-orange-50 relative">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4 opacity-0">
            How Does it Work? It's as Easy as 1-2-3.
          </h2>
          <p ref={descriptionRef} className="max-w-3xl mx-auto text-lg text-gray-600 opacity-0">
            Our patent-pending AI crafts personalized lessons that move your child toward lasting success—in just 20 minutes a day.
          </p>
        </div>
        
        <div className={`${isMobile ? 'grid gap-8' : 'flex gap-8'} h-full`}>
          {steps.map((step, index) => (
            <div key={step.step} className={isMobile ? '' : 'flex-1'}>
              <StepCard
                step={step.step}
                title={step.title}
                description={step.description}
                icon={step.icon}
                delay={step.delay}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
