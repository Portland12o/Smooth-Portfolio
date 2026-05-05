import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax effect
      gsap.to(".bg-orb", {
        y: "30%",
        rotation: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="bg-orb absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] mix-blend-screen" />
        <div className="bg-orb absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] mix-blend-screen" />
      </div>

      <div className="container relative z-10 px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-block"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary/80 border border-primary/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
            Available for new opportunities
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-foreground mb-4 uppercase"
        >
          JUSTINE P.<br className="md:hidden" /> BUNCAG
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl md:text-3xl text-muted-foreground font-light mb-12 max-w-2xl"
        >
          Front-End Developer crafting <span className="text-foreground font-medium">precision-engineered</span> digital experiences.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a 
            href="#projects" 
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-none overflow-hidden interactive"
            data-testid="btn-view-projects"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
          
          <a 
            href="#contact" 
            className="group relative px-8 py-4 bg-transparent text-foreground border border-border hover:border-primary/50 font-medium transition-colors interactive"
            data-testid="btn-contact-me"
          >
            <span className="relative z-10">Contact Me</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-[1px] h-12 bg-border relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};
