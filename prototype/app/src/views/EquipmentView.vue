<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Banner -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-outline-variant/60 shadow-sm gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-3xl">inventory_2</span>
            <span>Thiết Bị, Vật Tư & Nhà Cung Cấp Vendor (Module 09)</span>
          </h1>
          <span class="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-xs">
            {{ currentEvent.name || 'Tech Summit Asia' }}
          </span>
        </div>
        <p class="text-xs text-on-surface-variant mt-1 font-medium">Danh mục âm thanh, ánh sáng, màn hình LED, khung giàn stage, vật tư hậu cần và quản lý đối tác thi công.</p>
      </div>
      <button @click="showCreateModal = true" class="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-[18px]">add</span>
        <span>Thêm Thiết Bị / Thuê Vendor</span>
      </button>
    </div>

    <!-- 4 LOGISTICS KPI STATS CARDS (FR-09.5) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
            <span class="material-symbols-outlined">inventory_2</span>
          </div>
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">Equipment Items</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Số Hạng Mục Thiết Bị</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">{{ summary.total }} Hạng mục</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Gồm âm thanh, LED & Sân khấu</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-purple-50 rounded-lg text-secondary">
            <span class="material-symbols-outlined">payments</span>
          </div>
          <span class="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">Total Cost</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Chi Phí Hậu Cần</p>
          <h2 class="text-2xl font-extrabold text-secondary mt-1">{{ formatVnd(summary.totalCost) }}</h2>
          <p class="text-[10px] text-secondary font-bold mt-1">Ngân sách thuê thiết bị sự kiện</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <span class="material-symbols-outlined">local_shipping</span>
          </div>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Handover Rate</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tỷ Lệ Bàn Giao Đúng Tiến Độ</p>
          <h2 class="text-2xl font-extrabold text-emerald-700 mt-1">{{ summary.handoverRate }}%</h2>
          <p class="text-[10px] text-emerald-600 font-bold mt-1">✓ {{ summary.handedOverCount }} / {{ summary.total }} Đã nghiệm thu</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-amber-50 rounded-lg text-amber-600">
            <span class="material-symbols-outlined">storefront</span>
          </div>
          <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Vendors & Partners</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Nhà Cung Cấp Đồng Hành</p>
          <h2 class="text-2xl font-extrabold text-amber-700 mt-1">{{ summary.activeVendors }} Đơn vị</h2>
          <p class="text-[10px] text-amber-600 font-bold mt-1">Đã ký hợp đồng thi công</p>
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
            placeholder="Tìm thiết bị, nhà cung cấp, người tiếp nhận..." 
            class="w-full pl-8 pr-3 py-1.5 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
          >
        </div>
        <select v-model="selectedCategoryFilter" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Phân Loại</option>
          <option v-for="(v, k) in categoryMap" :key="k" :value="k">{{ v.nameVi }}</option>
        </select>
        <select v-model="selectedStatusFilter" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Trạng thái Bàn giao</option>
          <option value="HandedOver">🟢 Đã bàn giao tại NCC</option>
          <option value="InTransit">🟡 Đang vận chuyển</option>
          <option value="Pending">🔴 Chưa bàn giao</option>
        </select>
      </div>
      <div class="text-xs text-on-surface-variant font-medium">
        Hiển thị: <b class="text-on-surface">{{ filteredEquipment.length }}</b> / {{ equipmentList.length }} hạng mục
      </div>
    </div>

    <!-- EQUIPMENT DATA TABLE (9 INDEPENDENT COLUMNS - FR-09.1 -> FR-09.3) -->
    <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden p-4 space-y-4">
      <div class="overflow-x-auto overflow-y-auto max-h-[550px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1350px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[260px] bg-surface-container-low">Tên Thiết Bị / Vật Tư Hậu Cần</th>
              <th class="py-2.5 px-3 min-w-[180px] bg-surface-container-low">Phân Loại Thiết Bị</th>
              <th class="py-2.5 px-3 min-w-[110px] text-right bg-surface-container-low">Số Lượng</th>
              <th class="py-2.5 px-3 min-w-[220px] bg-surface-container-low">Nhà Cung Cấp Vendor</th>
              <th class="py-2.5 px-3 min-w-[120px] text-right bg-surface-container-low">Đơn Giá Thuê (VNĐ)</th>
              <th class="py-2.5 px-3 min-w-[130px] text-right bg-surface-container-low">Tổng Chi Phí (VNĐ)</th>
              <th class="py-2.5 px-3 min-w-[170px] bg-surface-container-low">Người Tiếp Nhận</th>
              <th class="py-2.5 px-3 min-w-[150px] text-center bg-surface-container-low">Trạng Thái Bàn Giao</th>
              <th class="py-2.5 px-3 min-w-[70px] text-right bg-surface-container-low">Thao Tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="eq in filteredEquipment" :key="eq.id" class="hover:bg-surface-container-low transition-colors text-[11px]">
              <!-- 1. Tên thiết bị -->
              <td class="py-2.5 px-3 font-bold text-on-surface">
                <div class="flex items-start gap-2.5">
                  <div class="p-2 bg-surface-container rounded-lg shrink-0 mt-0.5">
                    <span class="material-symbols-outlined text-primary text-[18px]">
                      {{ getCategoryIcon(eq.category) }}
                    </span>
                  </div>
                  <div>
                    <p class="font-extrabold text-on-surface text-xs leading-snug">{{ eq.name }}</p>
                    <p class="text-[10px] text-on-surface-variant font-normal mt-0.5 line-clamp-1" v-if="eq.notes">{{ eq.notes }}</p>
                  </div>
                </div>
              </td>

              <!-- 2. Phân loại -->
              <td class="py-2.5 px-3 whitespace-nowrap">
                <span :class="['px-2.5 py-0.5 rounded text-[10px] font-bold border', getCategoryBadgeStyle(eq.category)]">
                  {{ getCategoryNameVi(eq.category) }}
                </span>
              </td>

              <!-- 3. Số lượng -->
              <td class="py-2.5 px-3 text-right font-mono font-extrabold text-primary whitespace-nowrap text-xs">
                {{ eq.quantity }} {{ eq.unit }}
              </td>

              <!-- 4. Nhà cung cấp Vendor -->
              <td class="py-2.5 px-3">
                <p class="font-bold text-on-surface leading-tight text-xs">{{ eq.vendorName }}</p>
                <p class="text-[10px] text-on-surface-variant font-mono mt-0.5">📞 {{ eq.vendorPhone }} • ⭐ 5/5</p>
              </td>

              <!-- 5. Đơn giá -->
              <td class="py-2.5 px-3 text-right font-mono text-on-surface-variant whitespace-nowrap">
                {{ formatVnd(eq.unitPrice) }}
              </td>

              <!-- 6. Tổng chi phí -->
              <td class="py-2.5 px-3 text-right font-mono font-extrabold text-secondary whitespace-nowrap">
                {{ formatVnd(eq.totalCost) }}
              </td>

              <!-- 7. Người tiếp nhận -->
              <td class="py-2.5 px-3 font-bold text-on-surface whitespace-nowrap">
                {{ eq.receiverName }}
              </td>

              <!-- 8. Trạng thái bàn giao -->
              <td class="py-2.5 px-3 text-center whitespace-nowrap">
                <select 
                  :value="eq.handoverStatus || 'HandedOver'" 
                  @change="handleStatusChange(eq.id, $event.target.value)"
                  :class="['px-2 py-0.5 text-[10px] font-bold rounded-lg border focus:outline-none', getStatusBadgeStyle(eq.handoverStatus)]"
                >
                  <option value="HandedOver">🟢 Đã bàn giao</option>
                  <option value="InTransit">🟡 Đang vận chuyển</option>
                  <option value="Pending">🔴 Chưa bàn giao</option>
                </select>
              </td>

              <!-- 9. Thao tác -->
              <td class="py-2.5 px-3 text-right whitespace-nowrap">
                <button @click="handleDeleteEquipment(eq.id, eq.name)" class="p-1 hover:bg-red-50 rounded text-red-600 transition-colors" title="Xóa hạng mục">
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL HẠNG MỤC THIẾT BỊ MỚI (FR-09.4) -->
    <CreateEquipmentModal
      :isOpen="showCreateModal"
      @close="showCreateModal = false"
      @created="loadEquipmentData"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { getEquipmentList, deleteEquipmentItem, changeHandoverStatus, calculateEquipmentSummary, EQUIPMENT_CATEGORIES, HANDOVER_STATUSES } from '../mock/equipment.js';
import CreateEquipmentModal from '../components/CreateEquipmentModal.vue';

const currentEvent = ref({});
const equipmentList = ref([]);
const summary = ref({
  total: 0,
  totalCost: 0,
  handedOverCount: 0,
  inTransitCount: 0,
  pendingCount: 0,
  handoverRate: 0,
  activeVendors: 0
});

const categoryMap = EQUIPMENT_CATEGORIES;

const searchQuery = ref('');
const selectedCategoryFilter = ref('');
const selectedStatusFilter = ref('');

const showCreateModal = ref(false);

function loadEquipmentData() {
  currentEvent.value = getCurrentEvent();
  equipmentList.value = getEquipmentList(currentEvent.value.id);
  summary.value = calculateEquipmentSummary(currentEvent.value.id);
}

const filteredEquipment = computed(() => {
  return equipmentList.value.filter(e => {
    const matchQuery = !searchQuery.value || 
      (e.name && e.name.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (e.vendorName && e.vendorName.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (e.receiverName && e.receiverName.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchCategory = !selectedCategoryFilter.value || e.category === selectedCategoryFilter.value;
    const matchStatus = !selectedStatusFilter.value || e.handoverStatus === selectedStatusFilter.value;
    return matchQuery && matchCategory && matchStatus;
  });
});

function formatVnd(val) {
  if (!val && val !== 0) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
}

function getCategoryBadgeStyle(cat) {
  const map = EQUIPMENT_CATEGORIES;
  return map[cat] ? map[cat].color : 'bg-gray-100 text-gray-700 border-gray-300';
}

function getCategoryIcon(cat) {
  const map = EQUIPMENT_CATEGORIES;
  return map[cat] ? map[cat].icon : 'inventory_2';
}

function getCategoryNameVi(cat) {
  const map = EQUIPMENT_CATEGORIES;
  return map[cat] ? map[cat].nameVi : cat;
}

function getStatusBadgeStyle(status) {
  const map = HANDOVER_STATUSES;
  return map[status] ? map[status].color : 'bg-gray-100 text-gray-700 border-gray-300';
}

function handleStatusChange(itemId, newStatus) {
  changeHandoverStatus(itemId, newStatus);
  loadEquipmentData();
}

function handleDeleteEquipment(id, name) {
  if (confirm(`Bạn có chắc chắn muốn xóa hạng mục [${name}]?`)) {
    deleteEquipmentItem(id);
    alert(`Đã xóa hạng mục [${name}] thành công!`);
    loadEquipmentData();
  }
}

onMounted(() => {
  loadEquipmentData();
});
</script>
