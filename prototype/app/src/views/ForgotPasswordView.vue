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
              <h2 class="text-xl font-bold text-on-surface mb-3">{{ $t('auth.forgotPassword.title') }}</h2>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                {{ $t('auth.forgotPassword.subtitle') }}
              </p>
            </div>

            <form class="space-y-6" @submit.prevent="handleSubmit">
              <!-- Email Field -->
              <div class="space-y-2">
                <label class="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider" for="email">
                  {{ $t('auth.forgotPassword.emailLabel') }}
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
                    class="w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all text-on-surface"
                  />
                </div>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                class="w-full py-4 bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md hover:bg-primary-container active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>{{ $t('auth.forgotPassword.submitButton') }}</span>
                <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>

            <div class="mt-8 pt-6 border-t border-outline-variant/60 text-center">
              <router-link to="/login" class="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                <span class="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>{{ $t('auth.forgotPassword.backToLogin') }}</span>
              </router-link>
            </div>
          </div>

          <!-- State 2: Success Confirmation State -->
          <div v-else class="text-center py-4 space-y-6">
            <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <span class="material-symbols-outlined text-[32px]">mark_email_read</span>
            </div>
            <div class="space-y-2">
              <h2 class="text-xl font-bold text-on-surface">{{ $t('auth.forgotPassword.successTitle') }}</h2>
              <p class="text-xs text-on-surface-variant leading-relaxed">
                {{ $t('auth.forgotPassword.successSubtitle') }} <strong class="text-on-surface">{{ email }}</strong>
              </p>
            </div>
            <router-link to="/login" class="inline-flex items-center justify-center w-full py-3 bg-primary text-on-primary font-bold text-xs rounded-lg shadow-md">
              {{ $t('auth.forgotPassword.backToLogin') }}
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const isSubmitted = ref(false);

function handleSubmit() {
  if (email.value) {
    isSubmitted.value = true;
  }
}
</script>
