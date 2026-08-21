<template>
  <div>
    <!-- FAB Toggle Button when collapsed -->
    <button 
      v-if="isCollapsed" 
      @click="toggleSidebar"
      class="fixed bottom-6 left-6 z-40 p-3.5 bg-primary text-white rounded-full shadow-2xl hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center border-2 border-white/20"
      title="Mở thanh điều hướng"
    >
      <span class="material-symbols-outlined text-[24px]">menu</span>
    </button>

    <!-- Main Sidebar Drawer -->
    <aside 
      :class="[
        'fixed top-0 left-0 bottom-0 z-40 w-72 bg-inverse-surface text-inverse-on-surface border-r border-outline-variant/30 flex flex-col transition-all duration-300 shadow-2xl',
        isCollapsed ? '-translate-x-full' : 'translate-x-0'
      ]"
    >
      <!-- Header Area -->
      <div class="p-5 border-b border-white/10 flex justify-between items-center bg-inverse-surface/80 backdrop-blur-md">
        <router-link to="/dashboard" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-105 transition-transform border border-white/20">
            E
          </div>
          <div>
            <span class="font-black text-lg tracking-wider text-white block leading-none">EventAZ</span>
            <span class="text-[10px] text-slate-400 font-mono tracking-normal block mt-1">Platform v2.0</span>
          </div>
        </router-link>

        <button 
          @click="toggleSidebar"
          class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Thu gọn menu"
        >
          <span class="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>
      </div>

      <!-- Scrollable Nav Section -->
      <nav class="flex-1 overflow-y-auto p-4 space-y-2">
        <!-- ADMIN SCOPE MENU ITEMS (Chỉ hiển thị khi ở Layout Admin) -->
        <template v-if="isAdminScope">
          <div class="px-3 py-1 mb-2">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">DANH MỤC ADMIN HỆ THỐNG</span>
          </div>

          <!-- System Admin Approvals -->
          <router-link 
            to="/admin/approvals"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-amber-300 hover:bg-surface-variant/10 text-sm font-bold"
            active-class="bg-amber-500/20 text-amber-300 font-extrabold border-l-4 border-amber-400"
          >
            <span class="material-symbols-outlined text-amber-400">verified_user</span>
            <span>Phê Duyệt Hệ Thống (Admin)</span>
          </router-link>
        </template>

        <!-- ORG / EVENT SCOPE MENU ITEMS (Chỉ hiển thị khi ở Layout Tổ Chức) -->
        <template v-else>
          <!-- Dashboard -->
          <router-link 
            to="/dashboard"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-white hover:bg-surface-variant/10 text-sm"
            active-class="bg-primary-container text-on-primary-container font-bold"
          >
            <span class="material-symbols-outlined">dashboard</span>
            <span>Dashboard Tổng Quan</span>
          </router-link>

          <!-- Current Active Event Navigation Header -->
          <div class="pt-2 pb-1">
            <div class="flex justify-between items-center px-4 mb-2">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sự Kiện Đang Chọn</span>
              <div class="flex items-center gap-1">
                <button 
                  @click="$emit('open-clone-event')" 
                  class="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Nhân bản sự kiện"
                >
                  <span class="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
                <button 
                  @click="$emit('open-create-event')" 
                  class="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Tạo sự kiện mới"
                >
                  <span class="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>

            <!-- Event Accordion Header -->
            <div 
              @click="isEventsOpen = !isEventsOpen"
              class="px-4 py-2.5 rounded-lg bg-surface-variant/10 text-white flex items-center justify-between cursor-pointer hover:bg-surface-variant/20 transition-all border border-white/5"
            >
              <div class="flex items-center gap-2.5 truncate">
                <span class="material-symbols-outlined text-primary-fixed text-[20px]">event</span>
                <span class="font-bold text-xs truncate">{{ currentEvent.name || 'Tech Summit Asia 2026' }}</span>
              </div>
              <span class="material-symbols-outlined text-[18px] text-slate-400 transition-transform" :class="{ 'rotate-180': isEventsOpen }">
                expand_more
              </span>
            </div>

            <!-- Event Selection List Dropdown -->
            <div v-show="isEventsOpen" class="mt-2 ml-2 pl-2 border-l border-white/10 space-y-1">
              <div 
                v-for="evt in eventsList" 
                :key="evt.id"
                @click="selectEvent(evt.id)"
                :class="[
                  'flex items-center justify-between px-3 py-2 rounded-md text-xs cursor-pointer transition-all',
                  evt.id === currentEventId ? 'bg-primary text-white font-bold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                ]"
              >
                <span class="truncate flex-1">{{ evt.name }}</span>
                <span :class="['text-[10px] px-1.5 py-0.5 rounded font-normal shrink-0', getStatusBadgeColor(evt.status)]">
                  {{ evt.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Templates Library -->
          <router-link 
            to="/templates"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-white hover:bg-surface-variant/10 text-sm"
            active-class="bg-primary-container text-on-primary-container font-bold"
          >
            <span class="material-symbols-outlined">folder_special</span>
            <span>Thư viện Template</span>
          </router-link>

          <!-- Org Personnel -->
          <router-link 
            to="/org-personnel"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-white hover:bg-surface-variant/10 text-sm"
            active-class="bg-primary-container text-on-primary-container font-bold"
          >
            <span class="material-symbols-outlined">groups</span>
            <span>Nhân sự tổ chức</span>
          </router-link>
        </template>
      </nav>

      <!-- BOTTOM FOOTER ROLE/LAYOUT SWITCHER BAR -->
      <div class="mt-auto border-t border-white/10 p-3 bg-slate-900/90 space-y-2">
        <div class="px-2">
          <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[13px] text-amber-400">swap_calls</span>
            <span>Chuyển Đổi Giao Diện Layout</span>
          </span>
        </div>

        <div class="space-y-1 text-xs">
          <!-- 1. Quản lý hệ thống (Admin) -->
          <router-link 
            to="/admin/approvals" 
            :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition-all text-left border',
              isAdminScope ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm' : 'text-slate-300 hover:bg-white/5 border-transparent'
            ]"
          >
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[18px] text-amber-400">admin_panel_settings</span>
              <span>1. Quản lý hệ thống (Admin)</span>
            </div>
            <span v-if="isAdminScope" class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          </router-link>

          <!-- 2. Quản trị sự kiện (Cho tổ chức) -->
          <router-link 
            to="/dashboard" 
            :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition-all text-left border',
              isOrgScope ? 'bg-primary/30 text-blue-200 border-blue-400/40 shadow-sm' : 'text-slate-300 hover:bg-white/5 border-transparent'
            ]"
          >
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[18px] text-blue-400">corporate_fare</span>
              <span>2. Quản trị sự kiện (Cho tổ chức)</span>
            </div>
            <span v-if="isOrgScope" class="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
          </router-link>

          <!-- 3. Quản trị cung cấp (Nhà cung cấp - Vendor) -->
          <div 
            class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-500 font-medium cursor-not-allowed opacity-60 border border-transparent select-none"
            title="Tính năng dành cho Nhà Cung Cấp sẽ phát triển ở phiên bản tiếp theo"
          >
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[18px] text-slate-500">storefront</span>
              <span>3. Quản trị cung cấp (Vendor)</span>
            </div>
            <span class="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono border border-slate-700">Chờ sau</span>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getEvents, getCurrentEventId, setCurrentEventId } from '../mock/events.js';

const SIDEBAR_STORAGE_KEY = 'eventaz_sidebar_collapsed';

const emit = defineEmits(['open-create-event', 'open-clone-event', 'sidebar-toggled']);

const router = useRouter();
const route = useRoute();

const isCollapsed = ref(false);
const isEventsOpen = ref(true);
const eventsList = ref([]);
const currentEventId = ref('E-2024-99X');
const currentEvent = ref({});

const isAdminScope = computed(() => {
  return route.path.startsWith('/admin');
});

const isOrgScope = computed(() => {
  return !route.path.startsWith('/admin');
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

onMounted(() => {
  loadSidebarState();
  loadEvents();
});

defineExpose({
  toggleSidebar,
  isCollapsed
});
</script>
