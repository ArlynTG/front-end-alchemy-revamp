import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <h1 className="text-4xl font-medium leading-tight mb-4">
            Tobey's Tutor
            <span className="block text-3xl mt-2">
              As parents, we know what it's like to feel stuck. Watching our children struggle with traditional learning methods can be heartbreaking. We built Tobey's Tutor for kids who learn differently, enabling them to unlock their academic potential, build confidence, find their voice — and have fun too.
            </span>
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            At Tobey's Tutor, we've built a platform specially designed to support neurodivergent learners. Our AI assistant adapts to each student's unique learning style, focusing on strengths rather than weaknesses. We transform educational challenges into opportunities for growth and discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="btn-primary">Get Started</Button>
            <Button variant="outline" className="btn-secondary">Learn More</Button>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="feature-highlight">
              <h4 className="font-medium mb-2">Personalized Learning</h4>
              <p className="text-sm text-gray-600">Adapts to your unique learning style and needs in real-time</p>
            </div>
            <div className="feature-highlight">
              <h4 className="font-medium mb-2">AI-Powered Tools</h4>
              <p className="text-sm text-gray-600">Smart technology that makes reading and writing easier and more enjoyable</p>
            </div>
            <div className="feature-highlight">
              <h4 className="font-medium mb-2">Confidence Building</h4>
              <p className="text-sm text-gray-600">Focuses on strengths and builds self-esteem through positive reinforcement</p>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <img 
            src="/lovable-uploads/8df52e8d-0803-4596-8495-7a39f9479a72.png" 
            alt="Student using Tobey's Tutor" 
            className="rounded-xl shadow-lg max-w-full object-cover max-h-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
