import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useGSAP(() => {
    gsap.fromTo(
      ".contact-stagger",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: sectionRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current) formRef.current.reset();
    toast({
      title: "Message sent",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-muted/10 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 contact-stagger">
          <h2 className="text-sm font-medium tracking-widest uppercase text-primary mb-4">Contact</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Let's build something.</h3>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Currently available for freelance opportunities and full-time roles. If you're looking for a developer who cares about details, say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-4 flex flex-col justify-center space-y-8 contact-stagger">
            <div>
              <h4 className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Email</h4>
              <a href="mailto:justine.buncag@email.com" className="text-lg font-medium hover:text-primary transition-colors interactive">
                justine.buncag@email.com
              </a>
            </div>
            <div>
              <h4 className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Location</h4>
              <p className="text-lg font-medium">Philippines</p>
            </div>
            <div>
              <h4 className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Socials</h4>
              <div className="flex gap-4">
                <a href="#" className="text-foreground hover:text-primary transition-colors interactive font-medium">GitHub</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors interactive font-medium">LinkedIn</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors interactive font-medium">Twitter</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 glass-panel p-8 md:p-12 contact-stagger">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 relative group">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full bg-transparent border-0 border-b border-border/50 py-3 focus:outline-none focus:border-primary transition-colors interactive font-light text-lg"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2 relative group">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full bg-transparent border-0 border-b border-border/50 py-3 focus:outline-none focus:border-primary transition-colors interactive font-light text-lg"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2 relative group">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  required
                  className="w-full bg-transparent border-0 border-b border-border/50 py-3 focus:outline-none focus:border-primary transition-colors interactive font-light text-lg resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="submit"
                className="w-full md:w-auto px-12 py-4 bg-foreground text-background font-medium hover:bg-primary transition-colors interactive group relative overflow-hidden"
                data-testid="btn-submit-contact"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full text-center py-6 border-t border-border/20">
        <p className="text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} Justine P. Buncag. All rights reserved.
        </p>
      </div>
    </section>
  );
};
