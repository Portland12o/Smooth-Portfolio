<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const PROJECTS = [
  {
    title: "Luminary UI",
    number: "01",
    description: "A highly customizable component library for modern design systems with zero-runtime CSS-in-JS and accessibility support.",
    tags: ["C#", "CSS", "HTML"],
    accent: "#8B5CF6",
  },
  {
    title: "VelocityDash",
    number: "02",
    description: "Real-time analytics dashboard processing millions of events per second with sub-50ms latency UI updates.",
    tags: ["Python", "CSS", "Git"],
    accent: "#F5A623",
  },
  {
    title: "Motioncraft",
    number: "03",
    description: "An animation toolkit bridging designers and developers, with visual editors for complex CSS animation timelines.",
    tags: ["CSS", "HTML", "Figma"],
    accent: "#10B981",
  },
  {
    title: "Aperture",
    number: "04",
    description: "High-end portfolio generator for photographers with dynamic image optimization and fluid masonry layouts.",
    tags: ["C#", "HTML", "Figma"],
    accent: "#F43F5E",
  },
];

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(".projects-header", { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 80%" },
    });
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
      gsap.fromTo(card, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
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
          <!-- Number -->
          <span class="project-number">{{ project.number }}</span>

          <!-- Top row: title + badge -->
          <div class="project-top">
            <h4 class="project-title">{{ project.title }}</h4>
            <div class="cs-badge">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Coming Soon
            </div>
          </div>

          <!-- Divider -->
          <div class="project-divider" :style="{ background: project.accent }" />

          <!-- Description -->
          <p class="project-desc">{{ project.description }}</p>

          <!-- Tags -->
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
          </div>

          <!-- Bottom coming soon strip -->
          <div class="cs-strip" :style="{ borderColor: project.accent + '33' }">
            <div class="cs-strip-inner" :style="{ color: project.accent }">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Project in progress — launching soon
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
  background: rgba(0,0,0,0.02);
}

.projects-header {
  display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 4rem;
}
@media (min-width: 768px) {
  .projects-header { flex-direction: row; align-items: flex-end; justify-content: space-between; }
}

.projects-title {
  font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; color: var(--fg);
}
.projects-sub {
  color: var(--fg-dim); font-weight: 300;
  max-width: 400px; line-height: 1.7; font-size: 0.95rem;
}

.projects-grid {
  display: grid; grid-template-columns: 1fr; gap: 1.5rem;
}
@media (min-width: 768px) { .projects-grid { grid-template-columns: 1fr 1fr; } }

/* Card */
.project-card {
  position: relative;
  padding: 2rem;
  display: flex; flex-direction: column; gap: 1rem;
  transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
  overflow: hidden;
}
.project-card:hover {
  transform: translateY(-6px);
  border-color: var(--border-hover);
  box-shadow: 0 16px 50px rgba(0,0,0,0.25);
}

/* Ghost number watermark */
.project-number {
  position: absolute; top: 1rem; right: 1.5rem;
  font-family: var(--font-display);
  font-size: 4rem; font-weight: 900;
  color: var(--fg); opacity: 0.04;
  letter-spacing: -0.05em;
  pointer-events: none; user-select: none;
  transition: opacity 0.4s ease;
}
.project-card:hover .project-number { opacity: 0.06; }

/* Top row */
.project-top {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 1rem;
}

.project-title {
  font-size: 1.35rem; font-weight: 700; color: var(--fg);
  transition: color var(--transition);
  line-height: 1.2;
}
.project-card:hover .project-title { color: var(--primary); }

/* Coming soon badge */
.cs-badge {
  display: flex; align-items: center; gap: 5px; flex-shrink: 0;
  background: var(--primary-glow);
  border: 1px solid rgba(245,166,35,0.3);
  color: var(--primary);
  font-size: 0.58rem; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 4px 10px; border-radius: 999px;
}

/* Accent divider */
.project-divider {
  height: 2px; border-radius: 2px;
  width: 40px;
  transition: width 0.4s ease;
}
.project-card:hover .project-divider { width: 70px; }

/* Description */
.project-desc {
  font-size: 0.875rem; color: var(--fg-dim);
  font-weight: 300; line-height: 1.75;
  flex: 1;
}

/* Tags */
.project-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.project-tag {
  font-family: var(--font-mono); font-size: 0.65rem;
  padding: 4px 12px;
  background: var(--primary-glow);
  border: 1px solid var(--border); border-radius: 999px;
  color: var(--fg-dim);
}

/* Bottom strip */
.cs-strip {
  margin: 0.5rem -2rem -2rem;
  padding: 0.75rem 2rem;
  border-top: 1px solid;
}
.cs-strip-inner {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.68rem; font-weight: 600;
  letter-spacing: 0.06em; text-transform: uppercase;
}
</style>
