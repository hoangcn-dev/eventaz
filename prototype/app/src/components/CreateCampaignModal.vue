<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">campaign</span>
          <span>Tạo Bài Đăng / Chiến Dịch Truyền Thông Mới (FR-06.4)</span>
        </h3>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Main Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Tiêu Đề Bài Viết / Chiến Dịch Quảng Bá *</label>
          <input type="text" v-model="form.title" required placeholder="VD: Chạy chiến dịch Facebook Ads nhắm mục tiêu doanh nghiệp..." class="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl font-bold text-sm focus:border-primary focus:outline-none">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Kênh Truyền Thông *</label>
            <select v-model="form.channel" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold text-primary focus:outline-none">
              <option value="Facebook Ads">🔵 Facebook Ads & Fanpage</option>
              <option value="PR Báo chí">🔴 PR Báo chí (VnExpress, Dân Trí)</option>
              <option value="Email Marketing">🟣 Email Marketing Broadcast</option>
              <option value="Seeding Group">🟢 Seeding Group & Diễn đàn</option>
              <option value="KOLs / Influencers">🟡 KOLs & Influencers</option>
              <option value="Phướn & Standee">⚪ Phướn đường & Standee</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Trạng Thái Ban Đầu *</label>
            <select v-model="form.status" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold focus:outline-none">
              <option value="Published">🟢 Đã phát hành</option>
              <option value="Scheduled">🟡 Đã duyệt - Hẹn giờ đăng</option>
              <option value="Draft">🔴 Bản nháp biên tập</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Lịch Phát Hành (Phút) *</label>
            <input type="datetime-local" v-model="form.publishDate" required class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold focus:border-primary focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Người Phụ Trách Ban Media *</label>
            <select v-model="form.assigneeId" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-medium focus:outline-none">
              <option v-for="u in mediaUsers" :key="u.id" :value="u.id">{{ u.name }} ({{ u.roleVi }})</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Dự Toán Chi Phí Marketing (VNĐ) *</label>
            <input type="number" v-model.number="form.adSpend" required min="0" step="500000" placeholder="15.000.000 VNĐ" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold text-primary focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Dự Kiến Lượt Tiếp Cận (Reach)</label>
            <input type="number" v-model.number="form.reach" required min="1000" step="1000" placeholder="50.000 Reach" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold focus:outline-none">
          </div>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Ghi Chú & Kế Hoạch Nội Dung</label>
          <textarea v-model="form.notes" rows="2" placeholder="Ghi chú chi tiết mục tiêu chiến dịch..." class="w-full px-3 py-2 border border-outline-variant rounded-xl focus:border-primary focus:outline-none"></textarea>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container">Hủy</button>
          <button type="submit" class="px-5 py-2 bg-primary text-white font-bold rounded-xl shadow hover:bg-primary-hover">Tạo Chiến Dịch Truyền Thông</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { saveMediaCampaign } from '../mock/media.js';
import { getUsers } from '../mock/users.js';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'created']);

const mediaUsers = ref([]);

const form = reactive({
  title: '',
  channel: 'Facebook Ads',
  status: 'Published',
  publishDate: '2026-08-25T09:00',
  assigneeId: 'USR-004',
  adSpend: 15000000,
  reach: 50000,
  notes: ''
});

watch(() => props.isOpen, (val) => {
  if (val) {
    mediaUsers.value = getUsers();
    if (mediaUsers.value.length > 0) {
      form.assigneeId = mediaUsers.value[0].id;
    }
  }
});

function close() {
  emit('close');
}

function handleSubmit() {
  const currentEvt = getCurrentEvent();
  const assigneeUser = mediaUsers.value.find(u => u.id === form.assigneeId);

  const cleanPublishDate = form.publishDate ? form.publishDate.replace('T', ' ') : '2026-08-25 09:00';

  const newCampaign = {
    id: `CAM-0${Date.now().toString().slice(-2)}`,
    eventId: currentEvt.id,
    title: form.title,
    channel: form.channel,
    publishDate: cleanPublishDate,
    assigneeId: form.assigneeId,
    assigneeName: assigneeUser ? assigneeUser.name : 'Phạm Hoàng Truyền Thông',
    reach: form.reach,
    clicks: Math.round(form.reach * 0.08), // Estimated ~8% CTR
    adSpend: form.adSpend,
    status: form.status,
    notes: form.notes
  };

  saveMediaCampaign(newCampaign);
  alert(`Đã khởi tạo chiến dịch [${newCampaign.title}] trên kênh [${newCampaign.channel}] thành công!`);
  emit('created', newCampaign);
  close();
}
</script>
