<template>
  <div ref="containerRef" class="relative w-full text-xs font-sans select-none">
    <!-- Trigger Button -->
    <button
      type="button"
      @click="toggleOpen"
      :disabled="disabled"
      :class="[
        'w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border text-left transition-all outline-none focus:ring-2 focus:ring-primary/40',
        disabled 
          ? 'bg-surface-container-low text-on-surface-variant/40 cursor-not-allowed border-outline-variant/40' 
          : (isOpen 
            ? 'bg-white border-primary ring-2 ring-primary/20 text-on-surface shadow-xs' 
            : 'bg-surface-container-lowest border-outline-variant/80 hover:border-outline-variant text-on-surface'
          )
      ]"
    >
      <span 
        :class="[
          'truncate font-medium',
          selectedOption ? 'text-on-surface font-semibold' : 'text-on-surface-variant/60'
        ]"
      >
        {{ selectedOption ? selectedOption.label : placeholder }}
      </span>

      <div class="flex items-center gap-1 shrink-0 text-on-surface-variant/60">
        <!-- Clear icon if clearable & value present -->
        <span
          v-if="clearable && hasValue && !disabled"
          @click.stop="handleClear"
          class="material-symbols-outlined text-[14px] hover:text-error transition-colors cursor-pointer p-0.5 rounded-full hover:bg-surface-container"
          title="Xóa lựa chọn"
        >
          close
        </span>
        <span 
          class="material-symbols-outlined text-[18px] transition-transform duration-200"
          :class="{ 'rotate-180 text-primary': isOpen }"
        >
          expand_more
        </span>
      </div>
    </button>

    <!-- Custom Options Dropdown -->
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
        class="absolute left-0 right-0 top-full mt-1 z-50 max-h-56 overflow-y-auto bg-white rounded-xl shadow-xl border border-outline-variant/80 py-1 space-y-0.5"
      >
        <template v-if="normalizedOptions.length > 0">
          <div
            v-for="opt in normalizedOptions"
            :key="String(opt.value)"
            @click="selectOption(opt)"
            :class="[
              'px-3 py-1.5 flex items-center justify-between text-xs cursor-pointer transition-colors font-medium',
              isSelected(opt.value)
                ? 'bg-primary/10 text-primary font-extrabold'
                : 'text-on-surface hover:bg-surface-container-high'
            ]"
          >
            <span class="truncate">{{ opt.label }}</span>
            <span v-if="isSelected(opt.value)" class="material-symbols-outlined text-[16px] text-primary">
              check
            </span>
          </div>
        </template>
        <div v-else class="px-3 py-2 text-center text-on-surface-variant/60 text-[11px]">
          Không có lựa chọn nào
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Chọn giá trị...'
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const containerRef = ref(null);
const isOpen = ref(false);

const normalizedOptions = computed(() => {
  return props.options.map(opt => {
    if (typeof opt === 'object' && opt !== null) {
      return { label: opt.label ?? String(opt.value), value: opt.value };
    }
    return { label: String(opt), value: opt };
  });
});

const selectedOption = computed(() => {
  return normalizedOptions.value.find(opt => String(opt.value) === String(props.modelValue));
});

const hasValue = computed(() => {
  return props.modelValue !== undefined && props.modelValue !== null && String(props.modelValue) !== '';
});

function isSelected(val) {
  return String(val) === String(props.modelValue);
}

function toggleOpen() {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
}

function selectOption(opt) {
  emit('update:modelValue', opt.value);
  emit('change', opt.value);
  isOpen.value = false;
}

function handleClear() {
  emit('update:modelValue', '');
  emit('change', '');
  isOpen.value = false;
}

function handleClickOutside(event) {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
