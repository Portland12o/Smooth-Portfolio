<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

interface Project {
  title: string;
  initials: string;
  description: string;
  tags: string[];
  gradient: string;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    title: "Luminary UI",
    initials: "LU",
    description: "A highly customizable component library built for modern design systems, with zero-runtime CSS-in-JS and extensive accessibility support.",
    tags: ["React", "TypeScript", "Storybook"],
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(59,130,246,0.25) 100%)",
    accent: "rgba(139,92,246,0.5)",
  },
  {
    title: "VelocityDash",
    initials: "VD",
    description: "Real-time analytics dashboard processing millions of events per second with sub-50ms latency UI updates.",
    tags: ["Vue 3", "D3.js", "WebSocket"],
    gradient: "linear-gradient(135deg, rgba(245,166,35,0.25) 0%, rgba(239,68,68,0.2) 100%)",
    accent: "rgba(245,166,35,0.5)",
  },
  {
    title: "Motioncraft",
    initials: "MC",
    description: "An animation toolkit bridging the gap between designers and developers, with visual editors for complex GSAP timelines.",
    tags: ["GSAP", "CSS Houdini", "Vite"],
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.25) 0%, rgba(20,184,166,0.2) 100%)",
    accent: "rgba(16,185,129,0.5)",
  },
  {
    title: "Aperture",
    initials: "AP",
    description: "High-end portfolio generator for professional photographers with dynamic image optimization and fluid masonry layouts.",
    tags: ["Next.js", "Tailwind", "Cloudinary"],
    gradient: "linear-gradient(135deg, rgba(244,63,94,0.25) 0%, rgba(236,72,153,0.2) 100%)",
    accent: "rgba(244,63,94,0.5)",
  },
];

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(".projects-header", { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 80%" },
    });
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
      gsap.fromTo(card, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%" },
      });
    });
  }, sectionRef.value!);
});
onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="projects" ref="sectionRef" class="projects-section">
    <div class="container">

      <div class="projects-header">
        <div>
          <p class="section-label">Selected Work</p>
          <h3 class="projects-title">Coming soon.</h3>
        </div>
        <p class="projects-sub">
          Projects are being documented and polished for showcase. Stay tuned.
        </p>
      </div>

      <div class="projects-grid">
        <div
          v-for="project in PROJECTS"
          :key="project.title"
          class="project-card glass"
          :data-testid="`project-card-${project.title}`"
        >
          <!-- Coming soon badge -->
          <div class="cs-badge">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            Soon
          </div>

          <!-- Hover overlay -->
          <div class="cs-overlay">
            <div class="cs-overlay-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Coming Soon
            </div>
          </div>

          <!-- Gradient placeholder -->
          <div class="project-thumb" :style="{ background: project.gradient }">
            <div class="project-thumb-bg" />
            <span class="project-initials">{{ project.initials }}</span>
          </div>

          <div class="project-body">
            <h4 class="project-title">{{ project.title }}</h4>
            <p class="project-desc">{{ project.description }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.projects-section {
  padding: 7rem 0;
  background: rgba(255,255,255,0.01);
}

.projects-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 4rem;
}
@media (min-width: 768px) {
  .projects-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.projects-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 700;
  color: var(--fg);
}
.projects-sub {
  color: var(--fg-dim);
  font-weight: 300;
  max-width: 400px;
  line-height: 1.7;
  font-size: 0.95rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 768px) { .projects-grid { grid-template-columns: 1fr 1fr; } }

.project-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
}
.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(245,166,35,0.25);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

/* Coming soon badge (always visible) */
.cs-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(9,9,12,0.9);
  border: 1px solid rgba(245,166,35,0.3);
  color: var(--primary);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
}

/* Hover overlay */
.cs-overlay {
  position: absolute;
  inset: 0;
  z-index: 20;
  background: rgba(9,9,12,0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.35s ease;
}
.project-card:hover .cs-overlay { opacity: 1; }
.cs-overlay-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(9,9,12,0.95);
  border: 1px solid rgba(245,166,35,0.4);
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 10px 24px;
  border-radius: 999px;
}

/* Thumbnail */
.project-thumb {
  width: 100%;
  aspect-ratio: 16/9;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.project-thumb-bg {
  position: absolute;
  inset: 0;
  background: rgba(9,9,12,0.7);
  transition: background 0.4s ease;
}
.project-card:hover .project-thumb-bg { background: rgba(9,9,12,0.5); }
.project-initials {
  font-family: var(--font-display);
  font-size: 4.5rem;
  font-weight: 900;
  color: rgba(255,255,255,0.08);
  letter-spacing: -0.05em;
  position: relative;
  z-index: 1;
  transition: color 0.4s ease;
}
.project-card:hover .project-initials { color: rgba(255,255,255,0.15); }

/* Body */
.project-body { padding: 1.75rem; }
.project-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--fg);
  margin-bottom: 0.75rem;
  transition: color var(--transition);
}
.project-card:hover .project-title { color: var(--primary); }
.project-desc {
  font-size: 0.85rem;
  color: var(--fg-dim);
  font-weight: 300;
  line-height: 1.7;
  margin-bottom: 1.25rem;
}
.project-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.project-tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  padding: 4px 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 999px;
  color: rgba(239,239,239,0.7);
}
</style>
