<template>
  <main id="top" class="lp-shell">

    <!-- ══════════════════════ HEADER ══════════════════════ -->
    <header :class="['lp-header', { 'lp-header--scrolled': scrolled }]">
      <div class="lp-container lp-nav">
        <a href="javascript:void(0)" @click="scrollToSection('top', $event)" class="lp-logo" aria-label="EventAZ">
          <span class="lp-logo-mark">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </span>
          <span>event<span class="lp-logo-accent">AZ</span></span>
        </a>

        <nav :class="['lp-nav-links', { 'lp-nav-links--open': menuOpen }]">
          <a href="javascript:void(0)" @click="scrollToSection('features', $event)">Tính năng</a>
          <a href="javascript:void(0)" @click="scrollToSection('events', $event)">Sự kiện</a>
          <a href="javascript:void(0)" @click="scrollToSection('speakers', $event)">Diễn giả</a>
          <a href="javascript:void(0)" @click="scrollToSection('pricing', $event)">Bảng giá</a>
        </nav>

        <div class="lp-nav-actions">
          <button class="lp-btn lp-btn--dark lp-btn--sm" @click="scrollToSection('cta', $event)">
            <span>Bắt đầu miễn phí</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
          <button class="lp-hamburger" @click="menuOpen=!menuOpen" :aria-expanded="menuOpen">
            <span :class="['lp-hamburger-bar', { 'lp-hamburger-bar--open': menuOpen }]" />
          </button>
        </div>
      </div>
    </header>

    <!-- ══════════════════════ HERO ══════════════════════ -->
    <section class="lp-hero" id="hero">
      <div class="lp-hero-grid" aria-hidden="true" />
      <!-- Ambient blobs -->
      <div class="lp-blob lp-blob--a" aria-hidden="true" />
      <div class="lp-blob lp-blob--b" aria-hidden="true" />

      <div class="lp-container lp-hero-inner">
        <!-- Left copy -->
        <div class="lp-hero-copy lp-anim-rise">
          <div class="lp-eyebrow">
            <span class="lp-eyebrow-dot" />
            Nền tảng quản lý sự kiện thế hệ mới
          </div>
          <h1 class="lp-hero-h1">
            Ý tưởng lớn.<br>
            <span class="lp-text-coral">Sự kiện bùng nổ.</span>
          </h1>
          <p class="lp-hero-desc">
            EventAZ giúp bạn biến mọi ý tưởng thành những trải nghiệm đáng nhớ —
            từ kế hoạch đầu tiên đến khoảnh khắc cuối cùng.
          </p>

          <div class="lp-hero-actions">
            <button class="lp-btn lp-btn--dark lp-btn--lg" @click="scrollToSection('cta', $event)">
              <span>Tạo sự kiện miễn phí</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button class="lp-play-link" @click="openHowItWorks($event)">
              <span class="lp-play-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              </span>
              Xem cách hoạt động
            </button>
          </div>

          <div class="lp-social-proof">
            <div class="lp-avatars">
              <span style="background:#ff7d68">ST</span>
              <span style="background:#6e94ed">TT</span>
              <span style="background:#4bc4a0">HN</span>
              <span style="background:#15213b">+2k</span>
            </div>
            <span><strong>2,000+</strong> nhà tổ chức đang tin dùng</span>
          </div>
        </div>

        <!-- Right: Gallery 3D -->
        <div class="lp-hero-art lp-anim-rise lp-anim-rise--delay">
          <div class="lp-gallery-shell">
            <GalleryCanvas :speed="1" :scale="1" :opacity="1" />
            <div class="lp-gallery-overlay" aria-hidden="true">
              <span class="lp-gallery-kicker">EVENTAZ / LIVE ARCHIVE</span>
              <div class="lp-gallery-title">Real events.<br><span>Real moments.</span></div>
              <div class="lp-gallery-footer">
                <span>04 / event stories</span>
                <span class="lp-gallery-dot" />
                <span>Khoảnh khắc sự kiện</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trusted by strip -->
      <div class="lp-trusted lp-container">
        <span class="lp-trusted-label">Được tin dùng bởi</span>
        <div class="lp-trusted-logos">
          <b>VIBELAB</b>
          <b class="lp-serif">MỘC.</b>
          <b>northstar</b>
          <b class="lp-light">SỰ KIỆN VIỆT</b>
          <b>SAIGON EVENTS</b>
        </div>
      </div>
    </section>

    <!-- ══════════════════════ FEATURED EVENT ══════════════════════ -->
    <section id="events" class="lp-section lp-featured-section">
      <div class="lp-container">
        <div class="lp-section-head lp-split-head">
          <div>
            <span class="lp-kicker">ĐANG ĐƯỢC QUAN TÂM</span>
            <h2 class="lp-section-h2">Những trải nghiệm<br><span class="lp-text-coral">đang diễn ra.</span></h2>
          </div>
          <a class="lp-text-link" href="javascript:void(0)" @click="openTicket(featuredEvent, $event)">
            <span>Khám phá tất cả</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>

        <div class="lp-featured-card" v-if="featuredEvent">
          <!-- Art side: Interactive 3D Sketchbook -->
          <div class="lp-featured-art">
            <SketchbookBook />
          </div>

          <!-- Detail side -->
          <div class="lp-featured-detail">
            <div class="lp-event-badge">
              <span class="lp-event-badge-dot" />
              ĐANG DIỄN RA
              <span class="lp-event-badge-sep">•</span>
              {{ daysUntil > 0 ? daysUntil + ' NGÀY NỮA' : 'HÔM NAY' }}
            </div>
            <h3 class="lp-featured-title">{{ featuredEvent.title }}</h3>
            <p class="lp-featured-desc">{{ featuredEvent.description }}</p>

            <div class="lp-event-meta">
              <span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                {{ formatDate(featuredEvent.startDate) }}
              </span>
              <span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                {{ featuredEvent.location }}
              </span>
              <span v-if="featuredEvent.ticketPriceFrom">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
                Từ {{ featuredEvent.ticketPriceFrom.toLocaleString('vi-VN') }}₫
              </span>
            </div>

            <div class="lp-featured-actions">
              <button class="lp-btn lp-btn--coral lp-btn--lg" @click="openTicket(featuredEvent, $event)">
                Xem chi tiết & Mua vé
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
              <div class="lp-ticket-count">
                <span class="lp-ticket-count-bar" />
                <span>1,284 / 2,000 vé đã bán</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════ SERVICES ══════════════════════ -->
    <section id="features" class="lp-section lp-services-section">
      <div class="lp-container">
        <div class="lp-section-head lp-center-head">
          <span class="lp-kicker">MỌI THỨ BẠN CẦN</span>
          <h2 class="lp-section-h2">Một nền tảng.<br><span class="lp-text-coral">Vô vàn khả năng.</span></h2>
          <p class="lp-section-sub">Từ ý tưởng đến thực tế, EventAZ đồng hành cùng bạn ở mọi bước để tạo nên sự kiện không thể quên.</p>
        </div>

        <div class="lp-services-grid">
          <article
            v-for="(svc, idx) in services"
            :key="svc.title"
            :class="['lp-svc-card', `lp-svc-card--${svc.color}`]"
            @mouseenter="svc._hover = true"
            @mouseleave="svc._hover = false"
          >
            <div class="lp-svc-icon" v-html="svc.iconSvg" />
            <h3 class="lp-svc-title">{{ svc.title }}</h3>
            <p class="lp-svc-desc">{{ svc.text }}</p>
            <a class="lp-svc-link" href="javascript:void(0)" @click="openService(svc, $event)">
              Tìm hiểu thêm
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <span class="lp-svc-num">0{{ idx + 1 }}</span>
          </article>
        </div>
      </div>
    </section>

    <!-- ══════════════════════ SPEAKERS ══════════════════════ -->
    <section id="speakers" class="lp-section lp-speakers-section">
      <div class="lp-container lp-speakers-layout">
        <div class="lp-speaker-copy">
          <span class="lp-kicker">NHỮNG NGƯỜI TẠO NÊN</span>
          <h2 class="lp-section-h2">Gặp gỡ những<br><span class="lp-text-coral">người truyền cảm hứng.</span></h2>
          <p>Không chỉ là một sự kiện, đó là những câu chuyện được kể bởi những con người dám nghĩ khác.</p>
          <div class="lp-speaker-tags">
            <span class="lp-tag lp-tag--cyan">Diễn giả</span>
            <span class="lp-tag lp-tag--coral">Khách mời VIP</span>
            <span class="lp-tag lp-tag--lilac">MC chuyên nghiệp</span>
          </div>
          <a class="lp-text-link" href="javascript:void(0)" @click="openAllSpeakers($event)">
            <span>Xem tất cả gương mặt</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>

        <div class="lp-speakers-grid">
          <article
            v-for="spk in featuredSpeakers"
            :key="spk.id"
            :class="['lp-spk-card', `lp-spk-card--${spk.tone}`]"
          >
            <div class="lp-spk-portrait">
              <div class="lp-spk-shape">
                <span class="lp-spk-initials">{{ spk.initials }}</span>
                <img
                  v-if="spk.avatar"
                  :src="spk.avatar"
                  :alt="spk.name"
                  class="lp-spk-img"
                  loading="lazy"
                  referrerpolicy="no-referrer"
                />
              </div>
            </div>
            <div class="lp-spk-info">
              <strong>{{ spk.name }}</strong>
              <small>
                {{ spk.role === 'mc' ? 'MC' : spk.role === 'vip' ? 'Khách mời VIP' : 'Diễn giả' }}
              </small>
              <span class="lp-spk-event">{{ spk.eventName }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ══════════════════════ METRICS ══════════════════════ -->
    <section class="lp-metrics-section" ref="metricsRef">
      <div class="lp-metrics-bg-beam" aria-hidden="true" />
      <div class="lp-container lp-metrics-grid">
        <div v-for="(stat, i) in statsConfig" :key="stat.label" class="lp-metric-item">
          <strong>{{ animatedVals[i] }}{{ stat.suffix }}<span class="lp-metric-accent">{{ stat.accent }}</span></strong>
          <small>{{ stat.label }}</small>
        </div>
      </div>
    </section>

    <!-- ══════════════════════ PRICING ══════════════════════ -->
    <section id="pricing" class="lp-section lp-pricing-section">
      <div class="lp-container">
        <div class="lp-section-head lp-split-head">
          <div>
            <span class="lp-kicker">CHỌN GÓI CỦA BẠN</span>
            <h2 class="lp-section-h2">Sẵn sàng để<br><span class="lp-text-coral">tạo khác biệt?</span></h2>
          </div>
          <p class="lp-pricing-note">Bắt đầu miễn phí, nâng cấp khi bạn sẵn sàng.<br>Không phí ẩn, không ràng buộc.</p>
        </div>

        <div class="lp-pricing-grid">
          <article
            v-for="plan in pricingPlans"
            :key="plan.id"
            :class="['lp-price-card', { 'lp-price-card--featured': plan.highlighted }]"
          >
            <span v-if="plan.highlighted" class="lp-popular-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/></svg>
              ĐƯỢC YÊU THÍCH NHẤT
            </span>
            <span class="lp-plan-name">{{ plan.name }}</span>
            <h3 class="lp-plan-price">
              {{ plan.price }}<small v-if="plan.period">{{ plan.period }}</small>
            </h3>
            <p class="lp-plan-desc">{{ plan.desc }}</p>
            <ul class="lp-plan-features">
              <li v-for="feat in plan.features" :key="feat">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
                {{ feat }}
              </li>
            </ul>
            <button
              :class="['lp-btn', 'lp-btn--full', plan.highlighted ? 'lp-btn--coral' : 'lp-btn--outline']"
              @click="openPlan(plan, $event)"
            >
              {{ plan.name === 'Studio' ? 'Liên hệ tư vấn' : (plan.highlighted ? 'Dùng thử Pro ngay' : 'Chọn gói này') }}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </article>
        </div>
      </div>
    </section>

    <!-- ══════════════════════ PARTNERS MARQUEE ══════════════════════ -->
    <section class="lp-partners-section">
      <div class="lp-container">
        <span class="lp-kicker" style="display:block;text-align:center;margin-bottom:24px;">ĐỐI TÁC & NHÀ CUNG CẤP</span>
      </div>
      <div class="lp-marquee-wrap" aria-label="Các đối tác của EventAZ">
        <div class="lp-marquee-track">
          <div class="lp-marquee-content">
            <span v-for="p in partners" :key="`c1-${p.id}`" class="lp-partner-chip">
              <span class="lp-partner-logo" v-html="p.logoSvg" />
              <span>{{ p.logoText }}</span>
            </span>
          </div>
          <div class="lp-marquee-content" aria-hidden="true">
            <span v-for="p in partners" :key="`c2-${p.id}`" class="lp-partner-chip">
              <span class="lp-partner-logo" v-html="p.logoSvg" />
              <span>{{ p.logoText }}</span>
            </span>
          </div>
          <div class="lp-marquee-content" aria-hidden="true">
            <span v-for="p in partners" :key="`c3-${p.id}`" class="lp-partner-chip">
              <span class="lp-partner-logo" v-html="p.logoSvg" />
              <span>{{ p.logoText }}</span>
            </span>
          </div>
          <div class="lp-marquee-content" aria-hidden="true">
            <span v-for="p in partners" :key="`c4-${p.id}`" class="lp-partner-chip">
              <span class="lp-partner-logo" v-html="p.logoSvg" />
              <span>{{ p.logoText }}</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════ CTA ══════════════════════ -->
    <section id="cta" class="lp-cta-section">
      <div class="lp-cta-grid" aria-hidden="true" />
      <div class="lp-cta-orbit lp-cta-orbit--a" aria-hidden="true" />
      <div class="lp-cta-orbit lp-cta-orbit--b" aria-hidden="true" />
      <div class="lp-container lp-cta-inner">
        <div class="lp-cta-spark">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        </div>
        <h2 class="lp-cta-h2">Sự kiện tiếp theo<br><span>sẽ là của bạn.</span></h2>
        <p class="lp-cta-sub">Điền thông tin bên dưới để nhận bộ tài liệu giải pháp và email tư vấn thiết lập sự kiện riêng cho bạn.</p>

        <!-- Form đăng ký nhận tư vấn trực tiếp trên Landing Page -->
        <div class="lp-lead-box">
          <form @submit.prevent="submitInlineLead" class="lp-lead-form">
            <div class="lp-lead-grid">
              <div class="lp-lead-field">
                <label>Họ và tên của bạn</label>
                <input v-model="inlineLead.name" type="text" placeholder="Nguyễn Văn A" required />
              </div>
              <div class="lp-lead-field">
                <label>Email nhận tài liệu</label>
                <input v-model="inlineLead.email" type="email" placeholder="name@company.com" required />
              </div>
              <div class="lp-lead-field">
                <label>Số điện thoại liên hệ</label>
                <input v-model="inlineLead.phone" type="tel" placeholder="0901 234 567" required />
              </div>
              <div class="lp-lead-field">
                <label>Loại sự kiện quan tâm</label>
                <BaseDropdown
                  :items="eventOptions"
                  :match-width="true"
                  placement="bottom-start"
                  @select="(item) => inlineLead.eventType = item.label"
                  class="w-full"
                >
                  <template #trigger="{ isOpen, toggle }">
                    <button
                      type="button"
                      @click.stop="toggle"
                      :class="['lp-lead-dropdown-trigger', { 'is-open': isOpen }]"
                    >
                      <span>{{ inlineLead.eventType || 'Chọn loại sự kiện...' }}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" :class="['lp-dropdown-chevron', { 'rotate-180': isOpen }]">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </button>
                  </template>
                </BaseDropdown>
              </div>
            </div>

            <div class="lp-lead-action">
              <button type="submit" class="lp-btn lp-btn--coral lp-btn--lg lp-lead-submit">
                <span>Gửi thông tin nhận tài liệu qua Email</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>

            <div class="lp-lead-security">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Cam kết bảo mật 100%. Thông tin hướng dẫn sẽ được gửi tự động về email của bạn.</span>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- ══════════════════════ FOOTER ══════════════════════ -->
    <footer class="lp-footer">
      <div class="lp-container lp-footer-top">
        <div class="lp-footer-brand">
          <a href="javascript:void(0)" @click="scrollToSection('top', $event)" class="lp-logo">
            <span class="lp-logo-mark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </span>
            <span>event<span class="lp-logo-accent">AZ</span></span>
          </a>
          <p>Nơi những ý tưởng<br>trở thành trải nghiệm.</p>
          <div class="lp-footer-socials">
            <a href="javascript:void(0)" @click="handleSocialClick('Facebook', $event)" aria-label="Facebook" class="lp-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="javascript:void(0)" @click="handleSocialClick('Instagram', $event)" aria-label="Instagram" class="lp-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="javascript:void(0)" @click="handleSocialClick('LinkedIn', $event)" aria-label="LinkedIn" class="lp-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        <div class="lp-footer-links">
          <div>
            <strong>Sản phẩm</strong>
            <a href="javascript:void(0)" @click="scrollToSection('features', $event)">Tính năng</a>
            <a href="javascript:void(0)" @click="scrollToSection('pricing', $event)">Bảng giá</a>
            <a href="javascript:void(0)" @click="scrollToSection('events', $event)">Khám phá sự kiện</a>
            <a href="javascript:void(0)" @click="openTicket(featuredEvent, $event)">Tất cả sự kiện</a>
          </div>
          <div>
            <strong>Công ty</strong>
            <a href="javascript:void(0)" @click="scrollToSection('speakers', $event)">Về chúng tôi</a>
            <a href="javascript:void(0)" @click="openInfo('blog', $event)">Blog</a>
            <a href="javascript:void(0)" @click="openPlan({ name: 'Studio', price: 'Liên hệ' }, $event)">Liên hệ</a>
            <a href="javascript:void(0)" @click="openInfo('careers', $event)">Tuyển dụng</a>
          </div>
          <div>
            <strong>Hỗ trợ</strong>
            <a href="javascript:void(0)" @click="openInfo('help', $event)">Trung tâm trợ giúp</a>
            <a href="javascript:void(0)" @click="openInfo('terms', $event)">Điều khoản sử dụng</a>
            <a href="javascript:void(0)" @click="openInfo('privacy', $event)">Chính sách bảo mật</a>
            <a href="javascript:void(0)" @click="openInfo('refund', $event)">Chính sách hoàn vé</a>
          </div>
        </div>
      </div>

      <div class="lp-container lp-footer-bottom">
        <span>© 2024 EventAZ. Made for memorable moments.</span>
        <span class="lp-footer-bottom-links">
          <a href="javascript:void(0)" @click="openInfo('terms', $event)">Điều khoản</a>
          <span class="lp-dot-sep" />
          <a href="javascript:void(0)" @click="openInfo('privacy', $event)">Bảo mật</a>
          <span class="lp-dot-sep" />
          <a href="javascript:void(0)" @click="openInfo('terms', $event)">Cookie</a>
        </span>
      </div>
    </footer>

    <!-- Interactive modals & toast (Keeps landing page completely standalone) -->
    <LandingModals ref="modalsRef" @navigate-to-cta="handleNavigateToCta" />

  </main>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import GalleryCanvas from './components/GalleryCanvas.vue'
import SketchbookBook from './components/SketchbookBook.vue'
import LandingModals from './components/LandingModals.vue'
import BaseDropdown from '../components/base/BaseDropdown.vue'
import { events, speakers, pricingPlans, partners } from './data/mockData.js'

const eventOptions = [
  { id: 'conf', label: 'Hội thảo & Hội nghị (Conference)' },
  { id: 'fest', label: 'Lễ hội âm nhạc & Trình diễn (Festival)' },
  { id: 'corp', label: 'Sự kiện doanh nghiệp (Corporate)' },
  { id: 'work', label: 'Workshop & Đào tạo chuyên sâu' },
  { id: 'other', label: 'Hình thức sự kiện khác' }
]

const featuredSpeakers = computed(() => speakers.slice(0, 4))

// ── Modals reference ─────────────────────────────────────
const modalsRef = ref(null)

// ── Header scroll state ──────────────────────────────────
const scrolled = ref(false)
const menuOpen = ref(false)
function onScroll() { scrolled.value = window.scrollY > 32 }

// ── Smooth In-page Navigation (Prevents Hash 404) ────────
function scrollToSection(id, event) {
  if (event) event.preventDefault()
  menuOpen.value = false
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(id)
  if (el) {
    const headerOffset = 76
    const elPosition = el.getBoundingClientRect().top
    const offsetPosition = elPosition + window.pageYOffset - headerOffset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// ── Inline Lead Form Handler ──────────────────────────────
const inlineLead = reactive({
  name: '',
  email: '',
  phone: '',
  eventType: 'Hội thảo & Hội nghị'
})

function submitInlineLead() {
  const email = inlineLead.email || 'bạn'
  modalsRef.value?.showToast(`Đăng ký thành công! EventAZ đã gửi email tài liệu & xác nhận đến ${email}.`)
  inlineLead.name = ''
  inlineLead.email = ''
  inlineLead.phone = ''
}

// ── Navigation to CTA Form ────────────────────────────────
function handleNavigateToCta(serviceTitle) {
  scrollToSection('cta')
  setTimeout(() => {
    const firstInput = document.querySelector('#cta input')
    if (firstInput) {
      firstInput.focus()
    }
  }, 450)
}

// ── Modal Handlers ────────────────────────────────────────
function openAuth(mode = 'register', event) {
  if (event) event.preventDefault()
  menuOpen.value = false
  handleNavigateToCta()
}

function openTicket(evt, event) {
  if (event) event.preventDefault()
  modalsRef.value?.openTicket(evt || featuredEvent)
}

function openAllSpeakers(event) {
  if (event) event.preventDefault()
  modalsRef.value?.openSpeakers()
}

function openPlan(plan, event) {
  if (event) event.preventDefault()
  modalsRef.value?.openPlan(plan)
}

function openService(svc, event) {
  if (event) event.preventDefault()
  modalsRef.value?.openService(svc)
}

function openHowItWorks(event) {
  if (event) event.preventDefault()
  modalsRef.value?.openHowItWorks()
}

function openInfo(type, event) {
  if (event) event.preventDefault()
  modalsRef.value?.openInfo(type)
}

function handleSocialClick(platform, event) {
  if (event) event.preventDefault()
  modalsRef.value?.showToast(`Đang kết nối đến kênh truyền thông ${platform} của EventAZ...`)
}

// ── Featured event (random ongoing) ─────────────────────
const ongoingEvents  = events.filter(e => e.status === 'ongoing')
const featuredEvent  = ongoingEvents[Math.floor(Math.random() * ongoingEvents.length)] ?? events[0]

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
const featuredDay   = computed(() => new Date(featuredEvent.startDate).getDate())
const featuredMonth = computed(() => new Date(featuredEvent.startDate).getMonth() + 1)
const daysUntil     = computed(() => {
  const diff = Math.ceil((new Date(featuredEvent.startDate) - new Date()) / 86400000)
  return diff > 0 ? diff : 0
})

// ── Services ─────────────────────────────────────────────
const services = [
  {
    color: 'cyan',
    title: 'Lập kế hoạch toàn diện',
    text: 'Biến mọi ý tưởng thành timeline rõ ràng, đẹp mắt và dễ phối hợp với cả đội ngũ.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>`,
  },
  {
    color: 'coral',
    title: 'Bán vé thông minh',
    text: 'Tạo hạng vé, mã ưu đãi, vé QR và theo dõi doanh thu realtime ngay trên một màn hình.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>`,
  },
  {
    color: 'lilac',
    title: 'Kết nối cộng đồng',
    text: 'Quản lý khách mời, diễn giả, check-in QR tức thì và gửi thông báo liền mạch.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  },
  {
    color: 'cyan',
    title: 'Run-of-Show số hoá',
    text: 'Kịch bản sự kiện theo khung giờ, cập nhật realtime, xử lý sự cố ngay tại chỗ.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  },
  {
    color: 'coral',
    title: 'Quản lý ngân sách',
    text: 'Dự toán, thực chi, cảnh báo vượt ngân sách — mọi con số đều minh bạch và trực quan.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  },
  {
    color: 'lilac',
    title: 'Báo cáo & Thống kê',
    text: 'Dashboard trực quan sau sự kiện: doanh thu, tỉ lệ tham dự, hài lòng khách hàng.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
  },
]

// ── Count-up stats ────────────────────────────────────────
const statsConfig = [
  { to: 10,   suffix: 'K', accent: '+',  label: 'Sự kiện đã tạo'        },
  { to: 98,   suffix: '',  accent: '%',  label: 'Mức độ hài lòng'        },
  { to: 2,    suffix: 'M', accent: '+',  label: 'Người tham dự'          },
  { to: 24,   suffix: '',  accent: '/7', label: 'Luôn sẵn sàng hỗ trợ'  },
]
const animatedVals  = ref([0, 0, 0, 0])
const metricsRef    = ref(null)
let hasAnimated     = false
let metricsObserver = null

function startCountUp() {
  if (hasAnimated) return
  hasAnimated = true
  const DURATION = 1800 // ms
  const t0 = performance.now()

  function frame(now) {
    const elapsed   = now - t0
    const progress  = Math.min(elapsed / DURATION, 1)
    const ease      = 1 - Math.pow(1 - progress, 3)   // cubic ease-out
    animatedVals.value = statsConfig.map(s => Math.round(s.to * ease))
    if (progress < 1) {
      requestAnimationFrame(frame)
    } else {
      animatedVals.value = statsConfig.map(s => s.to)
    }
  }
  requestAnimationFrame(frame)
}

// ── Lifecycle ─────────────────────────────────────────────
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })

  if (metricsRef.value) {
    metricsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCountUp()
          metricsObserver.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    metricsObserver.observe(metricsRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (metricsObserver) metricsObserver.disconnect()
})
</script>

<style>
@import './assets/landing.css';
</style>
