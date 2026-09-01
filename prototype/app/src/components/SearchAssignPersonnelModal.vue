<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-none max-w-2xl w-full px-6 pt-3.5 pb-5 border border-outline-variant shadow-2xl space-y-4 animate-in fade-in duration-200">
      <!-- 1. Header + Close -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <h3 class="font-bold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[20px]">person_search</span>
          <span>{{ title || 'Tìm kiếm Nhân sự' }}</span>
        </h3>
        <button type="button" @click="close" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant">
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <!-- 2. Section Tìm kiếm & Bộ lọc -->
      <div class="space-y-3 text-xs">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- Trường text tìm theo tên / email / mã nhân sự -->
          <div>
            <label class="block font-medium text-on-surface-variant mb-1">Tìm nhân sự</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Tên, email hoặc mã (VD: USR-001)..." 
                class="w-full pl-8 pr-3 py-1.5 border border-outline-variant rounded-none text-xs focus:border-primary focus:outline-none font-medium"
              >
            </div>
          </div>

          <!-- Select lọc theo chức danh -->
          <div>
            <label class="block font-medium text-on-surface-variant mb-1">Lọc theo Chức danh</label>
            <select v-model="roleFilter" class="w-full px-3 py-1.5 border border-outline-variant rounded-none text-xs bg-white focus:border-primary focus:outline-none font-medium">
              <option value="">Tất cả chức danh</option>
              <option v-for="r in roleOptions" :key="r" :value="r">{{ r }}</option>
            </select>
          </div>

          <!-- Select mode chọn (1 hay nhiều) -->
          <div>
            <label class="block font-medium text-on-surface-variant mb-1">Chế độ chọn</label>
            <select v-model="selectionMode" class="w-full px-3 py-1.5 border border-outline-variant rounded-none text-xs bg-white focus:border-primary focus:outline-none font-medium">
              <option value="single">Chọn 1 nhân sự (Single)</option>
              <option value="multiple">Chọn nhiều nhân sự (Multiple)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 3. Section Hiển thị DS Nhân sự (Scrollbar mượt no-scrollbar giống sidebar) -->
      <div class="space-y-1.5">
        <div class="flex justify-between items-center text-xs text-on-surface-variant px-1 font-medium">
          <span>Danh sách nhân sự ({{ filteredUsers.length }})</span>
          <span class="text-primary font-bold">Đã chọn: {{ selectedUserIds.length }}</span>
        </div>

        <div class="max-h-64 overflow-y-auto no-scrollbar border border-outline-variant/60 p-2 rounded-none space-y-1 bg-surface-container-low/30">
          <div 
            v-for="u in filteredUsers" 
            :key="u.id"
            @click="selectUser(u.id)"
            :class="[
              'p-2.5 border transition-colors cursor-pointer flex items-center justify-between select-none text-xs rounded-none',
              selectedUserIds.includes(u.id) ? 'bg-primary/5 border-primary shadow-sm font-semibold' : 'bg-white border-outline-variant/40 hover:bg-surface-container'
            ]"
          >
            <div class="flex items-center gap-3 truncate">
              <!-- Radio / Checkbox based on selectionMode -->
              <input 
                :type="selectionMode === 'single' ? 'radio' : 'checkbox'" 
                :checked="selectedUserIds.includes(u.id)" 
                class="text-primary focus:ring-primary h-4 w-4 shrink-0 cursor-pointer" 
                @click.stop="selectUser(u.id)"
              >
              <img :src="u.avatar || 'https://i.pravatar.cc/150?u=' + u.id" class="w-7 h-7 rounded-full object-cover border border-outline-variant/60 shrink-0" alt="Avatar">
              
              <div class="truncate space-y-0.5">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-on-surface text-xs">{{ u.name }}</span>
                  <span class="font-mono text-[11px] px-1.5 py-0.2 bg-surface-container rounded text-on-surface-variant">{{ u.id }}</span>
                </div>
                <p class="text-[11px] text-on-surface-variant font-medium truncate">{{ u.email }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4 shrink-0">
              <!-- Chức danh -->
              <span class="px-2 py-0.5 bg-primary/10 text-primary text-[11px] font-bold rounded-none">{{ u.roleVi || u.department || 'Thành viên' }}</span>
              
              <!-- Số lượng task đang tham gia -->
              <span class="text-[11px] font-medium text-on-surface-variant flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">task</span>
                <span>{{ u.taskCount || (u.id.charCodeAt(u.id.length - 1) % 5 + 1) }} tasks</span>
              </span>
            </div>
          </div>

          <div v-if="filteredUsers.length === 0" class="py-6 text-center text-xs text-on-surface-variant italic">
            Không tìm thấy nhân sự nào phù hợp với bộ lọc.
          </div>
        </div>
      </div>

      <!-- 4. Section Action Buttons -->
      <div class="flex justify-end gap-2 border-t border-outline-variant pt-3">
        <button type="button" @click="close" class="px-3 py-1.5 border border-outline-variant text-on-surface-variant font-medium text-xs rounded-none hover:bg-surface-container transition-colors">
          Hủy
        </button>
        <button type="button" @click="handleConfirm" :disabled="selectedUserIds.length === 0" class="px-3 py-1.5 bg-primary text-white font-medium text-xs rounded-none hover:bg-primary-hover shadow-sm transition-colors disabled:opacity-50">
          Xác nhận ({{ selectedUserIds.length }})
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { getUsers } from '../mock/users.js';

const props = defineProps({
  isOpen: Boolean,
  title: String,
  initialMode: {
    type: String,
    default: 'single'
  }
});

const emit = defineEmits(['close', 'confirm']);

const searchQuery = ref('');
const roleFilter = ref('');
const selectionMode = ref('single');
const allUsers = ref([]);
const selectedUserIds = ref([]);

const roleOptions = [
  'Event Director',
  'Trưởng BAN',
  'Trưởng ban Hậu cần',
  'Giám sát Kỹ thuật',
  'Trưởng ban Nội dung',
  'Thành viên BTC'
];

watch(() => props.isOpen, (val) => {
  if (val) {
    allUsers.value = getUsers();
    searchQuery.value = '';
    roleFilter.value = '';
    selectionMode.value = props.initialMode || 'single';
    selectedUserIds.value = [];
  }
});

watch(selectionMode, (newMode) => {
  if (newMode === 'single' && selectedUserIds.value.length > 1) {
    selectedUserIds.value = [selectedUserIds.value[0]];
  }
});

const filteredUsers = computed(() => {
  let list = allUsers.value;

  if (roleFilter.value) {
    list = list.filter(u => (u.roleVi || u.department) === roleFilter.value);
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(u => 
      (u.name && u.name.toLowerCase().includes(q)) || 
      (u.email && u.email.toLowerCase().includes(q)) || 
      (u.id && u.id.toLowerCase().includes(q))
    );
  }

  return list;
});

function selectUser(userId) {
  if (selectionMode.value === 'single') {
    selectedUserIds.value = [userId];
  } else {
    const idx = selectedUserIds.value.indexOf(userId);
    if (idx !== -1) {
      selectedUserIds.value.splice(idx, 1);
    } else {
      selectedUserIds.value.push(userId);
    }
  }
}

function close() {
  emit('close');
}

function handleConfirm() {
  const selectedObjects = allUsers.value.filter(u => selectedUserIds.value.includes(u.id));
  emit('confirm', selectedObjects);
  close();
}
</script>
