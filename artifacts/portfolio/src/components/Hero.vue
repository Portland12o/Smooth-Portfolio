<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "../assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const LANG_ICONS = [
  { id: "html",   label: "HTML5",  top: "4%",  left: "-20%", delay: 0,    size: 44, color: "#E34F26",
    svg: `<rect width="44" height="44" rx="10" fill="#E34F2618"/><text x="5" y="30" font-family="monospace" font-size="16" font-weight="900" fill="#E34F26">H5</text>` },
  { id: "python", label: "Python", top: "4%",  right: "-20%", delay: 0.4,  size: 44,
    svg: `<rect width="44" height="44" rx="10" fill="#3776AB"/><text x="7" y="29" font-family="monospace" font-size="17" font-weight="900" fill="#FFD43B">Py</text>` },
  { id: "git",    label: "Git",    top: "42%", left: "-22%", delay: 0.8,  size: 44,
    svg: `<rect width="44" height="44" rx="10" fill="#F0503218"/><text x="5" y="30" font-family="monospace" font-size="14" font-weight="900" fill="#F05032">Git</text>` },
  { id: "figma",  label: "Figma",  top: "42%", right: "-22%", delay: 1.2,  size: 44,
    svg: `<rect width="44" height="44" rx="10" fill="#F24E1E18"/>
          <rect x="12" y="6" width="10" height="10" rx="5" fill="#F24E1E"/>
          <rect x="22" y="6" width="10" height="10" rx="5" fill="#FF7262"/>
          <rect x="12" y="16" width="10" height="10" rx="0" fill="#A259FF"/>
          <rect x="12" y="26" width="10" height="10" rx="5" fill="#1ABCFE"/>
          <circle cx="27" cy="21" r="5" fill="#0ACF83"/>` },
  { id: "css",    label: "CSS3",   bottom: "4%", left: "-20%", delay: 1.6,  size: 44,
    svg: `<rect width="44" height="44" rx="10" fill="#1572B618"/><text x="4" y="30" font-family="monospace" font-size="14" font-weight="900" fill="#1572B6">CSS3</text>` },
  { id: "csharp", label: "C#",     bottom: "4%", right: "-20%", delay: 2.0,  size: 44,
    svg: `<rect width="44" height="44" rx="10" fill="#9B4F96"/><text x="8" y="31" font-family="monospace" font-size="20" font-weight="900" fill="#fff">C#</text>` },
];

const SNIPPETS = [
  { text: "using System.Linq;",   top: "14%",  left: "-55%",   delay: 0.2,  lang: "cs"  },
  { text: "Console.WriteLine()",  top: "25%",  right: "-60%",  delay: 0.6,  lang: "cs"  },
  { text: "async Task<T>() {}",   top: "55%",  left: "-62%",   delay: 1.0,  lang: "cs"  },
  { text: ".hero { display:flex}",top: "68%",  right: "-68%",  delay: 1.4,  lang: "css" },
  { text: "border-radius: 999px", bottom: "22%",left: "-65%",   delay: 1.8,  lang: "css" },
  { text: "@keyframes float {}",  bottom: "35%",right: "-68%",  delay: 2.2,  lang: "css" },
];

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to(".hero-orb", {
      y: "20%", ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top top", end: "bottom top", scrub: true,
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
      <!-- LEFT: Photo + floating icons + snippets -->
      <div class="hero-photo-col">
        <div class="photo-wrap">

          <!-- Language icons -->
          <div
            v-for="icon in LANG_ICONS"
            :key="icon.id"
            class="lang-icon"
            :title="icon.label"
            :style="{
              top: icon.top, bottom: icon.bottom,
              left: icon.left, right: icon.right,
              animationDelay: icon.delay + 's',
              width: icon.size + 'px', height: icon.size + 'px',
            }"
          >
            <svg :width="icon.size" :height="icon.size" :viewBox="`0 0 ${icon.size} ${icon.size}`"
                 xmlns="http://www.w3.org/2000/svg" v-html="icon.svg" />
          </div>

          <!-- Code snippets -->
          <div
            v-for="snip in SNIPPETS"
            :key="snip.text"
            class="snippet"
            :class="snip.lang"
            :style="{
              top: snip.top, bottom: snip.bottom,
              left: snip.left, right: snip.right,
              animationDelay: snip.delay + 's',
            }"
          >{{ snip.text }}</div>

          <!-- Photo frame -->
          <div class="photo-frame">
            <span class="corner corner-tr" />
            <span class="corner corner-bl" />
            <div class="photo-img-wrap">
              <img :src="profileImage" alt="Justine Buncag" class="photo-img" />
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
        <p class="hero-eyebrow">Front-End Developer</p>

        <h1 class="hero-name">
          JUSTINE<br />
          <span class="hero-name-accent">BUNCAG</span>
        </h1>

        <div class="hero-rule" />

        <p class="hero-sub">
          Crafting <em>precision-engineered</em> digital experiences
          through clean code and intentional design.
        </p>

        <div class="hero-cta">
          <a class="btn-primary" @click.prevent="scrollTo('projects')">View Projects</a>
          <a class="btn-ghost"   @click.prevent="scrollTo('contact')">Contact Me</a>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <div class="stat-num">8<span class="stat-unit">mo</span></div>
            <div class="stat-label">Experience</div>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <div class="stat-num">10<span class="stat-unit">+</span></div>
            <div class="stat-label">Projects</div>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <div class="stat-num">100<span class="stat-unit">%</span></div>
            <div class="stat-label">Passion</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator — below grid, properly placed -->
    <div class="scroll-indicator">
      <div class="scroll-line"><div class="scroll-line-fill" /></div>
      <span class="scroll-label">Scroll</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding-top: 90px;
  padding-bottom: 100px;
}

/* Orbs */
.hero-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
.hero-orb { position: absolute; border-radius: 50%; filter: blur(140px); pointer-events: none; }
.orb-1 { top: 10%; left: 15%; width: 600px; height: 600px;
          background: radial-gradient(circle, var(--orb-color) 0%, transparent 70%); }
.orb-2 { bottom: 0; right: 0; width: 500px; height: 500px;
          background: radial-gradient(circle, var(--orb-color) 0%, transparent 70%); }

/* Layout */
.hero-inner {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1fr;
  gap: 4rem; align-items: center; width: 100%; flex: 1;
}
@media (min-width: 1024px) { .hero-inner { grid-template-columns: 5fr 7fr; gap: 5rem; } }

/* Photo column */
.hero-photo-col { display: flex; justify-content: center; }
@media (min-width: 1024px) { .hero-photo-col { justify-content: flex-start; } }

.photo-wrap {
  position: relative;
  width: 240px;
  margin: 60px 80px 60px 80px;
}
@media (min-width: 768px)  { .photo-wrap { width: 270px; } }
@media (min-width: 1024px) { .photo-wrap { width: 290px; } }

/* Floating icons */
.lang-icon {
  position: absolute; z-index: 20;
  border-radius: 10px; overflow: hidden;
  box-shadow: var(--shadow-lg); pointer-events: none;
  animation: icon-float 6s ease-in-out infinite;
}
@keyframes icon-float {
  0%, 100% { transform: translateY(0px);    opacity: 0.95; }
  50%       { transform: translateY(-12px); opacity: 0.75; }
}

/* Code snippets */
.snippet {
  position: absolute; z-index: 15;
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: 0.6rem; font-weight: 500;
  padding: 5px 12px;
  background: var(--snippet-bg);
  border: 1px solid var(--snippet-border);
  border-radius: 4px;
  box-shadow: var(--shadow);
  pointer-events: none;
  animation: snippet-float 7s ease-in-out infinite;
  color: var(--fg-dim);
  backdrop-filter: blur(8px);
}
.snippet.cs  { color: #9B4F96; }
.snippet.css { color: #1572B6; }
@keyframes snippet-float {
  0%, 100% { transform: translateY(0px);   opacity: 0.88; }
  50%       { transform: translateY(-8px); opacity: 0.68; }
}

/* Photo frame */
.photo-frame { position: relative; z-index: 2; }
.corner {
  position: absolute; width: 36px; height: 36px;
  border-color: var(--primary); border-style: solid; z-index: 10; opacity: 0.5;
}
.corner-tr { top: -10px; right: -10px; border-width: 1.5px 1.5px 0 0; }
.corner-bl { bottom: -10px; left: -10px; border-width: 0 0 1.5px 1.5px; }

.photo-img-wrap {
  position: relative; z-index: 1; overflow: hidden; aspect-ratio: 3/4;
  box-shadow: var(--shadow-lg);
}
.photo-img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
.photo-overlay { position: absolute; inset: 0; background: var(--photo-overlay); }

.avail-badge {
  position: absolute; bottom: -28px; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-2); border: 1px solid var(--border);
  padding: 7px 18px; border-radius: 999px;
  font-family: var(--font-mono); font-size: 0.65rem; font-weight: 500;
  color: var(--fg-dim); white-space: nowrap; z-index: 10; box-shadow: var(--shadow);
  transition: background var(--transition), border-color var(--transition);
}
.avail-dot {
  width: 7px; height: 7px; border-radius: 50%; background: #4ade80;
  animation: pulse 2.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
  50%       { box-shadow: 0 0 0 5px rgba(74,222,128,0); }
}

/* Text column */
.hero-text-col {
  display: flex; flex-direction: column;
  text-align: center; margin-top: 4rem;
}
@media (min-width: 1024px) { .hero-text-col { text-align: left; margin-top: 0; } }

.hero-eyebrow {
  font-family: var(--font-mono); font-size: 0.65rem; font-weight: 500;
  letter-spacing: 0.25em; text-transform: uppercase;
  color: var(--primary); margin-bottom: 1.5rem;
}

.hero-name {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 800; letter-spacing: -0.05em; line-height: 0.9;
  text-transform: uppercase; color: var(--fg); margin-bottom: 1.5rem;
}
.hero-name-accent { color: var(--primary); }

.hero-rule {
  width: 48px; height: 1.5px; background: var(--primary);
  margin: 0 auto 2rem; opacity: 0.7;
}
@media (min-width: 1024px) { .hero-rule { margin-left: 0; } }

.hero-sub {
  font-family: var(--font-serif); font-size: 1.2rem; line-height: 1.7;
  color: var(--fg-dim); font-weight: 400; max-width: 440px; margin: 0 auto 2.5rem;
}
@media (min-width: 1024px) { .hero-sub { margin-left: 0; } }
.hero-sub em { color: var(--fg); font-style: italic; }

/* CTA */
.hero-cta {
  display: flex; flex-direction: column;
  gap: 1rem; align-items: center; margin-bottom: 3.5rem;
}
@media (min-width: 480px) { .hero-cta { flex-direction: row; justify-content: center; } }
@media (min-width: 1024px) { .hero-cta { justify-content: flex-start; } }

.btn-primary {
  display: inline-block; padding: 0.9rem 2.5rem;
  background: var(--fg); color: var(--bg);
  font-family: var(--font-mono); font-size: 0.72rem; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase;
  cursor: none; overflow: hidden;
  transition: background var(--transition), box-shadow var(--transition);
  width: 100%; text-align: center;
}
@media (min-width: 480px) { .btn-primary { width: auto; } }
.btn-primary:hover { background: var(--primary); box-shadow: 0 4px 28px var(--primary-glow); }

.btn-ghost {
  display: inline-block; padding: 0.9rem 2.5rem;
  background: transparent; color: var(--fg-dim);
  font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  border: 1px solid var(--border); cursor: none;
  transition: border-color var(--transition), color var(--transition);
  width: 100%; text-align: center;
}
@media (min-width: 480px) { .btn-ghost { width: auto; } }
.btn-ghost:hover { border-color: var(--primary); color: var(--primary); }

/* Stats */
.hero-stats {
  display: flex; gap: 2.5rem; align-items: center;
  justify-content: center;
  padding-top: 2.5rem; border-top: 1px solid var(--border);
}
@media (min-width: 1024px) { .hero-stats { justify-content: flex-start; } }

.stat { text-align: center; }
.stat-num {
  font-family: var(--font-display); font-size: 2rem; font-weight: 700;
  color: var(--fg); letter-spacing: -0.04em; line-height: 1;
}
.stat-unit { font-size: 1rem; color: var(--primary); }
.stat-label {
  font-family: var(--font-mono); font-size: 0.58rem;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); margin-top: 4px;
}
.stat-divider { width: 1px; height: 36px; background: var(--border); }

/* Scroll indicator */
.scroll-indicator {
  position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 2;
}
.scroll-label {
  font-family: var(--font-mono); font-size: 0.55rem;
  letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted);
}
.scroll-line { width: 1px; height: 44px; background: var(--border); overflow: hidden; position: relative; }
.scroll-line-fill {
  position: absolute; inset: 0; background: var(--primary);
  animation: scroll-run 1.8s ease-in-out infinite;
}
@keyframes scroll-run {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
</style>
