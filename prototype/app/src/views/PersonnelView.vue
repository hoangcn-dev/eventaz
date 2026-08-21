<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Banner -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-outline-variant/60 shadow-sm gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-3xl">badge</span>
            <span>Nhân Sự Sự Kiện (FR-03.1 — FR-03.5)</span>
          </h1>
          <span class="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-xs">
            {{ currentEvent.name || 'Tech Summit Asia' }}
          </span>
        </div>
        <p class="text-xs text-on-surface-variant mt-1 font-medium">Quản lý định biên nhân sự, phân công vai trò chuyên môn, Người quản lý phụ trách và điểm danh tại chỗ.</p>
      </div>
      <button @click="showAssignModal = true" class="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-[18px]">person_add</span>
        <span>Phân công Nhân sự vào Sự kiện</span>
      </button>
    </div>

    <!-- KPI STATS CARDS (FR-03.5) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
            <span class="material-symbols-outlined">groups</span>
          </div>
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">Định biên Sự kiện</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Nhân Sự Đã Gán</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">{{ personnelList.length }} Thành viên</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Phân bổ trong {{ totalDepts }} Ban chuyên môn</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <span class="material-symbols-outlined">how_to_reg</span>
          </div>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Attendance Rate</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tỷ Lệ Điểm Danh Có Mặt</p>
          <h2 class="text-2xl font-extrabold text-emerald-700 mt-1">{{ attendanceRate }}%</h2>
          <p class="text-[10px] text-emerald-600 font-bold mt-1">✓ {{ checkedInCount }} / {{ personnelList.length }} Đã có mặt</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-purple-50 rounded-lg text-secondary">
            <span class="material-symbols-outlined">assignment_ind</span>
          </div>
          <span class="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">Tải Công Việc</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">TB Task RACI / Người</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">2.4 Tasks</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Được gán trực tiếp trên WBS</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-amber-50 rounded-lg text-amber-600">
            <span class="material-symbols-outlined">warning</span>
          </div>
          <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Cần bổ sung</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Vắng Mặt / Chưa Đến</p>
          <h2 class="text-2xl font-extrabold text-amber-700 mt-1">{{ absentCount }} Nhân sự</h2>
          <p class="text-[10px] text-amber-600 font-bold mt-1">⚠️ Cần nhắc nhở làm ca</p>
        </div>
      </div>
    </div>

    <!-- SEARCH & FILTER BAR -->
    <div class="bg-white p-3.5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
      <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto text-xs">
        <div class="relative w-full sm:w-64">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
          <input v-model="searchQuery" type="text" placeholder="Tìm tên, email hoặc SĐT nhân sự..." class="w-full pl-8 pr-3 py-1.5 border border-outline-variant rounded-lg focus:outline-none focus:border-primary">
        </div>
        <select v-model="selectedDept" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Ban Chuyên Môn</option>
          <option v-for="d in departmentsList" :key="d.code" :value="d.code">{{ d.nameVi }}</option>
        </select>
        <select v-model="selectedStatus" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Trạng thái Điểm danh</option>
          <option value="Checked-in">🟢 Đã có mặt</option>
          <option value="On-duty">🟡 Đang làm ca</option>
          <option value="Absent">🔴 Vắng mặt</option>
        </select>
      </div>
      <div class="text-xs text-on-surface-variant font-medium">
        Hiển thị: <b class="text-on-surface">{{ filteredPersonnel.length }}</b> / {{ personnelList.length }} nhân sự
      </div>
    </div>

    <!-- ASSIGNED EVENT ROSTER TABLE (9 INDEPENDENT COLUMNS WITH MANAGER) -->
    <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden p-4 space-y-4">
      <div class="overflow-x-auto overflow-y-auto max-h-[550px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1350px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[220px] bg-surface-container-low">Thành viên Ban Tổ Chức</th>
              <th class="py-2.5 px-3 min-w-[160px] bg-surface-container-low">Ban Chuyên Môn</th>
              <th class="py-2.5 px-3 min-w-[160px] bg-surface-container-low">Chức Danh Sự Kiện</th>
              <th class="py-2.5 px-3 min-w-[140px] bg-surface-container-low">Nhóm WBS Phụ Trách</th>
              <th class="py-2.5 px-3 min-w-[160px] bg-surface-container-low">Người Quản Lý Phụ Trách</th>
              <th class="py-2.5 px-3 min-w-[100px] text-center bg-surface-container-low">Task RACI</th>
              <th class="py-2.5 px-3 min-w-[140px] text-center bg-surface-container-low">Điểm Danh / Trạng Thái</th>
              <th class="py-2.5 px-3 min-w-[120px] bg-surface-container-low">Số Điện Thoại</th>
              <th class="py-2.5 px-3 min-w-[80px] text-right bg-surface-container-low">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="user in filteredPersonnel" :key="user.userId || user.id" class="hover:bg-surface-container-low transition-colors text-[11px]">
              <td class="py-2 px-3 font-bold text-on-surface whitespace-nowrap">
                <div class="flex items-center gap-2.5">
                  <img :src="user.avatar" class="w-8 h-8 rounded-full border border-outline-variant/60 object-cover shrink-0" alt="Avatar">
                  <div class="truncate">
                    <p class="font-bold text-on-surface truncate text-xs">{{ user.name }}</p>
                    <p class="text-[10px] text-on-surface-variant font-mono truncate">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="py-2 px-3 whitespace-nowrap">
                <span class="px-2.5 py-0.5 bg-surface-container rounded-full text-[10px] font-bold text-on-surface-variant inline-block">
                  {{ user.department }}
                </span>
              </td>
              <td class="py-2 px-3 font-bold text-primary whitespace-nowrap">
                {{ user.roleVi || 'Thành viên Ban Tổ Chức' }}
              </td>
              <td class="py-2 px-3 font-mono font-semibold text-on-surface whitespace-nowrap">
                {{ user.wbsId || 'WBS-01' }}
              </td>
              <td class="py-2 px-3 font-bold text-on-surface whitespace-nowrap">
                <div class="flex items-center gap-1.5 text-primary">
                  <span class="material-symbols-outlined text-[15px]">manage_accounts</span>
                  <span>{{ user.managerName || 'Nguyễn Văn Trưởng' }}</span>
                </div>
              </td>
              <td class="py-2 px-3 text-center font-bold text-secondary font-mono whitespace-nowrap">
                {{ user.raciCount || 1 }} Tasks
              </td>
              <td class="py-2 px-3 text-center whitespace-nowrap">
                <select 
                  :value="user.attendanceStatus || 'Checked-in'" 
                  @change="handleAttendanceChange(user.userId || user.id, $event.target.value)"
                  :class="['px-2 py-0.5 text-[10px] font-bold rounded-lg border focus:outline-none', getAttendanceStyle(user.attendanceStatus)]"
                >
                  <option value="Checked-in">🟢 Đã có mặt</option>
                  <option value="On-duty">🟡 Đang làm ca</option>
                  <option value="Absent">🔴 Vắng mặt</option>
                </select>
              </td>
              <td class="py-2 px-3 font-mono text-on-surface-variant whitespace-nowrap">
                {{ user.phone || '0908 123 456' }}
              </td>
              <td class="py-2 px-3 text-right whitespace-nowrap">
                <button @click="handleRemoveUser(user.userId || user.id, user.name)" class="p-1 hover:bg-red-50 rounded text-red-600 transition-colors" title="Rút phân công khỏi sự kiện">
                  <span class="material-symbols-outlined text-[16px]">person_remove</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL PHÂN CÔNG NHÂN SỰ VÀO SỰ KIỆN (FR-03.2) -->
    <AssignPersonnelModal
      :isOpen="showAssignModal"
      :eventId="currentEvent.id"
      @close="showAssignModal = false"
      @assigned="loadPersonnel"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { getEventPersonnel, removePersonnelFromEvent, updateAttendanceStatus, DEPARTMENTS, ATTENDANCE_STATUSES } from '../mock/users.js';
import AssignPersonnelModal from '../components/AssignPersonnelModal.vue';

const currentEvent = ref({});
const personnelList = ref([]);
const departmentsList = ref(DEPARTMENTS);

const searchQuery = ref('');
const selectedDept = ref('');
const selectedStatus = ref('');

const showAssignModal = ref(false);

function loadPersonnel() {
  currentEvent.value = getCurrentEvent();
  personnelList.value = getEventPersonnel(currentEvent.value.id);
}

const checkedInCount = computed(() => {
  return personnelList.value.filter(u => u.attendanceStatus === 'Checked-in' || u.attendanceStatus === 'On-duty').length;
});

const absentCount = computed(() => {
  return personnelList.value.filter(u => u.attendanceStatus === 'Absent').length;
});

const attendanceRate = computed(() => {
  if (personnelList.value.length === 0) return 0;
  return Math.round((checkedInCount.value / personnelList.value.length) * 100);
});

const totalDepts = computed(() => {
  const depts = new Set(personnelList.value.map(u => u.department));
  return depts.size;
});

const filteredPersonnel = computed(() => {
  return personnelList.value.filter(u => {
    const matchQuery = !searchQuery.value || 
      (u.name && u.name.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (u.email && u.email.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (u.phone && u.phone.includes(searchQuery.value)) ||
      (u.managerName && u.managerName.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchDept = !selectedDept.value || u.department === selectedDept.value;
    const matchStatus = !selectedStatus.value || u.attendanceStatus === selectedStatus.value;
    return matchQuery && matchDept && matchStatus;
  });
});

function getAttendanceStyle(status) {
  const map = ATTENDANCE_STATUSES;
  return map[status] ? map[status].color : 'bg-slate-100 text-slate-700 border-slate-300';
}

function handleAttendanceChange(userId, newStatus) {
  updateAttendanceStatus(currentEvent.value.id, userId, newStatus);
  loadPersonnel();
}

function handleRemoveUser(userId, name) {
  if (confirm(`Bạn có chắc chắn muốn rút phân công của [${name}] khỏi sự kiện này?`)) {
    removePersonnelFromEvent(currentEvent.value.id, userId);
    alert(`Đã rút phân công của [${name}] thành công.`);
    loadPersonnel();
  }
}

onMounted(() => {
  loadPersonnel();
});
</script>
