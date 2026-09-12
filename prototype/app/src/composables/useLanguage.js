import { ref } from 'vue';
import { i18n } from '../locales';

const currentLang = ref(localStorage.getItem('eventaz_lang') || 'VI');

export function useLanguage() {
  function setLanguage(lang) {
    if (lang === 'VI' || lang === 'EN') {
      currentLang.value = lang;
      if (typeof i18n.global.locale === 'object' && 'value' in i18n.global.locale) {
        i18n.global.locale.value = lang;
      } else {
        i18n.global.locale = lang;
      }
      localStorage.setItem('eventaz_lang', lang);
    }
  }

  function toggleLanguage() {
    setLanguage(currentLang.value === 'VI' ? 'EN' : 'VI');
  }

  return {
    currentLang,
    setLanguage,
    toggleLanguage
  };
}
