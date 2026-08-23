<template>
  <div class="bg-white rounded-xl border border-outline-variant/60 shadow-sm p-4 space-y-4 font-sans text-xs">
    <!-- 1. HEADER SECTION (Title, Active Filter Tags, Utility Actions) -->
    <div class="flex flex-wrap justify-between items-start gap-3">
      <!-- Left: Icon, Title & Filter Condition Tags -->
      <div class="space-y-2">
        <slot name="header-title">
          <h3 v-if="title" class="font-extrabold text-base text-on-surface flex items-center gap-2">
            <span v-if="icon" class="material-symbols-outlined text-primary">{{ icon }}</span>
            <span>{{ title }}</span>
          </h3>
          <p v-if="subtitle" class="text-xs text-on-surface-variant mt-0.5">
            {{ subtitle }}
          </p>
        </slot>

        <!-- ACTIVE FILTER TAGS BAR (Auto-rendered under title) -->
        <div v-if="activeFilterTags.length > 0" class="flex flex-wrap items-center gap-2 pt-1">
          <div 
            v-for="tag in activeFilterTags" 
            :key="tag.key"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-high border border-outline-variant/80 text-xs shadow-2xs transition-all hover:border-outline-variant"
          >
            <!-- 1. Tên trường (Màu xám) -->
            <span class="text-on-surface-variant text-[11px] font-medium">{{ tag.fieldName }}:</span>
            
            <!-- 2. Giá trị (Màu đen, bôi đậm) -->
            <span class="text-on-surface text-[11px] font-extrabold">{{ tag.displayValue }}</span>
            
            <!-- 3. Icon x màu đen (Xóa điều kiện lọc tương ứng) -->
            <button 
              type="button"
              @click="clearSingleFilter(tag.key)"
              class="ml-0.5 text-on-surface hover:text-error hover:bg-error/15 rounded-full p-0.5 transition-colors flex items-center justify-center focus:outline-none"
              :title="'Xóa điều kiện lọc ' + tag.fieldName"
            >
              <span class="material-symbols-outlined text-[14px] font-bold">close</span>
            </button>
          </div>

          <!-- Clear All button -->
          <button
            @click="resetAllFilters"
            class="text-[11px] font-bold text-error hover:underline px-2 py-1 rounded-md transition-colors"
            title="Xóa tất cả điều kiện lọc"
          >
            Xóa tất cả
          </button>
        </div>
      </div>

      <!-- Right: Utility Actions Slot -->
      <div v-if="$slots['utility-actions']" class="flex items-center gap-3">
        <slot name="utility-actions"></slot>
      </div>
    </div>

    <!-- 2. DATA TABLE SECTION -->
    <div 
      class="overflow-x-auto overflow-y-visible rounded-lg border border-outline-variant/40 relative"
      :style="{ maxHeight: maxHeight }"
    >
      <table class="w-full text-left text-xs border-collapse min-w-[900px]">
        <!-- Table Header -->
        <thead class="sticky top-0 z-20 bg-surface-container-low shadow-sm">
          <tr class="text-on-surface-variant font-bold text-[11px] uppercase border-b border-outline-variant">
            <template v-for="col in columns" :key="col.key">
              <BaseTh
                :title="col.title"
                :type="col.type || 'text'"
                :filterable="col.filterable !== false"
                :options="col.options || []"
                :align="col.align || 'left'"
                v-model="columnFilters[col.key]"
                :class="[
                  col.minWidth ? `min-w-[${col.minWidth}]` : '',
                  col.class || '',
                  col.sticky === 'right' ? 'sticky right-0 z-30 bg-surface-container-low shadow-sm border-l border-outline-variant/60' : '',
                  col.sticky === 'left' ? 'sticky left-0 z-30 bg-surface-container-low shadow-sm border-r border-outline-variant/60' : ''
                ]"
                :style="col.minWidth ? { minWidth: col.minWidth } : {}"
              />
            </template>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-outline-variant/40 bg-white">
          <template v-if="paginatedData.length > 0">
            <tr 
              v-for="(row, rowIndex) in paginatedData" 
              :key="row[rowKey] || rowIndex" 
              class="hover:bg-surface-container-low/70 transition-colors text-[11px] group"
            >
              <template v-for="col in columns" :key="col.key">
                <td 
                  :class="[
                    'py-3 px-3',
                    getAlignClass(col.align),
                    col.sticky === 'right' ? 'sticky right-0 z-10 bg-white group-hover:bg-surface-container-low border-l border-outline-variant/40 shadow-xs' : '',
                    col.sticky === 'left' ? 'sticky left-0 z-10 bg-white group-hover:bg-surface-container-low border-r border-outline-variant/40 shadow-xs' : ''
                  ]"
                >
                  <!-- Custom Cell Slot for columnKey -->
                  <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]" :index="rowIndex">
                    <span class="font-bold text-on-surface">{{ row[col.key] }}</span>
                  </slot>
                </td>
              </template>
            </tr>
          </template>

          <!-- 3. UNIFIED EMPTY STATE -->
          <tr v-else>
            <td :colspan="columns.length" class="p-0">
              <slot name="empty" :is-filtered="hasActiveFilters" :reset-filters="resetAllFilters">
                <BaseEmptyState 
                  :is-filtered="hasActiveFilters" 
                  @action="handleEmptyAction" 
                />
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 4. FOOTER PAGINATION SECTION -->
    <BasePagination
      v-if="showPagination"
      :total-items="filteredData.length"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-size-options="pageSizeOptions"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import BaseTh from './BaseTh.vue';
import BaseEmptyState from './BaseEmptyState.vue';
import BasePagination from './BasePagination.vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    required: true
  },
  maxHeight: {
    type: String,
    default: '600px'
  },
  rowKey: {
    type: String,
    default: 'id'
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  defaultPageSize: {
    type: Number,
    default: 20
  },
  pageSizeOptions: {
    type: Array,
    default: () => [10, 20, 50, 100]
  }
});

const emit = defineEmits(['filter-change', 'reload']);

const currentPage = ref(1);
const pageSize = ref(props.defaultPageSize);
const columnFilters = ref({});

function initFilters() {
  const newFilters = {};
  props.columns.forEach(col => {
    if (col.filterable !== false) {
      newFilters[col.key] = {
        operator: (col.type === 'boolean' || col.type === 'select') ? 'equals' : (col.type === 'number' ? 'equals' : 'contains'),
        value: ''
      };
    }
  });
  columnFilters.value = newFilters;
  currentPage.value = 1;
}

watch(() => props.columns, initFilters, { immediate: true });

function getAlignClass(align) {
  if (align === 'center') return 'text-center';
  if (align === 'right') return 'text-right';
  return 'text-left';
}

function matchFilter(fieldValue, filterObj, type = 'text') {
  if (!filterObj || filterObj.value === undefined || filterObj.value === null || String(filterObj.value).trim() === '') {
    return true;
  }

  const valStr = String(fieldValue || '').toLowerCase();
  const filterValStr = String(filterObj.value).toLowerCase();
  const operator = filterObj.operator;

  if (type === 'boolean' || type === 'select') {
    const fieldStr = String(fieldValue || '');
    const filterStr = String(filterObj.value);
    if (fieldStr === filterStr) return true;

    const typeMap = {
      PersonnelImport: 'Bổ sung Nhân sự',
      BudgetApproval: 'Duyệt Ngân sách',
      ContractApproval: 'Duyệt Hợp đồng',
      EquipmentExport: 'Xuất Kho Thiết bị'
    };
    if (typeMap[fieldStr] && typeMap[fieldStr] === filterStr) return true;
    return false;
  }

  if (type === 'number') {
    const numField = Number(fieldValue);
    const numFilter = Number(filterObj.value);
    if (isNaN(numField) || isNaN(numFilter)) return false;

    switch (operator) {
      case 'equals': return numField === numFilter;
      case 'not_equals': return numField !== numFilter;
      case 'greater_than': return numField > numFilter;
      case 'greater_than_or_equal': return numField >= numFilter;
      case 'less_than': return numField < numFilter;
      case 'less_than_or_equal': return numField <= numFilter;
      default: return true;
    }
  }

  switch (operator) {
    case 'contains':
      return valStr.includes(filterValStr);
    case 'not_contains':
      return !valStr.includes(filterValStr);
    case 'equals':
      return valStr === filterValStr;
    case 'starts_with':
      return valStr.startsWith(filterValStr);
    case 'ends_with':
      return valStr.endsWith(filterValStr);
    default:
      return valStr.includes(filterValStr);
  }
}

const filteredData = computed(() => {
  return props.data.filter(row => {
    return props.columns.every(col => {
      if (col.filterable === false) return true;
      const filterObj = columnFilters.value[col.key];
      return matchFilter(row[col.key], filterObj, col.type || 'text');
    });
  });
});

watch(filteredData, () => {
  currentPage.value = 1;
});

const paginatedData = computed(() => {
  if (!props.showPagination) return filteredData.value;
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredData.value.slice(start, start + pageSize.value);
});

const activeFilterTags = computed(() => {
  const tags = [];
  props.columns.forEach(col => {
    if (col.filterable === false) return;
    const filterObj = columnFilters.value[col.key];
    if (filterObj && filterObj.value !== undefined && filterObj.value !== null && String(filterObj.value).trim() !== '') {
      const rawVal = filterObj.value;
      let displayVal = rawVal;

      if (col.options && col.options.length > 0) {
        const foundOpt = col.options.find(o => (typeof o === 'object' ? o.value === rawVal : o === rawVal));
        if (foundOpt) {
          displayVal = typeof foundOpt === 'object' ? (foundOpt.label ?? foundOpt.value) : foundOpt;
        }
      }

      let opPrefix = '';
      if (filterObj.operator === 'not_contains') opPrefix = 'không chứa ';
      else if (filterObj.operator === 'equals' && col.type === 'text') opPrefix = '= ';

      tags.push({
        key: col.key,
        fieldName: col.title,
        displayValue: `${opPrefix}${col.type === 'text' ? `"${displayVal}"` : displayVal}`
      });
    }
  });
  return tags;
});

const hasActiveFilters = computed(() => {
  return activeFilterTags.value.length > 0;
});

function clearSingleFilter(key) {
  const col = props.columns.find(c => c.key === key);
  if (columnFilters.value[key]) {
    columnFilters.value[key] = {
      operator: (col?.type === 'boolean' || col?.type === 'select') ? 'equals' : (col?.type === 'number' ? 'equals' : 'contains'),
      value: ''
    };
  }
  currentPage.value = 1;
}

function resetAllFilters() {
  initFilters();
}

function handleEmptyAction() {
  if (hasActiveFilters.value) {
    resetAllFilters();
  } else {
    emit('reload');
  }
}
</script>
