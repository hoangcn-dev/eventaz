<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Banner -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-outline-variant/60 shadow-sm gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-3xl">account_balance_wallet</span>
            <span>Ngân Sách & Tài Chính (Module 04: FR-04.1 — FR-04.4)</span>
          </h1>
          <span class="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-xs">
            {{ currentEvent.name || 'Tech Summit Asia' }}
          </span>
        </div>
        <p class="text-xs text-on-surface-variant mt-1 font-medium">Theo dõi dự toán chi phí WBS, chênh lệch thực tế, quản lý hóa đơn chứng từ và tiến độ giải ngân.</p>
      </div>
      <button @click="showCreateExpenseModal = true" class="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-[18px]">receipt_long</span>
        <span>Thêm Khoản Chi / Hóa Đơn</span>
      </button>
    </div>

    <!-- 4 FINANCIAL KPI CARDS (FR-04.4) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
            <span class="material-symbols-outlined">payments</span>
          </div>
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">Approved Budget</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Ngân Sách Phê Duyệt</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">{{ formatVnd(summary.totalApproved) }}</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Gồm {{ formatVnd(summary.contingencyReserve) }} dự phòng</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-purple-50 rounded-lg text-secondary">
            <span class="material-symbols-outlined">shopping_cart</span>
          </div>
          <span class="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">Actual Spend</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Chi Phí Thực Tế Đã Chi</p>
          <h2 class="text-2xl font-extrabold text-secondary mt-1">{{ formatVnd(summary.totalActualSpend) }}</h2>
          <p class="text-[10px] text-secondary font-bold mt-1">✓ Đã bao gồm các đợt tạm ứng</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <span class="material-symbols-outlined">analytics</span>
          </div>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Disbursement</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tỷ Lệ Giải Ngân</p>
          <h2 class="text-2xl font-extrabold text-emerald-700 mt-1">{{ summary.disbursementRate }}%</h2>
          <div class="w-full bg-emerald-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div class="bg-emerald-600 h-full rounded-full transition-all duration-500" :style="{ width: summary.disbursementRate + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-amber-50 rounded-lg text-amber-600">
            <span class="material-symbols-outlined">savings</span>
          </div>
          <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Remaining</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Ngân Sách Còn Lại</p>
          <h2 class="text-2xl font-extrabold text-amber-700 mt-1">{{ formatVnd(summary.remainingBalance) }}</h2>
          <p class="text-[10px] text-amber-600 font-bold mt-1">Khả dụng cho các hạng mục còn lại</p>
        </div>
      </div>
    </div>

    <!-- OVER-BUDGET WARNING BANNER (FR-04.2) -->
    <div v-if="hasOverBudgetCategory" class="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-center gap-3 text-amber-900 shadow-sm">
      <span class="material-symbols-outlined text-amber-600 text-2xl shrink-0">warning</span>
      <div class="text-xs">
        <h4 class="font-extrabold">Cảnh Báo Vượt Dự Toán Ngân Sách Hạng Mục!</h4>
        <p class="mt-0.5">Phát hiện có nhóm WBS đang chi vượt định mức ngân sách được duyệt ban đầu. Vui lòng kiểm tra lại các khoản chi đính kèm bên dưới.</p>
      </div>
    </div>

    <!-- SECTION 1: WBS BUDGET ALLOCATION & VARIANCE TABLE (FR-04.1 & FR-04.2) -->
    <div class="bg-white rounded-2xl border border-outline-variant/60 shadow-sm p-5 space-y-4">
      <div class="flex justify-between items-center border-b border-outline-variant/60 pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-xl">account_tree</span>
          <span>Bảng Phân Bổ Dự Toán & Chênh Lệch Chi Phí Theo WBS (FR-04.1 & FR-04.2)</span>
        </h3>
        <span class="text-xs font-bold text-on-surface-variant">
          Đã phân bổ: <b class="text-primary">{{ summary.wbsSummary.length }}</b> Nhóm WBS
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse min-w-[900px]">
          <thead>
            <tr class="bg-surface-container-low text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-3 px-3">Mã & Nhóm WBS</th>
              <th class="py-3 px-3 text-right">Dự Toán Phê Duyệt</th>
              <th class="py-3 px-3 text-right">Chi Phí Thực Tế</th>
              <th class="py-3 px-3 text-right">Chênh Lệch (Variance)</th>
              <th class="py-3 px-3 text-center min-w-[140px]">Tỷ Lệ Chi (%)</th>
              <th class="py-3 px-3 text-center">Trạng Thái Vượt Hạn Mức</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="w in summary.wbsSummary" :key="w.wbsId" class="hover:bg-surface-container-low transition-colors text-[11px]">
              <td class="py-3 px-3 font-bold text-on-surface">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 bg-surface-container rounded font-mono text-[10px] text-primary">{{ w.wbsId }}</span>
                  <span>{{ w.wbsName }}</span>
                </div>
              </td>
              <td class="py-3 px-3 text-right font-mono font-bold text-on-surface">
                {{ formatVnd(w.allocatedBudget) }}
              </td>
              <td class="py-3 px-3 text-right font-mono font-bold text-secondary">
                {{ formatVnd(w.actualSpend) }}
              </td>
              <td :class="['py-3 px-3 text-right font-mono font-bold', w.variance < 0 ? 'text-red-600' : 'text-emerald-700']">
                {{ w.variance < 0 ? '-' : '+' }}{{ formatVnd(Math.abs(w.variance)) }}
              </td>
              <td class="py-3 px-3 text-center">
                <div class="flex items-center gap-2">
                  <div class="flex-1 bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div 
                      :class="['h-full rounded-full transition-all duration-300', w.usageRate > 100 ? 'bg-red-600' : 'bg-primary']"
                      :style="{ width: Math.min(w.usageRate, 100) + '%' }"
                    ></div>
                  </div>
                  <span class="font-mono font-bold text-[10px] shrink-0">{{ w.usageRate }}%</span>
                </div>
              </td>
              <td class="py-3 px-3 text-center">
                <span v-if="w.isOverBudget" class="px-2 py-0.5 bg-red-100 text-red-800 border border-red-300 rounded text-[10px] font-bold">
                  ⚠️ Vượt ngân sách
                </span>
                <span v-else class="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-[10px] font-bold">
                  ✓ Trong hạn mức
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 2: EXPENSES & INVOICES DATA TABLE (FR-04.3) -->
    <div class="bg-white rounded-2xl border border-outline-variant/60 shadow-sm p-5 space-y-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-outline-variant/60 pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-xl">receipt</span>
          <span>Danh Sách Khoản Chi & Hóa Đơn Chứng Từ Thanh Toán (FR-04.3)</span>
        </h3>

        <!-- SEARCH & FILTER -->
        <div class="flex flex-wrap items-center gap-2 text-xs w-full sm:w-auto">
          <div class="relative w-full sm:w-64">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Tìm tên khoản chi, số hóa đơn, vendor..." 
              class="w-full pl-8 pr-3 py-1.5 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
            >
          </div>
          <select v-model="selectedWbsFilter" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
            <option value="">Tất cả Nhóm WBS</option>
            <option v-for="w in summary.wbsSummary" :key="w.wbsId" :value="w.wbsId">{{ w.wbsName }}</option>
          </select>
          <select v-model="selectedStatusFilter" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
            <option value="">Tất cả Trạng thái</option>
            <option value="Paid">🟢 Đã thanh toán</option>
            <option value="Advanced">🟡 Tạm ứng</option>
            <option value="Pending">🟠 Chờ thanh toán</option>
          </select>
        </div>
      </div>

      <!-- TABLE -->
      <div class="overflow-x-auto overflow-y-auto max-h-[500px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1100px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[130px] bg-surface-container-low">Mã Hóa Đơn</th>
              <th class="py-2.5 px-3 min-w-[250px] bg-surface-container-low">Tên Khoản Chi / Dịch Vụ</th>
              <th class="py-2.5 px-3 min-w-[150px] bg-surface-container-low">Nhóm WBS</th>
              <th class="py-2.5 px-3 min-w-[180px] bg-surface-container-low">Đơn Vị Cung Cấp (Vendor)</th>
              <th class="py-2.5 px-3 min-w-[130px] text-right bg-surface-container-low">Số Tiền (VNĐ)</th>
              <th class="py-2.5 px-3 min-w-[130px] text-center bg-surface-container-low">Trạng Thái</th>
              <th class="py-2.5 px-3 min-w-[130px] bg-surface-container-low">Ngày Chứng Từ</th>
              <th class="py-2.5 px-3 min-w-[70px] text-right bg-surface-container-low">Thao Tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="exp in filteredExpenses" :key="exp.id" class="hover:bg-surface-container-low transition-colors text-[11px]">
              <td class="py-2 px-3 font-mono font-bold text-primary whitespace-nowrap">
                {{ exp.invoiceNo }}
              </td>
              <td class="py-2 px-3">
                <p class="font-bold text-on-surface leading-snug">{{ exp.title }}</p>
                <p class="text-[10px] text-on-surface-variant font-normal truncate" v-if="exp.notes">{{ exp.notes }}</p>
              </td>
              <td class="py-2 px-3 whitespace-nowrap">
                <span class="px-2 py-0.5 bg-surface-container rounded text-[10px] font-bold text-on-surface-variant inline-block">
                  {{ exp.wbsName }}
                </span>
              </td>
              <td class="py-2 px-3 font-bold text-on-surface whitespace-nowrap">
                {{ exp.vendor }}
              </td>
              <td class="py-2 px-3 text-right font-mono font-extrabold text-secondary whitespace-nowrap">
                {{ formatVnd(exp.amount) }}
              </td>
              <td class="py-2 px-3 text-center whitespace-nowrap">
                <span :class="['px-2.5 py-0.5 rounded-full text-[10px] font-bold border', getPaymentBadgeStyle(exp.paymentStatus)]">
                  {{ getPaymentStatusName(exp.paymentStatus) }}
                </span>
              </td>
              <td class="py-2 px-3 font-mono text-on-surface-variant whitespace-nowrap">
                {{ exp.expenseDate }}
              </td>
              <td class="py-2 px-3 text-right whitespace-nowrap">
                <button @click="handleDeleteExpense(exp.id, exp.title)" class="p-1 hover:bg-red-50 rounded text-red-600 transition-colors" title="Xóa khoản chi">
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL THÊM KHOẢN CHI MỚI -->
    <CreateExpenseModal
      :isOpen="showCreateExpenseModal"
      @close="showCreateExpenseModal = false"
      @created="loadBudgetData"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { calculateBudgetSummary, getExpenses, deleteExpense, PAYMENT_STATUSES } from '../mock/budget.js';
import CreateExpenseModal from '../components/CreateExpenseModal.vue';

const currentEvent = ref({});
const expensesList = ref([]);
const summary = ref({
  totalApproved: 0,
  totalActualSpend: 0,
  remainingBalance: 0,
  disbursementRate: 0,
  contingencyReserve: 0,
  wbsSummary: []
});

const searchQuery = ref('');
const selectedWbsFilter = ref('');
const selectedStatusFilter = ref('');

const showCreateExpenseModal = ref(false);

function loadBudgetData() {
  currentEvent.value = getCurrentEvent();
  summary.value = calculateBudgetSummary(currentEvent.value.id);
  expensesList.value = getExpenses(currentEvent.value.id);
}

const hasOverBudgetCategory = computed(() => {
  return summary.value.wbsSummary.some(w => w.isOverBudget);
});

const filteredExpenses = computed(() => {
  return expensesList.value.filter(exp => {
    const matchQuery = !searchQuery.value || 
      (exp.title && exp.title.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (exp.invoiceNo && exp.invoiceNo.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (exp.vendor && exp.vendor.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchWbs = !selectedWbsFilter.value || exp.wbsId === selectedWbsFilter.value;
    const matchStatus = !selectedStatusFilter.value || exp.paymentStatus === selectedStatusFilter.value;
    return matchQuery && matchWbs && matchStatus;
  });
});

function formatVnd(val) {
  if (!val && val !== 0) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
}

function getPaymentBadgeStyle(status) {
  const map = PAYMENT_STATUSES;
  return map[status] ? map[status].color : 'bg-gray-100 text-gray-700 border-gray-300';
}

function getPaymentStatusName(status) {
  const map = PAYMENT_STATUSES;
  return map[status] ? map[status].nameVi : status;
}

function handleDeleteExpense(id, title) {
  if (confirm(`Bạn có chắc chắn muốn xóa khoản chi [${title}]?`)) {
    deleteExpense(id);
    alert(`Đã xóa khoản chi [${title}] thành công!`);
    loadBudgetData();
  }
}

onMounted(() => {
  loadBudgetData();
});
</script>
