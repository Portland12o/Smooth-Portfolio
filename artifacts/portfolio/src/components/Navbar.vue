<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useTheme } from "../composables/useTheme";

const { isDark, toggle } = useTheme();
const scrolled = ref(false);
const active = ref("hero");
const menuOpen = ref(false);

const NAV_LINKS = [
  { name: "Home",     href: "hero"     },
  { name: "About",    href: "about"    },
  { name: "Projects", href: "projects" },
  { name: "Skills",   href: "skills"   },
  { name: "Contact",  href: "contact"  },
];

const onScroll = () => {
  scrolled.value = window.scrollY > 50;
  let current = "hero";
  for (const l of NAV_LINKS) {
    const el = document.getElementById(l.href);
    if (el && window.scrollY >= el.offsetTop - 200) current = l.href;
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

        <!-- Theme toggle -->
        <button class="theme-toggle" @click="toggle" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
          <!-- Sun icon (shown in dark mode → click to go light) -->
          <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <!-- Moon icon (shown in light mode → click to go dark) -->
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </nav>

      <!-- Mobile controls -->
      <div class="navbar-mobile-controls">
        <button class="theme-toggle" @click="toggle" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
          <svg v-if="isDark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
          <span class="hamburger" :class="{ open: menuOpen }">
            <span /><span /><span />
          </span>
        </button>
      </div>
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
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 1.5rem 0;
  transition: padding var(--transition), background var(--transition), border-color var(--transition);
  border-bottom: 1px solid transparent;
}
.navbar.scrolled {
  padding: 0.9rem 0;
  background: var(--glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
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

/* Desktop nav */
.navbar-links {
  display: none;
  gap: 2rem;
  align-items: center;
}
@media (min-width: 768px) { .navbar-links { display: flex; } }

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
  bottom: -4px; left: 0; right: 0;
  height: 1.5px;
  background: var(--primary);
  border-radius: 1px;
}

/* Theme toggle button */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--border);
  border: 1px solid var(--border);
  color: var(--fg-dim);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  transition: background var(--transition), color var(--transition), border-color var(--transition), box-shadow var(--transition);
}
.theme-toggle:hover {
  color: var(--primary);
  border-color: var(--primary);
  box-shadow: 0 0 12px var(--primary-glow);
}

/* Mobile controls */
.navbar-mobile-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
@media (min-width: 768px) { .navbar-mobile-controls { display: none; } }

.menu-toggle {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 4px;
}

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

/* Mobile menu */
.mobile-menu {
  position: absolute;
  top: 100%; left: 0; right: 0;
  display: flex;
  flex-direction: column;
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
  border-bottom: 1px solid var(--border);
  transition: color var(--transition), background var(--transition);
}
.mobile-link:last-child { border-bottom: none; }
.mobile-link:hover, .mobile-link.active { color: var(--primary); background: var(--primary-glow); }

.slide-down-enter-active, .slide-down-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0; transform: translateY(-8px);
}
</style>
