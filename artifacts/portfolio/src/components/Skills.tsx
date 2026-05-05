import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "React", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "JavaScript (ES6+)", level: 98 },
  { name: "GSAP & Motion", level: 85 },
  { name: "HTML & CSS/SCSS", level: 95 },
  { name: "Vue.js", level: 80 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Figma (UI/UX)", level: 85 },
];

export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

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
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
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
          stagger: 0.1,
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="skills-header">
            <h2 className="text-sm font-medium tracking-widest uppercase text-primary mb-4">Arsenal</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Tools of the trade.</h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-lg">
              I don't just learn frameworks; I master the underlying languages and principles. This allows me to adapt to any stack and build highly performant, accessible web applications from the ground up.
            </p>
          </div>

          <ul ref={listRef} className="space-y-8">
            {SKILLS.map((skill) => (
              <li key={skill.name} className="skill-item">
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-sm tracking-tight">{skill.name}</span>
                  <span className="font-mono text-sm text-primary">{skill.level}%</span>
                </div>
                <div className="h-1 w-full bg-border relative overflow-hidden">
                  <div 
                    className="skill-bar-fill absolute top-0 left-0 h-full bg-primary"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
};
