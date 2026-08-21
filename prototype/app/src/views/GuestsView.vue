<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Banner -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-outline-variant/60 shadow-sm gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-3xl">star</span>
            <span>Khách Mời, Diễn Giả & Đối Tác (Module 05: FR-05.1 — FR-05.5)</span>
          </h1>
          <span class="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-xs">
            {{ currentEvent.name || 'Tech Summit Asia' }}
          </span>
        </div>
        <p class="text-xs text-on-surface-variant mt-1 font-medium">Quản lý danh sách khách mời VIP, theo dõi trạng thái phản hồi RSVP, hậu cầu đón tiếp và gửi thư mời mã QR.</p>
      </div>
      <button @click="showCreateModal = true" class="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-[18px]">person_add</span>
        <span>Thêm Khách Mời VIP</span>
      </button>
    </div>

    <!-- 4 RSVP KPI STATS CARDS (FR-05.5) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-purple-50 rounded-lg text-secondary">
            <span class="material-symbols-outlined">badge</span>
          </div>
          <span class="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">VIP Roster</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Khách Mời VIP</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">{{ summary.total }} Khách mời</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Đã phân loại vai trò chuyên môn</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <span class="material-symbols-outlined">how_to_reg</span>
          </div>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">RSVP Rate</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tỷ Lệ Xác Nhận Tham Dự</p>
          <h2 class="text-2xl font-extrabold text-emerald-700 mt-1">{{ summary.rsvpRate }}%</h2>
          <p class="text-[10px] text-emerald-600 font-bold mt-1">✓ {{ summary.confirmed }} / {{ summary.total }} Đã xác nhận</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
            <span class="material-symbols-outlined">record_voice_over</span>
          </div>
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">Keynote Speakers</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Số Diễn Giả VIP</p>
          <h2 class="text-2xl font-extrabold text-blue-700 mt-1">{{ summary.speakers }} Diễn giả</h2>
          <p class="text-[10px] text-blue-600 font-medium mt-1">Đảm nhận bài tham luận chính</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-amber-50 rounded-lg text-amber-600">
            <span class="material-symbols-outlined">handshake</span>
          </div>
          <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Sponsors & Media</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Nhà Tài Trợ & Báo Chí</p>
          <h2 class="text-2xl font-extrabold text-amber-700 mt-1">{{ summary.sponsors }} Đối tác</h2>
          <p class="text-[10px] text-amber-600 font-bold mt-1">Đơn vị bảo trợ chính thức</p>
        </div>
      </div>
    </div>

    <!-- SEARCH & FILTER BAR -->
    <div class="bg-white p-3.5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
      <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto text-xs">
        <div class="relative w-full sm:w-72">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Tìm tên khách mời, cơ quan, bài tham luận..." 
            class="w-full pl-8 pr-3 py-1.5 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
          >
        </div>
        <select v-model="selectedRoleFilter" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Vai trò</option>
          <option value="Speaker">🟣 Diễn giả VIP</option>
          <option value="Sponsor">🟡 Nhà tài trợ</option>
          <option value="VIP">🔵 Khách mời danh dự</option>
          <option value="Media">🟢 Báo chí & Truyền thông</option>
        </select>
        <select v-model="selectedRsvpFilter" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Trạng thái RSVP</option>
          <option value="Confirmed">🟢 Đã xác nhận</option>
          <option value="Sent">🟡 Chờ phản hồi</option>
          <option value="Declined">🔴 Từ chối</option>
        </select>
      </div>
      <div class="text-xs text-on-surface-variant font-medium">
        Hiển thị: <b class="text-on-surface">{{ filteredGuests.length }}</b> / {{ guestsList.length }} khách mời
      </div>
    </div>

    <!-- GUESTS DATA TABLE (9 INDEPENDENT COLUMNS - FR-05.1 -> FR-05.4) -->
    <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden p-4 space-y-4">
      <div class="overflow-x-auto overflow-y-auto max-h-[550px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1350px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[220px] bg-surface-container-low">Khách Mời / Diễn Giả</th>
              <th class="py-2.5 px-3 min-w-[180px] bg-surface-container-low">Cơ Quan & Chức Vụ</th>
              <th class="py-2.5 px-3 min-w-[140px] bg-surface-container-low">Vai Trò Sự Kiện</th>
              <th class="py-2.5 px-3 min-w-[240px] bg-surface-container-low">Chủ Đề Trình Bày / Tham Luận</th>
              <th class="py-2.5 px-3 min-w-[140px] text-center bg-surface-container-low">Trạng Thái RSVP</th>
              <th class="py-2.5 px-3 min-w-[180px] bg-surface-container-low">Hậu Cần VIP (Vé / Khách Sạn)</th>
              <th class="py-2.5 px-3 min-w-[120px] text-center bg-surface-container-low">Mã QR Check-in</th>
              <th class="py-2.5 px-3 min-w-[120px] bg-surface-container-low">Số Điện Thoại</th>
              <th class="py-2.5 px-3 min-w-[100px] text-right bg-surface-container-low">Thao Tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="g in filteredGuests" :key="g.id" class="hover:bg-surface-container-low transition-colors text-[11px]">
              <!-- 1. Khách Mời / Diễn Giả -->
              <td class="py-2.5 px-3 font-bold text-on-surface whitespace-nowrap">
                <div class="flex items-center gap-2.5">
                  <img :src="g.avatar" class="w-8 h-8 rounded-full border border-outline-variant object-cover shrink-0" alt="Avatar">
                  <div class="truncate">
                    <p class="font-bold text-on-surface truncate text-xs">{{ g.name }}</p>
                    <p class="text-[10px] text-on-surface-variant font-mono truncate">{{ g.email }}</p>
                  </div>
                </div>
              </td>

              <!-- 2. Cơ Quan & Chức Vụ -->
              <td class="py-2.5 px-3">
                <p class="font-bold text-on-surface leading-tight text-xs">{{ g.position }}</p>
                <p class="text-[10px] text-on-surface-variant truncate font-medium mt-0.5">{{ g.organization }}</p>
              </td>

              <!-- 3. Vai Trò -->
              <td class="py-2.5 px-3 whitespace-nowrap">
                <span :class="['px-2.5 py-0.5 rounded text-[10px] font-bold border', getRoleBadgeStyle(g.role)]">
                  {{ getRoleNameVi(g.role) }}
                </span>
              </td>

              <!-- 4. Chủ đề bài tham luận -->
              <td class="py-2.5 px-3">
                <p class="font-medium text-primary leading-snug line-clamp-2">{{ g.topic }}</p>
              </td>

              <!-- 5. Trạng thái RSVP -->
              <td class="py-2.5 px-3 text-center whitespace-nowrap">
                <select 
                  :value="g.rsvpStatus || 'Confirmed'" 
                  @change="handleRsvpChange(g.id, $event.target.value)"
                  :class="['px-2 py-0.5 text-[10px] font-bold rounded-lg border focus:outline-none', getRsvpBadgeStyle(g.rsvpStatus)]"
                >
                  <option value="Confirmed">🟢 Đã xác nhận</option>
                  <option value="Sent">🟡 Chờ phản hồi</option>
                  <option value="Declined">🔴 Từ chối</option>
                </select>
              </td>

              <!-- 6. Hậu cần VIP -->
              <td class="py-2.5 px-3">
                <div class="text-[10px] space-y-0.5 text-on-surface-variant">
                  <p class="font-bold text-on-surface truncate" v-if="g.hospitality && g.hospitality.hotel !== 'Không yêu cầu'">🏨 {{ g.hospitality.hotel }}</p>
                  <p class="truncate" v-if="g.hospitality && g.hospitality.notes">✈️ {{ g.hospitality.notes }}</p>
                </div>
              </td>

              <!-- 7. Mã QR Check-in -->
              <td class="py-2.5 px-3 text-center whitespace-nowrap">
                <span @click="openSendInviteModal(g)" class="px-2 py-0.5 bg-surface-container text-primary border border-primary/20 font-mono font-bold text-[10px] rounded hover:underline cursor-pointer">
                  {{ g.qrCode }}
                </span>
              </td>

              <!-- 8. Số Điện Thoại -->
              <td class="py-2.5 px-3 font-mono text-on-surface-variant whitespace-nowrap">
                {{ g.phone }}
              </td>

              <!-- 9. Thao Tác -->
              <td class="py-2.5 px-3 text-right whitespace-nowrap">
                <div class="flex items-center justify-end gap-1">
                  <button @click="openSendInviteModal(g)" class="p-1 hover:bg-primary/10 rounded text-primary transition-colors" title="Gửi Email thư mời & Mã QR Check-in">
                    <span class="material-symbols-outlined text-[16px]">mark_email_read</span>
                  </button>
                  <button @click="handleDeleteGuest(g.id, g.name)" class="p-1 hover:bg-red-50 rounded text-red-600 transition-colors" title="Xóa khách mời">
                    <span class="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL THÊM KHÁCH MỜI VIP (FR-05.1) -->
    <CreateGuestModal
      :isOpen="showCreateModal"
      @close="showCreateModal = false"
      @created="loadGuestsData"
    />

    <!-- MODAL GỬI THƯ MỜI & MÃ QR CHECK-IN (FR-05.4) -->
    <SendInvitationModal
      :isOpen="showSendInviteModal"
      :guest="activeGuestForInvite"
      @close="showSendInviteModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { getGuests, deleteGuest, changeRsvpStatus, calculateGuestSummary, GUEST_ROLES, RSVP_STATUSES } from '../mock/guests.js';
import CreateGuestModal from '../components/CreateGuestModal.vue';
import SendInvitationModal from '../components/SendInvitationModal.vue';

const currentEvent = ref({});
const guestsList = ref([]);
const summary = ref({
  total: 0,
  confirmed: 0,
  sent: 0,
  declined: 0,
  speakers: 0,
  sponsors: 0,
  rsvpRate: 0
});

const searchQuery = ref('');
const selectedRoleFilter = ref('');
const selectedRsvpFilter = ref('');

const showCreateModal = ref(false);
const showSendInviteModal = ref(false);
const activeGuestForInvite = ref({});

function loadGuestsData() {
  currentEvent.value = getCurrentEvent();
  guestsList.value = getGuests(currentEvent.value.id);
  summary.value = calculateGuestSummary(currentEvent.value.id);
}

const filteredGuests = computed(() => {
  return guestsList.value.filter(g => {
    const matchQuery = !searchQuery.value || 
      (g.name && g.name.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (g.organization && g.organization.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (g.topic && g.topic.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (g.email && g.email.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchRole = !selectedRoleFilter.value || g.role === selectedRoleFilter.value;
    const matchRsvp = !selectedRsvpFilter.value || g.rsvpStatus === selectedRsvpFilter.value;
    return matchQuery && matchRole && matchRsvp;
  });
});

function getRoleBadgeStyle(role) {
  const map = GUEST_ROLES;
  return map[role] ? map[role].color : 'bg-gray-100 text-gray-700 border-gray-300';
}

function getRoleNameVi(role) {
  const map = GUEST_ROLES;
  return map[role] ? map[role].nameVi : role;
}

function getRsvpBadgeStyle(status) {
  const map = RSVP_STATUSES;
  return map[status] ? map[status].color : 'bg-gray-100 text-gray-700 border-gray-300';
}

function handleRsvpChange(guestId, newStatus) {
  changeRsvpStatus(guestId, newStatus);
  loadGuestsData();
}

function openSendInviteModal(guest) {
  activeGuestForInvite.value = guest;
  showSendInviteModal.value = true;
}

function handleDeleteGuest(id, name) {
  if (confirm(`Bạn có chắc chắn muốn xóa Khách mời VIP [${name}]?`)) {
    deleteGuest(id);
    alert(`Đã xóa khách mời [${name}] thành công!`);
    loadGuestsData();
  }
}

onMounted(() => {
  loadGuestsData();
});
</script>
