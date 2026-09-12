<template>
  <div class="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-20">
    <!-- Header Hero -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
        <span class="material-symbols-outlined text-[16px]">sell</span>
        <span>{{ $t('public.pricing.pageTag') }}</span>
      </div>
      <h1 class="text-3xl md:text-5xl font-black text-on-surface tracking-tight leading-tight">
        {{ $t('public.pricing.pageTitle') }}
      </h1>
      <p class="text-sm md:text-base text-on-surface-variant leading-relaxed">
        {{ $t('public.pricing.pageSubtitle') }}
      </p>

      <!-- Monthly / Yearly Billing Segmented Tab Buttons -->
      <div class="pt-4 flex items-center justify-center">
        <div class="inline-flex items-center p-1.5 bg-surface-container-high border border-outline-variant/60 rounded-2xl gap-1.5 shadow-inner">
          <button
            type="button"
            @click="billingCycle = 'monthly'"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center gap-2 cursor-pointer focus:outline-none',
              billingCycle === 'monthly'
                ? 'bg-primary text-on-primary shadow-md scale-[1.02]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            ]"
          >
            <span class="material-symbols-outlined text-[16px]">calendar_month</span>
            <span>{{ $t('public.pricing.monthlyBilling') }}</span>
          </button>

          <button
            type="button"
            @click="billingCycle = 'yearly'"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center gap-2 cursor-pointer focus:outline-none',
              billingCycle === 'yearly'
                ? 'bg-primary text-on-primary shadow-md scale-[1.02]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            ]"
          >
            <span class="material-symbols-outlined text-[16px]">stars</span>
            <span>{{ $t('public.pricing.yearlyBilling') }}</span>
            <span 
              :class="[
                'px-2 py-0.5 text-[10px] rounded-full font-black uppercase transition-colors',
                billingCycle === 'yearly'
                  ? 'bg-amber-400 text-amber-950 shadow-sm'
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400'
              ]"
            >
              {{ $t('public.pricing.save20Percent') }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Pricing Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
      <!-- Starter Plan -->
      <div class="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-8 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all">
        <div class="space-y-4">
          <div class="space-y-1">
            <h3 class="font-black text-xl text-on-surface">{{ $t('public.pricing.starterTitle') }}</h3>
            <p class="text-xs text-on-surface-variant">{{ $t('public.pricing.starterDesc') }}</p>
          </div>

          <div class="pt-2">
            <span class="text-4xl font-black text-on-surface">{{ $t('public.pricing.starterPrice') }}</span>
            <span class="text-xs text-on-surface-variant font-medium">{{ $t('public.pricing.starterPeriod') }}</span>
          </div>

          <div class="pt-4 border-t border-outline-variant/40 space-y-3 text-xs text-on-surface">
            <p class="font-bold text-on-surface">{{ $t('public.pricing.includedFeatures') }}</p>
            <ul class="space-y-2.5">
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                <span>{{ $t('public.pricing.starterFeature1') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                <span>{{ $t('public.pricing.starterFeature2') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                <span>{{ $t('public.pricing.starterFeature3') }}</span>
              </li>
              <li class="flex items-center gap-2 text-on-surface-variant line-through">
                <span class="material-symbols-outlined text-[18px] text-outline">cancel</span>
                <span>{{ $t('public.pricing.starterFeature4') }}</span>
              </li>
            </ul>
          </div>
        </div>

        <router-link to="/register" class="w-full text-center py-3 bg-surface-container-low hover:bg-surface-container text-on-surface font-bold text-xs rounded-xl transition-all">
          {{ $t('public.pricing.starterButton') }}
        </router-link>
      </div>

      <!-- Professional Plan (Highlighted) -->
      <div class="bg-surface-container-lowest border-2 border-primary rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-2xl relative">
        <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-[11px] font-black uppercase rounded-full tracking-wider shadow-md">
          {{ $t('public.pricing.proTag') }}
        </div>

        <div class="space-y-4">
          <div class="space-y-1">
            <h3 class="font-black text-xl text-primary">{{ $t('public.pricing.proTitle') }}</h3>
            <p class="text-xs text-on-surface-variant">{{ $t('public.pricing.proDesc') }}</p>
          </div>

          <div class="pt-2">
            <span class="text-4xl font-black text-primary">
              {{ billingCycle === 'yearly' ? $t('public.pricing.proPriceYearly') : $t('public.pricing.proPriceMonthly') }}
            </span>
            <span class="text-xs text-on-surface-variant font-medium">{{ $t('public.pricing.proPeriod') }}</span>
          </div>

          <div class="pt-4 border-t border-outline-variant/40 space-y-3 text-xs text-on-surface">
            <p class="font-bold text-on-surface">{{ $t('public.pricing.includedFeatures') }}</p>
            <ul class="space-y-2.5">
              <li class="flex items-center gap-2 font-semibold">
                <span class="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                <span>{{ $t('public.pricing.proFeature1') }}</span>
              </li>
              <li class="flex items-center gap-2 font-semibold">
                <span class="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                <span>{{ $t('public.pricing.proFeature2') }}</span>
              </li>
              <li class="flex items-center gap-2 font-semibold">
                <span class="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                <span>{{ $t('public.pricing.proFeature3') }}</span>
              </li>
              <li class="flex items-center gap-2 font-semibold">
                <span class="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                <span>{{ $t('public.pricing.proFeature4') }}</span>
              </li>
              <li class="flex items-center gap-2 font-semibold">
                <span class="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                <span>{{ $t('public.pricing.proFeature5') }}</span>
              </li>
            </ul>
          </div>
        </div>

        <router-link to="/register" class="w-full text-center py-3 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-xl shadow-lg transition-all">
          {{ $t('public.pricing.proButton') }}
        </router-link>
      </div>

      <!-- Enterprise Plan -->
      <div class="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-8 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all">
        <div class="space-y-4">
          <div class="space-y-1">
            <h3 class="font-black text-xl text-on-surface">{{ $t('public.pricing.enterpriseTitle') }}</h3>
            <p class="text-xs text-on-surface-variant">{{ $t('public.pricing.enterpriseDesc') }}</p>
          </div>

          <div class="pt-2">
            <span class="text-3xl font-black text-on-surface block">{{ $t('public.pricing.enterprisePrice') }}</span>
            <span class="text-xs text-on-surface-variant font-medium block mt-1">{{ $t('public.pricing.enterprisePeriod') }}</span>
          </div>

          <div class="pt-4 border-t border-outline-variant/40 space-y-3 text-xs text-on-surface">
            <p class="font-bold text-on-surface">{{ $t('public.pricing.includedFeatures') }}</p>
            <ul class="space-y-2.5">
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                <span>{{ $t('public.pricing.enterpriseFeature1') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                <span>{{ $t('public.pricing.enterpriseFeature2') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                <span>{{ $t('public.pricing.enterpriseFeature3') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                <span>{{ $t('public.pricing.enterpriseFeature4') }}</span>
              </li>
            </ul>
          </div>
        </div>

        <router-link to="/about" class="w-full text-center py-3 bg-surface-container-low hover:bg-surface-container text-on-surface font-bold text-xs rounded-xl transition-all">
          {{ $t('public.pricing.enterpriseButton') }}
        </router-link>
      </div>
    </div>

    <!-- Feature Comparison Table -->
    <div class="space-y-8 pt-8">
      <div class="text-center max-w-2xl mx-auto space-y-2">
        <h2 class="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
          {{ $t('public.pricing.compareTitle') }}
        </h2>
        <p class="text-xs md:text-sm text-on-surface-variant">
          {{ $t('public.pricing.compareSubtitle') }}
        </p>
      </div>

      <div class="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-surface-container-low border-b border-outline-variant/60 text-on-surface">
                <th class="p-4 md:p-5 font-black text-sm">{{ $t('public.pricing.colFeature') }}</th>
                <th class="p-4 md:p-5 font-bold text-center w-32 md:w-40">{{ $t('public.pricing.colStarter') }}</th>
                <th class="p-4 md:p-5 font-black text-center w-32 md:w-40 text-primary bg-primary/5">{{ $t('public.pricing.colPro') }}</th>
                <th class="p-4 md:p-5 font-bold text-center w-32 md:w-40">{{ $t('public.pricing.colEnterprise') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/40 text-on-surface">
              <!-- Category 1: Operations -->
              <tr class="bg-surface-container-low/40">
                <td colspan="4" class="px-5 py-2.5 font-bold text-primary uppercase text-[11px] tracking-wider">
                  {{ $t('public.pricing.catOperation') }}
                </td>
              </tr>
              <tr>
                <td class="p-4 font-medium">{{ $t('public.pricing.featMaxEvents') }}</td>
                <td class="p-4 text-center font-semibold text-on-surface-variant">{{ $t('public.pricing.featMaxEventsStarter') }}</td>
                <td class="p-4 text-center font-bold text-primary bg-primary/5">{{ $t('public.pricing.featMaxEventsPro') }}</td>
                <td class="p-4 text-center font-bold text-emerald-600">{{ $t('public.pricing.featMaxEventsEnt') }}</td>
              </tr>
              <tr>
                <td class="p-4 font-medium">{{ $t('public.pricing.featWbsRos') }}</td>
                <td class="p-4 text-center"><span class="material-symbols-outlined text-outline text-[18px]">remove</span></td>
                <td class="p-4 text-center bg-primary/5"><span class="material-symbols-outlined text-primary text-[20px]">check_circle</span></td>
                <td class="p-4 text-center"><span class="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span></td>
              </tr>

              <!-- Category 2: Ticketing -->
              <tr class="bg-surface-container-low/40">
                <td colspan="4" class="px-5 py-2.5 font-bold text-primary uppercase text-[11px] tracking-wider">
                  {{ $t('public.pricing.catTicketing') }}
                </td>
              </tr>
              <tr>
                <td class="p-4 font-medium">{{ $t('public.pricing.featTicketSales') }}</td>
                <td class="p-4 text-center"><span class="material-symbols-outlined text-outline text-[18px]">remove</span></td>
                <td class="p-4 text-center bg-primary/5"><span class="material-symbols-outlined text-primary text-[20px]">check_circle</span></td>
                <td class="p-4 text-center"><span class="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span></td>
              </tr>
              <tr>
                <td class="p-4 font-medium">{{ $t('public.pricing.featQrCheckin') }}</td>
                <td class="p-4 text-center font-medium text-on-surface-variant">Basic</td>
                <td class="p-4 text-center bg-primary/5"><span class="material-symbols-outlined text-primary text-[20px]">check_circle</span></td>
                <td class="p-4 text-center"><span class="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span></td>
              </tr>
              <tr>
                <td class="p-4 font-medium">{{ $t('public.pricing.featCustomDomain') }}</td>
                <td class="p-4 text-center"><span class="material-symbols-outlined text-outline text-[18px]">remove</span></td>
                <td class="p-4 text-center bg-primary/5"><span class="material-symbols-outlined text-outline text-[18px]">remove</span></td>
                <td class="p-4 text-center"><span class="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span></td>
              </tr>

              <!-- Category 3: Support -->
              <tr class="bg-surface-container-low/40">
                <td colspan="4" class="px-5 py-2.5 font-bold text-primary uppercase text-[11px] tracking-wider">
                  {{ $t('public.pricing.catSupport') }}
                </td>
              </tr>
              <tr>
                <td class="p-4 font-medium">{{ $t('public.pricing.featSlaSupport') }}</td>
                <td class="p-4 text-center"><span class="material-symbols-outlined text-outline text-[18px]">remove</span></td>
                <td class="p-4 text-center bg-primary/5"><span class="material-symbols-outlined text-primary text-[20px]">check_circle</span></td>
                <td class="p-4 text-center"><span class="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- FAQ Accordion Section -->
    <div class="space-y-8 pt-4">
      <div class="text-center max-w-2xl mx-auto space-y-2">
        <h2 class="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
          {{ $t('public.pricing.faqTitle') }}
        </h2>
        <p class="text-xs md:text-sm text-on-surface-variant">
          {{ $t('public.pricing.faqSubtitle') }}
        </p>
      </div>

      <div class="max-w-3xl mx-auto space-y-4">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl overflow-hidden shadow-sm transition-all"
        >
          <button 
            @click="activeFaq = activeFaq === index ? null : index"
            class="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-on-surface focus:outline-none"
          >
            <span>{{ $t(faq.qKey) }}</span>
            <span 
              class="material-symbols-outlined text-primary text-[20px] transition-transform duration-200"
              :class="{ 'rotate-180': activeFaq === index }"
            >
              expand_more
            </span>
          </button>

          <div 
            v-if="activeFaq === index" 
            class="px-5 pb-5 text-xs md:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/30 pt-3"
          >
            {{ $t(faq.aKey) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Call To Action -->
    <div class="bg-gradient-to-br from-primary via-primary-container to-secondary rounded-3xl p-8 md:p-12 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
      <div class="max-w-2xl mx-auto space-y-3 relative z-10">
        <h2 class="text-2xl md:text-4xl font-black tracking-tight">
          {{ $t('public.pricing.ctaTitle') }}
        </h2>
        <p class="text-sm text-white/90 leading-relaxed">
          {{ $t('public.pricing.ctaSubtitle') }}
        </p>
      </div>

      <div class="pt-2 relative z-10">
        <router-link to="/register" class="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-black text-sm rounded-xl hover:bg-white/90 shadow-lg transition-all hover:scale-105">
          <span>{{ $t('public.pricing.ctaButton') }}</span>
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const billingCycle = ref('monthly');
const activeFaq = ref(0);

const faqs = [
  { qKey: 'public.pricing.faq1Q', aKey: 'public.pricing.faq1A' },
  { qKey: 'public.pricing.faq2Q', aKey: 'public.pricing.faq2A' },
  { qKey: 'public.pricing.faq3Q', aKey: 'public.pricing.faq3A' },
  { qKey: 'public.pricing.faq4Q', aKey: 'public.pricing.faq4A' }
];
</script>
