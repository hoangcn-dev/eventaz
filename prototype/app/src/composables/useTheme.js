import { ref } from 'vue';

const isDark = ref(false);

export function useTheme() {
  function applyTheme(dark) {
    isDark.value = dark;
    if (typeof document !== 'undefined') {
      if (dark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('eventaz_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('eventaz_theme', 'light');
      }
    }
  }

  function initTheme() {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('eventaz_theme');
      if (savedTheme) {
        applyTheme(savedTheme === 'dark');
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark);
      }
    }
  }

  function toggleTheme() {
    applyTheme(!isDark.value);
  }

  return {
    isDark,
    initTheme,
    toggleTheme,
    applyTheme
  };
}
