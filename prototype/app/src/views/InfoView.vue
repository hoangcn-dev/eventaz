<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Page Info -->
    <div class="flex justify-between items-center bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm">
      <div>
        <h1 class="text-2xl font-extrabold text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">info</span>
          <span>Thông tin Sự kiện & Vòng đời Trạng thái (FR-01.4)</span>
        </h1>
        <p class="text-sm text-on-surface-variant mt-1">Quản lý các thông số chi tiết, kiểm soát 6 trạng thái vòng đời sự kiện và quy tắc hoàn tác trong 24h.</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="showSaveTemplateModal = true" class="px-4 py-2 border border-primary text-primary hover:bg-primary/5 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5 bg-white">
          <span class="material-symbols-outlined text-[18px]">save_as</span>
          <span>Lưu thành Template</span>
        </button>
        <button @click="showAuditLogModal = true" class="px-4 py-2 border border-outline-variant hover:bg-surface-container rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 bg-white">
          <span class="material-symbols-outlined text-[18px]">history</span>
          <span>Nhật ký Hoạt động</span>
        </button>
      </div>
    </div>

    <!-- Lifecycle Status Widget Card (FR-01.4) -->
    <div class="bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm space-y-6">
      <div class="flex justify-between items-center border-b border-outline-variant pb-4">
        <div>
          <h3 class="font-bold text-lg text-on-surface">Tiến trình Vòng đời 6 Bước (Lifecycle Manager)</h3>
          <p class="text-xs text-on-surface-variant">Chuyển đổi trạng thái theo lộ trình: Nháp → Lên kế hoạch → Đang chuẩn bị → Đang diễn ra → Đã kết thúc → Lưu trữ.</p>
        </div>
        <span :class="['px-3 py-1 text-xs font-bold rounded-full border', currentEvent.status === 'Ongoing' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-blue-100 text-blue-800 border-blue-300']">
          Hiện tại: {{ currentEvent.status }}
        </span>
      </div>

      <!-- Stepper Visual 6 Steps -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div 
          v-for="(state, code) in lifecycleStates" 
          :key="code"
          :class="[
            'p-3.5 rounded-xl border flex flex-col justify-between space-y-2 cursor-pointer transition-all',
            currentEvent.status === code ? 'border-primary bg-primary/5 shadow-md' : 'border-outline-variant/60 bg-surface-container-low opacity-75 hover:opacity-100'
          ]"
          @click="handleStatusChange(code)"
        >
          <div class="flex justify-between items-center">
            <span class="text-xs font-bold text-on-surface-variant">Bước {{ state.stepOrder }}</span>
            <span :class="['w-3 h-3 rounded-full', state.color]"></span>
          </div>
          <p class="font-bold text-sm text-on-surface leading-tight">{{ state.nameVi }}</p>
          <span class="text-[11px] font-mono text-on-surface-variant">{{ code }}</span>
        </div>
      </div>

      <!-- Action Status Lock & Rollback 24h -->
      <div class="p-4 bg-surface-container-low rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 border border-outline-variant/60">
        <div class="flex items-center gap-3">
          <input type="checkbox" id="ros-lock" v-model="currentEvent.runOfShowLocked" @change="saveChanges" class="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary cursor-pointer">
          <label for="ros-lock" class="text-xs font-bold text-on-surface cursor-pointer select-none">
            Đã hoàn thành và khóa Kịch bản Run-of-Show (Điều kiện bắt buộc để chuyển sang 'Đang diễn ra')
          </label>
        </div>
        <div class="flex items-center gap-3">
          <button @click="rollbackStatus" class="px-3.5 py-2 border border-amber-500 text-amber-700 hover:bg-amber-50 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 bg-white">
            <span class="material-symbols-outlined text-[16px]">undo</span>
            <span>Hoàn tác (Lùi 1 bước trong 24h)</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Event Setup Form -->
    <div class="bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm space-y-6">
      <div class="border-b border-outline-variant pb-4 flex justify-between items-center">
        <div>
          <h3 class="font-bold text-lg text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">edit_document</span>
            <span>Thiết lập Thông tin Chi tiết Sự kiện</span>
          </h3>
          <p class="text-xs text-on-surface-variant mt-1">Vui lòng kiểm tra và điền đầy đủ các thông tin chính thức của sự kiện.</p>
        </div>
        <button @click="saveChanges" class="px-6 py-2.5 bg-primary text-white rounded-lg font-bold shadow hover:bg-primary-hover transition-all flex items-center gap-2 text-sm">
          <span class="material-symbols-outlined text-[18px]">save</span>
          <span>Lưu Thay Đổi</span>
        </button>
      </div>

      <!-- Field 1: Tên sự kiện -->
      <div>
        <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Tên sự kiện chính thức <span class="text-red-500">*</span></label>
        <textarea v-model="currentEvent.name" rows="2" maxlength="200" class="w-full px-4 py-3 border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none font-bold text-on-surface"></textarea>
        <div class="flex justify-between items-center mt-1 text-xs">
          <span v-if="currentEvent.name && currentEvent.name.length >= 200" class="text-red-500 font-bold">Đã đạt giới hạn tối đa 200 ký tự!</span>
          <span class="ml-auto font-mono text-on-surface-variant">{{ (currentEvent.name || '').length }}/200</span>
        </div>
      </div>

      <!-- Row 2: Thời gian bắt đầu & kết thúc -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Thời gian Bắt đầu <span class="text-red-500">*</span></label>
          <input type="date" v-model="currentEvent.startDate" class="w-full px-4 py-2.5 border border-outline-variant rounded-xl text-sm focus:border-primary focus:outline-none">
        </div>
        <div>
          <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Thời gian Kết thúc <span class="text-red-500">*</span></label>
          <input type="date" v-model="currentEvent.endDate" class="w-full px-4 py-2.5 border border-outline-variant rounded-xl text-sm focus:border-primary focus:outline-none">
        </div>
      </div>

      <!-- Field 3: Địa điểm tổ chức -->
      <div>
        <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Địa điểm tổ chức sự kiện <span class="text-red-500">*</span></label>
        <div class="relative flex items-center">
          <input type="text" v-model="currentEvent.location" placeholder="Nhập địa điểm..." class="w-full pl-4 pr-12 py-3 border border-outline-variant rounded-xl text-sm focus:border-primary focus:outline-none font-medium">
          <button @click="openMapPicker" type="button" class="absolute right-2 p-2 hover:bg-surface-container rounded-lg text-primary" title="Chọn bản đồ">
            <span class="material-symbols-outlined text-[20px]">pin_drop</span>
          </button>
        </div>
      </div>

      <!-- Field 4: Chọn Quy mô sự kiện (Radio Cards) -->
      <div>
        <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-3">Quy mô sự kiện dự kiến <span class="text-red-500">*</span></label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            v-for="s in scaleOptions" 
            :key="s.value"
            :class="[
              'border rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between space-y-2',
              currentEvent.scale === s.scaleVal ? 'border-primary bg-primary/5 shadow-sm' : 'border-outline-variant/60 hover:border-primary'
            ]"
            @click="currentEvent.scale = s.scaleVal"
          >
            <div class="flex justify-between items-center">
              <span class="font-bold text-sm text-on-surface">{{ s.label }}</span>
              <span class="material-symbols-outlined text-primary text-[20px]">{{ currentEvent.scale === s.scaleVal ? 'radio_button_checked' : 'radio_button_unchecked' }}</span>
            </div>
            <p class="text-xs text-on-surface-variant font-medium">{{ s.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Field 5: Ngân sách & Trưởng BTC -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Ngân sách sự kiện dự kiến (VND)</label>
          <input type="number" v-model="currentEvent.budget" class="w-full px-4 py-2.5 border border-outline-variant rounded-xl text-sm focus:border-primary focus:outline-none">
        </div>
        <div>
          <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Trưởng BAN Tổ Chức (Event Director)</label>
          <input type="text" v-model="currentEvent.director" readonly class="w-full px-4 py-2.5 border border-outline-variant rounded-xl text-sm bg-surface-container-low text-on-surface-variant font-bold">
        </div>
      </div>

      <!-- Field 6: Mô tả chi tiết -->
      <div>
        <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Mô tả nội dung chi tiết sự kiện</label>
        <textarea v-model="currentEvent.description" rows="4" class="w-full px-4 py-3 border border-outline-variant rounded-xl text-sm focus:border-primary focus:outline-none"></textarea>
      </div>
    </div>

    <!-- Modal: Audit Log -->
    <div v-if="showAuditLogModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
        <div class="flex justify-between items-center border-b border-outline-variant pb-3">
          <h3 class="font-bold text-lg text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">history</span>
            <span>Nhật ký Hoạt động (Audit Log)</span>
          </h3>
          <button @click="showAuditLogModal = false" class="p-1 hover:bg-surface-container rounded-full text-on-surface-variant">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="space-y-3 max-h-[350px] overflow-y-auto pr-2">
          <div v-for="log in (currentEvent.auditLogs || [])" :key="log.id" class="p-3 bg-surface-container-low rounded-lg border border-outline-variant/40 space-y-1 text-xs">
            <div class="flex justify-between items-center text-on-surface-variant">
              <span class="font-bold text-primary">{{ log.user }}</span>
              <span class="font-mono text-[10px]">{{ log.timestamp }}</span>
            </div>
            <p class="font-semibold text-on-surface">{{ log.action }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Save Template (FR-01.5) -->
    <div v-if="showSaveTemplateModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
        <div class="flex justify-between items-center border-b border-outline-variant pb-3">
          <h3 class="font-bold text-lg text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">save_as</span>
            <span>Lưu thành Template Mẫu (FR-01.5)</span>
          </h3>
          <button @click="showSaveTemplateModal = false" class="p-1 hover:bg-surface-container rounded-full text-on-surface-variant">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-on-surface-variant uppercase mb-1">Tên Template Mẫu *</label>
            <input type="text" v-model="templateForm.name" class="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs font-bold text-on-surface-variant uppercase mb-1">Phạm vi Mẫu</label>
            <select v-model="templateForm.isGlobal" class="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm bg-white">
              <option :value="true">Template Toàn Tổ Chức (Global)</option>
              <option :value="false">Chỉ Mình Tôi (Private)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-on-surface-variant uppercase mb-1">Mô tả Mẫu</label>
            <textarea v-model="templateForm.description" rows="2" class="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm"></textarea>
          </div>
        </div>
        <div class="flex justify-end gap-3 border-t border-outline-variant pt-4">
          <button @click="showSaveTemplateModal = false" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold text-sm rounded-lg hover:bg-surface-container">Hủy</button>
          <button @click="handleSaveTemplate" class="px-5 py-2 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-hover shadow">Lưu Mẫu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getCurrentEvent, saveEvent, LIFECYCLE_STATES, changeEventStatus } from '../mock/events.js';
import { saveTemplate } from '../mock/templates.js';

const currentEvent = ref({});
const lifecycleStates = LIFECYCLE_STATES;
const showAuditLogModal = ref(false);
const showSaveTemplateModal = ref(false);

const scaleOptions = [
  { value: 'small', scaleVal: 100, label: 'Quy mô Nhỏ', desc: 'Dưới 100 người' },
  { value: 'medium', scaleVal: 500, label: 'Quy mô Vừa', desc: '100 - 500 người' },
  { value: 'large', scaleVal: 1500, label: 'Quy mô Lớn', desc: '500 - 2,000 người' },
  { value: 'enterprise', scaleVal: 5000, label: 'Siêu Quy mô', desc: 'Trên 2,000 người' }
];

const templateForm = reactive({
  name: '',
  isGlobal: true,
  description: ''
});

function loadData() {
  currentEvent.value = getCurrentEvent();
  templateForm.name = `Mẫu chuẩn: ${currentEvent.value.name}`;
  templateForm.description = `Template mẫu được xuất từ sự kiện ${currentEvent.value.id}`;
}

function saveChanges() {
  saveEvent(currentEvent.value);
  alert('Đã cập nhật thông tin sự kiện thành công!');
}

function handleStatusChange(nextStatus) {
  const result = changeEventStatus(currentEvent.value.id, nextStatus);
  if (!result.success) {
    alert(`Không thể chuyển trạng thái: ${result.error}`);
  } else {
    currentEvent.value = result.event;
    alert(`Đã chuyển trạng thái sự kiện thành công sang [${LIFECYCLE_STATES[nextStatus].nameVi}]!`);
  }
}

function rollbackStatus() {
  alert('Đã hoàn tác lùi 1 bước trạng thái vòng đời sự kiện thành công!');
}

function openMapPicker() {
  alert('Mở bản đồ chọn vị trí địa điểm tổ chức!');
}

function handleSaveTemplate() {
  const newTpl = {
    id: `TPL-00${Date.now().toString().slice(-2)}`,
    name: templateForm.name,
    category: currentEvent.value.category || 'Sự kiện chung',
    description: templateForm.description,
    isGlobal: templateForm.isGlobal,
    createdByName: 'Nguyễn Văn Trưởng',
    createdAt: new Date().toLocaleString('vi-VN'),
    usageCount: 1,
    wbsCategories: (currentEvent.value.wbs || []).map((w, i) => ({
      id: `TWBS-0${i+1}`,
      name: w.name,
      defaultLeadRole: w.leadName,
      taskCount: 5
    }))
  };
  saveTemplate(newTpl);
  showSaveTemplateModal.value = false;
  alert(`Lưu thành công Template mẫu: [${newTpl.name}] (FR-01.5)!`);
}

onMounted(() => {
  loadData();
});
</script>
