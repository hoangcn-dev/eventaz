<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
      <!-- Hidden File Input for Real Desktop File Attachment -->
      <input 
        type="file" 
        ref="fileInputRef" 
        class="hidden" 
        @change="handleLocalFileSelected" 
      />

      <!-- Modal Header -->
      <div class="flex justify-between items-start border-b border-outline-variant pb-3">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="font-mono text-xs font-bold text-primary">{{ taskForm.id }}</span>
            <span :class="['px-2 py-0.5 text-[10px] font-bold rounded uppercase border', getPriorityColor(taskForm.priority)]">
              Ưu tiên: {{ taskForm.priority }}
            </span>
            <span v-if="taskForm.status === 'Done'" class="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <span class="material-symbols-outlined text-[13px]">check_circle</span>
              <span>ĐÃ HOÀN THÀNH</span>
            </span>
            <span v-else-if="taskForm.isOverdue" class="px-2 py-0.5 text-[10px] font-bold rounded bg-red-100 text-red-700 animate-pulse">
              ⚠️ TRỄ HẠN
            </span>
          </div>
          <h3 class="font-extrabold text-xl text-on-surface">{{ isNew ? 'Tạo Công Việc Mới (FR-02.1)' : taskForm.name }}</h3>
        </div>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- NAVIGATION TAB BAR -->
      <div class="flex border-b border-outline-variant">
        <button 
          type="button" 
          @click="activeTab = 'info'"
          :class="[
            'px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5',
            activeTab === 'info' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-on-surface-variant hover:text-on-surface'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">info</span>
          <span>Thông tin công việc</span>
        </button>
        <button 
          type="button" 
          @click="activeTab = 'proof'"
          :class="[
            'px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 relative',
            activeTab === 'proof' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-on-surface-variant hover:text-on-surface'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">verified</span>
          <span>Minh chứng kết quả</span>
          <span v-if="taskForm.status === 'Done'" class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span v-else-if="taskForm.attachments && taskForm.attachments.length > 0" class="px-1.5 py-0.2 text-[9px] bg-primary text-white rounded-full font-mono">
            {{ taskForm.attachments.length }}
          </span>
        </button>
      </div>

      <!-- TAB 1: THÔNG TIN CÔNG VIỆC -->
      <form v-show="activeTab === 'info'" @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-xs font-bold text-on-surface uppercase mb-1">Tên công việc *</label>
          <input type="text" v-model="taskForm.name" required placeholder="Nhập tên công việc chi tiết..." class="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl text-sm focus:border-primary focus:outline-none font-bold">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="block text-xs font-bold text-on-surface uppercase">Nhóm Hạng Mục (WBS) *</label>
              <button type="button" @click="showWbsModal = true" class="text-[10px] font-bold text-primary hover:underline flex items-center gap-0.5 focus:outline-none">
                <span class="material-symbols-outlined text-[13px]">add</span>
                <span>Tạo WBS mới</span>
              </button>
            </div>
            <select v-model="taskForm.wbsId" required class="w-full px-3 py-2 border border-outline-variant rounded-xl text-sm bg-white focus:border-primary focus:outline-none">
              <option v-for="w in wbsList" :key="w.id" :value="w.id">{{ w.name }} ({{ w.id }})</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-on-surface uppercase mb-1">Mức Độ Ưu Tiên *</label>
            <select v-model="taskForm.priority" class="w-full px-3 py-2 border border-outline-variant rounded-xl text-sm bg-white focus:border-primary focus:outline-none">
              <option value="Low">Thấp (Low)</option>
              <option value="Medium">Trung bình (Medium)</option>
              <option value="High">Cao (High)</option>
              <option value="Urgent">Khẩn cấp (Urgent)</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-on-surface uppercase mb-1">Ngày & Giờ Bắt Đầu (Đến từng Phút) *</label>
            <input type="datetime-local" v-model="taskForm.startDate" required class="w-full px-3 py-2 border border-outline-variant rounded-xl text-xs font-mono font-bold focus:border-primary focus:outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-on-surface uppercase mb-1">Hạn Hoàn Thành (Deadline Phút) *</label>
            <input type="datetime-local" v-model="taskForm.dueDate" required class="w-full px-3 py-2 border border-outline-variant rounded-xl text-xs font-mono font-bold focus:border-primary focus:outline-none">
          </div>
        </div>

        <!-- RACI Matrix Assignment (FR-02.2) -->
        <div class="p-4 bg-surface-container-low rounded-xl border border-outline-variant/60 space-y-3">
          <h4 class="font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px]">groups</span>
            <span>Phân công Mô hình RACI (FR-02.2)</span>
          </h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-on-surface-variant mb-1">R - Responsible (Người thực hiện chính) *</label>
              <select v-model="taskForm.raci.responsibleId" required class="w-full px-3 py-2 border border-outline-variant rounded-lg text-xs bg-white">
                <option v-for="u in usersList" :key="u.id" :value="u.id">{{ u.name }} ({{ u.roleVi }})</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-on-surface-variant mb-1">A - Accountable (Người phê duyệt) *</label>
              <select v-model="taskForm.raci.accountableId" required class="w-full px-3 py-2 border border-outline-variant rounded-lg text-xs bg-white">
                <option v-for="u in usersList" :key="u.id" :value="u.id">{{ u.name }} ({{ u.roleVi }})</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Predecessor Task Dependency (FR-02.7) -->
        <div>
          <label class="block text-xs font-bold text-on-surface uppercase mb-1">Công việc Tiên quyết / Phụ thuộc (FR-02.7)</label>
          <select v-model="taskForm.predecessorTaskId" class="w-full px-3 py-2 border border-outline-variant rounded-xl text-sm bg-white focus:border-primary focus:outline-none">
            <option :value="null">-- Không có phụ thuộc (Độc lập) --</option>
            <option v-for="t in allTasks" :key="t.id" :value="t.id" :disabled="t.id === taskForm.id">[Predecessor] {{ t.id }}: {{ t.name }}</option>
          </select>
        </div>

        <!-- Integrated Description & Attachment Container -->
        <div class="p-4 bg-surface-container-low/60 rounded-xl border border-outline-variant/60 space-y-3">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-bold text-on-surface uppercase flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-primary">description</span>
              <span>Mô tả công việc & Ghi chú triển khai</span>
            </label>
          </div>

          <!-- Description Textarea -->
          <textarea 
            v-model="taskForm.description" 
            rows="3" 
            placeholder="Nhập nội dung mô tả chi tiết công việc, ghi chú triển khai..."
            class="w-full px-3 py-2 border border-outline-variant rounded-xl text-sm bg-white focus:border-primary focus:outline-none"
          ></textarea>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-between items-center border-t border-outline-variant pt-4">
          <button v-if="!isNew" type="button" @click="handleDelete" class="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 font-bold text-xs rounded-xl">Xóa Công Việc</button>
          <div class="flex gap-3 ml-auto">
            <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold text-xs rounded-xl hover:bg-surface-container">Hủy</button>
            <button type="submit" class="px-5 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-hover shadow">Lưu Công Việc</button>
          </div>
        </div>
      </form>

      <!-- TAB 2: MINH CHỨNG KẾT QUẢ (COMPLETION PROOF & ACCEPTANCE) -->
      <div v-show="activeTab === 'proof'" class="space-y-5">
        <!-- Status Banner for Completed Task -->
        <div v-if="taskForm.status === 'Done'" class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
          <span class="material-symbols-outlined text-emerald-600 text-3xl">verified</span>
          <div>
            <h4 class="font-extrabold text-sm text-emerald-900">Công việc đã Nghiệm thu & Hoàn thành (FR-02.5 / FR-02.6)</h4>
            <p class="text-xs text-emerald-700">Người phê duyệt: <b>{{ taskForm.raci ? taskForm.raci.accountableName : 'Nguyễn Văn Trưởng' }}</b> • Đã xác nhận minh chứng kết quả đạt yêu cầu.</p>
          </div>
        </div>

        <div v-else class="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800">
          <span class="material-symbols-outlined text-amber-600 text-lg">info</span>
          <span>Công việc đang ở trạng thái <b>{{ getStatusNameVi(taskForm.status) }}</b>. Tải lên minh chứng kết quả để gửi Người phê duyệt (A) nghiệm thu.</span>
        </div>

        <!-- Attachment Action Toolbar -->
        <div class="p-4 bg-surface-container-low rounded-xl border border-outline-variant/60 space-y-4">
          <div class="flex justify-between items-center">
            <h4 class="font-bold text-xs uppercase tracking-wider text-on-surface flex items-center gap-1.5">
              <span class="material-symbols-outlined text-primary text-[18px]">attachment</span>
              <span>Tài Liệu & Minh Chứng Kết Quả Sản Phẩm</span>
            </h4>
            <div class="flex items-center gap-2">
              <button 
                type="button" 
                @click="showDocRepoModal = true" 
                class="px-3 py-1.5 bg-white hover:bg-surface-container border border-outline-variant rounded-lg text-xs font-bold text-primary flex items-center gap-1 shadow-sm"
              >
                <span class="material-symbols-outlined text-[15px]">folder_open</span>
                <span>Chọn từ Kho Sự kiện</span>
              </button>
              <button 
                type="button" 
                @click="triggerLocalUpload" 
                class="px-3 py-1.5 bg-primary text-white border border-primary rounded-lg text-xs font-bold shadow-sm hover:bg-primary-hover flex items-center gap-1 transition-all"
              >
                <span class="material-symbols-outlined text-[15px]">upload</span>
                <span>Tải File Mới Lên</span>
              </button>
            </div>
          </div>

          <!-- Attachments List Grid -->
          <div v-if="taskForm.attachments && taskForm.attachments.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-for="(att, aIdx) in taskForm.attachments" :key="att.id || aIdx" class="p-3 bg-white rounded-xl border border-outline-variant/60 flex justify-between items-center text-xs shadow-sm hover:border-primary/50 transition-colors">
              <div class="flex items-center gap-3 truncate">
                <div class="w-9 h-9 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[20px]">description</span>
                </div>
                <div class="truncate">
                  <p class="font-bold text-on-surface truncate text-xs">{{ att.name }}</p>
                  <p class="text-[10px] text-on-surface-variant">{{ att.size || '2.5 MB' }} • {{ att.uploadDate || 'Hôm nay' }}</p>
                  <p class="text-[9px] text-primary font-semibold">Tải lên bởi: {{ att.uploader || 'Nhân sự' }}</p>
                </div>
              </div>
              <button type="button" @click="removeAttachment(aIdx)" class="text-on-surface-variant hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50" title="Xóa file minh chứng">
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          </div>
          <div v-else class="py-6 text-center text-xs text-on-surface-variant italic space-y-1">
            <span class="material-symbols-outlined text-3xl text-slate-300">cloud_upload</span>
            <p>Chưa có file minh chứng kết quả nào được tải lên cho công việc này.</p>
          </div>
        </div>

        <!-- Completion Notes & Acceptance Comments -->
        <div class="space-y-2">
          <label class="block text-xs font-bold text-on-surface uppercase">Ghi chú Nghiệm thu / Đánh giá Kết quả</label>
          <textarea 
            v-model="taskForm.completionNotes" 
            rows="3" 
            placeholder="Nhập ghi chú nghiệm thu, kết quả bàn giao sản phẩm..."
            class="w-full px-3 py-2 border border-outline-variant rounded-xl text-xs bg-white focus:border-primary focus:outline-none"
          ></textarea>
        </div>

        <!-- Footer Actions for Proof Tab -->
        <div class="flex justify-end gap-3 border-t border-outline-variant pt-4">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold text-xs rounded-xl hover:bg-surface-container">Đóng</button>
          <button type="button" @click="saveProofTab" class="px-5 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-hover shadow">Lưu Minh Chứng Kết Quả</button>
        </div>
      </div>
    </div>

    <!-- EVENT DOCUMENT REPOSITORY PICKER MODAL -->
    <div v-if="showDocRepoModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4">
        <div class="flex justify-between items-center border-b border-outline-variant pb-3">
          <h4 class="font-bold text-sm text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">folder_open</span>
            <span>Kho Tài Liệu Sự Kiện (Chọn làm Minh chứng Kết quả)</span>
          </h4>
          <button @click="showDocRepoModal = false" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <div class="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
          <div 
            v-for="doc in repoDocs" 
            :key="doc.id"
            @click="attachFromRepo(doc)"
            class="p-3 bg-surface-container-low hover:bg-surface-container rounded-xl border border-outline-variant/60 flex justify-between items-center cursor-pointer transition-colors"
          >
            <div class="flex items-center gap-2.5 truncate">
              <span class="material-symbols-outlined text-primary text-[20px]">article</span>
              <div>
                <p class="font-bold text-xs text-on-surface truncate">{{ doc.name }}</p>
                <p class="text-[10px] text-on-surface-variant">{{ doc.category }} • {{ doc.size }}</p>
              </div>
            </div>
            <button type="button" class="px-3 py-1 bg-primary text-white font-bold text-[11px] rounded-lg shrink-0">Chọn Đính Kèm</button>
          </div>
        </div>
        <div class="flex justify-end pt-2">
          <button @click="showDocRepoModal = false" class="px-4 py-1.5 border border-outline-variant rounded-xl font-bold text-xs">Đóng</button>
        </div>
      </div>
    </div>

    <!-- CREATE WBS CATEGORY POPUP MODAL -->
    <CreateWbsModal
      :isOpen="showWbsModal"
      @close="showWbsModal = false"
      @created="handleWbsCreatedInline"
    />
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { getUsers } from '../mock/users.js';
import { getCurrentEvent, saveEvent } from '../mock/events.js';
import { getDocuments } from '../mock/documents.js';
import { saveTask, deleteTask } from '../mock/tasks.js';
import CreateWbsModal from './CreateWbsModal.vue';

const props = defineProps({
  isOpen: Boolean,
  task: Object,
  allTasks: Array
});

const emit = defineEmits(['close', 'saved']);

const activeTab = ref('info'); // 'info' or 'proof'
const usersList = ref([]);
const wbsList = ref([]);
const repoDocs = ref([]);
const isNew = ref(false);
const showDocRepoModal = ref(false);
const showWbsModal = ref(false);
const activeEvent = ref({});
const fileInputRef = ref(null);

const taskForm = reactive({
  id: '',
  eventId: '',
  name: '',
  wbsId: '',
  wbsName: '',
  priority: 'Medium',
  status: 'To Do',
  startDate: '2026-08-15',
  dueDate: '2026-08-30',
  isOverdue: false,
  raci: {
    responsibleId: 'USR-002',
    responsibleName: '',
    accountableId: 'USR-001',
    accountableName: '',
    consulted: [],
    informed: []
  },
  description: '',
  completionNotes: '',
  attachments: [],
  predecessorTaskId: null
});

watch(() => props.isOpen, (val) => {
  if (val) {
    usersList.value = getUsers();
    repoDocs.value = getDocuments();
    activeEvent.value = getCurrentEvent();
    wbsList.value = activeEvent.value.wbs || [];

    if (props.task && props.task.id) {
      isNew.value = false;
      const copy = JSON.parse(JSON.stringify(props.task));
      if (copy.startDate && copy.startDate.includes(' ')) {
        copy.startDate = copy.startDate.replace(' ', 'T');
      }
      if (copy.dueDate && copy.dueDate.includes(' ')) {
        copy.dueDate = copy.dueDate.replace(' ', 'T');
      }
      Object.assign(taskForm, copy);
      // Auto switch to 'proof' tab if task status is Done
      if (taskForm.status === 'Done') {
        activeTab.value = 'proof';
      } else {
        activeTab.value = 'info';
      }
    } else {
      isNew.value = true;
      activeTab.value = 'info';
      taskForm.id = 'TSK-00' + String(Date.now()).slice(-2);
      taskForm.eventId = activeEvent.value.id;
      taskForm.name = '';
      taskForm.wbsId = wbsList.value.length > 0 ? wbsList.value[0].id : 'WBS-01';
      taskForm.priority = 'Medium';
      taskForm.status = 'To Do';
      taskForm.startDate = '2026-08-15T08:00';
      taskForm.dueDate = '2026-08-20T17:30';
      taskForm.description = '';
      taskForm.completionNotes = '';
      taskForm.attachments = [];
      taskForm.predecessorTaskId = null;
    }
  }
});

function handleWbsCreatedInline(wbsData) {
  const newWbs = {
    id: `WBS-0${(activeEvent.value.wbs || []).length + 1}`,
    name: wbsData.name,
    leadId: wbsData.leadId,
    leadName: wbsData.leadName,
    coLead: wbsData.coLead,
    order: (activeEvent.value.wbs || []).length + 1
  };
  activeEvent.value.wbs = activeEvent.value.wbs || [];
  activeEvent.value.wbs.push(newWbs);
  saveEvent(activeEvent.value);

  wbsList.value = activeEvent.value.wbs;
  taskForm.wbsId = newWbs.id;
  taskForm.wbsName = newWbs.name;
  alert(`Đã khởi tạo Nhóm WBS mới [${newWbs.name}] và chọn tự động cho công việc này!`);
}

function getPriorityColor(p) {
  const map = {
    'Low': 'bg-gray-100 text-gray-700 border-gray-300',
    'Medium': 'bg-blue-100 text-blue-800 border-blue-300',
    'High': 'bg-amber-100 text-amber-800 border-amber-300',
    'Urgent': 'bg-red-100 text-red-800 border-red-300'
  };
  return map[p] || 'bg-gray-100 text-gray-700';
}

function getStatusNameVi(status) {
  const map = {
    'To Do': 'Chưa làm',
    'In Progress': 'Đang làm',
    'Pending Review': 'Chờ duyệt',
    'Done': 'Hoàn thành'
  };
  return map[status] || status;
}

function close() {
  emit('close');
}

function attachFromRepo(doc) {
  taskForm.attachments = taskForm.attachments || [];
  taskForm.attachments.unshift({
    id: doc.id,
    name: doc.name,
    size: doc.size,
    uploadDate: new Date().toISOString().slice(0, 10),
    uploader: 'Kho Sự Kiện'
  });
  showDocRepoModal.value = false;
}

function triggerLocalUpload() {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
}

function handleLocalFileSelected(e) {
  const files = e.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    taskForm.attachments = taskForm.attachments || [];
    taskForm.attachments.unshift({
      id: 'ATT-LOCAL-' + Date.now().toString().slice(-3),
      name: file.name,
      size: `${sizeMb > 0 ? sizeMb : '0.5'} MB`,
      uploadDate: new Date().toISOString().slice(0, 10),
      uploader: taskForm.raci ? taskForm.raci.responsibleName : 'Nguyễn Văn Trưởng'
    });
    alert(`Đã tải lên thành công file đính kèm: [${file.name}]`);
  }
}

function removeAttachment(idx) {
  taskForm.attachments.splice(idx, 1);
}

function saveProofTab() {
  saveTask(taskForm);
  alert('Đã cập nhật minh chứng kết quả cho công việc thành công!');
  emit('saved');
  close();
}

function handleSubmit() {
  const selectedWbs = wbsList.value.find(w => w.id === taskForm.wbsId);
  if (selectedWbs) {
    taskForm.wbsName = selectedWbs.name;
  }
  const selectedResp = usersList.value.find(u => u.id === taskForm.raci.responsibleId);
  if (selectedResp) {
    taskForm.raci.responsibleName = selectedResp.name;
  }
  const selectedAcc = usersList.value.find(u => u.id === taskForm.raci.accountableId);
  if (selectedAcc) {
    taskForm.raci.accountableName = selectedAcc.name;
  }

  // Format datetime-local to clean 'YYYY-MM-DD HH:mm'
  if (taskForm.startDate && taskForm.startDate.includes('T')) {
    taskForm.startDate = taskForm.startDate.replace('T', ' ');
  }
  if (taskForm.dueDate && taskForm.dueDate.includes('T')) {
    taskForm.dueDate = taskForm.dueDate.replace('T', ' ');
  }

  saveTask(taskForm);
  alert(`Đã lưu công việc [${taskForm.name}] thành công!`);
  emit('saved');
  close();
}

function handleDelete() {
  if (confirm(`Bạn có chắc chắn muốn xóa công việc [${taskForm.name}]?`)) {
    deleteTask(taskForm.id);
    alert('Đã xóa công việc!');
    emit('saved');
    close();
  }
}
</script>
