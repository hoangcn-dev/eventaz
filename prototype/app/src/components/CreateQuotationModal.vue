<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">request_quote</span>
          <span>Khởi Tạo Báo Giá B2B Doanh Nghiệp Mới (FR-11.4)</span>
        </h3>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Main Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Tên Khách Hàng Doanh Nghiệp / Tập Đoàn *</label>
          <input type="text" v-model="form.companyName" required placeholder="VD: Tập đoàn Công nghệ TechCorp Vietnam..." class="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl font-bold text-sm focus:border-primary focus:outline-none">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Người Đại Diện Liên Hệ *</label>
            <input type="text" v-model="form.contactPerson" required placeholder="Ông Nguyễn Hoàng Nam..." class="w-full px-3 py-2 border border-outline-variant rounded-xl font-bold focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Số Điện Thoại Liên Hệ *</label>
            <input type="tel" v-model="form.contactPhone" required placeholder="0912 345 678" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold focus:outline-none">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Quy Mô Khách Tham Dự *</label>
            <input type="number" v-model.number="form.attendeesCount" required min="50" step="50" placeholder="1000 khách" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Trạng Thái Báo Giá *</label>
            <select v-model="form.status" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold text-primary focus:outline-none">
              <option value="PendingApproval">🟡 Chờ khách duyệt</option>
              <option value="ContractSigned">🟢 Đã ký hợp đồng</option>
              <option value="Rejected">🔴 Từ chối / Hủy</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Tổng Giá Trị Gói (VNĐ) *</label>
            <input type="number" v-model.number="form.subtotal" required min="10000000" step="5000000" placeholder="250.000.000" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold text-primary focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Thuế VAT (%) *</label>
            <select v-model.number="form.vatPercent" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold focus:outline-none">
              <option :value="8">8% (Ưu đãi)</option>
              <option :value="10">10% (Chuẩn)</option>
              <option :value="0">0% (Miễn thuế)</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Chiết Khấu (VNĐ)</label>
            <input type="number" v-model.number="form.discountAmount" required min="0" step="1000000" placeholder="10.000.000" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold focus:outline-none">
          </div>
        </div>

        <!-- Calculated Summary Preview -->
        <div class="p-3 bg-surface-container rounded-xl border border-outline-variant/60 space-y-1 text-xs">
          <div class="flex justify-between">
            <span class="text-on-surface-variant font-bold">Thành tiền sau VAT & Chiết khấu:</span>
            <span class="font-mono font-extrabold text-secondary text-sm">{{ formatVnd(calculatedTotal) }}</span>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container">Hủy</button>
          <button type="submit" class="px-5 py-2 bg-primary text-white font-bold rounded-xl shadow hover:bg-primary-hover">Tạo Báo Giá B2B</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { saveQuotation } from '../mock/quotations.js';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'created']);

const form = reactive({
  companyName: '',
  contactPerson: '',
  contactPhone: '',
  attendeesCount: 500,
  subtotal: 200000000,
  vatPercent: 10,
  discountAmount: 10000000,
  status: 'PendingApproval'
});

const calculatedTotal = computed(() => {
  const vatValue = (form.subtotal * form.vatPercent) / 100;
  return form.subtotal + vatValue - form.discountAmount;
});

function formatVnd(val) {
  if (!val && val !== 0) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
}

watch(() => props.isOpen, (val) => {
  if (val) {
    form.companyName = '';
    form.contactPerson = '';
    form.contactPhone = '';
  }
});

function close() {
  emit('close');
}

function handleSubmit() {
  const currentEvt = getCurrentEvent();
  const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
  const total = calculatedTotal.value;

  const newQuo = {
    id: `QUO-2026-0${Date.now().toString().slice(-2)}`,
    eventId: currentEvt.id,
    companyName: form.companyName,
    contactPerson: form.contactPerson,
    contactPhone: form.contactPhone,
    attendeesCount: form.attendeesCount,
    subtotal: form.subtotal,
    vatPercent: form.vatPercent,
    discountAmount: form.discountAmount,
    totalAmount: total,
    creatorName: 'Nguyễn Văn Trưởng (Trưởng BTC)',
    createdDate: nowStr,
    status: form.status,
    milestones: [
      { step: 'Đợt 1', name: 'Tạm ứng cọc 50% Hợp đồng sau khi ký', amount: total / 2, status: 'Pending' },
      { step: 'Đợt 2', name: 'Thanh toán 50% sau khi nghiệm thu kết thúc sự kiện', amount: total / 2, status: 'Pending' }
    ],
    lineItems: [
      { name: 'Thuê Trọn gói Địa điểm & Sân khấu', qty: 1, unitPrice: form.subtotal * 0.6, total: form.subtotal * 0.6 },
      { name: 'Gói Thiết bị Âm thanh LED & Nhân sự EventAZ', qty: 1, unitPrice: form.subtotal * 0.4, total: form.subtotal * 0.4 }
    ]
  };

  saveQuotation(newQuo);
  alert(`Đã khởi tạo Báo giá B2B cho [${newQuo.companyName}] thành công!`);
  emit('created', newQuo);
  close();
}
</script>
