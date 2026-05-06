<script setup lang="ts">
import { onMounted, ref } from "vue";

const emit = defineEmits<{ complete: [] }>();
const barWidth = ref(0);

onMounted(() => {
  /* Animate progress bar via rAF so it's smooth in all browsers */
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
      <div class="loading-name">
        <span class="loading-j">J.</span>BUNCAG
      </div>
      <div class="loading-bar-track">
        <div class="loading-bar-fill" :style="{ width: barWidth + '%' }" />
      </div>
      <p class="loading-role">Front-End Developer</p>
      <div class="loading-dots">
        <span /><span /><span />
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.loading-name {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: var(--fg);
}
.loading-j { color: var(--primary); }

.loading-bar-track {
  width: 200px;
  height: 2px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
}
.loading-bar-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 2px;
  transition: width 0.05s linear;
}

.loading-role {
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--fg-dim);
  font-family: var(--font-mono);
}

.loading-dots {
  display: flex;
  gap: 6px;
}
.loading-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
  animation: dot-pulse 1.2s ease-in-out infinite;
}
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes dot-pulse {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}
</style>
