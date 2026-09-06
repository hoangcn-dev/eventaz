<template>
  <Transition name="slide-left">
    <!-- Slide-over panel chỉ nằm trong vùng content chính (bắt đầu dưới Topbar top-16, bên phải Sidebar) -->
    <div 
      v-if="isOpen" 
      :class="[
        'fixed top-16 bottom-0 right-0 z-50 bg-white border-l border-outline-variant shadow-2xl flex flex-col transition-all duration-300',
        isSidebarCollapsed ? 'left-0' : 'left-0 lg:left-[280px]'
      ]"
    >
      
      <!-- 1. TOP HEADER (3 Phần: Title - Stepper - Close) -->
      <div class="px-6 py-2.5 border-b border-outline-variant bg-surface-container-lowest flex items-center justify-between gap-4 shrink-0">
        <!-- Part 1: Title -->
        <div>
          <h2 class="font-bold text-base text-on-surface">Tạo mới sự kiện</h2>
        </div>

        <!-- Part 2: Step Indicator (Text highlight tối giản) -->
        <div class="hidden md:flex items-center gap-4 text-xs select-none">
          <!-- Step 1 -->
          <div 
            @click="goToStep(1)"
            :class="[
              'flex items-center gap-1.5 cursor-pointer transition-colors py-1',
              currentStep === 1 ? 'font-bold text-primary' : 'font-medium text-on-surface-variant hover:text-on-surface'
            ]"
          >
            <span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] border" :class="currentStep === 1 ? 'bg-primary text-white border-primary' : 'border-outline-variant text-on-surface-variant'">1</span>
            <span>Thông tin cơ bản</span>
          </div>

          <span class="text-outline-variant/60 font-light">&rarr;</span>

          <!-- Step 2 -->
          <div 
            @click="goToStep(2)"
            :class="[
              'flex items-center gap-1.5 cursor-pointer transition-colors py-1',
              currentStep === 2 ? 'font-bold text-primary' : 'font-medium text-on-surface-variant hover:text-on-surface'
            ]"
          >
            <span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] border" :class="currentStep === 2 ? 'bg-primary text-white border-primary' : 'border-outline-variant text-on-surface-variant'">2</span>
            <span>Chọn template</span>
          </div>

          <span class="text-outline-variant/60 font-light">&rarr;</span>

          <!-- Step 3 -->
          <div 
            @click="goToStep(3)"
            :class="[
              'flex items-center gap-1.5 cursor-pointer transition-colors py-1',
              currentStep === 3 ? 'font-bold text-primary' : 'font-medium text-on-surface-variant hover:text-on-surface'
            ]"
          >
            <span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] border" :class="currentStep === 3 ? 'bg-primary text-white border-primary' : 'border-outline-variant text-on-surface-variant'">3</span>
            <span>Chọn module quản lý</span>
          </div>
        </div>

        <!-- Part 3: Close Button -->
        <button 
          @click="close" 
          type="button" 
          class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant cursor-pointer"
          title="Đóng quy trình"
        >
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <!-- Stepper Mobile Responsive Bar -->
      <div class="md:hidden px-6 py-2 bg-surface-container-low border-b border-outline-variant/60 flex justify-between items-center text-xs font-bold text-primary">
        <span>Bước {{ currentStep }}/3: {{ stepTitles[currentStep] }}</span>
        <span class="font-mono text-on-surface-variant">{{ Math.round((currentStep/3)*100) }}%</span>
      </div>

      <!-- 2. MIDDLE CONTENT (Hiển thị theo từng bước 1, 2, 3 với hiệu ứng chuyển bước) -->
      <div class="flex-1 overflow-y-auto p-6 md:p-8">
        <Transition name="step-fade" mode="out-in">
          
          <!-- BƯỚC 1: NHẬP CÁC THÔNG TIN CƠ BẢN -->
          <div v-if="currentStep === 1" key="step1" class="max-w-3xl mx-auto space-y-6">

          <!-- 1. Tên sự kiện -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold uppercase tracking-wider text-on-surface">Nhập tên sự kiện <span class="text-red-500">*</span></label>
            <input 
              type="text" 
              v-model="form.name" 
              required 
              placeholder="VD: Triển lãm Công nghệ Việt Nam 2026 - TechExpo" 
              class="w-full px-4 py-3 border border-outline-variant rounded-xl text-sm font-bold text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>

          <!-- 2. Kiểu sự kiện (Online, Offline, Kết hợp) -->
          <div class="space-y-2">
            <label class="block text-xs font-bold text-on-surface uppercase tracking-wider">Kiểu sự kiện <span class="text-red-500">*</span></label>
            <div class="grid grid-cols-3 gap-3 max-w-md">
              <button 
                type="button"
                @click="form.eventType = 'Online'"
                :class="['px-4 py-2.5 border rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2', form.eventType === 'Online' ? 'border-primary bg-primary/10 text-primary shadow-xs' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container']"
              >
                <span class="material-symbols-outlined text-[18px]">videocam</span>
                <span>Online</span>
              </button>
              <button 
                type="button"
                @click="form.eventType = 'Offline'"
                :class="['px-4 py-2.5 border rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2', form.eventType === 'Offline' ? 'border-primary bg-primary/10 text-primary shadow-xs' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container']"
              >
                <span class="material-symbols-outlined text-[18px]">location_on</span>
                <span>Offline</span>
              </button>
              <button 
                type="button"
                @click="form.eventType = 'Hybrid'"
                :class="['px-4 py-2.5 border rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2', form.eventType === 'Hybrid' ? 'border-primary bg-primary/10 text-primary shadow-xs' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container']"
              >
                <span class="material-symbols-outlined text-[18px]">devices</span>
                <span>Kết hợp</span>
              </button>
            </div>
          </div>

          <!-- 3. Thời gian bắt đầu - kết thúc -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-on-surface">Thời gian Bắt đầu <span class="text-red-500">*</span></label>
              <input type="date" v-model="form.startDate" required class="w-full px-4 py-2.5 border border-outline-variant rounded-xl text-sm font-medium focus:border-primary focus:outline-none" />
            </div>
            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-on-surface">Thời gian Kết thúc <span class="text-red-500">*</span></label>
              <input type="date" v-model="form.endDate" required class="w-full px-4 py-2.5 border border-outline-variant rounded-xl text-sm font-medium focus:border-primary focus:outline-none" />
            </div>
          </div>

          <!-- 4. Quy mô sự kiện dự kiến (Grid 4 Card tương tác từ InfoView) -->
          <div class="space-y-2">
            <label class="block text-xs font-bold text-on-surface uppercase tracking-wider">Quy mô sự kiện dự kiến <span class="text-red-500">*</span></label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div 
                v-for="s in scaleOptions" 
                :key="s.value"
                :class="[
                  'border rounded-xl p-3 cursor-pointer transition-all flex flex-col justify-between space-y-1.5 select-none',
                  form.scale === s.value ? 'border-primary bg-primary/5 shadow-xs' : 'border-outline-variant/60 hover:border-primary bg-white'
                ]"
                @click="form.scale = s.value"
              >
                <div class="flex justify-between items-center">
                  <span class="font-bold text-xs text-on-surface">{{ s.label }}</span>
                  <span class="material-symbols-outlined text-primary text-[18px]">{{ form.scale === s.value ? 'radio_button_checked' : 'radio_button_unchecked' }}</span>
                </div>
                <p class="text-[11px] text-on-surface-variant font-medium">{{ s.desc }}</p>
              </div>
            </div>
          </div>

          <!-- 5. Phạm vi sự kiện (Public / Nội bộ từ InfoView) -->
          <div class="space-y-2">
            <label class="block text-xs font-bold text-on-surface uppercase tracking-wider">Phạm vi sự kiện <span class="text-red-500">*</span></label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <label 
                :class="[
                  'p-3.5 border rounded-xl cursor-pointer transition-all flex items-center gap-3 select-none',
                  form.scope === 'Public' ? 'border-primary bg-primary/5 shadow-xs font-bold' : 'border-outline-variant/60 hover:bg-surface-container bg-white'
                ]"
              >
                <input type="radio" v-model="form.scope" value="Public" class="text-primary focus:ring-primary h-4 w-4" />
                <div>
                  <p class="text-xs text-on-surface">Public (Công khai)</p>
                  <p class="text-[11px] text-on-surface-variant font-normal">Mọi thành viên & đối tác đều có thể xem</p>
                </div>
              </label>

              <label 
                :class="[
                  'p-3.5 border rounded-xl cursor-pointer transition-all flex items-center gap-3 select-none',
                  form.scope === 'Internal' ? 'border-primary bg-primary/5 shadow-xs font-bold' : 'border-outline-variant/60 hover:bg-surface-container bg-white'
                ]"
              >
                <input type="radio" v-model="form.scope" value="Internal" class="text-primary focus:ring-primary h-4 w-4" />
                <div>
                  <p class="text-xs text-on-surface">Nội bộ tổ chức</p>
                  <p class="text-[11px] text-on-surface-variant font-normal">Chỉ dành cho nhân sự thuộc Ban Tổ Chức</p>
                </div>
              </label>
            </div>
          </div>

        </div>

        <!-- BƯỚC 2: CHỌN TEMPLATE -->
        <div v-else-if="currentStep === 2" key="step2" class="max-w-4xl mx-auto space-y-6">

          <!-- Label tiêu đề trên cùng của Bước 2 -->
          <div>
            <label class="block text-xs font-bold text-on-surface uppercase tracking-wider">Chọn template cho sự kiện</label>
          </div>

          <!-- HÀNG 1: HISTORY (SỰ KIỆN TRƯỚC ĐÓ) -->
          <!-- Hiển thị danh sách sự kiện từ lịch sử dạng card nằm ngang có nút cuộn mượt -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-medium text-on-surface-variant flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px] text-on-surface-variant">history</span>
                <span>Sự kiện gần đây</span>
              </h3>
            </div>

            <div class="relative group">
              <!-- Nút cuộn trái mờ -->
              <button 
                v-if="canScrollHistoryLeft" 
                @click="scrollContainer('history', 'left')" 
                type="button"
                class="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md border border-outline-variant text-on-surface flex items-center justify-center hover:bg-white transition-all backdrop-blur opacity-85 hover:opacity-100 cursor-pointer"
                title="Cuộn về trước"
              >
                <span class="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>

              <!-- Container cuộn ngang -->
              <div 
                ref="historyScrollRef"
                @scroll="updateScrollState('history')"
                class="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-1 snap-x snap-mandatory"
              >
                <div 
                  v-for="evt in historyEvents" 
                  :key="evt.id"
                  @click="selectHistoryEvent(evt)"
                  :class="[
                    'w-72 flex-shrink-0 p-4 rounded-xl border cursor-pointer transition-all space-y-2 relative select-none flex flex-col justify-between snap-start',
                    selectedTemplateType === 'history' && selectedTemplateId === evt.id ? 'border-primary bg-primary/5 ring-2 ring-primary/30 shadow-md' : 'border-outline-variant/60 hover:border-primary bg-white hover:shadow-xs'
                  ]"
                >
                  <div class="space-y-1">
                    <div class="flex justify-between items-start gap-2">
                      <span class="font-bold text-sm text-on-surface line-clamp-1">{{ evt.name }}</span>
                      <span class="material-symbols-outlined text-primary text-[20px] shrink-0" v-if="selectedTemplateType === 'history' && selectedTemplateId === evt.id">check_circle</span>
                    </div>
                    <p class="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">{{ evt.description || 'Không có mô tả chi tiết.' }}</p>
                  </div>
                  <!-- Footer card history: Hiển thị số module + số task -->
                  <div class="flex items-center justify-between text-[11px] text-on-surface-variant pt-2 border-t border-outline-variant/40 mt-2 font-medium">
                    <span>{{ getEventModuleCount(evt) }} module • {{ getEventTaskCount(evt) }} task</span>
                    <span class="font-mono text-[10px] text-on-surface-variant/70">{{ evt.id }}</span>
                  </div>
                </div>
              </div>

              <!-- Nút cuộn phải mờ -->
              <button 
                v-if="canScrollHistoryRight" 
                @click="scrollContainer('history', 'right')" 
                type="button"
                class="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md border border-outline-variant text-on-surface flex items-center justify-center hover:bg-white transition-all backdrop-blur opacity-85 hover:opacity-100 cursor-pointer"
                title="Cuộn xem tiếp"
              >
                <span class="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>

          <!-- HÀNG 2: THƯ VIỆN TEMPLATE -->
          <!-- Hiển thị danh sách các template chuẩn dạng card nằm ngang có nút cuộn mượt -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-medium text-on-surface-variant flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px] text-on-surface-variant">local_library</span>
                <span>Mẫu sự kiện có sẵn</span>
              </h3>
            </div>

            <div class="relative group">
              <!-- Nút cuộn trái mờ -->
              <button 
                v-if="canScrollLibraryLeft" 
                @click="scrollContainer('library', 'left')" 
                type="button"
                class="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md border border-outline-variant text-on-surface flex items-center justify-center hover:bg-white transition-all backdrop-blur opacity-85 hover:opacity-100 cursor-pointer"
                title="Cuộn về trước"
              >
                <span class="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>

              <!-- Container cuộn ngang -->
              <div 
                ref="templateScrollRef"
                @scroll="updateScrollState('library')"
                class="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-1 snap-x snap-mandatory"
              >
                <div 
                  v-for="tpl in libraryTemplates" 
                  :key="tpl.id"
                  @click="selectLibraryTemplate(tpl)"
                  :class="[
                    'w-72 flex-shrink-0 p-4 rounded-xl border cursor-pointer transition-all space-y-2 relative select-none flex flex-col justify-between snap-start',
                    selectedTemplateType === 'library' && selectedTemplateId === tpl.id ? 'border-primary bg-primary/5 ring-2 ring-primary/30 shadow-md' : 'border-outline-variant/60 hover:border-primary bg-white hover:shadow-xs'
                  ]"
                >
                  <div class="space-y-1">
                    <div class="flex justify-between items-start gap-2">
                      <span class="font-bold text-sm text-on-surface line-clamp-1">{{ tpl.name }}</span>
                      <span class="material-symbols-outlined text-primary text-[20px] shrink-0" v-if="selectedTemplateType === 'library' && selectedTemplateId === tpl.id">check_circle</span>
                    </div>
                    <p class="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">{{ tpl.description }}</p>
                  </div>
                  <!-- Footer card template: Hiển thị số module + số task + số lượt dùng -->
                  <div class="flex justify-between items-center text-[11px] text-on-surface-variant pt-2 border-t border-outline-variant/40 mt-2 font-medium">
                    <span>{{ getTemplateModuleCount(tpl) }} module • {{ getTemplateTaskCount(tpl) }} task</span>
                    <span class="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px] font-bold">{{ tpl.usageCount || 10 }} lượt dùng</span>
                  </div>
                </div>
              </div>

              <!-- Nút cuộn phải mờ -->
              <button 
                v-if="canScrollLibraryRight" 
                @click="scrollContainer('library', 'right')" 
                type="button"
                class="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md border border-outline-variant text-on-surface flex items-center justify-center hover:bg-white transition-all backdrop-blur opacity-85 hover:opacity-100 cursor-pointer"
                title="Cuộn xem tiếp"
              >
                <span class="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>

          <!-- HÀNG 3: CUSTOM (TỰ THIẾT LẬP TỪ ĐẦU) -->
          <!-- Card duy nhất ở hàng cuối cho tùy chọn Custom -->
          <div class="space-y-2">
            <h3 class="text-xs font-medium text-on-surface-variant flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-on-surface-variant">tune</span>
              <span>Khác</span>
            </h3>
            <div 
              @click="selectCustomTemplate"
              :class="[
                'p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 select-none',
                selectedTemplateType === 'custom' ? 'border-primary bg-primary/5 ring-2 ring-primary/30 shadow-md' : 'border-outline-variant/60 hover:border-primary bg-white hover:shadow-xs'
              ]"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <span class="material-symbols-outlined text-[22px]">tune</span>
                </div>
                <div>
                  <h4 class="font-bold text-sm text-on-surface">Custom - Tự thiết lập sự kiện mới từ đầu</h4>
                  <p class="text-xs text-on-surface-variant">Không sử dụng mẫu có sẵn. Bạn sẽ tự chọn các module quản lý và quy trình ở bước tiếp theo.</p>
                </div>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <span v-if="selectedTemplateType === 'custom'" class="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg flex items-center gap-1 border border-primary/20">
                  <span class="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Đã chọn</span>
                </span>
                <span v-else class="text-xs text-on-surface-variant font-medium px-3 py-1.5 rounded-lg bg-surface-container">
                  Bấm để chọn
                </span>
              </div>
            </div>
          </div>

        </div>

        <!-- BƯỚC 3: CHỌN MODULE QUẢN LÝ -->
        <div v-else-if="currentStep === 3" key="step3" class="max-w-4xl mx-auto space-y-4">
          <!-- Label tiêu đề trên cùng của Bước 3 -->
          <div>
            <label class="block text-xs font-bold text-on-surface uppercase tracking-wider">Chọn module quản lý</label>
          </div>

          <!-- Danh sách tất cả các Module dạng List View -->
          <div class="divide-y divide-outline-variant/60 border border-outline-variant/60 rounded-xl overflow-hidden bg-white shadow-xs">
            <div 
              v-for="mod in availableModules" 
              :key="mod.key"
              @click="toggleModule(mod.key)"
              :class="[
                'p-3.5 flex items-center justify-between gap-4 transition-colors cursor-pointer select-none',
                selectedModules.includes(mod.key) ? 'bg-primary/5' : 'hover:bg-surface-container-lowest opacity-75 hover:opacity-100'
              ]"
            >
              <!-- Thông tin module bên trái -->
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <span class="material-symbols-outlined text-[18px]">{{ mod.icon }}</span>
                </div>
                <div class="min-w-0 space-y-0.5">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-bold text-xs text-on-surface">{{ mod.name }}</span>
                    <span v-if="mod.required" class="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.2 rounded">Bắt buộc</span>
                    <span v-else-if="mod.fromTemplate && selectedTemplateType !== 'custom'" class="text-[10px] text-primary font-bold bg-primary/10 px-1.5 py-0.2 rounded">Theo Template</span>
                  </div>
                  <p class="text-[11px] text-on-surface-variant line-clamp-1 font-normal">{{ mod.desc }}</p>
                </div>
              </div>

              <!-- Checkbox ở góc phải ngoài cùng của mỗi module -->
              <div class="flex items-center gap-2 flex-shrink-0" @click.stop>
                <input 
                  type="checkbox" 
                  :checked="selectedModules.includes(mod.key)"
                  :disabled="mod.required || (selectedTemplateType !== 'custom' && mod.fromTemplate)"
                  @change="toggleModule(mod.key)"
                  class="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary disabled:opacity-50 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

      <!-- 3. BOTTOM ACTIONS BAR (Hủy - Bước trước - Tiếp theo - Xác nhận) -->
      <div class="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between gap-3 shrink-0">
        <!-- Nút Hủy bên trái -->
        <button 
          type="button" 
          @click="close" 
          class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold text-xs rounded-xl hover:bg-surface-container transition-colors cursor-pointer"
        >
          Hủy
        </button>

        <!-- Nhóm nút Bước trước / Tiếp theo / Xác nhận ở bên phải -->
        <div class="flex items-center gap-3">
          <!-- Nút Bước trước -->
          <button 
            type="button" 
            @click="prevStep" 
            :disabled="currentStep === 1"
            :class="[
              'px-4 py-2 border rounded-xl font-bold text-xs transition-all flex items-center gap-1',
              currentStep === 1 
                ? 'border-outline-variant/40 text-slate-300 bg-slate-50 cursor-not-allowed' 
                : 'border-outline-variant text-on-surface hover:bg-surface-container cursor-pointer'
            ]"
          >
            <span class="material-symbols-outlined text-[16px]">chevron_left</span>
            <span>Bước trước</span>
          </button>

          <!-- Nút Tiếp theo (cho Bước 1 và 2) -->
          <button 
            v-if="currentStep < 3"
            type="button" 
            @click="nextStep" 
            :disabled="!canProceedNext"
            :class="[
              'px-5 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1 shadow-sm',
              canProceedNext 
                ? 'bg-primary hover:bg-primary-hover text-white cursor-pointer' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            ]"
          >
            <span>Tiếp theo</span>
            <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>

          <!-- Nút Xác nhận (cho Bước 3) -->
          <button 
            v-if="currentStep === 3"
            type="button" 
            @click="handleConfirmCreate" 
            class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
          >
            <span class="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Xác nhận & Tạo sự kiện</span>
          </button>
        </div>
      </div>

    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { createEvent, getEvents } from '../mock/events.js';
import { getTemplates } from '../mock/templates.js';

const props = defineProps({
  isOpen: Boolean,
  isSidebarCollapsed: Boolean
});

const emit = defineEmits(['close']);
const router = useRouter();

// Quản lý bước hiện tại (1: Thông tin cơ bản, 2: Chọn template, 3: Chọn module)
const currentStep = ref(1);

// Refs & state cuộn ngang cho Bước 2
const historyScrollRef = ref(null);
const templateScrollRef = ref(null);

const canScrollHistoryLeft = ref(false);
const canScrollHistoryRight = ref(true);
const canScrollLibraryLeft = ref(false);
const canScrollLibraryRight = ref(true);

// Xử lý cuộn ngang mượt theo nút bấm
function scrollContainer(target, direction) {
  const container = target === 'history' ? historyScrollRef.value : templateScrollRef.value;
  if (!container) return;
  const scrollAmount = 300;
  container.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  });
}

// Cập nhật trạng thái hiển thị nút cuộn trái/phải
function updateScrollState(target) {
  const container = target === 'history' ? historyScrollRef.value : templateScrollRef.value;
  if (!container) return;
  const canLeft = container.scrollLeft > 10;
  const canRight = container.scrollLeft + container.clientWidth < container.scrollWidth - 10;

  if (target === 'history') {
    canScrollHistoryLeft.value = canLeft;
    canScrollHistoryRight.value = canRight;
  } else {
    canScrollLibraryLeft.value = canLeft;
    canScrollLibraryRight.value = canRight;
  }
}

// Helper tính số module và công việc (tasks) hiển thị ở footer các card
function getEventModuleCount(evt) {
  if (evt && evt.enabledModules && Array.isArray(evt.enabledModules)) return evt.enabledModules.length;
  return 5;
}

function getEventTaskCount(evt) {
  if (evt && evt.wbs && Array.isArray(evt.wbs)) {
    return evt.wbs.reduce((acc, cat) => acc + (cat.taskCount || 4), 0);
  }
  return 18;
}

function getTemplateModuleCount(tpl) {
  if (tpl && tpl.enabledModules && Array.isArray(tpl.enabledModules)) return tpl.enabledModules.length;
  return 5;
}

function getTemplateTaskCount(tpl) {
  if (tpl && tpl.wbsCategories && Array.isArray(tpl.wbsCategories)) {
    return tpl.wbsCategories.reduce((sum, item) => sum + (item.taskCount || 0), 0);
  }
  return 24;
}

const stepTitles = {
  1: 'Nhập thông tin cơ bản',
  2: 'Chọn Template',
  3: 'Chọn Module quản lý'
};

const scaleOptions = [
  { value: 'small', label: 'Nhỏ', desc: '< 50 người' },
  { value: 'medium', label: 'Trung Bình', desc: '50 - 100 người' },
  { value: 'large', label: 'Lớn', desc: '< 1000 người' },
  { value: 'mega', label: 'Rất lớn', desc: '>= 1000 người' }
];

// Form dữ liệu Bước 1
const form = reactive({
  name: '',
  category: 'Hội thảo / Triển lãm',
  eventType: 'Offline',
  scale: 'mega',
  scope: 'Public',
  startDate: '2026-12-01',
  endDate: '2026-12-02',
  budget: 500000000,
  description: ''
});

// State chọn Template ở Bước 2
const templateTab = ref('history'); // 'history' | 'library' | 'custom'
const selectedTemplateType = ref('custom'); // 'history' | 'library' | 'custom'
const selectedTemplateId = ref('');
const selectedTemplateName = ref('Tự thiết lập (Custom)');

const historyEvents = ref([]);
const libraryTemplates = ref([]);

// Danh sách các Module quản lý sẵn có ở Bước 3 (đồng bộ theo modules.json)
const availableModules = reactive([
  { key: 'personnel', name: 'Nhân sự', icon: 'badge', desc: 'Sơ đồ tổ chức Ban Tổ Chức, gán Trưởng BAN và phân công phụ trách.', required: true, fromTemplate: true },
  { key: 'wbs', name: 'Công việc', icon: 'task_alt', desc: 'Quản lý cây công việc WBS, tiến độ và giao việc cho nhân sự.', required: true, fromTemplate: true },
  { key: 'runOfShow', name: 'Chương trình sự kiện', icon: 'theater_comedy', desc: 'Quản lý timeline kịch bản sự kiện thời gian thực theo phút.', required: false, fromTemplate: true },
  { key: 'budget', name: 'Ngân sách và tài chính', icon: 'account_balance_wallet', desc: 'Quản lý thu chi, lập dự toán và quyết toán sự kiện.', required: false, fromTemplate: true },
  { key: 'media', name: 'Truyền thông và quảng bá', icon: 'campaign', desc: 'Lên kế hoạch bài viết, báo chí và các kênh quảng bá.', required: false, fromTemplate: false },
  { key: 'tickets', name: 'Vé, chỗ ngồi và địa điểm', icon: 'confirmation_number', desc: 'Cấu hình sơ đồ ghế ngồi, loại vé và thông tin địa điểm.', required: false, fromTemplate: false },
  { key: 'guests', name: 'Khách mời', icon: 'star', desc: 'Quản lý danh sách khách mời, đón tiếp và điểm danh check-in.', required: false, fromTemplate: false },
  { key: 'documents', name: 'Tài liệu', icon: 'folder_open', desc: 'Lưu trữ file hợp đồng, thiết kế 2D/3D và hồ sơ pháp lý.', required: false, fromTemplate: false },
  { key: 'equipment', name: 'Thiết bị và vật tư', icon: 'inventory_2', desc: 'Kiểm kê âm thanh, ánh sáng và vật tư thi công.', required: false, fromTemplate: false },
  { key: 'approvals', name: 'Phê duyệt', icon: 'fact_check', desc: 'Quy trình trình ký duyệt ngân sách và nghiệm thu công việc.', required: false, fromTemplate: true }
]);

const selectedModules = ref(['wbs', 'personnel', 'runOfShow', 'approvals', 'budget']);

// Kiểm tra điều kiện cho phép chuyển sang bước tiếp theo
const canProceedNext = computed(() => {
  if (currentStep.value === 1) {
    return form.name && form.name.trim().length > 0 && form.startDate && form.endDate;
  }
  if (currentStep.value === 2) {
    return true; // Bước 2 luôn chọn 1 trong 3 dạng
  }
  return true;
});

function goToStep(step) {
  if (step === 2 && !canProceedNext.value) {
    alert('Vui lòng điền đầy đủ Tên sự kiện và Thời gian ở Bước 1!');
    return;
  }
  currentStep.value = step;
}

function nextStep() {
  if (currentStep.value < 3 && canProceedNext.value) {
    currentStep.value++;
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

function selectHistoryEvent(evt) {
  selectedTemplateType.value = 'history';
  selectedTemplateId.value = evt.id;
  selectedTemplateName.value = evt.name;
  updateModulesFromSelection();
}

function selectLibraryTemplate(tpl) {
  selectedTemplateType.value = 'library';
  selectedTemplateId.value = tpl.id;
  selectedTemplateName.value = tpl.name;
  updateModulesFromSelection();
}

function selectCustomTemplate() {
  templateTab.value = 'custom';
  selectedTemplateType.value = 'custom';
  selectedTemplateId.value = '';
  selectedTemplateName.value = 'Tự thiết lập (Custom)';
  updateModulesFromSelection();
}

function updateModulesFromSelection() {
  if (selectedTemplateType.value === 'custom') {
    // Custom chọn tất cả module chuẩn
    selectedModules.value = ['wbs', 'personnel', 'runOfShow', 'approvals', 'budget', 'media', 'documents'];
  } else {
    // Mặc định chọn các module theo template mẫu
    selectedModules.value = ['wbs', 'personnel', 'runOfShow', 'approvals', 'budget'];
  }
}

function toggleModule(key) {
  const mod = availableModules.find(m => m.key === key);
  if (mod && mod.required) return; // Không cho phép bỏ tích module bắt buộc

  const idx = selectedModules.value.indexOf(key);
  if (idx > -1) {
    selectedModules.value.splice(idx, 1);
  } else {
    selectedModules.value.push(key);
  }
}

function close() {
  emit('close');
}

function handleConfirmCreate() {
  const eventPayload = {
    name: form.name,
    category: form.category,
    eventType: form.eventType,
    scale: form.scale,
    startDate: form.startDate,
    endDate: form.endDate,
    location: form.location,
    budget: form.budget,
    description: form.description || `Sự kiện ${form.name} được khởi tạo thành công với ${selectedModules.value.length} module quản lý.`,
    templateSource: selectedTemplateType.value,
    templateId: selectedTemplateId.value,
    enabledModules: [...selectedModules.value]
  };

  const newEvt = createEvent(eventPayload);
  alert(`Đã hoàn tất khởi tạo sự kiện: [${newEvt.name}]!\nĐã kích hoạt ${selectedModules.value.length} module quản lý.`);
  close();
  router.push('/event/overview');
}

function loadData() {
  historyEvents.value = getEvents();
  libraryTemplates.value = getTemplates();
  nextTick(() => {
    updateScrollState('history');
    updateScrollState('library');
  });
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    currentStep.value = 1;
    loadData();
  }
});

watch(() => currentStep.value, (newStep) => {
  if (newStep === 2) {
    nextTick(() => {
      updateScrollState('history');
      updateScrollState('library');
    });
  }
});

onMounted(() => {
  loadData();
});
</script>

<style scoped>
/* Hiệu ứng trượt mượt mà từ bên phải sang trái (slide-left) */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
}

.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
}

/* Hiệu ứng chuyển bước mượt mà (Fade & Slide nhẹ) */
.step-fade-enter-active,
.step-fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.step-fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.step-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>

