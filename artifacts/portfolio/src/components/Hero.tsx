import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "../assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const SYNTAX_SNIPPETS = [
  { text: "<Hero />", top: "4%", left: "-8%", delay: 0.2 },
  { text: "useState(false)", top: "16%", right: "-5%", delay: 0.5 },
  { text: "gsap.to('.el', {", bottom: "28%", left: "-10%", delay: 0.8 },
  { text: "import React", bottom: "10%", right: "-4%", delay: 0.4 },
  { text: "const dev = () =>", top: "48%", left: "-12%", delay: 0.6 },
  { text: "flex items-center", top: "70%", right: "-8%", delay: 0.3 },
  { text: "scrollTrigger: {}", bottom: "46%", right: "-10%", delay: 0.7 },
];

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".bg-orb", {
        y: "30%",
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
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="bg-orb absolute top-[15%] left-[30%] w-[600px] h-[600px] rounded-full bg-primary/8 blur-[140px]" />
        <div className="bg-orb absolute bottom-[5%] right-[5%] w-[500px] h-[500px] rounded-full bg-primary/4 blur-[160px]" />
      </div>

      <div className="container relative z-10 px-6 md:px-12 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT — Photo with floating syntax */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-[260px] md:w-[300px] lg:w-[340px]">

              {/* Floating syntax snippets */}
              {SYNTAX_SNIPPETS.map((snippet, i) => (
                <motion.div
                  key={i}
                  className="absolute font-mono text-[9px] md:text-[10px] text-primary/70 bg-background/90 backdrop-blur-sm border border-primary/20 px-2.5 py-1 rounded whitespace-nowrap z-20 pointer-events-none"
                  style={{
                    top: snippet.top,
                    bottom: snippet.bottom,
                    left: snippet.left,
                    right: snippet.right,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.85, 0.55, 0.85],
                    y: [0, -6, 0, -6],
                  }}
                  transition={{
                    opacity: { duration: 3, repeat: Infinity, delay: snippet.delay + 0.5 },
                    y: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: snippet.delay },
                  }}
                >
                  {snippet.text}
                </motion.div>
              ))}

              {/* Photo frame */}
              <div className="relative">
                {/* Decorative corner accents */}
                <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-primary/60 z-10" />
                <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-primary/60 z-10" />
                {/* Amber glow behind photo */}
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-sm z-0 blur-sm" />

                {/* Photo */}
                <div className="relative z-1 overflow-hidden aspect-[3/4]">
                  <img
                    src={profileImage}
                    alt="Justine Buncag"
                    className="w-full h-full object-cover object-top"
                    data-testid="img-profile"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                </div>
              </div>

              {/* Available badge */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full shadow-lg whitespace-nowrap z-30">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground tracking-wide">Available for work</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Name, role, CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left mt-12 lg:mt-0">
            <div className="mb-5 inline-flex lg:justify-start justify-center">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary border border-primary/30 px-4 py-1.5 rounded-full bg-primary/5">
                Front-End Developer
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tighter text-foreground uppercase leading-[0.92] mb-6">
              JUSTINE<br />
              <span className="text-primary">BUNCAG</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground font-light mb-10 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Crafting <span className="text-foreground font-medium">precision-engineered</span> digital experiences through clean code and intentional design.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold overflow-hidden interactive w-full sm:w-auto text-center transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
                data-testid="btn-view-projects"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </a>

              <a
                href="#contact"
                className="group px-8 py-4 bg-transparent text-foreground border border-border hover:border-primary/60 font-medium transition-all duration-300 interactive w-full sm:w-auto text-center"
                data-testid="btn-contact-me"
              >
                Contact Me
              </a>
            </div>

            {/* Stats row */}
            <div className="mt-12 pt-8 border-t border-border/40 flex gap-8 justify-center lg:justify-start">
              <div>
                <div className="text-2xl font-bold text-foreground">8mo</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Experience</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">10+</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Projects</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Passion</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        <div className="w-px h-10 bg-border relative overflow-hidden">
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
