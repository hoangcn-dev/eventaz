<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header WBS -->
    <div class="flex justify-between items-center bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm">
      <div>
        <h1 class="text-2xl font-extrabold text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">account_tree</span>
          <span>Cấu trúc Nhóm Hạng mục WBS (FR-01.3)</span>
        </h1>
        <p class="text-sm text-on-surface-variant mt-1">Phân chia nhóm công việc, chỉ định Trưởng nhóm (Team Lead) và Đồng phụ trách (Co-Lead).</p>
      </div>
      <button @click="openAddWbsModal" class="px-5 py-2.5 bg-primary text-white font-bold rounded-lg shadow hover:bg-primary-hover transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-[20px]">add</span>
        <span>Thêm Nhóm Hạng mục</span>
      </button>
    </div>

    <!-- WBS List -->
    <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden p-6 space-y-4">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm border-collapse">
          <thead>
            <tr class="bg-surface-container-low text-on-surface-variant font-bold text-xs uppercase border-b border-outline-variant">
              <th class="py-3 px-4">Thứ tự</th>
              <th class="py-3 px-4">Mã WBS</th>
              <th class="py-3 px-4">Tên Nhóm Hạng mục</th>
              <th class="py-3 px-4">Trưởng nhóm (Team Lead)</th>
              <th class="py-3 px-4">Đồng phụ trách (Co-Lead)</th>
              <th class="py-3 px-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="(item, idx) in currentEvent.wbs" :key="item.id" class="hover:bg-surface-container-low transition-colors">
              <td class="py-3.5 px-4 font-bold text-on-surface-variant">#{{ idx + 1 }}</td>
              <td class="py-3.5 px-4 font-mono text-xs font-semibold text-primary">{{ item.id }}</td>
              <td class="py-3.5 px-4 font-bold text-on-surface">{{ item.name }}</td>
              <td class="py-3.5 px-4 font-medium text-primary">{{ item.leadName || 'Chưa phân công' }}</td>
              <td class="py-3.5 px-4 text-on-surface-variant">{{ item.coLead || 'Không có' }}</td>
              <td class="py-3.5 px-4 text-right">
                <button @click="deleteWbs(idx)" class="p-1.5 hover:bg-red-50 rounded text-red-600 transition-colors" title="Xóa">
                  <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCurrentEvent, saveEvent } from '../mock/events.js';

const currentEvent = ref({ wbs: [] });

function loadData() {
  currentEvent.value = getCurrentEvent();
}

function openAddWbsModal() {
  const name = prompt('Nhập tên nhóm hạng mục WBS mới:');
  if (name) {
    const newWbs = {
      id: `WBS-0${currentEvent.value.wbs.length + 1}`,
      name: name,
      leadId: "USR-002",
      leadName: "Trần Thị Hậu Cần",
      coLead: "",
      order: currentEvent.value.wbs.length + 1
    };
    currentEvent.value.wbs.push(newWbs);
    saveEvent(currentEvent.value);
    alert(`Đã thêm hạng mục WBS [${name}] thành công!`);
  }
}

function deleteWbs(index) {
  if (confirm('Bạn có chắc chắn muốn xóa nhóm hạng mục này? Cảnh báo: Các công việc thuộc nhóm sẽ tự động chuyển về Nhóm Mặc Định.')) {
    currentEvent.value.wbs.splice(index, 1);
    saveEvent(currentEvent.value);
  }
}

onMounted(() => {
  loadData();
});
</script>
