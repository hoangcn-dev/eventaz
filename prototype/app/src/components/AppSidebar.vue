<template>
  <div>
    <!-- Main Sidebar Drawer -->
    <aside 
      :class="[
        'fixed top-0 left-0 bottom-0 z-[55] w-72 bg-inverse-surface text-inverse-on-surface border-r border-outline-variant/30 flex flex-col pt-16 transition-all duration-300 shadow-2xl',
        isCollapsed ? '-translate-x-full' : 'translate-x-0'
      ]"
    >
      <!-- Nút chuyển trạng thái Sidebar ở giữa lề phải (Hình chữ nhật nhỏ giống static) -->
      <button 
        @click="toggleSidebar"
        :class="[
          'absolute right-0 top-1/2 -translate-y-1/2 z-[60] w-5 h-10 bg-slate-800 text-white rounded-r-md border border-l-0 border-white/20 shadow-lg flex items-center justify-center opacity-60 hover:opacity-100 hover:bg-primary transition-all duration-200 cursor-pointer focus:outline-none',
          isCollapsed ? 'translate-x-full' : 'translate-x-1/2'
        ]"
        title="Ẩn/Hiện Sidebar"
      >
        <span class="material-symbols-outlined text-[16px]">
          {{ isCollapsed ? 'chevron_right' : 'chevron_left' }}
        </span>
      </button>

      <!-- Scrollable Nav Section -->
      <div class="relative flex-1 overflow-hidden" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <nav 
          ref="navRef"
          @scroll="handleNavScroll"
          class="h-full overflow-y-auto overscroll-y-contain custom-sidebar-scroll pt-0 pb-4 space-y-1"
        >
        <!-- ADMIN SCOPE MENU ITEMS (Chỉ hiển thị khi ở Layout Admin) -->
        <template v-if="isAdminScope">
          <!-- System Admin Approvals -->
          <router-link 
            to="/admin/approvals"
            :class="[
              'flex items-center gap-3 px-5 py-3 transition-all text-sm',
              route.path === '/admin/approvals'
                ? 'bg-primary-container text-on-primary-container font-bold border-l-4 border-primary'
                : 'text-white hover:bg-surface-variant/10'
            ]"
          >
            <span class="material-symbols-outlined">verified_user</span>
            <span>Phê Duyệt</span>
          </router-link>
        </template>

        <!-- ORG / EVENT SCOPE MENU ITEMS (Chỉ hiển thị khi ở Layout Tổ Chức) -->
        <template v-else>
          <!-- Dashboard -->
          <router-link 
            to="/dashboard"
            :class="[
              'flex items-center gap-3 px-5 py-3 transition-all text-sm',
              route.path === '/dashboard'
                ? 'bg-primary-container text-on-primary-container font-bold border-l-4 border-primary'
                : 'text-white hover:bg-surface-variant/10'
            ]"
          >
            <span class="material-symbols-outlined">dashboard</span>
            <span>Dashboard Tổng Quan</span>
          </router-link>

          <!-- Event Dropdown Accordion Item -->
          <div>
            <div 
              @click="handleEventTabClick"
              :class="[
                'flex items-center justify-between px-5 py-3 transition-all text-sm select-none cursor-pointer',
                isEventRouteActive 
                  ? 'bg-primary-container text-on-primary-container font-bold border-l-4 border-primary' 
                  : 'text-white hover:bg-surface-variant/10'
              ]"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined">event</span>
                <span>Sự kiện</span>
              </div>
              <span class="material-symbols-outlined text-[18px] transition-transform" :class="[isEventsOpen ? 'rotate-180' : '', isEventRouteActive ? 'text-on-primary-container' : 'text-slate-400']">
                expand_more
              </span>
            </div>

            <!-- Event Selection List Dropdown -->
            <div v-show="isEventsOpen" class="mt-1 ml-5 pl-2 border-l border-white/10 space-y-1">
              <div 
                v-for="evt in eventsList" 
                :key="evt.id"
                @click.stop="selectEvent(evt.id)"
                :class="[
                  'flex items-center justify-between px-3 py-2 rounded-md text-xs cursor-pointer transition-all',
                  evt.id === currentEventId ? 'bg-primary text-white font-bold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                ]"
              >
                <span class="truncate flex-1">{{ evt.name }}</span>
                <span :class="['text-[10px] px-1.5 py-0.5 rounded font-normal shrink-0 ml-2', getStatusBadgeColor(evt.status)]">
                  {{ getStatusBadgeText(evt) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Templates Library -->
          <router-link 
            to="/templates"
            :class="[
              'flex items-center gap-3 px-5 py-3 transition-all text-sm',
              route.path === '/templates'
                ? 'bg-primary-container text-on-primary-container font-bold border-l-4 border-primary'
                : 'text-white hover:bg-surface-variant/10'
            ]"
          >
            <span class="material-symbols-outlined">folder_special</span>
            <span>Thư viện Template</span>
          </router-link>

          <!-- Org Personnel -->
          <router-link 
            to="/org-personnel"
            :class="[
              'flex items-center gap-3 px-5 py-3 transition-all text-sm',
              route.path === '/org-personnel'
                ? 'bg-primary-container text-on-primary-container font-bold border-l-4 border-primary'
                : 'text-white hover:bg-surface-variant/10'
            ]"
          >
            <span class="material-symbols-outlined">groups</span>
            <span>Nhân sự tổ chức</span>
          </router-link>

        </template>

        <!-- Đường phân cách nhóm menu -->
        <div class="border-t border-white/10 my-1.5"></div>

        <!-- Tab Chuyển Đổi Giao Diện (Nằm trực tiếp trong menu chính, dùng chung cho cả Admin & Tổ chức) -->
        <div>
          <div 
            @click="isLayoutSwitcherOpen = !isLayoutSwitcherOpen"
            class="flex items-center justify-between px-5 py-3 text-white cursor-pointer hover:bg-surface-variant/10 transition-all text-sm select-none"
          >
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined">swap_calls</span>
              <span>Chuyển giao diện</span>
            </div>
            <span class="material-symbols-outlined text-[18px] text-slate-400 transition-transform" :class="{ 'rotate-180': isLayoutSwitcherOpen }">
              expand_more
            </span>
          </div>

          <!-- Danh sách lựa chọn khi sổ xuống -->
          <div v-show="isLayoutSwitcherOpen" class="mt-1 ml-5 pl-2 border-l border-white/10 space-y-1 text-xs">
            <!-- 1. Admin hệ thống -->
            <router-link 
              to="/admin/approvals" 
              :class="[
                'w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold transition-all text-left border',
                isAdminScope ? 'bg-primary/30 text-blue-200 border-blue-400/40 shadow-sm' : 'text-slate-300 hover:bg-white/5 border-transparent'
              ]"
            >
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-blue-400">admin_panel_settings</span>
                <span>1. Admin hệ thống</span>
              </div>
              <span v-if="isAdminScope" class="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            </router-link>

            <!-- 2. Ban tổ chức -->
            <router-link 
              to="/dashboard" 
              :class="[
                'w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold transition-all text-left border',
                isOrgScope ? 'bg-primary/30 text-blue-200 border-blue-400/40 shadow-sm' : 'text-slate-300 hover:bg-white/5 border-transparent'
              ]"
            >
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-blue-400">corporate_fare</span>
                <span>2. Ban tổ chức</span>
              </div>
              <span v-if="isOrgScope" class="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            </router-link>

            <!-- 3. Nhà cung cấp -->
            <div 
              class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-500 font-medium cursor-not-allowed opacity-60 border border-transparent select-none"
              title="Tính năng dành cho Nhà Cung Cấp sẽ phát triển ở phiên bản tiếp theo"
            >
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-slate-500">storefront</span>
                <span>3. Nhà cung cấp</span>
              </div>
              <span class="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono border border-slate-700">Chờ sau</span>
            </div>
          </div>
        </div>

        <!-- Đường phân cách nhóm menu -->
        <div class="border-t border-white/10 my-1.5"></div>

        <!-- Tab Test cuộn -->
        <div>
          <div class="flex items-center gap-3 px-5 py-3 transition-all text-sm text-white/70 hover:bg-surface-variant/10 cursor-pointer">
            <span class="material-symbols-outlined">groups</span>
            <span>Test cuộn 1</span>
          </div>
          <div class="flex items-center gap-3 px-5 py-3 transition-all text-sm text-white/70 hover:bg-surface-variant/10 cursor-pointer">
            <span class="material-symbols-outlined">groups</span>
            <span>Test cuộn 2</span>
          </div>
          <div class="flex items-center gap-3 px-5 py-3 transition-all text-sm text-white/70 hover:bg-surface-variant/10 cursor-pointer">
            <span class="material-symbols-outlined">groups</span>
            <span>Test cuộn 3</span>
          </div>
          <div class="flex items-center gap-3 px-5 py-3 transition-all text-sm text-white/70 hover:bg-surface-variant/10 cursor-pointer">
            <span class="material-symbols-outlined">groups</span>
            <span>Test cuộn 4</span>
          </div>
          <div class="flex items-center gap-3 px-5 py-3 transition-all text-sm text-white/70 hover:bg-surface-variant/10 cursor-pointer">
            <span class="material-symbols-outlined">groups</span>
            <span>Test cuộn 5</span>
          </div>
          <div class="flex items-center gap-3 px-5 py-3 transition-all text-sm text-white/70 hover:bg-surface-variant/10 cursor-pointer">
            <span class="material-symbols-outlined">groups</span>
            <span>Test cuộn 6</span>
          </div>
        </div>
      </nav>

      <!-- Custom Absolute Scrollbar Thumb -->
      <div 
        v-if="thumbHeight > 0"
        :class="[
          'absolute right-0.5 w-1.5 bg-white/40 hover:bg-white/70 rounded-full transition-opacity duration-300 pointer-events-none z-30',
          isHovered ? 'opacity-100' : 'opacity-0'
        ]"
        :style="{
          top: `${thumbTop}px`,
          height: `${thumbHeight}px`
        }"
      ></div>
    </div>

    <!-- Docked Bottom Section: Nút Tạo mới sự kiện -->
    <div class="p-3.5 border-t border-white/10 bg-slate-950/80 backdrop-blur shrink-0">
      <button 
        @click="emit('open-create-event')"
        type="button"
        class="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer hover:shadow-primary/25 active:scale-[0.98]"
      >
        <span class="material-symbols-outlined text-[18px]">add_circle</span>
        <span>Tạo mới sự kiện</span>
      </button>
    </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getEvents, getCurrentEventId, setCurrentEventId, LIFECYCLE_STATES } from '../mock/events.js';

const SIDEBAR_STORAGE_KEY = 'eventaz_sidebar_collapsed';

const navRef = ref(null);
const isHovered = ref(false);
const thumbHeight = ref(0);
const thumbTop = ref(0);

function updateScrollThumb() {
  if (!navRef.value) return;
  const { scrollTop, scrollHeight, clientHeight } = navRef.value;
  if (scrollHeight <= clientHeight) {
    thumbHeight.value = 0;
    return;
  }
  const heightRatio = clientHeight / scrollHeight;
  thumbHeight.value = Math.max(heightRatio * clientHeight, 24);
  const maxScrollTop = scrollHeight - clientHeight;
  const maxThumbTop = clientHeight - thumbHeight.value;
  thumbTop.value = (scrollTop / maxScrollTop) * maxThumbTop;
}

function handleNavScroll() {
  updateScrollThumb();
}

const emit = defineEmits(['open-create-event', 'open-clone-event', 'sidebar-toggled']);

const router = useRouter();
const route = useRoute();

const isCollapsed = ref(false);
const isEventsOpen = ref(true);
const isLayoutSwitcherOpen = ref(false);
const eventsList = ref(getEvents());
const currentEventId = ref(getCurrentEventId());
const currentEvent = ref(eventsList.value.find(e => e.id === currentEventId.value) || eventsList.value[0] || {});

function handleEventTabClick() {
  if (!route.path.startsWith('/event')) {
    isEventsOpen.value = true;
    router.push('/event/overview');
  } else {
    isEventsOpen.value = !isEventsOpen.value;
  }
  setTimeout(updateScrollThumb, 50);
}

const isAdminScope = computed(() => {
  return route.path.startsWith('/admin');
});

const isOrgScope = computed(() => {
  return !route.path.startsWith('/admin');
});

const isEventRouteActive = computed(() => {
  return route.path.startsWith('/event');
});

function loadSidebarState() {
  const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
  if (stored !== null) {
    isCollapsed.value = stored === 'true';
  } else {
    isCollapsed.value = false;
  }
  emit('sidebar-toggled', isCollapsed.value);
}

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem(SIDEBAR_STORAGE_KEY, String(isCollapsed.value));
  emit('sidebar-toggled', isCollapsed.value);
}

function loadEvents() {
  eventsList.value = getEvents();
  currentEventId.value = getCurrentEventId();
  currentEvent.value = eventsList.value.find(e => e.id === currentEventId.value) || eventsList.value[0] || {};
}

function selectEvent(eventId) {
  setCurrentEventId(eventId);
  currentEventId.value = eventId;
  currentEvent.value = eventsList.value.find(e => e.id === eventId) || {};
  router.push('/event/overview');
}

function getStatusBadgeColor(status) {
  const map = {
    'Draft': 'bg-slate-500/20 text-slate-300',
    'Planning': 'bg-blue-500/20 text-blue-300',
    'Preparing': 'bg-indigo-500/20 text-indigo-300',
    'Ongoing': 'bg-emerald-500/20 text-emerald-300',
    'Closed': 'bg-amber-500/20 text-amber-300',
    'Archived': 'bg-gray-500/20 text-gray-400'
  };
  return map[status] || 'bg-slate-500/20 text-slate-300';
}

function getStatusBadgeText(evt) {
  if (!evt || !evt.status) return '';
  const status = evt.status;
  if (evt.lifecycleStates && evt.lifecycleStates[status] && evt.lifecycleStates[status].nameVi) {
    return evt.lifecycleStates[status].nameVi;
  }
  if (LIFECYCLE_STATES[status] && LIFECYCLE_STATES[status].nameVi) {
    return LIFECYCLE_STATES[status].nameVi;
  }
  const fallbackMap = {
    'Draft': 'Nháp',
    'Planning': 'Thiết lập',
    'Preparing': 'Chuẩn bị',
    'Ongoing': 'Đang diễn ra',
    'Closed': 'Kết thúc',
    'Archived': 'Lưu trữ'
  };
  return fallbackMap[status] || status;
}

watch(
  () => route.path,
  (newPath) => {
    // Tự động thu gọn accordion Sự kiện khi ở ngoài trang /event/...
    if (!newPath.startsWith('/event')) {
      isEventsOpen.value = false;
    } else {
      isEventsOpen.value = true;
    }
    // Tự động đóng dropdown chuyển giao diện khi chuyển route
    isLayoutSwitcherOpen.value = false;
    setTimeout(updateScrollThumb, 50);
  },
  { immediate: true }
);

onMounted(() => {
  loadSidebarState();
  loadEvents();
  setTimeout(() => {
    updateScrollThumb();
  }, 100);
});

defineExpose({
  toggleSidebar,
  isCollapsed
});
</script>

<style scoped>
/* Chặn cuộn trôi sang trang main content & ẩn hoàn toàn scrollbar mặc định */
.custom-sidebar-scroll {
  overscroll-behavior-y: contain;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
.custom-sidebar-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Edge, Safari */
  width: 0;
  height: 0;
}
</style>
