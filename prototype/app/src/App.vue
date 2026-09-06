<template>
  <div class="bg-surface text-on-surface font-sans antialiased min-h-screen">
    <!-- Shared App Header -->
    <AppHeader v-if="!isAuthPage" @toggle-mobile-menu="handleToggleMobileMenu" />

    <!-- Shared App Left Sidebar -->
    <AppSidebar 
      v-if="!isAuthPage"
      ref="sidebarRef"
      @open-create-event="showCreateModal = true"
      @open-clone-event="showCloneModal = true"
      @sidebar-toggled="handleSidebarToggled"
    />

    <!-- Main Content Shell (Dynamically adjusts margin when Sidebar is collapsed) -->
    <main 
      id="main-content" 
      :class="[
        isAuthPage 
          ? 'pt-0 ml-0 min-h-screen' 
          : ['pt-16 min-h-screen transition-all duration-300', isSidebarCollapsed ? 'ml-0' : 'ml-0 lg:ml-[280px]']
      ]"
    >
      <!-- Event Scope Top Navigation Bar (Shown on Event Routes) -->
      <EventTopTabBar v-if="!isAuthPage" />

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

    <!-- Global Shared Modals -->
    <CreateEventModal :isOpen="showCreateModal" :isSidebarCollapsed="isSidebarCollapsed" @close="showCreateModal = false" />
    <CloneEventModal :isOpen="showCloneModal" @close="showCloneModal = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import EventTopTabBar from './components/EventTopTabBar.vue';
import CreateEventModal from './components/CreateEventModal.vue';
import CloneEventModal from './components/CloneEventModal.vue';

const route = useRoute();
const showCreateModal = ref(false);
const showCloneModal = ref(false);
const sidebarRef = ref(null);
const isSidebarCollapsed = ref(false);

const isAuthPage = computed(() => {
  return route.meta && route.meta.isAuthPage;
});

function handleToggleMobileMenu() {
  if (sidebarRef.value) {
    sidebarRef.value.toggleSidebar();
  }
}

function handleSidebarToggled(collapsed) {
  isSidebarCollapsed.value = collapsed;
}
</script>
