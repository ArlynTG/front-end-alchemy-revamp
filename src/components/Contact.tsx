
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Send } from "lucide-react";

interface ContactProps {
  id?: string;
}

const Contact = ({ id }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset submission status after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <section id={id || "contact"} className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium mb-4">Get in Touch with Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about Tobey's Tutor? We're here to help! Get in touch with our team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="bg-tobey-peach/30 p-8 rounded-xl">
            <h3 className="text-2xl font-medium mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-tobey-orange/20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-tobey-orange" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Us</p>
                  <a href="mailto:hello@tobeystutor.com" className="text-tobey-text hover:text-tobey-orange transition-colors">
                    hello@tobeystutor.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-tobey-orange/20 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-tobey-orange" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call Us</p>
                  <a href="tel:+18005551234" className="text-tobey-text hover:text-tobey-orange transition-colors">
                    (800) 555-1234
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button className="btn-primary w-full sm:w-auto">
                Schedule a Demo
              </Button>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-medium mb-6">Send a Message</h3>
            
            {submitted ? (
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <h4 className="text-xl font-medium text-green-600 mb-2">Thank You!</h4>
                <p className="text-gray-600">
                  Your message has been sent successfully. We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="mt-1 min-h-[120px]"
                  />
                </div>
                
                <Button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
