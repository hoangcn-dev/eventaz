<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">theater_comedy</span>
          <span>Thêm Hạng Mục Kịch Bản Run-of-Show Mới (FR-07.4)</span>
        </h3>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Main Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Tên Hạng Mục / Tiết Mục Sân Khấu *</label>
          <input type="text" v-model="form.title" required placeholder="VD: Khai mạc nghệ thuật múa LED & Phát biểu..." class="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl font-bold text-sm focus:border-primary focus:outline-none">
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Mốc Thời Gian *</label>
            <input type="text" v-model="form.timeSlot" required placeholder="08:30 - 09:00" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold focus:outline-none focus:border-primary">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Thời Lượng (Phút) *</label>
            <input type="number" v-model.number="form.durationMin" required min="1" step="1" placeholder="30" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold text-primary focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Trạng Thái Ban Đầu *</label>
            <select v-model="form.status" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold focus:outline-none">
              <option value="Scheduled">🟡 Chờ lên sóng</option>
              <option value="Ongoing">🟢 Đang diễn ra (Live)</option>
              <option value="Completed">⚪ Đã hoàn thành</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Diễn Giả / Nhân Vật Chính *</label>
            <input type="text" v-model="form.performer" required placeholder="Tên ca sĩ, diễn giả, BTC..." class="w-full px-3 py-2 border border-outline-variant rounded-xl font-bold focus:outline-none focus:border-primary">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Nhân Sự Điều Phối Sân Khấu *</label>
            <select v-model="form.stageManager" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-medium focus:outline-none focus:border-primary">
              <option value="Ngô Đức Quang (Floor Manager)">Ngô Đức Quang (Floor Manager)</option>
              <option value="Trần Thị Hậu Cần (Logistics Lead)">Trần Thị Hậu Cần (Logistics Lead)</option>
              <option value="Lê Văn Nội Dung (Content Lead)">Lê Văn Nội Dung (Content Lead)</option>
              <option value="Vũ Anh Kỹ Thuật (Tech Lead)">Vũ Anh Kỹ Thuật (Tech Lead)</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Lời Thoại / Kịch Bản MC Dẫn Nhập *</label>
          <textarea v-model="form.mcScript" rows="2" required placeholder="Nội dung kịch bản lời thoại dành cho MC..." class="w-full px-3 py-2 border border-outline-variant rounded-xl focus:border-primary focus:outline-none"></textarea>
        </div>

        <!-- Technical Cues Section -->
        <div class="p-3 bg-surface-container-low rounded-xl border border-outline-variant/60 space-y-3">
          <label class="block font-extrabold text-primary uppercase text-[11px]">Tín Hiệu Kỹ Thuật Real-time (Technical Cues - FR-07.2)</label>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">🎵 Cue Âm Thanh (Sound Track)</label>
              <input type="text" v-model="form.soundCue" placeholder="VD: Track 02 - High Energy" class="w-full px-2.5 py-1.5 border border-outline-variant rounded-lg font-medium text-[11px] focus:outline-none">
            </div>
            <div>
              <label class="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">🖼️ Cue Màn Hình LED (Visual)</label>
              <input type="text" v-model="form.ledCue" placeholder="VD: Loop Visual 3D Mapping" class="w-full px-2.5 py-1.5 border border-outline-variant rounded-lg font-medium text-[11px] focus:outline-none">
            </div>
            <div>
              <label class="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">💡 Cue Ánh Sáng (Lighting)</label>
              <input type="text" v-model="form.lightCue" placeholder="VD: Spotlight Bục A" class="w-full px-2.5 py-1.5 border border-outline-variant rounded-lg font-medium text-[11px] focus:outline-none">
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container">Hủy</button>
          <button type="submit" class="px-5 py-2 bg-primary text-white font-bold rounded-xl shadow hover:bg-primary-hover">Thêm Vào Kịch Bản Run-of-Show</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { saveCueItem } from '../mock/runofshow.js';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'created']);

const form = reactive({
  title: '',
  timeSlot: '09:00 - 09:30',
  durationMin: 30,
  performer: '',
  mcScript: '',
  soundCue: 'Audio Track 01',
  ledCue: 'Visual Loop KeyVisual',
  lightCue: 'Warm Light 100%',
  stageManager: 'Ngô Đức Quang (Floor Manager)',
  status: 'Scheduled'
});

watch(() => props.isOpen, (val) => {
  if (val) {
    form.title = '';
    form.performer = '';
    form.mcScript = '';
  }
});

function close() {
  emit('close');
}

function handleSubmit() {
  const currentEvt = getCurrentEvent();

  const newCue = {
    id: `CUE-0${Date.now().toString().slice(-2)}`,
    eventId: currentEvt.id,
    order: Date.now(),
    timeSlot: form.timeSlot,
    durationMin: form.durationMin,
    title: form.title,
    mcScript: form.mcScript,
    performer: form.performer,
    cues: {
      sound: form.soundCue || 'Audio Track Standard',
      led: form.ledCue || 'Visual Banner Standard',
      light: form.lightCue || 'Full Light Stage'
    },
    stageManager: form.stageManager,
    status: form.status
  };

  saveCueItem(newCue);
  alert(`Đã thêm tiết mục [${newCue.title}] vào Kịch bản Run-of-Show thành công!`);
  emit('created', newCue);
  close();
}
</script>
