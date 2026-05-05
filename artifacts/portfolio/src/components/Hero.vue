<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "../assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const SNIPPETS = [
  { text: "<Hero />",       top: "6%",   left: "-9%",  delay: 0.3 },
  { text: "useState(ref)",  top: "20%",  right: "-7%", delay: 0.6 },
  { text: "gsap.to('.el'", bottom: "30%",left: "-11%", delay: 0.9 },
  { text: "import { ref }", bottom: "14%",right: "-5%",delay: 0.5 },
  { text: "v-for='item'",   top: "52%",  left: "-13%", delay: 0.7 },
  { text: "@click.prevent", top: "72%",  right: "-9%", delay: 0.4 },
  { text: ":style='css'",   bottom: "50%",right: "-11%",delay: 0.8 },
];

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to(".hero-orb", {
      y: "25%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, sectionRef.value!);
});

onUnmounted(() => ctx?.revert());

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
</script>

<template>
  <section id="hero" ref="sectionRef" class="hero">
    <!-- Ambient orbs -->
    <div class="hero-bg">
      <div class="hero-orb orb-1" />
      <div class="hero-orb orb-2" />
    </div>

    <div class="container hero-inner">
      <!-- LEFT: Photo + floating code -->
      <div class="hero-photo-col">
        <div class="photo-wrap">
          <!-- Floating snippets -->
          <div
            v-for="(s, i) in SNIPPETS"
            :key="i"
            class="snippet"
            :style="{
              top: s.top, bottom: s.bottom,
              left: s.left, right: s.right,
              animationDelay: s.delay + 's',
            }"
          >{{ s.text }}</div>

          <!-- Frame -->
          <div class="photo-frame">
            <span class="corner corner-tr" />
            <span class="corner corner-bl" />
            <div class="photo-glow" />
            <div class="photo-img-wrap">
              <img :src="profileImage" alt="Justine Buncag" class="photo-img" data-testid="img-profile" />
              <div class="photo-overlay" />
            </div>
          </div>

          <!-- Available badge -->
          <div class="avail-badge">
            <span class="avail-dot" />
            Available for work
          </div>
        </div>
      </div>

      <!-- RIGHT: Text -->
      <div class="hero-text-col">
        <div class="hero-role-badge">Front-End Developer</div>

        <h1 class="hero-name">
          JUSTINE<br />
          <span class="hero-name-accent">BUNCAG</span>
        </h1>

        <p class="hero-sub">
          Crafting <strong>precision-engineered</strong> digital experiences
          through clean code and intentional design.
        </p>

        <div class="hero-cta">
          <a class="btn-primary" @click.prevent="scrollTo('projects')" data-testid="btn-view-projects">
            View Projects
          </a>
          <a class="btn-ghost" @click.prevent="scrollTo('contact')" data-testid="btn-contact-me">
            Contact Me
          </a>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <div class="stat-num">8mo</div>
            <div class="stat-label">Experience</div>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <div class="stat-num">10+</div>
            <div class="stat-label">Projects</div>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <div class="stat-num">100%</div>
            <div class="stat-label">Passion</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator">
      <span class="scroll-label">Scroll</span>
      <div class="scroll-line">
        <div class="scroll-line-fill" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 80px;
}

/* Background */
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}
.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(130px);
}
.orb-1 {
  top: 15%;
  left: 25%;
  width: 560px;
  height: 560px;
  background: radial-gradient(circle, rgba(245,166,35,0.09) 0%, transparent 70%);
}
.orb-2 {
  bottom: 5%;
  right: 5%;
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(245,166,35,0.04) 0%, transparent 70%);
}

/* Layout */
.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
}
@media (min-width: 1024px) {
  .hero-inner {
    grid-template-columns: 5fr 7fr;
    gap: 4rem;
  }
}

/* Photo column */
.hero-photo-col {
  display: flex;
  justify-content: center;
}
@media (min-width: 1024px) {
  .hero-photo-col { justify-content: flex-start; }
}

.photo-wrap {
  position: relative;
  width: 280px;
}
@media (min-width: 768px) { .photo-wrap { width: 320px; } }
@media (min-width: 1024px) { .photo-wrap { width: 350px; } }

/* Floating code snippets */
.snippet {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 9px;
  color: rgba(245, 166, 35, 0.72);
  background: rgba(9, 9, 12, 0.92);
  border: 1px solid rgba(245, 166, 35, 0.18);
  padding: 4px 8px;
  border-radius: 3px;
  white-space: nowrap;
  z-index: 20;
  pointer-events: none;
  animation: snippet-float 4s ease-in-out infinite;
}
@media (min-width: 768px) { .snippet { font-size: 10px; } }

@keyframes snippet-float {
  0%, 100% { transform: translateY(0px); opacity: 0.75; }
  50% { transform: translateY(-7px); opacity: 0.5; }
}

/* Photo frame */
.photo-frame {
  position: relative;
  z-index: 2;
}
.corner {
  position: absolute;
  width: 44px;
  height: 44px;
  border-color: rgba(245, 166, 35, 0.55);
  border-style: solid;
  z-index: 10;
}
.corner-tr { top: -10px; right: -10px; border-width: 2px 2px 0 0; }
.corner-bl { bottom: -10px; left: -10px; border-width: 0 0 2px 2px; }

.photo-glow {
  position: absolute;
  inset: -3px;
  background: linear-gradient(135deg, rgba(245,166,35,0.35) 0%, rgba(245,166,35,0.08) 50%, transparent 100%);
  border-radius: 2px;
  z-index: 0;
  filter: blur(2px);
}

.photo-img-wrap {
  position: relative;
  z-index: 1;
  overflow: hidden;
  aspect-ratio: 3/4;
}
.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}
.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(9,9,12,0.45) 0%, transparent 50%);
}

/* Available badge */
.avail-badge {
  position: absolute;
  bottom: -28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--fg-dim);
  white-space: nowrap;
  z-index: 10;
}
.avail-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ade80;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
  50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(74,222,128,0); }
}

/* Text column */
.hero-text-col {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 2.5rem;
}
@media (min-width: 1024px) {
  .hero-text-col { text-align: left; margin-top: 0; }
}

.hero-role-badge {
  display: inline-flex;
  align-self: center;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--primary);
  border: 1px solid rgba(245,166,35,0.3);
  background: rgba(245,166,35,0.05);
  padding: 6px 16px;
  border-radius: 999px;
  margin-bottom: 1.5rem;
}
@media (min-width: 1024px) { .hero-role-badge { align-self: flex-start; } }

.hero-name {
  font-size: clamp(3.2rem, 8vw, 6rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 0.92;
  text-transform: uppercase;
  color: var(--fg);
  margin-bottom: 1.5rem;
}
.hero-name-accent { color: var(--primary); }

.hero-sub {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--fg-dim);
  font-weight: 300;
  max-width: 500px;
  margin: 0 auto 2.5rem;
}
@media (min-width: 1024px) { .hero-sub { margin-left: 0; } }
.hero-sub strong { color: var(--fg); font-weight: 600; }

/* CTA */
.hero-cta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-bottom: 3rem;
}
@media (min-width: 480px) { .hero-cta { flex-direction: row; justify-content: center; } }
@media (min-width: 1024px) { .hero-cta { justify-content: flex-start; } }

.btn-primary {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: var(--primary);
  color: #000;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: none;
  position: relative;
  overflow: hidden;
  transition: box-shadow var(--transition), transform var(--transition);
  width: 100%;
  text-align: center;
}
@media (min-width: 480px) { .btn-primary { width: auto; } }
.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.2);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.btn-primary:hover { box-shadow: 0 0 40px rgba(245,166,35,0.4); }
.btn-primary:hover::after { transform: translateY(0); }

.btn-ghost {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: transparent;
  color: var(--fg);
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid var(--border);
  cursor: none;
  transition: border-color var(--transition), color var(--transition);
  width: 100%;
  text-align: center;
}
@media (min-width: 480px) { .btn-ghost { width: auto; } }
.btn-ghost:hover { border-color: rgba(245,166,35,0.5); color: var(--primary); }

/* Stats */
.hero-stats {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}
@media (min-width: 1024px) { .hero-stats { justify-content: flex-start; } }

.stat { text-align: center; }
.stat-num {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--fg);
  letter-spacing: -0.04em;
}
.stat-label {
  font-size: 0.62rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--fg-dim);
  margin-top: 2px;
}
.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--border);
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.scroll-label {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--fg-dim);
}
.scroll-line {
  width: 1px;
  height: 40px;
  background: var(--border);
  overflow: hidden;
  position: relative;
}
.scroll-line-fill {
  position: absolute;
  inset: 0;
  background: var(--primary);
  animation: scroll-run 1.6s linear infinite;
}
@keyframes scroll-run {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
</style>
