
import { Play } from "lucide-react";
import { Button } from "./ui/button";

const Demo = () => {
  return (
    <section id="demo" className="py-16 md:py-24 bg-tobey-blue/50">
      <div className="container max-w-5xl mx-auto">
        <span className="section-tag mx-auto block w-fit">See It In Action</span>
        <h2 className="section-title mb-4"><strong>How Tobey's Tutor Works</strong></h2>
        <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Watch how our platform personalizes learning based on your child's interests.
        </p>
        
        <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video bg-black/10 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Button size="lg" className="rounded-full bg-tobey-orange hover:bg-tobey-darkOrange text-white flex items-center gap-2 px-6">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </Button>
              <p className="mt-4 text-gray-700">Coming soon - Beta preview available in May</p>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-70"></div>
          
          {/* This would be a real video or thumbnail in production */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-5xl font-bold text-tobey-orange/20">Demo Video Placeholder</div>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">1. Personal Interest Profile</h3>
            <p className="text-gray-600">We start by learning what excites your child - from dinosaurs to space exploration to superheroes.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">2. Adaptive Learning Path</h3>
            <p className="text-gray-600">Our AI combines their interests with curriculum goals to create personalized learning content.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">3. Progress Tracking</h3>
            <p className="text-gray-600">Parents and teachers receive insights on engagement and academic growth over time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
