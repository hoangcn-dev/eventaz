<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">person_add</span>
          <span>Phân Công Nhân Sự Hàng Loạt Vào Sự Kiện (FR-03.2)</span>
        </h3>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Main Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
        <!-- Live Personnel Search Input & Multi-select Tags Area -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block font-bold text-on-surface uppercase">1. Tìm & Chọn Nhân Sự từ Kho Hệ Thống (Chọn Nhiều) *</label>
            <span class="text-[11px] font-bold text-primary">Đã chọn: {{ selectedUserIds.length }} nhân sự</span>
          </div>

          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Nhập tên, email hoặc SĐT để tìm kiếm nhân sự..." 
              class="w-full pl-8 pr-3 py-2 border border-outline-variant rounded-xl font-bold focus:border-primary focus:outline-none text-xs"
            >
          </div>

          <!-- SELECTED PERSONNEL TAG CHIPS AREA -->
          <div v-if="selectedUsers.length > 0" class="p-2.5 bg-primary/5 rounded-xl border border-primary/20 space-y-1">
            <p class="text-[10px] font-bold text-primary uppercase">Danh sách nhân sự đã chọn tương ứng thẻ Tag:</p>
            <div class="flex flex-wrap gap-1.5">
              <div 
                v-for="u in selectedUsers" 
                :key="u.id"
                class="px-2.5 py-1 bg-primary text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm animate-in fade-in zoom-in-95 duration-150"
              >
                <img :src="u.avatar" class="w-4 h-4 rounded-full object-cover border border-white/40" alt="avatar">
                <span>{{ u.name }}</span>
                <button type="button" @click="toggleUser(u.id)" class="hover:text-red-200 focus:outline-none flex items-center" title="Gỡ thẻ nhân sự này">
                  <span class="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Scrollable Personnel Cards Selection List -->
          <div class="space-y-2 max-h-48 overflow-y-auto no-scrollbar border border-outline-variant/60 p-2 rounded-xl bg-surface-container-low/50">
            <div 
              v-for="u in filteredOrgUsers" 
              :key="u.id"
              @click="toggleUser(u.id)"
              :class="[
                'p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between select-none',
                selectedUserIds.includes(u.id) ? 'bg-primary/10 border-primary shadow-sm font-bold' : 'bg-white border-outline-variant/60 hover:bg-surface-container'
              ]"
            >
              <div class="flex items-center gap-2.5 truncate">
                <input 
                  type="checkbox" 
                  :checked="selectedUserIds.includes(u.id)" 
                  class="rounded text-primary focus:ring-primary h-4 w-4 shrink-0" 
                  @click.stop="toggleUser(u.id)"
                >
                <img :src="u.avatar" class="w-8 h-8 rounded-full object-cover border border-outline-variant/60 shrink-0" alt="Avatar">
                <div class="truncate">
                  <p class="font-bold text-on-surface truncate text-xs">{{ u.name }}</p>
                  <p class="text-[10px] text-on-surface-variant font-mono truncate">{{ u.email }} • {{ u.department }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <span class="text-[10px] px-2 py-0.5 bg-surface-container rounded text-on-surface-variant font-mono">{{ u.id }}</span>
                <span v-if="selectedUserIds.includes(u.id)" class="material-symbols-outlined text-primary text-[18px]">check_circle</span>
              </div>
            </div>
            <p v-if="filteredOrgUsers.length === 0" class="py-4 text-center text-xs text-on-surface-variant italic">Không tìm thấy nhân sự phù hợp.</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Ban / Bộ Phận Chuyên Môn *</label>
            <select v-model="form.department" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-medium focus:outline-none focus:border-primary">
              <option v-for="d in departmentsList" :key="d.code" :value="d.code">{{ d.nameVi }}</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Chức Danh Sự Kiện *</label>
            <input type="text" v-model="form.roleVi" required placeholder="VD: Trưởng ban Hậu cần..." class="w-full px-3 py-2 border border-outline-variant rounded-xl font-bold focus:outline-none focus:border-primary">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Nhóm Hạng Mục WBS Phụ Trách *</label>
            <select v-model="form.wbsId" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-medium focus:outline-none focus:border-primary">
              <option v-for="w in wbsList" :key="w.id" :value="w.id">{{ w.name }} ({{ w.id }})</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Người Quản Lý / Giám Sát Phụ Trách *</label>
            <select v-model="form.managerId" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold text-primary focus:outline-none focus:border-primary">
              <option v-for="u in orgUsers" :key="u.id" :value="u.id">{{ u.name }} ({{ u.roleVi }})</option>
            </select>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container">Hủy</button>
          <button type="submit" :disabled="selectedUserIds.length === 0" class="px-5 py-2 bg-primary text-white font-bold rounded-xl shadow hover:bg-primary-hover disabled:opacity-50">
            Phân Công ({{ selectedUserIds.length }}) Nhân Sự
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { getUsers, DEPARTMENTS, assignPersonnelToEvent } from '../mock/users.js';
import { getCurrentEvent } from '../mock/events.js';

const props = defineProps({
  isOpen: Boolean,
  eventId: String
});

const emit = defineEmits(['close', 'assigned']);

const searchQuery = ref('');
const orgUsers = ref([]);
const selectedUserIds = ref([]);
const departmentsList = ref(DEPARTMENTS);
const wbsList = ref([]);

const form = reactive({
  department: 'Ban Hậu Cần',
  roleVi: 'Thành viên Ban Tổ Chức',
  wbsId: 'WBS-01',
  managerId: 'USR-001'
});

const filteredOrgUsers = computed(() => {
  if (!searchQuery.value) return orgUsers.value;
  const q = searchQuery.value.toLowerCase();
  return orgUsers.value.filter(u => 
    (u.name && u.name.toLowerCase().includes(q)) || 
    (u.email && u.email.toLowerCase().includes(q)) || 
    (u.phone && u.phone.includes(q)) ||
    (u.department && u.department.toLowerCase().includes(q))
  );
});

const selectedUsers = computed(() => {
  return orgUsers.value.filter(u => selectedUserIds.value.includes(u.id));
});

function toggleUser(userId) {
  const idx = selectedUserIds.value.indexOf(userId);
  if (idx !== -1) {
    selectedUserIds.value.splice(idx, 1);
  } else {
    selectedUserIds.value.push(userId);
  }
}

watch(() => props.isOpen, (val) => {
  if (val) {
    orgUsers.value = getUsers();
    searchQuery.value = '';
    const currentEvt = getCurrentEvent();
    wbsList.value = currentEvt.wbs || [];

    if (orgUsers.value.length > 0) {
      selectedUserIds.value = [orgUsers.value[0].id];
      form.managerId = orgUsers.value[0].id;
    } else {
      selectedUserIds.value = [];
    }
    if (wbsList.value.length > 0) {
      form.wbsId = wbsList.value[0].id;
    }
  }
});

function close() {
  emit('close');
}

function handleSubmit() {
  if (selectedUserIds.value.length === 0) {
    alert('Vui lòng chọn ít nhất 1 nhân sự!');
    return;
  }

  const managerUser = orgUsers.value.find(u => u.id === form.managerId);
  const targetEventId = props.eventId || getCurrentEvent().id;

  selectedUserIds.value.forEach(uid => {
    assignPersonnelToEvent(targetEventId, {
      userId: uid,
      department: form.department,
      roleVi: form.roleVi,
      wbsId: form.wbsId,
      managerId: form.managerId,
      managerName: managerUser ? managerUser.name : 'Nguyễn Văn Trưởng'
    });
  });

  alert(`Đã phân công hàng loạt ${selectedUserIds.value.length} nhân sự vào sự kiện thành công!`);
  emit('assigned');
  close();
}
</script>
