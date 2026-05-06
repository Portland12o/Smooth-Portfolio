<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(".about-left", { opacity: 0, x: -40 }, {
      opacity: 1, x: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 72%" },
    });
    gsap.fromTo(".about-right", { opacity: 0, x: 40 }, {
      opacity: 1, x: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 72%" },
    });
    gsap.fromTo(".about-stat", { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
      scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
    });
  }, sectionRef.value!);
});
onUnmounted(() => ctx?.revert());
</script>

<template>
  <section id="about" ref="sectionRef" class="about-section">
    <div class="container about-grid">

      <!-- Left -->
      <div class="about-left">
        <p class="section-label">About Me</p>
        <h3 class="about-heading">Design meets<br />logic.</h3>
        <div class="about-card glass">
          <div class="about-card-initials">JB</div>
          <p class="about-card-code">// front-end developer<br />const passion = "infinite";</p>
        </div>
      </div>

      <!-- Right -->
      <div class="about-right">
        <div class="about-paragraphs">
          <p>
            I'm a front-end developer passionate about the intersection of engineering
            and design. I build interfaces that don't just work flawlessly — they feel
            <strong>alive</strong>.
          </p>
          <p>
            With a strong eye for visual aesthetics and a solid foundation in modern
            JavaScript frameworks, I bridge the gap between static mockups and
            interactive reality. Every animation is intentional. Every line of code is
            optimized.
          </p>
          <p>
            My philosophy: <em>"Complex systems deserve elegant interfaces."</em>
          </p>
        </div>

        <div class="about-stats">
          <div class="about-stat">
            <div class="about-stat-num">8mo</div>
            <div class="about-stat-label">Experience</div>
          </div>
          <div class="about-stat-div" />
          <div class="about-stat">
            <div class="about-stat-num">10+</div>
            <div class="about-stat-label">Projects</div>
          </div>
          <div class="about-stat-div" />
          <div class="about-stat">
            <div class="about-stat-num">100%</div>
            <div class="about-stat-label">Commitment</div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.about-section { padding: 7rem 0; }

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}
@media (min-width: 1024px) {
  .about-grid { grid-template-columns: 5fr 7fr; align-items: center; }
}

.about-heading {
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 700;
  color: var(--fg);
  margin-bottom: 2.5rem;
  line-height: 1.05;
}

.about-card {
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
  display: none;
}
@media (min-width: 1024px) { .about-card { display: flex; flex-direction: column; justify-content: flex-end; padding: 1.5rem; } }
.about-card-initials {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 6rem;
  font-weight: 900;
  color: rgba(255,255,255,0.04);
  letter-spacing: -0.05em;
  text-transform: uppercase;
  user-select: none;
}
.about-card-code {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: rgba(245, 166, 35, 0.5);
  line-height: 1.8;
  position: relative;
  z-index: 1;
}

.about-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--fg-dim);
  font-weight: 300;
  margin-bottom: 3rem;
}
.about-paragraphs strong { color: var(--fg); font-weight: 600; }
.about-paragraphs em { color: var(--fg); font-style: italic; }

.about-stats {
  display: flex;
  gap: 2rem;
  align-items: center;
  padding-top: 2.5rem;
  border-top: 1px solid var(--border);
}
.about-stat { text-align: left; }
.about-stat-num {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: -0.04em;
}
.about-stat-label {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fg-dim);
  margin-top: 3px;
}
.about-stat-div {
  width: 1px;
  height: 36px;
  background: var(--border);
}
</style>
