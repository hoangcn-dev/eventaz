<template>
  <div class="min-h-screen w-full flex bg-background text-on-background font-sans overflow-x-hidden">
    <!-- Left Side: Professional Event Branding (Hidden on Mobile) -->
    <section class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary items-center justify-center">
      <!-- Background Image -->
      <div 
        class="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCq9YyBv9TCTCRxpI_-ytiC55kcqZV36Du0xe4idl2orgQtNm9cJeUJMIWMD43aiGlNOYfzux8web_3uI7laitATPdvVcEWKeCsshSsFZQl8f_XU3UkQI4g0QAVG4b3VkOc8Ju7KtjDKRedqsO560RS69CS6zHzJTHpFf8wNS4JeSK0YVKixSRRlg8QL2Az5XKG_mxacSUZvDxvxwjAwjaT_2-03NkYVSRbGYxpedDsZHg1QKqK0Ch6hA')"
      ></div>
      <!-- Kinetic Overlay Gradient -->
      <div class="absolute inset-0 z-10 kinetic-overlay"></div>
      
      <!-- Floating Branding Elements -->
      <div class="relative z-20 px-12 text-on-primary">
        <div class="mb-8">
          <router-link to="/dashboard" class="text-3xl font-extrabold tracking-tight cursor-pointer">EventAZ</router-link>
          <div class="h-1 w-12 bg-on-tertiary-container mt-2 rounded-full"></div>
        </div>
        <h1 class="text-4xl font-bold max-w-lg mb-6 leading-tight">
          Quản lý sự kiện quy mô lớn với độ chính xác tuyệt đối.
        </h1>
        <p class="text-lg max-w-md text-on-primary-container leading-relaxed">
          Trung tâm điều hành cho Tập đoàn Sự kiện Global Events. Tối ưu hóa vận hành, điều phối nhân sự và mang lại trải nghiệm đẳng cấp thế giới.
        </p>
        <div class="mt-12 flex gap-8">
          <div class="flex flex-col">
            <span class="text-2xl font-bold">500+</span>
            <span class="text-xs opacity-80 font-semibold tracking-wider uppercase">TỔ CHỨC</span>
          </div>
          <div class="flex flex-col">
            <span class="text-2xl font-bold">2.4M</span>
            <span class="text-xs opacity-80 font-semibold tracking-wider uppercase">VÉ ĐÃ BÁN</span>
          </div>
          <div class="flex flex-col">
            <span class="text-2xl font-bold">99.9%</span>
            <span class="text-xs opacity-80 font-semibold tracking-wider uppercase">HOẠT ĐỘNG</span>
          </div>
        </div>
      </div>

      <!-- Subtle Decorative Mesh -->
      <div class="absolute bottom-0 left-0 w-full h-1/3 opacity-20 pointer-events-none">
        <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 100 C 20 0 50 0 100 100" fill="none" stroke="white" stroke-width="0.1"></path>
          <path d="M0 100 C 40 10 70 10 100 100" fill="none" stroke="white" stroke-width="0.1"></path>
          <path d="M0 100 C 60 20 90 20 100 100" fill="none" stroke="white" stroke-width="0.1"></path>
        </svg>
      </div>
    </section>

    <!-- Right Side: Authentication Canvas -->
    <section class="w-full lg:w-1/2 flex items-center justify-center py-6 px-6 md:px-12 bg-surface">
      <div class="w-full max-w-md">
        <!-- Mobile Branding -->
        <div class="lg:hidden mb-6 flex flex-col items-center text-center">
          <span class="text-3xl font-extrabold text-primary">EventAZ</span>
          <p class="text-sm text-on-surface-variant mt-1">Hệ thống Quản lý Sự kiện Chuyên nghiệp</p>
        </div>

        <!-- Header -->
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-on-surface mb-1">Chào mừng quay trở lại</h2>
          <p class="text-base text-on-surface-variant">Đăng nhập để quản lý các sự kiện của tổ chức bạn.</p>
        </div>

        <!-- Login Card -->
        <div class="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <!-- Email Field -->
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-on-surface uppercase tracking-wider" for="email">Địa chỉ Email</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                <input 
                  id="email" 
                  v-model="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  class="w-full pl-10 pr-4 py-2.5 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-1.5">
              <div class="flex justify-between items-center">
                <label class="block text-xs font-semibold text-on-surface uppercase tracking-wider" for="password">Mật khẩu</label>
                <router-link to="/forgot-password" class="text-xs font-semibold text-primary hover:underline transition-all">Quên mật khẩu?</router-link>
              </div>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                <input 
                  id="password" 
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="••••••••"
                  class="w-full pl-10 pr-12 py-2.5 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all text-sm"
                />
                <button 
                  type="button" 
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  <span class="material-symbols-outlined text-[20px]">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
            </div>

            <!-- Remember Me -->
            <div class="flex items-center space-x-3 pt-1">
              <input id="remember" v-model="rememberMe" type="checkbox" class="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary transition-all">
              <label for="remember" class="text-xs text-on-surface-variant cursor-pointer">Ghi nhớ thiết bị này trong 30 ngày</label>
            </div>

            <!-- Sign In Button -->
            <button 
              type="submit" 
              class="w-full py-3 bg-primary text-on-primary font-semibold text-sm rounded-lg shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Đăng nhập</span>
              <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-outline-variant"></div>
            </div>
            <div class="relative flex justify-center text-xs font-semibold">
              <span class="bg-surface-container-lowest px-4 text-outline">HOẶC TIẾP TỤC VỚI</span>
            </div>
          </div>

          <!-- Social Logins -->
          <div class="grid grid-cols-2 gap-3">
            <button type="button" class="flex items-center justify-center gap-2 py-2.5 px-4 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors active:scale-95 duration-200 text-xs font-semibold text-on-surface">
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span>Google</span>
            </button>
            <button type="button" class="flex items-center justify-center gap-2 py-2.5 px-4 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors active:scale-95 duration-200 text-xs font-semibold text-on-surface">
              <svg class="w-5 h-5" fill="#0077b5" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
              </svg>
              <span>LinkedIn</span>
            </button>
          </div>
        </div>

        <!-- Footer Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-on-surface-variant">
            Mới sử dụng EventAZ? 
            <a class="text-primary font-bold hover:underline transition-all ml-1" href="#">Tạo tài khoản tổ chức</a>
          </p>
        </div>

        <!-- Footer Small Print -->
        <div class="mt-10 flex flex-wrap justify-center gap-4 text-outline text-xs font-semibold">
          <a class="hover:text-on-surface transition-colors" href="#">Chính sách bảo mật</a>
          <span class="w-1 h-1 bg-outline rounded-full self-center"></span>
          <a class="hover:text-on-surface transition-colors" href="#">Điều khoản dịch vụ</a>
          <span class="w-1 h-1 bg-outline rounded-full self-center"></span>
          <a class="hover:text-on-surface transition-colors" href="#">Trạng thái hệ thống</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { loginUser } from '../utils/auth';

const route = useRoute();
const router = useRouter();

const email = ref('organizer@eventaz.vn');
const password = ref('123456');
const showPassword = ref(false);
const rememberMe = ref(true);

onMounted(() => {
  if (route.query.email) {
    email.value = route.query.email;
  }
});

function handleSubmit() {
  const user = loginUser(email.value, password.value);
  router.push(user.redirectUrl || '/dashboard');
}
</script>

<style scoped>
.kinetic-overlay {
  background: linear-gradient(135deg, rgba(0, 40, 142, 0.85) 0%, rgba(113, 42, 226, 0.7) 100%);
}
</style>
