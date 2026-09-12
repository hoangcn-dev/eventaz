<template>
  <div class="min-h-[75vh] flex items-center justify-center px-4 py-12">
    <div class="max-w-5xl w-full mx-auto bg-surface-container-lowest border border-outline-variant/60 p-8 md:p-14 rounded-3xl shadow-xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-center">
        <!-- Right Column: Vector Illustration (503.svg) -->
        <div class="flex items-center justify-center order-1 lg:order-2">
          <img 
            src="/images/503.svg" 
            alt="503 Service Maintenance" 
            class="w-full max-w-md h-auto object-contain transition-transform hover:scale-105 duration-300"
          />
        </div>

        <!-- Left Column: Error Text & Action Buttons -->
        <div class="space-y-6 text-center lg:text-left order-2 lg:order-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold border border-sky-500/20">
            <span class="material-symbols-outlined text-[16px]">engineering</span>
            <span>503 ERROR</span>
          </div>

          <div class="space-y-3">
            <h1 class="text-3xl md:text-5xl font-black text-on-surface tracking-tight leading-tight">
              {{ $t('public.errors.maintenanceTitle') }}
            </h1>
            <p class="text-sm md:text-base text-on-surface-variant leading-relaxed max-w-md mx-auto lg:mx-0">
              {{ $t('public.errors.maintenanceDesc') }}
            </p>
          </div>

          <!-- Estimated Time Card -->
          <div class="p-3 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 rounded-xl text-sky-800 dark:text-sky-300 text-xs font-bold flex items-center justify-center lg:justify-start gap-2 max-w-md mx-auto lg:mx-0">
            <span class="material-symbols-outlined text-[18px]">schedule</span>
            <span>{{ $t('public.errors.estimatedTime') }}</span>
          </div>

          <!-- Actions -->
          <div class="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <button 
              @click="handleReload" 
              class="w-full sm:w-auto px-8 py-3.5 bg-primary text-on-primary font-black text-sm rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined text-[20px]">refresh</span>
              <span>{{ $t('public.errors.reloadPage') }}</span>
            </button>

            <router-link 
              to="/" 
              class="w-full sm:w-auto px-6 py-3.5 bg-surface-container-low border border-outline-variant text-on-surface font-bold text-sm rounded-2xl hover:bg-surface-container transition-all flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined text-[20px]">home</span>
              <span>{{ $t('public.errors.goHome') }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
function handleReload() {
  window.location.reload();
}
</script>

