<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const formRef   = ref<HTMLFormElement | null>(null);
const sent      = ref(false);
let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(".contact-stagger", { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: "power3.out",
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

const SOCIALS = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/",
    color: "#333",
    svg: `<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>`,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com/",
    color: "#1877F2",
    svg: `<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>`,
  },
  {
    id: "gmail",
    label: "Gmail",
    href: "mailto:justine.buncag@gmail.com",
    color: "#EA4335",
    svg: `<path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.907 1.528-1.147C21.69 2.28 24 3.434 24 5.457z"/>`,
  },
];
</script>

<template>
  <section id="contact" ref="sectionRef" class="contact-section">
    <div class="container">

      <div class="contact-header contact-stagger">
        <p class="section-label">Contact</p>
        <h3 class="contact-title">Let's build something.</h3>
        <p class="contact-sub">
          Currently available for freelance opportunities and full-time roles.
          If you're looking for a developer who cares about details, say hello.
        </p>
      </div>

      <div class="contact-grid">

        <!-- Info panel -->
        <div class="contact-info contact-stagger">
          <div class="contact-info-item">
            <div class="info-label">Email</div>
            <a href="mailto:justine.buncag@gmail.com" class="info-value info-link">
              justine.buncag@gmail.com
            </a>
          </div>

          <div class="contact-info-item">
            <div class="info-label">Location</div>
            <p class="info-value">Philippines</p>
          </div>

          <div class="contact-info-item">
            <div class="info-label">Socials</div>
            <div class="social-row">
              <a
                v-for="s in SOCIALS"
                :key="s.id"
                :href="s.href"
                :title="s.label"
                class="social-icon-btn"
                target="_blank"
                rel="noopener noreferrer"
                :style="{ '--social-color': s.color }"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20" height="20"
                  v-html="s.svg"
                />
                <span class="social-label">{{ s.label }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="contact-form-wrap glass contact-stagger">
          <Transition name="fade">
            <div v-if="sent" class="sent-msg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Message sent — I'll get back to you soon.
            </div>
          </Transition>

          <form ref="formRef" @submit="handleSubmit" class="contact-form" :class="{ hidden: sent }">
            <div class="form-row">
              <div class="form-group">
                <label for="c-name">Name</label>
                <input type="text" id="c-name" required placeholder="John Doe" data-testid="input-name" />
              </div>
              <div class="form-group">
                <label for="c-email">Email</label>
                <input type="email" id="c-email" required placeholder="john@example.com" data-testid="input-email" />
              </div>
            </div>
            <div class="form-group">
              <label for="c-message">Message</label>
              <textarea id="c-message" rows="4" required placeholder="Tell me about your project..." data-testid="input-message" />
            </div>
            <button type="submit" class="submit-btn" data-testid="btn-submit-contact">
              Send Message
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="arrow-icon">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>
        </div>

      </div>
    </div>

    <div class="contact-footer">
      <p>© {{ new Date().getFullYear() }} Justine Buncag. All rights reserved.</p>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 7rem 0 0;
  position: relative;
}

.contact-header {
  text-align: center; max-width: 680px; margin: 0 auto 4rem;
}
.contact-title {
  font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 700;
  color: var(--fg); margin-bottom: 1rem;
}
.contact-sub {
  font-size: 1rem; color: var(--fg-dim); font-weight: 300; line-height: 1.7;
}

.contact-grid {
  display: grid; grid-template-columns: 1fr;
  gap: 3rem; max-width: 1100px; margin: 0 auto;
}
@media (min-width: 1024px) {
  .contact-grid { grid-template-columns: 4fr 8fr; }
}

/* Info */
.contact-info {
  display: flex; flex-direction: column; gap: 2.5rem; justify-content: center;
}
.contact-info-item { display: flex; flex-direction: column; gap: 8px; }
.info-label {
  font-size: 0.6rem; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--fg-dim);
}
.info-value { font-size: 0.95rem; font-weight: 500; color: var(--fg); }
.info-link { transition: color var(--transition); cursor: none; }
.info-link:hover { color: var(--primary); }

/* Social icon buttons */
.social-row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }

.social-icon-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px; border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--fg-dim);
  font-size: 0.8rem; font-weight: 500;
  cursor: none;
  transition: color var(--transition), border-color var(--transition),
              background var(--transition), box-shadow var(--transition);
  text-decoration: none;
}
.social-icon-btn:hover {
  color: var(--social-color);
  border-color: var(--social-color);
  background: color-mix(in srgb, var(--social-color) 8%, transparent);
  box-shadow: 0 0 16px color-mix(in srgb, var(--social-color) 20%, transparent);
}

.social-label { font-size: 0.78rem; }

/* Form */
.contact-form-wrap {
  padding: 2.5rem; position: relative; min-height: 300px;
}
@media (min-width: 768px) { .contact-form-wrap { padding: 3rem 3.5rem; } }

.contact-form { display: flex; flex-direction: column; gap: 2rem; }
.contact-form.hidden { visibility: hidden; }

.form-row { display: grid; grid-template-columns: 1fr; gap: 2rem; }
@media (min-width: 640px) { .form-row { grid-template-columns: 1fr 1fr; } }

.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label {
  font-size: 0.62rem; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--fg-dim);
  transition: color var(--transition);
}
.form-group:focus-within label { color: var(--primary); }

.form-group input,
.form-group textarea {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  padding: 0.75rem 0;
  color: var(--fg);
  font-family: var(--font-body); font-size: 1rem; font-weight: 300;
  outline: none; width: 100%;
  transition: border-color var(--transition);
  resize: none;
}
.form-group input::placeholder,
.form-group textarea::placeholder { color: var(--fg-dim); opacity: 0.4; }
.form-group input:focus,
.form-group textarea:focus { border-bottom-color: var(--primary); }

.submit-btn {
  display: inline-flex; align-items: center; gap: 10px;
  align-self: flex-start; padding: 1rem 2.5rem;
  background: var(--fg); color: var(--bg);
  font-size: 0.85rem; font-weight: 600; border: none; cursor: none;
  transition: background var(--transition), box-shadow var(--transition);
}
.submit-btn:hover { background: var(--primary); box-shadow: 0 0 30px rgba(245,166,35,0.3); }
.arrow-icon { transition: transform var(--transition); }
.submit-btn:hover .arrow-icon { transform: translateX(4px); }

/* Sent confirmation */
.sent-msg {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  font-size: 1rem; color: var(--primary); font-weight: 500;
  text-align: center; padding: 2rem;
}

/* Footer */
.contact-footer {
  margin-top: 6rem; padding: 1.5rem 0;
  border-top: 1px solid var(--border); text-align: center;
}
.contact-footer p {
  font-family: var(--font-mono); font-size: 0.7rem; color: var(--fg-dim);
}
</style>
