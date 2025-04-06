
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ChatDemo = () => {
  const { toast } = useToast();
  
  return (
    <section id="demo" className="py-16 md:py-24 bg-white">
      <div className="container">
        <span className="section-tag">Demo</span>
        
        <h2 className="section-title">Got Questions?</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Wondering how all this AI works? What's a tutoring session look like? How is progress measured? Just ask!
        </p>
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
          <h3 className="text-xl font-bold mb-4">Get Started with Tobey's Tutor</h3>
          <p className="text-gray-600 mb-6">
            Ready to experience personalized AI tutoring? Sign up today and discover how Tobey's Tutor
            can transform your learning experience.
          </p>
          <Button 
            className="btn-primary"
            onClick={() => {
              toast({
                title: "Coming Soon",
                description: "We're currently working on this feature. Stay tuned!",
              });
            }}
          >
            Try a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
