<template>
  <div class="flex flex-col items-center justify-center py-14 px-4 text-center select-none space-y-4">
    <!-- Magnifying Glass Icon Wrapper with Glow & Badge -->
    <div class="relative flex items-center justify-center">
      <!-- Ambient Glow backdrop -->
      <div class="absolute w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      
      <!-- Icon Container -->
      <div class="relative w-16 h-16 rounded-2xl bg-surface-container-high border border-outline-variant/60 shadow-sm flex items-center justify-center text-primary transition-transform duration-300 hover:scale-105">
        <span class="material-symbols-outlined text-[36px] leading-none text-primary/80">
          {{ icon || 'search_off' }}
        </span>
        
        <!-- Small filter badge indicator if filtered -->
        <span 
          v-if="isFiltered" 
          class="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm text-[12px]"
          title="Đang bật bộ lọc"
        >
          <span class="material-symbols-outlined text-[14px]">filter_alt</span>
        </span>
      </div>
    </div>

    <!-- Title & Description -->
    <div class="max-w-md space-y-1.5">
      <h4 class="font-extrabold text-base text-on-surface tracking-tight">
        {{ computedTitle }}
      </h4>
      <p class="text-xs text-on-surface-variant leading-relaxed">
        {{ computedDescription }}
      </p>
    </div>

    <!-- Action Button -->
    <div v-if="showActionButton" class="pt-1">
      <button
        type="button"
        @click="$emit('action')"
        class="px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl shadow-sm hover:bg-primary/90 transition-all flex items-center gap-1.5 active:scale-95"
      >
        <span class="material-symbols-outlined text-[16px]">
          {{ isFiltered ? 'filter_alt_off' : 'refresh' }}
        </span>
        <span>{{ computedActionText }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'search' // 'search' | 'search_off' | 'find_in_page'
  },
  isFiltered: {
    type: Boolean,
    default: false
  },
  actionText: {
    type: String,
    default: ''
  },
  showAction: {
    type: Boolean,
    default: true
  }
});

defineEmits(['action']);

const computedTitle = computed(() => {
  if (props.title) return props.title;
  if (props.isFiltered) return 'Không tìm thấy kết quả phù hợp';
  return 'Chưa có dữ liệu nào';
});

const computedDescription = computed(() => {
  if (props.description) return props.description;
  if (props.isFiltered) {
    return 'Không có bản ghi nào khớp với điều kiện lọc hiện tại. Thử xóa hoặc thay đổi bộ lọc cột để xem lại toàn bộ danh sách.';
  }
  return 'Danh sách hiện tại đang trống hoặc hệ thống chưa nhận được dữ liệu từ máy chủ.';
});

const computedActionText = computed(() => {
  if (props.actionText) return props.actionText;
  if (props.isFiltered) return 'Xóa tất cả bộ lọc';
  return 'Tải lại dữ liệu';
});

const showActionButton = computed(() => {
  return props.showAction && (props.isFiltered || !!props.actionText);
});
</script>
