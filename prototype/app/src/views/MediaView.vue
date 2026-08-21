<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Banner -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-outline-variant/60 shadow-sm gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-3xl">campaign</span>
            <span>Truyền Thông & Quảng Bá (Module 06: FR-06.1 — FR-06.5)</span>
          </h1>
          <span class="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-xs">
            {{ currentEvent.name || 'Tech Summit Asia' }}
          </span>
        </div>
        <p class="text-xs text-on-surface-variant mt-1 font-medium">Lập kế hoạch nội dung đa kênh, theo dõi lịch phát hành, đo lường lượt tiếp cận Reach, Clicks và tối ưu chi phí Marketing.</p>
      </div>
      <button @click="showCreateModal = true" class="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-[18px]">add</span>
        <span>Tạo Bài Đăng / Chiến Dịch Mới</span>
      </button>
    </div>

    <!-- 4 MEDIA ANALYTICS KPI STATS CARDS (FR-06.5) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
            <span class="material-symbols-outlined">post_add</span>
          </div>
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">Campaigns</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Chiến Dịch / Bài Đăng</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">{{ summary.total }} Bài viết</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Phủ sóng trên 6 kênh truyền thông</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <span class="material-symbols-outlined">visibility</span>
          </div>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Total Reach</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Lượt Tiếp Cận (Reach)</p>
          <h2 class="text-2xl font-extrabold text-emerald-700 mt-1">{{ formatNumber(summary.totalReach) }} Reach</h2>
          <p class="text-[10px] text-emerald-600 font-bold mt-1">✓ {{ formatNumber(summary.totalClicks) }} Clicks tương tác</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-purple-50 rounded-lg text-secondary">
            <span class="material-symbols-outlined">paid</span>
          </div>
          <span class="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">Ad Spend</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Chi Phí Marketing</p>
          <h2 class="text-2xl font-extrabold text-secondary mt-1">{{ formatVnd(summary.totalAdSpend) }}</h2>
          <p class="text-[10px] text-secondary font-bold mt-1">TB CPC: {{ formatVnd(summary.avgCpc) }} / Click</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-amber-50 rounded-lg text-amber-600">
            <span class="material-symbols-outlined">schedule_send</span>
          </div>
          <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Publishing Rate</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tỷ Lệ Đã Phát Hành</p>
          <h2 class="text-2xl font-extrabold text-amber-700 mt-1">{{ summary.publishingRate }}%</h2>
          <p class="text-[10px] text-amber-600 font-bold mt-1">✓ {{ summary.publishedCount }} Đã đăng • {{ summary.scheduledCount }} Hẹn giờ</p>
        </div>
      </div>
    </div>

    <!-- CAMPAIGN PERFORMANCE ROI HIGHLIGHT BAR (FR-06.3) -->
    <div class="bg-white p-4 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-primary/10 rounded-lg text-primary">
          <span class="material-symbols-outlined">insights</span>
        </div>
        <div>
          <h4 class="font-extrabold text-on-surface">Chỉ Số Hiệu Quả Truyền Thông Đa Kênh (Campaign Performance Metrics - FR-06.3)</h4>
          <p class="text-on-surface-variant text-[11px]">Đo lường trung bình chi phí quảng cáo trên mỗi lượt nhấp chuột tương tác thực tế.</p>
        </div>
      </div>
      <div class="flex items-center gap-4 text-center">
        <div class="px-3 py-1 bg-surface-container rounded-lg border border-outline-variant/40">
          <p class="text-[10px] text-on-surface-variant font-bold uppercase">CPC Trung Bình</p>
          <p class="font-mono font-extrabold text-primary text-sm">{{ formatVnd(summary.avgCpc) }}</p>
        </div>
        <div class="px-3 py-1 bg-surface-container rounded-lg border border-outline-variant/40">
          <p class="text-[10px] text-on-surface-variant font-bold uppercase">CTR Trung Bình</p>
          <p class="font-mono font-extrabold text-emerald-700 text-sm">7.8%</p>
        </div>
        <div class="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg">
          <p class="text-[10px] font-bold uppercase">Kênh Tốt Nhất</p>
          <p class="font-bold text-xs">PR Báo chí (VnExpress)</p>
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
            placeholder="Tìm theo tiêu đề bài viết, kênh, người phụ trách..." 
            class="w-full pl-8 pr-3 py-1.5 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
          >
        </div>
        <select v-model="selectedChannelFilter" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Kênh Truyền Thông</option>
          <option v-for="(v, k) in channelMap" :key="k" :value="k">{{ v.nameVi }}</option>
        </select>
        <select v-model="selectedStatusFilter" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Trạng thái</option>
          <option value="Published">🟢 Đã phát hành</option>
          <option value="Scheduled">🟡 Đã duyệt - Hẹn giờ</option>
          <option value="Draft">🔴 Bản nháp biên tập</option>
        </select>
      </div>
      <div class="text-xs text-on-surface-variant font-medium">
        Hiển thị: <b class="text-on-surface">{{ filteredCampaigns.length }}</b> / {{ campaignsList.length }} bài viết
      </div>
    </div>

    <!-- MEDIA CAMPAIGNS DATA TABLE (9 INDEPENDENT COLUMNS - FR-06.1 -> FR-06.4) -->
    <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden p-4 space-y-4">
      <div class="overflow-x-auto overflow-y-auto max-h-[550px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1300px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[280px] bg-surface-container-low">Bài Viết / Chiến Dịch Quảng Bá</th>
              <th class="py-2.5 px-3 min-w-[180px] bg-surface-container-low">Kênh Truyền Thông</th>
              <th class="py-2.5 px-3 min-w-[140px] bg-surface-container-low">Lịch Phát Hành</th>
              <th class="py-2.5 px-3 min-w-[160px] bg-surface-container-low">Người Phụ Trách (Media)</th>
              <th class="py-2.5 px-3 min-w-[120px] text-right bg-surface-container-low">Lượt Tiếp Cận (Reach)</th>
              <th class="py-2.5 px-3 min-w-[120px] text-right bg-surface-container-low">Lượt Tương Tác (Clicks)</th>
              <th class="py-2.5 px-3 min-w-[130px] text-right bg-surface-container-low">Chi Phí Ad Spend (VNĐ)</th>
              <th class="py-2.5 px-3 min-w-[150px] text-center bg-surface-container-low">Trạng Thái Xuất Bản</th>
              <th class="py-2.5 px-3 min-w-[70px] text-right bg-surface-container-low">Thao Tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="c in filteredCampaigns" :key="c.id" class="hover:bg-surface-container-low transition-colors text-[11px]">
              <!-- 1. Bài viết / Chiến dịch -->
              <td class="py-2.5 px-3 font-bold text-on-surface">
                <div class="flex items-start gap-2.5">
                  <div class="p-2 bg-surface-container rounded-lg shrink-0 mt-0.5">
                    <span class="material-symbols-outlined text-primary text-[18px]">
                      {{ getChannelIcon(c.channel) }}
                    </span>
                  </div>
                  <div>
                    <p class="font-extrabold text-on-surface hover:text-primary cursor-pointer text-xs leading-snug">{{ c.title }}</p>
                    <p class="text-[10px] text-on-surface-variant font-normal mt-0.5 line-clamp-1" v-if="c.notes">{{ c.notes }}</p>
                  </div>
                </div>
              </td>

              <!-- 2. Kênh truyền thông -->
              <td class="py-2.5 px-3 whitespace-nowrap">
                <span :class="['px-2.5 py-0.5 rounded text-[10px] font-bold border', getChannelBadgeStyle(c.channel)]">
                  {{ c.channel }}
                </span>
              </td>

              <!-- 3. Lịch phát hành -->
              <td class="py-2.5 px-3 font-mono text-on-surface-variant whitespace-nowrap font-medium">
                {{ c.publishDate }}
              </td>

              <!-- 4. Người phụ trách -->
              <td class="py-2.5 px-3 font-bold text-on-surface whitespace-nowrap">
                {{ c.assigneeName }}
              </td>

              <!-- 5. Reach -->
              <td class="py-2.5 px-3 text-right font-mono font-bold text-on-surface whitespace-nowrap">
                {{ formatNumber(c.reach) }}
              </td>

              <!-- 6. Clicks -->
              <td class="py-2.5 px-3 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                {{ formatNumber(c.clicks) }}
              </td>

              <!-- 7. Chi phí Ad Spend -->
              <td class="py-2.5 px-3 text-right font-mono font-extrabold text-secondary whitespace-nowrap">
                {{ formatVnd(c.adSpend) }}
              </td>

              <!-- 8. Trạng thái -->
              <td class="py-2.5 px-3 text-center whitespace-nowrap">
                <select 
                  :value="c.status || 'Published'" 
                  @change="handleStatusChange(c.id, $event.target.value)"
                  :class="['px-2 py-0.5 text-[10px] font-bold rounded-lg border focus:outline-none', getStatusBadgeStyle(c.status)]"
                >
                  <option value="Published">🟢 Đã phát hành</option>
                  <option value="Scheduled">🟡 Hẹn giờ đăng</option>
                  <option value="Draft">🔴 Bản nháp biên tập</option>
                </select>
              </td>

              <!-- 9. Thao tác -->
              <td class="py-2.5 px-3 text-right whitespace-nowrap">
                <button @click="handleDeleteCampaign(c.id, c.title)" class="p-1 hover:bg-red-50 rounded text-red-600 transition-colors" title="Xóa bài viết">
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL KHỞI TẠO BÀI VIẾT / CHIẾN DỊCH MỚI -->
    <CreateCampaignModal
      :isOpen="showCreateModal"
      @close="showCreateModal = false"
      @created="loadMediaData"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { getMediaCampaigns, deleteMediaCampaign, changeCampaignStatus, calculateMediaSummary, MEDIA_CHANNELS, PUBLISH_STATUSES } from '../mock/media.js';
import CreateCampaignModal from '../components/CreateCampaignModal.vue';

const currentEvent = ref({});
const campaignsList = ref([]);
const summary = ref({
  total: 0,
  totalReach: 0,
  totalClicks: 0,
  totalAdSpend: 0,
  publishedCount: 0,
  scheduledCount: 0,
  draftCount: 0,
  publishingRate: 0,
  avgCpc: 0
});

const channelMap = MEDIA_CHANNELS;

const searchQuery = ref('');
const selectedChannelFilter = ref('');
const selectedStatusFilter = ref('');

const showCreateModal = ref(false);

function loadMediaData() {
  currentEvent.value = getCurrentEvent();
  campaignsList.value = getMediaCampaigns(currentEvent.value.id);
  summary.value = calculateMediaSummary(currentEvent.value.id);
}

const filteredCampaigns = computed(() => {
  return campaignsList.value.filter(c => {
    const matchQuery = !searchQuery.value || 
      (c.title && c.title.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (c.assigneeName && c.assigneeName.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (c.channel && c.channel.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchChannel = !selectedChannelFilter.value || c.channel === selectedChannelFilter.value;
    const matchStatus = !selectedStatusFilter.value || c.status === selectedStatusFilter.value;
    return matchQuery && matchChannel && matchStatus;
  });
});

function formatNumber(num) {
  if (!num && num !== 0) return '0';
  return num.toLocaleString();
}

function formatVnd(val) {
  if (!val && val !== 0) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
}

function getChannelBadgeStyle(channel) {
  const map = MEDIA_CHANNELS;
  return map[channel] ? map[channel].color : 'bg-gray-100 text-gray-700 border-gray-300';
}

function getChannelIcon(channel) {
  const map = MEDIA_CHANNELS;
  return map[channel] ? map[channel].icon : 'campaign';
}

function getStatusBadgeStyle(status) {
  const map = PUBLISH_STATUSES;
  return map[status] ? map[status].color : 'bg-gray-100 text-gray-700 border-gray-300';
}

function handleStatusChange(campaignId, newStatus) {
  changeCampaignStatus(campaignId, newStatus);
  loadMediaData();
}

function handleDeleteCampaign(id, title) {
  if (confirm(`Bạn có chắc chắn muốn xóa bài viết / chiến dịch [${title}]?`)) {
    deleteMediaCampaign(id);
    alert(`Đã xóa bài viết [${title}] thành công!`);
    loadMediaData();
  }
}

onMounted(() => {
  loadMediaData();
});
</script>
