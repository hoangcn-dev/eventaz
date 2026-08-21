<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Banner -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 text-white p-6 rounded-2xl shadow-xl gap-4 border border-slate-800">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold flex items-center gap-2">
            <span class="material-symbols-outlined text-amber-400 text-3xl">verified_user</span>
            <span>Phê Duyệt Hệ Thống (Admin Approvals Center)</span>
          </h1>
          <span class="px-3 py-1 bg-amber-400/20 text-amber-300 font-bold rounded-full text-xs border border-amber-400/40">
            Cấp Admin Tổ Chức
          </span>
        </div>
        <p class="text-xs text-slate-300 mt-1 font-medium">Xét duyệt các yêu cầu bổ sung nhân sự từ Excel, phê duyệt tài khoản công ty và kiểm soát quyền truy cập hệ thống.</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-3.5 py-1.5 bg-amber-500/20 text-amber-300 font-bold rounded-xl text-xs border border-amber-500/40 flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">pending</span>
          <span>Chờ Admin duyệt: {{ pendingCount }} yêu cầu</span>
        </span>
      </div>
    </div>

    <!-- REQUESTS DATA TABLE -->
    <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm p-4 space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">assignment</span>
          <span>Danh Sách Yêu Cầu Trình Duyệt Từ Các Công Ty / Tổ Chức</span>
        </h3>
        <span class="text-xs text-on-surface-variant font-medium">Tổng số: <b class="text-on-surface">{{ requestsList.length }}</b> yêu cầu</span>
      </div>

      <div class="overflow-x-auto overflow-y-auto max-h-[550px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1100px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[130px] bg-surface-container-low">Mã Yêu Cầu</th>
              <th class="py-2.5 px-3 min-w-[240px] bg-surface-container-low">Công Ty / Tổ Chức Trình Duyệt</th>
              <th class="py-2.5 px-3 min-w-[300px] bg-surface-container-low">Nội Dung Yêu Cầu Phê Duyệt</th>
              <th class="py-2.5 px-3 min-w-[140px] bg-surface-container-low font-mono">Thời Gian Trình</th>
              <th class="py-2.5 px-3 min-w-[140px] text-center bg-surface-container-low">Trạng Thái</th>
              <th class="py-2.5 px-3 min-w-[200px] text-right bg-surface-container-low">Thao Tác Admin</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="req in requestsList" :key="req.id" class="hover:bg-surface-container-low transition-colors text-[11px]">
              <!-- 1. Mã yêu cầu -->
              <td class="py-3 px-3 font-mono font-bold text-primary">{{ req.id }}</td>

              <!-- 2. Công ty trình -->
              <td class="py-3 px-3 font-bold text-on-surface">
                <p class="font-extrabold text-on-surface text-xs">{{ req.companyName }}</p>
                <p class="text-[10px] text-on-surface-variant font-mono mt-0.5">ID: {{ req.companyId }}</p>
              </td>

              <!-- 3. Nội dung -->
              <td class="py-3 px-3">
                <p class="font-bold text-on-surface text-xs leading-snug">{{ req.title }}</p>
                <p class="text-[10px] text-on-surface-variant mt-0.5" v-if="req.notes">{{ req.notes }}</p>
              </td>

              <!-- 4. Thời gian -->
              <td class="py-3 px-3 font-mono text-on-surface-variant text-[10px] whitespace-nowrap">
                {{ req.requestDate }}
              </td>

              <!-- 5. Trạng thái -->
              <td class="py-3 px-3 text-center whitespace-nowrap">
                <span :class="['px-2.5 py-0.5 rounded-full text-[10px] font-bold border', getStatusBadgeStyle(req.status)]">
                  {{ req.status === 'Pending' ? '🟡 Chờ Admin duyệt' : (req.status === 'Approved' ? '🟢 Đã phê duyệt' : '🔴 Từ chối') }}
                </span>
              </td>

              <!-- 6. Thao tác -->
              <td class="py-3 px-3 text-right whitespace-nowrap">
                <div class="flex items-center justify-end gap-1.5">
                  <button 
                    @click="openDetailModal(req)" 
                    class="px-2.5 py-1 bg-surface-container hover:bg-primary/10 text-primary font-bold text-[10px] rounded-lg border border-primary/20 transition-all flex items-center gap-1"
                  >
                    <span class="material-symbols-outlined text-[14px]">visibility</span>
                    <span>Xem Chi Tiết</span>
                  </button>
                  <button 
                    v-if="req.status === 'Pending'" 
                    @click="handleApprove(req.id, req.title)" 
                    class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg shadow-sm transition-all flex items-center gap-1"
                  >
                    <span class="material-symbols-outlined text-[14px]">check</span>
                    <span>Phê Duyệt</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- DETAIL MODAL FOR ADMIN REVIEW -->
    <div v-if="showDetailModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
        <!-- Header -->
        <div class="flex justify-between items-center border-b border-outline-variant pb-3">
          <div>
            <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">badge</span>
              <span>Chi Tiết Danh Sách Nhân Sự Cần Admin Phê Duyệt</span>
            </h3>
            <p class="text-xs text-on-surface-variant mt-0.5">{{ activeRequest.companyName }}</p>
          </div>
          <button @click="showDetailModal = false" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Pending Users Table inside Modal -->
        <div class="space-y-2">
          <p class="text-xs font-bold text-on-surface">Danh sách {{ pendingUsersList.length }} nhân sự mới tải lên từ File Excel:</p>

          <div class="border border-outline-variant rounded-xl overflow-hidden max-h-64 overflow-y-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead class="bg-surface-container-low font-bold text-on-surface-variant uppercase text-[10px]">
                <tr>
                  <th class="py-2 px-3">Họ và Tên Nhân Sự</th>
                  <th class="py-2 px-3">Ban Chuyên Môn / Chức Danh</th>
                  <th class="py-2 px-3">Email & SĐT</th>
                  <th class="py-2 px-3 text-center">Trạng Thái</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-outline-variant/40">
                <tr v-for="u in pendingUsersList" :key="u.id" class="hover:bg-surface-container-low font-medium">
                  <td class="py-2.5 px-3 font-bold text-on-surface">
                    <div class="flex items-center gap-2">
                      <img :src="u.avatar" class="w-7 h-7 rounded-full object-cover border" alt="Avatar">
                      <div>
                        <p class="font-bold text-xs">{{ u.name }}</p>
                        <p class="text-[9px] text-on-surface-variant font-mono">ID: {{ u.id }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="py-2.5 px-3">
                    <p class="font-bold text-xs">{{ u.department }}</p>
                    <p class="text-[10px] text-on-surface-variant">{{ u.roleVi || u.role }}</p>
                  </td>
                  <td class="py-2.5 px-3 font-mono text-[10px]">
                    <p>{{ u.email }}</p>
                    <p class="text-on-surface-variant">{{ u.phone }}</p>
                  </td>
                  <td class="py-2.5 px-3 text-center whitespace-nowrap">
                    <span :class="['px-2 py-0.5 rounded text-[9px] font-bold', u.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800']">
                      {{ u.status === 'active' ? '🟢 Chính thức' : '🟡 Chờ phê duyệt' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
          <button type="button" @click="showDetailModal = false" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold text-xs rounded-xl hover:bg-surface-container">Đóng</button>
          <button 
            v-if="activeRequest.status === 'Pending'" 
            type="button" 
            @click="handleApprove(activeRequest.id, activeRequest.title); showDetailModal = false;" 
            class="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow hover:bg-emerald-700 flex items-center gap-1.5"
          >
            <span class="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Phê Duyệt Tất Cả Nhân Sự Này</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getAdminApprovalRequests, approveAdminRequest } from '../mock/admin_approvals.js';
import { getUsers } from '../mock/users.js';

const requestsList = ref([]);
const showDetailModal = ref(false);
const activeRequest = ref({});
const allUsers = ref([]);

function loadData() {
  requestsList.value = getAdminApprovalRequests();
  allUsers.value = getUsers();
}

const pendingCount = computed(() => {
  return requestsList.value.filter(r => r.status === 'Pending').length;
});

const pendingUsersList = computed(() => {
  if (!activeRequest.value || !activeRequest.value.pendingUserIds) return [];
  return allUsers.value.filter(u => activeRequest.value.pendingUserIds.includes(u.id));
});

function getStatusBadgeStyle(status) {
  if (status === 'Pending') return 'bg-amber-100 text-amber-800 border-amber-300';
  if (status === 'Approved') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
  return 'bg-red-100 text-red-800 border-red-300';
}

function openDetailModal(req) {
  activeRequest.value = req;
  showDetailModal.value = true;
}

function handleApprove(id, title) {
  approveAdminRequest(id);
  alert(`ĐÃ PHÊ DUYỆT THÀNH CÔNG!\n\nToàn bộ nhân sự mới của Công ty A đã được cập nhật thành Nhân sự chính thức (Active)!`);
  loadData();
}

onMounted(() => {
  loadData();
});
</script>
