<template>
  <div class="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-20">
    <!-- Hero Section -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
        <span class="material-symbols-outlined text-[16px]">info</span>
        <span>{{ $t('public.about.pageTag') }}</span>
      </div>
      <h1 class="text-3xl md:text-5xl font-black text-on-surface tracking-tight leading-tight">
        {{ $t('public.about.pageTitle') }}
      </h1>
      <p class="text-sm md:text-base text-on-surface-variant leading-relaxed">
        {{ $t('public.about.pageSubtitle') }}
      </p>
    </div>

    <!-- Company Stats with Animated Incrementing Counters -->
    <div ref="statsRef" class="bg-surface-container-low p-8 md:p-10 rounded-3xl border border-outline-variant/60 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-sm">
      <div class="space-y-1">
        <p class="text-3xl md:text-5xl font-black text-primary tracking-tight font-mono">
          {{ animatedStats.foundedYear }}
        </p>
        <p class="text-xs md:text-sm text-on-surface-variant font-semibold">{{ $t('public.about.foundedYear') }}</p>
      </div>
      <div class="space-y-1">
        <p class="text-3xl md:text-5xl font-black text-secondary tracking-tight font-mono">
          {{ formattedEvents }}
        </p>
        <p class="text-xs md:text-sm text-on-surface-variant font-semibold">{{ $t('public.about.successfulEvents') }}</p>
      </div>
      <div class="space-y-1">
        <p class="text-3xl md:text-5xl font-black text-emerald-600 tracking-tight font-mono">
          {{ formattedTickets }}
        </p>
        <p class="text-xs md:text-sm text-on-surface-variant font-semibold">{{ $t('public.about.ticketOrders') }}</p>
      </div>
      <div class="space-y-1">
        <p class="text-3xl md:text-5xl font-black text-amber-600 tracking-tight font-mono">
          {{ formattedStaff }}
        </p>
        <p class="text-xs md:text-sm text-on-surface-variant font-semibold">{{ $t('public.about.expertStaff') }}</p>
      </div>
    </div>

    <!-- Mission & Vision Banner -->
    <div class="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-sm">
      <div class="space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <span class="material-symbols-outlined text-[28px]">flag</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-black text-on-surface tracking-tight">
          {{ $t('public.about.missionTitle') }}
        </h2>
        <p class="text-xs md:text-sm text-on-surface-variant leading-relaxed">
          {{ $t('public.about.missionDesc') }}
        </p>
      </div>
      <div class="bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 rounded-2xl p-6 md:p-8 border border-primary/20 space-y-4">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-[24px]">verified</span>
          <span class="font-bold text-sm text-on-surface">ISO 27001 Certified Security</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-[24px]">bolt</span>
          <span class="font-bold text-sm text-on-surface">Sub-second QR Check-in App</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-[24px]">support_agent</span>
          <span class="font-bold text-sm text-on-surface">24/7 Dedicated Event Support</span>
        </div>
      </div>
    </div>

    <!-- Core Values -->
    <div class="space-y-8">
      <div class="text-center max-w-2xl mx-auto space-y-2">
        <h2 class="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">{{ $t('public.about.coreValuesTitle') }}</h2>
        <p class="text-xs md:text-sm text-on-surface-variant">{{ $t('public.about.coreValuesSubtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/60 space-y-3 shadow-sm hover:shadow-md transition-all">
          <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <span class="material-symbols-outlined text-[28px]">rocket_launch</span>
          </div>
          <h3 class="font-bold text-base text-on-surface">{{ $t('public.about.value1Title') }}</h3>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            {{ $t('public.about.value1Desc') }}
          </p>
        </div>

        <div class="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/60 space-y-3 shadow-sm hover:shadow-md transition-all">
          <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
            <span class="material-symbols-outlined text-[28px]">handshake</span>
          </div>
          <h3 class="font-bold text-base text-on-surface">{{ $t('public.about.value2Title') }}</h3>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            {{ $t('public.about.value2Desc') }}
          </p>
        </div>

        <div class="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/60 space-y-3 shadow-sm hover:shadow-md transition-all">
          <div class="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
            <span class="material-symbols-outlined text-[28px]">shield</span>
          </div>
          <h3 class="font-bold text-base text-on-surface">{{ $t('public.about.value3Title') }}</h3>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            {{ $t('public.about.value3Desc') }}
          </p>
        </div>

        <div class="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/60 space-y-3 shadow-sm hover:shadow-md transition-all">
          <div class="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <span class="material-symbols-outlined text-[28px]">sentiment_very_satisfied</span>
          </div>
          <h3 class="font-bold text-base text-on-surface">{{ $t('public.about.value4Title') }}</h3>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            {{ $t('public.about.value4Desc') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Workflow Process -->
    <div class="space-y-8">
      <div class="text-center max-w-2xl mx-auto space-y-2">
        <h2 class="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">{{ $t('public.about.workflowTitle') }}</h2>
        <p class="text-xs md:text-sm text-on-surface-variant">{{ $t('public.about.workflowSubtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/60 space-y-3 relative">
          <div class="text-2xl font-black text-primary">01</div>
          <h3 class="font-bold text-sm text-on-surface">{{ $t('public.about.step1Title') }}</h3>
          <p class="text-xs text-on-surface-variant leading-relaxed">{{ $t('public.about.step1Desc') }}</p>
        </div>
        <div class="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/60 space-y-3 relative">
          <div class="text-2xl font-black text-secondary">02</div>
          <h3 class="font-bold text-sm text-on-surface">{{ $t('public.about.step2Title') }}</h3>
          <p class="text-xs text-on-surface-variant leading-relaxed">{{ $t('public.about.step2Desc') }}</p>
        </div>
        <div class="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/60 space-y-3 relative">
          <div class="text-2xl font-black text-emerald-600">03</div>
          <h3 class="font-bold text-sm text-on-surface">{{ $t('public.about.step3Title') }}</h3>
          <p class="text-xs text-on-surface-variant leading-relaxed">{{ $t('public.about.step3Desc') }}</p>
        </div>
        <div class="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/60 space-y-3 relative">
          <div class="text-2xl font-black text-amber-600">04</div>
          <h3 class="font-bold text-sm text-on-surface">{{ $t('public.about.step4Title') }}</h3>
          <p class="text-xs text-on-surface-variant leading-relaxed">{{ $t('public.about.step4Desc') }}</p>
        </div>
      </div>
    </div>

    <!-- Leadership Team -->
    <div class="space-y-8">
      <div class="text-center max-w-2xl mx-auto space-y-2">
        <h2 class="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">{{ $t('public.about.teamTitle') }}</h2>
        <p class="text-xs md:text-sm text-on-surface-variant">{{ $t('public.about.teamSubtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="member in team" 
          :key="member.name"
          class="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 text-center space-y-4 shadow-sm hover:shadow-md transition-all"
        >
          <div class="w-20 h-20 rounded-full bg-primary/10 text-primary font-black text-xl flex items-center justify-center mx-auto border-2 border-primary/30">
            {{ member.initials }}
          </div>
          <div>
            <h3 class="font-black text-base text-on-surface">{{ member.name }}</h3>
            <p class="text-xs text-primary font-semibold mt-0.5">{{ $t(member.roleKey) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="bg-gradient-to-br from-primary via-primary-container to-secondary rounded-3xl p-8 md:p-12 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
      <div class="max-w-2xl mx-auto space-y-3 relative z-10">
        <h2 class="text-2xl md:text-4xl font-black tracking-tight">
          {{ $t('public.about.ctaTitle') }}
        </h2>
        <p class="text-sm text-white/90 leading-relaxed">
          {{ $t('public.about.ctaSubtitle') }}
        </p>
      </div>

      <div class="pt-2 relative z-10">
        <router-link to="/register" class="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-black text-sm rounded-xl hover:bg-white/90 shadow-lg transition-all hover:scale-105">
          <span>{{ $t('public.about.ctaButton') }}</span>
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const statsRef = ref(null);
const animatedStats = ref({
  foundedYear: 0,
  successfulEvents: 0,
  ticketOrders: 0,
  expertStaff: 0
});

const formattedEvents = computed(() => {
  const lang = locale.value === 'en' ? 'en-US' : 'vi-VN';
  return animatedStats.value.successfulEvents.toLocaleString(lang) + '+';
});

const formattedTickets = computed(() => {
  const lang = locale.value === 'en' ? 'en-US' : 'vi-VN';
  return animatedStats.value.ticketOrders.toLocaleString(lang) + '+';
});

const formattedStaff = computed(() => {
  return animatedStats.value.expertStaff + '+';
});

let hasAnimated = false;

function startCounterAnimation() {
  if (hasAnimated) return;
  hasAnimated = true;

  const duration = 2000; // 2 seconds animation
  const startTime = performance.now();

  const targets = {
    foundedYear: 2020,
    successfulEvents: 5000,
    ticketOrders: 3000000,
    expertStaff: 50
  };

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Cubic ease-out deceleration formula
    const easeOut = 1 - Math.pow(1 - progress, 3);

    animatedStats.value.foundedYear = Math.floor(targets.foundedYear * easeOut);
    animatedStats.value.successfulEvents = Math.floor(targets.successfulEvents * easeOut);
    animatedStats.value.ticketOrders = Math.floor(targets.ticketOrders * easeOut);
    animatedStats.value.expertStaff = Math.floor(targets.expertStaff * easeOut);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      animatedStats.value = { ...targets };
    }
  }

  requestAnimationFrame(update);
}

onMounted(() => {
  if (typeof IntersectionObserver !== 'undefined' && statsRef.value) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startCounterAnimation();
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(statsRef.value);
  } else {
    startCounterAnimation();
  }
});

const team = [
  { name: 'Nguyễn Văn Minh', initials: 'NM', roleKey: 'public.about.teamRoleCEO' },
  { name: 'Trần Thị Thu Hà', initials: 'TH', roleKey: 'public.about.teamRoleCTO' },
  { name: 'Lê Hoàng Hải', initials: 'HH', roleKey: 'public.about.teamRoleCOO' },
  { name: 'Phạm Phương Anh', initials: 'PA', roleKey: 'public.about.teamRoleCMO' }
];
</script>
