<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Banner -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-outline-variant/60 shadow-sm gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-3xl">request_quote</span>
            <span>Báo Giá Doanh Nghiệp B2B & Hợp Đồng (Module 11)</span>
          </h1>
          <span class="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-xs">
            {{ currentEvent.name || 'Tech Summit Asia' }}
          </span>
        </div>
        <p class="text-xs text-on-surface-variant mt-1 font-medium">Quản lý báo giá trọn gói cho khách hàng doanh nghiệp B2B, theo dõi chi tiết thuế VAT, chiết khấu và tiến độ đợt thanh toán hợp đồng.</p>
      </div>
      <button @click="showCreateModal = true" class="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-[18px]">add</span>
        <span>Khởi Tạo Báo Giá B2B Mới</span>
      </button>
    </div>

    <!-- 4 B2B REVENUE KPI STATS CARDS (FR-11.5) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
            <span class="material-symbols-outlined">description</span>
          </div>
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">B2B Quotations</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Số Báo Giá B2B</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">{{ summary.total }} Báo giá</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Lập cho các Tập đoàn & Doanh nghiệp</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-purple-50 rounded-lg text-secondary">
            <span class="material-symbols-outlined">payments</span>
          </div>
          <span class="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">B2B Revenue</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Doanh Thu Hợp Đồng B2B</p>
          <h2 class="text-2xl font-extrabold text-secondary mt-1">{{ formatVnd(summary.totalB2bRevenue) }}</h2>
          <p class="text-[10px] text-secondary font-bold mt-1">Từ {{ summary.signedCount }} hợp đồng đã ký kết</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <span class="material-symbols-outlined">handshake</span>
          </div>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Conversion Rate</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tỷ Lệ Chốt Hợp Đồng B2B</p>
          <h2 class="text-2xl font-extrabold text-emerald-700 mt-1">{{ summary.conversionRate }}%</h2>
          <p class="text-[10px] text-emerald-600 font-bold mt-1">✓ {{ summary.signedCount }} / {{ summary.total }} Báo giá chốt ký</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-amber-50 rounded-lg text-amber-600">
            <span class="material-symbols-outlined">pending_actions</span>
          </div>
          <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Pending Review</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Chờ Khách Duyệt Báo Giá</p>
          <h2 class="text-2xl font-extrabold text-amber-700 mt-1">{{ summary.pendingCount }} Báo giá</h2>
          <p class="text-[10px] text-amber-600 font-bold mt-1">Đang thương thảo điều khoản</p>
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
            placeholder="Tìm theo mã báo giá, tên tập đoàn, người liên hệ..." 
            class="w-full pl-8 pr-3 py-1.5 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
          >
        </div>
        <select v-model="selectedStatusFilter" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Trạng thái Báo Giá</option>
          <option value="ContractSigned">🟢 Đã ký hợp đồng</option>
          <option value="PendingApproval">🟡 Chờ khách duyệt</option>
          <option value="Rejected">🔴 Từ chối / Hủy</option>
        </select>
      </div>
      <div class="text-xs text-on-surface-variant font-medium">
        Hiển thị: <b class="text-on-surface">{{ filteredQuotations.length }}</b> / {{ quotationsList.length }} báo giá
      </div>
    </div>

    <!-- B2B QUOTATIONS DATA TABLE (9 INDEPENDENT COLUMNS - FR-11.1 -> FR-11.3) -->
    <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden p-4 space-y-4">
      <div class="overflow-x-auto overflow-y-auto max-h-[550px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1350px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[240px] bg-surface-container-low">Mã & Tập Đoàn / Khách Hàng B2B</th>
              <th class="py-2.5 px-3 min-w-[110px] text-right bg-surface-container-low">Quy Mô Khách</th>
              <th class="py-2.5 px-3 min-w-[130px] text-right bg-surface-container-low">Giá Trị Gói (Gốc)</th>
              <th class="py-2.5 px-3 min-w-[140px] bg-surface-container-low">VAT & Chiết Khấu</th>
              <th class="py-2.5 px-3 min-w-[140px] text-right bg-surface-container-low">Tổng Báo Giá (VNĐ)</th>
              <th class="py-2.5 px-3 min-w-[240px] bg-surface-container-low">Tiến Độ Thanh Toán Đợt (Hợp Đồng)</th>
              <th class="py-2.5 px-3 min-w-[160px] bg-surface-container-low">Người Lập Báo Giá</th>
              <th class="py-2.5 px-3 min-w-[140px] text-center bg-surface-container-low">Trạng Thái</th>
              <th class="py-2.5 px-3 min-w-[70px] text-right bg-surface-container-low">Thao Tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="q in filteredQuotations" :key="q.id" class="hover:bg-surface-container-low transition-colors text-[11px]">
              <!-- 1. Mã & Tập đoàn B2B -->
              <td class="py-2.5 px-3 font-bold text-on-surface">
                <div class="flex items-start gap-2">
                  <span class="px-2 py-0.5 bg-surface-container font-mono text-[10px] text-primary rounded shrink-0">{{ q.id }}</span>
                  <div>
                    <p class="font-extrabold text-on-surface text-xs leading-snug">{{ q.companyName }}</p>
                    <p class="text-[10px] text-on-surface-variant font-medium mt-0.5">👤 {{ q.contactPerson }} • 📞 {{ q.contactPhone }}</p>
                  </div>
                </div>
              </td>

              <!-- 2. Quy mô khách -->
              <td class="py-2.5 px-3 text-right font-mono font-bold text-on-surface whitespace-nowrap text-xs">
                {{ q.attendeesCount.toLocaleString() }} Khách
              </td>

              <!-- 3. Giá trị gốc -->
              <td class="py-2.5 px-3 text-right font-mono text-on-surface-variant whitespace-nowrap">
                {{ formatVnd(q.subtotal) }}
              </td>

              <!-- 4. VAT & Chiết khấu -->
              <td class="py-2.5 px-3 whitespace-nowrap">
                <p class="font-mono text-[10px] text-on-surface-variant">Tax VAT: <b>+{{ q.vatPercent }}%</b></p>
                <p class="font-mono text-[10px] text-emerald-700 font-bold" v-if="q.discountAmount > 0">Giảm giá: -{{ formatVnd(q.discountAmount) }}</p>
              </td>

              <!-- 5. Tổng báo giá -->
              <td class="py-2.5 px-3 text-right font-mono font-extrabold text-secondary text-xs whitespace-nowrap">
                {{ formatVnd(q.totalAmount) }}
              </td>

              <!-- 6. Tiến độ thanh toán đợt -->
              <td class="py-2.5 px-3 space-y-1">
                <div v-for="ms in q.milestones" :key="ms.step" class="flex justify-between items-center text-[10px] font-mono p-1 bg-surface-container-low rounded border border-outline-variant/30">
                  <span class="font-bold text-on-surface">{{ ms.step }}: {{ formatVnd(ms.amount) }}</span>
                  <span :class="['px-1.5 py-0.2 rounded text-[9px] font-bold', ms.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800']">
                    {{ ms.status === 'Paid' ? '✓ Đã cọc' : 'Chờ TT' }}
                  </span>
                </div>
              </td>

              <!-- 7. Người lập báo giá -->
              <td class="py-2.5 px-3 font-bold text-on-surface whitespace-nowrap">
                <p class="text-xs">{{ q.creatorName }}</p>
                <p class="text-[10px] text-on-surface-variant font-mono">{{ q.createdDate }}</p>
              </td>

              <!-- 8. Trạng thái -->
              <td class="py-2.5 px-3 text-center whitespace-nowrap">
                <select 
                  :value="q.status || 'PendingApproval'" 
                  @change="handleStatusChange(q.id, $event.target.value)"
                  :class="['px-2 py-0.5 text-[10px] font-bold rounded-lg border focus:outline-none', getStatusBadgeStyle(q.status)]"
                >
                  <option value="ContractSigned">🟢 Đã ký hợp đồng</option>
                  <option value="PendingApproval">🟡 Chờ khách duyệt</option>
                  <option value="Rejected">🔴 Từ chối / Hủy</option>
                </select>
              </td>

              <!-- 9. Thao tác -->
              <td class="py-2.5 px-3 text-right whitespace-nowrap">
                <button @click="handleDeleteQuotation(q.id, q.companyName)" class="p-1 hover:bg-red-50 rounded text-red-600 transition-colors" title="Xóa báo giá">
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL KHỞI TẠO BÁO GIÁ B2B MỚI (FR-11.4) -->
    <CreateQuotationModal
      :isOpen="showCreateModal"
      @close="showCreateModal = false"
      @created="loadQuotationsData"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { getQuotations, deleteQuotation, changeQuotationStatus, calculateQuotationsSummary, QUOTATION_STATUSES } from '../mock/quotations.js';
import CreateQuotationModal from '../components/CreateQuotationModal.vue';

const currentEvent = ref({});
const quotationsList = ref([]);
const summary = ref({
  total: 0,
  signedCount: 0,
  pendingCount: 0,
  rejectedCount: 0,
  totalB2bRevenue: 0,
  conversionRate: 0
});

const searchQuery = ref('');
const selectedStatusFilter = ref('');

const showCreateModal = ref(false);

function loadQuotationsData() {
  currentEvent.value = getCurrentEvent();
  quotationsList.value = getQuotations(currentEvent.value.id);
  summary.value = calculateQuotationsSummary(currentEvent.value.id);
}

const filteredQuotations = computed(() => {
  return quotationsList.value.filter(q => {
    const matchQuery = !searchQuery.value || 
      (q.companyName && q.companyName.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (q.id && q.id.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (q.contactPerson && q.contactPerson.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchStatus = !selectedStatusFilter.value || q.status === selectedStatusFilter.value;
    return matchQuery && matchStatus;
  });
});

function formatVnd(val) {
  if (!val && val !== 0) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
}

function getStatusBadgeStyle(status) {
  const map = QUOTATION_STATUSES;
  return map[status] ? map[status].color : 'bg-gray-100 text-gray-700 border-gray-300';
}

function handleStatusChange(quoId, newStatus) {
  changeQuotationStatus(quoId, newStatus);
  loadQuotationsData();
}

function handleDeleteQuotation(id, name) {
  if (confirm(`Bạn có chắc chắn muốn xóa Báo giá B2B của [${name}]?`)) {
    deleteQuotation(id);
    alert(`Đã xóa Báo giá B2B của [${name}] thành công!`);
    loadQuotationsData();
  }
}

onMounted(() => {
  loadQuotationsData();
});
</script>
