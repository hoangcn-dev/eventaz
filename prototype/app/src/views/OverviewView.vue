<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Banner -->
    <div class="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/60 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold text-on-surface tracking-tight">{{ currentEvent.name || 'Tech Summit Asia 2024' }}</h1>
          <span :class="['px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider', getStatusBadgeColor(currentEvent.status)]">
            {{ currentEvent.status || 'Ongoing' }}
          </span>
        </div>
        <p class="text-on-surface-variant text-xs mt-1 font-medium flex items-center gap-2">
          <span>📍 {{ currentEvent.location || 'Trung tâm Hội nghị Quốc gia' }}</span>
          <span>•</span>
          <span>📅 {{ currentEvent.startDate }} - {{ currentEvent.endDate }}</span>
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button class="px-4 py-2 bg-surface-container hover:bg-surface-container-high border border-outline-variant rounded-xl text-xs font-bold text-on-surface transition-all flex items-center gap-1.5 shadow-sm">
          <span class="material-symbols-outlined text-[16px]">edit</span>
          <span>Chỉnh sửa thông tin</span>
        </button>
        <button class="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow hover:bg-primary-hover transition-all flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">print</span>
          <span>Xuất báo cáo tổng quan</span>
        </button>
      </div>
    </div>

    <!-- Quick Stats Cards (FR-01.5 Progress Metrics) -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
            <span class="material-symbols-outlined">trending_up</span>
          </div>
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">Live Metrics</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tiến Độ Tổng Thể Sự Kiện</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">{{ overallProgress }}%</h2>
          <div class="w-full bg-surface-container-low h-2 rounded-full mt-2 overflow-hidden">
            <div class="bg-primary h-full rounded-full transition-all duration-500" :style="{ width: overallProgress + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <span class="material-symbols-outlined">account_tree</span>
          </div>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">WBS Tracking</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Nhóm WBS Đang Chạy</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">{{ (currentEvent.wbs || []).length }} Nhóm</h2>
          <p class="text-[10px] text-on-surface-variant mt-1 font-semibold">Được phân bổ theo 4 Giai đoạn</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-purple-50 rounded-lg text-secondary">
            <span class="material-symbols-outlined">task</span>
          </div>
          <span class="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">Tasks RACI</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Công Việc Đã Hoàn Thành</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">{{ completedTaskCount }} / {{ eventTasks.length }} Tasks</h2>
          <p class="text-[10px] text-emerald-600 font-bold mt-1">✓ {{ Math.round((completedTaskCount / (eventTasks.length || 1)) * 100) }}% Hoàn thành</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-amber-50 rounded-lg text-amber-600">
            <span class="material-symbols-outlined">payments</span>
          </div>
          <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Ngân Sách</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Dự Toán Ngân Sách</p>
          <h2 class="text-xl font-extrabold text-on-surface mt-1">500.000.000 VNĐ</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Đang thực chi: 320.000.000 VNĐ (64%)</p>
        </div>
      </div>
    </div>

    <!-- Main Layout: Timeline Tree & Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <!-- Left: Event Process Tree with Dynamic WBS Stage Progress (FR-01.1 & FR-01.5) -->
      <div class="lg:col-span-2 flex flex-col min-h-[600px] bg-white rounded-xl border border-outline-variant/60 shadow-sm p-6 space-y-4">
        <div class="pb-4 flex justify-between items-center shrink-0 border-b border-outline-variant">
          <div>
            <h3 class="text-lg font-extrabold flex items-center gap-2 text-on-surface">
              <span class="material-symbols-outlined text-primary">account_tree</span>
              <span>Cây Tiến Trình Sự Kiện & Dynamic WBS Stage Tracking</span>
            </h3>
            <p class="text-xs text-on-surface-variant">Tự động tính % hoàn thành 4 Giai đoạn dựa trên tiến độ công việc thuộc các Nhóm WBS</p>
          </div>
          <button @click="scrollToBottom" class="px-3 py-1.5 hover:bg-surface-container text-xs font-bold rounded-lg border border-outline-variant flex items-center gap-1 transition-all active:scale-95 bg-white">
            <span class="material-symbols-outlined text-[16px]">south</span>
            <span>Cuộn xuống cuối</span>
          </button>
        </div>
        
        <div ref="treeScrollContainer" class="overflow-y-auto flex-1 custom-scrollbar scroll-smooth pt-2">
          <div class="relative space-y-8 py-2">
            <!-- Vertical Line -->
            <div class="absolute left-[209px] top-6 bottom-6 w-0.5 bg-outline-variant/60"></div>

            <div v-for="stage in stagesProgress" :key="stage.id" class="space-y-3">
              <!-- Phase Header Node -->
              <div class="phase-header flex items-center relative z-10">
                <div class="w-[190px] text-right pr-6 shrink-0">
                  <span class="text-xs font-bold text-primary font-mono block">GIAI ĐOẠN {{ stage.id }}</span>
                  <span class="text-[10px] text-on-surface-variant font-semibold">Tỉ lệ hoàn thành: {{ stage.progressPercent }}%</span>
                </div>
                <div :class="['w-10 h-10 rounded-full border-4 border-white flex items-center justify-center text-white shrink-0 shadow-md font-bold text-sm', stage.colorClass]">
                  {{ stage.id }}
                </div>
                <div class="pl-6 flex-1 flex justify-between items-center">
                  <div>
                    <h4 :class="['font-extrabold text-sm uppercase tracking-wider', stage.textColor]">{{ stage.name }}</h4>
                    <p class="text-[11px] text-on-surface-variant font-medium">Bao gồm {{ stage.wbsItems.length }} Nhóm WBS • {{ stage.completedTasks }}/{{ stage.totalTasks }} Tasks Hoàn thành</p>
                  </div>
                  <span class="px-2.5 py-1 text-xs font-bold rounded-full bg-surface-container text-on-surface font-mono">
                    {{ stage.progressPercent }}%
                  </span>
                </div>
              </div>

              <!-- Phase Child WBS Nodes -->
              <div 
                v-for="w in stage.wbsItems" 
                :key="w.id" 
                class="tree-node-item flex items-center pl-4 relative z-10 hover:bg-surface-container-low/70 py-2.5 px-3 rounded-xl transition-colors border border-transparent hover:border-outline-variant/40"
              >
                <div class="w-[190px] text-right pr-6 shrink-0">
                  <span class="text-[11px] text-on-surface-variant font-mono font-bold block">{{ w.id }}</span>
                </div>
                <div class="w-10 h-10 flex items-center justify-center shrink-0">
                  <div :class="['w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm', w.progressPercent === 100 ? 'bg-emerald-500' : 'bg-primary']"></div>
                </div>
                <div class="pl-6 flex-1 min-w-0 flex justify-between items-center">
                  <div>
                    <p class="font-bold text-xs text-on-surface truncate flex items-center gap-1.5">
                      <span>{{ w.name }}</span>
                      <span class="text-[10px] font-normal text-on-surface-variant">(Trưởng nhóm: {{ w.leadName }})</span>
                    </p>
                    <p class="text-[10px] text-on-surface-variant font-medium">Tiến độ WBS: {{ w.completedCount }}/{{ w.totalCount }} công việc</p>
                  </div>
                  <div class="flex items-center gap-3 shrink-0">
                    <div class="w-24 bg-surface-container-low h-2 rounded-full overflow-hidden border border-outline-variant/40">
                      <div class="bg-primary h-full rounded-full transition-all duration-300" :style="{ width: w.progressPercent + '%' }"></div>
                    </div>
                    <span :class="['text-[11px] font-bold font-mono px-2 py-0.5 rounded', w.progressPercent === 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800']">
                      {{ w.progressPercent }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Live Activity Feed -->
      <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm flex flex-col p-6 space-y-4">
        <div class="pb-3 border-b border-outline-variant flex justify-between items-center">
          <h3 class="text-base font-extrabold text-on-surface">Activity Feed Nhật Ký (FR-01.4)</h3>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">Live Stream</span>
        </div>
        <div class="space-y-4 text-xs max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
          <div class="flex gap-3 pb-3 border-b border-outline-variant/40">
            <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div>
              <p class="font-bold text-on-surface">Hoàn thành Khảo sát Mặt bằng</p>
              <p class="text-[11px] text-on-surface-variant">Trần Thị Hậu Cần đã đính kèm minh chứng So_Do_NCC_v2.pdf và chuyển trạng thái sang Done.</p>
              <p class="text-[10px] text-outline font-mono mt-1">10 phút trước • bởi Trần Thị Hậu Cần</p>
            </div>
          </div>
          <div class="flex gap-3 pb-3 border-b border-outline-variant/40">
            <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[18px]">add_task</span>
            </div>
            <div>
              <p class="font-bold text-on-surface">Tạo mới Nhóm WBS: An ninh & Hạ tầng</p>
              <p class="text-[11px] text-on-surface-variant">Nguyễn Văn Trưởng đã gán Trưởng nhóm Vũ Anh Kỹ Thuật cho Giai đoạn 2.</p>
              <p class="text-[10px] text-outline font-mono mt-1">45 phút trước • bởi Nguyễn Văn Trưởng</p>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[18px]">edit_note</span>
            </div>
            <div>
              <p class="font-bold text-on-surface">Phê duyệt Kịch bản Run-of-Show</p>
              <p class="text-[11px] text-on-surface-variant">Lê Văn Nội Dung đã cập nhật kịch bản Đêm Khai mạc.</p>
              <p class="text-[10px] text-outline font-mono mt-1">2 giờ trước • bởi Lê Văn Nội Dung</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCurrentEvent, EVENT_STAGES } from '../mock/events.js';
import { getTasks } from '../mock/tasks.js';

const currentEvent = ref({});
const eventTasks = ref([]);
const treeScrollContainer = ref(null);

function loadOverviewData() {
  currentEvent.value = getCurrentEvent();
  eventTasks.value = getTasks(currentEvent.value.id);
}

const completedTaskCount = computed(() => {
  return eventTasks.value.filter(t => t.status === 'Done').length;
});

const overallProgress = computed(() => {
  if (!eventTasks.value || eventTasks.value.length === 0) return 0;
  return Math.round((completedTaskCount.value / eventTasks.value.length) * 100);
});

const stagesProgress = computed(() => {
  const wbsList = currentEvent.value.wbs || [];
  
  return EVENT_STAGES.map(stage => {
    // Find all WBS categories assigned to this stage phaseId
    const stageWbs = wbsList.filter(w => (w.phaseId || 1) === stage.id);

    let stageTotalTasks = 0;
    let stageCompletedTasks = 0;

    const wbsItemsWithProgress = stageWbs.map(w => {
      const wbsTasks = eventTasks.value.filter(t => t.wbsId === w.id);
      const totalCount = wbsTasks.length;
      const completedCount = wbsTasks.filter(t => t.status === 'Done').length;
      const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

      stageTotalTasks += totalCount;
      stageCompletedTasks += completedCount;

      return {
        ...w,
        totalCount,
        completedCount,
        progressPercent
      };
    });

    const progressPercent = stageTotalTasks > 0 ? Math.round((stageCompletedTasks / stageTotalTasks) * 100) : 0;

    const colorMap = {
      1: { colorClass: 'bg-emerald-500', textColor: 'text-emerald-600' },
      2: { colorClass: 'bg-blue-600', textColor: 'text-blue-600' },
      3: { colorClass: 'bg-amber-500', textColor: 'text-amber-600' },
      4: { colorClass: 'bg-purple-600', textColor: 'text-purple-600' }
    };

    return {
      id: stage.id,
      name: stage.name,
      progressPercent,
      totalTasks: stageTotalTasks,
      completedTasks: stageCompletedTasks,
      wbsItems: wbsItemsWithProgress,
      colorClass: colorMap[stage.id].colorClass,
      textColor: colorMap[stage.id].textColor
    };
  });
});

function scrollToBottom() {
  if (treeScrollContainer.value) {
    treeScrollContainer.value.scrollTop = treeScrollContainer.value.scrollHeight;
  }
}

function getStatusBadgeColor(status) {
  const map = {
    'Draft': 'bg-slate-100 text-slate-700 border border-slate-300',
    'Planning': 'bg-blue-100 text-blue-800 border border-blue-300',
    'Preparing': 'bg-indigo-100 text-indigo-800 border border-indigo-300',
    'Ongoing': 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    'Closed': 'bg-amber-100 text-amber-800 border border-amber-300',
    'Archived': 'bg-gray-100 text-gray-700 border border-gray-300'
  };
  return map[status] || 'bg-slate-100 text-slate-700';
}

onMounted(() => {
  loadOverviewData();
});
</script>
