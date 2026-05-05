<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const scrolled = ref(false);
const active = ref("hero");
const menuOpen = ref(false);

const NAV_LINKS = [
  { name: "Home", href: "hero" },
  { name: "About", href: "about" },
  { name: "Projects", href: "projects" },
  { name: "Skills", href: "skills" },
  { name: "Contact", href: "contact" },
];

const onScroll = () => {
  scrolled.value = window.scrollY > 50;
  const sections = NAV_LINKS.map((l) => l.href);
  let current = "hero";
  for (const id of sections) {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  }
  active.value = current;
};

const scrollTo = (id: string) => {
  menuOpen.value = false;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="container navbar-inner">
      <a class="navbar-logo" @click.prevent="scrollTo('hero')">
        <span class="navbar-logo-accent">J.</span>BUNCAG
      </a>

      <!-- Desktop nav -->
      <nav class="navbar-links">
        <a
          v-for="link in NAV_LINKS"
          :key="link.href"
          class="nav-link"
          :class="{ active: active === link.href }"
          @click.prevent="scrollTo(link.href)"
        >
          {{ link.name }}
          <span v-if="active === link.href" class="nav-indicator" />
        </a>
      </nav>

      <!-- Mobile toggle -->
      <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span class="hamburger" :class="{ open: menuOpen }">
          <span /><span /><span />
        </span>
      </button>
    </div>

    <!-- Mobile drawer -->
    <Transition name="slide-down">
      <div v-if="menuOpen" class="mobile-menu glass">
        <a
          v-for="link in NAV_LINKS"
          :key="link.href"
          class="mobile-link"
          :class="{ active: active === link.href }"
          @click.prevent="scrollTo(link.href)"
        >
          {{ link.name }}
        </a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.5rem 0;
  transition: padding var(--transition), background var(--transition), border-color var(--transition);
  border-bottom: 1px solid transparent;
}
.navbar.scrolled {
  padding: 1rem 0;
  background: rgba(9, 9, 12, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom-color: var(--border);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  cursor: none;
}
.navbar-logo-accent { color: var(--primary); }

.navbar-links {
  display: none;
  gap: 2rem;
  align-items: center;
}
@media (min-width: 768px) {
  .navbar-links { display: flex; }
}

.nav-link {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--fg-dim);
  cursor: none;
  position: relative;
  padding-bottom: 4px;
  transition: color var(--transition);
}
.nav-link:hover, .nav-link.active { color: var(--primary); }
.nav-indicator {
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 1.5px;
  background: var(--primary);
  border-radius: 1px;
}

.menu-toggle {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 4px;
}
@media (min-width: 768px) { .menu-toggle { display: none; } }

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 22px;
}
.hamburger span {
  display: block;
  height: 1.5px;
  background: var(--fg);
  border-radius: 1px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.mobile-link {
  width: 100%;
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-dim);
  cursor: none;
  transition: color var(--transition), background var(--transition);
  border-bottom: 1px solid var(--border);
}
.mobile-link:last-child { border-bottom: none; }
.mobile-link:hover, .mobile-link.active { color: var(--primary); background: var(--primary-glow); }

.slide-down-enter-active, .slide-down-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
