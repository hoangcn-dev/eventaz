<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Banner -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-outline-variant/60 shadow-sm gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-3xl">theater_comedy</span>
            <span>Kịch Bản Chi Tiết Run-of-Show & Sân Khấu (Module 07)</span>
          </h1>
          <span class="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-xs">
            {{ currentEvent.name || 'Tech Summit Asia' }}
          </span>
        </div>
        <p class="text-xs text-on-surface-variant mt-1 font-medium">Lập kịch bản mốc thời gian từng phút (Cue-by-Cue), điều phối âm thanh, màn hình LED, ánh sáng và Stage Control real-time.</p>
      </div>
      <button @click="showCreateModal = true" class="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-[18px]">add</span>
        <span>Thêm Hạng Mục Kịch Bản</span>
      </button>
    </div>

    <!-- 4 RUN-OF-SHOW KPI STATS CARDS (FR-07.5) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
            <span class="material-symbols-outlined">schedule</span>
          </div>
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">Total Duration</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Thời Lượng Chương Trình</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">{{ summary.totalDurationMin }} Phút</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Tương đương {{ (summary.totalDurationMin / 60).toFixed(1) }} giờ sự kiện</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-purple-50 rounded-lg text-secondary">
            <span class="material-symbols-outlined">queue_music</span>
          </div>
          <span class="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">Cue Sheets</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Số Tiết Mục / Cue</p>
          <h2 class="text-2xl font-extrabold text-secondary mt-1">{{ summary.total }} Hạng mục</h2>
          <p class="text-[10px] text-secondary font-bold mt-1">Phân bổ tín hiệu kỹ thuật riêng</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <span class="material-symbols-outlined">task_alt</span>
          </div>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Completed Rate</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tiết Mục Đã Hoàn Thành</p>
          <h2 class="text-2xl font-extrabold text-emerald-700 mt-1">{{ summary.completionRate }}%</h2>
          <p class="text-[10px] text-emerald-600 font-bold mt-1">✓ {{ summary.completedCount }} / {{ summary.total }} Tiết mục xong</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-amber-50 rounded-lg text-amber-600">
            <span class="material-symbols-outlined">hourglass_bottom</span>
          </div>
          <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Remaining Time</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Thời Gian Còn Lại Dự Kiến</p>
          <h2 class="text-2xl font-extrabold text-amber-700 mt-1">{{ summary.remainingDurationMin }} Phút</h2>
          <p class="text-[10px] text-amber-600 font-bold mt-1">Chờ điều phối sảnh sân khấu</p>
        </div>
      </div>
    </div>

    <!-- STAGE LIVE MODE CONTROL BAR (FR-07.3) -->
    <div class="bg-slate-900 text-white rounded-2xl p-5 shadow-xl border border-slate-700 space-y-4">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold animate-pulse">
            <span class="material-symbols-outlined text-2xl">sensors</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 bg-red-600 text-white font-mono font-bold text-[10px] rounded uppercase animate-pulse">LIVE ON STAGE</span>
              <h3 class="font-extrabold text-base text-white">Bảng Điều Phối Sân Khấu Real-time (Stage Control — FR-07.3)</h3>
            </div>
            <p class="text-xs text-slate-300 mt-0.5 font-medium">Bấm chuyển Cue tiếp theo để cập nhật trạng thái trực tiếp cho các đội Kỹ thuật Sound/LED/Lighting.</p>
          </div>
        </div>

        <button 
          @click="handleAdvanceNext" 
          class="px-6 py-3 bg-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg hover:bg-emerald-400 active:scale-95 transition-all flex items-center gap-2 shrink-0"
        >
          <span class="material-symbols-outlined text-[20px]">skip_next</span>
          <span>CHUYỂN CUE TIẾP THEO (NEXT)</span>
        </button>
      </div>

      <!-- Current Ongoing Cue Detail Display -->
      <div v-if="currentOngoingCue" class="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 space-y-3">
        <div class="flex flex-wrap justify-between items-center gap-2 border-b border-slate-700 pb-2">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 font-mono font-extrabold text-xs rounded border border-emerald-500/40">
              {{ currentOngoingCue.timeSlot }} ({{ currentOngoingCue.durationMin }} Phút)
            </span>
            <h4 class="font-extrabold text-sm text-white">{{ currentOngoingCue.title }}</h4>
          </div>
          <span class="text-xs text-slate-300 font-bold">
            👤 Diễn giả: <b class="text-emerald-400">{{ currentOngoingCue.performer }}</b>
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60 space-y-1">
            <p class="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">volume_up</span>
              <span>Audio Cue:</span>
            </p>
            <p class="font-mono text-emerald-300 font-semibold">{{ currentOngoingCue.cues.sound }}</p>
          </div>
          <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60 space-y-1">
            <p class="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">tv</span>
              <span>LED Visual Cue:</span>
            </p>
            <p class="font-mono text-blue-300 font-semibold">{{ currentOngoingCue.cues.led }}</p>
          </div>
          <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60 space-y-1">
            <p class="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">light_mode</span>
              <span>Lighting Cue:</span>
            </p>
            <p class="font-mono text-amber-300 font-semibold">{{ currentOngoingCue.cues.light }}</p>
          </div>
        </div>
      </div>
      <div v-else class="bg-slate-800/80 p-4 rounded-xl text-center text-xs text-slate-400 italic">
        Chưa có tiết mục nào đang LIVE. Bấm "CHUYỂN CUE TIẾP THEO" để bắt đầu chương trình.
      </div>
    </div>

    <!-- SEARCH & FILTER BAR -->
    <div class="bg-white p-3.5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
      <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto text-xs">
        <div class="relative w-full sm:w-72">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Tìm hạng mục, kịch bản MC, diễn giả..." 
            class="w-full pl-8 pr-3 py-1.5 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
          >
        </div>
        <select v-model="selectedStatusFilter" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Trạng thái</option>
          <option value="Ongoing">🟢 Đang diễn ra (Live)</option>
          <option value="Scheduled">🟡 Chờ lên sóng</option>
          <option value="Completed">⚪ Đã hoàn thành</option>
        </select>
      </div>
      <div class="text-xs text-on-surface-variant font-medium">
        Hiển thị: <b class="text-on-surface">{{ filteredCues.length }}</b> / {{ cuesList.length }} tiết mục kịch bản
      </div>
    </div>

    <!-- RUN-OF-SHOW DATA TABLE (9 INDEPENDENT COLUMNS - FR-07.1 & FR-07.2) -->
    <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden p-4 space-y-4">
      <div class="overflow-x-auto overflow-y-auto max-h-[550px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1400px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[130px] bg-surface-container-low">Mốc Thời Gian</th>
              <th class="py-2.5 px-3 min-w-[220px] bg-surface-container-low">Hạng Mục / Tiết Mục Sân Khấu</th>
              <th class="py-2.5 px-3 min-w-[180px] bg-surface-container-low">Diễn Giả / Nhân Vật Chính</th>
              <th class="py-2.5 px-3 min-w-[260px] bg-surface-container-low">Nội Dung Kịch Bản Lời Thoại MC</th>
              <th class="py-2.5 px-3 min-w-[180px] bg-surface-container-low">Tín Hiệu Âm Thanh (Audio Cue)</th>
              <th class="py-2.5 px-3 min-w-[200px] bg-surface-container-low">Tín Hiệu LED & Ánh Sáng</th>
              <th class="py-2.5 px-3 min-w-[160px] bg-surface-container-low">Điều Phối Sân Khấu</th>
              <th class="py-2.5 px-3 min-w-[140px] text-center bg-surface-container-low">Trạng Thái</th>
              <th class="py-2.5 px-3 min-w-[70px] text-right bg-surface-container-low">Thao Tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="c in filteredCues" :key="c.id" :class="['hover:bg-surface-container-low transition-colors text-[11px]', c.status === 'Ongoing' ? 'bg-emerald-50/60 font-bold' : '']">
              <!-- 1. Mốc thời gian -->
              <td class="py-2.5 px-3 whitespace-nowrap font-mono">
                <p class="font-bold text-primary text-xs">{{ c.timeSlot }}</p>
                <p class="text-[10px] text-on-surface-variant font-semibold">⏱️ {{ c.durationMin }} Phút</p>
              </td>

              <!-- 2. Hạng mục tiết mục -->
              <td class="py-2.5 px-3 font-bold text-on-surface">
                <p class="font-extrabold text-on-surface text-xs leading-snug">{{ c.title }}</p>
                <p class="text-[10px] text-on-surface-variant font-mono mt-0.5">ID: {{ c.id }}</p>
              </td>

              <!-- 3. Diễn giả -->
              <td class="py-2.5 px-3 font-bold text-primary whitespace-nowrap">
                {{ c.performer }}
              </td>

              <!-- 4. Kịch bản MC -->
              <td class="py-2.5 px-3">
                <p class="font-medium text-on-surface text-[11px] leading-snug line-clamp-2">{{ c.mcScript }}</p>
              </td>

              <!-- 5. Cue Âm thanh -->
              <td class="py-2.5 px-3">
                <span class="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded font-mono text-[10px] font-bold block truncate">
                  🎵 {{ c.cues.sound }}
                </span>
              </td>

              <!-- 6. Cue LED & Ánh sáng -->
              <td class="py-2.5 px-3 space-y-1">
                <span class="px-2 py-0.5 bg-purple-50 text-purple-800 border border-purple-200 rounded font-mono text-[10px] font-bold block truncate">
                  🖼️ {{ c.cues.led }}
                </span>
                <span class="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded font-mono text-[10px] font-bold block truncate">
                  💡 {{ c.cues.light }}
                </span>
              </td>

              <!-- 7. Điều phối sân khấu -->
              <td class="py-2.5 px-3 font-bold text-on-surface whitespace-nowrap">
                {{ c.stageManager }}
              </td>

              <!-- 8. Trạng thái -->
              <td class="py-2.5 px-3 text-center whitespace-nowrap">
                <select 
                  :value="c.status || 'Scheduled'" 
                  @change="handleStatusChange(c.id, $event.target.value)"
                  :class="['px-2 py-0.5 text-[10px] font-bold rounded-lg border focus:outline-none', getStatusBadgeStyle(c.status)]"
                >
                  <option value="Ongoing">🟢 Đang diễn ra (Live)</option>
                  <option value="Scheduled">🟡 Chờ lên sóng</option>
                  <option value="Completed">⚪ Đã hoàn thành</option>
                </select>
              </td>

              <!-- 9. Thao tác -->
              <td class="py-2.5 px-3 text-right whitespace-nowrap">
                <button @click="handleDeleteCue(c.id, c.title)" class="p-1 hover:bg-red-50 rounded text-red-600 transition-colors" title="Xóa tiết mục">
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL KHỞI TẠO CUE SHEET MỚI (FR-07.4) -->
    <CreateCueModal
      :isOpen="showCreateModal"
      @close="showCreateModal = false"
      @created="loadRosData"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { getRunOfShow, deleteCueItem, changeCueStatus, advanceNextCue, calculateRosSummary, CUE_STATUSES } from '../mock/runofshow.js';
import CreateCueModal from '../components/CreateCueModal.vue';

const currentEvent = ref({});
const cuesList = ref([]);
const summary = ref({
  total: 0,
  totalDurationMin: 0,
  completedCount: 0,
  ongoingCount: 0,
  scheduledCount: 0,
  remainingDurationMin: 0,
  completionRate: 0
});

const searchQuery = ref('');
const selectedStatusFilter = ref('');

const showCreateModal = ref(false);

function loadRosData() {
  currentEvent.value = getCurrentEvent();
  cuesList.value = getRunOfShow(currentEvent.value.id);
  summary.value = calculateRosSummary(currentEvent.value.id);
}

const currentOngoingCue = computed(() => {
  return cuesList.value.find(c => c.status === 'Ongoing');
});

const filteredCues = computed(() => {
  return cuesList.value.filter(c => {
    const matchQuery = !searchQuery.value || 
      (c.title && c.title.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (c.performer && c.performer.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (c.mcScript && c.mcScript.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchStatus = !selectedStatusFilter.value || c.status === selectedStatusFilter.value;
    return matchQuery && matchStatus;
  });
});

function getStatusBadgeStyle(status) {
  const map = CUE_STATUSES;
  return map[status] ? map[status].color : 'bg-gray-100 text-gray-700 border-gray-300';
}

function handleStatusChange(cueId, newStatus) {
  changeCueStatus(cueId, newStatus);
  loadRosData();
}

function handleAdvanceNext() {
  advanceNextCue(currentEvent.value.id);
  loadRosData();
}

function handleDeleteCue(id, title) {
  if (confirm(`Bạn có chắc chắn muốn xóa tiết mục [${title}] khỏi Run-of-Show?`)) {
    deleteCueItem(id);
    alert(`Đã xóa tiết mục [${title}] thành công!`);
    loadRosData();
  }
}

onMounted(() => {
  loadRosData();
});
</script>
