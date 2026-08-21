<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Banner -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-outline-variant/60 shadow-sm gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-3xl">fact_check</span>
            <span>Trung Tâm Phê Duyệt Quản Lý (Management Approvals)</span>
          </h1>
          <span class="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-xs">
            {{ currentEvent.name || 'Tech Summit Asia' }}
          </span>
        </div>
        <p class="text-xs text-on-surface-variant mt-1 font-medium">Xem xét, kiểm soát rủi ro và Phê duyệt / Từ chối các khoản chi ngân sách, nghiệm thu công việc, truyền thông và hậu cần VIP.</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm">
          <span class="material-symbols-outlined text-[16px]">pending_actions</span>
          <span>Cần xử lý: {{ summary.pending }} yêu cầu</span>
        </span>
      </div>
    </div>

    <!-- 4 APPROVAL KPI STATS CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
            <span class="material-symbols-outlined">assignment</span>
          </div>
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">Approvals</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Yêu Cầu Trình Duyệt</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">{{ summary.total }} Yêu cầu</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Từ các Ban chuyên môn</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-amber-50 rounded-lg text-amber-600">
            <span class="material-symbols-outlined">pending_actions</span>
          </div>
          <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Action Needed</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Chờ Ban Điều Hành Phê Duyệt</p>
          <h2 class="text-2xl font-extrabold text-amber-700 mt-1">{{ summary.pending }} Yêu cầu</h2>
          <p class="text-[10px] text-amber-600 font-bold mt-1">⚠️ Cần quyết định xử lý</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <span class="material-symbols-outlined">task_alt</span>
          </div>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Approved</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Đã Phê Duyệt Chính Thức</p>
          <h2 class="text-2xl font-extrabold text-emerald-700 mt-1">{{ summary.approved }} Yêu cầu</h2>
          <p class="text-[10px] text-emerald-600 font-bold mt-1">✓ Đã thông qua thực thi</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-red-50 rounded-lg text-red-600">
            <span class="material-symbols-outlined">cancel</span>
          </div>
          <span class="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded">Rejected</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Đã Từ Chối Trả Về</p>
          <h2 class="text-2xl font-extrabold text-red-700 mt-1">{{ summary.rejected }} Yêu cầu</h2>
          <p class="text-[10px] text-red-600 font-bold mt-1">Yêu cầu chỉnh sửa lại</p>
        </div>
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
            placeholder="Tìm tên yêu cầu, mã, người trình..." 
            class="w-full pl-8 pr-3 py-1.5 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
          >
        </div>
        <select v-model="selectedTypeFilter" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Loại Yêu Cầu</option>
          <option value="Budget">🟣 Kinh phí Ngân sách</option>
          <option value="Task">🔵 Nghiệm thu Công việc</option>
          <option value="Media">🟡 Bài viết Truyền thông</option>
          <option value="VIP">🟢 Hậu cần VIP Diễn giả</option>
        </select>
        <select v-model="selectedStatusFilter" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Trạng thái</option>
          <option value="Pending">🟡 Chờ phê duyệt</option>
          <option value="Approved">🟢 Đã phê duyệt</option>
          <option value="Rejected">🔴 Từ chối</option>
        </select>
      </div>
      <div class="text-xs text-on-surface-variant font-medium">
        Hiển thị: <b class="text-on-surface">{{ filteredApprovals.length }}</b> / {{ approvalsList.length }} yêu cầu
      </div>
    </div>

    <!-- MANAGEMENT APPROVALS DATA TABLE (8 INDEPENDENT COLUMNS) -->
    <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden p-4 space-y-4">
      <div class="overflow-x-auto overflow-y-auto max-h-[550px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1300px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[260px] bg-surface-container-low">Mã & Nội Dung Yêu Cầu Trình Duyệt</th>
              <th class="py-2.5 px-3 min-w-[160px] bg-surface-container-low">Loại Yêu Cầu</th>
              <th class="py-2.5 px-3 min-w-[140px] bg-surface-container-low">Giá Trị / Phạm Vi</th>
              <th class="py-2.5 px-3 min-w-[170px] bg-surface-container-low">Người Trình Duyệt</th>
              <th class="py-2.5 px-3 min-w-[130px] bg-surface-container-low">Thời Gian Trình</th>
              <th class="py-2.5 px-3 min-w-[130px] text-center bg-surface-container-low">Trạng Thái</th>
              <th class="py-2.5 px-3 min-w-[180px] bg-surface-container-low">Người & Ngày Phê Duyệt</th>
              <th class="py-2.5 px-3 min-w-[160px] text-right bg-surface-container-low">Thao Tác Phê Duyệt</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="apr in filteredApprovals" :key="apr.id" class="hover:bg-surface-container-low transition-colors text-[11px]">
              <!-- 1. Mã & Nội dung -->
              <td class="py-2.5 px-3 font-bold text-on-surface">
                <div class="flex items-start gap-2">
                  <span class="px-2 py-0.5 bg-surface-container rounded font-mono text-[10px] text-primary shrink-0">{{ apr.id }}</span>
                  <div>
                    <p class="font-extrabold text-on-surface leading-snug">{{ apr.title }}</p>
                    <p class="text-[10px] text-on-surface-variant font-normal truncate mt-0.5" v-if="apr.notes">{{ apr.notes }}</p>
                  </div>
                </div>
              </td>

              <!-- 2. Loại yêu cầu -->
              <td class="py-2.5 px-3 whitespace-nowrap">
                <span :class="['px-2.5 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 w-fit', getTypeBadgeStyle(apr.type)]">
                  <span class="material-symbols-outlined text-[14px]">{{ getTypeIcon(apr.type) }}</span>
                  <span>{{ getTypeNameVi(apr.type) }}</span>
                </span>
              </td>

              <!-- 3. Giá trị -->
              <td class="py-2.5 px-3 font-mono font-extrabold text-primary whitespace-nowrap">
                {{ apr.valueDisplay }}
              </td>

              <!-- 4. Người trình -->
              <td class="py-2.5 px-3 whitespace-nowrap">
                <p class="font-bold text-on-surface text-xs">{{ apr.requesterName }}</p>
                <p class="text-[10px] text-on-surface-variant">{{ apr.requesterRole }}</p>
              </td>

              <!-- 5. Thời gian trình -->
              <td class="py-2.5 px-3 font-mono text-on-surface-variant whitespace-nowrap">
                {{ apr.requestDate }}
              </td>

              <!-- 6. Trạng thái -->
              <td class="py-2.5 px-3 text-center whitespace-nowrap">
                <span :class="['px-2.5 py-0.5 rounded-full text-[10px] font-bold border', getStatusBadgeStyle(apr.status)]">
                  {{ getStatusNameVi(apr.status) }}
                </span>
              </td>

              <!-- 7. Người & Ngày phê duyệt -->
              <td class="py-2.5 px-3 whitespace-nowrap">
                <div v-if="apr.approverName">
                  <p class="font-bold text-emerald-800 text-xs">✓ {{ apr.approverName }}</p>
                  <p class="text-[10px] text-on-surface-variant font-mono">{{ apr.approvedDate }}</p>
                </div>
                <span v-else class="text-on-surface-variant italic text-[10px]">Chờ Trưởng BTC xử lý</span>
              </td>

              <!-- 8. Thao tác Phê duyệt -->
              <td class="py-2.5 px-3 text-right whitespace-nowrap">
                <div v-if="apr.status === 'Pending'" class="flex items-center justify-end gap-1.5">
                  <button 
                    @click="handleApprove(apr.id, apr.title)" 
                    class="px-2.5 py-1 bg-emerald-600 text-white font-bold text-[10px] rounded-lg hover:bg-emerald-700 shadow-sm flex items-center gap-0.5"
                  >
                    <span class="material-symbols-outlined text-[13px]">check</span>
                    <span>Phê Duyệt</span>
                  </button>
                  <button 
                    @click="handleReject(apr.id, apr.title)" 
                    class="px-2.5 py-1 bg-red-600 text-white font-bold text-[10px] rounded-lg hover:bg-red-700 shadow-sm flex items-center gap-0.5"
                  >
                    <span class="material-symbols-outlined text-[13px]">close</span>
                    <span>Từ Chối</span>
                  </button>
                </div>
                <span v-else class="text-on-surface-variant font-bold text-[10px]">Đã xử lý xong</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { getApprovals, approveRequest, rejectRequest, calculateApprovalSummary, APPROVAL_TYPES, APPROVAL_STATUSES } from '../mock/approvals.js';

const currentEvent = ref({});
const approvalsList = ref([]);
const summary = ref({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0
});

const searchQuery = ref('');
const selectedTypeFilter = ref('');
const selectedStatusFilter = ref('');

function loadApprovalsData() {
  currentEvent.value = getCurrentEvent();
  approvalsList.value = getApprovals(currentEvent.value.id);
  summary.value = calculateApprovalSummary(currentEvent.value.id);
}

const filteredApprovals = computed(() => {
  return approvalsList.value.filter(a => {
    const matchQuery = !searchQuery.value || 
      (a.title && a.title.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (a.id && a.id.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (a.requesterName && a.requesterName.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchType = !selectedTypeFilter.value || a.type === selectedTypeFilter.value;
    const matchStatus = !selectedStatusFilter.value || a.status === selectedStatusFilter.value;
    return matchQuery && matchType && matchStatus;
  });
});

function getTypeBadgeStyle(type) {
  const map = APPROVAL_TYPES;
  return map[type] ? map[type].color : 'bg-gray-100 text-gray-700 border-gray-300';
}

function getTypeIcon(type) {
  const map = APPROVAL_TYPES;
  return map[type] ? map[type].icon : 'task';
}

function getTypeNameVi(type) {
  const map = APPROVAL_TYPES;
  return map[type] ? map[type].nameVi : type;
}

function getStatusBadgeStyle(status) {
  const map = APPROVAL_STATUSES;
  return map[status] ? map[status].color : 'bg-gray-100 text-gray-700 border-gray-300';
}

function getStatusNameVi(status) {
  const map = APPROVAL_STATUSES;
  return map[status] ? map[status].nameVi : status;
}

function handleApprove(id, title) {
  const notes = prompt(`Ghi chú Phê duyệt cho yêu cầu [${title}] (Tùy chọn):`);
  approveRequest(id, notes);
  alert(`ĐÃ PHÊ DUYỆT thành công yêu cầu [${title}]!`);
  loadApprovalsData();
}

function handleReject(id, title) {
  const reason = prompt(`Nhập lý do từ chối yêu cầu [${title}]:`);
  if (reason !== null) {
    rejectRequest(id, reason);
    alert(`ĐÃ TỪ CHỐI yêu cầu [${title}]!`);
    loadApprovalsData();
  }
}

onMounted(() => {
  loadApprovalsData();
});
</script>
