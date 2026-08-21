<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in duration-200">
      <div class="flex justify-between items-center border-b border-outline-variant pb-3 mb-4">
        <h3 class="font-bold text-headline-sm text-primary flex items-center gap-2">
          <span class="material-symbols-outlined">file_copy</span>
          <span>Nhân bản Sự kiện (FR-01.2)</span>
        </h3>
        <button @click="close" class="text-outline hover:text-on-surface p-1 rounded-full"><span class="material-symbols-outlined">close</span></button>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-body-sm font-bold mb-1">Chọn Mẫu (Template) hoặc Sự kiện nguồn <span class="text-error">*</span></label>
          <select v-model="selectedSource" required class="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-sm bg-white">
            <optgroup label="Thư viện Template Mẫu">
              <option v-for="t in templates" :key="t.id" :value="'TPL:' + t.id">[Template] {{ t.name }}</option>
            </optgroup>
            <optgroup label="Sự kiện hiện có">
              <option v-for="e in events" :key="e.id" :value="'EVT:' + e.id">[Sự kiện] {{ e.name }} ({{ e.id }})</option>
            </optgroup>
          </select>
        </div>
        <div>
          <label class="block text-body-sm font-bold mb-1">Tên sự kiện mới <span class="text-error">*</span></label>
          <input type="text" v-model="form.name" required placeholder="Nhập tên sự kiện mới..." class="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-sm">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-body-sm font-bold mb-1">Ngày bắt đầu</label>
            <input type="date" v-model="form.startDate" class="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-sm">
          </div>
          <div>
            <label class="block text-body-sm font-bold mb-1">Ngày kết thúc</label>
            <input type="date" v-model="form.endDate" class="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-sm">
          </div>
        </div>
        <div class="flex justify-end gap-3 border-t border-outline-variant pt-4">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold text-body-sm rounded-lg hover:bg-surface-container">Hủy</button>
          <button type="submit" class="px-5 py-2 bg-primary text-white font-bold text-body-sm rounded-lg hover:bg-primary-hover shadow">Tạo từ Bản sao (Nháp)</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getTemplates } from '../mock/templates.js';
import { getEvents, cloneEvent } from '../mock/events.js';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close']);
const router = useRouter();

const templates = ref([]);
const events = ref([]);
const selectedSource = ref('');

const form = reactive({
  name: '',
  startDate: '2026-12-01',
  endDate: '2026-12-02'
});

watch(() => props.isOpen, (val) => {
  if (val) {
    templates.value = getTemplates();
    events.value = getEvents();
    if (templates.value.length > 0) {
      selectedSource.value = 'TPL:' + templates.value[0].id;
    }
  }
});

function close() {
  emit('close');
}

function handleSubmit() {
  const isTpl = selectedSource.value.startsWith("TPL:");
  const sourceId = selectedSource.value.replace("TPL:", "").replace("EVT:", "");
  const newEvt = cloneEvent(sourceId, isTpl, form);

  alert(`Nhân bản sự kiện thành công! [${newEvt.name}] được tạo ở trạng thái Nháp.`);
  close();
  router.push('/event/info');
}
</script>
