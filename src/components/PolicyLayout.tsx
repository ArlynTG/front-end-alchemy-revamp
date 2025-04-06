
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PolicyLayoutProps {
  title: string;
  children: ReactNode;
  lastUpdated?: string;
}

const PolicyLayout = ({ title, children, lastUpdated = "April 1, 2025" }: PolicyLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-16 bg-tobey-peach">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-medium mb-4 text-center">{title}</h1>
          <p className="text-sm text-gray-500 text-center mb-8">Last Updated: {lastUpdated}</p>
          
          <div className="bg-white/80 p-8 rounded-xl shadow-sm">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolicyLayout;
