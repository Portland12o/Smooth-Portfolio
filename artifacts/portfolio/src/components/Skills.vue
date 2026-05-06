<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const SKILLS = [
  { name: "HTML5",        level: 95, color: "#E34F26", icon: "H5", bg: "#E34F2618" },
  { name: "CSS / SCSS",   level: 92, color: "#1572B6", icon: "CS", bg: "#1572B618" },
  { name: "C# / .NET",    level: 72, color: "#9B4F96", icon: "C#", bg: "#9B4F9618" },
  { name: "Python",       level: 70, color: "#3776AB", icon: "Py", bg: "#3776AB18" },
  { name: "Git",          level: 82, color: "#F05032", icon: "Gt", bg: "#F0503218" },
  { name: "Figma (UI/UX)",level: 78, color: "#F24E1E", icon: "Fi", bg: "#F24E1E18" },
];

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(".skills-header-content", { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 80%" },
    });
    gsap.fromTo(gsap.utils.toArray(".skill-row"), { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power2.out",
      scrollTrigger: { trigger: listRef.value, start: "top 85%" },
    });
    gsap.fromTo(gsap.utils.toArray(".skill-fill"), { scaleX: 0 }, {
      scaleX: 1, duration: 1.1, stagger: 0.08, ease: "power3.out",
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
        <div class="divider" />
        <h3 class="skills-title">Tools of the trade.</h3>
        <p class="skills-sub">
          Focused on a refined set of technologies — mastered deeply rather
          than collected broadly.
        </p>
      </div>

      <div ref="listRef" class="skills-grid">
        <div v-for="skill in SKILLS" :key="skill.name" class="skill-row">
          <div class="skill-meta">
            <div
              class="skill-icon"
              :style="{ background: skill.bg, color: skill.color, borderColor: skill.color + '44' }"
            >
              {{ skill.icon }}
            </div>
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-pct" :style="{ color: skill.color }">{{ skill.level }}%</span>
          </div>
          <div class="skill-track">
            <div
              class="skill-fill"
              :style="{ width: skill.level + '%', background: `linear-gradient(to right, ${skill.color}88, ${skill.color})` }"
            />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.skills-section { padding: 8rem 0; }

.skills-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700; color: var(--fg); margin-bottom: 1.25rem;
}
.skills-sub {
  font-family: var(--font-serif);
  font-size: 1.1rem; color: var(--fg-dim);
  font-weight: 400; line-height: 1.7;
  max-width: 520px; margin-bottom: 4rem;
}

.skills-grid {
  display: grid; grid-template-columns: 1fr; gap: 2rem;
}
@media (min-width: 768px) {
  .skills-grid { grid-template-columns: 1fr 1fr; column-gap: 5rem; }
}

.skill-row { display: flex; flex-direction: column; gap: 10px; }

.skill-meta {
  display: flex; align-items: center; gap: 12px;
}
.skill-icon {
  width: 30px; height: 30px; border-radius: 6px; border: 1px solid;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-size: 0.55rem; font-weight: 800;
  flex-shrink: 0; letter-spacing: 0;
  transition: transform 0.3s ease;
}
.skill-row:hover .skill-icon { transform: scale(1.1) rotate(-3deg); }

.skill-name {
  font-family: var(--font-mono); font-size: 0.78rem; color: var(--fg-body); flex: 1;
}
.skill-pct {
  font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700;
}

.skill-track {
  height: 2px; background: var(--border); border-radius: 2px; overflow: hidden;
}
.skill-fill { height: 100%; border-radius: 2px; }
</style>
