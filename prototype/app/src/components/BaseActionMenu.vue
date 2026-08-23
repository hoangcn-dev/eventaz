<template>
  <div v-if="primaryAction" class="inline-flex items-center rounded-lg border border-primary/30 shadow-2xs bg-white text-xs select-none overflow-hidden">
    <!-- Left: Primary Action Button (Click executes primary action directly) -->
    <button
      type="button"
      @click="handlePrimaryClick"
      :class="[
        'px-2.5 py-1 flex items-center gap-1 font-bold transition-all',
        primaryAction.danger 
          ? 'bg-error/5 hover:bg-error/15 text-error' 
          : 'bg-primary/5 hover:bg-primary/15 text-primary'
      ]"
      :title="'Thực hiện: ' + primaryAction.label"
    >
      <span v-if="primaryAction.icon" class="material-symbols-outlined text-[14px]">
        {{ primaryAction.icon }}
      </span>
      <span>{{ primaryAction.label }}</span>
    </button>

    <!-- Vertical Divider line -->
    <div class="h-4 w-[1px] bg-outline-variant/60"></div>

    <!-- Right: Dropdown Chevron Button (Click opens BaseDropdown menu with all actions) -->
    <BaseDropdown :items="actions" placement="bottom-end">
      <template #trigger="{ isOpen, toggle }">
        <button
          type="button"
          @click.stop="toggle"
          :class="[
            'px-1.5 py-1 flex items-center justify-center transition-colors text-on-surface-variant hover:text-primary hover:bg-surface-container-high',
            isOpen ? 'bg-primary/10 text-primary' : 'bg-white'
          ]"
          title="Danh sách tất cả thao tác"
        >
          <span class="material-symbols-outlined text-[16px] transition-transform duration-200" :class="{ 'rotate-180 text-primary': isOpen }">
            expand_more
          </span>
        </button>
      </template>
    </BaseDropdown>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import BaseDropdown from './BaseDropdown.vue';

const props = defineProps({
  actions: {
    type: Array,
    default: () => []
  }
});

const activeActions = computed(() => {
  return props.actions.filter(a => !a.hidden);
});

const primaryAction = computed(() => {
  return activeActions.value[0] || null;
});

function handlePrimaryClick() {
  if (primaryAction.value && typeof primaryAction.value.handler === 'function') {
    primaryAction.value.handler(primaryAction.value);
  }
}
</script>
