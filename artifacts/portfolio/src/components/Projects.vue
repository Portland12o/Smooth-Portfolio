<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(".projects-header", { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 80%" },
    });
    gsap.fromTo(".projects-placeholder", { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: ".projects-placeholder", start: "top 88%" },
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

      <!-- Empty placeholder – projects will be added manually -->
      <div class="projects-placeholder">
        <div class="placeholder-inner">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="placeholder-icon">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18M9 21V9"/>
          </svg>
          <p class="placeholder-text">Projects will appear here</p>
          <p class="placeholder-sub">Add your work to showcase your projects.</p>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.projects-section { padding: 7rem 0; }

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

/* Placeholder */
.projects-placeholder {
  border: 1.5px dashed var(--border);
  border-radius: 8px;
  padding: 5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color var(--transition);
}
.projects-placeholder:hover { border-color: var(--primary); }

.placeholder-inner {
  display: flex; flex-direction: column;
  align-items: center; gap: 0.75rem;
  text-align: center;
}
.placeholder-icon { color: var(--fg-dim); opacity: 0.4; margin-bottom: 0.5rem; }
.placeholder-text {
  font-family: var(--font-display); font-size: 1.1rem;
  font-weight: 600; color: var(--fg-dim);
}
.placeholder-sub {
  font-size: 0.82rem; color: var(--fg-dim); opacity: 0.6;
  font-weight: 300;
}
</style>
