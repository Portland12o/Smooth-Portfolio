<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const cursorX = ref(-100);
const cursorY = ref(-100);
const dotX = ref(-100);
const dotY = ref(-100);
const isHovering = ref(false);

let animFrame: number;
let lerpX = -100, lerpY = -100;

const onMouseMove = (e: MouseEvent) => {
  cursorX.value = e.clientX;
  cursorY.value = e.clientY;
};

const onMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  isHovering.value = !!(
    target.closest("a") ||
    target.closest("button") ||
    target.closest("[data-cursor]")
  );
};

const animate = () => {
  lerpX += (cursorX.value - lerpX) * 0.12;
  lerpY += (cursorY.value - lerpY) * 0.12;
  dotX.value = lerpX;
  dotY.value = lerpY;
  animFrame = requestAnimationFrame(animate);
};

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseover", onMouseOver);
  animFrame = requestAnimationFrame(animate);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseover", onMouseOver);
  cancelAnimationFrame(animFrame);
});
</script>

<template>
  <div
    class="cursor-ring"
    :class="{ hovering: isHovering }"
    :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
  />
  <div
    class="cursor-dot"
    :style="{ left: dotX + 'px', top: dotY + 'px' }"
  />
</template>

<style scoped>
.cursor-ring {
  position: fixed;
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(245, 166, 35, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: transform 0.15s ease, width 0.25s ease, height 0.25s ease, background 0.25s ease, border-color 0.25s ease;
}
.cursor-ring.hovering {
  width: 50px;
  height: 50px;
  background: rgba(245, 166, 35, 0.08);
  border-color: var(--primary);
}

.cursor-dot {
  position: fixed;
  width: 5px;
  height: 5px;
  background: var(--primary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
}
</style>
