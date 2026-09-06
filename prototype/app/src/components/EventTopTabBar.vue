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
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isEventScope = computed(() => route.meta.isEventScope);
const tabContainerRef = ref(null);

function handleWheel(e) {
  if (e.deltaY !== 0) {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  }
}

// Thứ tự danh sách tab mặc định (Ưu tiên: Tổng quan => Thông tin sự kiện => Nhân sự => Công việc)
const defaultTabs = [
  { path: '/event/overview', label: 'Tổng quan', icon: 'dashboard' },
  { path: '/event/info', label: 'Thông tin sự kiện', icon: 'info' },
  { path: '/event/personnel', label: 'Nhân sự', icon: 'badge' },
  { path: '/event/tasks', label: 'Tiến độ, Công việc & WBS', icon: 'task_alt' },
  { path: '/event/run-of-show', label: 'Kịch bản Run-of-Show', icon: 'theater_comedy' },
  { path: '/event/approvals', label: 'Phê duyệt', icon: 'fact_check' },
  { path: '/event/budget', label: 'Ngân sách & Tài chính', icon: 'account_balance_wallet' },
  { path: '/event/media', label: 'Truyền thông & Quảng bá', icon: 'campaign' },
  { path: '/event/tickets', label: 'Vé, chỗ ngồi & Địa điểm', icon: 'confirmation_number' },
  { path: '/event/guests', label: 'Khách mời', icon: 'star' },
  { path: '/event/documents', label: 'Tài liệu', icon: 'folder_open' },
  { path: '/event/equipment', label: 'Thiết bị & Vật tư', icon: 'inventory_2' }
];

const STORAGE_KEY = 'event_top_tabs_order';

// Khôi phục thứ tự tab tùy chỉnh từ localStorage nếu có
function loadSavedTabs() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const paths = JSON.parse(saved);
      const reordered = [];
      paths.forEach(p => {
        const found = defaultTabs.find(t => t.path === p);
        if (found) reordered.push(found);
      });
      defaultTabs.forEach(t => {
        if (!reordered.some(r => r.path === t.path)) {
          reordered.push(t);
        }
      });
      return reordered;
    }
  } catch (e) {
    console.warn('Failed to load tabs order from localStorage', e);
  }
  return [...defaultTabs];
}

const tabs = ref(loadSavedTabs());
const draggedIndex = ref(null);
const dragOverIndex = ref(null);

let autoScrollFrameId = null;
let autoScrollSpeed = 0;

// Tự động cuộn mượt khi con trỏ ở gần mép trái hoặc phải của khung cuộn
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

// Kiểm tra vị trí con trỏ so với 2 mép rìa (khoảng cách 60px)
function checkEdgeAutoScroll(event) {
  if (!tabContainerRef.value) return;
  const rect = tabContainerRef.value.getBoundingClientRect();
  const mouseX = event.clientX;
  const EDGE_THRESHOLD = 60;

  if (mouseX - rect.left >= 0 && mouseX - rect.left < EDGE_THRESHOLD) {
    // Gần mép trái -> cuộn sang trái
    const intensity = (EDGE_THRESHOLD - (mouseX - rect.left)) / EDGE_THRESHOLD;
    const speed = -Math.max(4, Math.round(intensity * 16));
    startAutoScroll(speed);
  } else if (rect.right - mouseX >= 0 && rect.right - mouseX < EDGE_THRESHOLD) {
    // Gần mép phải -> cuộn sang phải
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

// Xử lý sự kiện kéo thả tab (HTML5 Drag & Drop)
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
  const sourceIndex = draggedIndex.value;
  if (sourceIndex !== null && sourceIndex !== targetIndex) {
    // Tráo đổi vị trí tab trong mảng
    const movedTab = tabs.value.splice(sourceIndex, 1)[0];
    tabs.value.splice(targetIndex, 0, movedTab);

    // Lưu thứ tự mới vào localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs.value.map(t => t.path)));
    } catch (e) {
      console.warn('Failed to save tabs order to localStorage', e);
    }
  }
  draggedIndex.value = null;
  dragOverIndex.value = null;
}

function onDragEnd() {
  stopAutoScroll();
  draggedIndex.value = null;
  dragOverIndex.value = null;
}
</script>
