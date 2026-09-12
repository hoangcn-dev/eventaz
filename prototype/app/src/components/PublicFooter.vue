<template>
  <footer class="bg-surface-container-lowest border-t border-outline-variant/60 text-on-surface pt-12 pb-8 transition-colors">
    <div class="max-w-7xl mx-auto px-4 lg:px-8">
      <!-- Main Footer Columns Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-outline-variant/40">
        <!-- Col 1: Brand & Bio -->
        <div class="lg:col-span-2 space-y-4">
          <router-link to="/" class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-extrabold text-xl shadow-md">
              E
            </div>
            <span class="font-black text-2xl tracking-tight text-primary">EventAZ</span>
          </router-link>

          <p class="text-xs md:text-sm text-on-surface-variant leading-relaxed max-w-sm">
            {{ $t('public.footer.companyDesc') }}
          </p>

          <!-- Contact Details -->
          <div class="space-y-2 text-xs text-on-surface-variant pt-1">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-primary shrink-0">location_on</span>
              <span>{{ $t('public.footer.address') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-primary shrink-0">call</span>
              <span>{{ $t('public.footer.hotline') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-primary shrink-0">mail</span>
              <span>support@eventaz.vn</span>
            </div>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div class="space-y-3">
          <h4 class="font-bold text-sm text-on-surface uppercase tracking-wider">{{ $t('public.footer.quickLinksTitle') }}</h4>
          <ul class="space-y-2 text-xs font-medium text-on-surface-variant">
            <li>
              <router-link to="/" class="hover:text-primary transition-colors flex items-center gap-1">
                <span>{{ $t('public.header.navHome') }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="/events" class="hover:text-primary transition-colors flex items-center gap-1">
                <span>{{ $t('public.header.navEvents') }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="/pricing" class="hover:text-primary transition-colors flex items-center gap-1">
                <span>{{ $t('public.header.navPricing') }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="hover:text-primary transition-colors flex items-center gap-1">
                <span>{{ $t('public.header.navAbout') }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Col 3: Categories -->
        <div class="space-y-3">
          <h4 class="font-bold text-sm text-on-surface uppercase tracking-wider">{{ $t('public.footer.categoriesTitle') }}</h4>
          <ul class="space-y-2 text-xs font-medium text-on-surface-variant">
            <li>
              <router-link to="/events?cat=music" class="hover:text-primary transition-colors">
                {{ $t('public.footer.categoryMusic') }}
              </router-link>
            </li>
            <li>
              <router-link to="/events?cat=tech" class="hover:text-primary transition-colors">
                {{ $t('public.footer.categoryTech') }}
              </router-link>
            </li>
            <li>
              <router-link to="/events?cat=workshop" class="hover:text-primary transition-colors">
                {{ $t('public.footer.categoryWorkshop') }}
              </router-link>
            </li>
            <li>
              <router-link to="/events?cat=sports" class="hover:text-primary transition-colors">
                {{ $t('public.footer.categorySports') }}
              </router-link>
            </li>
            <li>
              <router-link to="/events?cat=exhibition" class="hover:text-primary transition-colors">
                {{ $t('public.footer.categoryExhibition') }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Col 4: Newsletter & Support -->
        <div class="space-y-3">
          <h4 class="font-bold text-sm text-on-surface uppercase tracking-wider">{{ $t('public.footer.newsletterTitle') }}</h4>
          <p class="text-xs text-on-surface-variant leading-normal">
            {{ $t('public.footer.newsletterDesc') }}
          </p>

          <form @submit.prevent="handleSubscribe" class="flex flex-col gap-2 pt-1">
            <div class="relative">
              <input 
                type="email" 
                v-model="email" 
                :placeholder="$t('public.footer.newsletterInputPlaceholder')" 
                required
                class="w-full px-3 py-2 text-xs bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary text-on-surface"
              />
            </div>
            <button 
              type="submit" 
              class="w-full py-2 bg-primary hover:bg-primary-container text-on-primary text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-all"
            >
              {{ $t('public.footer.newsletterButton') }}
            </button>
            <p v-if="subscribed" class="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">check_circle</span>
              <span>{{ $t('public.footer.subscribedSuccess') }}</span>
            </p>
          </form>
        </div>
      </div>

      <!-- Bottom Bar: Social Icons & Copyright -->
      <div class="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
        <p class="text-center md:text-left font-medium">
          {{ $t('public.footer.copyright') }}
        </p>

        <!-- Social Links (Using Material Symbols Outlined Icons) -->
        <div class="flex items-center gap-4">
          <a href="#" class="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors" title="Facebook">
            <span class="material-symbols-outlined text-[18px]">share</span>
          </a>
          <a href="#" class="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors" title="YouTube">
            <span class="material-symbols-outlined text-[18px]">smart_display</span>
          </a>
          <a href="#" class="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors" title="LinkedIn">
            <span class="material-symbols-outlined text-[18px]">business_center</span>
          </a>
          <a href="#" class="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors" title="TikTok">
            <span class="material-symbols-outlined text-[18px]">music_note</span>
          </a>
        </div>

        <!-- Scroll to Top Button -->
        <button 
          @click="scrollToTop" 
          class="flex items-center gap-1 text-xs font-semibold hover:text-primary transition-colors p-1"
        >
          <span>{{ $t('public.footer.scrollToTop') }}</span>
          <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const subscribed = ref(false);

function handleSubscribe() {
  if (email.value) {
    subscribed.value = true;
    email.value = '';
    setTimeout(() => {
      subscribed.value = false;
    }, 4000);
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
