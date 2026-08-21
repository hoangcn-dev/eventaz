<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">confirmation_number</span>
          <span>Phát Hành Hạng Vé Mới (FR-08.4)</span>
        </h3>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Main Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Tên Hạng Vé Sự Kiện *</label>
          <input type="text" v-model="form.name" required placeholder="VD: Vé VIP Gold, Vé Early Bird..." class="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl font-bold text-sm focus:border-primary focus:outline-none">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Đơn Giá Vé (VNĐ) *</label>
            <input type="number" v-model.number="form.price" required min="0" step="50000" placeholder="1.500.000 VNĐ" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold text-primary focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Số Lượng Phát Hành *</label>
            <input type="number" v-model.number="form.totalQty" required min="10" step="10" placeholder="200 vé" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold focus:outline-none">
          </div>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Khu Vực Ghế Ngồi (Seating Zone) *</label>
          <select v-model="form.zone" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold focus:outline-none">
            <option value="Khu A — Ghế VIP Hàng 1 - 2 (Bục Chính)">Khu A — Ghế VIP Hàng 1 - 2 (Bục Chính)</option>
            <option value="Khu B — Ghế Trung Tâm Hàng 3 - 8">Khu B — Ghế Trung Tâm Hàng 3 - 8</option>
            <option value="Khu Báo Chí — Hàng Ghế Media B1 - B10">Khu Báo Chí — Hàng Ghế Media B1 - B10</option>
            <option value="Khu C — Khán Phòng Tầng 2 (Tự Do)">Khu C — Khán Phòng Tầng 2 (Tự Do)</option>
          </select>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Mô Tả Quyền Lợi Đi Kèm *</label>
          <textarea v-model="form.benefits" rows="2" required placeholder="Bao gồm tài liệu hội thảo, tiệc teabreak..." class="w-full px-3 py-2 border border-outline-variant rounded-xl focus:border-primary focus:outline-none"></textarea>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container">Hủy</button>
          <button type="submit" class="px-5 py-2 bg-primary text-white font-bold rounded-xl shadow hover:bg-primary-hover">Phát Hành Hạng Vé</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { saveTicketTier } from '../mock/tickets.js';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'created']);

const form = reactive({
  name: '',
  price: 1500000,
  totalQty: 200,
  zone: 'Khu B — Ghế Trung Tâm Hàng 3 - 8',
  benefits: 'Vị trí khu vực trung tâm, tiệc teabreak và slide tài liệu.'
});

watch(() => props.isOpen, (val) => {
  if (val) {
    form.name = '';
    form.price = 1500000;
    form.totalQty = 200;
  }
});

function close() {
  emit('close');
}

function handleSubmit() {
  const currentEvt = getCurrentEvent();

  const newTier = {
    id: `TKT-0${Date.now().toString().slice(-2)}`,
    eventId: currentEvt.id,
    name: form.name,
    price: form.price,
    totalQty: form.totalQty,
    soldQty: 0,
    checkedInQty: 0,
    zone: form.zone,
    benefits: form.benefits,
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    status: 'Active'
  };

  saveTicketTier(newTier);
  alert(`Đã phát hành Hạng vé [${newTier.name}] thành công!`);
  emit('created', newTier);
  close();
}
</script>
