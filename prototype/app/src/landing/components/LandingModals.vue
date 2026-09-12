<template>
  <!-- ══════════════════════ MODAL BACKDROP ══════════════════════ -->
  <Teleport to="body">
    <Transition name="lp-fade">
      <div
        v-if="activeModal"
        class="lp-modal-backdrop lp-shell"
        @click.self="close"
        @keydown.esc="close"
        tabindex="-1"
      >
        <div :class="['lp-modal-box', { 'lp-modal-box--wide': activeModal === 'speakers' }]" role="dialog" aria-modal="true">
          <!-- Close button -->
          <button class="lp-modal-close" @click="close" aria-label="Đóng">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <!-- 1. LEAD REGISTRATION / TƯ VẤN SỰ KIỆN MODAL -->
          <div v-if="activeModal === 'auth'" class="lp-modal-content">
            <div class="lp-auth-header">
              <span class="lp-modal-badge">ĐĂNG KÝ TRẢI NGHIỆM & TƯ VẤN</span>
              <h3 class="lp-modal-title">Bắt đầu cùng EventAZ</h3>
              <p class="lp-modal-sub">
                Để lại thông tin bên dưới để nhận tài liệu giải pháp tổ chức sự kiện và email tư vấn kích hoạt tài khoản riêng cho bạn.
              </p>
            </div>

            <form @submit.prevent="submitLead" class="lp-form">
              <div class="lp-form-group">
                <label>Họ và tên của bạn</label>
                <input v-model="leadForm.name" type="text" placeholder="Nguyễn Văn A" required />
              </div>
              <div class="lp-form-group">
                <label>Email nhận tài liệu & thông báo</label>
                <input v-model="leadForm.email" type="email" placeholder="name@company.com" required />
              </div>
              <div class="lp-form-group">
                <label>Số điện thoại liên hệ</label>
                <input v-model="leadForm.phone" type="tel" placeholder="0901 234 567" required />
              </div>
              <div class="lp-form-group">
                <label>Loại sự kiện quan tâm</label>
                <BaseDropdown
                  :items="eventOptions"
                  :match-width="true"
                  placement="bottom-start"
                  @select="(item) => leadForm.eventType = item.label"
                  class="w-full"
                >
                  <template #trigger="{ isOpen, toggle }">
                    <button
                      type="button"
                      @click.stop="toggle"
                      :class="['lp-lead-dropdown-trigger', { 'is-open': isOpen }]"
                    >
                      <span>{{ leadForm.eventType || 'Chọn loại sự kiện...' }}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" :class="['lp-dropdown-chevron', { 'rotate-180': isOpen }]">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </button>
                  </template>
                </BaseDropdown>
              </div>
              <div class="lp-form-group">
                <label>Ghi chú hoặc quy mô dự kiến (tùy chọn)</label>
                <input v-model="leadForm.note" type="text" placeholder="Ví dụ: Quy mô 500 khách tại Hà Nội..." />
              </div>

              <button type="submit" class="lp-btn lp-btn--coral lp-btn--full lp-btn--lg" style="margin-top: 10px;">
                <span>Gửi thông tin nhận tài liệu qua Email</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </form>

            <div class="lp-form-privacy">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Cam kết bảo mật 100%. Thông tin hướng dẫn sẽ được gửi tự động về email của bạn.</span>
            </div>
          </div>

          <!-- 2. TICKET BOOKING MODAL -->
          <div v-else-if="activeModal === 'ticket'" class="lp-modal-content">
            <div class="lp-auth-header">
              <span class="lp-modal-badge">ĐẶT VÉ SỰ KIỆN TRỰC TUYẾN</span>
              <h3 class="lp-modal-title">{{ selectedEvent?.title || 'Creative Summit 2024' }}</h3>
              <p class="lp-modal-sub">
                {{ selectedEvent?.location || 'Trung tâm Hội nghị White Palace, TP.HCM' }}
              </p>
            </div>

            <!-- Ticket tiers -->
            <div class="lp-ticket-tiers">
              <label
                v-for="tier in ticketTiers"
                :key="tier.id"
                :class="['lp-tier-card', { active: selectedTier.id === tier.id }]"
              >
                <input type="radio" name="tier" :value="tier" v-model="selectedTier" class="lp-sr-only" />
                <div class="lp-tier-info">
                  <strong>{{ tier.name }}</strong>
                  <small>{{ tier.desc }}</small>
                </div>
                <div class="lp-tier-price">{{ tier.price.toLocaleString('vi-VN') }}₫</div>
              </label>
            </div>

            <!-- Quantity & total -->
            <div class="lp-ticket-calc">
              <div class="lp-qty-control">
                <span>Số lượng:</span>
                <div class="lp-qty-btns">
                  <button type="button" @click="ticketQty = Math.max(1, ticketQty - 1)">−</button>
                  <b>{{ ticketQty }}</b>
                  <button type="button" @click="ticketQty = Math.min(10, ticketQty + 1)">+</button>
                </div>
              </div>
              <div class="lp-total-row">
                <span>Tổng thanh toán:</span>
                <strong class="lp-total-val">
                  {{ (selectedTier.price * ticketQty).toLocaleString('vi-VN') }}₫
                </strong>
              </div>
            </div>

            <button @click="submitTicket" class="lp-btn lp-btn--coral lp-btn--full lp-btn--lg" style="margin-top: 16px;">
              <span>Tiến hành thanh toán bảo mật</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>

          <!-- 3. PLAN CONSULTATION MODAL -->
          <div v-else-if="activeModal === 'plan'" class="lp-modal-content">
            <div class="lp-auth-header">
              <span class="lp-modal-badge">TƯ VẤN GÓI DỊCH VỤ</span>
              <h3 class="lp-modal-title">Gói {{ selectedPlan?.name || 'Pro' }}</h3>
              <p class="lp-modal-sub">
                Nhập thông tin bên dưới để chuyên gia của EventAZ thiết lập workspace demo riêng cho tổ chức của bạn.
              </p>
            </div>

            <form @submit.prevent="submitPlan" class="lp-form">
              <div class="lp-form-group">
                <label>Họ và tên của bạn</label>
                <input v-model="planForm.name" type="text" placeholder="Nguyễn Văn A" required />
              </div>
              <div class="lp-form-group">
                <label>Số điện thoại liên hệ</label>
                <input v-model="planForm.phone" type="tel" placeholder="0901 234 567" required />
              </div>
              <div class="lp-form-group">
                <label>Tổ chức / Tên sự kiện dự kiến</label>
                <input v-model="planForm.org" type="text" placeholder="Công ty ABC / Festival 2024" required />
              </div>

              <button type="submit" class="lp-btn lp-btn--dark lp-btn--full lp-btn--lg" style="margin-top: 10px;">
                <span>Nhận tư vấn & Workspace Demo qua Email</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </form>
          </div>

          <!-- 4. HOW IT WORKS MODAL -->
          <div v-else-if="activeModal === 'howItWorks'" class="lp-modal-content">
            <div class="lp-auth-header">
              <span class="lp-modal-badge">CÁCH EVENTAZ HOẠT ĐỘNG</span>
              <h3 class="lp-modal-title">Quy trình 4 bước tinh gọn</h3>
              <p class="lp-modal-sub">
                Đơn giản hóa toàn bộ vòng đời quản trị sự kiện từ chuẩn bị đến hậu sự kiện.
              </p>
            </div>

            <div class="lp-steps-timeline">
              <div v-for="(step, idx) in howItWorksSteps" :key="step.title" class="lp-step-item">
                <div class="lp-step-num">0{{ idx + 1 }}</div>
                <div class="lp-step-body">
                  <strong>{{ step.title }}</strong>
                  <p>{{ step.desc }}</p>
                </div>
              </div>
            </div>

            <button @click="navigateToCta()" class="lp-btn lp-btn--dark lp-btn--full lp-btn--lg" style="margin-top: 18px;">
              <span>Đăng ký nhận tài liệu quy trình qua Email</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>

          <!-- 5. SERVICE DETAIL MODAL -->
          <div v-else-if="activeModal === 'service'" class="lp-modal-content">
            <div class="lp-auth-header">
              <span class="lp-modal-badge">CHI TIẾT GIẢI PHÁP</span>
              <h3 class="lp-modal-title">{{ selectedService?.title }}</h3>
              <p class="lp-modal-sub">{{ selectedService?.text }}</p>
            </div>

            <div class="lp-service-bullets">
              <div v-for="point in servicePoints" :key="point" class="lp-bullet-row">
                <span class="lp-bullet-check">✓</span>
                <span>{{ point }}</span>
              </div>
            </div>

            <button @click="navigateToCta(selectedService?.title)" class="lp-btn lp-btn--coral lp-btn--full lp-btn--lg" style="margin-top: 20px;">
              <span>Nhận tài liệu giải pháp qua Email</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>

          <!-- 6. GENERAL INFO / POLICY MODAL -->
          <div v-else-if="activeModal === 'info'" class="lp-modal-content">
            <div class="lp-auth-header">
              <span class="lp-modal-badge">THÔNG TIN CHÍNH THỨC</span>
              <h3 class="lp-modal-title">{{ infoTitle }}</h3>
            </div>
            <div class="lp-info-prose" v-html="infoBody" />
            <button @click="close" class="lp-btn lp-btn--outline lp-btn--full" style="margin-top: 18px;">
              <span>Đã hiểu & Đóng</span>
            </button>
          </div>

          <!-- 7. ALL SPEAKERS ROSTER MODAL -->
          <div v-else-if="activeModal === 'speakers'" class="lp-modal-content">
            <div class="lp-auth-header">
              <span class="lp-modal-badge">GƯƠNG MẶT ĐỒNG HÀNH & TRUYỀN CẢM HỨNG</span>
              <h3 class="lp-modal-title">Danh sách Diễn giả & Khách mời VIP ({{ speakers.length }})</h3>
              <p class="lp-modal-sub">
                Gặp gỡ các nhân vật tiêu biểu sẽ xuất hiện và chia sẻ tại chuỗi sự kiện của EventAZ.
              </p>
            </div>

            <!-- Role filter tabs -->
            <div class="lp-spk-modal-tabs">
              <button
                type="button"
                :class="['lp-spk-tab', { active: activeSpkTab === 'all' }]"
                @click="activeSpkTab = 'all'"
              >
                Tất cả ({{ speakers.length }})
              </button>
              <button
                type="button"
                :class="['lp-spk-tab', { active: activeSpkTab === 'speaker' }]"
                @click="activeSpkTab = 'speaker'"
              >
                Diễn giả ({{ speakers.filter(s => s.role === 'speaker').length }})
              </button>
              <button
                type="button"
                :class="['lp-spk-tab', { active: activeSpkTab === 'vip' }]"
                @click="activeSpkTab = 'vip'"
              >
                Khách VIP ({{ speakers.filter(s => s.role === 'vip').length }})
              </button>
              <button
                type="button"
                :class="['lp-spk-tab', { active: activeSpkTab === 'mc' }]"
                @click="activeSpkTab = 'mc'"
              >
                MC ({{ speakers.filter(s => s.role === 'mc').length }})
              </button>
            </div>

            <div class="lp-speakers-modal-list">
              <div
                v-for="spk in filteredSpeakers"
                :key="spk.id"
                class="lp-spk-modal-card"
              >
                <div class="lp-spk-modal-avatar-box">
                  <img
                    v-if="spk.avatar"
                    :src="spk.avatar"
                    :alt="spk.name"
                    class="lp-spk-modal-avatar"
                    loading="lazy"
                    referrerpolicy="no-referrer"
                  />
                  <div v-else class="lp-spk-modal-initials">{{ spk.initials }}</div>
                  <span :class="['lp-spk-modal-tag', `lp-spk-modal-tag--${spk.tone}`]">
                    {{ spk.role === 'mc' ? 'MC' : spk.role === 'vip' ? 'Khách VIP' : 'Diễn giả' }}
                  </span>
                </div>
                <div class="lp-spk-modal-details">
                  <div class="lp-spk-modal-header">
                    <h4>{{ spk.name }}</h4>
                    <span class="lp-spk-modal-event">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/></svg>
                      {{ spk.eventName }}
                    </span>
                  </div>
                  <p class="lp-spk-modal-bio">{{ spk.bio }}</p>
                  <a
                    href="javascript:void(0)"
                    class="lp-text-link lp-spk-modal-link"
                    @click="onSelectSpeakerEvent(spk)"
                  >
                    <span>Xem vé sự kiện</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <div class="lp-speakers-modal-footer">
              <button @click="navigateToCta()" class="lp-btn lp-btn--dark lp-btn--full lp-btn--lg">
                <span>Tạo sự kiện & Đăng ký diễn giả</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══════════════════════ TOAST NOTIFICATION ══════════════════════ -->
    <Transition name="lp-toast">
      <div v-if="toastVisible" class="lp-toast" role="alert">
        <span class="lp-toast-icon">✓</span>
        <span class="lp-toast-msg">{{ toastMessage }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import BaseDropdown from '../../components/base/BaseDropdown.vue'
import { speakers, events } from '../data/mockData.js'

const eventOptions = [
  { id: 'conf', label: 'Hội thảo & Hội nghị (Conference / Summit)' },
  { id: 'fest', label: 'Lễ hội âm nhạc & Trình diễn (Festival)' },
  { id: 'corp', label: 'Sự kiện doanh nghiệp (Corporate)' },
  { id: 'work', label: 'Workshop & Đào tạo chuyên sâu' },
  { id: 'other', label: 'Hình thức sự kiện khác' }
]

const activeModal = ref(null)
const authMode = ref('login')
const toastVisible = ref(false)
const toastMessage = ref('')

const activeSpkTab = ref('all')
const filteredSpeakers = computed(() => {
  if (activeSpkTab.value === 'all') return speakers
  return speakers.filter(s => s.role === activeSpkTab.value)
})

const leadForm = reactive({
  name: '',
  email: '',
  phone: '',
  eventType: 'Hội thảo & Hội nghị',
  note: ''
})
const planForm = reactive({ name: '', phone: '', org: '' })

const selectedEvent = ref(null)
const selectedPlan = ref(null)
const selectedService = ref(null)
const infoTitle = ref('')
const infoBody = ref('')

const ticketQty = ref(1)
const ticketTiers = [
  { id: 'standard', name: 'Vé Tiêu Chuẩn (Standard)', desc: 'Tham dự toàn bộ các phiên hội thảo & tài liệu số', price: 350000 },
  { id: 'vip', name: 'Vé VIP (All Access)', desc: 'Khu vực ngồi VIP hàng đầu, tiệc Networking & quà tặng độc quyền', price: 850000 },
  { id: 'early', name: 'Vé Early Bird (Ưu đãi)', desc: 'Dành riêng cho 100 người đăng ký sớm nhất', price: 250000 }
]
const selectedTier = ref(ticketTiers[0])

const howItWorksSteps = [
  { title: 'Khởi tạo sự kiện & Timeline', desc: 'Nhập thông tin cơ bản, phân quyền ban tổ chức và tự động tạo trang đích giới thiệu sự kiện đẹp mắt chỉ trong 3 phút.' },
  { title: 'Thiết lập vé & Run-of-Show số', desc: 'Cấu hình các hạng vé, mã giảm giá và số hoá kịch bản khung giờ chạy chương trình đồng bộ realtime.' },
  { title: 'Check-in QR & Điều phối thông minh', desc: 'Quét mã QR tại cổng trong 1 giây, theo dõi lưu lượng khách tham dự trực tiếp trên ứng dụng ban tổ chức.' },
  { title: 'Báo cáo tài chính & Kết nối sau sự kiện', desc: 'Tự động tổng hợp doanh thu, tỷ lệ có mặt thực tế và gửi thư cảm ơn/khảo sát ý kiến tự động.' }
]

const servicePoints = [
  'Đồng bộ dữ liệu thời gian thực giữa các thành viên ban tổ chức',
  'Giao diện trực quan, không cần cài đặt phần mềm phức tạp',
  'Bảo mật thông tin khách mời và đối tác theo tiêu chuẩn quốc tế',
  'Hỗ trợ kỹ thuật 24/7 trực tiếp qua chat và hotline chuyên trách'
]

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 3500)
}

const emit = defineEmits(['navigate-to-cta'])

function navigateToCta(eventType) {
  close()
  emit('navigate-to-cta', eventType)
}

function openAuth(mode = 'login') {
  navigateToCta()
}

function openTicket(evt) {
  selectedEvent.value = evt
  ticketQty.value = 1
  selectedTier.value = ticketTiers[0]
  activeModal.value = 'ticket'
}

function openPlan(plan) {
  selectedPlan.value = plan
  activeModal.value = 'plan'
}

function openService(svc) {
  selectedService.value = svc
  activeModal.value = 'service'
}

function openHowItWorks() {
  activeModal.value = 'howItWorks'
}

function openInfo(type) {
  const map = {
    terms: {
      title: 'Điều khoản sử dụng EventAZ',
      body: '<p>Chào mừng bạn đến với nền tảng EventAZ. Bằng việc truy cập hoặc sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các quy định về tổ chức sự kiện, bảo vệ quyền lợi người tham gia và pháp luật Việt Nam hiện hành.</p><p>EventAZ cam kết mang đến hạ tầng công nghệ ổn định với tỉ lệ uptime 99.9%.</p>'
    },
    privacy: {
      title: 'Chính sách bảo mật dữ liệu',
      body: '<p>EventAZ tôn trọng tuyệt đối quyền riêng tư của bạn và khách mời tham dự sự kiện. Tất cả thông tin liên hệ, thanh toán và vé điện tử đều được mã hóa đầu cuối (End-to-End Encryption).</p><p>Chúng tôi cam kết không bán hoặc chia sẻ dữ liệu cho bên thứ ba vì mục đích thương mại.</p>'
    },
    refund: {
      title: 'Chính sách hoàn & đổi vé',
      body: '<p>Khách mua vé có thể yêu cầu hoàn vé trước thời điểm diễn ra sự kiện tối thiểu 48 giờ. Trong trường hợp sự kiện bị hoãn hoặc hủy do lý do bất khả kháng, 100% giá trị vé sẽ được hoàn trả tự động vào tài khoản của bạn trong 3-5 ngày làm việc.</p>'
    },
    help: {
      title: 'Trung tâm trợ giúp EventAZ',
      body: '<p>Cần hỗ trợ gấp về kỹ thuật hoặc tổ chức sự kiện? Đội ngũ hỗ trợ của chúng tôi sẵn sàng 24/7 qua:</p><ul><li>Hotline: 1900 8888 (Miễn phí)</li><li>Email: support@eventaz.vn</li><li>Trực tiếp tại văn phòng Hà Nội & TP.HCM</li></ul>'
    },
    careers: {
      title: 'Tuyển dụng & Cơ hội nghề nghiệp',
      body: '<p>EventAZ đang tìm kiếm các kỹ sư phần mềm, chuyên gia giải pháp sự kiện và nhà thiết kế sản phẩm tài năng gia nhập đội ngũ. Gửi CV của bạn về <strong>careers@eventaz.vn</strong> để cùng kiến tạo tương lai ngành sự kiện!</p>'
    },
    blog: {
      title: 'EventAZ Insights & Blog',
      body: '<p>Khám phá các bài viết chuyên sâu về xu hướng tổ chức sự kiện lai (Hybrid Events), bí quyết tối ưu tỷ lệ tham dự sự kiện doanh nghiệp và các nghiên cứu điển hình từ những lễ hội hàng đầu.</p>'
    }
  }
  const info = map[type] || map.terms
  infoTitle.value = info.title
  infoBody.value = info.body
  activeModal.value = 'info'
}

function close() {
  activeModal.value = null
}

function submitLead() {
  const email = leadForm.email || 'bạn'
  close()
  showToast(`Đăng ký thành công! EventAZ đã gửi email tài liệu & xác nhận đến ${email}.`)
  leadForm.name = ''
  leadForm.email = ''
  leadForm.phone = ''
  leadForm.note = ''
}

function submitTicket() {
  close()
  showToast(`Đã nhận yêu cầu đặt ${ticketQty.value} vé! Hướng dẫn thanh toán đã gửi đến email của bạn.`)
}

function submitPlan() {
  close()
  showToast('Cảm ơn bạn! Chuyên gia tư vấn EventAZ sẽ gọi lại cho bạn trong vòng 15 phút.')
}

function openSpeakers() {
  activeModal.value = 'speakers'
}

function onSelectSpeakerEvent(spk) {
  const evt = events.find(e => e.id === spk.eventId) || events[0]
  openTicket(evt)
}

defineExpose({
  openAuth,
  openTicket,
  openPlan,
  openService,
  openHowItWorks,
  openInfo,
  openSpeakers,
  showToast,
  close
})
</script>

<style scoped>
.lp-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: grid;
  place-items: center;
  padding: 20px;
  overflow-y: auto;
}

.lp-modal-box {
  position: relative;
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 24px;
  padding: 36px 32px;
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.25);
  border: 1px solid rgba(220, 232, 239, 0.8);
  font-family: 'Inter', system-ui, sans-serif;
  color: #15213b;
  animation: lp-modal-pop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  transition: max-width 0.2s ease;
}
.lp-modal-box--wide {
  max-width: 680px;
}

@keyframes lp-modal-pop {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.lp-modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0;
  background: #f1f5f9;
  color: #64748b;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.2s;
}
.lp-modal-close:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.lp-modal-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: #ff7d68;
  margin-bottom: 6px;
}

.lp-modal-title {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.15;
  margin: 0 0 8px;
  color: #15213b;
}

.lp-modal-sub {
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 20px;
}

/* Select input */
.lp-select-input {
  height: 44px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
  background: #f8fafc;
  outline: none;
  font-family: inherit;
  color: #15213b;
  transition: border-color 0.2s;
}
.lp-select-input:focus {
  border-color: #ff7d68;
  background: #ffffff;
}

.lp-form-privacy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-top: 14px;
  font-size: 11px;
  color: #64748b;
  text-align: center;
}
.lp-form-privacy svg {
  color: #10b981;
  flex-shrink: 0;
}

/* Modal Action Buttons */
.lp-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: row !important;
  gap: 10px !important;
  border-radius: 999px !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  letter-spacing: -0.01em !important;
  min-height: 48px !important;
  padding: 0 24px !important;
  cursor: pointer !important;
  text-decoration: none !important;
  white-space: nowrap !important;
  transition: all 0.2s ease !important;
  box-sizing: border-box !important;
  line-height: 1 !important;
}
.lp-btn span {
  display: inline-block !important;
  line-height: 1 !important;
}
.lp-btn svg {
  flex-shrink: 0 !important;
  display: inline-block !important;
  margin: 0 !important;
}
.lp-btn--full {
  width: 100% !important;
}
.lp-btn--lg {
  min-height: 50px !important;
  padding: 0 26px !important;
  font-size: 14px !important;
}
.lp-btn--coral {
  background: #ff7d68 !important;
  color: #ffffff !important;
  border: 1.5px solid #ff7d68 !important;
  box-shadow: 0 4px 14px rgba(255,125,104,0.3) !important;
}
.lp-btn--coral:hover {
  background: #ff6850 !important;
  border-color: #ff6850 !important;
  box-shadow: 0 8px 24px rgba(255,125,104,0.45) !important;
  transform: translateY(-2px);
}
.lp-btn--dark {
  background: #15213b !important;
  color: #ffffff !important;
  border: 1.5px solid #15213b !important;
  box-shadow: 0 4px 14px rgba(21,33,59,0.2) !important;
}
.lp-btn--dark:hover {
  background: #1e2e50 !important;
  border-color: #1e2e50 !important;
  box-shadow: 0 8px 24px rgba(21,33,59,0.3) !important;
  transform: translateY(-2px);
}
.lp-btn--outline {
  background: #ffffff !important;
  border: 1.5px solid #dce8ef !important;
  color: #15213b !important;
  box-shadow: 0 2px 6px rgba(21,33,59,0.04) !important;
}
.lp-btn--outline:hover {
  background: #f8fafc !important;
  border-color: #15213b !important;
}
.lp-social-auth:hover {
  background: #f8fafc;
}

/* Ticket tiers */
.lp-ticket-tiers {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
}
.lp-tier-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s;
}
.lp-tier-card:hover {
  border-color: #ff7d68;
}
.lp-tier-card.active {
  border-color: #ff7d68;
  background: #fff8f6;
}
.lp-tier-info strong {
  display: block;
  font-size: 13px;
  color: #15213b;
}
.lp-tier-info small {
  display: block;
  font-size: 11px;
  color: #64748b;
}
.lp-tier-price {
  font-size: 15px;
  font-weight: 800;
  color: #ff7d68;
}
.lp-sr-only {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.lp-ticket-calc {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0 0;
  border-top: 1px solid #e2e8f0;
}
.lp-qty-control {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #64748b;
}
.lp-qty-btns {
  display: flex;
  align-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  overflow: hidden;
}
.lp-qty-btns button {
  width: 32px;
  height: 32px;
  border: 0;
  background: #f8fafc;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
.lp-qty-btns b {
  padding: 0 12px;
  font-size: 13px;
}
.lp-total-row {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.lp-total-row span {
  font-size: 11px;
  color: #94a3b8;
}
.lp-total-val {
  font-size: 18px;
  font-weight: 800;
  color: #15213b;
}

/* Timeline */
.lp-steps-timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
}
.lp-step-item {
  display: flex;
  gap: 14px;
}
.lp-step-num {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #35d5df;
  color: #15213b;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 12px;
  flex-shrink: 0;
}
.lp-step-body strong {
  display: block;
  font-size: 14px;
  color: #15213b;
  margin-bottom: 3px;
}
.lp-step-body p {
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

/* Service bullets */
.lp-service-bullets {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}
.lp-bullet-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #334155;
}
.lp-bullet-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #dffbfc;
  color: #20a7b1;
  display: grid;
  place-items: center;
  font-weight: bold;
  font-size: 12px;
  flex-shrink: 0;
}

/* Info prose */
.lp-info-prose {
  font-size: 13px;
  color: #475569;
  line-height: 1.65;
  text-align: left;
}
.lp-info-prose :deep(p) {
  margin: 0 0 12px;
}
.lp-info-prose :deep(ul) {
  padding-left: 20px;
  margin: 0 0 12px;
}

/* Speakers Modal */
.lp-spk-modal-tabs {
  display: flex;
  gap: 8px;
  margin-top: 14px;
  margin-bottom: 2px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.lp-spk-tab {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 6px 14px !important;
  border-radius: 999px !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  color: #64748b !important;
  background: #f1f5f9 !important;
  border: 1px solid #e2e8f0 !important;
  cursor: pointer !important;
  white-space: nowrap !important;
  transition: all 0.2s ease !important;
}
.lp-spk-tab:hover {
  background: #e2e8f0 !important;
  color: #15213b !important;
  border-color: #cbd5e1 !important;
}
.lp-spk-tab.active {
  background: #15213b !important;
  color: #ffffff !important;
  border-color: #15213b !important;
  box-shadow: 0 2px 6px rgba(21, 33, 59, 0.2) !important;
}

.lp-speakers-modal-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 4px;
  margin-top: 14px;
}
.lp-spk-modal-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}
.lp-spk-modal-card:hover {
  background: #ffffff;
  border-color: #ff7d68;
  box-shadow: 0 6px 20px rgba(21, 33, 59, 0.08);
}
.lp-spk-modal-avatar-box {
  position: relative;
  width: 58px;
  height: 58px;
  flex-shrink: 0;
}
.lp-spk-modal-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}
.lp-spk-modal-initials {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #15213b;
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 16px;
}
.lp-spk-modal-tag {
  position: absolute;
  bottom: -3px;
  right: -3px;
  font-size: 8px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 999px;
  text-transform: uppercase;
  color: #15213b;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.lp-spk-modal-tag--cyan { background: #35d5df; }
.lp-spk-modal-tag--coral { background: #ff7d68; color: #fff; }
.lp-spk-modal-tag--lilac { background: #b8a5ff; }
.lp-spk-modal-tag--yellow { background: #ffd84d; }

.lp-spk-modal-details {
  flex: 1;
  min-width: 0;
}
.lp-spk-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}
.lp-spk-modal-header h4 {
  font-size: 15px;
  font-weight: 800;
  color: #15213b;
  margin: 0;
}
.lp-spk-modal-event {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: #ff7d68;
  background: #fff0ed;
  padding: 2px 8px;
  border-radius: 999px;
  white-space: nowrap;
}
.lp-spk-modal-bio {
  font-size: 12px;
  color: #64748b;
  margin: 0 0 8px;
  line-height: 1.4;
}
.lp-spk-modal-link,
a.lp-spk-modal-link {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  color: #15213b !important;
  background: transparent !important;
  border: 0 !important;
  border-bottom: 1.5px solid #15213b !important;
  border-radius: 0 !important;
  padding: 0 0 2px 0 !important;
  margin-top: 4px !important;
  cursor: pointer !important;
  text-decoration: none !important;
  line-height: 1 !important;
  transition: gap 0.2s ease, opacity 0.2s ease, margin-left 0.2s ease !important;
}
.lp-spk-modal-link:hover,
a.lp-spk-modal-link:hover {
  gap: 12px !important;
  margin-left: -5px !important;
  opacity: 0.75 !important;
  color: #15213b !important;
  background: transparent !important;
}
.lp-speakers-modal-footer {
  margin-top: 18px;
}

/* Toast */
.lp-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: #15213b;
  color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-size: 13px;
  font-weight: 600;
}
.lp-toast-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #35d5df;
  color: #15213b;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 11px;
}

/* Transitions */
.lp-fade-enter-active,
.lp-fade-leave-active {
  transition: opacity 0.2s ease;
}
.lp-fade-enter-from,
.lp-fade-leave-to {
  opacity: 0;
}

.lp-toast-enter-active,
.lp-toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.lp-toast-enter-from,
.lp-toast-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
