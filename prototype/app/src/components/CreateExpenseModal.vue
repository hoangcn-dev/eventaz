<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">receipt_long</span>
          <span>Thêm Khoản Chi / Hóa Đơn Mới (FR-04.3)</span>
        </h3>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Main Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Tên Khoản Chi / Hạng Mục Dịch Vụ *</label>
          <input type="text" v-model="form.title" required placeholder="VD: Thuê âm thanh màn hình LED đợt 1..." class="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl font-bold text-sm focus:border-primary focus:outline-none">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Mã Hóa Đơn / Số Chứng Từ *</label>
            <input type="text" v-model="form.invoiceNo" required placeholder="HD-2026-XXXX" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold focus:border-primary focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Đơn Vị Cung Cấp (Vendor) *</label>
            <input type="text" v-model="form.vendor" required placeholder="Tên công ty / nhà cung cấp..." class="w-full px-3 py-2 border border-outline-variant rounded-xl font-bold focus:border-primary focus:outline-none">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Nhóm Hạng Mục WBS *</label>
            <select v-model="form.wbsId" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-medium focus:outline-none focus:border-primary">
              <option v-for="w in wbsList" :key="w.id" :value="w.id">{{ w.name }} ({{ w.id }})</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Trạng Thái Thanh Toán *</label>
            <select v-model="form.paymentStatus" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold focus:outline-none focus:border-primary">
              <option value="Paid">🟢 Đã thanh toán</option>
              <option value="Advanced">🟡 Tạm ứng</option>
              <option value="Pending">🟠 Chờ thanh toán</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Số Tiền Khoản Chi (VNĐ) *</label>
          <input type="number" v-model.number="form.amount" required min="1000" step="1000" placeholder="Nhập số tiền VNĐ..." class="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl font-mono font-bold text-sm text-primary focus:border-primary focus:outline-none">
          <p class="text-[10px] text-on-surface-variant font-mono mt-1">Bằng chữ: {{ formatVnd(form.amount) }}</p>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Ghi Chú & Nội Dung Diễn Giải</label>
          <textarea v-model="form.notes" rows="2" placeholder="Ghi chú chi tiết đợt thanh toán..." class="w-full px-3 py-2 border border-outline-variant rounded-xl focus:border-primary focus:outline-none"></textarea>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container">Hủy</button>
          <button type="submit" class="px-5 py-2 bg-primary text-white font-bold rounded-xl shadow hover:bg-primary-hover">Thêm Khoản Chi Mới</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { saveExpense } from '../mock/budget.js';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'created']);

const wbsList = ref([]);

const form = reactive({
  title: '',
  invoiceNo: '',
  vendor: '',
  wbsId: 'WBS-01',
  amount: 15000000,
  paymentStatus: 'Paid',
  notes: ''
});

watch(() => props.isOpen, (val) => {
  if (val) {
    const currentEvt = getCurrentEvent();
    wbsList.value = currentEvt.wbs || [];
    form.invoiceNo = `HD-2026-${String(Date.now()).slice(-4)}`;
    if (wbsList.value.length > 0) {
      form.wbsId = wbsList.value[0].id;
    }
  }
});

function formatVnd(val) {
  if (!val) return '0 VNĐ';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
}

function close() {
  emit('close');
}

function handleSubmit() {
  const currentEvt = getCurrentEvent();
  const selectedWbs = wbsList.value.find(w => w.id === form.wbsId);

  const newExpense = {
    id: `EXP-0${Date.now().toString().slice(-2)}`,
    eventId: currentEvt.id,
    invoiceNo: form.invoiceNo,
    title: form.title,
    wbsId: form.wbsId,
    wbsName: selectedWbs ? selectedWbs.name : 'Hạng mục sự kiện',
    vendor: form.vendor,
    amount: form.amount,
    paymentStatus: form.paymentStatus,
    expenseDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
    uploader: 'Nguyễn Văn Trưởng',
    notes: form.notes
  };

  saveExpense(newExpense);
  alert(`Đã thêm khoản chi [${newExpense.title}] với số tiền ${formatVnd(newExpense.amount)} thành công!`);
  emit('created', newExpense);
  close();
}
</script>
