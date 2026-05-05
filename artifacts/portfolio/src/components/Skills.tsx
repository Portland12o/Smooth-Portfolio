import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiVuedotjs,
  SiTailwindcss,
  SiFigma,
  SiGit,
  SiCss,
} from "react-icons/si";
import { Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "JavaScript (ES6+)", level: 90, icon: <SiJavascript />, color: "#F7DF1E" },
  { name: "React", level: 85, icon: <SiReact />, color: "#61DAFB" },
  { name: "TypeScript", level: 80, icon: <SiTypescript />, color: "#3178C6" },
  { name: "HTML & CSS", level: 95, icon: <SiHtml5 />, color: "#E34F26" },
  { name: "Vue.js", level: 75, icon: <SiVuedotjs />, color: "#42B883" },
  { name: "GSAP & Motion", level: 80, icon: <Zap size={18} />, color: "#88CE02" },
  { name: "Tailwind CSS", level: 88, icon: <SiTailwindcss />, color: "#06B6D4" },
  { name: "Figma (UI/UX)", level: 78, icon: <SiFigma />, color: "#F24E1E" },
  { name: "CSS / SCSS", level: 92, icon: <SiCss />, color: "#1572B6" },
  { name: "Git", level: 82, icon: <SiGit />, color: "#F05032" },
];

export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-header",
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

      const items = gsap.utils.toArray(".skill-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
          }
        }
      );

      const bars = gsap.utils.toArray(".skill-bar-fill");
      gsap.fromTo(
        bars,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12">

        <div className="skills-header mb-16 text-center md:text-left">
          <h2 className="text-sm font-medium tracking-widest uppercase text-primary mb-4">Arsenal</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Tools of the trade.</h3>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
            I don't just learn frameworks — I master the underlying languages and principles, adapting to any stack.
          </p>
        </div>

        <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-7">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="skill-item group">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ color: skill.color }}
                >
                  {skill.icon}
                </span>
                <span className="font-mono text-sm tracking-tight text-foreground/90 flex-1">{skill.name}</span>
                <span className="font-mono text-xs text-primary">{skill.level}%</span>
              </div>
              <div className="h-[2px] w-full bg-border/60 relative overflow-hidden rounded-full">
                <div
                  className="skill-bar-fill absolute top-0 left-0 h-full rounded-full"
                  style={{
                    width: `${skill.level}%`,
                    background: `linear-gradient(to right, hsl(var(--primary)/0.6), hsl(var(--primary)))`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
