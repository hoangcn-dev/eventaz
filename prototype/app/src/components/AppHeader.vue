<template>
  <header class="fixed top-0 left-0 right-0 h-16 bg-surface-container-lowest border-b border-outline-variant z-50 flex items-center justify-between px-4 shadow-sm">
    <div class="flex items-center gap-4">
      <button @click="$emit('toggle-mobile-menu')" class="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant lg:hidden">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <router-link to="/dashboard" class="flex items-center gap-2">
        <div class="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md">E</div>
        <span class="font-extrabold text-xl tracking-tight text-primary">EventAZ</span>
        <span class="px-2 py-0.5 text-[11px] font-bold bg-primary/10 text-primary rounded-full uppercase ml-1">Ban Tổ Chức</span>
      </router-link>
    </div>
    <div class="flex items-center gap-3">
      <div class="relative hidden sm:block w-64">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
        <input type="text" placeholder="Tìm kiếm sự kiện, công việc..." class="w-full pl-9 pr-4 py-1.5 text-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary">
      </div>
      <button class="p-2 hover:bg-surface-container rounded-full text-on-surface-variant relative" title="Thông báo">
        <span class="material-symbols-outlined">notifications</span>
        <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div class="flex items-center gap-3 pl-3 border-l border-outline-variant">
        <div class="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-sm">NV</div>
        <div class="hidden md:block text-left">
          <p class="text-xs font-bold leading-tight">Nguyễn Văn A</p>
          <p class="text-[11px] text-on-surface-variant">Trưởng BTC Tổ chức</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineEmits(['toggle-mobile-menu']);
</script>
