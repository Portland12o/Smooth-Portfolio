<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const formRef = ref<HTMLFormElement | null>(null);
const sent = ref(false);
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

        <!-- Info -->
        <div class="contact-info contact-stagger">
          <div class="contact-info-item">
            <div class="info-label">Email</div>
            <a href="mailto:justine.buncag@email.com" class="info-value info-link">
              justine.buncag@email.com
            </a>
          </div>
          <div class="contact-info-item">
            <div class="info-label">Location</div>
            <p class="info-value">Philippines</p>
          </div>
          <div class="contact-info-item">
            <div class="info-label">Socials</div>
            <div class="social-links">
              <a href="#" class="social-link">GitHub</a>
              <a href="#" class="social-link">LinkedIn</a>
              <a href="#" class="social-link">Twitter</a>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="contact-form-wrap glass contact-stagger">
          <Transition name="fade">
            <div v-if="sent" class="sent-msg">
              Message sent — I'll get back to you soon.
            </div>
          </Transition>

          <form ref="formRef" @submit="handleSubmit" class="contact-form" :class="{ hidden: sent }">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" required placeholder="John Doe" data-testid="input-name" />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" required placeholder="john@example.com" data-testid="input-email" />
              </div>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" rows="4" required placeholder="Tell me about your project..." data-testid="input-message" />
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

    <!-- Footer -->
    <div class="contact-footer">
      <p>© {{ new Date().getFullYear() }} Justine Buncag. All rights reserved.</p>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 7rem 0 0;
  background: rgba(255,255,255,0.01);
  position: relative;
}

.contact-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 4rem;
}
.contact-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  color: var(--fg);
  margin-bottom: 1rem;
}
.contact-sub {
  font-size: 1rem;
  color: var(--fg-dim);
  font-weight: 300;
  line-height: 1.7;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;
}
@media (min-width: 1024px) {
  .contact-grid { grid-template-columns: 4fr 8fr; }
}

/* Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
}
.contact-info-item { display: flex; flex-direction: column; gap: 6px; }
.info-label {
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-dim);
}
.info-value { font-size: 0.95rem; font-weight: 500; color: var(--fg); }
.info-link { transition: color var(--transition); cursor: none; }
.info-link:hover { color: var(--primary); }

.social-links { display: flex; gap: 1.5rem; }
.social-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--fg);
  cursor: none;
  transition: color var(--transition);
}
.social-link:hover { color: var(--primary); }

/* Form */
.contact-form-wrap {
  padding: 2.5rem;
  position: relative;
  min-height: 300px;
}
@media (min-width: 768px) { .contact-form-wrap { padding: 3rem 3.5rem; } }

.contact-form { display: flex; flex-direction: column; gap: 2rem; }
.contact-form.hidden { visibility: hidden; }

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 640px) { .form-row { grid-template-columns: 1fr 1fr; } }

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-group label {
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-dim);
  transition: color var(--transition);
}
.form-group:focus-within label { color: var(--primary); }

.form-group input,
.form-group textarea {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: 0.75rem 0;
  color: var(--fg);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 300;
  outline: none;
  width: 100%;
  transition: border-color var(--transition);
  resize: none;
}
.form-group input::placeholder,
.form-group textarea::placeholder { color: rgba(239,239,239,0.25); }
.form-group input:focus,
.form-group textarea:focus { border-bottom-color: var(--primary); }

.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  align-self: flex-start;
  padding: 1rem 2.5rem;
  background: var(--fg);
  color: var(--bg);
  font-size: 0.85rem;
  font-weight: 600;
  border: none;
  cursor: none;
  transition: background var(--transition), box-shadow var(--transition);
}
.submit-btn:hover { background: var(--primary); box-shadow: 0 0 30px rgba(245,166,35,0.3); }
.arrow-icon { transition: transform var(--transition); }
.submit-btn:hover .arrow-icon { transform: translateX(4px); }

/* Sent message */
.sent-msg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--primary);
  font-weight: 500;
  text-align: center;
  padding: 2rem;
}

/* Footer */
.contact-footer {
  margin-top: 6rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border);
  text-align: center;
}
.contact-footer p {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--fg-dim);
}
</style>
