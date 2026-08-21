<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <div class="flex items-center gap-2">
          <span class="p-2 bg-emerald-100 text-emerald-800 rounded-lg material-symbols-outlined text-xl">qr_code_scanner</span>
          <div>
            <h3 class="font-extrabold text-base text-on-surface">Trạm Check-in Mã QR Cổng Đón Khách (FR-08.2)</h3>
            <p class="text-[11px] text-on-surface-variant">Giả lập máy quét mã QR tại cổng kiểm soát soát vé real-time.</p>
          </div>
        </div>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Scanner Gate Selection & Input -->
      <div class="p-4 bg-slate-900 text-white rounded-xl space-y-3 shadow-inner">
        <div class="flex justify-between items-center">
          <label class="text-xs font-bold text-slate-300 uppercase">Cổng Kiểm Soát Soát Vé *</label>
          <select v-model="selectedGate" class="px-2.5 py-1 bg-slate-800 text-emerald-400 font-bold text-xs border border-slate-700 rounded-lg focus:outline-none">
            <option value="Cổng A1 (Sảnh VIP)">🚪 Cổng A1 (Sảnh VIP)</option>
            <option value="Cổng B2 (Press Corner)">🚪 Cổng B2 (Press Corner)</option>
            <option value="Cổng C1 (Main Gate)">🚪 Cổng C1 (Main Gate Khán phòng)</option>
          </select>
        </div>

        <form @submit.prevent="handleScan" class="flex gap-2">
          <input 
            type="text" 
            v-model="qrInput" 
            placeholder="Quét hoặc Nhập mã QR (VD: QR-GUEST-001-ALEX)..." 
            required 
            class="flex-1 px-3.5 py-2.5 bg-slate-800 text-white font-mono font-bold text-sm border border-slate-700 rounded-xl focus:border-emerald-400 focus:outline-none placeholder-slate-500"
          >
          <button type="submit" class="px-5 py-2.5 bg-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl hover:bg-emerald-400 active:scale-95 transition-all flex items-center gap-1">
            <span class="material-symbols-outlined text-[18px]">qr_code_2</span>
            <span>QUÉT NGAY</span>
          </button>
        </form>

        <!-- Verification Feedback Alert -->
        <div v-if="lastResult" :class="['p-3 rounded-xl border text-xs font-bold flex items-center gap-2 animate-in fade-in', lastResult.success ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50' : 'bg-red-950/80 text-red-300 border-red-500/50']">
          <span class="material-symbols-outlined text-xl">{{ lastResult.success ? 'verified' : 'warning' }}</span>
          <span>{{ lastResult.message }}</span>
        </div>
      </div>

      <!-- Quick Scan Sample Shortcuts -->
      <div class="space-y-1 text-xs">
        <p class="font-bold text-on-surface text-[11px] uppercase">Thao tác Nhanh (Click mã QR mẫu để giả lập quét):</p>
        <div class="flex flex-wrap gap-1.5">
          <button 
            v-for="sample in sampleCodes" 
            :key="sample" 
            @click="qrInput = sample; handleScan();"
            class="px-2.5 py-1 bg-surface-container hover:bg-primary/10 text-primary font-mono text-[10px] font-bold rounded-lg border border-outline-variant/60 transition-colors"
          >
            Quét {{ sample }}
          </button>
        </div>
      </div>

      <!-- Recent Check-in Logs Table -->
      <div class="space-y-2 border-t border-outline-variant pt-3 text-xs">
        <h4 class="font-extrabold text-on-surface flex items-center justify-between">
          <span>Lịch Sử Check-in Mới Nhất</span>
          <span class="text-[10px] font-normal text-on-surface-variant">Tổng log: {{ checkInLogs.length }}</span>
        </h4>

        <div class="max-h-48 overflow-y-auto border border-outline-variant rounded-xl overflow-hidden">
          <table class="w-full text-left text-[11px] border-collapse">
            <thead class="bg-surface-container-low font-bold text-on-surface-variant uppercase text-[10px]">
              <tr>
                <th class="py-2 px-3">Mã QR / Khách</th>
                <th class="py-2 px-3">Cổng Vào</th>
                <th class="py-2 px-3 font-mono">Thời Gian</th>
                <th class="py-2 px-3 text-center">Kết Quả</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/40">
              <tr v-for="l in checkInLogs" :key="l.id" class="hover:bg-surface-container-low font-medium">
                <td class="py-2 px-3 font-bold text-on-surface">
                  <p class="font-mono text-primary text-[10px]">{{ l.ticketCode }}</p>
                  <p class="text-[10px] text-on-surface-variant">{{ l.holderName }}</p>
                </td>
                <td class="py-2 px-3 whitespace-nowrap">{{ l.gateName }}</td>
                <td class="py-2 px-3 font-mono text-[10px] whitespace-nowrap">{{ l.checkInTime }}</td>
                <td class="py-2 px-3 text-center whitespace-nowrap">
                  <span :class="['px-2 py-0.5 rounded text-[9px] font-bold', l.status === 'Success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800']">
                    {{ l.status === 'Success' ? '🟢 Hợp lệ' : '🔴 Trùng lặp' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="flex justify-end pt-2 border-t border-outline-variant">
        <button type="button" @click="close" class="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800">Đóng Trạm Check-in</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { performQrCheckIn, getCheckInLogs } from '../mock/tickets.js';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'checkedIn']);

const selectedGate = ref('Cổng A1 (Sảnh VIP)');
const qrInput = ref('');
const lastResult = ref(null);
const checkInLogs = ref([]);

const sampleCodes = ['QR-GUEST-001-ALEX', 'QR-GUEST-002-HA', 'QR-GUEST-003-TAM', 'QR-GUEST-004-LINH', 'QR-TKT-991-GOLD'];

function loadLogs() {
  const currentEvt = getCurrentEvent();
  checkInLogs.value = getCheckInLogs(currentEvt.id);
}

watch(() => props.isOpen, (val) => {
  if (val) {
    qrInput.value = '';
    lastResult.value = null;
    loadLogs();
  }
});

function close() {
  emit('close');
}

function handleScan() {
  if (!qrInput.value) return;

  const currentEvt = getCurrentEvent();
  const res = performQrCheckIn(currentEvt.id, qrInput.value, selectedGate.value);
  lastResult.value = res;

  loadLogs();
  emit('checkedIn', res);
  qrInput.value = '';
}

onMounted(() => {
  loadLogs();
});
</script>
