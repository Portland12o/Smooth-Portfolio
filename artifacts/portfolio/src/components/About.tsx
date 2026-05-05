import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-medium tracking-widest uppercase text-primary mb-4">About Me</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Design meets logic.</h3>
            </div>
            
            <div className="hidden lg:block w-full aspect-square bg-muted/20 border border-border/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-black text-muted/30 uppercase tracking-tighter">JB</span>
              </div>
            </div>
          </div>

          <div ref={textRef} className="lg:col-span-7 lg:col-start-6 flex flex-col justify-center">
            <div className="space-y-8 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              <p>
                I am a front-end developer obsessed with the intersection of engineering and design. 
                I build interfaces that don't just work flawlessly—they feel <span className="text-foreground font-medium">alive</span>.
              </p>
              <p>
                With a background in both technical architecture and visual aesthetics, I bridge the gap between static mockups and interactive reality. Every animation is intentional. Every line of code is optimized.
              </p>
              <p>
                My philosophy is simple: <span className="text-foreground italic">"Complex systems require elegant interfaces."</span> I specialize in modern JavaScript frameworks, smooth web animations, and building robust component libraries that scale.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8 border-t border-border/50 pt-12">
              <div>
                <div className="text-4xl font-bold text-foreground mb-2">5+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Years Exp.</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-2">40+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-2">100%</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Commitment</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
