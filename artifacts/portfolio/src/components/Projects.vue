<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(".projects-content", { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 78%" },
    });
  }, sectionRef.value!);
});
onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="projects" ref="sectionRef" class="projects-section">
    <div class="container">

      <div class="projects-content">
        <p class="section-label">Selected Work</p>
        <div class="divider" />

        <div class="projects-header">
          <h3 class="projects-title">Coming soon.</h3>
          <p class="projects-sub">
            Projects are being carefully documented and polished for
            presentation. Check back soon.
          </p>
        </div>

        <!-- Placeholder slots -->
        <div class="placeholder-grid">
          <div class="placeholder-card" v-for="n in 4" :key="n">
            <div class="placeholder-number">0{{ n }}</div>
            <div class="placeholder-body">
              <div class="placeholder-title-bar" />
              <div class="placeholder-line" />
              <div class="placeholder-line short" />
            </div>
            <div class="placeholder-lock">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              In progress
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.projects-section { padding: 8rem 0; background: var(--bg-2); transition: background 0.4s ease; }

.projects-header {
  display: flex; flex-direction: column; gap: 1rem; margin-bottom: 3.5rem;
}
@media (min-width: 768px) {
  .projects-header {
    flex-direction: row; align-items: flex-end;
    justify-content: space-between; gap: 3rem;
  }
}

.projects-title {
  font-size: clamp(2rem, 5vw, 4rem); font-weight: 700; color: var(--fg);
  white-space: nowrap;
}
.projects-sub {
  font-family: var(--font-serif);
  font-size: 1.05rem; color: var(--fg-dim);
  font-weight: 400; line-height: 1.75; max-width: 380px;
}

/* Placeholder cards */
.placeholder-grid {
  display: grid; grid-template-columns: 1fr; gap: 1.5px;
  border: 1px solid var(--border); overflow: hidden;
  border-radius: var(--radius);
}
@media (min-width: 768px) { .placeholder-grid { grid-template-columns: 1fr 1fr; } }

.placeholder-card {
  position: relative; padding: 2.5rem 2.5rem 2rem;
  background: var(--glass); border: none;
  display: flex; flex-direction: column; gap: 1.5rem;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  transition: background var(--transition);
}
.placeholder-card:hover { background: var(--bg); }

.placeholder-number {
  font-family: var(--font-display);
  font-size: 5rem; font-weight: 900;
  color: var(--fg); opacity: 0.04;
  letter-spacing: -0.06em; line-height: 1;
  position: absolute; top: 1.5rem; right: 2rem;
  pointer-events: none; user-select: none;
  transition: opacity 0.4s ease;
}
.placeholder-card:hover .placeholder-number { opacity: 0.07; }

.placeholder-body { display: flex; flex-direction: column; gap: 12px; flex: 1; }

.placeholder-title-bar {
  height: 20px; width: 65%; border-radius: 2px;
  background: var(--surface);
  animation: shimmer 2.5s ease-in-out infinite;
}
.placeholder-line {
  height: 10px; width: 90%; border-radius: 2px;
  background: var(--surface); opacity: 0.6;
  animation: shimmer 2.5s ease-in-out infinite 0.3s;
}
.placeholder-line.short { width: 55%; animation-delay: 0.6s; }

@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 0.9; }
}

.placeholder-lock {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.62rem; font-weight: 500; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--muted);
}
</style>
