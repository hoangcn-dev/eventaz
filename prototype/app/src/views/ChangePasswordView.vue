<template>
  <div class="min-h-screen flex flex-col bg-background text-on-background font-sans">
    <!-- Main Content Area: Centered Change Password Card -->
    <main class="flex-grow flex items-center justify-center px-4 md:px-10 py-12 relative overflow-hidden">
      <!-- Subtle Decorative Background Circles -->
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div class="w-full max-w-[480px] z-10">
        <!-- Brand Logo / Header -->
        <div class="flex flex-col items-center mb-8">
          <router-link to="/dashboard" class="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20 cursor-pointer">
            <span class="material-symbols-outlined text-white text-[32px]">key</span>
          </router-link>
          <router-link to="/dashboard" class="text-2xl font-extrabold text-primary tracking-tight cursor-pointer">EventAZ</router-link>
        </div>

        <!-- Change Password Card -->
        <div class="glass-card border border-outline-variant rounded-xl p-8 md:p-10 shadow-sm transition-all duration-300">
          
          <!-- Error Alert Banner -->
          <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm flex items-center gap-2">
            <span class="material-symbols-outlined text-red-600 text-[20px]">error</span>
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Success Alert Banner -->
          <div v-if="isSuccess" class="mb-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-sm text-center leading-relaxed shadow-sm">
            <span class="material-symbols-outlined text-emerald-600 text-[40px] mb-2 block mx-auto">check_circle</span>
            <span class="font-bold block text-base text-emerald-950 mb-1">Đổi mật khẩu thành công!</span>
            <span>Hệ thống đang tự động chuyển hướng về trang đăng nhập...</span>
          </div>

          <!-- Change Password Form -->
          <form v-if="!isSuccess" class="space-y-5" @submit.prevent="handleSubmit">
            <!-- Field 1: Current Password -->
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider" for="currentPassword">
                Mật khẩu hiện tại
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-outline text-[20px]">lock</span>
                </div>
                <input 
                  id="currentPassword" 
                  v-model="currentPassword"
                  :type="showCurrentPass ? 'text' : 'password'"
                  required 
                  placeholder="••••••••" 
                  class="w-full pl-11 pr-12 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
                <button 
                  type="button" 
                  @click="showCurrentPass = !showCurrentPass"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  <span class="material-symbols-outlined text-[20px]">{{ showCurrentPass ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
            </div>

            <!-- Field 2: New Password -->
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider" for="newPassword">
                Mật khẩu mới
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-outline text-[20px]">key</span>
                </div>
                <input 
                  id="newPassword" 
                  v-model="newPassword"
                  :type="showNewPass ? 'text' : 'password'"
                  required 
                  placeholder="••••••••" 
                  class="w-full pl-11 pr-12 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
                <button 
                  type="button" 
                  @click="showNewPass = !showNewPass"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  <span class="material-symbols-outlined text-[20px]">{{ showNewPass ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
            </div>

            <!-- Field 3: Confirm New Password -->
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider" for="confirmPassword">
                Xác nhận mật khẩu mới
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-outline text-[20px]">check_circle</span>
                </div>
                <input 
                  id="confirmPassword" 
                  v-model="confirmPassword"
                  :type="showConfirmPass ? 'text' : 'password'"
                  required 
                  placeholder="••••••••" 
                  class="w-full pl-11 pr-12 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
                <button 
                  type="button" 
                  @click="showConfirmPass = !showConfirmPass"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  <span class="material-symbols-outlined text-[20px]">{{ showConfirmPass ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              class="w-full py-4 bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider rounded-lg shadow-md hover:bg-primary-container active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group mt-4"
            >
              <span>Đổi mật khẩu</span>
              <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>

          <!-- Footer Link -->
          <div v-if="!isSuccess" class="mt-8 pt-6 border-t border-outline-variant/50 flex flex-col items-center justify-center">
            <button 
              type="button" 
              @click="router.back()" 
              class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-primary font-bold text-sm hover:bg-primary/10 transition-all duration-200 group focus:outline-none"
            >
              <span class="material-symbols-outlined text-[20px] leading-none group-hover:-translate-x-1 transition-transform duration-200">arrow_back</span>
              <span class="leading-none group-hover:underline">Hủy & Quay lại</span>
            </button>
          </div>
        </div>

        <!-- Support Info -->
        <p class="mt-8 text-center text-sm text-on-surface-variant">
          Cần hỗ trợ? <a class="text-primary hover:underline font-semibold" href="#">Liên hệ Bộ phận hỗ trợ hệ thống</a>
        </p>
      </div>
    </main>

    <!-- Transactional Footer -->
    <footer class="w-full py-6 px-10 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50 text-xs text-on-surface-variant">
      <p class="opacity-70">
        © 2026 EventAZ Multi-Tenant Systems. Tất cả quyền được bảo lưu.
      </p>
      <div class="flex gap-6">
        <a class="hover:text-primary transition-colors" href="#">Chính sách bảo mật</a>
        <a class="hover:text-primary transition-colors" href="#">Điều khoản dịch vụ</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getSession, clearSession } from '../utils/auth';

const router = useRouter();

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const showCurrentPass = ref(false);
const showNewPass = ref(false);
const showConfirmPass = ref(false);

const errorMessage = ref('');
const isSuccess = ref(false);

function handleSubmit() {
  errorMessage.value = '';

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Mật khẩu mới và xác nhận mật khẩu không khớp. Vui lòng kiểm tra lại.';
    return;
  }

  if (newPassword.value.length < 6) {
    errorMessage.value = 'Mật khẩu mới phải có ít nhất 6 ký tự.';
    return;
  }

  let userEmail = 'organizer@eventaz.vn';
  const session = getSession();
  if (session && session.user && session.user.email) {
    userEmail = session.user.email;
  }

  isSuccess.value = true;

  setTimeout(() => {
    clearSession();
    router.push({ path: '/login', query: { email: userEmail } });
  }, 1500);
}
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
}
</style>
