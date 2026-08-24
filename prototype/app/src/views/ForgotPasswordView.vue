<template>
  <div class="min-h-screen flex flex-col bg-background text-on-background font-sans">
    <!-- Main Content Area: Centered forgot password card -->
    <main class="flex-grow flex items-center justify-center px-4 md:px-10 py-12 relative overflow-hidden">
      <!-- Subtle Decorative Elements -->
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div class="w-full max-w-[480px] z-10">
        <!-- Brand Logo / Header -->
        <div class="flex flex-col items-center mb-8">
          <router-link to="/login" class="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20 cursor-pointer">
            <span class="material-symbols-outlined text-white text-[32px]">lock_reset</span>
          </router-link>
          <router-link to="/login" class="text-2xl font-extrabold text-primary tracking-tight cursor-pointer">EventAZ</router-link>
        </div>

        <!-- Forgot Password Card -->
        <div class="glass-card border border-outline-variant rounded-xl p-8 md:p-10 shadow-sm transition-all duration-300">
          
          <!-- State 1: Form Input State -->
          <div v-if="!isSubmitted">
            <div class="mb-8">
              <h2 class="text-xl font-bold text-on-surface mb-3">Quên mật khẩu?</h2>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Nhập địa chỉ email của bạn và chúng tôi sẽ gửi mật khẩu tạm thời đến email của bạn.
              </p>
            </div>

            <form class="space-y-6" @submit.prevent="handleSubmit">
              <!-- Email Field -->
              <div class="space-y-2">
                <label class="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider" for="email">
                  Địa chỉ Email
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span class="material-symbols-outlined text-outline text-[20px]">mail</span>
                  </div>
                  <input 
                    id="email" 
                    v-model="email"
                    type="email" 
                    required 
                    placeholder="name@organization.com" 
                    class="w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                class="w-full py-4 bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md hover:bg-primary-container active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Làm mới mật khẩu</span>
                <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>

            <!-- Footer Links -->
            <div class="mt-8 pt-6 border-t border-outline-variant/50 flex flex-col items-center justify-center">
              <router-link to="/login" class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-primary font-bold text-sm hover:bg-primary/10 transition-all duration-200 group no-underline">
                <span class="material-symbols-outlined text-[20px] leading-none group-hover:-translate-x-1 transition-transform duration-200">arrow_back</span>
                <span class="leading-none group-hover:underline">Quay lại Đăng nhập</span>
              </router-link>
            </div>
          </div>

          <!-- State 2: Success Confirmation State -->
          <div v-else>
            <!-- Notification Alert Box -->
            <div class="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-sm text-center leading-relaxed mb-8 shadow-sm">
              <span class="material-symbols-outlined text-emerald-600 text-[40px] mb-2 block mx-auto">check_circle</span>
              <span>Mật khẩu tạm thời đã được gửi đến email <strong class="font-bold text-emerald-950 underline decoration-emerald-400">{{ maskedEmailText }}</strong>, vui lòng kiểm tra.</span>
            </div>

            <!-- Dual Action Buttons -->
            <div class="grid grid-cols-2 gap-3 mb-6">
              <button 
                type="button" 
                @click="router.push('/dashboard')" 
                class="w-full py-3.5 border border-outline-variant text-on-surface font-semibold text-xs rounded-lg hover:bg-surface-container transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined text-[18px]">home</span>
                <span>Trang chủ</span>
              </button>
              <button 
                type="button" 
                @click="router.push('/login')" 
                class="w-full py-3.5 bg-primary text-on-primary font-semibold text-xs rounded-lg shadow-md hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined text-[18px]">login</span>
                <span>Đăng nhập</span>
              </button>
            </div>

            <!-- Retry Action Link -->
            <div class="text-center pt-4 border-t border-outline-variant/40 mt-6 flex justify-center">
              <button 
                type="button" 
                @click="handleRetry" 
                class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-primary font-bold text-sm hover:bg-primary/10 transition-all duration-200 group cursor-pointer focus:outline-none"
              >
                <span class="material-symbols-outlined text-[18px] leading-none group-hover:rotate-180 transition-transform duration-500 ease-in-out">refresh</span>
                <span class="leading-none group-hover:underline">Thử lại</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Contextual Support -->
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { maskEmail } from '../utils/auth';

const router = useRouter();
const email = ref('organizer@eventaz.vn');
const isSubmitted = ref(false);

const maskedEmailText = computed(() => {
  return maskEmail(email.value);
});

function handleSubmit() {
  if (email.value.trim()) {
    isSubmitted.value = true;
  }
}

function handleRetry() {
  isSubmitted.value = false;
}
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
}
</style>
