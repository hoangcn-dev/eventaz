<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">

    <!-- REUSABLE COMPONENT: BASE TABLE -->
    <BaseTable
      title="Danh Sách Yêu Cầu Trình Duyệt Từ Các Công Ty / Tổ Chức"
      icon="assignment"
      subtitle="Di chuột vào tiêu đề cột có biểu tượng để mở bộ lọc cột."
      :data="requestsList"
      :columns="tableColumns"
      @reload="loadData"
    >
      <!-- Custom Cell: Công ty trình -->
      <template #cell-companyName="{ row }">
        <p class="font-extrabold text-on-surface text-xs leading-tight">{{ row.companyName }}</p>
      </template>

      <!-- Custom Cell: Kiểu yêu cầu -->
      <template #cell-requestType="{ value }">
        <span class="px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-semibold text-[10px] border border-outline-variant/60 inline-flex items-center gap-1">
          <span class="material-symbols-outlined text-[13px] text-primary">category</span>
          <span>{{ getRequestTypeText(value) }}</span>
        </span>
      </template>

      <!-- Custom Cell: Nội dung yêu cầu -->
      <template #cell-title="{ row }">
        <p class="font-bold text-on-surface text-xs leading-snug">{{ row.title }}</p>
      </template>

      <!-- Custom Cell: Thời gian trình -->
      <template #cell-requestDate="{ value }">
        <span class="font-mono text-on-surface-variant text-[10px] whitespace-nowrap">{{ value }}</span>
      </template>

      <!-- Custom Cell: Trạng thái -->
      <template #cell-status="{ value }">
        <span :class="['px-2.5 py-1 rounded-full text-[10px] font-bold border inline-flex items-center gap-1', getStatusBadgeStyle(value)]">
          <span class="material-symbols-outlined text-[13px]">
            {{ value === 'Pending' ? 'hourglass_empty' : (value === 'Approved' ? 'check_circle' : 'cancel') }}
          </span>
          <span>{{ getStatusText(value) }}</span>
        </span>
      </template>

      <!-- Custom Cell: Thao tác Admin Widget -->
      <template #cell-actions="{ row }">
        <BaseActionMenu :actions="getAdminActions(row)" />
      </template>
    </BaseTable>

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
import { BaseTable, BaseActionMenu } from '../components/base';
import { getAdminApprovalRequests, approveAdminRequest, rejectAdminRequest } from '../mock/admin_approvals.js';
import { getUsers } from '../mock/users.js';

const requestsList = ref([]);
const showDetailModal = ref(false);
const activeRequest = ref({});
const allUsers = ref([]);

const requestTypeOptions = [
  { label: 'Bổ sung Nhân sự', value: 'Bổ sung Nhân sự' },
  { label: 'Duyệt Ngân sách', value: 'Duyệt Ngân sách' },
  { label: 'Duyệt Hợp đồng', value: 'Duyệt Hợp đồng' },
  { label: 'Xuất Kho Thiết bị', value: 'Xuất Kho Thiết bị' }
];

const statusOptions = [
  { label: 'Chờ Admin duyệt', value: 'Pending' },
  { label: 'Đã phê duyệt', value: 'Approved' },
  { label: 'Từ chối', value: 'Rejected' }
];

// Definition of Table Schema (Columns)
const tableColumns = [
  { key: 'companyName', title: 'Công Ty / Tổ Chức', type: 'text', filterable: true, minWidth: '240px' },
  { key: 'requestType', title: 'Kiểu Yêu Cầu', type: 'select', options: requestTypeOptions, filterable: true, minWidth: '160px' },
  { key: 'title', title: 'Nội Dung Yêu Cầu Phê Duyệt', type: 'text', filterable: true, minWidth: '280px' },
  { key: 'requestDate', title: 'Thời Gian Trình', type: 'date', filterable: false, minWidth: '130px' },
  { key: 'status', title: 'Trạng Thái', type: 'boolean', options: statusOptions, filterable: true, align: 'center', minWidth: '160px' },
  { key: 'actions', title: 'Thao Tác Admin', filterable: false, align: 'center', sticky: 'right', minWidth: '160px' }
];

function loadData() {
  requestsList.value = getAdminApprovalRequests();
  allUsers.value = getUsers();
}

function getRequestTypeText(type) {
  if (!type) return 'Chưa phân loại';
  const typeMap = {
    PersonnelImport: 'Bổ sung Nhân sự',
    BudgetApproval: 'Duyệt Ngân sách',
    ContractApproval: 'Duyệt Hợp đồng',
    EquipmentExport: 'Xuất Kho Thiết bị'
  };
  return typeMap[type] || type;
}

function getStatusText(status) {
  if (status === 'Pending') return 'Chờ Admin duyệt';
  if (status === 'Approved') return 'Đã phê duyệt';
  return 'Từ chối';
}

function getStatusBadgeStyle(status) {
  if (status === 'Pending') return 'bg-amber-100 text-amber-800 border-amber-300';
  if (status === 'Approved') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
  return 'bg-red-100 text-red-800 border-red-300';
}

function getAdminActions(req) {
  return [
    {
      id: 'view',
      label: 'Xem Chi Tiết',
      handler: () => openDetailModal(req)
    },
    {
      id: 'approve',
      label: 'Phê Duyệt',
      hidden: req.status !== 'Pending',
      handler: () => handleApprove(req.id, req.title)
    },
    {
      id: 'reject',
      label: 'Từ Chối',
      danger: true,
      hidden: req.status !== 'Pending',
      handler: () => handleReject(req.id, req.title)
    }
  ];
}

const pendingUsersList = computed(() => {
  if (!activeRequest.value || !activeRequest.value.pendingUserIds) return [];
  return allUsers.value.filter(u => activeRequest.value.pendingUserIds.includes(u.id));
});

function openDetailModal(req) {
  activeRequest.value = req;
  showDetailModal.value = true;
}

function handleApprove(id, title) {
  approveAdminRequest(id);
  alert(`ĐÃ PHÊ DUYỆT THÀNH CÔNG!\n\nYêu cầu "${title}" đã được cập nhật thành công!`);
  loadData();
}

function handleReject(id, title) {
  if (confirm(`Bạn có chắc chắn muốn từ chối yêu cầu "${title}"?`)) {
    rejectAdminRequest(id);
    alert(`ĐÃ TỪ CHỐI THÀNH CÔNG!\n\nYêu cầu "${title}" đã được chuyển sang trạng thái Từ chối.`);
    loadData();
  }
}

onMounted(() => {
  loadData();
});
</script>
