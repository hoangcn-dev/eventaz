<template>
  <div class="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
    <!-- Page Header & Filter Bar -->
    <div class="space-y-4">
      <div>
        <h1 class="text-2xl md:text-3xl font-black text-on-surface">{{ $t('public.events.pageTitle') }}</h1>
        <p class="text-xs md:text-sm text-on-surface-variant">{{ $t('public.events.pageSubtitle') }}</p>
      </div>

      <!-- Controls & Filter Toolbar -->
      <div class="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/60 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <!-- Search Input -->
        <div class="relative w-full md:w-80">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
          <input 
            type="text" 
            v-model="searchQuery" 
            :placeholder="$t('public.events.searchPlaceholder')" 
            class="w-full pl-9 pr-3 py-2 text-xs bg-surface-container-low border border-outline-variant rounded-xl focus:outline-none focus:border-primary text-on-surface"
          />
        </div>

        <!-- Filter Dropdowns using BaseDropdown component -->
        <div class="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <!-- Category Filter -->
          <BaseDropdown 
            :label="getSelectedLabel(categoryOptions, selectedCategory)"
            :items="categoryOptions"
            placement="bottom-start"
            bgColor="white"
            @select="(item) => selectedCategory = item.id"
          />

          <!-- Location Filter -->
          <BaseDropdown 
            :label="getSelectedLabel(locationOptions, selectedLocation)"
            :items="locationOptions"
            placement="bottom-start"
            bgColor="white"
            @select="(item) => selectedLocation = item.id"
          />

          <!-- Price Filter -->
          <BaseDropdown 
            :label="getSelectedLabel(priceOptions, selectedPrice)"
            :items="priceOptions"
            placement="bottom-start"
            bgColor="white"
            @select="(item) => selectedPrice = item.id"
          />
        </div>
      </div>
    </div>

    <!-- Active Filters Badge Bar -->
    <div v-if="hasActiveFilters" class="flex items-center gap-2 text-xs font-semibold">
      <span class="text-on-surface-variant">{{ $t('public.events.filtering') }}</span>
      <span v-if="selectedCategory !== 'all'" class="px-2.5 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-1">
        {{ getSelectedLabel(categoryOptions, selectedCategory) }}
        <button @click="selectedCategory = 'all'" class="hover:text-red-500 font-bold ml-0.5">×</button>
      </span>
      <span v-if="selectedLocation !== 'all'" class="px-2.5 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-1">
        {{ getSelectedLabel(locationOptions, selectedLocation) }}
        <button @click="selectedLocation = 'all'" class="hover:text-red-500 font-bold ml-0.5">×</button>
      </span>
      <span v-if="selectedPrice !== 'all'" class="px-2.5 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-1">
        {{ getSelectedLabel(priceOptions, selectedPrice) }}
        <button @click="selectedPrice = 'all'" class="hover:text-red-500 font-bold ml-0.5">×</button>
      </span>
      <button @click="resetFilters" class="text-xs text-red-600 hover:underline ml-2 font-bold">{{ $t('public.events.clearFilters') }}</button>
    </div>

    <!-- Events Grid List -->
    <div v-if="filteredEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="event in filteredEvents" 
        :key="event.id"
        class="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col group"
      >
        <div class="h-44 bg-gradient-to-br from-primary/80 to-secondary/80 relative p-4 flex flex-col justify-between text-white">
          <div class="flex justify-between items-start">
            <span class="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-extrabold uppercase">
              {{ event.categoryLabel }}
            </span>
            <span class="px-2 py-0.5 bg-emerald-500 text-white rounded text-[10px] font-bold">{{ $t('public.events.sellingTickets') }}</span>
          </div>
          <div>
            <p class="text-xs font-semibold flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">calendar_today</span>
              {{ event.date }}
            </p>
          </div>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <h3 class="font-bold text-base text-on-surface group-hover:text-primary transition-colors leading-snug">
              {{ event.title }}
            </h3>
            <p class="text-xs text-on-surface-variant flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-primary shrink-0">location_on</span>
              <span class="truncate">{{ event.location }}</span>
            </p>
          </div>

          <div class="pt-3 border-t border-outline-variant/40 flex items-center justify-between">
            <div>
              <span class="text-[10px] text-on-surface-variant block uppercase">{{ $t('public.home.priceFrom') }}</span>
              <span class="font-black text-sm text-primary">{{ event.priceLabel }}</span>
            </div>
            <button 
              @click="openTicketModal(event)"
              class="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded-lg hover:bg-primary-container shadow-sm active:scale-95 transition-all"
            >
              {{ $t('public.events.bookTicketBtn') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State if No Match -->
    <div v-else class="text-center py-16 space-y-4 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant">
      <span class="material-symbols-outlined text-[48px] text-on-surface-variant">event_busy</span>
      <h3 class="font-bold text-base text-on-surface">{{ $t('public.events.noEventsTitle') }}</h3>
      <p class="text-xs text-on-surface-variant max-w-sm mx-auto">{{ $t('public.events.noEventsDesc') }}</p>
      <button @click="resetFilters" class="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-sm">{{ $t('public.events.clearFilters') }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import BaseDropdown from '../components/base/BaseDropdown.vue';

const { t } = useI18n();
const route = useRoute();

const searchQuery = ref('');
const selectedCategory = ref('all');
const selectedLocation = ref('all');
const selectedPrice = ref('all');

const categoryOptions = computed(() => [
  { id: 'all', label: t('public.events.allCategories') },
  { id: 'music', label: t('public.events.catMusic') },
  { id: 'tech', label: t('public.events.catTech') },
  { id: 'workshop', label: t('public.events.catWorkshop') },
  { id: 'sports', label: t('public.events.catSports') },
  { id: 'exhibition', label: t('public.events.catExhibition') }
]);

const locationOptions = computed(() => [
  { id: 'all', label: t('public.events.allLocations') },
  { id: 'hanoi', label: t('public.events.locHanoi') },
  { id: 'hcm', label: t('public.events.locHcm') },
  { id: 'danang', label: t('public.events.locDanang') }
]);

const priceOptions = computed(() => [
  { id: 'all', label: t('public.events.allPrices') },
  { id: 'free', label: t('public.events.priceFree') },
  { id: 'under500', label: t('public.events.priceUnder500') },
  { id: 'above500', label: t('public.events.priceAbove500') }
]);

const eventsList = ref([
  {
    id: 1,
    title: 'Tech Vision Summit 2024 - Kỷ Nguyên AI & Web3',
    category: 'tech',
    categoryLabel: 'Công Nghệ',
    location: 'Trung tâm Hội nghị Quốc gia, Hà Nội',
    city: 'hanoi',
    date: '15/10/2024 - 08:30',
    price: 490000,
    priceLabel: '490.000 VNĐ'
  },
  {
    id: 2,
    title: 'Đêm Nhạc Việt Pop Acoustic Night',
    category: 'music',
    categoryLabel: 'Đêm Nhạc',
    location: 'Nhà hát Hòa Bình, TP. Hồ Chí Minh',
    city: 'hcm',
    date: '18/10/2024 - 19:30',
    price: 350000,
    priceLabel: '350.000 VNĐ'
  },
  {
    id: 3,
    title: 'Workshop Sáng Tạo Nội Dung & Video Ngắn',
    category: 'workshop',
    categoryLabel: 'Workshop',
    location: 'Co-working Hub Đà Nẵng',
    city: 'danang',
    date: '22/10/2024 - 14:00',
    price: 0,
    priceLabel: 'Miễn phí'
  },
  {
    id: 4,
    title: 'Giải Chạy Marathon Quốc Tế Hà Nội 2024',
    category: 'sports',
    categoryLabel: 'Thể Thao',
    location: 'Công viên Thống Nhất, Hà Nội',
    city: 'hanoi',
    date: '05/11/2024 - 05:00',
    price: 250000,
    priceLabel: '250.000 VNĐ'
  },
  {
    id: 5,
    title: 'Triển Lãm Công Nghệ Âm Thanh & Ánh Sáng Pro',
    category: 'exhibition',
    categoryLabel: 'Triển Lãm',
    location: 'SECC Q.7, TP. Hồ Chí Minh',
    city: 'hcm',
    date: '12/11/2024 - 09:00',
    price: 0,
    priceLabel: 'Miễn phí'
  }
]);

const hasActiveFilters = computed(() => {
  return selectedCategory.value !== 'all' || selectedLocation.value !== 'all' || selectedPrice.value !== 'all' || searchQuery.value.trim() !== '';
});

const filteredEvents = computed(() => {
  return eventsList.value.filter(e => {
    const matchCat = selectedCategory.value === 'all' || e.category === selectedCategory.value;
    const matchLoc = selectedLocation.value === 'all' || e.city === selectedLocation.value;
    const matchPrice = selectedPrice.value === 'all' || 
      (selectedPrice.value === 'free' && e.price === 0) ||
      (selectedPrice.value === 'under500' && e.price > 0 && e.price < 500000) ||
      (selectedPrice.value === 'above500' && e.price >= 500000);
    const matchQuery = !searchQuery.value || e.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || e.location.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchCat && matchLoc && matchPrice && matchQuery;
  });
});

function getSelectedLabel(options, selectedId) {
  const found = options.find(o => o.id === selectedId);
  return found ? found.label : '';
}

function resetFilters() {
  searchQuery.value = '';
  selectedCategory.value = 'all';
  selectedLocation.value = 'all';
  selectedPrice.value = 'all';
}

function openTicketModal(event) {
  alert(`Đang mở luồng đăng ký vé cho sự kiện: "${event.title}"`);
}

onMounted(() => {
  if (route.query.cat) {
    selectedCategory.value = route.query.cat;
  }
  if (route.query.q) {
    searchQuery.value = route.query.q;
  }
});
</script>
