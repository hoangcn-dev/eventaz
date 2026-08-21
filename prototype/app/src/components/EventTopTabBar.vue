<template>
  <div v-if="isEventScope" @wheel="handleWheel" class="sticky top-16 z-30 w-full bg-surface-container-lowest border-b border-outline-variant m-0 p-0 rounded-none overflow-x-auto no-scrollbar shadow-sm">
    <nav class="flex m-0 p-0">
      <router-link
        v-for="tab in tabs"
        :key="tab.path"
        :to="tab.path"
        :class="[
          'event-nav-tab px-6 py-3.5 rounded-none font-medium text-body-sm flex items-center gap-2 transition-all shrink-0 whitespace-nowrap border-r border-outline-variant/30',
          $route.path === tab.path ? 'active-event-tab font-bold bg-primary text-white' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
        ]"
      >
        <span class="material-symbols-outlined text-[18px]">{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isEventScope = computed(() => route.meta.isEventScope);

function handleWheel(e) {
  if (e.deltaY !== 0) {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  }
}

const tabs = [
  { path: '/event/overview', label: 'Tổng quan', icon: 'dashboard' },
  { path: '/event/info', label: 'Thông tin sự kiện', icon: 'info' },
  { path: '/event/run-of-show', label: 'Kịch bản Run-of-Show', icon: 'theater_comedy' },
  { path: '/event/approvals', label: 'Phê duyệt', icon: 'fact_check' },
  { path: '/event/budget', label: 'Ngân sách & Tài chính', icon: 'account_balance_wallet' },
  { path: '/event/media', label: 'Truyền thông & Quảng bá', icon: 'campaign' },
  { path: '/event/tickets', label: 'Vé, chỗ ngồi & Địa điểm', icon: 'confirmation_number' },
  { path: '/event/guests', label: 'Khách mời', icon: 'star' },
  { path: '/event/documents', label: 'Tài liệu', icon: 'folder_open' },
  { path: '/event/personnel', label: 'Nhân sự', icon: 'badge' },
  { path: '/event/equipment', label: 'Thiết bị & Vật tư', icon: 'inventory_2' },
  { path: '/event/tasks', label: 'Tiến độ, Công việc & WBS', icon: 'task_alt' }
];
</script>
