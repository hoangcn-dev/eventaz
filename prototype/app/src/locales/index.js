import { createI18n } from 'vue-i18n';

// Import domain-scoped locale modules
import publicVi from './public/vi';
import publicEn from './public/en';

import authVi from './auth/vi';
import authEn from './auth/en';

import adminVi from './admin/vi';
import adminEn from './admin/en';

// Combine domain-scoped modules into main locale catalogs
const messages = {
  VI: {
    public: publicVi,
    auth: authVi,
    admin: adminVi
  },
  EN: {
    public: publicEn,
    auth: authEn,
    admin: adminEn
  }
};

const savedLang = localStorage.getItem('eventaz_lang') || 'VI';

export const i18n = createI18n({
  legacy: false, // Vue 3 Composition API mode
  globalInjection: true, // Inject $t globally so templates update reactively
  locale: savedLang,
  fallbackLocale: 'VI',
  messages
});

export default i18n;
