<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">person_add</span>
          <span>Thêm Khách Mời / Diễn Giả VIP Mới (FR-05.1)</span>
        </h3>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Main Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Họ và Tên Khách Mời / Diễn Giả *</label>
          <input type="text" v-model="form.name" required placeholder="VD: Dr. Alexander Wright..." class="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl font-bold text-sm focus:border-primary focus:outline-none">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Cơ Quan / Tổ Chức *</label>
            <input type="text" v-model="form.organization" required placeholder="Tên đơn vị / tập đoàn..." class="w-full px-3 py-2 border border-outline-variant rounded-xl font-medium focus:border-primary focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Chức Vụ Chuyên Môn *</label>
            <input type="text" v-model="form.position" required placeholder="VD: VP of AI Research..." class="w-full px-3 py-2 border border-outline-variant rounded-xl font-medium focus:border-primary focus:outline-none">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Phân Loại Vai Trò Sự Kiện *</label>
            <select v-model="form.role" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold text-primary focus:outline-none">
              <option value="Speaker">🟣 Diễn giả VIP</option>
              <option value="Sponsor">🟡 Nhà tài trợ</option>
              <option value="VIP">🔵 Khách mời danh dự</option>
              <option value="Media">🟢 Báo chí & Truyền thông</option>
              <option value="Attendee">⚪ Khách tham quan</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Trạng Thái RSVP Ban Đầu *</label>
            <select v-model="form.rsvpStatus" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold focus:outline-none">
              <option value="Confirmed">🟢 Đã xác nhận</option>
              <option value="Sent">🟡 Chờ phản hồi</option>
              <option value="Declined">🔴 Từ chối tham dự</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Chủ Đề Trình Bày / Bài Phát Biểu</label>
          <input type="text" v-model="form.topic" placeholder="Chủ đề tham luận hoặc thông tin tài trợ..." class="w-full px-3 py-2 border border-outline-variant rounded-xl font-medium focus:border-primary focus:outline-none">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Địa Chỉ Email *</label>
            <input type="email" v-model="form.email" required placeholder="email@organization.com" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-medium focus:border-primary focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Số Điện Thoại Liên Hệ *</label>
            <input type="tel" v-model="form.phone" required placeholder="0903 123 456" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold focus:border-primary focus:outline-none">
          </div>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Ghi Chú Hậu Cần VIP (Vé máy bay / Khách sạn)</label>
          <input type="text" v-model="form.notes" placeholder="VD: Khách sạn Lotte Hanoi, Xe đưa đón sân bay..." class="w-full px-3 py-2 border border-outline-variant rounded-xl font-medium focus:border-primary focus:outline-none">
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container">Hủy</button>
          <button type="submit" class="px-5 py-2 bg-primary text-white font-bold rounded-xl shadow hover:bg-primary-hover">Thêm Khách Mời VIP</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { saveGuest } from '../mock/guests.js';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'created']);

const form = reactive({
  name: '',
  organization: '',
  position: '',
  role: 'Speaker',
  topic: '',
  email: '',
  phone: '',
  rsvpStatus: 'Confirmed',
  notes: ''
});

watch(() => props.isOpen, (val) => {
  if (val) {
    form.name = '';
    form.organization = '';
    form.position = '';
    form.topic = '';
    form.email = '';
    form.phone = '';
    form.notes = '';
  }
});

function close() {
  emit('close');
}

function handleSubmit() {
  const currentEvt = getCurrentEvent();

  const newGuest = {
    id: `GST-0${Date.now().toString().slice(-2)}`,
    eventId: currentEvt.id,
    name: form.name,
    organization: form.organization,
    position: form.position,
    role: form.role,
    topic: form.topic || 'Khách mời chính thức sự kiện',
    email: form.email,
    phone: form.phone,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rsvpStatus: form.rsvpStatus,
    qrCode: `QR-GUEST-${Date.now().toString().slice(-4)}`,
    hospitality: {
      flight: 'Không yêu cầu',
      hotel: 'Không yêu cầu',
      notes: form.notes || 'Đã phân công lễ tân hỗ trợ'
    }
  };

  saveGuest(newGuest);
  alert(`Đã thêm Khách mời VIP [${newGuest.name}] thành công!`);
  emit('created', newGuest);
  close();
}
</script>
