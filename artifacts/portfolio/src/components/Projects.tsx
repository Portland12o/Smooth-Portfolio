import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock } from "lucide-react";
import { SiReact, SiTypescript, SiVuedotjs, SiD3, SiNextdotjs, SiTailwindcss } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Luminary UI",
    description: "A highly customizable component library built for modern design systems. Features zero-runtime CSS-in-JS and extensive accessibility support.",
    tags: ["React", "TypeScript", "Storybook"],
    gradient: "from-purple-500/20 to-blue-500/20",
    accent: "border-purple-500/50",
    initials: "LU",
    tagIcons: [<SiReact key="r" />, <SiTypescript key="t" />, null],
  },
  {
    title: "VelocityDash",
    description: "Real-time analytics dashboard processing millions of events per second with sub-50ms latency UI updates.",
    tags: ["Vue 3", "D3.js", "WebSocket"],
    gradient: "from-amber-500/20 to-orange-500/20",
    accent: "border-amber-500/50",
    initials: "VD",
    tagIcons: [<SiVuedotjs key="v" />, <SiD3 key="d" />, null],
  },
  {
    title: "Motioncraft",
    description: "An animation toolkit bridging the gap between designers and developers, with visual editors for complex GSAP timelines.",
    tags: ["GSAP", "CSS Houdini", "Vite"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    accent: "border-emerald-500/50",
    initials: "MC",
    tagIcons: [null, null, null],
  },
  {
    title: "Aperture",
    description: "High-end portfolio generator for professional photographers with dynamic image optimization and fluid masonry layouts.",
    tags: ["Next.js", "Tailwind", "Cloudinary"],
    gradient: "from-rose-500/20 to-pink-500/20",
    accent: "border-rose-500/50",
    initials: "AP",
    tagIcons: [<SiNextdotjs key="n" />, <SiTailwindcss key="tw" />, null],
  }
];

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card) => {
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
              start: "top 88%",
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 bg-muted/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="projects-header mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-sm font-medium tracking-widest uppercase text-primary mb-4">Selected Work</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Coming soon.</h3>
          </div>
          <p className="text-muted-foreground max-w-md font-light text-lg">
            These projects are currently being documented and polished for showcase. Stay tuned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {PROJECTS.map((project, index) => (
            <div
              key={project.title}
              ref={el => cardsRef.current[index] = el}
              className={`group relative overflow-hidden glass-panel border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 interactive`}
              data-testid={`project-card-${index}`}
            >
              {/* Coming Soon Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-[3px] bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <div className="flex items-center gap-2 text-primary border border-primary/40 px-5 py-2.5 rounded-full bg-background/80">
                  <Clock size={14} />
                  <span className="text-sm font-semibold tracking-widest uppercase">Coming Soon</span>
                </div>
              </div>

              {/* Static Coming Soon badge (always visible) */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-background/90 border border-primary/30 px-3 py-1 rounded-full">
                <Clock size={10} className="text-primary" />
                <span className="text-[10px] font-medium tracking-widest uppercase text-primary">Soon</span>
              </div>

              {/* Gradient placeholder */}
              <div className={`w-full aspect-[16/9] bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 bg-background/70 group-hover:bg-background/50 transition-colors duration-500" />
                <span className="text-7xl font-black text-foreground/15 tracking-tighter relative z-10">
                  {project.initials}
                </span>
              </div>

              <div className="p-8">
                <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                  {project.title}
                </h4>
                <p className="text-muted-foreground mb-6 font-light leading-relaxed text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, ti) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 bg-muted/40 border border-border rounded-full text-foreground/70"
                    >
                      {project.tagIcons[ti] && (
                        <span className="text-primary text-sm">{project.tagIcons[ti]}</span>
                      )}
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
