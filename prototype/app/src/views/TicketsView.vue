<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Banner -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-outline-variant/60 shadow-sm gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-3xl">confirmation_number</span>
            <span>Hạng Vé, QR Check-in & Sơ Đồ Chỗ Ngồi (Module 08: FR-08.1 — FR-08.5)</span>
          </h1>
          <span class="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-xs">
            {{ currentEvent.name || 'Tech Summit Asia' }}
          </span>
        </div>
        <p class="text-xs text-on-surface-variant mt-1 font-medium">Cấu hình các hạng vé, quản lý trạm check-in mã QR real-time và phân bổ sơ đồ khu vực chỗ ngồi VIP.</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="showQrCheckinModal = true" class="px-4 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow hover:bg-emerald-700 active:scale-95 transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px]">qr_code_scanner</span>
          <span>Mở Trạm QR Check-in</span>
        </button>
        <button @click="showCreateModal = true" class="px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px]">add</span>
          <span>Phát Hành Hạng Vé Mới</span>
        </button>
      </div>
    </div>

    <!-- 4 TICKET & CHECK-IN KPI STATS CARDS (FR-08.5) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
            <span class="material-symbols-outlined">confirmation_number</span>
          </div>
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">Total Issued</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Vé Phát Hành</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">{{ summary.totalIssuedQty }} Vé</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Đã bán: {{ summary.totalSoldQty }} vé</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <span class="material-symbols-outlined">qr_code_2</span>
          </div>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Gate Checked-in</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tỷ Lệ Check-in Thực Tế</p>
          <h2 class="text-2xl font-extrabold text-emerald-700 mt-1">{{ summary.checkInRate }}%</h2>
          <p class="text-[10px] text-emerald-600 font-bold mt-1">✓ {{ summary.totalCheckedInQty }} Khách đã vào cổng</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-purple-50 rounded-lg text-secondary">
            <span class="material-symbols-outlined">payments</span>
          </div>
          <span class="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">Total Revenue</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Doanh Thu Bán Vé</p>
          <h2 class="text-2xl font-extrabold text-secondary mt-1">{{ formatVnd(summary.totalRevenue) }}</h2>
          <p class="text-[10px] text-secondary font-bold mt-1">Từ 4 hạng vé sự kiện</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-amber-50 rounded-lg text-amber-600">
            <span class="material-symbols-outlined">event_seat</span>
          </div>
          <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Seating Plan</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Khu Vực Ghế Khán Phòng</p>
          <h2 class="text-2xl font-extrabold text-amber-700 mt-1">4 Phân Khu</h2>
          <p class="text-[10px] text-amber-600 font-bold mt-1">Đã gắn vị trí sơ đồ tự động</p>
        </div>
      </div>
    </div>

    <!-- SEATING ZONE MAP ALLOCATION DIAGRAM (FR-08.3) -->
    <div class="bg-white p-6 rounded-2xl border border-outline-variant/60 shadow-sm space-y-4">
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <div>
          <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">event_seat</span>
            <span>Sơ Đồ Phân Bổ Ghế Ngồi Khán Phòng Sân Khấu (Seating Zone Map — FR-08.3)</span>
          </h3>
          <p class="text-xs text-on-surface-variant mt-0.5 font-medium">Trung tâm Hội nghị Quốc gia NCC — Hội trường Chính Main Hall 1.500 chỗ.</p>
        </div>
        <span class="px-3 py-1 bg-surface-container text-on-surface font-mono font-bold text-xs rounded-lg border border-outline-variant/60">
          Sơ đồ: NCC-MAIN-HALL-2026
        </span>
      </div>

      <!-- Graphical Seating Layout Visual -->
      <div class="p-6 bg-slate-900 rounded-xl text-white space-y-6 shadow-inner border border-slate-800">
        <!-- Stage Visual -->
        <div class="w-full max-w-xl mx-auto py-3 bg-gradient-to-r from-purple-600 via-primary to-blue-600 rounded-xl text-center shadow-lg border border-white/20">
          <p class="font-black text-sm tracking-widest uppercase">🎭 SÂN KHẤU CHÍNH (MAIN STAGE & PRESENTATION BỤC A)</p>
        </div>

        <!-- Seating Rows Diagram -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <!-- Zone A: VIP -->
          <div class="bg-purple-950/80 p-4 rounded-xl border border-purple-500/40 space-y-2 text-center">
            <span class="px-2 py-0.5 bg-purple-500 text-white text-[10px] font-bold rounded">KHU A (VIP DIAMOND)</span>
            <p class="text-purple-300 font-bold text-[11px]">Hàng 1 - 2 (100 Ghế)</p>
            <div class="flex justify-center gap-1">
              <span v-for="n in 6" :key="n" class="w-4 h-4 rounded bg-purple-400 text-slate-950 text-[9px] font-bold flex items-center justify-center">A</span>
            </div>
            <p class="text-[9px] text-purple-400">Dành riêng cho Diễn giả & Sponsor</p>
          </div>

          <!-- Zone B: Business -->
          <div class="bg-amber-950/80 p-4 rounded-xl border border-amber-500/40 space-y-2 text-center">
            <span class="px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-bold rounded">KHU B (BUSINESS GOLD)</span>
            <p class="text-amber-300 font-bold text-[11px]">Hàng 3 - 8 (300 Ghế)</p>
            <div class="flex justify-center gap-1">
              <span v-for="n in 6" :key="n" class="w-4 h-4 rounded bg-amber-400 text-slate-950 text-[9px] font-bold flex items-center justify-center">B</span>
            </div>
            <p class="text-[9px] text-amber-400">Doanh nhân & Lãnh đạo</p>
          </div>

          <!-- Zone Media -->
          <div class="bg-emerald-950/80 p-4 rounded-xl border border-emerald-500/40 space-y-2 text-center">
            <span class="px-2 py-0.5 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded">KHU MEDIA BÁO CHÍ</span>
            <p class="text-emerald-300 font-bold text-[11px]">Bàn Press Booth (100 Ghế)</p>
            <div class="flex justify-center gap-1">
              <span v-for="n in 6" :key="n" class="w-4 h-4 rounded bg-emerald-400 text-slate-950 text-[9px] font-bold flex items-center justify-center">M</span>
            </div>
            <p class="text-[9px] text-emerald-400">Trang bị bàn & sạc laptop</p>
          </div>

          <!-- Zone C: Standard -->
          <div class="bg-blue-950/80 p-4 rounded-xl border border-blue-500/40 space-y-2 text-center">
            <span class="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded">KHU C (KHÁN PHÒNG T2)</span>
            <p class="text-blue-300 font-bold text-[11px]">Hàng Tự Do (1.000 Ghế)</p>
            <div class="flex justify-center gap-1">
              <span v-for="n in 6" :key="n" class="w-4 h-4 rounded bg-blue-400 text-white text-[9px] font-bold flex items-center justify-center">C</span>
            </div>
            <p class="text-[9px] text-blue-400">Khách tham quan & Sinh viên</p>
          </div>
        </div>
      </div>
    </div>

    <!-- TICKET TIERS DATA TABLE (8 INDEPENDENT COLUMNS - FR-08.1) -->
    <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden p-4 space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="font-extrabold text-base text-on-surface">Danh Sách Hạng Vé Sự Kiện (FR-08.1)</h3>
        <span class="text-xs text-on-surface-variant font-medium">Tổng cộng: <b class="text-on-surface">{{ tiersList.length }}</b> hạng vé</span>
      </div>

      <div class="overflow-x-auto overflow-y-auto max-h-[500px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1250px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[240px] bg-surface-container-low">Tên Hạng Vé</th>
              <th class="py-2.5 px-3 min-w-[130px] text-right bg-surface-container-low">Đơn Giá (VNĐ)</th>
              <th class="py-2.5 px-3 min-w-[120px] text-right bg-surface-container-low">Số Lượng Mở Bán</th>
              <th class="py-2.5 px-3 min-w-[120px] text-right bg-surface-container-low">Đã Bán / Còn Lại</th>
              <th class="py-2.5 px-3 min-w-[120px] text-right bg-surface-container-low">Đã Check-in Cổng</th>
              <th class="py-2.5 px-3 min-w-[220px] bg-surface-container-low">Phân Bổ Khu Vực Ghế</th>
              <th class="py-2.5 px-3 min-w-[240px] bg-surface-container-low">Quyền Lợi Đội Kèm</th>
              <th class="py-2.5 px-3 min-w-[70px] text-right bg-surface-container-low">Thao Tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="t in tiersList" :key="t.id" class="hover:bg-surface-container-low transition-colors text-[11px]">
              <!-- 1. Tên hạng vé -->
              <td class="py-2.5 px-3 font-bold text-on-surface whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <span :class="['px-2.5 py-0.5 rounded text-[10px] font-bold border', t.color]">
                    {{ t.name }}
                  </span>
                </div>
              </td>

              <!-- 2. Đơn giá -->
              <td class="py-2.5 px-3 text-right font-mono font-extrabold text-primary whitespace-nowrap text-xs">
                {{ t.price === 0 ? 'Miễn Phí (Free)' : formatVnd(t.price) }}
              </td>

              <!-- 3. Số lượng mở bán -->
              <td class="py-2.5 px-3 text-right font-mono font-bold text-on-surface whitespace-nowrap">
                {{ t.totalQty.toLocaleString() }} vé
              </td>

              <!-- 4. Đã bán / Còn lại -->
              <td class="py-2.5 px-3 text-right font-mono whitespace-nowrap">
                <span class="font-bold text-emerald-700">{{ t.soldQty }}</span> / {{ t.totalQty - t.soldQty }}
              </td>

              <!-- 5. Đã check-in -->
              <td class="py-2.5 px-3 text-right font-mono font-bold text-blue-700 whitespace-nowrap">
                ✓ {{ t.checkedInQty }} vé
              </td>

              <!-- 6. Phân bổ khu vực -->
              <td class="py-2.5 px-3 font-bold text-on-surface">
                {{ t.zone }}
              </td>

              <!-- 7. Quyền lợi đi kèm -->
              <td class="py-2.5 px-3">
                <p class="text-on-surface-variant leading-snug line-clamp-2">{{ t.benefits }}</p>
              </td>

              <!-- 8. Thao tác -->
              <td class="py-2.5 px-3 text-right whitespace-nowrap">
                <button @click="handleDeleteTier(t.id, t.name)" class="p-1 hover:bg-red-50 rounded text-red-600 transition-colors" title="Xóa hạng vé">
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ONLINE TICKET ORDERS DATA TABLE (MODULE 10: FR-10.3) -->
    <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden p-4 space-y-4">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">shopping_cart</span>
            <span>Danh Sách Đơn Hàng Mua Vé Online & Thanh Toán (Module 10: FR-10.3)</span>
          </h3>
          <p class="text-xs text-on-surface-variant">Theo dõi giao dịch mua vé trực tuyến qua các cổng VNPAY, Momo và Chuyển khoản ngân hàng.</p>
        </div>
        <span class="text-xs text-on-surface-variant font-medium">Tổng cộng: <b class="text-on-surface">{{ ticketOrders.length }}</b> đơn hàng</span>
      </div>

      <div class="overflow-x-auto overflow-y-auto max-h-[400px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1100px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[130px] bg-surface-container-low">Mã Đơn Hàng</th>
              <th class="py-2.5 px-3 min-w-[200px] bg-surface-container-low">Khách Hàng Mua Vé</th>
              <th class="py-2.5 px-3 min-w-[160px] bg-surface-container-low">Hạng Vé Đã Mua</th>
              <th class="py-2.5 px-3 min-w-[90px] text-right bg-surface-container-low">Số Lượng</th>
              <th class="py-2.5 px-3 min-w-[130px] text-right bg-surface-container-low">Tổng Tiền (VNĐ)</th>
              <th class="py-2.5 px-3 min-w-[160px] bg-surface-container-low">Cổng Thanh Toán</th>
              <th class="py-2.5 px-3 min-w-[140px] text-center bg-surface-container-low">Trạng Thái</th>
              <th class="py-2.5 px-3 min-w-[130px] bg-surface-container-low font-mono">Thời Gian Mua</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="ord in ticketOrders" :key="ord.id" class="hover:bg-surface-container-low transition-colors text-[11px]">
              <td class="py-2.5 px-3 font-mono font-bold text-primary">{{ ord.id }}</td>
              <td class="py-2.5 px-3 font-bold text-on-surface">
                <p class="font-bold text-on-surface text-xs">{{ ord.customerName }}</p>
                <p class="text-[10px] text-on-surface-variant font-mono">{{ ord.customerPhone }} • {{ ord.customerEmail }}</p>
              </td>
              <td class="py-2.5 px-3 font-bold text-on-surface">{{ ord.tierName }}</td>
              <td class="py-2.5 px-3 text-right font-mono font-bold text-on-surface">{{ ord.quantity }} vé</td>
              <td class="py-2.5 px-3 text-right font-mono font-extrabold text-secondary text-xs">{{ formatVnd(ord.totalAmount) }}</td>
              <td class="py-2.5 px-3 font-medium whitespace-nowrap">
                <span class="px-2 py-0.5 bg-surface-container border border-outline-variant/40 rounded font-bold text-[10px]">
                  💳 {{ ord.paymentGateway }}
                </span>
              </td>
              <td class="py-2.5 px-3 text-center whitespace-nowrap">
                <span :class="['px-2.5 py-0.5 rounded-full text-[10px] font-bold border', ord.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300']">
                  {{ ord.paymentStatus === 'Paid' ? '🟢 Đã thanh toán' : '🟡 Chờ thanh toán' }}
                </span>
              </td>
              <td class="py-2.5 px-3 font-mono text-on-surface-variant text-[10px] whitespace-nowrap">{{ ord.orderDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL PHÁT HÀNH HẠNG VÉ MỚI (FR-08.4) -->
    <CreateTicketModal
      :isOpen="showCreateModal"
      @close="showCreateModal = false"
      @created="loadTicketsData"
    />

    <!-- MODAL TRẠM CHECK-IN MÃ QR REAL-TIME (FR-08.2) -->
    <QrCheckinModal
      :isOpen="showQrCheckinModal"
      @close="showQrCheckinModal = false"
      @checkedIn="loadTicketsData"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { getTicketTiers, deleteTicketTier, calculateTicketsSummary, getTicketOrders } from '../mock/tickets.js';
import CreateTicketModal from '../components/CreateTicketModal.vue';
import QrCheckinModal from '../components/QrCheckinModal.vue';

const currentEvent = ref({});
const tiersList = ref([]);
const ticketOrders = ref([]);
const summary = ref({
  totalIssuedQty: 0,
  totalSoldQty: 0,
  totalCheckedInQty: 0,
  totalRevenue: 0,
  checkInRate: 0,
  recentLogsCount: 0
});

const showCreateModal = ref(false);
const showQrCheckinModal = ref(false);

function loadTicketsData() {
  currentEvent.value = getCurrentEvent();
  tiersList.value = getTicketTiers(currentEvent.value.id);
  ticketOrders.value = getTicketOrders(currentEvent.value.id);
  summary.value = calculateTicketsSummary(currentEvent.value.id);
}

function formatVnd(val) {
  if (!val && val !== 0) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
}

function handleDeleteTier(id, name) {
  if (confirm(`Bạn có chắc chắn muốn xóa hạng vé [${name}]?`)) {
    deleteTicketTier(id);
    alert(`Đã xóa hạng vé [${name}] thành công!`);
    loadTicketsData();
  }
}

onMounted(() => {
  loadTicketsData();
});
</script>
