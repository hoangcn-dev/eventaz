<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto p-6 pb-24 space-y-6">
    <!-- Header Banner -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-outline-variant/60 shadow-sm gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-3xl">description</span>
            <span>Kho Tài Liệu & Hồ Sơ Sự Kiện</span>
          </h1>
          <span class="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-xs">
            {{ currentEvent.name || 'Tech Summit Asia' }}
          </span>
        </div>
        <p class="text-xs text-on-surface-variant mt-1 font-medium">Lưu trữ toàn bộ hồ sơ pháp lý, hợp đồng, kịch bản, sơ đồ hậu cần và báo giá kỹ thuật của sự kiện.</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="showUploadModal = true" class="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px]">upload_file</span>
          <span>Tải Lên Tài Liệu Mới</span>
        </button>
      </div>
    </div>

    <!-- KPI STATS CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
            <span class="material-symbols-outlined">folder_open</span>
          </div>
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">Kho Hồ Sơ</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Số Tài Liệu</p>
          <h2 class="text-2xl font-extrabold text-on-surface mt-1">{{ documentsList.length }} Tập tin</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Phân chia trong {{ totalCategories }} Kiểu tài liệu</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-purple-50 rounded-lg text-secondary">
            <span class="material-symbols-outlined">hard_drive</span>
          </div>
          <span class="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">Dung Lượng</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Tổng Kích Thước Storage</p>
          <h2 class="text-2xl font-extrabold text-secondary mt-1">32.6 MB</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Lưu trữ an toàn trên Cloud</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <span class="material-symbols-outlined">verified</span>
          </div>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Pháp Lý & Hợp Đồng</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Hồ Sơ Quan Trọng</p>
          <h2 class="text-2xl font-extrabold text-emerald-700 mt-1">{{ legalCount }} Văn bản</h2>
          <p class="text-[10px] text-emerald-600 font-bold mt-1">✓ Đã phê duyệt chính thức</p>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-amber-50 rounded-lg text-amber-600">
            <span class="material-symbols-outlined">history</span>
          </div>
          <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Mới Cập Nhật</span>
        </div>
        <div class="mt-3">
          <p class="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Lần Tải Lên Gần Nhất</p>
          <h2 class="text-xl font-extrabold text-on-surface mt-1">Hôm nay 17:00</h2>
          <p class="text-[10px] text-on-surface-variant font-medium mt-1">Bởi Vũ Anh Kỹ Thuật</p>
        </div>
      </div>
    </div>

    <!-- LIVE SEARCH, FILTER BAR & VIEW TOGGLE SWITCHER -->
    <div class="bg-white p-3.5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
      <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto text-xs">
        <!-- Live Search -->
        <div class="relative w-full sm:w-72">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Tìm theo tên file, kiểu tài liệu, người nộp..." 
            class="w-full pl-8 pr-3 py-1.5 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
          >
        </div>

        <!-- Filter by Document Category -->
        <select v-model="selectedCategory" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Kiểu Tài Liệu</option>
          <option v-for="c in categoriesList" :key="c.code" :value="c.code">{{ c.nameVi }}</option>
        </select>

        <!-- Filter by Format -->
        <select v-model="selectedFormat" class="px-3 py-1.5 border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary font-medium">
          <option value="">Tất cả Định dạng (Format)</option>
          <option value="PDF">PDF Document</option>
          <option value="DOCX">Word (.docx)</option>
          <option value="XLSX">Excel (.xlsx)</option>
          <option value="PNG">Image (.png)</option>
          <option value="ZIP">Archive (.zip)</option>
        </select>

        <!-- Add Custom Doc Category Button -->
        <button @click="showUploadModal = true" class="px-3 py-1.5 bg-surface-container text-primary border border-primary/20 font-bold rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-1">
          <span class="material-symbols-outlined text-[15px]">add</span>
          <span>Thêm Kiểu Tài Liệu Mới</span>
        </button>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs text-on-surface-variant font-medium hidden md:inline">
          Hiển thị: <b class="text-on-surface">{{ filteredDocuments.length }}</b> / {{ documentsList.length }} tập tin
        </span>

        <!-- VIEW TOGGLE SWITCHER BUTTONS -->
        <div class="flex bg-surface-container-low p-0.5 rounded-lg border border-outline-variant/60">
          <button 
            @click="viewMode = 'grid'" 
            :class="['px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1', viewMode === 'grid' ? 'bg-primary text-white shadow' : 'text-on-surface-variant hover:text-on-surface']"
          >
            <span class="material-symbols-outlined text-[15px]">grid_view</span>
            <span>Dạng Lưới</span>
          </button>
          <button 
            @click="viewMode = 'list'" 
            :class="['px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1', viewMode === 'list' ? 'bg-primary text-white shadow' : 'text-on-surface-variant hover:text-on-surface']"
          >
            <span class="material-symbols-outlined text-[15px]">view_list</span>
            <span>Dạng Bảng</span>
          </button>
        </div>
      </div>
    </div>

    <!-- VIEW MODE 1: GRID LAYOUT (DẠNG LƯỚI 3-4 CỘT) -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div 
        v-for="doc in filteredDocuments" 
        :key="doc.id"
        class="bg-white rounded-2xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 group"
      >
        <!-- Top Badges & Actions -->
        <div class="flex justify-between items-start">
          <span :class="['px-2.5 py-0.5 rounded text-[10px] font-bold border font-mono', getFormatBadgeStyle(doc.format)]">
            {{ doc.format }}
          </span>
          <span class="px-2 py-0.5 bg-surface-container rounded-full text-[10px] font-bold text-on-surface-variant">
            {{ doc.typeCategory }}
          </span>
        </div>

        <!-- Document Main Info -->
        <div class="flex items-start gap-3">
          <div class="p-3 bg-primary/10 rounded-xl text-primary shrink-0 group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-2xl">
              {{ getFileIcon(doc.format) }}
            </span>
          </div>
          <div class="truncate">
            <h4 @click="downloadDoc(doc.name)" class="font-extrabold text-xs text-on-surface hover:text-primary cursor-pointer leading-snug line-clamp-2" :title="doc.name">
              {{ doc.name }}
            </h4>
            <p class="text-[11px] font-mono font-bold text-on-surface-variant mt-1">{{ doc.sizeKb }}</p>
          </div>
        </div>

        <!-- Bottom Uploader Info & Quick Actions -->
        <div class="pt-3 border-t border-outline-variant/40 flex justify-between items-center text-xs">
          <div class="flex items-center gap-2 truncate">
            <img :src="doc.avatar" class="w-6 h-6 rounded-full border border-outline-variant object-cover shrink-0" alt="Avatar">
            <div class="truncate">
              <p class="font-bold text-[11px] text-on-surface truncate leading-tight">{{ doc.uploaderName }}</p>
              <p class="text-[9px] text-on-surface-variant font-medium truncate">{{ doc.uploadDate }}</p>
            </div>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <button @click="downloadDoc(doc.name)" class="p-1 hover:bg-primary/10 rounded text-primary transition-colors" title="Tải về file">
              <span class="material-symbols-outlined text-[16px]">download</span>
            </button>
            <button @click="handleDeleteDoc(doc.id, doc.name)" class="p-1 hover:bg-red-50 rounded text-red-600 transition-colors" title="Xóa tài liệu">
              <span class="material-symbols-outlined text-[16px]">delete</span>
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredDocuments.length === 0" class="col-span-full bg-white p-12 rounded-2xl border border-outline-variant/60 text-center space-y-3">
        <span class="material-symbols-outlined text-4xl text-on-surface-variant">folder_off</span>
        <p class="font-bold text-sm text-on-surface">Không tìm thấy tài liệu phù hợp.</p>
        <p class="text-xs text-on-surface-variant">Thử thay đổi từ khóa tìm kiếm hoặc lọc theo kiểu tài liệu khác.</p>
      </div>
    </div>

    <!-- VIEW MODE 2: LIST LAYOUT (DẠNG BẢNG 6 CỘT) -->
    <div v-else class="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden p-4 space-y-4">
      <div class="overflow-x-auto overflow-y-auto max-h-[550px]">
        <table class="w-full text-left text-xs border-collapse min-w-[1100px]">
          <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
            <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
              <th class="py-2.5 px-3 min-w-[280px] bg-surface-container-low">Tên Tài Liệu</th>
              <th class="py-2.5 px-3 min-w-[170px] bg-surface-container-low">Kiểu Tài Liệu</th>
              <th class="py-2.5 px-3 min-w-[110px] text-center bg-surface-container-low">Định Dạng File</th>
              <th class="py-2.5 px-3 min-w-[120px] bg-surface-container-low">Dung Lượng (KB)</th>
              <th class="py-2.5 px-3 min-w-[220px] bg-surface-container-low">Người Nộp & Thời Gian</th>
              <th class="py-2.5 px-3 min-w-[100px] text-right bg-surface-container-low">Thao Tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/40">
            <tr v-for="doc in filteredDocuments" :key="doc.id" class="hover:bg-surface-container-low transition-colors text-[11px]">
              <td class="py-2.5 px-3 font-bold text-on-surface">
                <div class="flex items-center gap-2.5">
                  <div class="p-2 bg-surface-container rounded-lg shrink-0">
                    <span class="material-symbols-outlined text-primary text-[18px]">
                      {{ getFileIcon(doc.format) }}
                    </span>
                  </div>
                  <div class="truncate">
                    <p class="font-bold text-on-surface hover:text-primary cursor-pointer truncate text-xs">{{ doc.name }}</p>
                    <p class="text-[10px] text-on-surface-variant font-mono truncate">ID: {{ doc.id }}</p>
                  </div>
                </div>
              </td>
              <td class="py-2.5 px-3 whitespace-nowrap">
                <span class="px-2.5 py-0.5 bg-surface-container rounded-full text-[10px] font-bold text-on-surface-variant inline-block">
                  {{ doc.typeCategory }}
                </span>
              </td>
              <td class="py-2.5 px-3 text-center whitespace-nowrap">
                <span :class="['px-2 py-0.5 rounded text-[10px] font-bold border font-mono', getFormatBadgeStyle(doc.format)]">
                  {{ doc.format }}
                </span>
              </td>
              <td class="py-2.5 px-3 font-mono font-bold text-on-surface whitespace-nowrap">
                {{ doc.sizeKb }}
              </td>
              <td class="py-2.5 px-3 font-bold text-on-surface whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <img :src="doc.avatar" class="w-6 h-6 rounded-full border border-outline-variant object-cover shrink-0" alt="Avatar">
                  <div class="truncate">
                    <p class="font-bold text-xs text-on-surface truncate">{{ doc.uploaderName }}</p>
                    <p class="text-[10px] text-on-surface-variant font-normal truncate">{{ doc.uploaderRole }} • {{ doc.uploadDate }}</p>
                  </div>
                </div>
              </td>
              <td class="py-2.5 px-3 text-right whitespace-nowrap">
                <div class="flex items-center justify-end gap-1">
                  <button @click="downloadDoc(doc.name)" class="p-1 hover:bg-primary/10 rounded text-primary transition-colors" title="Tải về file">
                    <span class="material-symbols-outlined text-[16px]">download</span>
                  </button>
                  <button @click="handleDeleteDoc(doc.id, doc.name)" class="p-1 hover:bg-red-50 rounded text-red-600 transition-colors" title="Xóa tài liệu">
                    <span class="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL TẢI LÊN TÀI LIỆU MỚI -->
    <UploadDocumentModal
      :isOpen="showUploadModal"
      @close="showUploadModal = false"
      @uploaded="loadDocs"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCurrentEvent } from '../mock/events.js';
import { getDocuments, deleteDocument, getDocumentCategories, FORMAT_BADGES } from '../mock/documents.js';
import UploadDocumentModal from '../components/UploadDocumentModal.vue';

const currentEvent = ref({});
const documentsList = ref([]);
const categoriesList = ref([]);

const viewMode = ref('grid'); // Default View Mode: 'grid' (Dạng Lưới)
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedFormat = ref('');

const showUploadModal = ref(false);

function loadDocs() {
  currentEvent.value = getCurrentEvent();
  documentsList.value = getDocuments();
  categoriesList.value = getDocumentCategories();
}

const totalCategories = computed(() => {
  const cats = new Set(documentsList.value.map(d => d.typeCategory));
  return cats.size;
});

const legalCount = computed(() => {
  return documentsList.value.filter(d => d.typeCategory && (d.typeCategory.includes('Giấy phép') || d.typeCategory.includes('Hợp đồng'))).length;
});

const filteredDocuments = computed(() => {
  return documentsList.value.filter(d => {
    const matchQuery = !searchQuery.value || 
      (d.name && d.name.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (d.typeCategory && d.typeCategory.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (d.uploaderName && d.uploaderName.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (d.format && d.format.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchCat = !selectedCategory.value || d.typeCategory === selectedCategory.value;
    const matchFmt = !selectedFormat.value || d.format === selectedFormat.value;
    return matchQuery && matchCat && matchFmt;
  });
});

function getFormatBadgeStyle(format) {
  const map = FORMAT_BADGES;
  return map[format] ? map[format].color : 'bg-gray-100 text-gray-700 border-gray-300';
}

function getFileIcon(format) {
  switch (format) {
    case 'PDF': return 'picture_as_pdf';
    case 'DOCX': return 'description';
    case 'XLSX': return 'table_chart';
    case 'PNG': return 'image';
    case 'ZIP': return 'folder_zip';
    case 'CAD': return 'architecture';
    default: return 'insert_drive_file';
  }
}

function downloadDoc(name) {
  alert(`Đang tải về file: [${name}]`);
}

function handleDeleteDoc(id, name) {
  if (confirm(`Bạn có chắc chắn muốn xóa tài liệu [${name}]?`)) {
    deleteDocument(id);
    alert(`Đã xóa tài liệu [${name}] thành công!`);
    loadDocs();
  }
}

onMounted(() => {
  loadDocs();
});
</script>
