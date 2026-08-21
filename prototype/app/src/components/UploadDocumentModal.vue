<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3">
        <h3 class="font-extrabold text-base text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">upload_file</span>
          <span>Tải Lên Tài Liệu Sự Kiện Mới</span>
        </h3>
        <button @click="close" class="p-1 text-on-surface-variant hover:bg-surface-container rounded-full">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Main Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
        <!-- Real File Input Trigger -->
        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">1. Chọn Tập Tin từ Máy Tính *</label>
          <div 
            @click="triggerFilePicker"
            class="border-2 border-dashed border-outline-variant rounded-xl p-5 text-center bg-surface-container-low hover:bg-primary/5 hover:border-primary cursor-pointer transition-all space-y-2"
          >
            <span class="material-symbols-outlined text-3xl text-primary">cloud_upload</span>
            <p class="font-bold text-on-surface text-xs">{{ form.name || 'Nhấp vào đây để chọn tệp tài liệu...' }}</p>
            <p class="text-[10px] text-on-surface-variant">Hỗ trợ PDF, DOCX, XLSX, PNG, ZIP, CAD (Tối đa 50 MB)</p>
          </div>
          <input ref="fileInputRef" type="file" class="hidden" @change="handleFileSelected">
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="block font-bold text-on-surface uppercase">2. Kiểu Tài Liệu Sự Kiện *</label>
            <button 
              type="button" 
              @click="toggleCustomCatInput"
              class="text-[10px] font-bold text-primary hover:underline flex items-center gap-0.5 focus:outline-none"
            >
              <span class="material-symbols-outlined text-[13px]">add</span>
              <span>Thêm Kiểu Tùy Chỉnh</span>
            </button>
          </div>

          <!-- Custom Category Text Input -->
          <div v-if="isAddingCustomCat" class="flex gap-2 mb-2">
            <input 
              v-model="customCatText" 
              type="text" 
              placeholder="Nhập tên Kiểu tài liệu mới (VD: Hồ sơ bảo hiểm)..." 
              class="flex-1 px-3 py-1.5 border border-primary rounded-xl font-bold text-xs focus:outline-none"
            >
            <button 
              type="button" 
              @click="saveNewCategory" 
              class="px-3 py-1.5 bg-primary text-white font-bold rounded-xl text-xs"
            >
              Lưu Kiểu Mới
            </button>
          </div>

          <!-- Category Select -->
          <select v-model="form.typeCategory" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-bold text-primary focus:outline-none">
            <option v-for="c in categoriesList" :key="c.code" :value="c.code">{{ c.nameVi }}</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Định Dạng File *</label>
            <input type="text" v-model="form.format" required readonly class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-surface-container font-mono font-bold focus:outline-none">
          </div>
          <div>
            <label class="block font-bold text-on-surface uppercase mb-1">Dung Lượng (KB) *</label>
            <input type="text" v-model="form.sizeKb" required readonly class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-surface-container font-mono font-bold focus:outline-none">
          </div>
        </div>

        <div>
          <label class="block font-bold text-on-surface uppercase mb-1">Người Nộp Tài Liệu *</label>
          <select v-model="form.uploaderId" required class="w-full px-3 py-2 border border-outline-variant rounded-xl bg-white font-medium focus:outline-none focus:border-primary">
            <option v-for="u in usersList" :key="u.id" :value="u.id">{{ u.name }} ({{ u.roleVi }})</option>
          </select>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
          <button type="button" @click="close" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container">Hủy</button>
          <button type="submit" :disabled="!form.name" class="px-5 py-2 bg-primary text-white font-bold rounded-xl shadow hover:bg-primary-hover disabled:opacity-50">Tải Lên Kho Tài Liệu</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { getDocumentCategories, addCustomDocumentCategory, saveDocument } from '../mock/documents.js';
import { getUsers } from '../mock/users.js';
import { getCurrentEvent } from '../mock/events.js';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'uploaded']);

const fileInputRef = ref(null);
const categoriesList = ref([]);
const usersList = ref([]);

const isAddingCustomCat = ref(false);
const customCatText = ref('');

const form = reactive({
  name: '',
  typeCategory: 'Kịch bản & Chương trình',
  format: 'PDF',
  sizeKb: '1,250 KB',
  uploaderId: 'USR-001'
});

function loadCategories() {
  categoriesList.value = getDocumentCategories();
}

watch(() => props.isOpen, (val) => {
  if (val) {
    loadCategories();
    usersList.value = getUsers();
    if (usersList.value.length > 0) {
      form.uploaderId = usersList.value[0].id;
    }
  }
});

function toggleCustomCatInput() {
  isAddingCustomCat.value = !isAddingCustomCat.value;
  customCatText.value = '';
}

function saveNewCategory() {
  if (!customCatText.value.trim()) return;
  addCustomDocumentCategory(customCatText.value.trim());
  loadCategories();
  form.typeCategory = customCatText.value.trim();
  isAddingCustomCat.value = false;
  customCatText.value = '';
  alert(`Đã bổ sung Kiểu tài liệu mới [${form.typeCategory}] cho sự kiện thành công!`);
}

function triggerFilePicker() {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
}

function handleFileSelected(e) {
  const file = e.target.files[0];
  if (file) {
    form.name = file.name;
    const ext = file.name.split('.').pop().toUpperCase();
    form.format = ['PDF', 'DOCX', 'XLSX', 'PNG', 'ZIP', 'CAD'].includes(ext) ? ext : 'PDF';
    const kb = Math.round(file.size / 1024);
    form.sizeKb = `${kb.toLocaleString()} KB`;
  }
}

function close() {
  emit('close');
}

function handleSubmit() {
  if (!form.name) return;
  const uploaderUser = usersList.value.find(u => u.id === form.uploaderId);
  const currentEvt = getCurrentEvent();

  const newDoc = {
    id: `DOC-0${Date.now().toString().slice(-2)}`,
    eventId: currentEvt.id,
    name: form.name,
    typeCategory: form.typeCategory,
    format: form.format,
    sizeKb: form.sizeKb,
    uploadDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
    uploaderId: form.uploaderId,
    uploaderName: uploaderUser ? uploaderUser.name : 'Nguyễn Văn Trưởng',
    uploaderRole: uploaderUser ? (uploaderUser.roleVi || uploaderUser.role) : 'Trưởng BTC',
    avatar: uploaderUser ? uploaderUser.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  };

  saveDocument(newDoc);
  alert(`Đã tải lên tài liệu [${newDoc.name}] thuộc Kiểu [${newDoc.typeCategory}] thành công!`);
  emit('uploaded', newDoc);
  close();
}
</script>
