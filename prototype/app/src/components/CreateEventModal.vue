<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 animate-in fade-in zoom-in duration-200">
      <div class="flex justify-between items-center border-b border-outline-variant pb-3 mb-4">
        <h3 class="font-bold text-headline-sm text-primary flex items-center gap-2">
          <span class="material-symbols-outlined">add_circle</span>
          <span>Tạo Sự kiện Mới (FR-01.1)</span>
        </h3>
        <button @click="close" class="text-outline hover:text-on-surface p-1 rounded-full"><span class="material-symbols-outlined">close</span></button>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-body-sm font-bold mb-1">Tên sự kiện chính thức <span class="text-error">*</span></label>
          <input type="text" v-model="form.name" required placeholder="VD: Triển lãm Công nghệ Việt Nam 2026" class="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-sm">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-body-sm font-bold mb-1">Loại sự kiện <span class="text-error">*</span></label>
            <select v-model="form.category" class="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-sm">
              <option value="Hội thảo / Triển lãm">Hội thảo / Triển lãm</option>
              <option value="Event Doanh nghiệp">Event Doanh nghiệp</option>
              <option value="Đại nhạc hội">Đại nhạc hội / Giải trí</option>
              <option value="Hoạt động Nội bộ">Teambuilding / Nội bộ</option>
            </select>
          </div>
          <div>
            <label class="block text-body-sm font-bold mb-1">Quy mô (Số lượng người) <span class="text-error">*</span></label>
            <input type="number" v-model="form.scale" required placeholder="500" class="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-sm">
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-body-sm font-bold mb-1">Ngày bắt đầu <span class="text-error">*</span></label>
            <input type="date" v-model="form.startDate" required class="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-sm">
          </div>
          <div>
            <label class="block text-body-sm font-bold mb-1">Ngày kết thúc <span class="text-error">*</span></label>
            <input type="date" v-model="form.endDate" required class="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-sm">
          </div>
        </div>
        <div>
          <label class="block text-body-sm font-bold mb-1">Địa điểm dự kiến</label>
          <input type="text" v-model="form.location" placeholder="VD: Trung tâm Hội nghị Quốc gia, Hà Nội" class="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-sm">
        </div>
        <div>
          <label class="block text-body-sm font-bold mb-1">Ngân sách dự kiến (VND)</label>
          <input type="number" v-model="form.budget" placeholder="500000000" class="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-sm">
        </div>
        <div>
          <label class="block text-body-sm font-bold mb-1">Mô tả ngắn sự kiện</label>
          <textarea v-model="form.description" rows="2" placeholder="Nhập mục tiêu và nội dung chính của sự kiện..." class="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-body-sm"></textarea>
        </div>
        <div class="flex justify-end gap-3 border-t border-outline-variant pt-4">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold text-body-sm rounded-lg hover:bg-surface-container">Hủy</button>
          <button type="submit" class="px-5 py-2 bg-primary text-white font-bold text-body-sm rounded-lg hover:bg-primary-hover shadow">Tạo Sự kiện (Nháp)</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { createEvent, getEvents, setCurrentEventId } from '../mock/events.js';
import { getTemplates } from '../mock/templates.js';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close']);
const router = useRouter();

const form = reactive({
  name: '',
  category: 'Hội thảo / Triển lãm',
  scale: 500,
  startDate: '2026-12-01',
  endDate: '2026-12-02',
  location: '',
  budget: 500000000,
  description: ''
});

function close() {
  emit('close');
}

function handleConfirmCreate() {
  const eventPayload = {
    name: form.name,
    category: form.category,
    eventType: form.eventType,
    scale: form.scale,
    startDate: form.startDate,
    endDate: form.endDate,
    location: form.location || 'Trung tâm Hội nghị Quốc gia, Hà Nội',
    budget: form.budget,
    description: form.description || `Sự kiện ${form.name} được khởi tạo thành công với ${selectedModules.value.length} module quản lý.`,
    templateSource: selectedTemplateType.value,
    templateId: selectedTemplateId.value,
    enabledModules: [...selectedModules.value]
  };

  const newEvt = createEvent(eventPayload);
  if (newEvt && newEvt.id) {
    setCurrentEventId(newEvt.id);
  }

  alert(`Đã hoàn tất khởi tạo sự kiện: [${newEvt.name}]!\nĐã kích hoạt ${selectedModules.value.length} module quản lý.`);
  close();
  router.push('/event/overview');
}
</script>
