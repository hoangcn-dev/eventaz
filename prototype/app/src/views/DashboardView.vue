<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Banner Header Dashboard -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/60">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="px-2.5 py-0.5 bg-primary/10 text-primary text-[11px] font-bold rounded uppercase">Bảng Điều Hành Cấp Tổ Chức</span>
          <span class="text-on-surface-variant text-xs">EventAZ Portfolio Manager</span>
        </div>
        <h1 class="font-display-lg text-[28px] font-extrabold text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[32px]">dashboard</span>
          <span>Tổng quan Tổ chức Ban Tổ Chức</span>
        </h1>
        <p class="text-on-surface-variant text-sm mt-1">Theo dõi danh mục tất cả sự kiện, tiến độ tổng thể, doanh thu và hoạt động nhân sự toàn bộ công ty/tổ chức.</p>
      </div>
      <div class="flex items-center gap-3">
        <router-link to="/templates" class="px-4 py-2.5 bg-surface-container border border-outline-variant text-on-surface font-bold rounded-lg shadow-sm hover:bg-surface-container-high transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-[20px]">folder_special</span>
          <span>Thư viện Template</span>
        </router-link>
        <button @click="$emit('open-create-event')" class="px-5 py-2.5 bg-primary text-white font-bold rounded-lg shadow hover:shadow-lg active:scale-95 transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-[20px]">add</span>
          <span>Tạo Sự kiện Mới</span>
        </button>
      </div>
    </div>

    <!-- KPI Dashboard Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[28px]">event</span>
        </div>
        <div>
          <p class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Tổng Sự kiện</p>
          <p class="text-2xl font-extrabold text-on-surface">{{ events.length }}</p>
        </div>
      </div>
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[28px]">payments</span>
        </div>
        <div>
          <p class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Doanh thu Toàn sàn</p>
          <p class="text-2xl font-extrabold text-emerald-600">1.450.000.000 ₫</p>
        </div>
      </div>
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[28px]">confirmation_number</span>
        </div>
        <div>
          <p class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Vé Đã Phát Hành</p>
          <p class="text-2xl font-extrabold text-purple-600">3.850 / 5.000</p>
        </div>
      </div>
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[28px]">groups</span>
        </div>
        <div>
          <p class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Nhân sự Tổ chức</p>
          <p class="text-2xl font-extrabold text-amber-600">{{ usersCount }}</p>
        </div>
      </div>
    </div>

    <!-- Organization Events Portfolio Section -->
    <div class="bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm space-y-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <h3 class="font-headline-sm font-bold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">event_available</span>
            <span>Danh mục Sự kiện của Tổ chức</span>
          </h3>
          <p class="text-xs text-on-surface-variant">Quản lý và chuyển đổi nhanh giữa các sự kiện trong tổ chức.</p>
        </div>
        <div class="flex items-center gap-3">
          <select v-model="filterStatus" class="px-3 py-1.5 text-sm border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary">
            <option value="">Tất cả Trạng thái</option>
            <option value="Preparing">Preparing (Đang chuẩn bị)</option>
            <option value="Draft">Draft (Nháp)</option>
            <option value="Ongoing">Ongoing (Đang diễn ra)</option>
            <option value="Closed">Closed (Đã đóng)</option>
          </select>
        </div>
      </div>

      <!-- Events Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="evt in filteredEvents" 
          :key="evt.id" 
          class="border border-outline-variant/60 rounded-xl p-5 bg-surface-container-lowest hover:shadow-md transition-all flex flex-col justify-between space-y-4"
        >
          <div class="space-y-2">
            <div class="flex justify-between items-start gap-2">
              <span :class="['px-2.5 py-0.5 text-[11px] font-bold rounded-full border', getStatusBadgeClass(evt.status)]">
                Trạng thái: {{ evt.status }}
              </span>
              <span class="text-xs font-mono font-semibold text-primary">{{ evt.id }}</span>
            </div>
            <h4 @click="openEvent(evt.id)" class="font-extrabold text-lg text-on-surface hover:text-primary transition-colors cursor-pointer">
              {{ evt.name }}
            </h4>
            <p class="text-xs text-on-surface-variant flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">location_on</span>
              <span>{{ evt.location || 'Trung tâm Hội nghị National Convention Center' }}</span>
            </p>
          </div>

          <div class="space-y-3 pt-3 border-t border-outline-variant/40">
            <div class="flex justify-between items-center text-xs">
              <span class="text-on-surface-variant">Thời gian tổ chức:</span>
              <span class="font-bold text-on-surface">{{ evt.startDate || '15/10/2024' }} - {{ evt.endDate || '17/10/2024' }}</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-on-surface-variant">Trưởng BAN Tổ Chức:</span>
              <span class="font-bold text-primary">{{ evt.organizer || 'Nguyễn Văn Trưởng' }}</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-on-surface-variant">Số nhóm hạng mục WBS:</span>
              <span class="font-bold text-on-surface">{{ evt.wbs ? evt.wbs.length : 4 }} nhóm</span>
            </div>
          </div>

          <div class="flex gap-2 pt-2">
            <button @click="openEvent(evt.id)" class="flex-1 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-1 shadow-sm">
              <span class="material-symbols-outlined text-[16px]">visibility</span>
              <span>Quản lý Sự kiện</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getEvents, setCurrentEventId } from '../mock/events.js';
import { getUsers } from '../mock/users.js';

defineEmits(['open-create-event']);
const router = useRouter();

const events = ref([]);
const usersCount = ref(0);
const filterStatus = ref('');

const filteredEvents = computed(() => {
  if (!filterStatus.value) return events.value;
  return events.value.filter(e => e.status === filterStatus.value);
});

function getStatusBadgeClass(status) {
  const map = {
    'Draft': 'bg-slate-100 text-slate-700 border-slate-300',
    'Planning': 'bg-blue-100 text-blue-800 border-blue-300',
    'Preparing': 'bg-amber-100 text-amber-800 border-amber-300',
    'Ongoing': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'Closed': 'bg-purple-100 text-purple-800 border-purple-300',
    'Archived': 'bg-gray-200 text-gray-700 border-gray-400'
  };
  return map[status] || 'bg-gray-100 text-gray-700 border-gray-300';
}

function openEvent(eventId) {
  setCurrentEventId(eventId);
  router.push('/event/overview');
}

onMounted(() => {
  events.value = getEvents();
  usersCount.value = getUsers().length;
});
</script>
