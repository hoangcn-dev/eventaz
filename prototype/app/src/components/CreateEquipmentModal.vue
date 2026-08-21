<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">inventory_2</span>
          <span>Thêm Hạng Mục Thiết Bị / Vật Tư Mới (FR-09.4)</span>
        </h3>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Main Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Tên Thiết Bị / Hạng Mục Hậu Cần *</label>
          <input type="text" v-model="form.name" required placeholder="VD: Màn hình LED P2.5 Indoor 12m x 5m..." class="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl font-bold text-sm focus:border-primary focus:outline-none">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Phân Loại Thiết Bị *</label>
            <select v-model="form.category" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold text-primary focus:outline-none">
              <option value="LedVisual">🔵 Màn hình LED & Máy chiếu</option>
              <option value="AudioLight">🟣 Âm thanh & Ánh sáng</option>
              <option value="StageTruss">🟡 Khung giàn Stage & Bục</option>
              <option value="DecorFurniture">🟢 Bàn ghế, Thảm đỏ & Decor</option>
              <option value="BannerStandee">⚪ Standee, Phướn & POSM</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Trạng Thái Bàn Giao *</label>
            <select v-model="form.handoverStatus" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold focus:outline-none">
              <option value="HandedOver">🟢 Đã bàn giao tại NCC</option>
              <option value="InTransit">🟡 Đang vận chuyển</option>
              <option value="Pending">🔴 Chưa bàn giao</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Số Lượng *</label>
            <input type="number" v-model.number="form.quantity" required min="1" step="1" placeholder="1" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Đơn Vị Tính *</label>
            <input type="text" v-model="form.unit" required placeholder="Bộ / Chiếc..." class="w-full px-3 py-2 border border-outline-variant rounded-xl font-bold focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Đơn Giá Thuê (VNĐ) *</label>
            <input type="number" v-model.number="form.unitPrice" required min="0" step="100000" placeholder="15.000.000" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold text-primary focus:outline-none">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Nhà Cung Cấp Vendor *</label>
            <input type="text" v-model="form.vendorName" required placeholder="Tên đơn vị thi công / cho thuê..." class="w-full px-3 py-2 border border-outline-variant rounded-xl font-bold focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">SĐT Liên Hệ Vendor *</label>
            <input type="tel" v-model="form.vendorPhone" required placeholder="0912 345 678" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold focus:outline-none">
          </div>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Người Tiếp Nhận Ban Hậu Cần *</label>
          <select v-model="form.receiverName" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-medium focus:outline-none">
            <option value="Trần Thị Hậu Cần (Logistics Lead)">Trần Thị Hậu Cần (Logistics Lead)</option>
            <option value="Vũ Anh Kỹ Thuật (Tech Lead)">Vũ Anh Kỹ Thuật (Tech Lead)</option>
            <option value="Phạm Hoàng Truyền Thông (Media Lead)">Phạm Hoàng Truyền Thông (Media Lead)</option>
            <option value="Ngô Đức Quang (Floor Manager)">Ngô Đức Quang (Floor Manager)</option>
          </select>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Ghi Chú Kiểm Kê & Bàn Giao Thực Địa</label>
          <textarea v-model="form.notes" rows="2" placeholder="Tình trạng kỹ thuật, thời gian hẹn giao tại sảnh NCC..." class="w-full px-3 py-2 border border-outline-variant rounded-xl focus:border-primary focus:outline-none"></textarea>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container">Hủy</button>
          <button type="submit" class="px-5 py-2 bg-primary text-white font-bold rounded-xl shadow hover:bg-primary-hover">Thêm Thiết Bị Hậu Cần</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { saveEquipmentItem } from '../mock/equipment.js';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'created']);

const form = reactive({
  name: '',
  category: 'LedVisual',
  quantity: 1,
  unit: 'Bộ',
  unitPrice: 15000000,
  vendorName: '',
  vendorPhone: '',
  receiverName: 'Vũ Anh Kỹ Thuật (Tech Lead)',
  handoverStatus: 'HandedOver',
  notes: ''
});

watch(() => props.isOpen, (val) => {
  if (val) {
    form.name = '';
    form.vendorName = '';
    form.vendorPhone = '';
    form.notes = '';
  }
});

function close() {
  emit('close');
}

function handleSubmit() {
  const currentEvt = getCurrentEvent();

  const newEqp = {
    id: `EQP-0${Date.now().toString().slice(-2)}`,
    eventId: currentEvt.id,
    name: form.name,
    category: form.category,
    quantity: form.quantity,
    unit: form.unit,
    unitPrice: form.unitPrice,
    totalCost: form.quantity * form.unitPrice,
    vendorName: form.vendorName,
    vendorPhone: form.vendorPhone,
    vendorRating: 5,
    receiverName: form.receiverName,
    handoverStatus: form.handoverStatus,
    notes: form.notes || 'Đã kiểm tra hoạt động tốt tại cổng tiếp nhận'
  };

  saveEquipmentItem(newEqp);
  alert(`Đã thêm thiết bị [${newEqp.name}] thành công!`);
  emit('created', newEqp);
  close();
}
</script>
