<template>
  <th 
    ref="thRef"
    :class="[
      'py-2.5 px-3 relative select-none font-bold text-on-surface-variant transition-colors group',
      alignClass,
      isOpen ? 'bg-surface-container-high' : 'bg-surface-container-low hover:bg-surface-container'
    ]"
  >
    <div class="flex items-center justify-between gap-1.5 w-full">
      <!-- Title text -->
      <span class="truncate font-bold" :title="title">{{ title }}</span>

      <!-- Filter Toggle Icon (Visible on hover, when filter is active, or when popup is open) -->
      <button
        v-if="filterable"
        type="button"
        @click.stop="togglePopup"
        :class="[
          'p-1 rounded-md transition-all flex items-center justify-center relative focus:outline-none',
          isActive 
            ? 'bg-primary text-white shadow-sm ring-2 ring-primary/30 opacity-100' 
            : (isOpen 
              ? 'bg-primary/20 text-primary opacity-100' 
              : 'text-on-surface-variant/60 hover:text-primary hover:bg-surface-container-highest opacity-0 group-hover:opacity-100'
            )
        ]"
        :title="isActive ? 'Đang bật bộ lọc (Bấm để thay đổi)' : 'Lọc cột này'"
      >
        <span class="material-symbols-outlined text-[16px] leading-none">filter_alt</span>
        
        <!-- Active Dot Badge -->
        <span 
          v-if="isActive" 
          class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 border border-white rounded-full animate-pulse"
        ></span>
      </button>
    </div>

    <!-- TELEPORTED FILTER POPUP (Prevents overflow clipping by table or container) -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="transform opacity-0 scale-95 -translate-y-1"
        enter-to-class="transform opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="transform opacity-100 scale-100 translate-y-0"
        leave-to-class="transform opacity-0 scale-95 -translate-y-1"
      >
        <div
          v-if="isOpen"
          ref="popupRef"
          :style="popupStyle"
          @click.stop
          class="w-72 bg-white rounded-xl shadow-2xl border border-outline-variant/80 p-3.5 space-y-3 font-sans text-xs normal-case text-on-surface text-left"
        >
          <!-- Popup Header -->
          <div class="flex justify-between items-center pb-2 border-b border-outline-variant/50">
            <div class="flex items-center gap-1.5 font-extrabold text-on-surface text-[12px]">
              <span class="material-symbols-outlined text-primary text-[18px]">filter_list</span>
              <span>Lọc {{ title }}</span>
            </div>
            <button 
              type="button"
              @click="handleCancel"
              class="p-0.5 text-on-surface-variant/70 hover:text-on-surface hover:bg-surface-container rounded-full transition-colors"
            >
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>

          <!-- Popup Body -->
          <div class="space-y-2.5">
            <!-- CASE 1: BOOLEAN / SELECT TYPE (1 input option only, no operator) -->
            <template v-if="isOptionType">
              <div class="space-y-1">
                <label class="text-[10px] font-bold uppercase text-on-surface-variant/80 tracking-wider">
                  Chọn giá trị
                </label>
                <select
                  v-model="tempValue"
                  class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 py-1.5 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium"
                >
                  <option value="">-- Tất cả giá trị --</option>
                  <option 
                    v-for="opt in formattedOptions" 
                    :key="opt.value" 
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </option>
                </select>
              </div>
            </template>

            <!-- CASE 2: TEXT, NUMBER, DATE TYPES (2 inputs: Operator + Value) -->
            <template v-else>
              <!-- 1. Operator Selection Dropdown -->
              <div class="space-y-1">
                <label class="text-[10px] font-bold uppercase text-on-surface-variant/80 tracking-wider">
                  Toán tử điều kiện
                </label>
                <select
                  v-model="tempOperator"
                  class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 py-1.5 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium"
                >
                  <option v-for="op in currentOperators" :key="op.value" :value="op.value">
                    {{ op.label }}
                  </option>
                </select>
              </div>

              <!-- 2. Value Input -->
              <div class="space-y-1">
                <label class="text-[10px] font-bold uppercase text-on-surface-variant/80 tracking-wider">
                  Giá trị lọc
                </label>
                <input
                  v-if="type === 'date'"
                  type="date"
                  v-model="tempValue"
                  class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 py-1.5 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  @keyup.enter="handleApplyFilter"
                />
                <input
                  v-else-if="type === 'number'"
                  type="number"
                  v-model="tempValue"
                  placeholder="Nhập số..."
                  class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 py-1.5 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  @keyup.enter="handleApplyFilter"
                />
                <input
                  v-else
                  type="text"
                  v-model="tempValue"
                  placeholder="Nhập từ khóa cần tìm..."
                  class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 py-1.5 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  @keyup.enter="handleApplyFilter"
                />
              </div>
            </template>
          </div>

          <!-- Popup Footer Action Buttons: [Bỏ lọc] (trái) - [Hủy] [Áp dụng] (phải) -->
          <div class="flex items-center justify-between pt-2.5 border-t border-outline-variant/50 gap-1.5">
            <!-- Left: Bỏ lọc button -->
            <button
              type="button"
              @click="handleClearFilter"
              class="px-2.5 py-1.5 text-on-surface-variant hover:text-error hover:bg-error/10 font-bold text-[11px] rounded-lg transition-colors border border-outline-variant/60 flex items-center gap-1"
              title="Xóa bộ lọc cột này"
            >
              <span class="material-symbols-outlined text-[14px]">filter_alt_off</span>
              <span>Bỏ lọc</span>
            </button>

            <div class="flex items-center gap-1.5">
              <!-- Right 1: Hủy (Close popup without applying unapplied changes) -->
              <button
                type="button"
                @click="handleCancel"
                class="px-2.5 py-1.5 bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest font-bold text-[11px] rounded-lg border border-outline-variant transition-all flex items-center gap-1"
                title="Hủy bỏ và đóng popup"
              >
                <span class="material-symbols-outlined text-[14px]">close</span>
                <span>Hủy</span>
              </button>

              <!-- Right 2: Áp dụng (Apply filter & close popup) -->
              <button
                type="button"
                @click="handleApplyFilter"
                class="px-3 py-1.5 bg-primary text-white font-bold text-[11px] rounded-lg shadow-sm hover:bg-primary/90 transition-all flex items-center gap-1"
                title="Áp dụng điều kiện lọc"
              >
                <span class="material-symbols-outlined text-[14px]">check</span>
                <span>Áp dụng</span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </th>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text' // 'text' | 'number' | 'date' | 'boolean' | 'select'
  },
  filterable: {
    type: Boolean,
    default: true
  },
  options: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: Object,
    default: () => ({ operator: 'contains', value: '' })
  },
  align: {
    type: String,
    default: 'left' // 'left' | 'center' | 'right'
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const thRef = ref(null);
const popupRef = ref(null);
const isOpen = ref(false);
const popupStyle = ref({});

// Local state for popup inputs
const tempOperator = ref('contains');
const tempValue = ref('');

// Operator definitions per type
const textOperators = [
  { value: 'contains', label: 'Chứa (contains)' },
  { value: 'not_contains', label: 'Không chứa (does not contain)' },
  { value: 'equals', label: 'Bằng chính xác (=)' },
  { value: 'starts_with', label: 'Bắt đầu bằng' },
  { value: 'ends_with', label: 'Kết thúc bằng' }
];

const numberOperators = [
  { value: 'equals', label: 'Bằng (=)' },
  { value: 'not_equals', label: 'Khác (!=)' },
  { value: 'greater_than', label: 'Lớn hơn (>)' },
  { value: 'greater_than_or_equal', label: 'Lớn hơn hoặc bằng (>=)' },
  { value: 'less_than', label: 'Nhỏ hơn (<)' },
  { value: 'less_than_or_equal', label: 'Nhỏ hơn hoặc bằng (<=)' }
];

const dateOperators = [
  { value: 'equals', label: 'Đúng ngày (=)' },
  { value: 'before', label: 'Trước ngày (<)' },
  { value: 'after', label: 'Sau ngày (>)' }
];

const isOptionType = computed(() => props.type === 'boolean' || props.type === 'select');

const currentOperators = computed(() => {
  if (props.type === 'number') return numberOperators;
  if (props.type === 'date') return dateOperators;
  return textOperators;
});

const formattedOptions = computed(() => {
  return props.options.map(opt => {
    if (typeof opt === 'object' && opt !== null) {
      return { label: opt.label ?? opt.value, value: opt.value };
    }
    return { label: String(opt), value: opt };
  });
});

const alignClass = computed(() => {
  if (props.align === 'center') return 'text-center';
  if (props.align === 'right') return 'text-right';
  return 'text-left';
});

const isActive = computed(() => {
  if (!props.filterable) return false;
  if (!props.modelValue) return false;
  const val = props.modelValue.value;
  return val !== undefined && val !== null && String(val).trim() !== '';
});

// Calculate position for Teleport popup
function updatePopupPosition() {
  if (!thRef.value) return;
  const rect = thRef.value.getBoundingClientRect();
  
  const popupWidth = 288; // 72 = 18rem = 288px
  let left = rect.left;
  
  // Align right edge if popup would overflow right side of screen
  if (left + popupWidth > window.innerWidth - 16) {
    left = Math.max(16, window.innerWidth - popupWidth - 16);
  }

  let top = rect.bottom + 4;
  
  // Flip popup above if too close to screen bottom
  if (top + 260 > window.innerHeight && rect.top - 260 > 0) {
    top = rect.top - 260;
  }

  popupStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: 9999
  };
}

// Initialize / Sync temp state from props
function syncFromProps() {
  if (props.modelValue) {
    tempOperator.value = props.modelValue.operator || (props.type === 'number' ? 'equals' : 'contains');
    tempValue.value = props.modelValue.value ?? '';
  } else {
    tempOperator.value = props.type === 'number' ? 'equals' : 'contains';
    tempValue.value = '';
  }
}

watch(() => props.modelValue, syncFromProps, { deep: true, immediate: true });

async function togglePopup() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    syncFromProps();
    await nextTick();
    updatePopupPosition();
  }
}

function emitFilterState() {
  const payload = {
    operator: isOptionType.value ? 'equals' : tempOperator.value,
    value: tempValue.value
  };
  emit('update:modelValue', payload);
  emit('change', payload);
}

// Button action 1: Bỏ lọc (Clear filter value & close)
function handleClearFilter() {
  tempValue.value = '';
  if (isOptionType.value) {
    tempOperator.value = 'equals';
  } else {
    tempOperator.value = props.type === 'number' ? 'equals' : 'contains';
  }
  emitFilterState();
  isOpen.value = false;
}

// Button action 2: Hủy (Cancel unapplied changes & close popup)
function handleCancel() {
  syncFromProps();
  isOpen.value = false;
}

// Button action 3: Áp dụng (Apply filter & close popup)
function handleApplyFilter() {
  emitFilterState();
  isOpen.value = false;
}

// Handle click outside to close popup
function handleClickOutside(event) {
  if (!isOpen.value) return;
  const isInsideTh = thRef.value && thRef.value.contains(event.target);
  const isInsidePopup = popupRef.value && popupRef.value.contains(event.target);
  if (!isInsideTh && !isInsidePopup) {
    isOpen.value = false;
  }
}

function handleScrollOrResize() {
  if (isOpen.value) {
    updatePopupPosition();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', handleScrollOrResize, true);
  window.addEventListener('resize', handleScrollOrResize);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', handleScrollOrResize, true);
  window.removeEventListener('resize', handleScrollOrResize);
});
</script>
