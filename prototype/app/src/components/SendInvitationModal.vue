<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">mark_email_read</span>
          <span>Gửi Thư Mời VIP & Mã QR Check-in</span>
        </h3>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Guest Preview Card -->
      <div class="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60 space-y-3 text-xs">
        <div class="flex items-center gap-3">
          <img :src="guest.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'" class="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shrink-0" alt="Avatar">
          <div class="truncate">
            <h4 class="font-extrabold text-sm text-on-surface truncate">{{ guest.name }}</h4>
            <p class="text-xs font-bold text-primary truncate">{{ guest.position }}</p>
            <p class="text-[10px] text-on-surface-variant font-mono truncate">{{ guest.organization }} • {{ guest.email }}</p>
          </div>
        </div>

        <!-- Mock QR Code Preview -->
        <div class="bg-white p-4 rounded-xl border border-outline-variant/60 flex flex-col items-center justify-center space-y-2 text-center shadow-inner">
          <div class="w-28 h-28 bg-slate-900 rounded-lg flex items-center justify-center text-white font-mono text-[10px] p-2 text-center tracking-widest relative">
            <div class="absolute inset-2 border border-dashed border-white/40 rounded flex flex-col items-center justify-center gap-1">
              <span class="material-symbols-outlined text-3xl">qr_code_2</span>
              <span class="text-[8px] font-mono">{{ guest.qrCode || 'QR-EVENTAZ-VIP' }}</span>
            </div>
          </div>
          <p class="text-[10px] font-mono font-bold text-primary">MÃ QR CHECK-IN ĐỘC BẢN SỰ KIỆN</p>
        </div>
      </div>

      <!-- Email Template Preview Summary -->
      <div class="space-y-1 text-xs">
        <p class="font-bold text-on-surface">Tiêu đề Email Thư Mời:</p>
        <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-on-surface font-medium text-[11px] leading-relaxed">
          📩 <b>[THƯ MỜI CHÍNH THỨC]</b> Trân trọng kính mời {{ guest.name }} tham dự Sự kiện {{ currentEvent.name || 'Tech Summit Asia' }} tại Trung tâm Hội nghị Quốc gia NCC.
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
        <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold text-xs rounded-xl hover:bg-surface-container">Hủy</button>
        <button type="button" @click="sendEmail" class="px-5 py-2 bg-primary text-white font-bold text-xs rounded-xl shadow hover:bg-primary-hover flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">send</span>
          <span>Gửi Email Thư Mời & QR Code</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCurrentEvent } from '../mock/events.js';

const props = defineProps({
  isOpen: Boolean,
  guest: Object
});

const emit = defineEmits(['close']);

const currentEvent = ref({});

onMounted(() => {
  currentEvent.value = getCurrentEvent();
});

function close() {
  emit('close');
}

function sendEmail() {
  alert(`Đã gửi Email thư mời điện tử & Mã QR Check-in thành công tới địa chỉ [${props.guest.email}]!`);
  close();
}
</script>
