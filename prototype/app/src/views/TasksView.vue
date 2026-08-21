<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-3 relative">
    <!-- ROW 1: ACTION TOOLBAR -->
    <div class="bg-white p-3 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
      <!-- Left: View Mode Switcher -->
      <div class="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant/60">
        <button 
          @click="viewMode = 'list'"
          :class="[
            'px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5',
            viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">format_list_bulleted</span>
          <span>Danh sách</span>
        </button>
        <button 
          @click="viewMode = 'kanban'"
          :class="[
            'px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5',
            viewMode === 'kanban' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">view_kanban</span>
          <span>Bảng Kanban</span>
        </button>
        <button 
          @click="viewMode = 'gantt'"
          :class="[
            'px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5',
            viewMode === 'gantt' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">timeline</span>
          <span>Lịch & Gantt</span>
        </button>
      </div>

      <!-- Right: Primary Actions -->
      <div class="flex items-center gap-2.5">
        <button @click="addWbsCategory" class="px-3.5 py-1.5 bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface font-bold text-xs rounded-lg transition-all flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">add</span>
          <span>Thêm Nhóm WBS</span>
        </button>

        <button @click="openCreateTask" class="px-4 py-1.5 bg-primary text-white font-bold rounded-lg shadow hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-1.5 text-xs">
          <span class="material-symbols-outlined text-[16px]">add_task</span>
          <span>Tạo Công việc Mới</span>
        </button>
      </div>
    </div>

    <!-- ROW 2: SEARCH & FILTER BAR -->
    <div class="bg-white p-3 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
      <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
        <div class="relative w-full sm:w-64">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
          <input v-model="searchQuery" type="text" placeholder="Tìm kiếm công việc..." class="w-full pl-8 pr-3 py-1.5 text-xs border border-outline-variant rounded-lg focus:outline-none focus:border-primary">
        </div>
        <select v-model="selectedWbs" class="px-3 py-1.5 text-xs border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary">
          <option value="">Tất cả Nhóm WBS</option>
          <option v-for="w in currentEvent.wbs" :key="w.id" :value="w.id">{{ w.name }}</option>
        </select>
        <select v-model="selectedPriority" class="px-3 py-1.5 text-xs border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary">
          <option value="">Tất cả Độ ưu tiên</option>
          <option value="Urgent">Khẩn cấp (Urgent)</option>
          <option value="High">Cao (High)</option>
          <option value="Medium">Trung bình (Medium)</option>
          <option value="Low">Thấp (Low)</option>
        </select>
      </div>
      <div class="text-xs text-on-surface-variant font-medium">
        Tổng số: <b class="text-on-surface">{{ filteredTasks.length }}</b> công việc
      </div>
    </div>

    <!-- VIEW MODE 1: LIST VIEW (STICKY HEADER & PAGINATION) -->
    <div v-if="viewMode === 'list'" class="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden p-4 space-y-4">
      <div class="overflow-x-auto overflow-y-auto max-h-[550px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1500px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[90px] bg-surface-container-low">Mã Task</th>
              <th class="py-2.5 px-3 min-w-[280px] bg-surface-container-low">Tên Công việc</th>
              <th class="py-2.5 px-3 min-w-[150px] bg-surface-container-low">Nhóm WBS</th>
              <th class="py-2.5 px-3 min-w-[130px] bg-surface-container-low">Mã Task Phụ Thuộc</th>
              <th class="py-2.5 px-3 min-w-[160px] bg-surface-container-low">Người Thực hiện (R)</th>
              <th class="py-2.5 px-3 min-w-[160px] bg-surface-container-low">Người Phê duyệt (A)</th>
              <th class="py-2.5 px-3 min-w-[130px] bg-surface-container-low">Ngày Bắt đầu</th>
              <th class="py-2.5 px-3 min-w-[130px] bg-surface-container-low">Deadline (Phút)</th>
              <th class="py-2.5 px-3 min-w-[100px] text-center bg-surface-container-low">Ưu tiên</th>
              <th class="py-2.5 px-3 min-w-[120px] text-center bg-surface-container-low">Trạng thái</th>
              <th class="py-2.5 px-3 min-w-[130px] text-center bg-surface-container-low">Đổi Trạng thái</th>
              <th class="py-2.5 px-3 min-w-[70px] text-right bg-surface-container-low">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="t in paginatedTasks" :key="t.id" class="hover:bg-surface-container-low transition-colors text-[11px]">
              <td class="py-2 px-3 font-mono font-bold text-primary whitespace-nowrap">
                {{ t.id }}
              </td>
              <td class="py-2 px-3">
                <p @click="openTaskDetail(t)" class="font-bold text-on-surface hover:text-primary cursor-pointer leading-snug">{{ t.name }}</p>
              </td>
              <td class="py-2 px-3">
                <span class="px-2 py-0.5 bg-surface-container rounded-full text-[10px] font-semibold text-on-surface-variant whitespace-nowrap inline-block">
                  {{ t.wbsName }}
                </span>
              </td>
              <td class="py-2 px-3 whitespace-nowrap">
                <span v-if="t.predecessorTaskId" class="px-2 py-0.5 text-[10px] font-bold rounded-md bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1 w-max">
                  <span class="material-symbols-outlined text-[13px]">link</span>
                  <span>{{ t.predecessorTaskId }}</span>
                </span>
                <span v-else class="text-on-surface-variant text-[10px] italic">-- Độc lập --</span>
              </td>
              <td class="py-2 px-3 font-bold text-primary whitespace-nowrap relative">
                <button 
                  @click.stop="openUserMenu($event, t.raci ? t.raci.responsibleName : 'Trần Thị Hậu Cần', 'Thực hiện chính (R)')"
                  class="hover:underline flex items-center gap-1 text-primary focus:outline-none"
                >
                  <span>{{ t.raci ? t.raci.responsibleName : 'Chưa phân công' }}</span>
                  <span class="material-symbols-outlined text-[14px]">arrow_drop_down</span>
                </button>
              </td>
              <td class="py-2 px-3 text-on-surface-variant whitespace-nowrap relative">
                <button 
                  @click.stop="openUserMenu($event, t.raci ? t.raci.accountableName : 'Nguyễn Văn Trưởng', 'Phê duyệt (A)')"
                  class="hover:underline hover:text-primary flex items-center gap-1 text-on-surface focus:outline-none font-semibold"
                >
                  <span>{{ t.raci ? t.raci.accountableName : 'Chưa gán' }}</span>
                  <span class="material-symbols-outlined text-[14px]">arrow_drop_down</span>
                </button>
              </td>
              <td class="py-2 px-3 font-mono text-on-surface-variant whitespace-nowrap">
                {{ t.startDate || '2026-08-01' }}
              </td>
              <td class="py-2 px-3 font-mono font-semibold text-on-surface whitespace-nowrap">
                {{ t.dueDate }}
              </td>
              <td class="py-2 px-3 text-center whitespace-nowrap">
                <span :class="['px-2 py-0.5 rounded text-[10px] font-bold border', getPriorityBadgeColor(t.priority)]">
                  {{ t.priority }}
                </span>
              </td>
              <td class="py-2 px-3 text-center whitespace-nowrap">
                <span :class="['px-2.5 py-0.5 rounded-full text-[10px] font-bold', getStatusBadgeStyle(t.status)]">
                  {{ getStatusNameVi(t.status) }}
                </span>
              </td>
              <td class="py-2 px-3 text-center whitespace-nowrap">
                <select :value="t.status" @change="handleStatusChange(t.id, $event.target.value)" class="px-2 py-0.5 text-[11px] font-bold rounded-lg border border-outline-variant bg-white focus:outline-none">
                  <option value="To Do">Chưa làm</option>
                  <option value="In Progress">Đang làm</option>
                  <option value="Pending Review">Chờ duyệt</option>
                  <option value="Done">Hoàn thành</option>
                </select>
              </td>
              <td class="py-2 px-3 text-right whitespace-nowrap">
                <button @click="openTaskDetail(t)" class="p-1 hover:bg-surface-container rounded text-on-surface-variant hover:text-primary transition-colors" title="Xem Chi Tiết Task">
                  <span class="material-symbols-outlined text-[16px]">edit</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PAGINATION CONTROLS BAR -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-outline-variant/60 text-xs">
        <div class="flex items-center gap-2 text-on-surface-variant">
          <span>Hiển thị</span>
          <select v-model="itemsPerPage" @change="currentPage = 1" class="px-2 py-1 border border-outline-variant rounded-lg bg-white font-bold text-on-surface focus:outline-none">
            <option :value="5">5 dòng/trang</option>
            <option :value="10">10 dòng/trang</option>
            <option :value="20">20 dòng/trang</option>
            <option :value="50">50 dòng/trang</option>
          </select>
          <span>(Hiển thị {{ pageStartItem }} - {{ pageEndItem }} trong tổng số {{ filteredTasks.length }} công việc)</span>
        </div>

        <div class="flex items-center gap-1.5">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="px-3 py-1.5 border border-outline-variant rounded-lg font-bold hover:bg-surface-container disabled:opacity-40 disabled:hover:bg-transparent transition-colors flex items-center gap-1 text-xs"
          >
            <span class="material-symbols-outlined text-[16px]">chevron_left</span>
            <span>Trước</span>
          </button>
          
          <button 
            v-for="p in totalPages" 
            :key="p"
            @click="currentPage = p"
            :class="[
              'w-8 h-8 rounded-lg font-bold text-xs transition-all',
              currentPage === p ? 'bg-primary text-white shadow-sm' : 'hover:bg-surface-container text-on-surface border border-outline-variant/40'
            ]"
          >
            {{ p }}
          </button>

          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages || totalPages === 0"
            class="px-3 py-1.5 border border-outline-variant rounded-lg font-bold hover:bg-surface-container disabled:opacity-40 disabled:hover:bg-transparent transition-colors flex items-center gap-1 text-xs"
          >
            <span>Sau</span>
            <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- VIEW MODE 2: KANBAN BOARD (FR-02.4) -->
    <div v-else-if="viewMode === 'kanban'" class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div v-for="(sObj, sCode) in statuses" :key="sCode" class="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60 flex flex-col h-[650px]">
        <div class="flex justify-between items-center pb-3 border-b border-outline-variant mb-4">
          <div class="flex items-center gap-2">
            <span :class="['w-3 h-3 rounded-full', sObj.color]"></span>
            <h3 class="font-bold text-sm text-on-surface">{{ sObj.nameVi }}</h3>
          </div>
          <span class="px-2 py-0.5 text-xs font-bold rounded-full bg-white text-on-surface-variant border border-outline-variant/60">
            {{ getTasksByStatus(sCode).length }}
          </span>
        </div>

        <div class="flex-1 overflow-y-auto space-y-3 pr-1">
          <div 
            v-for="t in getTasksByStatus(sCode)" 
            :key="t.id"
            @click="openTaskDetail(t)"
            class="bg-white p-4 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div class="flex justify-between items-start gap-1">
              <span class="font-mono text-[11px] font-bold text-primary">{{ t.id }}</span>
              <span :class="['px-2 py-0.5 text-[9px] font-bold rounded border', getPriorityBadgeColor(t.priority)]">
                {{ t.priority }}
              </span>
            </div>
            <h4 class="font-bold text-xs text-on-surface line-clamp-2">{{ t.name }}</h4>
            <div class="text-[11px] text-on-surface-variant bg-surface-container-low px-2 py-1 rounded truncate">
              {{ t.wbsName }}
            </div>
            <div class="flex justify-between items-center text-[11px] pt-2 border-t border-outline-variant/30">
              <div class="flex items-center gap-1 font-bold text-primary">
                <span class="material-symbols-outlined text-[14px]">person</span>
                <span class="truncate max-w-[100px]">{{ t.raci ? t.raci.responsibleName : 'Staff' }}</span>
              </div>
              <span v-if="t.isOverdue" class="text-red-600 font-bold text-[10px]">⚠️ Trễ</span>
              <span v-else class="text-on-surface-variant font-mono text-[10px]">{{ t.dueDate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW MODE 3: CALENDAR / GANTT CHART -->
    <div v-else-if="viewMode === 'gantt'" class="bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm space-y-6">
      <div class="flex justify-between items-center border-b border-outline-variant pb-4">
        <h3 class="font-bold text-lg text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">timeline</span>
          <span>Sơ đồ Tiến độ Gantt Chart (FR-02.4 & FR-02.7)</span>
        </h3>
        <span class="text-xs text-on-surface-variant font-mono">Tháng 08 - Tháng 09/2026</span>
      </div>

      <div class="overflow-x-auto no-scrollbar">
        <div class="min-w-[900px] space-y-4">
          <div class="flex border-b border-outline-variant pb-2 font-bold text-xs text-on-surface-variant">
            <div class="w-1/3">Công việc & Người phụ trách</div>
            <div class="w-2/3 flex justify-between">
              <span>01/08</span>
              <span>10/08</span>
              <span>20/08</span>
              <span>30/08</span>
              <span>10/09</span>
            </div>
          </div>

          <div v-for="t in filteredTasks" :key="t.id" class="flex items-center text-xs">
            <div class="w-1/3 pr-4">
              <p class="font-bold text-on-surface truncate">{{ t.name }}</p>
              <p class="text-[10px] text-primary">R: {{ t.raci ? t.raci.responsibleName : 'Chưa phân công' }}</p>
            </div>
            <div class="w-2/3 bg-surface-container-low h-7 rounded-full relative overflow-hidden flex items-center px-2">
              <div 
                :class="['absolute top-1 bottom-1 rounded-full flex items-center px-3 text-[10px] text-white font-bold shadow-sm', getGanttBarColor(t.status)]"
                :style="getGanttBarStyle(t.startDate, t.dueDate)"
              >
                <span>{{ t.status }} ({{ t.dueDate }})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- INTERACTIVE USER ACTION POPOVER MENU -->
    <div 
      v-if="activeUserMenu" 
      :style="{ top: activeUserMenu.y + 'px', left: activeUserMenu.x + 'px' }"
      class="fixed z-50 bg-white rounded-xl shadow-2xl border border-outline-variant py-2 w-48 animate-in fade-in zoom-in-95 duration-150"
      @click.stop
    >
      <div class="px-3 py-1.5 border-b border-outline-variant/60 mb-1">
        <p class="font-bold text-xs text-on-surface truncate">{{ activeUserMenu.userName }}</p>
        <p class="text-[10px] text-on-surface-variant">{{ activeUserMenu.roleTitle }}</p>
      </div>
      <button 
        @click="viewUserInfo(activeUserMenu.userName)"
        class="w-full text-left px-3 py-2 text-xs hover:bg-surface-container flex items-center gap-2 text-on-surface font-medium transition-colors"
      >
        <span class="material-symbols-outlined text-[16px] text-primary">person</span>
        <span>Xem thông tin</span>
      </button>
      <button 
        @click="sendUserMessage(activeUserMenu.userName)"
        class="w-full text-left px-3 py-2 text-xs hover:bg-surface-container flex items-center gap-2 text-on-surface font-medium transition-colors"
      >
        <span class="material-symbols-outlined text-[16px] text-secondary">chat</span>
        <span>Nhắn tin</span>
      </button>
    </div>

    <!-- USER INFO MODAL -->
    <div v-if="showProfileModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
        <div class="flex justify-between items-center border-b border-outline-variant pb-3">
          <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">badge</span>
            <span>Hồ Sơ Nhân Sự</span>
          </h3>
          <button @click="showProfileModal = false" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div class="flex items-center gap-4 py-2">
          <div class="w-14 h-14 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center border-2 border-primary/20">
            {{ selectedUserProfile.name ? selectedUserProfile.name.charAt(0) : 'U' }}
          </div>
          <div>
            <h4 class="font-extrabold text-base text-on-surface">{{ selectedUserProfile.name }}</h4>
            <p class="text-xs text-primary font-bold">{{ selectedUserProfile.roleVi }}</p>
            <p class="text-[11px] text-on-surface-variant font-mono">ID: {{ selectedUserProfile.id }}</p>
          </div>
        </div>
        <div class="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60 space-y-2 text-xs">
          <div class="flex justify-between">
            <span class="text-on-surface-variant font-semibold">Phòng ban:</span>
            <span class="font-bold text-on-surface">{{ selectedUserProfile.department }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-on-surface-variant font-semibold">Email:</span>
            <span class="font-bold text-primary">{{ selectedUserProfile.email }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-on-surface-variant font-semibold">Số điện thoại:</span>
            <span class="font-bold text-on-surface font-mono">{{ selectedUserProfile.phone }}</span>
          </div>
        </div>
        <div class="flex justify-end pt-2">
          <button @click="showProfileModal = false" class="px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl">Đóng</button>
        </div>
      </div>
    </div>

    <!-- SEND MESSAGE MODAL DIALOG -->
    <div v-if="showMessageModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
        <div class="flex justify-between items-center border-b border-outline-variant pb-3">
          <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-secondary">chat</span>
            <span>Gửi Tin Nhắn Trực Tiếp</span>
          </h3>
          <button @click="showMessageModal = false" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div class="space-y-3 text-xs">
          <p class="font-semibold text-on-surface-variant">Người nhận: <b class="text-primary">{{ targetMsgUser }}</b></p>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Nội dung tin nhắn *</label>
            <textarea 
              v-model="messageContent" 
              rows="4" 
              placeholder="Nhập nội dung tin nhắn trao đổi công việc..."
              class="w-full px-3 py-2 border border-outline-variant rounded-xl text-xs focus:border-primary focus:outline-none"
            ></textarea>
          </div>
        </div>
        <div class="flex justify-end gap-3 pt-2 border-t border-outline-variant">
          <button @click="showMessageModal = false" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold text-xs rounded-xl">Hủy</button>
          <button @click="confirmSendMessage" class="px-5 py-2 bg-secondary text-white font-bold text-xs rounded-xl shadow hover:bg-secondary/90">Gửi Tin Nhắn</button>
        </div>
      </div>
    </div>

    <!-- Task Detail & RACI Modal (FR-02.1 - FR-02.7) -->
    <TaskDetailModal 
      :isOpen="showModal"
      :task="selectedTask"
      :allTasks="tasks"
      @close="showModal = false"
      @saved="loadTasks"
    />

    <!-- Create WBS Category Modal (FR-01.3) -->
    <CreateWbsModal
      :isOpen="showWbsModal"
      @close="showWbsModal = false"
      @created="handleWbsCreated"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { getCurrentEvent, saveEvent } from '../mock/events.js';
import { getTasks, TASK_STATUSES, TASK_PRIORITIES, changeTaskStatus } from '../mock/tasks.js';
import { getUsers } from '../mock/users.js';
import TaskDetailModal from '../components/TaskDetailModal.vue';
import CreateWbsModal from '../components/CreateWbsModal.vue';

const currentEvent = ref({ wbs: [] });
const tasks = ref([]);
const usersList = ref([]);
const viewMode = ref('list'); // 'list', 'kanban', 'gantt'

const searchQuery = ref('');
const selectedWbs = ref('');
const selectedPriority = ref('');

// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(10);

const showModal = ref(false);
const showWbsModal = ref(false);
const selectedTask = ref(null);

const activeUserMenu = ref(null);
const showProfileModal = ref(false);
const selectedUserProfile = ref({});

const showMessageModal = ref(false);
const targetMsgUser = ref('');
const messageContent = ref('');

const statuses = TASK_STATUSES;

function loadTasks() {
  currentEvent.value = getCurrentEvent();
  tasks.value = getTasks(currentEvent.value.id);
  usersList.value = getUsers();
}

function openUserMenu(event, userName, roleTitle) {
  const rect = event.currentTarget.getBoundingClientRect();
  activeUserMenu.value = {
    userName,
    roleTitle,
    x: rect.left,
    y: rect.bottom + 4
  };
}

function closeUserMenu() {
  activeUserMenu.value = null;
}

function viewUserInfo(userName) {
  closeUserMenu();
  const found = usersList.value.find(u => u.name.toLowerCase() === userName.toLowerCase());
  if (found) {
    selectedUserProfile.value = found;
  } else {
    selectedUserProfile.value = {
      id: 'USR-SYS',
      name: userName,
      roleVi: 'Thành viên Ban Tổ Chức',
      department: 'Ban Hậu cần & Sản xuất',
      email: `${userName.toLowerCase().replace(/\s+/g, '.')}@eventaz.vn`,
      phone: '0908 123 456'
    };
  }
  showProfileModal.value = true;
}

function sendUserMessage(userName) {
  closeUserMenu();
  targetMsgUser.value = userName;
  messageContent.value = '';
  showMessageModal.value = true;
}

function confirmSendMessage() {
  if (!messageContent.value.trim()) {
    alert('Vui lòng nhập nội dung tin nhắn!');
    return;
  }
  alert(`Đã gửi tin nhắn cho [${targetMsgUser.value}] thành công!`);
  showMessageModal.value = false;
}

function addWbsCategory() {
  showWbsModal.value = true;
}

function handleWbsCreated(wbsData) {
  const newWbs = {
    id: `WBS-0${(currentEvent.value.wbs || []).length + 1}`,
    name: wbsData.name,
    leadId: wbsData.leadId,
    leadName: wbsData.leadName,
    coLead: wbsData.coLead,
    order: (currentEvent.value.wbs || []).length + 1
  };
  currentEvent.value.wbs = currentEvent.value.wbs || [];
  currentEvent.value.wbs.push(newWbs);
  saveEvent(currentEvent.value);
  alert(`Đã tạo thành công nhóm WBS [${wbsData.name}] với Trưởng nhóm [${wbsData.leadName}]!`);
}

const filteredTasks = computed(() => {
  return tasks.value.filter(t => {
    const matchQuery = t.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchWbs = !selectedWbs.value || t.wbsId === selectedWbs.value;
    const matchPri = !selectedPriority.value || t.priority === selectedPriority.value;
    return matchQuery && matchWbs && matchPri;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredTasks.value.length / itemsPerPage.value) || 1;
});

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredTasks.value.slice(start, start + itemsPerPage.value);
});

const pageStartItem = computed(() => {
  if (filteredTasks.value.length === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const pageEndItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return end > filteredTasks.value.length ? filteredTasks.value.length : end;
});

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function getTasksByStatus(statusCode) {
  return filteredTasks.value.filter(t => t.status === statusCode);
}

function handleStatusChange(taskId, newStatus) {
  changeTaskStatus(taskId, newStatus);
  loadTasks();
}

function getStatusBadgeStyle(status) {
  const map = {
    'To Do': 'bg-slate-100 text-slate-700 border border-slate-300',
    'In Progress': 'bg-blue-100 text-blue-800 border border-blue-300',
    'Pending Review': 'bg-amber-100 text-amber-800 border border-amber-300',
    'Done': 'bg-emerald-100 text-emerald-800 border border-emerald-300'
  };
  return map[status] || 'bg-slate-100 text-slate-700';
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

function openCreateTask() {
  selectedTask.value = null;
  showModal.value = true;
}

function openTaskDetail(task) {
  selectedTask.value = task;
  showModal.value = true;
}

function getPriorityBadgeColor(p) {
  return TASK_PRIORITIES[p] ? TASK_PRIORITIES[p].color : 'bg-gray-100 text-gray-700';
}

function getGanttBarColor(s) {
  const map = {
    'To Do': 'bg-slate-600',
    'In Progress': 'bg-blue-600',
    'Pending Review': 'bg-amber-600',
    'Done': 'bg-emerald-600'
  };
  return map[s] || 'bg-blue-600';
}

function getGanttBarStyle(start, due) {
  const left = '10%';
  const width = '45%';
  return { left, width };
}

onMounted(() => {
  loadTasks();
  window.addEventListener('click', closeUserMenu);
});

onUnmounted(() => {
  window.removeEventListener('click', closeUserMenu);
});
</script>
