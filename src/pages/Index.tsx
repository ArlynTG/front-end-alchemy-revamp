
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ParentDashboardPreview from "@/components/ParentDashboardPreview";
import Story from "@/components/Story";
import FullWidthCTA from "@/components/FullWidthCTA";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ParentDashboardPreview />
        <Story />
        <FullWidthCTA />
        <Pricing />
        <Contact id="contact" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
