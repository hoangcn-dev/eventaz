<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
      <!-- Modal Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">account_tree</span>
          <span>Tạo Nhóm Hạng Mục WBS Mới (FR-01.3)</span>
        </h3>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Tên Nhóm Hạng Mục WBS *</label>
          <input 
            v-model="form.name" 
            type="text" 
            required 
            placeholder="Ví dụ: Âm thanh & Ánh sáng sân khấu..."
            class="w-full px-3 py-2 border border-outline-variant rounded-xl focus:border-primary focus:outline-none font-bold text-sm"
          >
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Giai Đoạn Áp Dụng (Tracking Overview) *</label>
          <select v-model="form.phaseId" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold text-primary focus:outline-none">
            <option v-for="p in eventPhases" :key="p.id" :value="p.id">Giai đoạn {{ p.id }}: {{ p.name }}</option>
          </select>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Trưởng nhóm phụ trách (Team Lead) *</label>
          <select v-model="form.leadId" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-medium">
            <option v-for="u in usersList" :key="u.id" :value="u.id">{{ u.name }} ({{ u.roleVi }})</option>
          </select>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Đồng phụ trách (Co-Lead tùy chọn)</label>
          <select v-model="form.coLead" class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-medium">
            <option value="">-- Không có Đồng phụ trách --</option>
            <option v-for="u in usersList" :key="u.id" :value="u.name">{{ u.name }} ({{ u.roleVi }})</option>
          </select>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container">Hủy</button>
          <button type="submit" class="px-5 py-2 bg-primary text-white font-bold rounded-xl shadow hover:bg-primary-hover">Tạo Nhóm WBS</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { getUsers } from '../mock/users.js';
import { EVENT_STAGES } from '../mock/events.js';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'created']);

const usersList = ref([]);
const eventPhases = ref(EVENT_STAGES);

const form = reactive({
  name: '',
  phaseId: 1,
  leadId: 'USR-002',
  coLead: ''
});

watch(() => props.isOpen, (val) => {
  if (val) {
    usersList.value = getUsers();
    form.name = '';
    form.phaseId = 1;
    form.leadId = 'USR-002';
    form.coLead = '';
  }
});

function close() {
  emit('close');
}

function handleSubmit() {
  const selectedLead = usersList.value.find(u => u.id === form.leadId);
  const selectedPhase = eventPhases.value.find(p => p.id === Number(form.phaseId));
  const leadName = selectedLead ? selectedLead.name : 'Trần Thị Hậu Cần';
  const phaseName = selectedPhase ? selectedPhase.name : 'Thiết lập & Lên kế hoạch';

  emit('created', {
    name: form.name,
    phaseId: Number(form.phaseId),
    phaseName: phaseName,
    leadId: form.leadId,
    leadName: leadName,
    coLead: form.coLead
  });
  close();
}
</script>
