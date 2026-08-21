/**
 * EventAZ Mock Data - Events Management (Module Vue App)
 */
window.EventAZMockData = window.EventAZMockData || {};

const EVENTS_STORAGE_KEY = "eventaz_mock_events_v1";

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
        status: "Ongoing",
        startDate: "2026-10-15",
        endDate: "2026-10-17",
        location: "Trung tâm Hội nghị Quốc gia, Hà Nội",
        scale: 1500,
        budget: 500000000,
        description: "Sự kiện hội tụ hơn 1.500 chuyên gia công nghệ, nhà đầu tư và doanh nghiệp khởi nghiệp hàng đầu khu vực Châu Á - Thái Bình Dương.",
        director: "Nguyễn Văn Trưởng",
        directorId: "USR-001",
        runOfShowLocked: true,
        createdAt: "2026-08-01 09:00:00",
        wbs: [
            { id: "WBS-01", name: "Nội dung & Diễn giả", leadId: "USR-003", leadName: "Lê Văn Nội Dung", coLead: "Nguyễn Văn Trưởng", order: 1 },
            { id: "WBS-02", name: "Hậu cần & Địa điểm", leadId: "USR-002", leadName: "Trần Thị Hậu Cần", coLead: "", order: 2 },
            { id: "WBS-03", name: "Truyền thông & Tiếp thị", leadId: "USR-004", leadName: "Phạm Hoàng Truyền Thông", coLead: "", order: 3 },
            { id: "WBS-04", name: "Đón tiếp Khách mời VIP", leadId: "USR-005", leadName: "Đỗ Minh Đối Ngoại", coLead: "", order: 4 },
            { id: "WBS-05", name: "Tài chính & Vé điện tử", leadId: "USR-001", leadName: "Nguyễn Văn Trưởng", coLead: "", order: 5 },
            { id: "WBS-06", name: "An ninh & Hạ tầng Kỹ thuật", leadId: "USR-006", leadName: "Vũ Anh Kỹ Thuật", coLead: "", order: 6 }
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
        scale: 12000,
        budget: 1500000000,
        description: "Đại nhạc hội âm nhạc ngoài trời với sự tham gia của hơn 20 nghệ sĩ nổi tiếng V-Pop và DJ quốc tế.",
        director: "Nguyễn Văn Trưởng",
        directorId: "USR-001",
        runOfShowLocked: false,
        createdAt: "2026-08-05 10:00:00",
        wbs: [
            { id: "WBS-01", name: "Sân khấu & Âm thanh Ánh sáng", leadId: "USR-006", leadName: "Vũ Anh Kỹ Thuật", coLead: "Bùi Văn Âm Thanh", order: 1 },
            { id: "WBS-02", name: "An ninh & Phân luồng Vé", leadId: "USR-002", leadName: "Trần Thị Hậu Cần", coLead: "", order: 2 },
            { id: "WBS-03", name: "Nghệ sĩ & Kịch bản Biểu diễn", leadId: "USR-003", leadName: "Lê Văn Nội Dung", coLead: "", order: 3 }
        ],
        auditLogs: [
            { id: "LOG-01", timestamp: "2026-08-05 10:00:00", user: "Nguyễn Văn Trưởng", action: "Khởi tạo sự kiện (Trạng thái: Nháp)" },
            { id: "LOG-02", timestamp: "2026-08-12 11:00:00", user: "Nguyễn Văn Trưởng", action: "Chuyển trạng thái sang: Đang chuẩn bị" }
        ],
        lastStatusChangeTime: "2026-08-12T11:00:00Z"
    }
];

window.EventAZMockData.getEvents = function () {
    const raw = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (!raw) {
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(defaultEvents));
        return defaultEvents;
    }
    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error("Lỗi đọc dữ liệu Events từ localStorage", e);
        return defaultEvents;
    }
};

window.EventAZMockData.getCurrentEventId = function () {
    return localStorage.getItem('eventaz_current_event_id') || 'E-2024-99X';
};

window.EventAZMockData.getCurrentEvent = function (eventId) {
    const targetId = eventId || window.EventAZMockData.getCurrentEventId();
    const events = window.EventAZMockData.getEvents();
    return events.find(e => e.id === targetId) || events[0];
};

window.EventAZMockData.saveEvent = function (updatedEvent) {
    const events = window.EventAZMockData.getEvents();
    const index = events.findIndex(e => e.id === updatedEvent.id);
    if (index !== -1) {
        events[index] = updatedEvent;
    } else {
        events.unshift(updatedEvent);
    }
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    return updatedEvent;
};

window.EventAZMockData.createEvent = function (formData) {
    const events = window.EventAZMockData.getEvents();
    const nowStr = new Date().toLocaleString("vi-VN");
    const newId = "E-2024-" + String(events.length + 101).padStart(3, "0");

    const newEvent = {
        id: newId,
        name: formData.name,
        category: formData.category || "Sự kiện chung",
        status: "Draft",
        startDate: formData.startDate || "2026-12-01",
        endDate: formData.endDate || "2026-12-02",
        location: formData.location || "Chưa xác định địa điểm",
        scale: parseInt(formData.scale || 500),
        budget: parseFloat(formData.budget || 100000000),
        description: formData.description || "Mô tả sự kiện mới khởi tạo.",
        director: "Nguyễn Văn Trưởng",
        directorId: "USR-001",
        runOfShowLocked: false,
        createdAt: nowStr,
        wbs: [
            { id: "WBS-01", name: "Hạng mục Khởi tạo Ban đầu", leadId: "USR-001", leadName: "Nguyễn Văn Trưởng", coLead: "", order: 1 }
        ],
        auditLogs: [
            { id: "LOG-01", timestamp: nowStr, user: "Nguyễn Văn Trưởng", action: "Khởi tạo sự kiện mới (Trạng thái: Nháp)" }
        ],
        lastStatusChangeTime: new Date().toISOString()
    };

    window.EventAZMockData.saveEvent(newEvent);
    localStorage.setItem('eventaz_current_event_id', newId);
    return newEvent;
};

window.EventAZMockData.cloneEvent = function (sourceId, isTemplate = false, formOverrides = {}) {
    const nowStr = new Date().toLocaleString("vi-VN");
    const events = window.EventAZMockData.getEvents();
    const newId = "E-2024-" + String(events.length + 101).padStart(3, "0");

    let sourceWbs = [];
    let sourceCategory = "Sự kiện chung";

    if (isTemplate) {
        const tpl = window.EventAZMockData.getTemplateById(sourceId);
        if (tpl) {
            sourceCategory = tpl.category;
            sourceWbs = (tpl.wbsCategories || []).map((cat, idx) => ({
                id: `WBS-0${idx + 1}`,
                name: cat.name,
                leadId: "USR-001",
                leadName: "Nguyễn Văn Trưởng",
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
        name: formOverrides.name || `Sự kiện mới (Bản sao)`,
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
    localStorage.setItem('eventaz_current_event_id', newId);
    return clonedEvent;
};

window.EventAZMockData.changeEventStatus = function (eventId, nextStatus, reason = "") {
    const evt = window.EventAZMockData.getCurrentEvent(eventId);
    const states = window.EventAZMockData.LIFECYCLE_STATES;

    if (!states[nextStatus]) {
        return { success: false, error: "Trạng thái không hợp lệ." };
    }

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
