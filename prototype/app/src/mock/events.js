/**
 * EventAZ Mock Data - Events Management (ESM Module)
 */
import { getTemplateById } from './templates.js';

const EVENTS_STORAGE_KEY = "eventaz_mock_events_v2";

export const LIFECYCLE_STATES = {
    "Draft": { code: "Draft", nameVi: "Nháp", color: "bg-slate-500", textClass: "text-slate-600", bgLight: "bg-slate-100", stepOrder: 1 },
    "Planning": { code: "Planning", nameVi: "Lên kế hoạch", color: "bg-blue-600", textClass: "text-blue-600", bgLight: "bg-blue-50", stepOrder: 2 },
    "Preparing": { code: "Preparing", nameVi: "Đang chuẩn bị", color: "bg-indigo-600", textClass: "text-indigo-600", bgLight: "bg-indigo-50", stepOrder: 3 },
    "Ongoing": { code: "Ongoing", nameVi: "Đang diễn ra", color: "bg-emerald-600", textClass: "text-emerald-600", bgLight: "bg-emerald-50", stepOrder: 4 },
    "Closed": { code: "Closed", nameVi: "Đã kết thúc", color: "bg-amber-600", textClass: "text-amber-600", bgLight: "bg-amber-50", stepOrder: 5 },
    "Archived": { code: "Archived", nameVi: "Lưu trữ", color: "bg-gray-700", textClass: "text-gray-700", bgLight: "bg-gray-100", stepOrder: 6 }
};

export const EVENT_STAGES = [
    { id: 1, name: "Thiết lập & Lên kế hoạch", code: "Planning" },
    { id: 2, name: "Đang chuẩn bị", code: "Preparing" },
    { id: 3, name: "Đang diễn ra", code: "Ongoing" },
    { id: 4, name: "Đã kết thúc & Tổng kết", code: "Closed" }
];

export const defaultEvents = [
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
            { id: "WBS-01", name: "Nội dung & Diễn giả", phaseId: 1, phaseName: "Thiết lập & Lên kế hoạch", leadId: "USR-003", leadName: "Lê Văn Nội Dung", coLead: "Nguyễn Văn Trưởng", order: 1 },
            { id: "WBS-02", name: "Hậu cần & Địa điểm", phaseId: 2, phaseName: "Đang chuẩn bị", leadId: "USR-002", leadName: "Trần Thị Hậu Cần", coLead: "", order: 2 },
            { id: "WBS-03", name: "Truyền thông & Tiếp thị", phaseId: 1, phaseName: "Thiết lập & Lên kế hoạch", leadId: "USR-004", leadName: "Phạm Hoàng Truyền Thông", coLead: "", order: 3 },
            { id: "WBS-04", name: "Đón tiếp Khách mời VIP", phaseId: 3, phaseName: "Đang diễn ra", leadId: "USR-005", leadName: "Đỗ Minh Đối Ngoại", coLead: "", order: 4 },
            { id: "WBS-05", name: "Tài chính & Vé điện tử", phaseId: 1, phaseName: "Thiết lập & Lên kế hoạch", leadId: "USR-001", leadName: "Nguyễn Văn Trưởng", coLead: "", order: 5 },
            { id: "WBS-06", name: "An ninh & Hạ tầng Kỹ thuật", phaseId: 2, phaseName: "Đang chuẩn bị", leadId: "USR-006", leadName: "Vũ Anh Kỹ Thuật", coLead: "", order: 6 }
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
            { id: "WBS-01", name: "Sân khấu & Âm thanh", phaseId: 2, phaseName: "Đang chuẩn bị", leadId: "USR-006", leadName: "Vũ Anh Kỹ Thuật", coLead: "", order: 1 },
            { id: "WBS-02", name: "Nghệ sĩ & Kịch bản", phaseId: 1, phaseName: "Thiết lập & Lên kế hoạch", leadId: "USR-003", leadName: "Lê Văn Nội Dung", coLead: "", order: 2 }
        ],
        auditLogs: [],
        lastStatusChangeTime: "2026-08-05T10:00:00Z"
    }
];

export function getEvents() {
    const raw = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        } catch (e) {
            console.error("Error reading events from localStorage", e);
        }
    }
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(defaultEvents));
    return defaultEvents;
}

export function getCurrentEventId() {
    return localStorage.getItem("eventaz_current_event_id") || "E-2024-99X";
}

export function setCurrentEventId(eventId) {
    localStorage.setItem("eventaz_current_event_id", eventId);
}

export function getCurrentEvent() {
    const events = getEvents();
    const id = getCurrentEventId();
    return events.find(e => e.id === id) || events[0];
}

export function saveEvent(eventData) {
    const events = getEvents();
    const index = events.findIndex(e => e.id === eventData.id);
    if (index !== -1) {
        events[index] = eventData;
    } else {
        events.unshift(eventData);
    }
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    return eventData;
}

export function createEvent(eventData) {
    return saveEvent(eventData);
}

export function cloneEvent(sourceId, isTpl, form) {
    const events = getEvents();
    let source = null;
    if (isTpl) {
        source = getTemplateById(sourceId);
    } else {
        source = events.find(e => e.id === sourceId);
    }

    const newId = `E-2024-${Date.now().toString().slice(-3)}`;
    const cloned = {
        id: newId,
        name: form.name || (source ? `Bản sao của ${source.name}` : "Sự kiện nhân bản"),
        category: source ? (source.category || "Hội thảo") : "Hội thảo",
        status: "Draft",
        startDate: form.startDate || "2026-12-01",
        endDate: form.endDate || "2026-12-02",
        location: source ? (source.location || "Trung tâm Hội nghị") : "Trung tâm Hội nghị",
        scale: source ? (source.scale || 500) : 500,
        budget: source ? (source.budget || 200000000) : 200000000,
        description: source ? (source.description || "") : "",
        director: "Nguyễn Văn Trưởng",
        directorId: "USR-001",
        wbs: source ? JSON.parse(JSON.stringify(source.wbs || [])) : [],
        auditLogs: [
            { id: "LOG-01", timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19), user: "Nguyễn Văn Trưởng", action: `Nhân bản từ ${isTpl ? 'Template' : 'Sự kiện'} [${sourceId}]` }
        ]
    };

    saveEvent(cloned);
    setCurrentEventId(newId);
    return cloned;
}

export function changeEventStatus(eventId, newStatus) {
    const events = getEvents();
    const evt = events.find(e => e.id === eventId);
    if (evt) {
        evt.status = newStatus;
        evt.lastStatusChangeTime = new Date().toISOString();
        evt.auditLogs = evt.auditLogs || [];
        evt.auditLogs.unshift({
            id: `LOG-0${evt.auditLogs.length + 1}`,
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
            user: "Nguyễn Văn Trưởng",
            action: `Chuyển trạng thái sang: ${newStatus}`
        });
        saveEvent(evt);
    }
    return evt;
}
