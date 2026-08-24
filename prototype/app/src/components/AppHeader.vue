<template>
  <header class="fixed top-0 left-0 right-0 h-16 bg-surface-container-lowest border-b border-outline-variant z-50 flex items-center justify-between pl-4 pr-0 shadow-sm">
    <!-- Cụm Logo & Tên Công Ty -->
    <div class="flex items-center gap-4">
      <button @click="$emit('toggle-mobile-menu')" class="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant lg:hidden">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <router-link to="/dashboard" class="flex items-center gap-2">
        <div class="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md">E</div>
        <span class="font-extrabold text-xl tracking-tight text-primary">EventAZ</span>
        <!-- Tên công ty không highlight -->
        <span class="text-sm text-on-surface-variant font-semibold border-l border-outline-variant/60 pl-2.5 ml-1 hidden sm:inline-block">
          Công ty TNHH Truyền thông & Sự kiện AZ
        </span>
      </router-link>
    </div>

    <div class="flex items-center gap-3 h-full">
      <!-- Ô Tìm kiếm -->
      <div class="relative hidden sm:block w-64">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
        <input type="text" placeholder="Tìm kiếm sự kiện, công việc..." class="w-full pl-9 pr-4 py-1.5 text-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary">
      </div>

      <!-- Nút Thông báo (Hover tròn chuẩn) -->
      <button 
        @click="showNotificationDrawer = !showNotificationDrawer"
        class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant relative" 
        title="Thông báo"
      >
        <span class="material-symbols-outlined">notifications</span>
        <span v-if="unreadCount > 0" class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <!-- Cụm Avatar + Tên + Dropdown hành động (Phủ kín chiều cao h-16, sát mép phải) -->
      <div id="user-profile-container" class="relative h-16 flex items-center border-l border-outline-variant ml-1">
        <div 
          @click="toggleUserDropdown"
          class="h-full flex items-center gap-2.5 px-3.5 cursor-pointer hover:bg-surface-container transition-all select-none"
        >
          <div class="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-sm shadow-sm border border-primary/20">
            NV
          </div>
          <div class="hidden md:block text-left">
            <p class="text-xs font-bold leading-tight text-on-surface">Nguyễn Văn A</p>
            <p class="text-[11px] text-on-surface-variant">Trưởng BTC Tổ chức</p>
          </div>
          <span class="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform" :class="{ 'rotate-180': showUserDropdown }">
            expand_more
          </span>
        </div>
      </div>
    </div>
  </header>

  <!-- Menu Dropdown Danh sách hành động (Slide-down mượt bắt đầu từ sau mép dưới Topbar z-40) -->
  <transition name="slide-down">
    <div 
      v-show="showUserDropdown" 
      class="fixed top-16 right-0 bg-surface-container-lowest border-b border-l border-outline-variant shadow-xl p-1.5 z-40 rounded-none"
      :style="{ left: userProfileLeft ? `${userProfileLeft}px` : 'auto' }"
    >


      <router-link 
        to="/profile" 
        @click="showUserDropdown = false"
        class="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-on-surface rounded-none hover:bg-surface-container transition-colors"
      >
        <span class="material-symbols-outlined text-[18px] text-on-surface-variant">account_circle</span>
        <span>Thông tin cá nhân</span>
      </router-link>

      <router-link 
        to="/change-password" 
        @click="showUserDropdown = false"
        class="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-on-surface rounded-none hover:bg-surface-container transition-colors"
      >
        <span class="material-symbols-outlined text-[18px] text-primary">key</span>
        <span>Đổi mật khẩu</span>
      </router-link>

      <router-link 
        to="/settings" 
        @click="showUserDropdown = false"
        class="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-on-surface rounded-none hover:bg-surface-container transition-colors"
      >
        <span class="material-symbols-outlined text-[18px] text-on-surface-variant">settings</span>
        <span>Cài đặt tài khoản</span>
      </router-link>

      <div class="my-1 border-t border-outline-variant/40"></div>

      <button 
        @click="handleLogout"
        class="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-600 rounded-none hover:bg-red-50 transition-colors text-left"
      >
        <span class="material-symbols-outlined text-[18px] text-red-600">logout</span>
        <span>Đăng xuất</span>
      </button>
    </div>
  </transition>

  <!-- Lớp phủ mờ đè ngoài khi mở Drawer Thông báo -->
  <div 
    v-show="showNotificationDrawer" 
    @click="showNotificationDrawer = false"
    class="fixed inset-0 top-16 bg-black/20 z-40 transition-opacity"
  ></div>

  <!-- Drawer Thông báo (Slide-down từ mép dưới Topbar xuống tận đáy màn hình) -->
  <transition name="slide-down">
    <div 
      v-show="showNotificationDrawer" 
      class="fixed top-16 right-0 bottom-0 w-80 sm:w-96 bg-surface-container-lowest border-l border-outline-variant shadow-2xl z-40 flex flex-col overflow-hidden"
    >
      <!-- Header Drawer -->
      <div class="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/50">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">notifications</span>
          <h3 class="font-bold text-base text-on-surface">Thông báo</h3>
          <span v-if="unreadCount > 0" class="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
            {{ unreadCount }} mới
          </span>
        </div>
        <div class="flex items-center gap-1">
          <button 
            @click="markAllAsRead" 
            class="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
            title="Đánh dấu tất cả là đã đọc"
          >
            <span class="material-symbols-outlined text-[16px]">done_all</span>
            <span class="hidden sm:inline">Đã đọc</span>
          </button>
          <button 
            @click="showNotificationDrawer = false" 
            class="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors"
          >
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      <!-- Tab Lọc Thông báo -->
      <div class="flex border-b border-outline-variant px-4 gap-4 bg-surface-container-lowest text-xs font-medium">
        <button 
          @click="filterType = 'all'"
          :class="['py-2.5 border-b-2 transition-colors', filterType === 'all' ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant hover:text-on-surface']"
        >
          Tất cả ({{ notifications.length }})
        </button>
        <button 
          @click="filterType = 'unread'"
          :class="['py-2.5 border-b-2 transition-colors', filterType === 'unread' ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant hover:text-on-surface']"
        >
          Chưa đọc ({{ unreadCount }})
        </button>
      </div>

      <!-- Danh sách Thông báo cuộn -->
      <div class="flex-1 overflow-y-auto divide-y divide-outline-variant/40">
        <div 
          v-for="item in filteredNotifications" 
          :key="item.id"
          @click="item.read = true"
          :class="['p-4 hover:bg-surface-container-low transition-colors cursor-pointer flex gap-3', !item.read ? 'bg-primary/5' : '']"
        >
          <div :class="['w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-white shadow-sm', item.iconBg]">
            <span class="material-symbols-outlined text-[18px]">{{ item.icon }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-1 mb-0.5">
              <p :class="['text-xs truncate', !item.read ? 'font-bold text-on-surface' : 'font-medium text-on-surface-variant']">
                {{ item.title }}
              </p>
              <span class="text-[10px] text-on-surface-variant shrink-0">{{ item.time }}</span>
            </div>
            <p class="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-1">
              {{ item.message }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { clearSession } from '../utils/auth';

const router = useRouter();

defineEmits(['toggle-mobile-menu']);

const showUserDropdown = ref(false);
const userProfileLeft = ref(0);
const showNotificationDrawer = ref(false);
const filterType = ref('all');

function updateUserProfilePosition() {
  const container = document.getElementById('user-profile-container');
  if (container) {
    userProfileLeft.value = container.getBoundingClientRect().left;
  }
}

function toggleUserDropdown() {
  updateUserProfilePosition();
  showUserDropdown.value = !showUserDropdown.value;
}

const notifications = ref([
  {
    id: 1,
    title: 'Cập nhật kịch bản ROS',
    message: 'Nguyễn Văn Trưởng đã cập nhật kịch bản Run-of-Show cho sự kiện Tech Summit Asia 2024.',
    time: '10 phút trước',
    read: false,
    category: 'Sự kiện',
    icon: 'event_note',
    iconBg: 'bg-blue-600'
  },
  {
    id: 2,
    title: 'Yêu cầu phê duyệt ngân sách',
    message: 'Bộ phận Hậu cần đã gửi yêu cầu duyệt bổ sung kinh phí thuê âm thanh ánh sáng.',
    time: '1 giờ trước',
    read: false,
    category: 'Phê duyệt',
    icon: 'verified_user',
    iconBg: 'bg-amber-600'
  },
  {
    id: 3,
    title: 'Đặt vé mới thành công',
    message: 'Khách hàng Trần Thị B vừa hoàn tất thanh toán 2 vé VIP tham dự Tech Summit.',
    time: '3 giờ trước',
    read: true,
    category: 'Vé điện tử',
    icon: 'confirmation_number',
    iconBg: 'bg-emerald-600'
  },
  {
    id: 4,
    title: 'Phân công nhiệm vụ mới',
    message: 'Bạn được phân công làm Trưởng ban đối ngoại cho sự kiện Music Festival 2024.',
    time: '1 ngày trước',
    read: true,
    category: 'Công việc',
    icon: 'assignment_ind',
    iconBg: 'bg-indigo-600'
  }
]);

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length;
});

const filteredNotifications = computed(() => {
  if (filterType.value === 'unread') {
    return notifications.value.filter(n => !n.read);
  }
  return notifications.value;
});

function markAllAsRead() {
  notifications.value.forEach(n => n.read = true);
}

function handleLogout() {
  showUserDropdown.value = false;
  clearSession();
  router.push('/login');
}

function handleClickOutside(event) {
  const profileContainer = document.getElementById('user-profile-container');
  if (profileContainer && !profileContainer.contains(event.target)) {
    showUserDropdown.value = false;
  }
}

onMounted(() => {
  updateUserProfilePosition();
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', updateUserProfilePosition);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', updateUserProfilePosition);
});
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
