<template>
  <div class="min-h-screen bg-surface flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-8 shadow-2xl space-y-6">
      <!-- Header -->
      <div class="text-center space-y-2">
        <router-link to="/" class="inline-flex items-center gap-2 mb-2">
          <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-extrabold text-2xl shadow-md">
            E
          </div>
          <span class="font-black text-2xl tracking-tight text-primary">EventAZ</span>
        </router-link>
        <h2 class="text-2xl font-extrabold text-on-surface">{{ $t('auth.register.title') }}</h2>
        <p class="text-xs text-on-surface-variant">{{ $t('auth.register.subtitle') }}</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-on-surface mb-1">{{ $t('auth.register.fullnameLabel') }}</label>
          <input 
            type="text" 
            v-model="fullname" 
            placeholder="Nguyễn Văn A" 
            required 
            class="w-full px-3.5 py-2.5 text-xs bg-surface-container-low border border-outline-variant rounded-xl focus:outline-none focus:border-primary text-on-surface"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-on-surface mb-1">{{ $t('auth.register.emailLabel') }}</label>
          <input 
            type="email" 
            v-model="email" 
            placeholder="nguyenvana@example.com" 
            required 
            class="w-full px-3.5 py-2.5 text-xs bg-surface-container-low border border-outline-variant rounded-xl focus:outline-none focus:border-primary text-on-surface"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-on-surface mb-1">{{ $t('auth.register.passwordLabel') }}</label>
          <input 
            type="password" 
            v-model="password" 
            placeholder="••••••••" 
            required 
            class="w-full px-3.5 py-2.5 text-xs bg-surface-container-low border border-outline-variant rounded-xl focus:outline-none focus:border-primary text-on-surface"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-on-surface mb-1">{{ $t('auth.register.roleLabel') }}</label>
          <select 
            v-model="role" 
            class="w-full px-3.5 py-2.5 text-xs bg-surface-container-low border border-outline-variant rounded-xl focus:outline-none focus:border-primary text-on-surface font-semibold"
          >
            <option value="attendee">{{ $t('auth.register.roleAttendee') }}</option>
            <option value="organizer">{{ $t('auth.register.roleOrganizer') }}</option>
            <option value="supplier">{{ $t('auth.register.roleSupplier') }}</option>
          </select>
        </div>

        <div class="flex items-center gap-2 pt-1">
          <input type="checkbox" id="terms" v-model="agreeTerms" required class="rounded border-outline-variant text-primary focus:ring-primary" />
          <label for="terms" class="text-[11px] text-on-surface-variant">
            {{ $t('auth.register.agreeTerms') }}
          </label>
        </div>

        <button 
          type="submit" 
          class="w-full py-3 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
        >
          {{ $t('auth.register.submitButton') }}
        </button>
      </form>

      <!-- Footer Link -->
      <div class="text-center pt-2 border-t border-outline-variant/60">
        <p class="text-xs text-on-surface-variant">
          {{ $t('auth.register.hasAccount') }}
          <router-link to="/login" class="text-primary font-bold hover:underline">{{ $t('auth.register.loginLink') }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '../utils/auth';

const router = useRouter();
const fullname = ref('');
const email = ref('');
const password = ref('');
const role = ref('attendee');
const agreeTerms = ref(false);

function handleRegister() {
  if (email.value && password.value) {
    const user = loginUser(email.value, password.value);
    user.name = fullname.value || user.name;
    router.push('/dashboard');
  }
}
</script>
