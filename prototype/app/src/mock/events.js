import { getTemplateById } from './templates.js';
import { getUserById } from './users.js';

export const LIFECYCLE_STATES = {
    "Planning": { code: "Planning", nameVi: "Thiết lập", color: "bg-blue-600", textClass: "text-blue-600", bgLight: "bg-blue-50", stepOrder: 1 },
    "Preparing": { code: "Preparing", nameVi: "Chuẩn bị", color: "bg-indigo-600", textClass: "text-indigo-600", bgLight: "bg-indigo-50", stepOrder: 2 },
    "Ongoing": { code: "Ongoing", nameVi: "Đang diễn ra", color: "bg-emerald-600", textClass: "text-emerald-600", bgLight: "bg-emerald-50", stepOrder: 3 },
    "Closed": { code: "Closed", nameVi: "Kết thúc", color: "bg-amber-600", textClass: "text-amber-600", bgLight: "bg-amber-50", stepOrder: 4 },
    "t1": { code: "t1", nameVi: "Thiết lập", color: "bg-blue-600", textClass: "text-blue-600", bgLight: "bg-blue-50", stepOrder: 5 },
    "t2": { code: "t2", nameVi: "Chuẩn bị", color: "bg-indigo-600", textClass: "text-indigo-600", bgLight: "bg-indigo-50", stepOrder: 6 },
    "t3": { code: "t3", nameVi: "Đang diễn ra", color: "bg-emerald-600", textClass: "text-emerald-600", bgLight: "bg-emerald-50", stepOrder: 6 },
    "t4": { code: "t4", nameVi: "Kết thúc", color: "bg-amber-600", textClass: "text-amber-600", bgLight: "bg-amber-50", stepOrder: 8 },
};

export const EVENT_STAGES = [
    { id: 1, name: "Thiết lập & Lên kế hoạch", code: "Planning" },
    { id: 2, name: "Đang chuẩn bị", code: "Preparing" },
    { id: 3, name: "Đang diễn ra", code: "Ongoing" },
    { id: 4, name: "Đã kết thúc & Tổng kết", code: "Closed" }
];

export const defaultEvents = [
    {
        "id": "E-2024-99X",
        "name": "Sự kiện test 2026",
        "category": "Hội thảo Công nghệ",
        "status": "Ongoing",
        "startDate": "2026-10-15",
        "endDate": "2026-10-17",
        "eventType": "Hybrid",
        "location": "Trung tâm Hội nghị Quốc gia, Hà Nội",
        "scale": "small",
        "budget": 500000000,
        "description": "Sự kiện hội tụ hơn 1.500 chuyên gia công nghệ.",
        "directorId": "USR-009",
        "createdAt": "2026-08-01 09:00:00"
    }
];

let eventsList = defaultEvents;
let currentEventIdState = "E-2024-99X";

export async function loadEventsAsync() {
    if (typeof window !== 'undefined') {
        try {
            const res = await fetch('/events.json');
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    eventsList = data;
                    window.dispatchEvent(new CustomEvent('eventaz:events-updated'));
                }
            }
        } catch (err) {
            console.warn('Could not load public/events.json:', err);
        }
    }
    return getEvents();
}

// Tự động nạp dữ liệu từ public/events.json nếu có
if (typeof window !== 'undefined') {
    loadEventsAsync();
}

export function resolveEventDirector(eventObj) {
    if (!eventObj) return eventObj;
    if (eventObj.directorId) {
        const userObj = getUserById(eventObj.directorId);
        if (userObj) {
            eventObj.director = userObj.name;
        }
    }
    return eventObj;
}

export function getEvents() {
    return eventsList.map(e => resolveEventDirector(e));
}

export async function resetEventsToDefault() {
    try {
        const res = await fetch('/events.json');
        if (res.ok) {
            eventsList = await res.json();
        }
    } catch (e) {
        console.error('Failed to reload events.json', e);
    }
    return getEvents();
}

export function getCurrentEventId() {
    return currentEventIdState;
}

export function setCurrentEventId(eventId) {
    currentEventIdState = eventId;
}

export function getCurrentEvent() {
    const events = getEvents();
    const found = events.find(e => e.id === currentEventIdState) || events[0];
    return resolveEventDirector(found);
}

export async function syncEventsToFile(events) {
    try {
        await fetch('/api/save-json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: 'events.json', data: events })
        });
    } catch (e) {
        console.warn('Unable to sync events to events.json on disk', e);
    }
}

export async function uploadImageApi(filename, base64Data) {
    try {
        const res = await fetch('/api/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, base64Data })
        });
        const result = await res.json();
        if (result.success && result.url) {
            return result.url;
        }
    } catch (e) {
        console.warn('Failed to upload image file to server', e);
    }
    return base64Data;
}

export async function deleteImageApi(imageUrl) {
    if (!imageUrl || !imageUrl.startsWith('/uploads/')) return;
    try {
        await fetch('/api/delete-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: imageUrl })
        });
    } catch (e) {
        console.warn('Failed to delete image file from server', e);
    }
}

export function saveEvent(eventData) {
    const index = eventsList.findIndex(e => e.id === eventData.id);
    if (index !== -1) {
        eventsList[index] = eventData;
    } else {
        eventsList.unshift(eventData);
    }
    syncEventsToFile(eventsList);
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('eventaz:events-updated', { detail: eventData }));
    }
    return resolveEventDirector(eventData);
}

export function updateEventEnabledModules(eventId, enabledModules) {
    const events = getEvents();
    const evt = events.find(e => e.id === eventId);
    if (evt) {
        evt.enabledModules = [...enabledModules];
        saveEvent(evt);
    }
    return evt;
}

export function createEvent(eventData) {
    const newId = eventData.id || `E-2026-${Date.now().toString().slice(-4)}`;
    const fullEvent = {
        id: newId,
        name: eventData.name || 'Sự kiện mới',
        category: eventData.category || 'Hội thảo / Triển lãm',
        status: eventData.status || 'Planning',
        startDate: eventData.startDate || '2026-12-01',
        endDate: eventData.endDate || '2026-12-02',
        eventType: eventData.eventType || 'Offline',
        location: eventData.location || 'Trung tâm Hội nghị Quốc gia, Hà Nội',
        scale: eventData.scale || 'mega',
        scope: eventData.scope || 'Public',
        budget: eventData.budget || 500000000,
        description: eventData.description || `Sự kiện ${eventData.name || ''} được khởi tạo thành công.`,
        templateSource: eventData.templateSource || 'custom',
        templateId: eventData.templateId || '',
        enabledModules: eventData.enabledModules || ['wbs', 'personnel', 'runOfShow', 'approvals', 'budget'],
        wbs: eventData.wbs || [],
        auditLogs: [
            {
                id: 'LOG-01',
                timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
                user: 'Nguyễn Văn Trưởng',
                action: `Khởi tạo sự kiện [${eventData.name || newId}]`
            }
        ],
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    return saveEvent(fullEvent);
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
