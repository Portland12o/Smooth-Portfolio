import { ref, onMounted } from "vue";

const STORAGE_KEY = "portfolio-theme";
const isDark = ref(true);

function applyTheme(dark: boolean) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  isDark.value = dark;
}

export function useTheme() {
  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      applyTheme(saved === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark);
    }
    /* Listen for OS-level changes (no saved preference) */
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) applyTheme(e.matches);
    });
  });

  const toggle = () => {
    const next = !isDark.value;
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  };

  return { isDark, toggle };
}
