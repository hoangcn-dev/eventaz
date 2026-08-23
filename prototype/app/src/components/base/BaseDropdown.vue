<template>
  <div ref="triggerRef" class="inline-flex items-center text-xs font-sans">
    <!-- Slot for Trigger element -->
    <slot name="trigger" :is-open="isOpen" :toggle="toggleDropdown">
      <button
        type="button"
        @click.stop="toggleDropdown"
        :class="[
          'px-2.5 py-1.5 font-medium flex items-center gap-1 transition-all rounded-lg text-on-surface',
          bgClass,
          isLine ? 'border border-outline-variant shadow-2xs' : 'border-0 shadow-none'
        ]"
      >
        <span>{{ label }}</span>
        <span class="material-symbols-outlined text-[16px] transition-transform duration-200" :class="{ 'rotate-180': isOpen }">
          expand_more
        </span>
      </button>
    </slot>

    <!-- TELEPORTED DROPDOWN MENU -->
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
          ref="menuRef"
          :style="menuStyle"
          @click.stop
          class="min-w-[150px] bg-white rounded-xl shadow-2xl border border-outline-variant/80 py-1.5 space-y-0.5 font-sans text-xs text-on-surface z-[9999]"
        >
          <slot :close="closeDropdown">
            <template v-for="item in visibleItems" :key="item.id || item.label">
              <!-- Divider -->
              <div v-if="item.divider" class="my-1 border-t border-outline-variant/40"></div>
              
              <!-- Item -->
              <button
                v-else
                type="button"
                @click="handleSelect(item)"
                :disabled="item.disabled"
                :class="[
                  'w-full px-3 py-2 flex items-center gap-2 text-left font-medium transition-colors text-xs',
                  item.disabled 
                    ? 'opacity-40 cursor-not-allowed text-on-surface-variant' 
                    : (item.danger 
                      ? 'text-error hover:bg-error/10 font-bold' 
                      : 'text-on-surface hover:bg-surface-container-high'
                    )
                ]"
              >
                <span v-if="item.icon && showItemIcon" class="material-symbols-outlined text-[16px]" :class="item.danger ? 'text-error' : 'text-primary'">
                  {{ item.icon }}
                </span>
                <span>{{ item.label }}</span>
              </button>
            </template>
          </slot>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: 'Thao tác'
  },
  items: {
    type: Array,
    default: () => []
  },
  placement: {
    type: String,
    default: 'bottom-end'
  },
  isLine: {
    type: Boolean,
    default: true
  },
  bgColor: {
    type: String,
    default: 'transparent'
  },
  showItemIcon: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select']);

const triggerRef = ref(null);
const menuRef = ref(null);
const isOpen = ref(false);
const menuStyle = ref({});

const bgClass = computed(() => {
  if (props.bgColor === 'white') return 'bg-white hover:bg-surface-container-low';
  return 'bg-transparent hover:bg-surface-container/60';
});

const visibleItems = computed(() => {
  return props.items.filter(item => !item.hidden);
});

function updateMenuPosition() {
  if (!triggerRef.value) return;
  const rect = triggerRef.value.getBoundingClientRect();
  
  const menuWidth = 150;
  let left = rect.right - menuWidth;
  if (props.placement === 'bottom-start' || left < 16) {
    left = rect.left;
  }
  
  if (left + menuWidth > window.innerWidth - 16) {
    left = Math.max(16, window.innerWidth - menuWidth - 16);
  }

  let top = rect.bottom + 4;
  if (top + 200 > window.innerHeight && rect.top - 200 > 0) {
    top = rect.top - 200;
  }

  menuStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: 9999
  };
}

async function toggleDropdown() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    await nextTick();
    updateMenuPosition();
  }
}

function closeDropdown() {
  isOpen.value = false;
}

function handleSelect(item) {
  if (item.disabled) return;
  if (typeof item.handler === 'function') {
    item.handler(item);
  }
  emit('select', item);
  closeDropdown();
}

function handleClickOutside(event) {
  if (!isOpen.value) return;
  const isInsideTrigger = triggerRef.value && triggerRef.value.contains(event.target);
  const isInsideMenu = menuRef.value && menuRef.value.contains(event.target);
  if (!isInsideTrigger && !isInsideMenu) {
    closeDropdown();
  }
}

function handleScrollOrResize() {
  if (isOpen.value) {
    updateMenuPosition();
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
