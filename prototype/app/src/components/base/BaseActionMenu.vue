<template>
  <div v-if="primaryAction" class="inline-flex items-center rounded-lg bg-transparent text-xs select-none">
    <!-- Left: Primary Action Button -->
    <button
      type="button"
      @click="handlePrimaryClick"
      :class="[
        'px-2 py-1 font-bold transition-all bg-transparent rounded-l-lg',
        primaryAction.danger 
          ? 'text-error hover:bg-error/10' 
          : 'text-on-surface hover:text-primary hover:bg-surface-container/60'
      ]"
      :title="'Thực hiện: ' + primaryAction.label"
    >
      <span>{{ primaryAction.label }}</span>
    </button>

    <!-- Vertical Divider line -->
    <div class="h-3.5 w-[1px] bg-outline-variant/60 mx-0.5"></div>

    <!-- Right: Dropdown Chevron Button -->
    <BaseDropdown :items="actions" :is-line="false" :show-item-icon="false" bg-color="transparent" placement="bottom-end">
      <template #trigger="{ isOpen, toggle }">
        <button
          type="button"
          @click.stop="toggle"
          :class="[
            'px-1 py-1 flex items-center justify-center transition-colors text-on-surface bg-transparent hover:text-primary hover:bg-surface-container/60 rounded-r-lg',
            isOpen ? 'text-primary bg-surface-container/60' : ''
          ]"
          title="Danh sách thao tác"
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
