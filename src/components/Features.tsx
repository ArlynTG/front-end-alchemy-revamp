
import { BookOpen, Brain, Check, Clock, LightbulbOff, LightbulbOn } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-tobey-orange" />,
      title: "Personalized Learning",
      description: "A tailored approach that adapts to your unique learning style and pace, making education accessible for everyone."
    },
    {
      icon: <Brain className="h-10 w-10 text-tobey-orange" />,
      title: "Neuronal Versatility",
      description: "Harness the creative potential of the dyslexic brain with techniques designed to leverage your natural cognitive strengths."
    },
    {
      icon: <Check className="h-10 w-10 text-tobey-orange" />,
      title: "Confidence Builder",
      description: "Build self-esteem and overcome learning obstacles with a supportive AI tutor that celebrates your progress."
    },
    {
      icon: <Clock className="h-10 w-10 text-tobey-orange" />,
      title: "Frustration Aware",
      description: "Detect when you're stuck and pivot teaching methods to reduce stress and make learning enjoyable again."
    },
    {
      icon: <LightbulbOff className="h-10 w-10 text-tobey-orange" />,
      title: "Pain, Unblocked",
      description: "Identify and address specific learning challenges with strategies that transform difficulties into manageable tasks."
    },
    {
      icon: <LightbulbOn className="h-10 w-10 text-tobey-orange" />,
      title: "Patent Pending",
      description: "Our innovative approach to AI-assisted learning for neurodivergent minds is backed by research and technology."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24">
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
