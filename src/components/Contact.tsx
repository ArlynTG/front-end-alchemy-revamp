
import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useFormDebug } from "@/hooks/useFormDebug";

interface ContactProps {
  id?: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = ({ id }: ContactProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  
  // Debug form values in development
  useFormDebug(form.watch(), "Contact Form");
  
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // Create a formatted email body
      const emailBody = {
        to: "support@tobeystutor.com",
        from: data.email,
        name: data.name,
        message: data.message,
      };
      
      // Send the form data to emailjs
      const response = await fetch('https://formsubmit.co/ajax/support@tobeystutor.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: `Contact Form Submission from ${data.name}`
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      console.log("Form submitted:", data);
      toast.success("Message sent! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id={id || "contact"} className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Left Column with Form */}
          <div className="w-full md:w-1/2 space-y-8">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">Got Questions or Feedback? Drop Us a Line.</h2>
              <div className="space-y-2 text-gray-600 mb-8">
                <p>Fill out the form below and we'll get back to you as soon as possible. Please allow 24 to 48 hours for us to respond.</p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Loving Parent" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What would you like to know about Tobey's Tutor?" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-tobey-orange hover:bg-tobey-darkOrange text-white" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={18} />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Right Column with Image Only */}
          <div className="w-full md:w-1/2">
            <img 
              src="/lovable-uploads/f2c71f68-209f-47d8-9df7-25bc9297ae3f.png" 
              alt="Students collaborating on laptops" 
              className="w-full h-auto rounded-xl object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
