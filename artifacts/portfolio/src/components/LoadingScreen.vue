<script setup lang="ts">
import { onMounted, ref } from "vue";

const emit = defineEmits<{ complete: [] }>();
const barWidth = ref(0);

onMounted(() => {
  const duration = 1800;
  const start = performance.now();
  const tick = (now: number) => {
    const elapsed = now - start;
    barWidth.value = Math.min((elapsed / duration) * 100, 100);
    if (elapsed < duration) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(() => emit("complete"), 80);
    }
  };
  requestAnimationFrame(tick);
});
</script>

<template>
  <div class="loading-screen">
    <div class="loading-inner">
      <div class="loading-monogram">J.B</div>
      <div class="loading-name">BUNCAG</div>
      <div class="loading-bar-track">
        <div class="loading-bar-fill" :style="{ width: barWidth + '%' }" />
      </div>
      <p class="loading-role">Front-End Developer</p>
    </div>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed; inset: 0; z-index: 9999;
  background: var(--bg);
  display: flex; align-items: center; justify-content: center;
}

.loading-inner {
  display: flex; flex-direction: column; align-items: center; gap: 1rem;
}

.loading-monogram {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3rem); font-weight: 600;
  color: var(--primary); letter-spacing: 0.1em;
}

.loading-name {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 800; letter-spacing: 0.25em;
  text-transform: uppercase; color: var(--fg);
  margin-top: -0.5rem;
}

.loading-bar-track {
  width: 180px; height: 1px;
  background: var(--border); margin-top: 1rem;
}
.loading-bar-fill {
  height: 100%; background: var(--primary);
  transition: width 0.05s linear;
}

.loading-role {
  font-family: var(--font-mono);
  font-size: 0.6rem; letter-spacing: 0.25em;
  text-transform: uppercase; color: var(--muted);
  margin-top: 0.5rem;
}
</style>
