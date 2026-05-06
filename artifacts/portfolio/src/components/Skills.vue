<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const listRef   = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const SKILLS = [
  { name: "HTML5",       level: 90, color: "#E34F26", icon: "H5" },
  { name: "CSS / SCSS",  level: 88, color: "#1572B6", icon: "CS" },
  { name: "C#",          level: 78, color: "#9B4F96", icon: "C#" },
  { name: "Python",      level: 72, color: "#3776AB", icon: "Py" },
  { name: "Figma",       level: 85, color: "#F24E1E", icon: "Fi" },
  { name: "Git",         level: 80, color: "#F05032", icon: "Gt" },
];

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(".skills-header-content", { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 80%" },
    });
    gsap.fromTo(gsap.utils.toArray(".skill-row"), { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: listRef.value, start: "top 85%" },
    });
    gsap.fromTo(gsap.utils.toArray(".skill-fill"), { scaleX: 0 }, {
      scaleX: 1, duration: 1.1, stagger: 0.1, ease: "power3.out",
      transformOrigin: "left center",
      scrollTrigger: { trigger: listRef.value, start: "top 85%" },
    });
  }, sectionRef.value!);
});
onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="skills" ref="sectionRef" class="skills-section">
    <div class="container">

      <div class="skills-header-content">
        <p class="section-label">Arsenal</p>
        <h3 class="skills-title">Tools of the trade.</h3>
        <p class="skills-sub">
          I master the underlying languages and principles,
          adapting to any challenge with confidence and precision.
        </p>
      </div>

      <div ref="listRef" class="skills-grid">
        <div v-for="skill in SKILLS" :key="skill.name" class="skill-row">
          <div class="skill-meta">
            <div
              class="skill-icon"
              :style="{
                background: skill.color + '1a',
                color: skill.color,
                borderColor: skill.color + '44',
              }"
            >
              {{ skill.icon }}
            </div>
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-pct" :style="{ color: skill.color }">{{ skill.level }}%</span>
          </div>
          <div class="skill-track">
            <div
              class="skill-fill"
              :style="{
                width: skill.level + '%',
                background: `linear-gradient(to right, ${skill.color}55, ${skill.color})`,
              }"
            />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.skills-section { padding: 7rem 0; }

.skills-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 700; color: var(--fg); margin-bottom: 1rem;
}
.skills-sub {
  font-size: 1rem; color: var(--fg-dim); font-weight: 300;
  line-height: 1.7; max-width: 560px; margin-bottom: 3.5rem;
}

.skills-grid {
  display: grid; grid-template-columns: 1fr; gap: 2rem;
  max-width: 780px;
}
@media (min-width: 768px) {
  .skills-grid { grid-template-columns: 1fr 1fr; column-gap: 5rem; }
}

.skill-row { display: flex; flex-direction: column; gap: 10px; }

.skill-meta { display: flex; align-items: center; gap: 12px; }

.skill-icon {
  width: 32px; height: 32px;
  border-radius: 6px; border: 1px solid;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-size: 0.6rem; font-weight: 800;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.skill-row:hover .skill-icon {
  transform: scale(1.12);
  box-shadow: 0 0 12px currentColor;
}

.skill-name {
  font-family: var(--font-body); font-size: 0.9rem;
  font-weight: 500; color: var(--fg); flex: 1;
}
.skill-pct {
  font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700;
}

.skill-track {
  height: 3px; background: var(--border);
  border-radius: 3px; overflow: hidden;
}
.skill-fill { height: 100%; border-radius: 3px; }
</style>
