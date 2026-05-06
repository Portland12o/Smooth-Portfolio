<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const formRef = ref<HTMLFormElement | null>(null);
const sent = ref(false);
let ctx: gsap.Context | null = null;

const SOCIALS = [
  {
    name: "GitHub",
    href: "https://github.com/",
    color: "#24292e",
    lightColor: "#24292e",
    svg: `<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>`,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/",
    color: "#1877F2",
    lightColor: "#1877F2",
    svg: `<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>`,
  },
  {
    name: "Gmail",
    href: "mailto:justine.buncag@gmail.com",
    color: "#EA4335",
    lightColor: "#EA4335",
    svg: `<path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.907 1.528-1.148C21.69 2.28 24 3.434 24 5.457z"/>`,
  },
];

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(".contact-stagger", { opacity: 0, y: 36 }, {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.18, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 72%" },
    });
  }, sectionRef.value!);
});
onUnmounted(() => ctx?.revert());

const handleSubmit = (e: Event) => {
  e.preventDefault();
  formRef.value?.reset();
  sent.value = true;
  setTimeout(() => { sent.value = false; }, 4000);
};
</script>

<template>
  <section id="contact" ref="sectionRef" class="contact-section">
    <div class="container">

      <div class="contact-header contact-stagger">
        <p class="section-label">Contact</p>
        <div class="divider" />
        <h3 class="contact-title">Let's build something.</h3>
        <p class="contact-sub">
          Currently available for freelance opportunities and full-time roles.
          If you're looking for a developer who cares about details — say hello.
        </p>
      </div>

      <div class="contact-grid">

        <!-- Info -->
        <div class="contact-info contact-stagger">
          <div class="contact-info-item">
            <div class="info-label">Location</div>
            <p class="info-value">Philippines</p>
          </div>

          <div class="contact-info-item">
            <div class="info-label">Find me on</div>
            <div class="social-icons">
              <a
                v-for="social in SOCIALS"
                :key="social.name"
                :href="social.href"
                class="social-btn"
                :aria-label="social.name"
                :title="social.name"
                :style="{ '--social-color': social.color }"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-html="social.svg" />
              </a>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="contact-form-wrap glass contact-stagger">
          <Transition name="fade">
            <div v-if="sent" class="sent-msg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Message received — I'll be in touch soon.
            </div>
          </Transition>

          <form ref="formRef" @submit="handleSubmit" class="contact-form" :class="{ hidden: sent }">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" required placeholder="Your name" data-testid="input-name" />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" required placeholder="your@email.com" data-testid="input-email" />
              </div>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" rows="4" required placeholder="Tell me about your project..." data-testid="input-message" />
            </div>
            <button type="submit" class="submit-btn" data-testid="btn-submit-contact">
              Send Message
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>
        </div>

      </div>
    </div>

    <!-- Footer -->
    <div class="contact-footer">
      <p>© {{ new Date().getFullYear() }} Justine Buncag. All rights reserved.</p>
    </div>
  </section>
</template>

<style scoped>
.contact-section { padding: 8rem 0 0; }

.contact-header {
  text-align: center; max-width: 620px; margin: 0 auto 5rem;
}
.contact-title {
  font-size: clamp(2rem, 5vw, 4rem); font-weight: 700; color: var(--fg); margin-bottom: 1.25rem;
}
.contact-sub {
  font-family: var(--font-serif);
  font-size: 1.1rem; color: var(--fg-dim); font-weight: 400; line-height: 1.75;
}

.contact-grid {
  display: grid; grid-template-columns: 1fr; gap: 3rem;
  max-width: 1000px; margin: 0 auto;
}
@media (min-width: 1024px) { .contact-grid { grid-template-columns: 3fr 7fr; align-items: start; } }

/* Info column */
.contact-info { display: flex; flex-direction: column; gap: 2.5rem; padding-top: 0.5rem; }
.contact-info-item { display: flex; flex-direction: column; gap: 10px; }
.info-label {
  font-family: var(--font-mono);
  font-size: 0.6rem; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--muted);
}
.info-value { font-size: 0.95rem; font-weight: 500; color: var(--fg); }

/* Social icon buttons */
.social-icons { display: flex; gap: 12px; flex-wrap: wrap; }
.social-btn {
  display: flex; align-items: center; justify-content: center;
  width: 44px; height: 44px;
  background: var(--bg-2); border: 1px solid var(--border);
  border-radius: 50%; cursor: none;
  transition: background var(--transition), border-color var(--transition),
              box-shadow var(--transition), transform var(--transition);
  color: var(--fg-dim);
}
.social-btn svg {
  width: 18px; height: 18px; fill: currentColor; display: block;
}
.social-btn:hover {
  background: var(--social-color, var(--primary));
  border-color: var(--social-color, var(--primary));
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

/* Form */
.contact-form-wrap {
  padding: 2.5rem; position: relative; min-height: 280px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
@media (min-width: 768px) { .contact-form-wrap { padding: 3rem; } }

.contact-form { display: flex; flex-direction: column; gap: 2rem; }
.contact-form.hidden { visibility: hidden; }

.form-row { display: grid; grid-template-columns: 1fr; gap: 2rem; }
@media (min-width: 640px) { .form-row { grid-template-columns: 1fr 1fr; } }

.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label {
  font-family: var(--font-mono);
  font-size: 0.6rem; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--muted);
  transition: color var(--transition);
}
.form-group:focus-within label { color: var(--primary); }

.form-group input,
.form-group textarea {
  background: transparent; border: none;
  border-bottom: 1px solid var(--border);
  padding: 0.75rem 0; color: var(--fg);
  font-family: var(--font-body); font-size: 0.95rem;
  font-weight: 300; outline: none; width: 100%;
  transition: border-color var(--transition); resize: none;
}
.form-group input::placeholder,
.form-group textarea::placeholder { color: var(--muted); font-style: italic; }
.form-group input:focus,
.form-group textarea:focus { border-bottom-color: var(--primary); }

.submit-btn {
  align-self: flex-start;
  display: inline-flex; align-items: center; gap: 10px;
  padding: 0.9rem 2.5rem;
  background: var(--fg); color: var(--bg);
  font-family: var(--font-mono); font-size: 0.72rem;
  font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
  border: none; cursor: none;
  transition: background var(--transition), box-shadow var(--transition);
}
.submit-btn:hover {
  background: var(--primary);
  box-shadow: 0 4px 24px var(--primary-glow);
}
.submit-btn svg { transition: transform var(--transition); }
.submit-btn:hover svg { transform: translateX(4px); }

/* Success message */
.sent-msg {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  gap: 10px; font-size: 0.9rem; color: var(--primary);
  font-weight: 500; text-align: center; padding: 2rem;
}

/* Footer */
.contact-footer {
  margin-top: 6rem; padding: 2rem 0;
  border-top: 1px solid var(--border); text-align: center;
}
.contact-footer p {
  font-family: var(--font-mono); font-size: 0.65rem;
  color: var(--muted); letter-spacing: 0.08em;
}
</style>
