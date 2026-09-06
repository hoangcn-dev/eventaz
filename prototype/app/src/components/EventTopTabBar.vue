<template>
  <div 
    v-if="isEventScope" 
    ref="tabContainerRef" 
    @wheel="handleWheel" 
    @dragover="onContainerDragOver"
    class="sticky top-16 z-30 w-full bg-surface-container-lowest border-b border-outline-variant m-0 p-0 rounded-none overflow-x-auto no-scrollbar shadow-sm"
  >
    <nav class="flex m-0 p-0 select-none">
      <router-link
        v-for="(tab, index) in tabs"
        :key="tab.path"
        :to="tab.path"
        draggable="true"
        @dragstart="onDragStart(index, $event)"
        @dragover="onDragOver(index, $event)"
        @dragleave="onDragLeave(index)"
        @drop="onDrop(index, $event)"
        @dragend="onDragEnd"
        :class="[
          'event-nav-tab px-6 py-3.5 rounded-none font-medium text-body-sm flex items-center gap-2 transition-all shrink-0 whitespace-nowrap border-r border-outline-variant/30 cursor-grab active:cursor-grabbing',
          $route.path === tab.path ? 'active-event-tab font-bold bg-primary text-white' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low',
          draggedIndex === index ? 'opacity-40 scale-95' : '',
          dragOverIndex === index && draggedIndex !== index ? 'ring-2 ring-primary ring-inset bg-primary/10' : ''
        ]"
      >
        <span class="material-symbols-outlined text-[18px]">{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { getCurrentEvent } from '../mock/events.js';

const route = useRoute();
const isEventScope = computed(() => route.meta.isEventScope);
const tabContainerRef = ref(null);

function handleWheel(e) {
  if (e.deltaY !== 0) {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  }
}

// Danh sách tất cả các Module tab đồng bộ 1-1 với modules.json
const ALL_MODULE_TABS = [
  { key: 'overview', path: '/event/overview', label: 'Tổng quan', icon: 'dashboard', isAlwaysVisible: true },
  { key: 'info', path: '/event/info', label: 'Thông tin sự kiện', icon: 'info', isAlwaysVisible: true },
  { key: 'personnel', path: '/event/personnel', label: 'Nhân sự', icon: 'badge' },
  { key: 'wbs', path: '/event/tasks', label: 'Công việc', icon: 'task_alt' },
  { key: 'runOfShow', path: '/event/run-of-show', label: 'Chương trình sự kiện', icon: 'theater_comedy' },
  { key: 'budget', path: '/event/budget', label: 'Ngân sách và tài chính', icon: 'account_balance_wallet' },
  { key: 'media', path: '/event/media', label: 'Truyền thông và quảng bá', icon: 'campaign' },
  { key: 'tickets', path: '/event/tickets', label: 'Vé, chỗ ngồi và địa điểm', icon: 'confirmation_number' },
  { key: 'guests', path: '/event/guests', label: 'Khách mời', icon: 'star' },
  { key: 'documents', path: '/event/documents', label: 'Tài liệu', icon: 'folder_open' },
  { key: 'equipment', path: '/event/equipment', label: 'Thiết bị và vật tư', icon: 'inventory_2' },
  { key: 'approvals', path: '/event/approvals', label: 'Phê duyệt', icon: 'fact_check' }
];

const currentEvent = ref(getCurrentEvent());

function updateCurrentEvent() {
  currentEvent.value = getCurrentEvent();
}

onMounted(() => {
  updateCurrentEvent();
  if (typeof window !== 'undefined') {
    window.addEventListener('eventaz:events-updated', updateCurrentEvent);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('eventaz:events-updated', updateCurrentEvent);
  }
});

// Lọc hiển thị các tab theo thuộc tính enabledModules của sự kiện đang được chọn
const tabs = computed(() => {
  const evt = currentEvent.value;
  const enabledKeys = evt && Array.isArray(evt.enabledModules) ? evt.enabledModules : null;

  return ALL_MODULE_TABS.filter(tab => {
    if (tab.isAlwaysVisible) return true;
    if (!enabledKeys) return true; // Hiển thị mặc định nếu sự kiện chưa cấu hình
    return enabledKeys.includes(tab.key);
  });
});

const draggedIndex = ref(null);
const dragOverIndex = ref(null);

let autoScrollFrameId = null;
let autoScrollSpeed = 0;

function startAutoScroll(speed) {
  autoScrollSpeed = speed;
  if (autoScrollFrameId !== null) return;

  function step() {
    if (tabContainerRef.value && autoScrollSpeed !== 0) {
      tabContainerRef.value.scrollLeft += autoScrollSpeed;
      autoScrollFrameId = requestAnimationFrame(step);
    } else {
      stopAutoScroll();
    }
  }
  autoScrollFrameId = requestAnimationFrame(step);
}

function stopAutoScroll() {
  if (autoScrollFrameId !== null) {
    cancelAnimationFrame(autoScrollFrameId);
    autoScrollFrameId = null;
  }
  autoScrollSpeed = 0;
}

function checkEdgeAutoScroll(event) {
  if (!tabContainerRef.value) return;
  const rect = tabContainerRef.value.getBoundingClientRect();
  const mouseX = event.clientX;
  const EDGE_THRESHOLD = 60;

  if (mouseX - rect.left >= 0 && mouseX - rect.left < EDGE_THRESHOLD) {
    const intensity = (EDGE_THRESHOLD - (mouseX - rect.left)) / EDGE_THRESHOLD;
    const speed = -Math.max(4, Math.round(intensity * 16));
    startAutoScroll(speed);
  } else if (rect.right - mouseX >= 0 && rect.right - mouseX < EDGE_THRESHOLD) {
    const intensity = (EDGE_THRESHOLD - (rect.right - mouseX)) / EDGE_THRESHOLD;
    const speed = Math.max(4, Math.round(intensity * 16));
    startAutoScroll(speed);
  } else {
    stopAutoScroll();
  }
}

function onContainerDragOver(event) {
  event.preventDefault();
  checkEdgeAutoScroll(event);
}

function onDragStart(index, event) {
  draggedIndex.value = index;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', String(index));
}

function onDragOver(index, event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  dragOverIndex.value = index;
  checkEdgeAutoScroll(event);
}

function onDragLeave(index) {
  if (dragOverIndex.value === index) {
    dragOverIndex.value = null;
  }
}

function onDrop(targetIndex, event) {
  event.preventDefault();
  stopAutoScroll();
  draggedIndex.value = null;
  dragOverIndex.value = null;
}

function onDragEnd() {
  stopAutoScroll();
  draggedIndex.value = null;
  dragOverIndex.value = null;
}
</script>
