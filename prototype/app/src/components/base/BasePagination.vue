<template>
  <div class="flex flex-wrap items-center justify-between gap-3 pt-3 pb-1 border-t border-outline-variant/50 text-xs font-sans select-none text-on-surface">
    <!-- LEFT BLOCK: Total Items -->
    <div class="flex items-center gap-1 text-on-surface-variant font-medium">
      <span>Tổng số:</span>
      <b class="text-on-surface font-extrabold">{{ totalItems }}</b>
      <span>bản ghi</span>
    </div>

    <!-- RIGHT BLOCK: Page Size Dropdown + Page Counter + 4 Nav Buttons -->
    <div class="flex flex-wrap items-center gap-3">
      <!-- 1. Page Size Select Dropdown (With Border) -->
      <div class="flex items-center gap-1.5">
        <div class="w-28">
          <BaseComboBox
            v-model="internalPageSize"
            :options="formattedPageSizeOptions"
            placeholder="20 / trang"
          />
        </div>
      </div>

      <!-- 2. Current Page - Total Pages Block -->
      <div class="font-medium text-xs text-on-surface whitespace-nowrap px-1">
        <template v-if="totalPages <= 1">
          <span class="font-extrabold text-on-surface">1</span>
        </template>
        <template v-else>
          <span>Trang </span>
          <b class="font-extrabold text-on-surface">{{ currentPage }}</b>
          <span class="text-on-surface font-semibold"> / {{ totalPages }}</span>
        </template>
      </div>

      <!-- 3. Four Navigation Buttons -->
      <div class="flex items-center gap-0.5">
        <!-- First Page -->
        <button
          type="button"
          @click="goToPage(1)"
          :disabled="isFirstDisabled"
          :class="navButtonClass(isFirstDisabled)"
          title="Trang đầu"
        >
          <span class="material-symbols-outlined text-[20px]">first_page</span>
        </button>

        <!-- Previous Page -->
        <button
          type="button"
          @click="goToPage(currentPage - 1)"
          :disabled="isFirstDisabled"
          :class="navButtonClass(isFirstDisabled)"
          title="Trang trước"
        >
          <span class="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>

        <!-- Next Page -->
        <button
          type="button"
          @click="goToPage(currentPage + 1)"
          :disabled="isLastDisabled"
          :class="navButtonClass(isLastDisabled)"
          title="Trang sau"
        >
          <span class="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>

        <!-- Last Page -->
        <button
          type="button"
          @click="goToPage(totalPages)"
          :disabled="isLastDisabled"
          :class="navButtonClass(isLastDisabled)"
          title="Trang cuối"
        >
          <span class="material-symbols-outlined text-[20px]">last_page</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue';
import BaseComboBox from './BaseComboBox.vue';

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 20
  },
  pageSizeOptions: {
    type: Array,
    default: () => [10, 20, 50, 100]
  }
});

const emit = defineEmits(['update:currentPage', 'update:pageSize', 'change']);

const internalPageSize = ref(props.pageSize);

watch(() => props.pageSize, (val) => {
  internalPageSize.value = val;
});

watch(internalPageSize, (val) => {
  const num = Number(val);
  emit('update:pageSize', num);
  emit('update:currentPage', 1);
  emit('change', { currentPage: 1, pageSize: num });
});

const formattedPageSizeOptions = computed(() => {
  return props.pageSizeOptions.map(size => ({
    label: `${size} / trang`,
    value: size
  }));
});

const totalPages = computed(() => {
  if (!props.totalItems || props.totalItems <= 0) return 1;
  return Math.ceil(props.totalItems / props.pageSize);
});

const isFirstDisabled = computed(() => {
  return props.currentPage <= 1 || totalPages.value <= 1;
});

const isLastDisabled = computed(() => {
  return props.currentPage >= totalPages.value || totalPages.value <= 1;
});

function goToPage(page) {
  if (page < 1 || page > totalPages.value || page === props.currentPage) return;
  emit('update:currentPage', page);
  emit('change', { currentPage: page, pageSize: props.pageSize });
}

function navButtonClass(disabled) {
  return [
    'p-1 rounded-lg border-0 bg-transparent flex items-center justify-center transition-colors',
    disabled 
      ? 'text-on-surface-variant/35 cursor-not-allowed' 
      : 'text-on-surface hover:bg-surface-container/60 hover:text-primary active:scale-95 cursor-pointer font-bold'
  ];
}
</script>
