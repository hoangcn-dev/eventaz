<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">person_add_alt</span>
          <span>Thêm Nhân Sự Mới Vào Kho Tổ Chức (FR-03.3)</span>
        </h3>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Họ và Tên *</label>
          <input type="text" v-model="form.name" required placeholder="Nhập họ và tên đầy đủ..." class="w-full px-3.5 py-2.5 border border-outline-variant rounded-xl font-bold text-sm focus:border-primary focus:outline-none">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Địa chỉ Email *</label>
            <input type="email" v-model="form.email" required placeholder="email@eventaz.vn" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-medium focus:border-primary focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Số Điện Thoại *</label>
            <input type="tel" v-model="form.phone" required placeholder="0908 123 456" class="w-full px-3 py-2 border border-outline-variant rounded-xl font-mono font-bold focus:border-primary focus:outline-none">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Phòng Ban Hệ Thống *</label>
            <select v-model="form.department" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-medium">
              <option v-for="d in departmentsList" :key="d.code" :value="d.code">{{ d.nameVi }}</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Chức Danh Mặc Định *</label>
            <input type="text" v-model="form.roleVi" required placeholder="VD: Chuyên viên Hậu cần..." class="w-full px-3 py-2 border border-outline-variant rounded-xl font-bold focus:border-primary focus:outline-none">
          </div>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Kỹ Năng Phổ Biến (Phân cách bởi dấu phẩy)</label>
          <input type="text" v-model="form.skillsStr" placeholder="VD: Điều phối, Âm thanh, PCCC..." class="w-full px-3 py-2 border border-outline-variant rounded-xl font-medium focus:border-primary focus:outline-none">
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container">Hủy</button>
          <button type="submit" class="px-5 py-2 bg-primary text-white font-bold rounded-xl shadow hover:bg-primary-hover">Thêm Nhân Sự Mới</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { DEPARTMENTS, createPersonnel } from '../mock/users.js';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'created']);

const departmentsList = DEPARTMENTS;

const form = reactive({
  name: '',
  email: '',
  phone: '',
  department: 'Ban Hậu Cần',
  roleVi: 'Chuyên viên Hậu cần',
  skillsStr: 'Quản lý sự kiện, Điều phối'
});

function close() {
  emit('close');
}

function handleSubmit() {
  const skills = form.skillsStr.split(',').map(s => s.trim()).filter(Boolean);
  const newUser = createPersonnel({
    name: form.name,
    email: form.email,
    phone: form.phone,
    department: form.department,
    roleVi: form.roleVi,
    skills: skills
  });

  alert(`Đã thêm nhân sự [${newUser.name}] thành công vào Kho Tổ Chức!`);
  emit('created', newUser);
  close();
}
</script>
