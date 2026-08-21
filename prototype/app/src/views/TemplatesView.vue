<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm">
      <div>
        <h1 class="text-2xl font-extrabold text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">folder_special</span>
          <span>Thư viện Mẫu Sự kiện (FR-01.5)</span>
        </h1>
        <p class="text-sm text-on-surface-variant mt-1">Danh mục các mẫu sự kiện chuẩn hóa toàn tổ chức, phục vụ việc nhân bản tạo nhanh sự kiện mới.</p>
      </div>
      <button @click="$emit('open-clone-event')" class="px-5 py-2.5 bg-primary text-white font-bold rounded-lg shadow hover:bg-primary-hover transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-[20px]">add</span>
        <span>Tạo Sự kiện từ Mẫu</span>
      </button>
    </div>

    <!-- Templates Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div 
        v-for="tpl in templates" 
        :key="tpl.id"
        class="bg-white rounded-xl border border-outline-variant/60 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
      >
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-primary/10 text-primary uppercase">
              {{ tpl.category }}
            </span>
            <span class="text-xs font-mono font-semibold text-primary">{{ tpl.id }}</span>
          </div>
          <h3 class="font-extrabold text-lg text-on-surface">{{ tpl.name }}</h3>
          <p class="text-xs text-on-surface-variant line-clamp-3">{{ tpl.description }}</p>
        </div>

        <div class="space-y-2 pt-3 border-t border-outline-variant/40">
          <p class="text-xs font-bold text-on-surface">Cấu trúc {{ tpl.wbsCategories ? tpl.wbsCategories.length : 0 }} nhóm WBS chuẩn:</p>
          <ul class="text-xs space-y-1 text-on-surface-variant pl-4 list-disc">
            <li v-for="cat in tpl.wbsCategories" :key="cat.id">{{ cat.name }}</li>
          </ul>
        </div>

        <div class="pt-2">
          <button @click="$emit('open-clone-event')" class="w-full py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1">
            <span class="material-symbols-outlined text-[16px]">file_copy</span>
            <span>Nhân bản Mẫu này</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTemplates } from '../mock/templates.js';

defineEmits(['open-clone-event']);
const templates = ref([]);

onMounted(() => {
  templates.value = getTemplates();
});
</script>
