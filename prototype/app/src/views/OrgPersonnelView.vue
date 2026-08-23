<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Banner -->
      <div class="flex flex-wrap items-center gap-2">
        <button @click="downloadExcelSample" class="px-4 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs rounded-xl border border-outline-variant/60 transition-all flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px]">download</span>
          <span>Tải File Excel Mẫu</span>
        </button>
        <button @click="triggerFileInput" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px]">upload_file</span>
          <span>Import Nhân Sự Excel</span>
        </button>
        <input type="file" ref="fileInputRef" @change="handleExcelUpload" accept=".csv,.xlsx,.txt" class="hidden">

        <button @click="showCreateModal = true" class="px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px]">person_add_alt</span>
          <span>Thêm Nhân Sự Mới</span>
        </button>
      </div>

    <!-- SEARCH & FILTER BAR -->
    <div class="bg-white p-3.5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
      <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto text-xs">
        <div class="relative w-full sm:w-72">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
          <input v-model="searchQuery" type="text" placeholder="Tìm theo tên, email, SĐT hoặc chức danh..." class="w-full pl-8 pr-3 py-1.5 border border-outline-variant rounded-lg focus:outline-none focus:border-primary">
        </div>
        <select v-model="selectedDept" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Phòng Ban</option>
          <option v-for="d in departmentsList" :key="d.code" :value="d.code">{{ d.nameVi }}</option>
        </select>
        <select v-model="selectedStatusFilter" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Trạng Thái</option>
          <option value="active">🟢 Chính thức (Active)</option>
          <option value="PendingApproval">🟡 Chờ phê duyệt (Pending)</option>
        </select>
      </div>
      <div class="text-xs text-on-surface-variant font-medium">
        Hiển thị: <b class="text-on-surface">{{ filteredOrgUsers.length }}</b> / {{ orgUsers.length }} nhân sự hệ thống
      </div>
    </div>

    <!-- ORG PERSONNEL DATA TABLE (8 COLUMNS DATA TABLE FORMAT) -->
    <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden p-4 space-y-4">
      <div class="overflow-x-auto overflow-y-auto max-h-[600px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1200px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[240px] bg-surface-container-low">Nhân Sự</th>
              <th class="py-2.5 px-3 min-w-[180px] bg-surface-container-low">Phòng Ban Chuyên Môn</th>
              <th class="py-2.5 px-3 min-w-[180px] bg-surface-container-low">Chức Danh / Vai Trò</th>
              <th class="py-2.5 px-3 min-w-[130px] bg-surface-container-low font-mono">Số Điện Thoại</th>
              <th class="py-2.5 px-3 min-w-[120px] bg-surface-container-low font-mono">Ngày Tham Gia</th>
              <th class="py-2.5 px-3 min-w-[140px] text-center bg-surface-container-low">Trạng Thái</th>
              <th class="py-2.5 px-3 min-w-[70px] text-right bg-surface-container-low">Thao Tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr 
              v-for="user in filteredOrgUsers" 
              :key="user.id" 
              :class="[
                'hover:bg-surface-container-low transition-colors text-[11px]',
                user.status === 'PendingApproval' ? 'opacity-60 bg-amber-50/40 select-none' : ''
              ]"
            >
              <!-- 1. Mã & Nhân sự -->
              <td class="py-3 px-3 font-bold text-on-surface">
                <div class="flex items-center gap-3">
                  <img :src="user.avatar" class="w-8 h-8 rounded-full object-cover border border-primary/20 shrink-0" alt="Avatar">
                  <div>
                    <p class="font-extrabold text-on-surface text-xs leading-snug">{{ user.name }}</p>
                    <p class="text-[10px] text-on-surface-variant font-mono">{{ user.email }}</p>
                  </div>
                </div>
              </td>

              <!-- 2. Phòng ban -->
              <td class="py-3 px-3 font-bold text-on-surface whitespace-nowrap">
                <span class="px-2.5 py-1 bg-surface-container text-on-surface rounded-lg border border-outline-variant/50 text-[11px]">
                  {{ user.department }}
                </span>
              </td>

              <!-- 3. Chức danh -->
              <td class="py-3 px-3 font-bold text-primary whitespace-nowrap">
                {{ user.roleVi || user.role }}
              </td>

              <!-- 4. Số điện thoại -->
              <td class="py-3 px-3 font-mono font-bold text-on-surface whitespace-nowrap">
                {{ user.phone }}
              </td>

              <!-- 5. Ngày gia nhập -->
              <td class="py-3 px-3 font-mono text-on-surface-variant text-[10px] whitespace-nowrap">
                {{ user.joinDate || '2024-01-15' }}
              </td>

              <!-- 6. Trạng thái -->
              <td class="py-3 px-3 text-center whitespace-nowrap">
                <span 
                  :class="[
                    'px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block',
                    user.status === 'PendingApproval' ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  ]"
                >
                  {{ user.status === 'PendingApproval' ? '🟡 Chờ phê duyệt' : '🟢 Chính thức' }}
                </span>
              </td>

              <!-- 7. Thao tác -->
              <td class="py-3 px-3 text-right whitespace-nowrap">
                <button @click="handleDeleteUser(user.id, user.name)" class="p-1 hover:bg-red-50 rounded text-red-600 transition-colors" title="Xóa nhân sự">
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL THÊM NHÂN SỰ MỚI VÀO KHO TỔ CHỨC (FR-03.3) -->
    <CreatePersonnelModal
      :isOpen="showCreateModal"
      @close="showCreateModal = false"
      @created="loadUsers"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getUsers, DEPARTMENTS, saveUsers, importUsersFromExcel } from '../mock/users.js';
import { createPersonnelApprovalRequest } from '../mock/admin_approvals.js';
import CreatePersonnelModal from '../components/CreatePersonnelModal.vue';

const orgUsers = ref([]);
const departmentsList = ref(DEPARTMENTS);

const searchQuery = ref('');
const selectedDept = ref('');
const selectedStatusFilter = ref('');
const fileInputRef = ref(null);

const showCreateModal = ref(false);

function loadUsers() {
  orgUsers.value = getUsers();
}

const filteredOrgUsers = computed(() => {
  return orgUsers.value.filter(u => {
    const matchQuery = !searchQuery.value || 
      (u.name && u.name.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (u.email && u.email.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (u.phone && u.phone.includes(searchQuery.value)) ||
      (u.roleVi && u.roleVi.toLowerCase().includes(searchQuery.value.toLowerCase()));
    
    const matchDept = !selectedDept.value || u.department === selectedDept.value;
    const matchStatus = !selectedStatusFilter.value || u.status === selectedStatusFilter.value;
    return matchQuery && matchDept && matchStatus;
  });
});

function downloadExcelSample() {
  // Liên kết trực tiếp tới file mẫu chuẩn đặt tại public/EventAZ_Mau_Import_Nhan_Su.csv
  const link = document.createElement('a');
  link.href = '/EventAZ_Mau_Import_Nhan_Su.csv';
  link.setAttribute('download', 'EventAZ_Mau_Import_Nhan_Su.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function triggerFileInput() {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
}

function handleExcelUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    const text = evt.target.result;
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    // Skip header line if present
    const dataLines = lines.length > 1 && lines[0].includes('Họ và tên') ? lines.slice(1) : lines;

    const parsedUsers = dataLines.map(line => {
      const parts = line.split(',').map(p => p.trim());
      return {
        name: parts[0] || 'Nhân Sự Mới Import',
        email: parts[1] || `user_${Date.now()}@eventaz.vn`,
        phone: parts[2] || '0912 888 999',
        department: parts[3] || 'Ban Hậu Cần',
        roleVi: parts[4] || 'Chuyên viên Bổ Sung',
        skills: parts[5] ? parts[5].split(';') : ['Import Excel']
      };
    });

    if (parsedUsers.length > 0) {
      const addedList = importUsersFromExcel(parsedUsers);
      createPersonnelApprovalRequest("Công ty TNHH Truyền thông & Sự kiện EventAZ (Công ty A)", addedList);
      alert(`ĐÃ TẢI LÊN THÀNH CÔNG ${addedList.length} NHÂN SỰ MỚI!\n\nNhân sự mới sẽ hiển thị mờ với trạng thái "Chờ phê duyệt". Vui lòng chờ Admin Hệ thống duyệt.`);
      loadUsers();
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function handleDeleteUser(id, name) {
  if (confirm(`Bạn có chắc chắn muốn xóa nhân sự [${name}] khỏi hệ thống?`)) {
    const updated = orgUsers.value.filter(u => u.id !== id);
    saveUsers(updated);
    alert(`Đã xóa nhân sự [${name}] thành công!`);
    loadUsers();
  }
}

onMounted(() => {
  loadUsers();
});
</script>
