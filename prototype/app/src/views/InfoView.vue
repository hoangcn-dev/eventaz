<template>
  <div class="p-margin-desktop max-w-[1600px] mx-auto px-6 pt-3 pb-24 space-y-6">
    <!-- Event Info Header & Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Thông tin sự kiện</span>
      </div>
      <div class="flex items-center gap-2">
        <!-- Version Dropdown Button -->
        <div class="relative inline-block text-xs font-medium border border-outline-variant rounded-lg bg-white px-3 py-1.5 hover:bg-surface-container cursor-pointer select-none">
          <span>Version: Mới nhất</span>
          <span class="ml-1 text-[10px]">▼</span>
        </div>
        <!-- Action Buttons -->
        <button class="px-3 py-1.5 text-xs font-medium border border-outline-variant rounded-lg bg-white hover:bg-surface-container transition-colors">
          Công việc
        </button>
      </div>
    </div>

    <!-- Lifecycle Status -->
    <div class="bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant pb-4">
        <div class="flex items-center justify-between w-full gap-3 flex-wrap">
          <h3 class="font-bold text-lg text-on-surface">Tiến trình sự kiện</h3>
          <div class="flex items-center gap-2 ml-2">
            <button @click="addStage" class="px-3 py-1.5 text-xs font-medium border border-outline-variant rounded-lg bg-white hover:bg-surface-container transition-colors">
              Thêm giai đoạn
            </button>
            <button 
              @click="toggleDeleteStageMode" 
              :disabled="isDeleteStageMode && selectedStageCodes.length === 0"
              :class="[
                'px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors flex items-center gap-1.5',
                isDeleteStageMode 
                  ? (selectedStageCodes.length > 0 
                      ? 'bg-red-600 border-red-600 text-white hover:bg-red-700 cursor-pointer shadow-xs font-bold' 
                      : 'bg-red-50 border-red-200 text-red-300 cursor-not-allowed')
                  : 'border-outline-variant/60 bg-white hover:bg-red-50 text-red-600 cursor-pointer'
              ]"
            >
              <span class="material-symbols-outlined text-[16px]" v-if="isDeleteStageMode">delete</span>
              <span>{{ isDeleteStageMode ? `Xóa ${selectedStageCodes.length} giai đoạn` : 'Xóa giai đoạn' }}</span>
            </button>

            <!-- Nút Hủy bên cạnh nút Xóa khi ở chế độ xóa -->
            <button 
              v-if="isDeleteStageMode" 
              @click="cancelDeleteStageMode" 
              class="px-3 py-1.5 text-xs font-medium border border-outline-variant rounded-lg bg-white hover:bg-surface-container transition-colors text-on-surface-variant cursor-pointer"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>

      <!-- Stepper Visual with Horizontal Scroll & Translucent Nav Buttons -->
      <div class="relative group">
        <!-- Nút cuộn trái mờ -->
        <button 
          v-if="canScrollLeft" 
          @click="scrollStages('left')" 
          class="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md border border-outline-variant text-on-surface flex items-center justify-center hover:bg-white transition-all backdrop-blur opacity-85 hover:opacity-100"
          title="Cuộn về trước"
        >
          <span class="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>

        <!-- Container cuộn ngang 4 card/view với Scroll Snap -->
        <div 
          ref="stageScrollContainer" 
          @scroll="updateScrollButtons" 
          class="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar py-1 snap-x snap-mandatory"
        >
          <div 
            v-for="item in sortedLifecycleStates" 
            :key="item.code"
            :style="{ minWidth: 'calc((100% - 36px) / 4)', width: 'calc((100% - 36px) / 4)', flexShrink: 0 }"
            :class="[
              'p-3.5 rounded-xl border flex flex-col justify-between space-y-2 cursor-pointer transition-all snap-start relative select-none',
              isDeleteStageMode && selectedStageCodes.includes(item.code) ? 'ring-2 ring-red-500 border-red-500 bg-red-50/20' : '',
              currentEvent.status === item.code ? 'border-primary bg-primary/5 shadow-md' : 'border-outline-variant/60 bg-surface-container-low opacity-75 hover:opacity-100',
              isDeleteStageMode && isOngoingOrPastStage(item) ? 'opacity-50 cursor-not-allowed' : ''
            ]"
            @click="isDeleteStageMode ? toggleSelectStage(item.code, item) : openStageDetail(item.code, item)"
          >
            <div class="flex justify-between items-center">
              <!-- Checkbox chọn khi ở chế độ xóa -->
              <div v-if="isDeleteStageMode" class="flex items-center gap-1.5" @click.stop>
                <input 
                  type="checkbox" 
                  :checked="selectedStageCodes.includes(item.code)"
                  :disabled="isOngoingOrPastStage(item)"
                  @change="toggleSelectStage(item.code, item)"
                  class="w-4 h-4 text-red-600 rounded border-outline-variant focus:ring-red-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  title="Tích chọn để xóa giai đoạn này"
                />
                <span class="text-xs font-bold text-on-surface-variant">Giai đoạn {{ item.stepOrder }}</span>
              </div>
              <span v-else class="text-xs font-bold text-on-surface-variant">Giai đoạn {{ item.stepOrder }}</span>

              <div v-if="item.code===currentEvent.status" class="flex items-center gap-1.5 shrink-0 ml-auto">
                <span class="text-[11px] font-mono text-emerald-700 font-bold">{{ getStageTimeRemaining(item) }}</span>
                <span class="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200 shrink-0" title="Đang diễn ra"></span>
              </div>
              <small v-else class="">{{ isOngoingOrPastStage(item) ? 'Đã kết thúc' : 'Chưa diễn ra' }}</small>
            </div>
            <p class="font-bold text-sm text-on-surface leading-tight">{{ item.nameVi }}</p>

            <span class="text-[11px] font-mono text-on-surface-variant">Tỉ lệ hoàn thành: {{ item.completionRate || '95%' }}</span>
            <span class="text-[11px] font-mono text-on-surface-variant">Tồn đọng: {{ item.backlogCount || '1' }}</span>
            <div v-if="item.assignee" class="flex items-center justify-start gap-1 mt-1 text-[11px] text-primary font-medium overflow-hidden">
              <span @click.stop="addAssignee(item.code)" class="hover:underline cursor-pointer truncate max-w-[85%]" :title="`Người phụ trách: ${item.assignee} (Bấm để thay đổi)`">
                👤 {{ item.assignee }}
              </span>
              <button @click.stop="removeStageAssignee(item.code)" class="text-slate-400 hover:text-red-500 p-0.5 rounded-full transition-colors flex items-center justify-center cursor-pointer shrink-0" title="Bỏ người phụ trách">
                <span class="material-symbols-outlined text-[13px]">close</span>
              </button>
            </div>
            <button v-else @click.stop="addAssignee(item.code)" class="text-[11px] text-primary hover:underline font-medium text-left flex items-center gap-1 cursor-pointer transition-colors mt-1">
              + Thêm người phụ trách
            </button>
          </div>
        </div>

        <!-- Nút cuộn phải mờ -->
        <button 
          v-if="canScrollRight" 
          @click="scrollStages('right')" 
          class="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md border border-outline-variant text-on-surface flex items-center justify-center hover:bg-white transition-all backdrop-blur opacity-85 hover:opacity-100"
          title="Cuộn xem tiếp"
        >
          <span class="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>

      <!-- Nút chuyển giai đoạn kế tiếp nằm ở Bottom của thẻ Tiến trình sự kiện -->
      <div class="pt-3 border-t border-outline-variant/60 flex items-center justify-between flex-wrap gap-3">
        <div class="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
          <span class="material-symbols-outlined text-[18px] text-primary">schedule</span>
          <span>Giai đoạn hiện tại: <strong class="text-on-surface font-bold">{{ currentStageName }}</strong></span>
        </div>

        <button 
          v-if="currentEvent.isCompleted" 
          disabled 
          class="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-300 flex items-center gap-2 opacity-90 cursor-default"
        >
          <span class="material-symbols-outlined text-[16px]">check_circle</span>
          <span>Sự kiện đã kết thúc hoàn tất</span>
        </button>
        <button 
          v-else-if="nextStageItem" 
          @click="handleNextStageClick" 
          class="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Chuyển giai đoạn kế tiếp: {{ nextStageItem.nameVi }}</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
        <button 
          v-else 
          @click="handleNextStageClick" 
          class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Kết thúc sự kiện</span>
        </button>
      </div>

    </div>

    <!-- Main Event Setup Form -->
    <div class="bg-white p-6 rounded-xl border border-outline-variant/60 shadow-sm space-y-6" @input="markFormModified" @change="markFormModified">
      <!-- 1. Tên sự kiện (Chuỗi dài tối đa 200 ký tự) -->
      <div>
        <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Tên sự kiện<span class="text-red-500">*</span></label>
        <textarea v-model="currentEvent.name" rows="2" maxlength="200" placeholder="Nhập tên sự kiện (tối đa 200 ký tự)..." class="w-full px-4 py-3 border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none font-bold text-on-surface"></textarea>
        <div class="flex justify-between items-center mt-1 text-xs">
          <span v-if="(currentEvent.name || '').length >= 200" class="text-red-500 font-bold">Đã đạt giới hạn tối đa 200 ký tự!</span>
          <span class="ml-auto font-mono text-on-surface-variant">{{ (currentEvent.name || '').length }}/200</span>
        </div>
      </div>

      <!-- 2. Kiểu sự kiện (Online, Offline, Kết hợp) -->
      <div>
        <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Kiểu sự kiện <span class="text-red-500">*</span></label>
        <div class="grid grid-cols-3 gap-3 max-w-md">
          <button 
            type="button"
            @click="currentEvent.eventType = 'Online'; handleEventTypeChange(); markFormModified()"
            :class="['px-4 py-2 border rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2', currentEvent.eventType === 'Online' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container']"
          >
            <span class="material-symbols-outlined text-[18px]">videocam</span>
            <span>Online</span>
          </button>
          <button 
            type="button"
            @click="currentEvent.eventType = 'Offline'; handleEventTypeChange(); markFormModified()"
            :class="['px-4 py-2 border rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2', currentEvent.eventType === 'Offline' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container']"
          >
            <span class="material-symbols-outlined text-[18px]">location_on</span>
            <span>Offline</span>
          </button>
          <button 
            type="button"
            @click="currentEvent.eventType = 'Hybrid'; handleEventTypeChange(); markFormModified()"
            :class="['px-4 py-2 border rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2', currentEvent.eventType === 'Hybrid' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container']"
          >
            <span class="material-symbols-outlined text-[18px]">devices</span>
            <span>Kết hợp</span>
          </button>
        </div>
      </div>

      <!-- 3. Thời gian bắt đầu - kết thúc (Định dạng dd/MM/yyyy HH:mm) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Thời gian Bắt đầu (dd/MM/yyyy HH:mm)</label>
          <div class="relative flex items-center">
            <input 
              type="text" 
              v-model="startDateDisplay" 
              @input="handleStartDateInput" 
              placeholder="dd/MM/yyyy HH:mm (Ví dụ: 15/10/2026 09:00)" 
              class="w-full pl-4 pr-10 py-2.5 border border-outline-variant rounded-xl text-sm focus:border-primary focus:outline-none font-medium"
            >
            <input 
              type="datetime-local" 
              ref="startDatePickerRef" 
              :value="formatToDatetimeLocal(startDateDisplay)" 
              @input="handleStartDatePickerChange" 
              class="opacity-0 absolute right-2 w-7 h-7 cursor-pointer z-10"
            >
            <button type="button" @click="triggerStartDatePicker" class="absolute right-2.5 p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer" title="Chọn ngày & giờ từ lịch">
              <span class="material-symbols-outlined text-[20px]">calendar_today</span>
            </button>
          </div>
          <p class="text-[11px] text-on-surface-variant mt-1 italic">
            * Nếu bỏ trống, thời gian bắt đầu sẽ tự động gán khi hoàn thành giai đoạn Thiết lập.
          </p>
        </div>
        <div>
          <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Thời gian Kết thúc (dd/MM/yyyy HH:mm)</label>
          <div class="relative flex items-center">
            <input 
              type="text" 
              v-model="endDateDisplay" 
              @input="handleEndDateInput" 
              placeholder="dd/MM/yyyy HH:mm (Ví dụ: 17/10/2026 18:00)" 
              class="w-full pl-4 pr-10 py-2.5 border border-outline-variant rounded-xl text-sm focus:border-primary focus:outline-none font-medium"
            >
            <input 
              type="datetime-local" 
              ref="endDatePickerRef" 
              :value="formatToDatetimeLocal(endDateDisplay)" 
              @input="handleEndDatePickerChange" 
              class="opacity-0 absolute right-2 w-7 h-7 cursor-pointer z-10"
            >
            <button type="button" @click="triggerEndDatePicker" class="absolute right-2.5 p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer" title="Chọn ngày & giờ từ lịch">
              <span class="material-symbols-outlined text-[20px]">calendar_today</span>
            </button>
          </div>
          <p class="text-[11px] text-on-surface-variant mt-1 italic">
            * Có thể bỏ trống thời gian kết thúc.
          </p>
        </div>
      </div>

      <!-- 4. Địa điểm tổ chức sự kiện & Tích hợp Google Map/Preview -->
      <div class="space-y-3">
        <label class="block text-xs font-bold text-on-surface uppercase tracking-wider">Địa điểm tổ chức sự kiện & Bản đồ <span class="text-red-500">*</span></label>
        
        <div class="relative flex items-center">
          <input 
            type="text" 
            v-model="currentEvent.location" 
            :disabled="currentEvent.eventType === 'Online'" 
            placeholder="Nhập địa chỉ thực tế nơi tổ chức..." 
            class="w-full pl-4 pr-32 py-3 border border-outline-variant rounded-xl text-sm focus:border-primary focus:outline-none font-bold disabled:bg-surface-container-low disabled:text-on-surface-variant"
          >
          <button 
            v-if="currentEvent.eventType !== 'Online'"
            @click="openMapPicker" 
            type="button" 
            class="absolute right-2 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
          >
            <span class="material-symbols-outlined text-[16px]">map</span>
            <span>Google Map</span>
          </button>
        </div>

        <p v-if="currentEvent.eventType === 'Online'" class="text-xs text-primary font-bold">
          Sự kiện Online: Địa điểm tự động cố định là Online và không cho phép chỉnh sửa.
        </p>

        <!-- Hiển thị Tọa độ Kinh độ + Vĩ độ nếu là Offline/Kết hợp -->
        <!-- <div v-else class="grid grid-cols-2 gap-4 p-3 bg-surface-container-low/50 rounded-xl border border-outline-variant/40 text-xs">
          <div>
            <span class="font-medium text-on-surface-variant">Vĩ độ (Latitude):</span>
            <span class="font-mono font-bold text-on-surface ml-2">{{ currentEvent.latitude || '21.0074' }}</span>
          </div>
          <div>
            <span class="font-medium text-on-surface-variant">Kinh độ (Longitude):</span>
            <span class="font-mono font-bold text-on-surface ml-2">{{ currentEvent.longitude || '105.7828' }}</span>
          </div>
        </div> -->
      </div>

      <!-- 5. Quy mô sự kiện -->
      <div>
        <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-3">Quy mô sự kiện dự kiến <span class="text-red-500">*</span></label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            v-for="s in scaleOptions" 
            :key="s.value"
            :class="[
              'border rounded-xl p-3.5 cursor-pointer transition-all flex flex-col justify-between space-y-1.5 select-none',
              currentEvent.scale === s.value ? 'border-primary bg-primary/5 shadow-sm' : 'border-outline-variant/60 hover:border-primary'
            ]"
            @click="currentEvent.scale = s.value; markFormModified()"
          >
            <div class="flex justify-between items-center">
              <span class="font-bold text-xs text-on-surface">{{ s.label }}</span>
              <span class="material-symbols-outlined text-primary text-[18px]">{{ currentEvent.scale === s.value ? 'radio_button_checked' : 'radio_button_unchecked' }}</span>
            </div>
            <p class="text-[11px] text-on-surface-variant font-medium">{{ s.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 6. Host (Đơn vị / Người tổ chức phụ trách) & Event Director -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Host (Tên người/tổ chức phụ trách) <span class="text-red-500">*</span></label>
          <input type="text" v-model="currentEvent.host" placeholder="VD: Hiệp hội Công nghệ & EventAZ Org..." class="w-full px-4 py-2.5 border border-outline-variant rounded-xl text-sm focus:border-primary focus:outline-none font-bold">
        </div>

        <div>
          <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Trưởng BAN Tổ Chức (Event Director)</label>
          
          <!-- Nếu chưa gán: Hiện Action text có dấu + -->
          <div v-if="!currentEvent.director" class="pt-1">
            <button type="button" @click="openAssignDirectorModal" class="text-primary hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>Gán vai trò Trưởng BAN</span>
            </button>
          </div>

          <!-- Nếu đã gán: Hiện dạng văn bản phẳng không bọc card, kèm icon X bên phải -->
          <div v-else class="flex items-center justify-between gap-3 py-1 text-xs max-w-sm">
            <div class="flex items-center gap-2.5 truncate cursor-pointer" @click="openAssignDirectorModal" title="Nhấp để đổi Trưởng BAN">
              <div class="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 border border-primary/20">
                {{ (currentEvent.director || 'D').charAt(0) }}
              </div>
              <div class="truncate">
                <span class="font-bold text-on-surface hover:text-primary transition-colors">{{ currentEvent.director }}</span>
                <span class="text-[11px] text-on-surface-variant font-mono ml-2">({{ currentEvent.directorId || 'USR-001' }})</span>
              </div>
            </div>
            <button type="button" @click="removeDirector" class="w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-50 text-red-600 transition-colors shrink-0" title="Gỡ vai trò">
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 7. Mô tả sự kiện (HTML - Trình soạn HTML) -->
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label class="block text-xs font-bold text-on-surface uppercase tracking-wider">Mô tả sự kiện (Định dạng HTML)</label>
          <div class="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/60 text-xs font-medium">
            <button type="button" @click="switchHtmlEditorMode('rich')" :class="['px-2 py-0.5 rounded', htmlEditorMode === 'rich' ? 'bg-white shadow text-primary font-bold' : 'text-on-surface-variant']">Soạn thảo Rich Text</button>
            <button type="button" @click="switchHtmlEditorMode('code')" :class="['px-2 py-0.5 rounded', htmlEditorMode === 'code' ? 'bg-white shadow text-primary font-bold' : 'text-on-surface-variant']">Mã nguồn HTML</button>
          </div>
        </div>

        <!-- Rich Text Formatting Toolbar -->
        <div v-if="htmlEditorMode === 'rich'" class="border border-outline-variant rounded-xl overflow-hidden">
          <div class="flex items-center gap-1 p-2 bg-surface-container-low border-b border-outline-variant/60 flex-wrap text-xs">
            <button type="button" @click="applyHtmlFormat('bold')" class="p-1.5 hover:bg-white rounded font-bold" title="In đậm"><b>B</b></button>
            <button type="button" @click="applyHtmlFormat('italic')" class="p-1.5 hover:bg-white rounded italic" title="In nghiêng"><i>I</i></button>
            <button type="button" @click="applyHtmlFormat('underline')" class="p-1.5 hover:bg-white rounded underline" title="Gạch chân"><u>U</u></button>
            <span class="h-4 w-px bg-outline-variant mx-1"></span>
            <button type="button" @click="applyHtmlFormat('insertUnorderedList')" class="p-1.5 hover:bg-white rounded" title="Danh sách">
              <span class="material-symbols-outlined text-[16px]">format_list_bulleted</span>
            </button>
            <button type="button" @click="applyHtmlFormat('formatBlock', '<h3>')" class="p-1.5 hover:bg-white rounded font-bold" title="Tiêu đề H3">H3</button>
            <button type="button" @click="applyHtmlFormat('createLink', prompt('Nhập đường dẫn URL:'))" class="p-1.5 hover:bg-white rounded" title="Chèn liên kết">
              <span class="material-symbols-outlined text-[16px]">link</span>
            </button>
          </div>
          <div 
            ref="richHtmlEditorRef" 
            contenteditable="true" 
            @input="syncHtmlFromEditor" 
            class="p-4 min-h-[120px] max-h-[250px] overflow-y-auto text-sm focus:outline-none"
          ></div>
        </div>

        <!-- HTML Source Code Editor -->
        <div v-else>
          <textarea v-model="currentEvent.descriptionHtml" @input="markFormModified" rows="5" class="w-full p-3 font-mono text-xs border border-outline-variant rounded-xl focus:border-primary focus:outline-none bg-slate-900 text-slate-100"></textarea>
        </div>
      </div>

      <!-- 8. Ảnh/Banner sự kiện (Banner background & Ảnh review) -->
      <div class="space-y-4">
        <label class="block text-xs font-bold text-on-surface uppercase tracking-wider">Banner</label>
        
        <!-- Banner Upload từ máy & Preview -->
        <div class="space-y-2">
          <div class="flex justify-between items-center flex-wrap gap-2">
            <span class="text-xs font-medium text-on-surface-variant">Background nền trang chi tiết sự kiện</span>
            <input type="file" ref="bannerFileInputRef" accept="image/*" class="hidden" @change="handleBannerFileUpload">
            <button type="button" @click="triggerBannerFileUpload" class="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 font-bold text-xs rounded-xl transition-colors flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">upload_file</span>
              <span>Tải lên</span>
            </button>
          </div>
          
          <div v-if="currentEvent.bannerUrl" class="relative h-40 rounded-xl overflow-hidden border border-outline-variant shadow-inner group cursor-pointer" @click="openImageLightbox(currentEvent.bannerUrl)">
            <img :src="currentEvent.bannerUrl" class="w-full h-full object-cover" alt="Banner Preview">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1 backdrop-blur-xs">
              <span class="material-symbols-outlined text-[18px]">zoom_in</span>
              <span>Xem ảnh kích thước lớn</span>
            </div>
          </div>
        </div>

        <!-- Review Images Upload & Natural Uncropped Ratio Display -->
        <div class="space-y-2">
          <div class="flex justify-between items-center flex-wrap gap-2">
            <span class="text-xs font-medium text-on-surface-variant">Danh sách ảnh giới thiệu</span>
            <input type="file" ref="reviewFileInputRef" accept="image/*" multiple class="hidden" @change="handleReviewFilesUpload">
            <button type="button" @click="triggerReviewFilesUpload" class="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 font-bold text-xs rounded-xl transition-colors flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">add_photo_alternate</span>
              <span>Tải lên</span>
            </button>
          </div>

          <div v-if="currentEvent.reviewImages && currentEvent.reviewImages.length > 0" class="flex flex-wrap gap-4 pt-2">
            <div v-for="(img, idx) in currentEvent.reviewImages" :key="idx" class="relative group border border-outline-variant/60 rounded-xl bg-surface-container-low p-1.5 shadow-xs">
              <!-- Uncropped Natural Aspect Ratio Image -->
              <img 
                :src="img" 
                @click="openImageLightbox(img)"
                class="max-h-40 w-auto object-contain rounded-lg cursor-pointer hover:opacity-95 transition-opacity" 
                alt="Review Image Natural"
              >
              <button type="button" @click.stop="removeReviewImage(idx)" class="absolute top-2 right-2 bg-black/70 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                <span class="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 9. Phạm vi sự kiện (Public, Nội bộ) -->
      <div>
        <label class="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Phạm vi sự kiện <span class="text-red-500">*</span></label>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <label 
            :class="[
              'p-3.5 border rounded-xl cursor-pointer transition-all flex items-center gap-3 select-none',
              currentEvent.scope === 'Public' ? 'border-primary bg-primary/5 shadow-sm font-bold' : 'border-outline-variant/60 hover:bg-surface-container'
            ]"
          >
            <input type="radio" v-model="currentEvent.scope" value="Public" class="text-primary focus:ring-primary h-4 w-4">
            <div>
              <p class="text-xs text-on-surface">Public (Công khai)</p>
              <p class="text-[11px] text-on-surface-variant font-normal">Mọi thành viên & đối tác đều có thể xem</p>
            </div>
          </label>

          <label 
            :class="[
              'p-3.5 border rounded-xl cursor-pointer transition-all flex items-center gap-3 select-none',
              currentEvent.scope === 'Internal' ? 'border-primary bg-primary/5 shadow-sm font-bold' : 'border-outline-variant/60 hover:bg-surface-container'
            ]"
          >
            <input type="radio" v-model="currentEvent.scope" value="Internal" class="text-primary focus:ring-primary h-4 w-4">
            <div>
              <p class="text-xs text-on-surface">Nội bộ tổ chức</p>
              <p class="text-[11px] text-on-surface-variant font-normal">Chỉ dành cho nhân sự thuộc Ban Tổ Chức</p>
            </div>
          </label>
        </div>
      </div>

      <!-- 10. Tùy chọn cấu hình sự kiện (Hiển thị trên trang giới thiệu sự kiện) -->
      <div class="pt-2 border-t border-outline-variant/60">
        <label class="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" v-model="currentEvent.showOnLandingPage" class="h-4 w-4 text-primary rounded focus:ring-primary border-outline-variant">
          <span class="text-xs font-bold text-on-surface uppercase tracking-wider">Hiển thị trên trang giới thiệu sự kiện</span>
        </label>
      </div>
    </div>

    <!-- Modal: Audit Log -->
    <div v-if="showAuditLogModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
        <div class="flex justify-between items-center border-b border-outline-variant pb-3">
          <h3 class="font-bold text-lg text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">history</span>
            <span>Nhật ký Hoạt động (Audit Log)</span>
          </h3>
          <button @click="showAuditLogModal = false" class="p-1 hover:bg-surface-container rounded-full text-on-surface-variant">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="space-y-3 max-h-[350px] overflow-y-auto pr-2">
          <div v-for="log in (currentEvent.auditLogs || [])" :key="log.id" class="p-3 bg-surface-container-low rounded-lg border border-outline-variant/40 space-y-1 text-xs">
            <div class="flex justify-between items-center text-on-surface-variant">
              <span class="font-bold text-primary">{{ log.user }}</span>
              <span class="font-mono text-[10px]">{{ log.timestamp }}</span>
            </div>
            <p class="font-semibold text-on-surface">{{ log.action }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Save Template (FR-01.5) -->
    <div v-if="showSaveTemplateModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
        <div class="flex justify-between items-center border-b border-outline-variant pb-3">
          <h3 class="font-bold text-lg text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">save_as</span>
            <span>Lưu thành Template Mẫu (FR-01.5)</span>
          </h3>
          <button @click="showSaveTemplateModal = false" class="p-1 hover:bg-surface-container rounded-full text-on-surface-variant">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-on-surface-variant uppercase mb-1">Tên Template Mẫu *</label>
            <input type="text" v-model="templateForm.name" class="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs font-bold text-on-surface-variant uppercase mb-1">Phạm vi Mẫu</label>
            <select v-model="templateForm.isGlobal" class="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm bg-white">
              <option :value="true">Template Toàn Tổ Chức (Global)</option>
              <option :value="false">Chỉ Mình Tôi (Private)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-on-surface-variant uppercase mb-1">Mô tả Mẫu</label>
            <textarea v-model="templateForm.description" rows="2" class="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm"></textarea>
          </div>
        </div>
        <div class="flex justify-end gap-3 border-t border-outline-variant pt-4">
          <button @click="showSaveTemplateModal = false" class="px-4 py-2 border border-outline-variant text-on-surface-variant font-bold text-sm rounded-lg hover:bg-surface-container">Hủy</button>
          <button @click="handleSaveTemplate" class="px-5 py-2 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-hover shadow">Lưu Mẫu</button>
        </div>
      </div>
    </div>

    <!-- Modal: Stage Detail -->
    <div v-if="showStageDetailModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-none max-w-xl w-full px-6 pt-3.5 pb-5 border border-outline-variant shadow-2xl space-y-4 animate-in fade-in duration-200">
        <!-- Header -->
        <div class="flex justify-between items-center border-b border-outline-variant pb-3">
          <h3 class="font-bold text-base text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[20px]">info</span>
            <span>Chi tiết Giai đoạn: {{ selectedStage.nameVi || selectedStage.code }}</span>
          </h3>
          <button @click="showStageDetailModal = false" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <!-- Body: 3-column grid layout with vertical scroll max-h-[60vh] no-scrollbar -->
        <div class="space-y-1 text-xs max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
          <!-- Row 1: Tên giai đoạn -->
          <div class="grid grid-cols-12 items-start py-2.5 border-b border-outline-variant/40">
            <span class="col-span-4 font-medium text-on-surface-variant">Tên giai đoạn:</span>
            <span class="col-span-6 font-bold text-on-surface break-words whitespace-normal pr-2">{{ selectedStage.nameVi || selectedStage.code }}</span>
            <div class="col-span-2 text-right">
              <button @click="openQuickEdit('nameVi', 'Tên giai đoạn', selectedStage.nameVi || selectedStage.code)" class="text-primary hover:underline font-medium text-xs">Sửa</button>
            </div>
          </div>

          <!-- Row 2: Mã trạng thái -->
          <div class="grid grid-cols-12 items-start py-2.5 border-b border-outline-variant/40">
            <span class="col-span-4 font-medium text-on-surface-variant">Mã trạng thái:</span>
            <span class="col-span-6 font-mono font-bold text-primary break-words whitespace-normal">{{ selectedStage.code }}</span>
            <div class="col-span-2"></div>
          </div>

          <!-- Row 3: Thứ tự giai đoạn -->
          <div class="grid grid-cols-12 items-start py-2.5 border-b border-outline-variant/40">
            <span class="col-span-4 font-medium text-on-surface-variant">Thứ tự giai đoạn:</span>
            <span class="col-span-6 font-bold text-on-surface break-words whitespace-normal">Giai đoạn {{ selectedStage.stepOrder || 1 }}</span>
            <div class="col-span-2 text-right">
              <button @click="openQuickEdit('stepOrder', 'Thứ tự giai đoạn', selectedStage.stepOrder || 1)" class="text-primary hover:underline font-medium text-xs">Sửa</button>
            </div>
          </div>

          <!-- Row 4: Trạng thái vòng đời -->
          <div class="grid grid-cols-12 items-start py-2.5 border-b border-outline-variant/40">
            <span class="col-span-4 font-medium text-on-surface-variant">Trạng thái vòng đời:</span>
            <div class="col-span-6">
              <span :class="['inline-block px-2 py-0.5 text-[11px] font-bold rounded-full', selectedStage.code === currentEvent.status ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-700 border border-slate-200']">
                {{ selectedStage.code === currentEvent.status ? 'Đang diễn ra' : 'Đã kết thúc' }}
              </span>
            </div>
            <div class="col-span-2"></div>
          </div>

          <!-- Row 5: Tỉ lệ hoàn thành (Chỉ đọc) -->
          <div class="grid grid-cols-12 items-start py-2.5 border-b border-outline-variant/40">
            <span class="col-span-4 font-medium text-on-surface-variant">Tỉ lệ hoàn thành:</span>
            <span class="col-span-8 font-bold text-on-surface break-words whitespace-normal pr-2">{{ selectedStage.completionRate || '95%' }}</span>
          </div>

          <!-- Row 6: Công việc tồn đọng (Chỉ đọc) -->
          <div class="grid grid-cols-12 items-start py-2.5 border-b border-outline-variant/40">
            <span class="col-span-4 font-medium text-on-surface-variant">Công việc tồn đọng:</span>
            <span class="col-span-8 font-bold text-on-surface break-words whitespace-normal pr-2">{{ selectedStage.backlogCount || '1 công việc' }}</span>
          </div>

          <!-- Row 7: Người phụ trách -->
          <div class="grid grid-cols-12 items-start py-2.5 border-b border-outline-variant/40">
            <span class="col-span-4 font-medium text-on-surface-variant">Người phụ trách:</span>
            <div class="col-span-6 font-bold text-on-surface break-words whitespace-normal pr-2 flex items-center gap-1.5">
              <span>{{ selectedStage.assignee || 'Chưa có người phụ trách' }}</span>
              <button v-if="selectedStage.assignee" @click="removeStageAssignee(selectedStage.code)" class="text-slate-400 hover:text-red-500 p-0.5 rounded-full transition-colors flex items-center justify-center cursor-pointer" title="Bỏ người phụ trách">
                <span class="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
            <div class="col-span-2 text-right">
              <button @click="addAssignee(selectedStage.code)" class="text-primary hover:underline font-medium text-xs">Sửa</button>
            </div>
          </div>

          <!-- Row 8: Thời gian bắt đầu kế hoạch -->
          <div class="grid grid-cols-12 items-start py-2.5 border-b border-outline-variant/40">
            <span class="col-span-4 font-medium text-on-surface-variant">TG Bắt đầu kế hoạch:</span>
            <span class="col-span-6 font-mono text-[11px] font-bold text-primary break-words whitespace-normal">{{ selectedStage.startTime || 'Chưa thiết lập' }}</span>
            <div class="col-span-2 text-right">
              <button @click="openQuickEdit('startTime', 'Thời gian bắt đầu kế hoạch', selectedStage.startTime || '')" class="text-primary hover:underline font-medium text-xs">Sửa</button>
            </div>
          </div>

          <!-- Row 9: Thời gian kết thúc kế hoạch -->
          <div class="grid grid-cols-12 items-start py-2.5 border-b border-outline-variant/40">
            <span class="col-span-4 font-medium text-on-surface-variant">TG Kết thúc kế hoạch:</span>
            <span class="col-span-6 font-mono text-[11px] font-bold text-primary break-words whitespace-normal">{{ selectedStage.endTime || 'Chưa thiết lập' }}</span>
            <div class="col-span-2 text-right">
              <button @click="openQuickEdit('endTime', 'Thời gian kết thúc kế hoạch', selectedStage.endTime || '')" class="text-primary hover:underline font-medium text-xs">Sửa</button>
            </div>
          </div>


          <!-- Row 10: Mô tả công việc -->
          <div class="grid grid-cols-12 items-start py-2.5 border-b border-outline-variant/40">
            <span class="col-span-4 font-medium text-on-surface-variant">Mô tả công việc:</span>
            <span class="col-span-6 font-normal text-on-surface break-words whitespace-normal pr-2">{{ selectedStage.description || 'Tiến hành chuẩn bị, kiểm duyệt các hạng mục thiết lập, nhân sự và trang thiết bị phục vụ cho giai đoạn.' }}</span>
            <div class="col-span-2 text-right">
              <button @click="openQuickEdit('description', 'Mô tả công việc', selectedStage.description || 'Tiến hành chuẩn bị, kiểm duyệt các hạng mục thiết lập, nhân sự và trang thiết bị phục vụ cho giai đoạn.')" class="text-primary hover:underline font-medium text-xs">Sửa</button>
            </div>
          </div>
        </div>

        <!-- Footer: Action buttons all small -->
        <div class="flex justify-end items-center gap-2 border-t border-outline-variant pt-3">
          <button @click="deleteStageFromModal" class="px-3 py-1.5 border border-red-200 bg-white text-red-600 font-medium text-xs rounded hover:bg-red-50 transition-colors">
            Xóa giai đoạn
          </button>

          <button @click="showStageDetailModal = false" class="px-3 py-1.5 border border-outline-variant text-on-surface-variant font-medium text-xs rounded hover:bg-surface-container transition-colors">
            Đóng
          </button>

          <!-- Nút Lưu thay đổi màu xanh có dấu tích khi có thay đổi -->
          <button v-if="isStageModified" @click="saveStageDetailChanges" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded transition-colors flex items-center gap-1 shadow-sm">
            <span class="material-symbols-outlined text-[16px]">check</span>
            <span>Lưu thay đổi</span>
          </button>

          <button v-if="selectedStage.code !== currentEvent.status" @click="confirmStatusChangeFromModal" class="px-3 py-1.5 bg-primary text-white font-medium text-xs rounded hover:bg-primary-hover shadow-sm transition-colors">
            Chuyển sang giai đoạn này
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Edit Popup: Hỗ trợ cả Input Text và Bộ chọn Ngày giờ (Datetime-local) -->
    <div v-if="showQuickEditModal" @click.self="cancelQuickEdit" class="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4">
      <div class="bg-white p-5 border border-outline-variant shadow-xl w-full max-w-sm rounded-xl space-y-4 animate-in fade-in duration-150">
        <div class="text-xs font-bold text-on-surface uppercase tracking-wider flex justify-between items-center border-b border-outline-variant/60 pb-2">
          <span>Chỉnh sửa {{ quickEditLabel }}</span>
          <button @click="cancelQuickEdit" class="text-on-surface-variant hover:text-on-surface">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <!-- Bộ chọn Ngày & Giờ trực quan khi chỉnh sửa mốc thời gian -->
        <div v-if="quickEditType === 'datetime'" class="space-y-2">
          <label class="block text-[11px] font-bold text-on-surface-variant uppercase">Chọn Ngày & Giờ từ lịch:</label>
          <input 
            type="datetime-local" 
            v-model="quickEditDatetimeValue"
            class="w-full px-3 py-2 border border-outline-variant rounded-lg text-xs font-mono font-bold text-primary focus:border-primary focus:outline-none shadow-2xs"
          />
          <p class="text-[10px] text-on-surface-variant italic">Định dạng hiển thị chuẩn: dd/MM/yyyy HH:mm</p>
        </div>
        
        <!-- Ô nhập văn bản nhiều dòng cho Mô tả công việc -->
        <div v-else-if="quickEditType === 'textarea'" class="space-y-1">
          <textarea 
            ref="quickEditInputRef" 
            v-model="quickEditValue" 
            rows="4" 
            placeholder="Nhập mô tả công việc..."
            class="w-full px-3 py-2 border border-outline-variant rounded-lg text-xs font-medium focus:border-primary focus:outline-none transition-colors"
          ></textarea>
        </div>
        
        <!-- Ô nhập văn bản 1 dòng thông thường đối với các trường thông tin khác -->
        <div v-else class="space-y-1">
          <input 
            ref="quickEditInputRef" 
            type="text" 
            v-model="quickEditValue" 
            @input="validateQuickEdit"
            @keyup.enter="saveQuickEdit" 
            @keyup.esc="cancelQuickEdit" 
            :class="['w-full px-3 py-2 border rounded-lg text-xs font-medium focus:outline-none transition-colors', quickEditError ? 'border-red-500 text-red-600 focus:ring-1 focus:ring-red-500' : 'border-primary focus:ring-1 focus:ring-primary']"
          />
        </div>

        <p v-if="quickEditError" class="text-[11px] font-bold text-red-500 flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">error</span>
          <span>{{ quickEditError }}</span>
        </p>

        <div class="flex justify-end gap-2 pt-2 border-t border-outline-variant/40">
          <button @click="cancelQuickEdit" class="px-3 py-1.5 border border-outline-variant text-on-surface-variant font-medium text-xs rounded-lg hover:bg-surface-container transition-colors">
            Hủy
          </button>
          <button @click="saveQuickEdit" class="px-4 py-1.5 bg-primary text-white font-bold text-xs rounded-lg hover:bg-primary-hover shadow-xs transition-colors">
            Xác nhận
          </button>
        </div>
      </div>
    </div>

    <!-- Modal: Google Map Location Picker & Preview -->
    <div v-if="showMapPickerModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-none max-w-2xl w-full px-6 pt-3.5 pb-5 border border-outline-variant shadow-2xl space-y-4 animate-in fade-in duration-200">
        <!-- Header -->
        <div class="flex justify-between items-center border-b border-outline-variant pb-3">
          <h3 class="font-bold text-base text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[20px]">map</span>
            <span>Chọn Vị Trí Địa Điểm (Google Maps Preview)</span>
          </h3>
          <button type="button" @click="showMapPickerModal = false" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <!-- Body: Map Search & Map Canvas -->
        <div class="space-y-3 text-xs">
          <div>
            <label class="block font-medium text-on-surface-variant mb-1">Địa chỉ tìm kiếm:</label>
            <input type="text" v-model="currentEvent.location" placeholder="Nhập tên địa điểm hoặc địa chỉ..." class="w-full px-3 py-2 border border-outline-variant rounded-none font-bold text-xs focus:border-primary focus:outline-none">
          </div>

          <!-- Interactive Google Maps Preview Simulation -->
          <div class="relative h-64 bg-slate-100 border border-outline-variant rounded-none overflow-hidden flex flex-col justify-between p-3 select-none">
            <!-- Simulated Map Grid Background -->
            <div class="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
            
            <!-- Map Overlay Pin Marker -->
            <div class="relative z-10 flex flex-col items-center justify-center h-full gap-1">
              <div class="p-2 bg-red-600 text-white rounded-full shadow-lg animate-bounce">
                <span class="material-symbols-outlined text-[24px]">location_on</span>
              </div>
              <div class="bg-white/95 px-3 py-1.5 rounded shadow border border-outline-variant text-center max-w-xs backdrop-blur">
                <p class="font-bold text-on-surface text-xs truncate">{{ currentEvent.location || 'Địa điểm được chọn' }}</p>
                <p class="font-mono text-[10px] text-on-surface-variant mt-0.5">Lat: {{ tempLat }} | Lng: {{ tempLng }}</p>
              </div>
            </div>

            <!-- Quick Location Presets -->
            <div class="relative z-10 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button type="button" @click="selectPresetMapLocation('TT Hội nghị Quốc gia, Hà Nội', 21.0074, 105.7828)" class="px-2.5 py-1 bg-white/90 hover:bg-white text-on-surface border rounded-none font-medium text-[11px] shadow-sm shrink-0">
                📍 TT Hội nghị Quốc gia
              </button>
              <button type="button" @click="selectPresetMapLocation('Sân vận động Mỹ Đình, Hà Nội', 21.0205, 105.7640)" class="px-2.5 py-1 bg-white/90 hover:bg-white text-on-surface border rounded-none font-medium text-[11px] shadow-sm shrink-0">
                📍 SVĐ Mỹ Đình
              </button>
              <button type="button" @click="selectPresetMapLocation('SECC Q.7, TP. Hồ Chí Minh', 10.7325, 106.7215)" class="px-2.5 py-1 bg-white/90 hover:bg-white text-on-surface border rounded-none font-medium text-[11px] shadow-sm shrink-0">
                📍 SECC TP.HCM
              </button>
            </div>
          </div>

          <!-- Coordinate Inputs -->
          <div class="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label class="block font-medium text-on-surface-variant mb-1">Vĩ độ (Latitude):</label>
              <input type="number" step="0.0001" v-model.number="tempLat" class="w-full px-3 py-1.5 border border-outline-variant font-mono text-xs focus:border-primary focus:outline-none">
            </div>
            <div>
              <label class="block font-medium text-on-surface-variant mb-1">Kinh độ (Longitude):</label>
              <input type="number" step="0.0001" v-model.number="tempLng" class="w-full px-3 py-1.5 border border-outline-variant font-mono text-xs focus:border-primary focus:outline-none">
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-end gap-2 border-t border-outline-variant pt-3">
          <button type="button" @click="showMapPickerModal = false" class="px-3 py-1.5 border border-outline-variant text-on-surface-variant font-medium text-xs rounded-none hover:bg-surface-container transition-colors">
            Hủy
          </button>
          <button type="button" @click="confirmMapLocation" class="px-3 py-1.5 bg-primary text-white font-medium text-xs rounded-none hover:bg-primary-hover shadow-sm transition-colors">
            Xác nhận Vị trí
          </button>
        </div>
      </div>
    </div>

    <!-- Nút Small "Lưu thay đổi" & "Khôi phục Mặc định" ở đáy màn hình -->
    <div class="fixed bottom-6 right-8 z-40 flex items-center gap-2">
      <button v-if="isFormModified" @click="saveChanges" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded shadow-xl flex items-center gap-1.5 border border-emerald-500 transition-colors cursor-pointer animate-in slide-in-from-bottom duration-200">
        <span class="material-symbols-outlined text-[16px]">check</span>
        <span>Lưu thay đổi</span>
      </button>
      <button type="button" @click="handleResetDefaultData" class="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-600 font-medium text-xs rounded shadow border border-slate-300 transition-colors flex items-center gap-1 cursor-pointer" title="Xóa cache localstorage & Khôi phục lại bản chuẩn từ events.json">
        <span class="material-symbols-outlined text-[15px]">restart_alt</span>
        <span>Khôi phục Mặc định</span>
      </button>
    </div>

    <!-- Modal Preview Ảnh Kích Thước Lớn (Lightbox) -->
    <div v-if="showImageLightboxModal" @click.self="showImageLightboxModal = false" class="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div class="relative max-w-5xl max-h-[90vh] flex flex-col items-center select-none">
        <button type="button" @click="showImageLightboxModal = false" class="absolute -top-10 right-0 text-white hover:text-red-400 p-1 flex items-center gap-1 font-bold text-xs">
          <span>Đóng</span>
          <span class="material-symbols-outlined text-[24px]">close</span>
        </button>
        <img :src="previewingImageUrl" class="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-none border border-white/20" alt="Large Image Preview">
      </div>
    </div>

    <!-- Component dùng chung: Search & Assign Personnel Modal -->
    <SearchAssignPersonnelModal
      :isOpen="showSearchPersonnelModal"
      :title="personnelModalTitle"
      initialMode="single"
      @close="showSearchPersonnelModal = false"
      @confirm="handlePersonnelConfirmed"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick, computed } from 'vue';
import { getCurrentEvent, loadEventsAsync, saveEvent, LIFECYCLE_STATES, changeEventStatus, resetEventsToDefault, uploadImageApi, deleteImageApi, moveToNextStage, formatTimeRemaining } from '../mock/events.js';
import { saveTemplate } from '../mock/templates.js';
import SearchAssignPersonnelModal from '../components/SearchAssignPersonnelModal.vue';

const currentEvent = ref({});
const lifecycleStates = reactive(LIFECYCLE_STATES);

const sortedLifecycleStates = computed(() => {
  const entries = Object.entries(lifecycleStates).map(([code, state]) => ({
    code,
    ...(state || {})
  }));
  entries.sort((a, b) => (Number(a.stepOrder) || 0) - (Number(b.stepOrder) || 0));
  return entries;
});

// Xác định giai đoạn kế tiếp ngay sau giai đoạn hiện tại
const nextStageItem = computed(() => {
  const list = sortedLifecycleStates.value;
  if (!currentEvent.value || !currentEvent.value.status) return null;
  const currIdx = list.findIndex(s => s.code === currentEvent.value.status);
  if (currIdx !== -1 && currIdx < list.length - 1) {
    return list[currIdx + 1];
  }
  return null;
});

// Lấy tên Tiếng Việt của giai đoạn hiện tại
const currentStageName = computed(() => {
  if (!currentEvent.value || !currentEvent.value.status) return 'Chưa xác định';
  const found = lifecycleStates[currentEvent.value.status];
  return found ? (found.nameVi || found.code) : currentEvent.value.status;
});

// Tính thời gian còn lại cho giai đoạn đang diễn ra
function getStageTimeRemaining(stageItem) {
  if (!stageItem) return '';
  const targetTime = stageItem.endTime || currentEvent.value.endDate;
  return formatTimeRemaining(targetTime);
}

// Xử lý sự kiện khi bấm nút Chuyển giai đoạn kế tiếp / Kết thúc ở Bottom của Tiến trình sự kiện
function handleNextStageClick() {
  if (!nextStageItem.value) {
    if (confirm('Xác nhận kết thúc hoàn tất sự kiện này?')) {
      currentEvent.value.isCompleted = true;
      saveEvent(currentEvent.value);
      alert('Đã hoàn tất kết thúc sự kiện thành công!');
    }
    return;
  }
  
  const nextName = nextStageItem.value.nameVi || nextStageItem.value.code;
  if (confirm(`Xác nhận chuyển sang giai đoạn kế tiếp: [${nextName}]?`)) {
    const res = moveToNextStage(currentEvent.value.id, true);
    if (res.success) {
      currentEvent.value = res.event;
      if (currentEvent.value.lifecycleStates) {
        Object.assign(lifecycleStates, currentEvent.value.lifecycleStates);
      }
      alert(`Đã chuyển thành công sang giai đoạn: [${nextName}]!`);
    } else {
      alert(`Không thể chuyển giai đoạn: ${res.error}`);
    }
  }
}

let autoStageInterval = null;

// Kiểm tra tự động chuyển giai đoạn khi hết hạn
function checkAutoStageTransition() {
  if (!currentEvent.value || !currentEvent.value.status) return;
  const currentStage = lifecycleStates[currentEvent.value.status];
  if (!currentStage || !currentStage.endTime) return;

  const remaining = formatTimeRemaining(currentStage.endTime);
  if (remaining === 'Đã hết thời gian') {
    const res = moveToNextStage(currentEvent.value.id, false);
    if (res.success) {
      currentEvent.value = res.event;
      if (currentEvent.value.lifecycleStates) {
        Object.assign(lifecycleStates, currentEvent.value.lifecycleStates);
      }
      console.log(`[Auto Transition] Đã tự động chuyển sang giai đoạn: ${res.nextStage.nameVi}`);
    }
  }
}

// Quản lý chế độ xóa nhiều giai đoạn và danh sách các giai đoạn được chọn
const isDeleteStageMode = ref(false);
const selectedStageCodes = ref([]);

// Xác định thứ tự stepOrder của giai đoạn đang diễn ra
const activeStageOrder = computed(() => {
  if (!currentEvent.value || !currentEvent.value.status) return 0;
  const activeState = lifecycleStates[currentEvent.value.status];
  return activeState ? (Number(activeState.stepOrder) || 0) : 0;
});

// Kiểm tra giai đoạn có phải đang diễn ra hoặc đã diễn ra hay không (Không cho phép xóa)
function isOngoingOrPastStage(item) {
  if (!item || !item.code) return false;
  if (item.code === currentEvent.value.status) return true;
  const itemOrder = Number(item.stepOrder) || 0;
  if (activeStageOrder.value > 0 && itemOrder <= activeStageOrder.value) {
    return true;
  }
  return false;
}
const showAuditLogModal = ref(false);
const showSaveTemplateModal = ref(false);
const showSearchPersonnelModal = ref(false);
const currentAssignStageCode = ref('');
const assignTarget = ref('stage'); // 'stage' hoặc 'director'
const isFormModified = ref(false);

const bannerFileInputRef = ref(null);
const reviewFileInputRef = ref(null);

const showImageLightboxModal = ref(false);
const previewingImageUrl = ref('');
const pendingDeleteImageUrls = ref([]);

const personnelModalTitle = computed(() => {
  return assignTarget.value === 'director' ? 'Chọn Trưởng BAN Tổ Chức' : 'Thêm người phụ trách giai đoạn';
});

function markFormModified() {
  isFormModified.value = true;
}
const showStageDetailModal = ref(false);
const selectedStage = ref({});
const isStageModified = ref(false);

const showQuickEditModal = ref(false);
const quickEditKey = ref('');
const quickEditLabel = ref('');
const quickEditValue = ref('');
const quickEditType = ref('text');
const quickEditDatetimeValue = ref('');
const quickEditError = ref('');
const quickEditInputRef = ref(null);

function validateQuickEdit() {
  quickEditError.value = '';
  if (quickEditKey.value === 'stepOrder') {
    const totalStages = Object.keys(lifecycleStates).length;
    const strVal = String(quickEditValue.value).trim();
    const parsed = Number(strVal);
    if (!strVal || isNaN(parsed) || !Number.isInteger(parsed) || parsed < 1 || parsed > totalStages) {
      quickEditError.value = `Thứ tự giai đoạn phải là số nguyên từ 1 đến ${totalStages}!`;
      return false;
    }
  }
  return true;
}

function openStageDetail(code, stateObj) {
  selectedStage.value = {
    code,
    ...(stateObj || {})
  };
  isStageModified.value = false;
  showStageDetailModal.value = true;
}

function openQuickEdit(key, label, currentValue) {
  quickEditKey.value = key;
  quickEditLabel.value = label;
  quickEditError.value = '';

  if (key === 'startTime' || key === 'endTime' || key === 'startDate' || key === 'endDate') {
    quickEditType.value = 'datetime';
    quickEditDatetimeValue.value = formatToDatetimeLocal(currentValue);
  } else if (key === 'description') {
    quickEditType.value = 'textarea';
    quickEditValue.value = currentValue || '';
  } else {
    quickEditType.value = 'text';
    quickEditValue.value = currentValue || '';
  }

  showQuickEditModal.value = true;
  nextTick(() => {
    quickEditInputRef.value?.focus();
    quickEditInputRef.value?.select();
  });
}

function reorderAllStages(targetCode, newOrder) {
  const stagesList = Object.entries(lifecycleStates).map(([code, state]) => ({
    code,
    ...state
  }));
  stagesList.sort((a, b) => (Number(a.stepOrder) || 0) - (Number(b.stepOrder) || 0));

  const targetIndex = stagesList.findIndex(item => item.code === targetCode);
  if (targetIndex === -1) return;
  const [targetItem] = stagesList.splice(targetIndex, 1);

  const insertIndex = Math.max(0, Math.min(newOrder - 1, stagesList.length));
  stagesList.splice(insertIndex, 0, targetItem);

  stagesList.forEach((item, index) => {
    const updatedOrder = index + 1;
    item.stepOrder = updatedOrder;
    if (lifecycleStates[item.code]) {
      lifecycleStates[item.code].stepOrder = updatedOrder;
    }
  });

  if (selectedStage.value.code === targetCode) {
    selectedStage.value.stepOrder = targetItem.stepOrder;
  }

  currentEvent.value.lifecycleStates = JSON.parse(JSON.stringify(lifecycleStates));
  markFormModified();
}

function syncAdjacentStageTimes(targetCode, key, newValue) {
  const stagesList = sortedLifecycleStates.value;
  const currIndex = stagesList.findIndex(s => s.code === targetCode);
  if (currIndex === -1) return;

  if (key === 'startTime' && currIndex > 0) {
    const prevCode = stagesList[currIndex - 1].code;
    if (lifecycleStates[prevCode]) {
      lifecycleStates[prevCode].endTime = newValue;
    }
  } else if (key === 'endTime' && currIndex < stagesList.length - 1) {
    const nextCode = stagesList[currIndex + 1].code;
    if (lifecycleStates[nextCode]) {
      lifecycleStates[nextCode].startTime = newValue;
    }
  }
}

function saveQuickEdit() {
  if (quickEditType.value === 'text' && !validateQuickEdit()) {
    return;
  }
  if (quickEditKey.value) {
    let finalVal = quickEditValue.value;

    if (quickEditType.value === 'datetime') {
      const defaultTime = quickEditKey.value === 'endTime' ? '18:00' : '09:00';
      finalVal = formatToDDMMYYYYHHmm(quickEditDatetimeValue.value, defaultTime);
    }

    if (quickEditKey.value === 'stepOrder') {
      const newOrder = parseInt(finalVal, 10);
      reorderAllStages(selectedStage.value.code, newOrder);
    } else {
      selectedStage.value[quickEditKey.value] = finalVal;
      if (lifecycleStates[selectedStage.value.code]) {
        lifecycleStates[selectedStage.value.code][quickEditKey.value] = finalVal;
      }
      // Tự động đồng bộ mốc thời gian liền kề của giai đoạn trước/sau
      if (quickEditKey.value === 'startTime' || quickEditKey.value === 'endTime') {
        syncAdjacentStageTimes(selectedStage.value.code, quickEditKey.value, finalVal);
      }
    }
    isStageModified.value = true;
  }
  showQuickEditModal.value = false;
}

function cancelQuickEdit() {
  showQuickEditModal.value = false;
}

function saveStageDetailChanges() {
  if (lifecycleStates[selectedStage.value.code]) {
    Object.assign(lifecycleStates[selectedStage.value.code], selectedStage.value);
  }
  isStageModified.value = false;
  currentEvent.value.lifecycleStates = JSON.parse(JSON.stringify(lifecycleStates));
  markFormModified();
  alert(`Đã lưu thay đổi cho giai đoạn [${selectedStage.value.nameVi || selectedStage.value.code}] thành công!`);
}

function confirmStatusChangeFromModal() {
  if (selectedStage.value.code) {
    handleStatusChange(selectedStage.value.code);
    showStageDetailModal.value = false;
  }
}

function deleteStageFromModal() {
  if (!selectedStage.value.code) return;
  if (isOngoingOrPastStage(selectedStage.value)) {
    alert('Không thể xóa giai đoạn đang diễn ra hoặc đã diễn ra!');
    return;
  }
  const stageName = selectedStage.value.nameVi || selectedStage.value.code;
  if (confirm(`Bạn có chắc chắn muốn xóa giai đoạn [${stageName}] này không?`)) {
    delete lifecycleStates[selectedStage.value.code];
    showStageDetailModal.value = false;
    currentEvent.value.lifecycleStates = JSON.parse(JSON.stringify(lifecycleStates));
    markFormModified();
    nextTick(() => {
      updateScrollButtons();
    });
    alert(`Đã xóa thành công giai đoạn [${stageName}]!`);
  }
}

const stageScrollContainer = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);

function updateScrollButtons() {
  if (!stageScrollContainer.value) return;
  const container = stageScrollContainer.value;
  const { scrollLeft, scrollWidth, clientWidth } = container;
  const firstCard = container.firstElementChild;
  const tolerance = firstCard ? (firstCard.offsetWidth / 2) : 50;

  canScrollLeft.value = scrollLeft > tolerance;
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - tolerance;
}

function scrollStages(direction) {
  if (!stageScrollContainer.value) return;
  const container = stageScrollContainer.value;
  const firstCard = container.firstElementChild;
  if (!firstCard) return;

  const cardWidth = firstCard.offsetWidth;
  const gap = 12; // Khoảng cách gap-3 trong Tailwind
  const stepAmount = (cardWidth + gap) * 4;

  const scrollAmount = direction === 'left' ? -stepAmount : stepAmount;
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

const showMapPickerModal = ref(false);
const tempLat = ref(21.0074);
const tempLng = ref(105.7828);
const htmlEditorMode = ref('rich');
const richHtmlEditorRef = ref(null);
const newReviewImageUrl = ref('');

const startDateDisplay = ref('');
const endDateDisplay = ref('');
const startDatePickerRef = ref(null);
const endDatePickerRef = ref(null);

// Chuyển từ YYYY-MM-DD/ISO sang dd/MM/yyyy HH:mm
function formatToDDMMYYYYHHmm(dateStr, defaultTime = '09:00') {
  if (!dateStr) return '';
  const str = String(dateStr).trim();
  
  // Nếu đã ở dạng dd/MM/yyyy HH:mm
  if (/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/.test(str)) return str;
  
  // Nếu ở dạng dd/MM/yyyy
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) {
    return `${str} ${defaultTime}`;
  }
  
  // Nếu ở dạng YYYY-MM-DDTHH:mm hoặc YYYY-MM-DD HH:mm
  if (/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}/.test(str)) {
    const parts = str.replace('T', ' ').split(' ');
    const [y, m, d] = parts[0].split('-');
    const timeParts = parts[1].split(':');
    return `${d}/${m}/${y} ${timeParts[0]}:${timeParts[1]}`;
  }

  // Nếu ở dạng YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [y, m, d] = str.split('-');
    return `${d}/${m}/${y} ${defaultTime}`;
  }
  
  const dObj = new Date(str);
  if (!isNaN(dObj.getTime())) {
    const day = String(dObj.getDate()).padStart(2, '0');
    const month = String(dObj.getMonth() + 1).padStart(2, '0');
    const year = dObj.getFullYear();
    const hours = String(dObj.getHours()).padStart(2, '0');
    const minutes = String(dObj.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  return str;
}

// Chuyển từ dd/MM/yyyy HH:mm sang YYYY-MM-DDTHH:mm dùng cho input datetime-local picker
function formatToDatetimeLocal(ddmmyyyyHHmmStr) {
  if (!ddmmyyyyHHmmStr) return '';
  const str = String(ddmmyyyyHHmmStr).trim();

  // Dạng dd/MM/yyyy HH:mm
  const matchWithTime = str.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})$/);
  if (matchWithTime) {
    const [, d, m, y, hh, mm] = matchWithTime;
    return `${y}-${m}-${d}T${hh}:${mm}`;
  }

  // Dạng dd/MM/yyyy (không có giờ)
  const matchOnlyDate = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (matchOnlyDate) {
    const [, d, m, y] = matchOnlyDate;
    return `${y}-${m}-${d}T09:00`;
  }

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(str)) return str.slice(0, 16);
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return `${str}T09:00`;
  return '';
}

function handleStartDateInput() {
  currentEvent.value.startDate = startDateDisplay.value;
  markFormModified();
}

function handleEndDateInput() {
  currentEvent.value.endDate = endDateDisplay.value;
  markFormModified();
}

function triggerStartDatePicker() {
  if (startDatePickerRef.value) {
    if (typeof startDatePickerRef.value.showPicker === 'function') {
      startDatePickerRef.value.showPicker();
    } else {
      startDatePickerRef.value.click();
    }
  }
}

function triggerEndDatePicker() {
  if (endDatePickerRef.value) {
    if (typeof endDatePickerRef.value.showPicker === 'function') {
      endDatePickerRef.value.showPicker();
    } else {
      endDatePickerRef.value.click();
    }
  }
}

function handleStartDatePickerChange(e) {
  const dtVal = e.target.value;
  if (dtVal) {
    const formatted = formatToDDMMYYYYHHmm(dtVal, '09:00');
    startDateDisplay.value = formatted;
    currentEvent.value.startDate = formatted;
    markFormModified();
  }
}

function handleEndDatePickerChange(e) {
  const dtVal = e.target.value;
  if (dtVal) {
    const formatted = formatToDDMMYYYYHHmm(dtVal, '18:00');
    endDateDisplay.value = formatted;
    currentEvent.value.endDate = formatted;
    markFormModified();
  }
}

function switchHtmlEditorMode(mode) {
  htmlEditorMode.value = mode;
  if (mode === 'rich') {
    nextTick(() => {
      if (richHtmlEditorRef.value) {
        richHtmlEditorRef.value.innerHTML = currentEvent.value.descriptionHtml || '';
      }
    });
  }
}

const scaleOptions = [
  { value: 'small', label: 'Nhỏ', desc: '< 50 người' },
  { value: 'medium', label: 'Trung Bình', desc: '50 - 100 người' },
  { value: 'large', label: 'Lớn', desc: '< 1000 người' },
  { value: 'mega', label: 'Rất lớn', desc: '>= 1000 người' }
];

const templateForm = reactive({
  name: '',
  isGlobal: true,
  description: ''
});

async function loadData() {
  // Nạp dữ liệu sự kiện từ public/events.json trước khi cập nhật currentEvent
  await loadEventsAsync();
  currentEvent.value = getCurrentEvent();

  if (currentEvent.value.lifecycleStates) {
    Object.keys(lifecycleStates).forEach(k => delete lifecycleStates[k]);
    Object.assign(lifecycleStates, currentEvent.value.lifecycleStates);
  }

  // Ensuring defaults for all 10 event setup fields
  if (!currentEvent.value.eventType) currentEvent.value.eventType = 'Offline';
  if (!currentEvent.value.scale) currentEvent.value.scale = 'mega';
  if (!currentEvent.value.scope) currentEvent.value.scope = 'Public';
  if (currentEvent.value.showOnLandingPage === undefined) currentEvent.value.showOnLandingPage = true;
  if (!currentEvent.value.host) currentEvent.value.host = 'Hiệp hội Công nghệ Châu Á & EventAZ Org';
  if (!currentEvent.value.bannerUrl) currentEvent.value.bannerUrl = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80';
  if (!currentEvent.value.reviewImages) {
    currentEvent.value.reviewImages = [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80'
    ];
  }
  if (!currentEvent.value.descriptionHtml) {
    currentEvent.value.descriptionHtml = `<p><b>${currentEvent.value.name || 'Sự kiện'}</b> là diễn đàn công nghệ đỉnh cao khu vực với sự tham gia của các chuyên gia và đối tác hàng đầu.</p>`;
  }

  startDateDisplay.value = formatToDDMMYYYYHHmm(currentEvent.value.startDate, '09:00');
  endDateDisplay.value = formatToDDMMYYYYHHmm(currentEvent.value.endDate, '18:00');
  currentEvent.value.startDate = startDateDisplay.value;
  currentEvent.value.endDate = endDateDisplay.value;

  templateForm.name = `Mẫu chuẩn: ${currentEvent.value.name}`;
  templateForm.description = `Template mẫu được xuất từ sự kiện ${currentEvent.value.id}`;

  nextTick(() => {
    if (richHtmlEditorRef.value) {
      richHtmlEditorRef.value.innerHTML = currentEvent.value.descriptionHtml || '';
    }
  });
}

function handleEventTypeChange() {
  if (currentEvent.value.eventType === 'Online') {
    currentEvent.value.location = 'Online';
    currentEvent.value.latitude = null;
    currentEvent.value.longitude = null;
  } else if (currentEvent.value.location === 'Online') {
    currentEvent.value.location = 'Trung tâm Hội nghị Quốc gia, Hà Nội';
    currentEvent.value.latitude = 21.0074;
    currentEvent.value.longitude = 105.7828;
  }
}

function openMapPicker() {
  if (currentEvent.value.eventType === 'Online') {
    alert('Sự kiện chỉ Online không cần chọn bản đồ!');
    return;
  }
  tempLat.value = currentEvent.value.latitude || 21.0074;
  tempLng.value = currentEvent.value.longitude || 105.7828;
  showMapPickerModal.value = true;
}

function selectPresetMapLocation(name, lat, lng) {
  currentEvent.value.location = name;
  tempLat.value = lat;
  tempLng.value = lng;
}

function confirmMapLocation() {
  currentEvent.value.latitude = tempLat.value;
  currentEvent.value.longitude = tempLng.value;
  showMapPickerModal.value = false;
  alert(`Đã cập nhật vị trí bản đồ: Kinh độ ${tempLng.value}, Vĩ độ ${tempLat.value}`);
}

function openAssignDirectorModal() {
  assignTarget.value = 'director';
  showSearchPersonnelModal.value = true;
}

function removeDirector() {
  if (confirm(`Bạn có chắc chắn muốn gỡ vai trò Trưởng BAN Tổ Chức [${currentEvent.value.director}] không?`)) {
    currentEvent.value.director = '';
    currentEvent.value.directorId = '';
    markFormModified();
  }
}

function triggerBannerFileUpload() {
  bannerFileInputRef.value?.click();
}

function handleBannerFileUpload(event) {
  const inputEl = event.target;
  const file = inputEl.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const oldBannerUrl = currentEvent.value.bannerUrl;
    if (oldBannerUrl && oldBannerUrl.startsWith('/uploads/')) {
      pendingDeleteImageUrls.value.push(oldBannerUrl);
    }
    // Gán dữ liệu Base64 để hiển thị preview ngay tại client (chưa gửi API server)
    currentEvent.value = {
      ...currentEvent.value,
      bannerUrl: e.target.result
    };
    markFormModified();
    inputEl.value = '';
  };
  reader.readAsDataURL(file);
}

function triggerReviewFilesUpload() {
  reviewFileInputRef.value?.click();
}

function handleReviewFilesUpload(event) {
  const inputEl = event.target;
  const files = Array.from(inputEl.files || []);
  if (files.length === 0) return;

  if (!currentEvent.value.reviewImages) {
    currentEvent.value.reviewImages = [];
  }

  let readCount = 0;
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Gán dữ liệu Base64 vào mảng để hiển thị preview ngay tại client (chưa gửi API server)
      currentEvent.value.reviewImages = [...(currentEvent.value.reviewImages || []), e.target.result];
      markFormModified();
      readCount++;
      if (readCount === files.length) {
        inputEl.value = '';
      }
    };
    reader.readAsDataURL(file);
  });
}

function openImageLightbox(url) {
  if (!url) return;
  previewingImageUrl.value = url;
  showImageLightboxModal.value = true;
}

function removeReviewImage(index) {
  if (currentEvent.value.reviewImages) {
    const deletedUrl = currentEvent.value.reviewImages[index];
    currentEvent.value.reviewImages.splice(index, 1);
    if (deletedUrl && deletedUrl.startsWith('/uploads/')) {
      pendingDeleteImageUrls.value.push(deletedUrl);
    }
    markFormModified();
  }
}

function applyHtmlFormat(command, value = null) {
  if (richHtmlEditorRef.value) {
    richHtmlEditorRef.value.focus();
  }
  document.execCommand(command, false, value);
  syncHtmlFromEditor();
}

function syncHtmlFromEditor() {
  if (richHtmlEditorRef.value) {
    currentEvent.value.descriptionHtml = richHtmlEditorRef.value.innerHTML;
    markFormModified();
  }
}

async function saveChanges() {
  // 1. Process physical deletions
  if (pendingDeleteImageUrls.value.length > 0) {
    for (const url of pendingDeleteImageUrls.value) {
      await deleteImageApi(url);
    }
    pendingDeleteImageUrls.value = [];
  }

  // 2. Process base64 banner upload to disk if new banner selected
  if (currentEvent.value.bannerUrl && currentEvent.value.bannerUrl.startsWith('data:image/')) {
    const savedUrl = await uploadImageApi('banner.jpg', currentEvent.value.bannerUrl);
    if (savedUrl) {
      currentEvent.value.bannerUrl = savedUrl;
    }
  }

  // 3. Process base64 review images upload to disk if new review images added
  if (currentEvent.value.reviewImages && currentEvent.value.reviewImages.length > 0) {
    for (let i = 0; i < currentEvent.value.reviewImages.length; i++) {
      const imgUrl = currentEvent.value.reviewImages[i];
      if (imgUrl && imgUrl.startsWith('data:image/')) {
        const savedUrl = await uploadImageApi(`review_${i + 1}.jpg`, imgUrl);
        if (savedUrl) {
          currentEvent.value.reviewImages[i] = savedUrl;
        }
      }
    }
  }

  // 4. Save updated event model and lifecycleStates to events.json
  currentEvent.value.lifecycleStates = JSON.parse(JSON.stringify(lifecycleStates));
  saveEvent(currentEvent.value);
  isFormModified.value = false;
  alert('Đã lưu thành công tất cả thông tin thiết lập sự kiện!');
}

function handleResetDefaultData() {
  if (confirm('Bạn có chắc chắn muốn khôi phục dữ liệu ban đầu từ events.json không? Mọi thay đổi tạm thời sẽ bị xóa.')) {
    resetEventsToDefault();
    loadData();
    isFormModified.value = false;
    alert('Đã khôi phục thành công dữ liệu mặc định từ events.json!');
  }
}

function handleStatusChange(nextStatus) {
  const result = changeEventStatus(currentEvent.value.id, nextStatus);
  if (!result.success) {
    alert(`Không thể chuyển trạng thái: ${result.error}`);
  } else {
    currentEvent.value = result.event;
    alert(`Đã chuyển trạng thái sự kiện thành công sang [${LIFECYCLE_STATES[nextStatus].nameVi}]!`);
  }
}

function rollbackStatus() {
  alert('Đã hoàn tác lùi 1 bước trạng thái vòng đời sự kiện thành công!');
}

function addStage() {
  const existingKeys = Object.keys(lifecycleStates);
  let maxOrder = 0;
  existingKeys.forEach(k => {
    const order = lifecycleStates[k]?.stepOrder || 0;
    if (order > maxOrder) maxOrder = order;
  });
  const newOrder = maxOrder + 1;
  const newCode = `stage_${Date.now().toString().slice(-4)}`;

  lifecycleStates[newCode] = reactive({
    code: newCode,
    nameVi: "--",
    color: "bg-slate-600",
    textClass: "text-slate-600",
    bgLight: "bg-slate-50",
    stepOrder: newOrder,
    completionRate: "--",
    backlogCount: "--",
    assignee: "--",
    description: "--"
  });

  markFormModified();
  nextTick(() => {
    updateScrollButtons();
    if (stageScrollContainer.value) {
      stageScrollContainer.value.scrollLeft = stageScrollContainer.value.scrollWidth;
    }
  });
}

// Bật/tắt chế độ xóa giai đoạn hoặc thực hiện xóa khi đã tích chọn
function toggleDeleteStageMode() {
  if (isDeleteStageMode.value) {
    confirmDeleteSelectedStages();
  } else {
    isDeleteStageMode.value = true;
    selectedStageCodes.value = [];
  }
}

// Hủy chế độ xóa giai đoạn
function cancelDeleteStageMode() {
  isDeleteStageMode.value = false;
  selectedStageCodes.value = [];
}

// Tích/bỏ chọn một giai đoạn
function toggleSelectStage(code, item) {
  if (!isDeleteStageMode.value) return;
  if (isOngoingOrPastStage(item)) return;

  const idx = selectedStageCodes.value.indexOf(code);
  if (idx > -1) {
    selectedStageCodes.value.splice(idx, 1);
  } else {
    selectedStageCodes.value.push(code);
  }
}

// Thực hiện xóa các giai đoạn đã được chọn
function confirmDeleteSelectedStages() {
  const count = selectedStageCodes.value.length;
  if (count === 0) return;

  if (confirm(`Bạn có chắc chắn muốn xóa ${count} giai đoạn đã chọn không?`)) {
    selectedStageCodes.value.forEach(code => {
      delete lifecycleStates[code];
    });
    const deletedCount = count;
    selectedStageCodes.value = [];
    isDeleteStageMode.value = false;
    currentEvent.value.lifecycleStates = JSON.parse(JSON.stringify(lifecycleStates));
    markFormModified();
    nextTick(() => {
      updateScrollButtons();
    });
    alert(`Đã xóa thành công ${deletedCount} giai đoạn!`);
  }
}

function deleteStage() {
  toggleDeleteStageMode();
}

function addAssignee(stageCode) {
  assignTarget.value = 'stage';
  currentAssignStageCode.value = stageCode || '';
  showSearchPersonnelModal.value = true;
}

function removeStageAssignee(stageCode) {
  const code = stageCode || (selectedStage.value ? selectedStage.value.code : '');
  if (!code) return;

  const currentName = (lifecycleStates[code] && lifecycleStates[code].assignee) || (selectedStage.value && selectedStage.value.assignee) || '';
  if (confirm(`Bạn có chắc chắn muốn bỏ người phụ trách [${currentName || 'này'}] khỏi giai đoạn không?`)) {
    if (lifecycleStates[code]) {
      lifecycleStates[code].assignee = '';
    }
    if (selectedStage.value && selectedStage.value.code === code) {
      selectedStage.value.assignee = '';
    }
    isStageModified.value = true;
    currentEvent.value.lifecycleStates = JSON.parse(JSON.stringify(lifecycleStates));
    markFormModified();
  }
}

function handlePersonnelConfirmed(users) {
  if (users && users.length > 0) {
    if (assignTarget.value === 'director') {
      const directorUser = users[0];
      currentEvent.value.director = directorUser.name;
      currentEvent.value.directorId = directorUser.id;
      markFormModified();
      alert(`Đã chọn [${directorUser.name}] làm Trưởng BAN Tổ Chức thành công!`);
    } else {
      const names = users.map(u => u.name).join(', ');
      if (currentAssignStageCode.value && lifecycleStates[currentAssignStageCode.value]) {
        lifecycleStates[currentAssignStageCode.value].assignee = names;
        if (selectedStage.value && selectedStage.value.code === currentAssignStageCode.value) {
          selectedStage.value.assignee = names;
        }
        isStageModified.value = true;
      }
      alert(`Đã gán thành công ${users.length} nhân sự [${names}] cho giai đoạn!`);
    }
  }
}

function handleSaveTemplate() {
  const newTpl = {
    id: `TPL-00${Date.now().toString().slice(-2)}`,
    name: templateForm.name,
    category: currentEvent.value.category || 'Sự kiện chung',
    description: templateForm.description,
    isGlobal: templateForm.isGlobal,
    createdByName: 'Nguyễn Văn Trưởng',
    createdAt: new Date().toLocaleString('vi-VN'),
    usageCount: 1,
    wbsCategories: (currentEvent.value.wbs || []).map((w, i) => ({
      id: `TWBS-0${i+1}`,
      name: w.name,
      defaultLeadRole: w.leadName,
      taskCount: 5
    }))
  };
  saveTemplate(newTpl);
  showSaveTemplateModal.value = false;
  alert(`Lưu thành công Template mẫu: [${newTpl.name}] (FR-01.5)!`);
}

onMounted(async () => {
  await loadData();
  nextTick(() => {
    updateScrollButtons();
  });
  autoStageInterval = setInterval(checkAutoStageTransition, 20000);
});

onUnmounted(() => {
  if (autoStageInterval) {
    clearInterval(autoStageInterval);
  }
});
</script>
