import { createRouter, createWebHashHistory } from 'vue-router';

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

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { isOrgScope: true } },
  { path: '/org-personnel', name: 'org-personnel', component: OrgPersonnelView, meta: { isOrgScope: true } },
  { path: '/admin/approvals', name: 'admin-approvals', component: AdminApprovalsView, meta: { isOrgScope: true } },
  { path: '/templates', name: 'templates', component: TemplatesView, meta: { isOrgScope: true } },

  // Event Scope Routes
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
  { path: '/event/tasks', name: 'event-tasks', component: TasksView, meta: { isEventScope: true, tab: 'tasks' } }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
