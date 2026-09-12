<template>
  <div class="bg-surface text-on-surface font-sans antialiased min-h-screen">
    <!-- Landing Page Layout Shell (self-contained, no shared nav/footer) -->
    <template v-if="isLandingPage">
      <router-view />
    </template>

    <!-- Public Layout Shell -->
    <template v-else-if="isPublicPage">
      <PublicHeader />
      <main class="pt-24 min-h-[calc(100vh-300px)]">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <PublicFooter />
    </template>

    <!-- Auth Layout Shell -->
    <template v-else-if="isAuthPage">
      <main class="min-h-screen">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </template>

    <!-- Standalone Error Layout Shell (No Navbar, No Footer) -->
    <template v-else-if="isErrorPage">
      <main class="min-h-screen bg-surface flex flex-col items-center justify-center relative p-4">
        <!-- Minimal Top Brand Header -->
        <div class="absolute top-6 left-6 flex items-center gap-2.5">
          <router-link to="/" class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-extrabold text-xl shadow-md">
              E
            </div>
            <div class="flex flex-col">
              <span class="font-black text-xl tracking-tight text-primary leading-none">EventAZ</span>
              <span class="text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase">Event Platform</span>
            </div>
          </router-link>
        </div>

        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </template>

    <!-- Admin / Management Layout Shell -->
    <template v-else>
      <!-- Shared App Header -->
      <AppHeader @toggle-mobile-menu="handleToggleMobileMenu" />

    <!-- Shared App Left Sidebar -->
    <AppSidebar 
      v-if="!isAuthPage"
      ref="sidebarRef"
      @open-create-event="showCreateModal = true"
      @open-clone-event="showCloneModal = true"
      @select-event="showCreateModal = false"
      @sidebar-toggled="handleSidebarToggled"
    />

      <!-- Main Content Shell -->
      <main 
        id="main-content" 
        :class="[
          'pt-16 min-h-screen transition-all duration-300',
          isSidebarCollapsed ? 'ml-0' : 'ml-0 lg:ml-[280px]'
        ]"
      >
        <!-- Event Scope Top Navigation Bar (Shown on Event Routes) -->
        <EventTopTabBar />

        <!-- View Router View -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component 
              :is="Component" 
              @open-create-event="showCreateModal = true"
              @open-clone-event="showCloneModal = true"
            />
          </transition>
        </router-view>
      </main>
    </template>

    <!-- Global Shared Modals -->
    <CreateEventModal :isOpen="showCreateModal" :isSidebarCollapsed="isSidebarCollapsed" @close="showCreateModal = false" />
    <CloneEventModal :isOpen="showCloneModal" @close="showCloneModal = false" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PublicHeader from './components/PublicHeader.vue';
import PublicFooter from './components/PublicFooter.vue';
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import EventTopTabBar from './components/EventTopTabBar.vue';
import CreateEventModal from './components/CreateEventModal.vue';
import CloneEventModal from './components/CloneEventModal.vue';
import { useTheme } from './composables/useTheme';

const route = useRoute();
const { initTheme } = useTheme();

const showCreateModal = ref(false);
const showCloneModal = ref(false);
const sidebarRef = ref(null);
const isSidebarCollapsed = ref(false);

// Tự động ẩn trang/modal tạo mới sự kiện khi chọn hoặc chuyển sang bất kỳ sự kiện nào
watch(() => route.path, () => {
  showCreateModal.value = false;
  showCloneModal.value = false;
});

const isPublicPage = computed(() => {
  return route.meta && route.meta.isPublicPage;
});

const isLandingPage = computed(() => {
  return route.meta && route.meta.isLandingPage;
});

const isAuthPage = computed(() => {
  return route.meta && route.meta.isAuthPage;
});

const isErrorPage = computed(() => {
  return route.meta && route.meta.isErrorPage;
});

function handleToggleMobileMenu() {
  if (sidebarRef.value) {
    sidebarRef.value.toggleSidebar();
  }
}

function handleSidebarToggled(collapsed) {
  isSidebarCollapsed.value = collapsed;
}

onMounted(() => {
  initTheme();
});
</script>
