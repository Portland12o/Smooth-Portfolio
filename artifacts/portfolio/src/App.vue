<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "./composables/useTheme";
import LoadingScreen from "./components/LoadingScreen.vue";
import CustomCursor from "./components/CustomCursor.vue";
import Navbar from "./components/Navbar.vue";
import Hero from "./components/Hero.vue";
import About from "./components/About.vue";
import Projects from "./components/Projects.vue";
import Skills from "./components/Skills.vue";
import Contact from "./components/Contact.vue";

const loading = ref(true);
const onComplete = () => { loading.value = false; };

/* Init theme as early as possible */
useTheme();
</script>

<template>
  <Transition name="fade" mode="out-in">
    <LoadingScreen v-if="loading" @complete="onComplete" key="loading" />
    <div v-else key="app" class="app-root">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  </Transition>
</template>

<style>
.app-root {
  width: 100%;
  min-height: 100vh;
  background: var(--bg);
  transition: background 0.35s ease;
}
</style>
