<template>
  <!-- Port of DashboardVisual + orbit/confetti decorations from page.tsx -->
  <div class="hero-visual" aria-label="Bảng điều khiển quản lý sự kiện EventAZ" role="img">
    <!-- Orbit rings -->
    <div class="orbit orbit-one" />
    <div class="orbit orbit-two" />

    <!-- Confetti chips -->
    <span class="confetti confetti-a" />
    <span class="confetti confetti-b" />
    <span class="confetti confetti-c" />

    <!-- Float card: attendees -->
    <div class="float-card attendee-card">
      <span class="mini-icon cyan-bg">
        <!-- users icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </span>
      <div>
        <strong>2,840</strong>
        <small>khách tham dự</small>
      </div>
      <span class="trend">+24%</span>
    </div>

    <!-- Dashboard card -->
    <div class="dashboard-card">
      <div class="dash-top">
        <span class="dash-dot" />
        <span class="dash-dot" />
        <span class="dash-dot" />
        <span class="dash-label">EVENT DASHBOARD</span>
        <span class="dash-menu">•••</span>
      </div>

      <div class="dash-heading">
        <div>
          <small>Xin chào, Linh</small>
          <h3>Ngày hội của bạn</h3>
        </div>
        <span class="live-pill"><i /> Live</span>
      </div>

      <div class="event-preview">
        <!-- Inline art illustration -->
        <div class="event-art">
          <span class="art-sun" />
          <span class="art-stage" />
          <span class="art-light light-one" />
          <span class="art-light light-two" />
          <span class="art-person" />
        </div>
        <div class="event-info">
          <span class="event-tag">SỰ KIỆN NỔI BẬT</span>
          <strong>Vibe Festival 2024</strong>
          <small>
            <!-- calendar icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            24.08.2024 · Hà Nội
          </small>
        </div>
      </div>

      <div class="dash-stats">
        <div>
          <small>Vé đã bán</small>
          <strong>1,284 <em>/ 2,000</em></strong>
          <div class="progress"><i /></div>
        </div>
        <div class="stat-number">
          <small>Doanh thu</small>
          <strong>486M</strong>
          <span>+18.6%</span>
        </div>
      </div>
    </div>

    <!-- Float card: calendar -->
    <div class="float-card calendar-card">
      <div class="calendar-head">
        <span>THÁNG 08</span>
        <!-- chevron-down icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
      <div class="calendar-grid">
        <b v-for="day in ['T2','T3','T4','T5','T6','T7','CN']" :key="day">{{ day }}</b>
        <span
          v-for="n in 14"
          :key="n"
          :class="{ 'selected-day': n === 10 }"
        >{{ n }}</span>
      </div>
    </div>

    <!-- Float card: check-in -->
    <div class="float-card checkin-card">
      <span class="check-icon-circle">
        <!-- check icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      <div>
        <strong>Check-in thành công</strong>
        <small>Nguyễn Minh Anh</small>
      </div>
    </div>
  </div>
</template>

<script setup>
// No reactive state needed — purely presentational
</script>
