
import { BookUser, Star, Eye, Smile, Brain, Wand2 } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <BookUser className="h-10 w-10 text-tobey-orange" />,
      title: "Personalized Learning",
      description: "Lessons adapt to your child's interests, pace, and challenges them in real time."
    },
    {
      icon: <Star className="h-10 w-10 text-tobey-orange" />,
      title: "Patent Pending",
      description: "Uses intelligent, responsive agentic AI built specifically for neurodiverse learners."
    },
    {
      icon: <Eye className="h-10 w-10 text-tobey-orange" />,
      title: "Parental Visibility",
      description: "Regular progress reports shows how your child is doing and what they're working on."
    },
    {
      icon: <Smile className="h-10 w-10 text-tobey-orange" />,
      title: "Confidence Builder",
      description: "Teaches kids how to ask for help, stay motivated, and feel proud of progress."
    },
    {
      icon: <Brain className="h-10 w-10 text-tobey-orange" />,
      title: "Frustration Aware",
      description: "Detects when your child is overwhelmed and adjusts before they shut down."
    },
    {
      icon: <Wand2 className="h-10 w-10 text-tobey-orange" />,
      title: "Fun, Unlocked",
      description: "Creatively uses your kid's favorite characters, hobbies and interests to build themed lessons."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container">
        <span className="section-tag">Features</span>
        <h2 className="section-title">Tailored Learning. Limitless Potential.</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card hover:shadow-md transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
