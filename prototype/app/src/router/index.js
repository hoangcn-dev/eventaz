import { createRouter, createWebHashHistory } from 'vue-router';

// Landing Page (standalone, no shared nav/footer)
import LandingView from '../landing/LandingView.vue';

// Public Views
import HomeView from '../views/HomeView.vue';
import PublicEventsView from '../views/PublicEventsView.vue';
import PricingView from '../views/PricingView.vue';
import AboutView from '../views/AboutView.vue';

// Standalone Static Error Views (No Navbar, No Footer)
import NotFoundView from '../views/NotFoundView.vue';
import ForbiddenView from '../views/ForbiddenView.vue';
import MaintenanceView from '../views/MaintenanceView.vue';
import ServerErrorView from '../views/ServerErrorView.vue';

// Admin Views
import DashboardView from '../views/DashboardView.vue';
import OverviewView from '../views/OverviewView.vue';
import InfoView from '../views/InfoView.vue';
import WbsView from '../views/WbsView.vue';
import TemplatesView from '../views/TemplatesView.vue';
import OrgPersonnelView from '../views/OrgPersonnelView.vue';
import PersonnelView from '../views/PersonnelView.vue';
import TicketsView from '../views/TicketsView.vue';
import GuestsView from '../views/GuestsView.vue';
import DocumentsView from '../views/DocumentsView.vue';
import EquipmentView from '../views/EquipmentView.vue';
import TasksView from '../views/TasksView.vue';
import BudgetView from '../views/BudgetView.vue';
import MediaView from '../views/MediaView.vue';
import ApprovalsView from '../views/ApprovalsView.vue';
import RunOfShowView from '../views/RunOfShowView.vue';
import AdminApprovalsView from '../views/AdminApprovalsView.vue';

// Auth Views
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ForgotPasswordView from '../views/ForgotPasswordView.vue';
import ChangePasswordView from '../views/ChangePasswordView.vue';

import { getSession } from '../utils/auth';

const routes = [
  // Landing Page Route (standalone — manages its own header/footer)
  { path: '/landing', name: 'landing', component: LandingView, meta: { isLandingPage: true } },

  // Public Routes
  { path: '/', name: 'home', component: HomeView, meta: { isPublicPage: true } },
  { path: '/events', name: 'public-events', component: PublicEventsView, meta: { isPublicPage: true } },
  { path: '/pricing', name: 'pricing', component: PricingView, meta: { isPublicPage: true } },
  { path: '/about', name: 'about', component: AboutView, meta: { isPublicPage: true } },
  
  // Standalone Static Error Routes (No Navbar, No Footer)
  { path: '/not-found', name: 'not-found', component: NotFoundView, meta: { isErrorPage: true } },
  { path: '/access-denied', name: 'forbidden', component: ForbiddenView, meta: { isErrorPage: true } },
  { path: '/maintenance', name: 'maintenance', component: MaintenanceView, meta: { isErrorPage: true } },
  { path: '/server-error', name: 'server-error', component: ServerErrorView, meta: { isErrorPage: true } },

  // Auth Routes
  { path: '/login', name: 'login', component: LoginView, meta: { isAuthPage: true } },
  { path: '/register', name: 'register', component: RegisterView, meta: { isAuthPage: true } },
  { path: '/forgot-password', name: 'forgot-password', component: ForgotPasswordView, meta: { isAuthPage: true } },
  { path: '/change-password', name: 'change-password', component: ChangePasswordView, meta: { isAuthPage: true } },

  // Org Scope Routes (Admin / Management Layout)
  { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { isOrgScope: true } },
  { path: '/org-personnel', name: 'org-personnel', component: OrgPersonnelView, meta: { isOrgScope: true } },
  { path: '/admin/approvals', name: 'admin-approvals', component: AdminApprovalsView, meta: { isOrgScope: true } },
  { path: '/templates', name: 'templates', component: TemplatesView, meta: { isOrgScope: true } },

  // Event Scope Routes (Admin / Event Layout)
  { path: '/event/overview', name: 'event-overview', component: OverviewView, meta: { isEventScope: true, tab: 'overview' } },
  { path: '/event/info', name: 'event-info', component: InfoView, meta: { isEventScope: true, tab: 'info' } },
  { path: '/event/wbs', name: 'event-wbs', component: WbsView, meta: { isEventScope: true, tab: 'wbs' } },
  { path: '/event/run-of-show', name: 'event-run-of-show', component: RunOfShowView, meta: { isEventScope: true, tab: 'run-of-show' } },
  { path: '/event/approvals', name: 'event-approvals', component: ApprovalsView, meta: { isEventScope: true, tab: 'approvals' } },
  { path: '/event/budget', name: 'event-budget', component: BudgetView, meta: { isEventScope: true, tab: 'budget' } },
  { path: '/event/media', name: 'event-media', component: MediaView, meta: { isEventScope: true, tab: 'media' } },
  { path: '/event/tickets', name: 'event-tickets', component: TicketsView, meta: { isEventScope: true, tab: 'tickets' } },
  { path: '/event/guests', name: 'event-guests', component: GuestsView, meta: { isEventScope: true, tab: 'guests' } },
  { path: '/event/documents', name: 'event-documents', component: DocumentsView, meta: { isEventScope: true, tab: 'documents' } },
  { path: '/event/personnel', name: 'event-personnel', component: PersonnelView, meta: { isEventScope: true, tab: 'personnel' } },
  { path: '/event/equipment', name: 'event-equipment', component: EquipmentView, meta: { isEventScope: true, tab: 'equipment' } },
  { path: '/event/tasks', name: 'event-tasks', component: TasksView, meta: { isEventScope: true, tab: 'tasks' } },

  // Catch-all route for any unmapped URL (renders Standalone 404)
  { path: '/:pathMatch(.*)*', name: 'catch-all', component: NotFoundView, meta: { isErrorPage: true } }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const session = getSession();
  const isAuthPage = to.meta && to.meta.isAuthPage;
  const isPublicPage = to.meta && to.meta.isPublicPage;
  const isErrorPage = to.meta && to.meta.isErrorPage;

  if (!session && !isAuthPage && !isPublicPage && !isErrorPage) {
    next('/login');
  } else {
    next();
  }
});

export default router;
