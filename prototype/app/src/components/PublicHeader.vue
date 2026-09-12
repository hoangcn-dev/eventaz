<template>
  <div class="fixed top-0 left-0 right-0 z-50 transition-all">
    <!-- Top Announcement Banner -->
    <div 
      v-if="showBanner" 
      class="bg-gradient-to-r from-primary via-secondary to-primary-container text-white py-2 px-4 text-xs md:text-sm font-medium flex items-center justify-between shadow-inner"
    >
      <div class="flex items-center justify-center gap-2 mx-auto text-center truncate">
        <span class="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-white/20 text-white shrink-0">HOT</span>
        <span class="material-symbols-outlined text-[18px] text-amber-300 shrink-0">local_fire_department</span>
        <span class="truncate">{{ $t('public.banner.text') }}</span>
        <router-link to="/events" class="inline-flex items-center gap-1 underline font-bold hover:text-white/80 shrink-0 ml-1">
          <span>{{ $t('public.banner.action') }}</span>
          <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
        </router-link>
      </div>
      <button 
        @click="showBanner = false" 
        class="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 shrink-0 ml-2 transition-colors"
        title="Đóng thông báo"
      >
        <span class="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>

    <!-- Main Public Header -->
    <header class="bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/60 shadow-sm h-16 flex items-center px-4 lg:px-8 justify-between transition-colors">
      <!-- Logo & Brand Name -->
      <div class="flex items-center gap-6">
        <router-link to="/landing" class="flex items-center gap-2.5 group">
          <div class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
            E
          </div>
          <div class="flex flex-col">
            <span class="font-black text-xl tracking-tight text-primary leading-none">EventAZ</span>
            <span class="text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase">Event Platform</span>
          </div>
        </router-link>

        <!-- Desktop Navigation Bar -->
        <nav class="hidden md:flex items-center gap-1 ml-4">
          <router-link 
            to="/" 
            class="px-3.5 py-2 rounded-lg text-sm font-semibold transition-all"
            :class="[
              isActive('/') 
                ? 'text-primary bg-primary/10 font-bold' 
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            ]"
          >
            {{ $t('public.header.navHome') }}
          </router-link>

          <router-link 
            to="/events" 
            class="px-3.5 py-2 rounded-lg text-sm font-semibold transition-all"
            :class="[
              isActive('/events') 
                ? 'text-primary bg-primary/10 font-bold' 
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            ]"
          >
            {{ $t('public.header.navEvents') }}
          </router-link>

          <router-link 
            to="/pricing" 
            class="px-3.5 py-2 rounded-lg text-sm font-semibold transition-all"
            :class="[
              isActive('/pricing') 
                ? 'text-primary bg-primary/10 font-bold' 
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            ]"
          >
            {{ $t('public.header.navPricing') }}
          </router-link>

          <router-link 
            to="/about" 
            class="px-3.5 py-2 rounded-lg text-sm font-semibold transition-all"
            :class="[
              isActive('/about') 
                ? 'text-primary bg-primary/10 font-bold' 
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            ]"
          >
            {{ $t('public.header.navAbout') }}
          </router-link>
        </nav>
      </div>

      <!-- Header Search & Right Side Controls -->
      <div class="flex items-center gap-3">
        <!-- Quick Search Bar (Desktop) -->
        <div class="relative hidden lg:block w-52 xl:w-64">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
          <input 
            type="text" 
            :placeholder="$t('public.header.searchPlaceholder')" 
            class="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-container-low border border-outline-variant rounded-full focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all text-on-surface"
          />
        </div>

        <!-- Language Switcher Toggle (VI | EN) -->
        <button 
          @click="toggleLanguage" 
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border border-outline-variant hover:bg-surface-container transition-colors text-on-surface"
          title="Chuyển đổi ngôn ngữ / Switch Language"
        >
          <span class="material-symbols-outlined text-[16px] text-primary">translate</span>
          <span>{{ currentLang }}</span>
        </button>

        <!-- Light / Dark Theme Switcher Button -->
        <button 
          @click="toggleTheme" 
          class="w-9 h-9 rounded-full flex items-center justify-center border border-outline-variant hover:bg-surface-container transition-colors text-on-surface-variant"
          :title="isDark ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối'"
        >
          <span class="material-symbols-outlined text-[20px] text-amber-500" v-if="isDark">light_mode</span>
          <span class="material-symbols-outlined text-[20px] text-slate-600" v-else>dark_mode</span>
        </button>

        <div class="h-6 w-px bg-outline-variant/60 mx-0.5 hidden sm:block"></div>

        <!-- Auth Action Buttons / Logged User State -->
        <div class="hidden sm:flex items-center gap-2">
          <!-- Unauthenticated User -->
          <template v-if="!sessionUser">
            <router-link 
              to="/login" 
              class="px-4 py-2 text-xs font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              {{ $t('public.header.login') }}
            </router-link>
            <router-link 
              to="/register" 
              class="px-4 py-2 text-xs font-bold text-on-primary bg-primary hover:bg-primary-container rounded-lg shadow-sm active:scale-95 transition-all"
            >
              {{ $t('public.header.register') }}
            </router-link>
          </template>

          <!-- Authenticated User -->
          <template v-else>
            <router-link 
              to="/dashboard" 
              class="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-on-primary bg-primary hover:bg-primary-container rounded-lg shadow-sm transition-all"
            >
              <span class="material-symbols-outlined text-[18px]">dashboard</span>
              <span>{{ $t('public.header.dashboard') }}</span>
            </router-link>

            <!-- Quick Profile Dropdown -->
            <div class="relative">
              <button 
                @click="showUserMenu = !showUserMenu" 
                class="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center border border-primary/30 hover:scale-105 transition-transform"
                title="Tài khoản"
              >
                {{ sessionUser.name ? sessionUser.name.charAt(0).toUpperCase() : 'U' }}
              </button>

              <div 
                v-if="showUserMenu" 
                @click="showUserMenu = false"
                class="fixed inset-0 z-40"
              ></div>

              <div 
                v-if="showUserMenu" 
                class="absolute right-0 top-11 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl py-2 z-50 text-xs"
              >
                <div class="px-3 py-2 border-b border-outline-variant/60">
                  <p class="font-bold text-on-surface truncate">{{ sessionUser.name }}</p>
                  <p class="text-[11px] text-on-surface-variant truncate">{{ sessionUser.email }}</p>
                </div>
                <router-link to="/dashboard" class="flex items-center gap-2 px-3 py-2 hover:bg-surface-container text-on-surface">
                  <span class="material-symbols-outlined text-[16px] text-primary">dashboard</span>
                  <span>{{ $t('public.header.dashboard') }}</span>
                </router-link>
                <button 
                  @click="handleLogout" 
                  class="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 text-left font-semibold"
                >
                  <span class="material-symbols-outlined text-[16px]">logout</span>
                  <span>{{ $t('public.header.logout') }}</span>
                </button>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile Drawer Menu Button -->
        <button 
          @click="showMobileMenu = !showMobileMenu" 
          class="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg md:hidden"
        >
          <span class="material-symbols-outlined text-[24px]">
            {{ showMobileMenu ? 'close' : 'menu' }}
          </span>
        </button>
      </div>
    </header>

    <!-- Mobile Navigation Drawer -->
    <transition name="slide-down">
      <div 
        v-if="showMobileMenu" 
        class="md:hidden bg-surface-container-lowest border-b border-outline-variant shadow-xl px-4 py-4 space-y-3"
      >
        <nav class="flex flex-col gap-1">
          <router-link 
            to="/" 
            @click="showMobileMenu = false" 
            class="px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between"
            :class="isActive('/') ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low'"
          >
            <span>{{ $t('public.header.navHome') }}</span>
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </router-link>

          <router-link 
            to="/events" 
            @click="showMobileMenu = false" 
            class="px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between"
            :class="isActive('/events') ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low'"
          >
            <span>{{ $t('public.header.navEvents') }}</span>
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </router-link>

          <router-link 
            to="/pricing" 
            @click="showMobileMenu = false" 
            class="px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between"
            :class="isActive('/pricing') ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low'"
          >
            <span>{{ $t('public.header.navPricing') }}</span>
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </router-link>

          <router-link 
            to="/about" 
            @click="showMobileMenu = false" 
            class="px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between"
            :class="isActive('/about') ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low'"
          >
            <span>{{ $t('public.header.navAbout') }}</span>
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </router-link>
        </nav>

        <div class="pt-3 border-t border-outline-variant/60 flex flex-col gap-2">
          <template v-if="!sessionUser">
            <router-link 
              to="/login" 
              @click="showMobileMenu = false"
              class="w-full text-center py-2.5 rounded-lg border border-primary text-primary font-bold text-sm"
            >
              {{ $t('public.header.login') }}
            </router-link>
            <router-link 
              to="/register" 
              @click="showMobileMenu = false"
              class="w-full text-center py-2.5 rounded-lg bg-primary text-on-primary font-bold text-sm shadow-md"
            >
              {{ $t('public.header.register') }}
            </router-link>
          </template>

          <template v-else>
            <router-link 
              to="/dashboard" 
              @click="showMobileMenu = false"
              class="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-on-primary font-bold text-sm shadow-md"
            >
              <span class="material-symbols-outlined text-[20px]">dashboard</span>
              <span>{{ $t('public.header.dashboard') }}</span>
            </router-link>
            <button 
              @click="handleLogout" 
              class="w-full py-2 text-center text-red-600 font-bold text-sm"
            >
              {{ $t('public.header.logout') }}
            </button>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTheme } from '../composables/useTheme';
import { useLanguage } from '../composables/useLanguage';
import { getSession, clearSession } from '../utils/auth';

const route = useRoute();
const router = useRouter();

const { isDark, toggleTheme } = useTheme();
const { currentLang, toggleLanguage } = useLanguage();

const showBanner = ref(true);
const showMobileMenu = ref(false);
const showUserMenu = ref(false);

const sessionUser = computed(() => {
  const session = getSession();
  return session ? session.user : null;
});

function isActive(path) {
  if (path === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(path);
}

function handleLogout() {
  showUserMenu.value = false;
  showMobileMenu.value = false;
  clearSession();
  router.push('/login');
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
