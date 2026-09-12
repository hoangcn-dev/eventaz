<template>
  <div class="space-y-16 pb-12">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary/10 via-surface-container-low to-secondary/10 py-16 md:py-24 overflow-hidden border-b border-outline-variant/40">
      <div class="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Hero Text & Search -->
        <div class="space-y-6 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
            <span class="material-symbols-outlined text-[16px]">stars</span>
            <span>{{ $t('public.home.heroTag') }}</span>
          </div>

          <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-on-surface tracking-tight leading-[1.3] md:leading-[1.25]">
            {{ $t('public.home.heroTitle') }} 
            <span class="text-primary block mt-1 sm:mt-2">{{ $t('public.home.heroTitleHighlight') }}</span>
          </h1>

          <p class="text-sm md:text-base text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {{ $t('public.home.heroDesc') }}
          </p>

          <!-- Interactive Search Bar -->
          <div class="bg-surface-container-lowest p-2.5 rounded-2xl shadow-xl border border-outline-variant/60 max-w-xl mx-auto lg:mx-0 flex flex-col sm:flex-row gap-2">
            <div class="relative flex-1 flex items-center">
              <span class="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]">search</span>
              <input 
                type="text" 
                v-model="searchQuery" 
                :placeholder="$t('public.home.searchPlaceholder')" 
                class="w-full pl-10 pr-3 py-2.5 text-xs md:text-sm bg-transparent text-on-surface border-none focus:outline-none focus:ring-0 shadow-none"
              />
            </div>
            <button 
              @click="handleSearch"
              class="px-6 py-3 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs md:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span class="material-symbols-outlined text-[18px]">search</span>
              <span>{{ $t('public.home.searchButton') }}</span>
            </button>
          </div>

          <!-- Quick Stats -->
          <div class="pt-4 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            <div>
              <p class="text-2xl font-black text-primary">500+</p>
              <p class="text-xs text-on-surface-variant font-medium">{{ $t('public.home.statsEvents') }}</p>
            </div>
            <div>
              <p class="text-2xl font-black text-secondary">2.5M+</p>
              <p class="text-xs text-on-surface-variant font-medium">{{ $t('public.home.statsTickets') }}</p>
            </div>
            <div>
              <p class="text-2xl font-black text-emerald-600">99.9%</p>
              <p class="text-xs text-on-surface-variant font-medium">{{ $t('public.home.statsSatisfaction') }}</p>
            </div>
          </div>
        </div>

        <!-- Hero Card Banner / Visual -->
        <div class="relative">
          <div class="bg-gradient-to-tr from-primary to-secondary p-1 rounded-3xl shadow-2xl">
            <div class="bg-surface-container-lowest p-6 rounded-[22px] space-y-6">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                  {{ $t('public.home.upcomingBadge') }}
                </span>
                <span class="text-xs font-semibold text-on-surface-variant">{{ $t('public.home.heroDate') }}</span>
              </div>

              <div class="space-y-2">
                <h3 class="text-2xl font-extrabold text-on-surface">Tech Vision Summit & Music Fest 2024</h3>
                <p class="text-xs text-on-surface-variant flex items-center gap-1">
                  <span class="material-symbols-outlined text-[16px] text-primary">location_on</span>
                  {{ $t('public.home.heroLocation') }}
                </p>
              </div>

              <div class="p-4 bg-surface-container-low rounded-xl space-y-3">
                <div class="flex justify-between text-xs">
                  <span class="font-bold text-on-surface">{{ $t('public.home.speakersTitle') }}</span>
                  <span class="text-primary font-bold">{{ $t('public.home.speakersCount') }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">JS</div>
                  <div class="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">AN</div>
                  <div class="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">TH</div>
                  <span class="text-xs font-semibold text-on-surface-variant">{{ $t('public.home.attendeesCount') }}</span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-2">
                <div>
                  <span class="text-[10px] text-on-surface-variant block">{{ $t('public.home.priceFrom') }}</span>
                  <span class="text-xl font-extrabold text-primary">490.000 VNĐ</span>
                </div>
                <router-link to="/events" class="px-5 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container shadow-md transition-all">
                  {{ $t('public.home.buyTicketsNow') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Categories -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl md:text-3xl font-extrabold text-on-surface">{{ $t('public.home.categoriesTitle') }}</h2>
          <p class="text-xs md:text-sm text-on-surface-variant">{{ $t('public.home.categoriesDesc') }}</p>
        </div>
        <router-link to="/events" class="text-xs md:text-sm font-bold text-primary hover:underline flex items-center gap-1">
          <span>{{ $t('public.home.viewAll') }}</span>
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </router-link>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div 
          v-for="cat in categories" 
          :key="cat.code"
          @click="selectCategory(cat.code)"
          class="p-4 bg-surface-container-lowest border border-outline-variant/60 rounded-2xl hover:border-primary hover:shadow-lg cursor-pointer transition-all space-y-3 group"
        >
          <div :class="['w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform', cat.bgColor]">
            <span class="material-symbols-outlined text-[24px]">{{ cat.icon }}</span>
          </div>
          <div>
            <h3 class="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{{ $t(cat.i18nKey) }}</h3>
            <p class="text-[11px] text-on-surface-variant">{{ cat.count }} {{ $t('public.home.eventsCountSuffix') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Events Grid -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl md:text-3xl font-extrabold text-on-surface">{{ $t('public.home.featuredTitle') }}</h2>
          <p class="text-xs md:text-sm text-on-surface-variant">{{ $t('public.home.featuredDesc') }}</p>
        </div>
        <router-link to="/events" class="text-xs md:text-sm font-bold text-primary hover:underline flex items-center gap-1">
          <span>{{ $t('public.home.allEvents') }}</span>
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="event in featuredEvents" 
          :key="event.id"
          class="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col group"
        >
          <div class="h-48 bg-gradient-to-r from-slate-700 to-slate-900 relative p-4 flex flex-col justify-between text-white">
            <div class="flex justify-between items-start">
              <span class="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[11px] font-bold uppercase tracking-wider">
                {{ $t(event.categoryKey) }}
              </span>
              <button class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors">
                <span class="material-symbols-outlined text-[18px]">favorite</span>
              </button>
            </div>
            <div>
              <p class="text-xs font-semibold text-white/80 flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">calendar_today</span>
                {{ event.date }}
              </p>
            </div>
          </div>

          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <h3 class="font-bold text-base text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                {{ event.title }}
              </h3>
              <p class="text-xs text-on-surface-variant flex items-center gap-1 truncate">
                <span class="material-symbols-outlined text-[16px] text-primary">location_on</span>
                {{ event.location }}
              </p>
            </div>

            <div class="pt-3 border-t border-outline-variant/40 flex items-center justify-between">
              <div>
                <span class="text-[10px] text-on-surface-variant uppercase block">{{ $t('public.home.priceFrom') }}</span>
                <span class="font-extrabold text-sm text-primary">{{ event.priceIsFree ? $t('public.home.free') : event.price }}</span>
              </div>
              <router-link 
                to="/events" 
                class="px-4 py-2 bg-primary/10 text-primary font-bold text-xs rounded-lg hover:bg-primary hover:text-white transition-all"
              >
                {{ $t('public.home.bookTicket') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose EventAZ -->
    <section class="bg-surface-container-low py-16 border-y border-outline-variant/40">
      <div class="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-3">
          <h2 class="text-2xl md:text-3xl font-extrabold text-on-surface">{{ $t('public.home.whyTitle') }}</h2>
          <p class="text-xs md:text-sm text-on-surface-variant">{{ $t('public.home.whyDesc') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/60 space-y-3">
            <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-[28px]">qr_code_2</span>
            </div>
            <h3 class="font-bold text-base text-on-surface">{{ $t('public.home.whyQrTitle') }}</h3>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              {{ $t('public.home.whyQrDesc') }}
            </p>
          </div>

          <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/60 space-y-3">
            <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <span class="material-symbols-outlined text-[28px]">verified_user</span>
            </div>
            <h3 class="font-bold text-base text-on-surface">{{ $t('public.home.whyPaymentTitle') }}</h3>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              {{ $t('public.home.whyPaymentDesc') }}
            </p>
          </div>

          <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-gradient space-y-3">
            <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <span class="material-symbols-outlined text-[28px]">support_agent</span>
            </div>
            <h3 class="font-bold text-base text-on-surface">{{ $t('public.home.whySupportTitle') }}</h3>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              {{ $t('public.home.whySupportDesc') }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const categories = [
  { code: 'music', i18nKey: 'public.events.catMusic', icon: 'music_note', count: 128, bgColor: 'bg-indigo-600' },
  { code: 'tech', i18nKey: 'public.events.catTech', icon: 'devices', count: 85, bgColor: 'bg-blue-600' },
  { code: 'workshop', i18nKey: 'public.events.catWorkshop', icon: 'school', count: 64, bgColor: 'bg-emerald-600' },
  { code: 'sports', i18nKey: 'public.events.catSports', icon: 'directions_run', count: 42, bgColor: 'bg-amber-600' },
  { code: 'exhibition', i18nKey: 'public.events.catExhibition', icon: 'gallery_thumbnail', count: 39, bgColor: 'bg-purple-600' }
];

const featuredEvents = [
  {
    id: 1,
    title: 'Đêm Nhạc Concert Vietnam Sound Wave 2024',
    categoryKey: 'public.events.catMusic',
    location: 'Sân vận động Mỹ Đình, Hà Nội',
    date: '20/10/2024 - 19:00',
    price: '350.000 VNĐ',
    priceIsFree: false
  },
  {
    id: 2,
    title: 'Hội Thảo AI & Cloud Computing Summit',
    categoryKey: 'public.events.catTech',
    location: 'Trung tâm Landmark 81, TP.HCM',
    date: '25/10/2024 - 08:30',
    price: 'Miễn phí',
    priceIsFree: true
  },
  {
    id: 3,
    title: 'Giải Chạy Marathon Quốc Tế Hà Nội 2024',
    categoryKey: 'public.events.catSports',
    location: 'Hồ Hoàn Kiếm, Hà Nội',
    date: '02/11/2024 - 05:00',
    price: '250.000 VNĐ',
    priceIsFree: false
  }
];

function handleSearch() {
  if (searchQuery.value) {
    router.push({ path: '/events', query: { q: searchQuery.value } });
  } else {
    router.push('/events');
  }
}

function selectCategory(code) {
  router.push({ path: '/events', query: { cat: code } });
}
</script>
