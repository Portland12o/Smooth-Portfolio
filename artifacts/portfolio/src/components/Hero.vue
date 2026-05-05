<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "../assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

/* ── Floating language icons ─────────────────────────── */
const LANG_ICONS = [
  {
    id: "js",
    label: "JavaScript",
    top: "2%", left: "2%",
    delay: 0,
    bg: "#F7DF1E",
    svg: `<rect width="32" height="32" fill="#F7DF1E"/>
          <text x="4" y="24" font-family="monospace" font-size="14" font-weight="900" fill="#000">JS</text>`,
    size: 32,
  },
  {
    id: "ts",
    label: "TypeScript",
    top: "2%", right: "4%",
    delay: 0.3,
    bg: "#3178C6",
    svg: `<rect width="32" height="32" fill="#3178C6"/>
          <text x="3" y="24" font-family="monospace" font-size="14" font-weight="900" fill="#fff">TS</text>`,
    size: 32,
  },
  {
    id: "react",
    label: "React",
    top: "22%", right: "-6%",
    delay: 0.5,
    bg: "#20232a",
    svg: `<rect width="40" height="40" fill="#20232a"/>
          <ellipse cx="20" cy="20" rx="4" ry="4" fill="#61DAFB"/>
          <ellipse cx="20" cy="20" rx="16" ry="6" fill="none" stroke="#61DAFB" stroke-width="2"/>
          <ellipse cx="20" cy="20" rx="16" ry="6" fill="none" stroke="#61DAFB" stroke-width="2" transform="rotate(60 20 20)"/>
          <ellipse cx="20" cy="20" rx="16" ry="6" fill="none" stroke="#61DAFB" stroke-width="2" transform="rotate(120 20 20)"/>`,
    size: 40,
  },
  {
    id: "vue",
    label: "Vue.js",
    top: "45%", right: "-4%",
    delay: 0.7,
    bg: "#1a1a2e",
    svg: `<rect width="38" height="38" fill="#1a1a2e"/>
          <polygon points="19,6 33,30 5,30" fill="none" stroke="#42B883" stroke-width="2.5"/>
          <polygon points="19,12 28,30 10,30" fill="#42B883" opacity="0.6"/>`,
    size: 38,
  },
  {
    id: "python",
    label: "Python",
    bottom: "18%", right: "-5%",
    delay: 0.9,
    bg: "#1a1a2e",
    svg: `<rect width="38" height="38" fill="#1a1a2e"/>
          <path d="M14 8 Q14 4 19 4 Q24 4 24 8 L24 18 Q24 22 19 22 L14 22 Q8 22 8 18 L8 14" fill="none" stroke="#3776AB" stroke-width="2"/>
          <path d="M24 30 Q24 34 19 34 Q14 34 14 30 L14 20 Q14 16 19 16 L24 16 Q30 16 30 20 L30 24" fill="none" stroke="#FFD43B" stroke-width="2"/>
          <circle cx="15.5" cy="10.5" r="1.5" fill="#FFD43B"/>
          <circle cx="22.5" cy="27.5" r="1.5" fill="#3776AB"/>`,
    size: 38,
  },
  {
    id: "csharp",
    label: "C#",
    bottom: "4%", right: "6%",
    delay: 0.4,
    bg: "#9B4F96",
    svg: `<rect width="36" height="36" fill="#9B4F96"/>
          <text x="2" y="25" font-family="monospace" font-size="16" font-weight="900" fill="#fff">C#</text>`,
    size: 36,
  },
  {
    id: "html",
    label: "HTML5",
    bottom: "4%", left: "4%",
    delay: 0.2,
    bg: "#E34F26",
    svg: `<rect width="34" height="34" fill="#E34F26"/>
          <text x="3" y="25" font-family="monospace" font-size="13" font-weight="900" fill="#fff">H5</text>
          <polygon points="17,28 7,5 27,5" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.4"/>`,
    size: 34,
  },
  {
    id: "css",
    label: "CSS3",
    bottom: "22%", left: "-5%",
    delay: 0.6,
    bg: "#1572B6",
    svg: `<rect width="34" height="34" fill="#1572B6"/>
          <text x="2" y="24" font-family="monospace" font-size="13" font-weight="900" fill="#fff">CSS</text>
          <text x="22" y="24" font-family="monospace" font-size="11" font-weight="900" fill="#fff">3</text>`,
    size: 34,
  },
  {
    id: "git",
    label: "Git",
    top: "42%", left: "-6%",
    delay: 0.8,
    bg: "#F05032",
    svg: `<rect width="36" height="36" fill="#F05032"/>
          <circle cx="18" cy="27" r="3.5" fill="none" stroke="#fff" stroke-width="2"/>
          <circle cx="18" cy="9" r="3.5" fill="none" stroke="#fff" stroke-width="2"/>
          <circle cx="27" cy="18" r="3.5" fill="none" stroke="#fff" stroke-width="2"/>
          <line x1="18" y1="12.5" x2="18" y2="23.5" stroke="#fff" stroke-width="2"/>
          <path d="M18 12 Q18 18 24 18" fill="none" stroke="#fff" stroke-width="2"/>`,
    size: 36,
  },
  {
    id: "node",
    label: "Node.js",
    top: "22%", left: "-4%",
    delay: 1.0,
    bg: "#1a1a2e",
    svg: `<rect width="38" height="38" fill="#1a1a2e"/>
          <polygon points="19,4 34,13 34,25 19,34 4,25 4,13" fill="none" stroke="#339933" stroke-width="2"/>
          <text x="10" y="24" font-family="monospace" font-size="13" font-weight="900" fill="#339933">N</text>`,
    size: 38,
  },
  {
    id: "dotnet",
    label: ".NET",
    top: "5%", left: "50%",
    delay: 0.35,
    bg: "#512BD4",
    svg: `<rect width="34" height="34" fill="#512BD4"/>
          <text x="1" y="24" font-family="monospace" font-size="11" font-weight="900" fill="#fff">.NET</text>`,
    size: 34,
  },
  {
    id: "gsap",
    label: "GSAP",
    bottom: "12%", right: "48%",
    delay: 1.1,
    bg: "#0e100f",
    svg: `<rect width="34" height="34" fill="#0e100f"/>
          <text x="1" y="24" font-family="monospace" font-size="12" font-weight="900" fill="#88CE02">GSAP</text>`,
    size: 34,
  },
];

/* ── Floating code snippets ──────────────────────────── */
const SNIPPETS = [
  /* C# snippets */
  { text: "using System.Linq;",        top: "8%",   right: "38%", delay: 0.2 },
  { text: "Console.WriteLine()",       top: "28%",  left: "18%",  delay: 0.5 },
  { text: "async Task<T>() {}",        bottom: "38%",right: "28%",delay: 0.8 },
  { text: "var dev = new Dev();",      bottom: "8%", left: "18%", delay: 0.4 },
  /* JS / Vue snippets */
  { text: "v-for='item in list'",      top: "60%",  right: "18%", delay: 0.6 },
  { text: "const [state, setState]",   top: "50%",  left: "16%",  delay: 0.9 },
  { text: "gsap.to('.el', { y: 0 })", bottom: "52%",left: "10%", delay: 0.3 },
  { text: "<script setup lang='ts'>",  top: "78%",  right: "14%", delay: 0.7 },
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
      <!-- LEFT: Photo + floating elements -->
      <div class="hero-photo-col">
        <div class="photo-wrap">

          <!-- ✦ Floating language icons -->
          <div
            v-for="icon in LANG_ICONS"
            :key="icon.id"
            class="lang-icon"
            :title="icon.label"
            :style="{
              top: icon.top, bottom: icon.bottom,
              left: icon.left, right: icon.right,
              animationDelay: icon.delay + 's',
              width: icon.size + 'px',
              height: icon.size + 'px',
            }"
          >
            <svg
              :width="icon.size"
              :height="icon.size"
              :viewBox="`0 0 ${icon.size} ${icon.size}`"
              xmlns="http://www.w3.org/2000/svg"
              v-html="icon.svg"
            />
          </div>

          <!-- ✦ Floating code snippets -->
          <div
            v-for="(s, i) in SNIPPETS"
            :key="'s' + i"
            class="snippet"
            :style="{
              top: s.top, bottom: s.bottom,
              left: s.left, right: s.right,
              animationDelay: s.delay + 's',
            }"
          >{{ s.text }}</div>

          <!-- Photo frame -->
          <div class="photo-frame">
            <span class="corner corner-tr" />
            <span class="corner corner-bl" />
            <div class="photo-glow" />
            <div class="photo-img-wrap">
              <img
                :src="profileImage"
                alt="Justine Buncag"
                class="photo-img"
                data-testid="img-profile"
              />
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
  top: 15%;  left: 25%;
  width: 560px; height: 560px;
  background: radial-gradient(circle, rgba(245,166,35,0.09) 0%, transparent 70%);
}
.orb-2 {
  bottom: 5%; right: 5%;
  width: 480px; height: 480px;
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
  padding-bottom: 5rem;
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

/* Photo wrap – needs extra padding for floating elements */
.photo-wrap {
  position: relative;
  width: 260px;
  margin: 80px 80px 80px 80px;
}
@media (min-width: 768px)  { .photo-wrap { width: 290px; } }
@media (min-width: 1024px) { .photo-wrap { width: 310px; } }

/* ── Floating language icons ──────────────────────────── */
.lang-icon {
  position: absolute;
  z-index: 20;
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  pointer-events: none;
  animation: icon-float 5s ease-in-out infinite;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 0 8px rgba(0,0,0,0.6));
}
@keyframes icon-float {
  0%, 100% { transform: translateY(0px) rotate(-1deg); opacity: 0.88; }
  50%       { transform: translateY(-10px) rotate(1deg); opacity: 0.7; }
}

/* ── Floating code snippets ───────────────────────────── */
.snippet {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 8.5px;
  color: rgba(245, 166, 35, 0.8);
  background: rgba(9, 9, 12, 0.92);
  border: 1px solid rgba(245, 166, 35, 0.2);
  padding: 3px 8px;
  border-radius: 3px;
  white-space: nowrap;
  z-index: 22;
  pointer-events: none;
  animation: snippet-float 4.5s ease-in-out infinite;
}
@media (min-width: 768px) { .snippet { font-size: 9.5px; } }

@keyframes snippet-float {
  0%, 100% { transform: translateY(0px);   opacity: 0.8; }
  50%       { transform: translateY(-7px);  opacity: 0.5; }
}

/* Photo frame */
.photo-frame {
  position: relative;
  z-index: 2;
}
.corner {
  position: absolute;
  width: 40px; height: 40px;
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
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #4ade80;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
  50%       { opacity: 0.8; box-shadow: 0 0 0 6px rgba(74,222,128,0); }
}

/* ── Text column ────────────────────────────────────── */
.hero-text-col {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 3.5rem;
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
  width: 1px; height: 32px;
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
  width: 1px; height: 40px;
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
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
</style>
