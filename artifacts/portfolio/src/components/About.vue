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
    gsap.fromTo(".about-stat", { opacity: 0, y: 24 }, {
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
        <div class="divider" />
        <h3 class="about-heading">Design meets<br />logic.</h3>
        <div class="about-monogram">
          <span>JB</span>
        </div>
      </div>

      <!-- Right -->
      <div class="about-right">
        <div class="about-paragraphs">
          <p>
            I'm a front-end developer passionate about the intersection of
            engineering and design. I build interfaces that don't just work
            flawlessly — they feel <strong>alive</strong>.
          </p>
          <p>
            With a strong eye for visual aesthetics and a solid foundation
            in modern web technologies, I bridge the gap between static
            mockups and interactive reality. Every detail is intentional.
            Every line of code is purposeful.
          </p>
          <p class="quote">
            "Complex systems deserve elegant interfaces."
          </p>
        </div>

        <div class="about-stats">
          <div class="about-stat">
            <div class="about-stat-num">8<span>mo</span></div>
            <div class="about-stat-label">Experience</div>
          </div>
          <div class="about-stat-div" />
          <div class="about-stat">
            <div class="about-stat-num">10<span>+</span></div>
            <div class="about-stat-label">Projects</div>
          </div>
          <div class="about-stat-div" />
          <div class="about-stat">
            <div class="about-stat-num">100<span>%</span></div>
            <div class="about-stat-label">Commitment</div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.about-section { padding: 8rem 0; background: var(--bg-2); transition: background 0.4s ease; }

.about-grid {
  display: grid; grid-template-columns: 1fr; gap: 4rem;
}
@media (min-width: 1024px) {
  .about-grid { grid-template-columns: 4fr 8fr; align-items: center; }
}

.about-heading {
  font-size: clamp(2.2rem, 4.5vw, 3.8rem); font-weight: 700;
  color: var(--fg); margin-bottom: 2rem; line-height: 1.05;
}

.about-monogram {
  width: 100px; height: 100px;
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  background: var(--bg);
}
.about-monogram span {
  font-family: var(--font-serif);
  font-size: 2.5rem; font-weight: 600;
  color: var(--primary); letter-spacing: 0.05em;
}

.about-paragraphs {
  display: flex; flex-direction: column; gap: 1.5rem;
  font-family: var(--font-serif);
  font-size: 1.1rem; line-height: 1.8;
  color: var(--fg-dim); font-weight: 400; margin-bottom: 3rem;
}
.about-paragraphs strong { color: var(--fg); font-weight: 600; }

.quote {
  font-style: italic; color: var(--muted) !important;
  border-left: 2px solid var(--primary); padding-left: 1.25rem;
  font-size: 1rem !important;
}

.about-stats {
  display: flex; gap: 2.5rem; align-items: center;
  padding-top: 2.5rem; border-top: 1px solid var(--border);
}
.about-stat { text-align: left; }
.about-stat-num {
  font-family: var(--font-display); font-size: 2.4rem;
  font-weight: 700; color: var(--primary); letter-spacing: -0.04em; line-height: 1;
}
.about-stat-num span { font-size: 1.2rem; }
.about-stat-label {
  font-family: var(--font-mono); font-size: 0.58rem;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--muted); margin-top: 5px;
}
.about-stat-div { width: 1px; height: 40px; background: var(--border); }
</style>
