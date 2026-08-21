/**
 * EventAZ Mock Data - Events Management (Module 01: FR-01.1 -> FR-01.5)
 */
window.EventAZMockData = window.EventAZMockData || {};

const EVENTS_STORAGE_KEY = "eventaz_mock_events_v1";

// Cấu hình trạng thái vòng đời sự kiện (FR-01.4)
window.EventAZMockData.LIFECYCLE_STATES = {
    "Draft": { code: "Draft", nameVi: "Nháp", color: "bg-slate-500", textClass: "text-slate-600", bgLight: "bg-slate-100", stepOrder: 1 },
    "Planning": { code: "Planning", nameVi: "Lên kế hoạch", color: "bg-blue-600", textClass: "text-blue-600", bgLight: "bg-blue-50", stepOrder: 2 },
    "Preparing": { code: "Preparing", nameVi: "Đang chuẩn bị", color: "bg-indigo-600", textClass: "text-indigo-600", bgLight: "bg-indigo-50", stepOrder: 3 },
    "Ongoing": { code: "Ongoing", nameVi: "Đang diễn ra", color: "bg-emerald-600", textClass: "text-emerald-600", bgLight: "bg-emerald-50", stepOrder: 4 },
    "Closed": { code: "Closed", nameVi: "Đã kết thúc", color: "bg-amber-600", textClass: "text-amber-600", bgLight: "bg-amber-50", stepOrder: 5 },
    "Archived": { code: "Archived", nameVi: "Lưu trữ", color: "bg-gray-700", textClass: "text-gray-700", bgLight: "bg-gray-100", stepOrder: 6 }
};

const defaultEvents = [
    {
        id: "E-2024-99X",
        name: "Tech Summit Asia 2024",
        category: "Hội thảo Công nghệ",
        status: "Ongoing", // Draft | Planning | Preparing | Ongoing | Closed | Archived
        startDate: "2026-10-15",
        endDate: "2026-10-17",
        location: "Trung tâm Hội nghị Quốc gia, Hà Nội",
        scale: 1500, // Số khách dự kiến
        budget: 500000000, // 500,000,000 VND
        description: "Sự kiện hội tụ hơn 1.500 chuyên gia công nghệ, nhà đầu tư và doanh nghiệp khởi nghiệp hàng đầu khu vực Châu Á - Thái Bình Dương.",
        director: "Nguyễn Văn Trưởng",
        directorId: "USR-001",
        runOfShowLocked: true, // Điều kiện cần để chuyển sang Ongoing
        createdAt: "2026-08-01 09:00:00",
        wbs: [
            { id: "WBS-01", name: "Nội dung & Diễn giả", leadId: "USR-003", leadName: "Lê Văn Nội Dung", coLead: "Nguyễn Văn Trưởng", order: 1 },
            { id: "WBS-02", name: "Hậu cần & Địa điểm", leadId: "USR-002", leadName: "Trần Thị Hậu Cần", coLead: "", order: 2 },
            { id: "WBS-03", name: "Truyền thông & Tiếp thị", leadId: "USR-004", leadName: "Phạm Hoàng Truyền Thông", coLead: "", order: 3 },
            { id: "WBS-04", name: "Đón tiếp Khách mời VIP", leadId: "USR-005", leadName: "Đỗ Minh Đối Ngoại", coLead: "", order: 4 },
            { id: "WBS-05", name: "Tài chính & Vé điện tử", leadId: "USR-001", leadName: "Nguyễn Văn Trưởng", coLead: "", order: 5 },
            { id: "WBS-06", name: "An ninh & Hạ tầng Kỹ thuật", leadId: "USR-002", leadName: "Trần Thị Hậu Cần", coLead: "", order: 6 }
        ],
        auditLogs: [
            { id: "LOG-01", timestamp: "2026-08-01 09:00:00", user: "Nguyễn Văn Trưởng", action: "Khởi tạo sự kiện (Trạng thái: Nháp)" },
            { id: "LOG-02", timestamp: "2026-08-05 14:30:00", user: "Nguyễn Văn Trưởng", action: "Chuyển trạng thái sang: Lên kế hoạch" },
            { id: "LOG-03", timestamp: "2026-08-10 10:15:00", user: "Nguyễn Văn Trưởng", action: "Chuyển trạng thái sang: Đang chuẩn bị" },
            { id: "LOG-04", timestamp: "2026-08-15 08:00:00", user: "Nguyễn Văn Trưởng", action: "Khóa kịch bản Run-of-Show và Chuyển trạng thái sang: Đang diễn ra" }
        ],
        lastStatusChangeTime: "2026-08-15T08:00:00Z"
    },
    {
        id: "E-2024-100",
        name: "Vietnam Music Festival 2024",
        category: "Đại nhạc hội",
        status: "Preparing",
        startDate: "2026-11-20",
        endDate: "2026-11-21",
        location: "Sân vận động Mỹ Đình, Hà Nội",
        scale: 10000,
        budget: 1200000000,
        description: "Đại nhạc hội âm nhạc ngoài trời quy mô lớn nhất năm 2024 quy tụ các nghệ sĩ nổi tiếng Việt Nam và quốc tế.",
        director: "Nguyễn Văn Trưởng",
        directorId: "USR-001",
        runOfShowLocked: false,
        createdAt: "2026-08-05 11:20:00",
        wbs: [
            { id: "WBS-101", name: "Sân khấu & Âm thanh", leadId: "USR-002", leadName: "Trần Thị Hậu Cần", coLead: "", order: 1 },
            { id: "WBS-102", name: "Nghệ sĩ & Kịch bản", leadId: "USR-003", leadName: "Lê Văn Nội Dung", coLead: "", order: 2 },
            { id: "WBS-103", name: "Bán vé & Truyền thông", leadId: "USR-004", leadName: "Phạm Hoàng Truyền Thông", coLead: "", order: 3 }
        ],
        auditLogs: [
            { id: "LOG-101", timestamp: "2026-08-05 11:20:00", user: "Nguyễn Văn Trưởng", action: "Khởi tạo sự kiện từ Mẫu Đại nhạc hội" }
        ],
        lastStatusChangeTime: "2026-08-05T11:20:00Z"
    }
];

// Lấy danh sách sự kiện
window.EventAZMockData.getEvents = function () {
    const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(defaultEvents));
        return defaultEvents;
    }
    try {
        return JSON.parse(stored);
    } catch (e) {
        return defaultEvents;
    }
};

// Lấy sự kiện hiện tại
window.EventAZMockData.getCurrentEvent = function (eventId = "E-2024-99X") {
    const events = window.EventAZMockData.getEvents();
    return events.find(e => e.id === eventId) || events[0];
};

// Lưu sự kiện
window.EventAZMockData.saveEvent = function (updatedEvent) {
    const events = window.EventAZMockData.getEvents();
    const index = events.findIndex(e => e.id === updatedEvent.id);
    if (index !== -1) {
        events[index] = updatedEvent;
    } else {
        events.unshift(updatedEvent);
    }
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
};

// FR-01.1: Tạo sự kiện mới
window.EventAZMockData.createEvent = function (formData) {
    const events = window.EventAZMockData.getEvents();
    const newId = "E-2024-" + String(events.length + 101);
    const nowStr = new Date().toLocaleString("vi-VN");
    
    const newEvent = {
        id: newId,
        name: formData.name,
        category: formData.category || "Hội thảo / Sự kiện",
        status: "Draft", // Trạng thái mặc định khi tạo mới
        startDate: formData.startDate,
        endDate: formData.endDate,
        location: formData.location,
        scale: parseInt(formData.scale || 100),
        budget: parseFloat(formData.budget || 0),
        description: formData.description || "",
        director: "Nguyễn Văn Trưởng",
        directorId: "USR-001",
        runOfShowLocked: false,
        createdAt: nowStr,
        wbs: [
            { id: "WBS-01", name: "Nội dung", leadId: "USR-003", leadName: "Lê Văn Nội Dung", coLead: "", order: 1 },
            { id: "WBS-02", name: "Hậu cần", leadId: "USR-002", leadName: "Trần Thị Hậu Cần", coLead: "", order: 2 },
            { id: "WBS-03", name: "Truyền thông", leadId: "USR-004", leadName: "Phạm Hoàng Truyền Thông", coLead: "", order: 3 },
            { id: "WBS-04", name: "Tài chính", leadId: "USR-001", leadName: "Nguyễn Văn Trưởng", coLead: "", order: 4 }
        ],
        auditLogs: [
            { id: "LOG-01", timestamp: nowStr, user: "Nguyễn Văn Trưởng", action: "Tạo mới sự kiện (Trạng thái mặc định: Nháp)" }
        ],
        lastStatusChangeTime: new Date().toISOString()
    };

    window.EventAZMockData.saveEvent(newEvent);
    return newEvent;
};

// FR-01.2: Nhân bản sự kiện từ nguồn (Sự kiện hoặc Template)
window.EventAZMockData.cloneEvent = function (sourceId, isTemplate, formOverrides) {
    const events = window.EventAZMockData.getEvents();
    const newId = "E-2024-" + String(events.length + 101);
    const nowStr = new Date().toLocaleString("vi-VN");

    let sourceWbs = [];
    let sourceCategory = "Sự kiện nhân bản";

    if (isTemplate) {
        const templates = window.EventAZMockData.getTemplates();
        const tpl = templates.find(t => t.id === sourceId);
        if (tpl) {
            sourceCategory = tpl.category;
            sourceWbs = (tpl.wbsGroups || []).map((w, idx) => ({
                id: `WBS-CL-${idx + 1}`,
                name: w.name,
                leadId: w.leadId || "USR-001",
                leadName: w.leadName || "Nguyễn Văn Trưởng",
                coLead: "",
                order: idx + 1
            }));
        }
    } else {
        const srcEvt = events.find(e => e.id === sourceId);
        if (srcEvt) {
            sourceCategory = srcEvt.category;
            sourceWbs = JSON.parse(JSON.stringify(srcEvt.wbs || []));
        }
    }

    const clonedEvent = {
        id: newId,
        name: formOverrides.name || "Bản sao sự kiện",
        category: sourceCategory,
        status: "Draft",
        startDate: formOverrides.startDate || "2026-12-01",
        endDate: formOverrides.endDate || "2026-12-02",
        location: formOverrides.location || "Địa điểm chưa xác định",
        scale: parseInt(formOverrides.scale || 500),
        budget: parseFloat(formOverrides.budget || 100000000),
        description: `Sự kiện được nhân bản từ ${isTemplate ? "Template" : "Sự kiện"}: ${sourceId}`,
        director: "Nguyễn Văn Trưởng",
        directorId: "USR-001",
        runOfShowLocked: false,
        createdAt: nowStr,
        wbs: sourceWbs,
        auditLogs: [
            { id: "LOG-01", timestamp: nowStr, user: "Nguyễn Văn Trưởng", action: `Nhân bản thành công từ ${isTemplate ? "Template" : "Sự kiện"}: ${sourceId}` }
        ],
        lastStatusChangeTime: new Date().toISOString()
    };

    window.EventAZMockData.saveEvent(clonedEvent);
    return clonedEvent;
};

// FR-01.4: Quản lý trạng thái vòng đời & audit log
window.EventAZMockData.changeEventStatus = function (eventId, nextStatus, reason = "") {
    const evt = window.EventAZMockData.getCurrentEvent(eventId);
    const states = window.EventAZMockData.LIFECYCLE_STATES;
    
    if (!states[nextStatus]) {
        return { success: false, error: "Trạng thái không hợp lệ." };
    }

    // Rule: Chuyển sang Ongoing phải có Run-of-Show locked
    if (nextStatus === "Ongoing" && !evt.runOfShowLocked) {
        return { 
            success: false, 
            error: "Chưa đủ điều kiện chuyển sang 'Đang diễn ra': Kịch bản Run-of-Show chưa được hoàn thành và khóa." 
        };
    }

    const prevStatusName = states[evt.status] ? states[evt.status].nameVi : evt.status;
    const nextStatusName = states[nextStatus].nameVi;
    const nowStr = new Date().toLocaleString("vi-VN");

    evt.status = nextStatus;
    evt.lastStatusChangeTime = new Date().toISOString();
    evt.auditLogs.unshift({
        id: "LOG-" + Date.now(),
        timestamp: nowStr,
        user: "Nguyễn Văn Trưởng (Trưởng BTC)",
        action: `Chuyển trạng thái từ [${prevStatusName}] sang [${nextStatusName}]` + (reason ? ` - Lý do: ${reason}` : "")
    });

    window.EventAZMockData.saveEvent(evt);
    return { success: true, event: evt };
};

// Helper: Quản lý sự kiện hiện tại & Đồng bộ danh sách sự kiện trên Sidebar trái
window.EventAZMockData.getCurrentEventId = function() {
    return localStorage.getItem('eventaz_current_event_id') || 'E-2024-99X';
};

window.EventAZMockData.selectCurrentEvent = function(eventId, targetUrl = 'overview.html') {
    localStorage.setItem('eventaz_current_event_id', eventId);
    window.location.href = targetUrl;
};

window.EventAZMockData.renderSidebarEvents = function() {
    const container = document.getElementById('event-subtabs-container');
    if (!container) return;

    const events = window.EventAZMockData.getEvents();
    const currentId = window.EventAZMockData.getCurrentEventId();

    const statusBadgeColors = {
        'Draft': 'bg-slate-500/20 text-slate-300',
        'Planning': 'bg-blue-500/20 text-blue-300',
        'Preparing': 'bg-indigo-500/20 text-indigo-300',
        'Ongoing': 'bg-emerald-500/20 text-emerald-300',
        'Closed': 'bg-amber-500/20 text-amber-300',
        'Archived': 'bg-gray-500/20 text-gray-400'
    };

    container.innerHTML = events.map(evt => {
        const isCurrent = evt.id === currentId;
        const activeClasses = isCurrent
            ? 'border-l-2 border-primary bg-white/10 text-white font-bold'
            : 'text-slate-300 hover:text-white hover:bg-white/10 font-medium';
        const iconClass = isCurrent ? 'text-primary-fixed' : 'text-slate-400';
        const iconName = isCurrent ? 'radio_button_checked' : 'radio_button_unchecked';
        const badgeColor = statusBadgeColors[evt.status] || 'bg-slate-500/20 text-slate-300';

        return `
            <a href="javascript:void(0)" onclick="EventAZMockData.selectCurrentEvent('${evt.id}', 'overview.html')" class="flex items-center gap-2 px-3 py-2 text-[12px] rounded-lg transition-colors truncate ${activeClasses}" title="${evt.name}">
                <span class="material-symbols-outlined text-[16px] ${iconClass}">${iconName}</span>
                <span class="truncate flex-1">${evt.name}</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded ${badgeColor} font-normal shrink-0">${evt.status}</span>
            </a>
        `;
    }).join('');

    const currentEvt = events.find(e => e.id === currentId) || events[0];
    const currentNameEl = document.getElementById('sidebar-current-event-name');
    if (currentNameEl && currentEvt) {
        currentNameEl.textContent = currentEvt.name;
    }
};

// Tự động kích hoạt khi DOM sẵn sàng
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            if (window.EventAZMockData && window.EventAZMockData.renderSidebarEvents) {
                window.EventAZMockData.renderSidebarEvents();
            }
        }, 50);
    });
}

