import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Luminary UI",
    description: "A highly customizable component library built for modern design systems. Features zero-runtime CSS-in-JS and extensive accessibility support.",
    tags: ["React", "TypeScript", "Storybook"],
    gradient: "from-purple-500/20 to-blue-500/20",
    border: "group-hover:border-purple-500/50",
    initials: "LU"
  },
  {
    title: "VelocityDash",
    description: "Real-time analytics dashboard processing millions of events per second with sub-50ms latency UI updates.",
    tags: ["Vue 3", "D3.js", "WebSocket"],
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "group-hover:border-amber-500/50",
    initials: "VD"
  },
  {
    title: "Motioncraft",
    description: "An animation toolkit that bridges the gap between designers and developers, offering visual editors for complex GSAP timelines.",
    tags: ["GSAP", "CSS Houdini", "Vite"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover:border-emerald-500/50",
    initials: "MC"
  },
  {
    title: "Aperture",
    description: "High-end portfolio generator for professional photographers with dynamic image optimization and fluid masonry layouts.",
    tags: ["Next.js", "Tailwind", "Cloudinary"],
    gradient: "from-rose-500/20 to-pink-500/20",
    border: "group-hover:border-rose-500/50",
    initials: "AP"
  }
];

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Cards stagger animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 bg-muted/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="projects-header mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-sm font-medium tracking-widest uppercase text-primary mb-4">Selected Work</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Proof of craft.</h3>
          </div>
          <p className="text-muted-foreground max-w-md font-light text-lg">
            A curated selection of my most technically challenging and visually demanding projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.title}
              ref={el => cardsRef.current[index] = el}
              className={`group block relative p-8 glass-panel border border-border/50 hover:-translate-y-2 transition-all duration-500 interactive cursor-pointer ${project.border}`}
              data-testid={`project-card-${index}`}
            >
              {/* Image Placeholder */}
              <div className={`w-full aspect-[16/9] mb-8 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 bg-background/80 group-hover:bg-background/40 transition-colors duration-500" />
                <span className="text-6xl font-black text-foreground/20 group-hover:text-foreground/40 transition-colors duration-500 tracking-tighter relative z-10">
                  {project.initials}
                </span>
              </div>

              <div className="flex justify-between items-start mb-4">
                <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h4>
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowUpRight size={20} className="text-primary" />
                </div>
              </div>
              
              <p className="text-muted-foreground mb-8 font-light leading-relaxed h-20">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono px-3 py-1 bg-muted/50 border border-border rounded-full text-foreground/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
