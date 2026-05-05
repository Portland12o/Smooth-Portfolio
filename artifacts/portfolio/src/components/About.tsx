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
        ".about-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
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

          <div className="about-header lg:col-span-4 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-medium tracking-widest uppercase text-primary mb-4">About Me</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Design meets logic.</h3>
            </div>

            <div className="hidden lg:block w-full aspect-square glass-panel border border-border/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-black text-muted/20 uppercase tracking-tighter select-none">JB</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-mono text-[10px] text-primary/50 space-y-1">
                  <div>// front-end developer</div>
                  <div>const passion = "infinite";</div>
                </div>
              </div>
            </div>
          </div>

          <div ref={textRef} className="lg:col-span-8 lg:col-start-5 flex flex-col justify-center">
            <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              <p>
                I'm a front-end developer passionate about the intersection of engineering and design.
                I build interfaces that don't just work flawlessly — they feel <span className="text-foreground font-medium">alive</span>.
              </p>
              <p>
                With a strong eye for visual aesthetics and a solid foundation in modern JavaScript frameworks,
                I bridge the gap between static mockups and interactive reality. Every animation is intentional.
                Every line of code is optimized.
              </p>
              <p>
                My philosophy: <span className="text-foreground italic">"Complex systems deserve elegant interfaces."</span>
              </p>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-8 border-t border-border/50 pt-10">
              <div>
                <div className="text-4xl font-bold text-primary mb-1">8mo</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-1">10+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-1">100%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Commitment</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
