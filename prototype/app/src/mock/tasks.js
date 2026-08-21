/**
 * EventAZ Mock Data - Tasks & Work Management (Module 02: FR-02.1 -> FR-02.7)
 */
import { getUsers } from './users.js';

const TASKS_STORAGE_KEY = "eventaz_mock_tasks_v5";

export const TASK_STATUSES = {
    "To Do": { code: "To Do", nameVi: "Chưa làm", color: "bg-slate-500", bgLight: "bg-slate-100", textColor: "text-slate-700", stepOrder: 1 },
    "In Progress": { code: "In Progress", nameVi: "Đang làm", color: "bg-blue-600", bgLight: "bg-blue-50", textColor: "text-blue-700", stepOrder: 2 },
    "Pending Review": { code: "Pending Review", nameVi: "Chờ duyệt", color: "bg-amber-500", bgLight: "bg-amber-50", textColor: "text-amber-700", stepOrder: 3 },
    "Done": { code: "Done", nameVi: "Hoàn thành", color: "bg-emerald-600", bgLight: "bg-emerald-50", textColor: "text-emerald-700", stepOrder: 4 }
};

export const TASK_PRIORITIES = {
    "Low": { code: "Low", nameVi: "Thấp", color: "bg-gray-100 text-gray-700 border-gray-300" },
    "Medium": { code: "Medium", nameVi: "Trung bình", color: "bg-blue-100 text-blue-800 border-blue-300" },
    "High": { code: "High", nameVi: "Cao", color: "bg-amber-100 text-amber-800 border-amber-300" },
    "Urgent": { code: "Urgent", nameVi: "Khẩn cấp", color: "bg-red-100 text-red-800 border-red-300" }
};

export const defaultTasks = [
    {
        id: "TSK-001",
        eventId: "E-2024-99X",
        name: "Khảo sát và chốt sơ đồ mặt bằng gian hàng tại NCC",
        wbsId: "WBS-02",
        wbsName: "Hậu cần & Địa điểm",
        priority: "High",
        status: "Done",
        startDate: "2026-08-01 08:00",
        dueDate: "2026-08-10 17:30",
        isOverdue: false,
        raci: {
            responsibleId: "USR-002",
            responsibleName: "Trần Thị Hậu Cần",
            accountableId: "USR-001",
            accountableName: "Nguyễn Văn Trưởng"
        },
        description: "Tiến hành làm việc với ban quản lý Trung tâm Hội nghị Quốc gia để duyệt sơ đồ 50 booth triển lãm.",
        completionNotes: "Đã hoàn thành bàn giao sơ đồ 50 booth triển lãm được NCC phê duyệt chính thức.",
        attachments: [
            { id: "ATT-01", name: "So_Do_Mat_Bang_NCC_v2.pdf", size: "3.2 MB", uploadDate: "2026-08-05 14:20", uploader: "Trần Thị Hậu Cần" }
        ],
        predecessorTaskId: null
    },
    {
        id: "TSK-002",
        eventId: "E-2024-99X",
        name: "Gửi thư mời và xác nhận lịch trình cho 20 diễn giả VIP",
        wbsId: "WBS-01",
        wbsName: "Nội dung & Diễn giả",
        priority: "Urgent",
        status: "Pending Review",
        startDate: "2026-08-05 09:15",
        dueDate: "2026-08-25 18:00",
        isOverdue: false,
        raci: {
            responsibleId: "USR-003",
            responsibleName: "Lê Văn Nội Dung",
            accountableId: "USR-001",
            accountableName: "Nguyễn Văn Trưởng"
        },
        description: "Gửi Email chính thức đính kèm Vé máy bay và Khách sạn cho các diễn giả quốc tế.",
        completionNotes: "Đã gửi 20 email xác nhận và đính kèm vé máy bay khứ hồi.",
        attachments: [
            { id: "ATT-02", name: "Danh_Sach_Speaker_Xac_Nhan.xlsx", size: "1.5 MB", uploadDate: "2026-08-12 10:45", uploader: "Lê Văn Nội Dung" }
        ],
        predecessorTaskId: "TSK-001"
    },
    {
        id: "TSK-003",
        eventId: "E-2024-99X",
        name: "Duyệt bộ nhận diện thương hiệu Key Visual & Backdrop",
        wbsId: "WBS-03",
        wbsName: "Truyền thông & Tiếp thị",
        priority: "High",
        status: "In Progress",
        startDate: "2026-08-10 14:00",
        dueDate: "2026-08-18 12:00",
        isOverdue: true,
        raci: {
            responsibleId: "USR-004",
            responsibleName: "Phạm Hoàng Truyền Thông",
            accountableId: "USR-001",
            accountableName: "Nguyễn Văn Trưởng"
        },
        description: "Hoàn thiện thiết kế Key Visual chính thức, phướn đường và standee.",
        completionNotes: "",
        attachments: [],
        predecessorTaskId: null
    },
    {
        id: "TSK-004",
        eventId: "E-2024-99X",
        name: "Kiểm tra và thử nghiệm hạ tầng Mạng & Màn hình LED P2.5",
        wbsId: "WBS-06",
        wbsName: "An ninh & Hạ tầng Kỹ thuật",
        priority: "Medium",
        status: "To Do",
        startDate: "2026-09-01 08:30",
        dueDate: "2026-09-10 17:00",
        isOverdue: false,
        raci: {
            responsibleId: "USR-006",
            responsibleName: "Vũ Anh Kỹ Thuật",
            accountableId: "USR-001",
            accountableName: "Nguyễn Văn Trưởng"
        },
        description: "Lắp đặt và tổng duyệt kỹ thuật màn hình LED 12m x 5m và hệ thống âm thanh Line Array.",
        completionNotes: "",
        attachments: [],
        predecessorTaskId: "TSK-003"
    },
    {
        id: "TSK-005",
        eventId: "E-2024-99X",
        name: "Phát hành hệ thống Vé điện tử QR Code Tier 1 & VIP",
        wbsId: "WBS-05",
        wbsName: "Tài chính & Vé",
        priority: "High",
        status: "Done",
        startDate: "2026-08-02 08:00",
        dueDate: "2026-08-12 16:30",
        isOverdue: false,
        raci: {
            responsibleId: "USR-005",
            responsibleName: "Hoàng Mỹ Thiết Kế",
            accountableId: "USR-001",
            accountableName: "Nguyễn Văn Trưởng"
        },
        description: "Mở cổng đăng ký vé trực tuyến tích hợp thanh toán VnPay & Momo.",
        completionNotes: "Cổng vé điện tử hoạt động ổn định, bán ra 1.200 vé Tier 1.",
        attachments: [],
        predecessorTaskId: null
    },
    {
        id: "TSK-006",
        eventId: "E-2024-99X",
        name: "Setup khu vực Check-in tự động và phát Thẻ đeo Báo chí",
        wbsId: "WBS-02",
        wbsName: "Hậu cần & Địa điểm",
        priority: "Medium",
        status: "To Do",
        startDate: "2026-09-05 07:30",
        dueDate: "2026-09-11 11:30",
        isOverdue: false,
        raci: {
            responsibleId: "USR-002",
            responsibleName: "Trần Thị Hậu Cần",
            accountableId: "USR-001",
            accountableName: "Nguyễn Văn Trưởng"
        },
        description: "Bố trí 6 làn check-in tự động bằng mã QR và máy in thẻ nhiệt.",
        completionNotes: "",
        attachments: [],
        predecessorTaskId: "TSK-001"
    },
    {
        id: "TSK-007",
        eventId: "E-2024-99X",
        name: "Lập kịch bản chi tiết Run-of-Show cho Đêm Khai mạc",
        wbsId: "WBS-01",
        wbsName: "Nội dung & Diễn giả",
        priority: "Urgent",
        status: "In Progress",
        startDate: "2026-08-15 13:00",
        dueDate: "2026-08-28 20:00",
        isOverdue: false,
        raci: {
            responsibleId: "USR-003",
            responsibleName: "Lê Văn Nội Dung",
            accountableId: "USR-001",
            accountableName: "Nguyễn Văn Trưởng"
        },
        description: "Phân chia thời lượng từng phát biểu, trình chiếu video clip và tiết mục nghệ thuật.",
        completionNotes: "",
        attachments: [],
        predecessorTaskId: "TSK-002"
    },
    {
        id: "TSK-008",
        eventId: "E-2024-99X",
        name: "Chạy chiến dịch Facebook Ads & bài PR trên VnExpress",
        wbsId: "WBS-03",
        wbsName: "Truyền thông & Tiếp thị",
        priority: "Medium",
        status: "Done",
        startDate: "2026-08-05 09:00",
        dueDate: "2026-08-20 18:00",
        isOverdue: false,
        raci: {
            responsibleId: "USR-004",
            responsibleName: "Phạm Hoàng Truyền Thông",
            accountableId: "USR-001",
            accountableName: "Nguyễn Văn Trưởng"
        },
        description: "Đăng tải 5 bài báo chí bảo trợ truyền thông và chạy quảng cáo nhắm mục tiêu doanh nghiệp.",
        completionNotes: "Đã đạt 150.000 lượt tiếp cận và 5 bài PR lên trang chủ VnExpress.",
        attachments: [],
        predecessorTaskId: "TSK-003"
    },
    {
        id: "TSK-009",
        eventId: "E-2024-99X",
        name: "Tập huấn quy trình An ninh và Phòng cháy chữa cháy",
        wbsId: "WBS-06",
        wbsName: "An ninh & Hạ tầng Kỹ thuật",
        priority: "High",
        status: "To Do",
        startDate: "2026-09-02 08:00",
        dueDate: "2026-09-08 16:30",
        isOverdue: false,
        raci: {
            responsibleId: "USR-006",
            responsibleName: "Vũ Anh Kỹ Thuật",
            accountableId: "USR-001",
            accountableName: "Nguyễn Văn Trưởng"
        },
        description: "Hợp tác với Đội Cảnh sát PCCC kiểm tra toàn bộ cửa thoát hiểm và bình chữa cháy.",
        completionNotes: "",
        attachments: [],
        predecessorTaskId: null
    },
    {
        id: "TSK-010",
        eventId: "E-2024-99X",
        name: "Tổng duyệt kịch bản âm thanh, ánh sáng và tổng duyệt MC",
        wbsId: "WBS-01",
        wbsName: "Nội dung & Diễn giả",
        priority: "Urgent",
        status: "To Do",
        startDate: "2026-09-10 14:00",
        dueDate: "2026-09-11 22:00",
        isOverdue: false,
        raci: {
            responsibleId: "USR-003",
            responsibleName: "Lê Văn Nội Dung",
            accountableId: "USR-001",
            accountableName: "Nguyễn Văn Trưởng"
        },
        description: "Rehearsal toàn bộ chương trình lần cuối trước giờ G khai mạc.",
        completionNotes: "",
        attachments: [],
        predecessorTaskId: "TSK-007"
    },
    {
        id: "TSK-011",
        eventId: "E-2024-99X",
        name: "Gửi thư cảm ơn Diễn giả & Nhà tài trợ sau sự kiện",
        wbsId: "WBS-03",
        wbsName: "Truyền thông & Tiếp thị",
        priority: "Low",
        status: "To Do",
        startDate: "2026-09-16 09:00",
        dueDate: "2026-09-18 17:30",
        isOverdue: false,
        raci: {
            responsibleId: "USR-004",
            responsibleName: "Phạm Hoàng Truyền Thông",
            accountableId: "USR-001",
            accountableName: "Nguyễn Văn Trưởng"
        },
        description: "Gửi đĩa ảnh kỷ niệm và Thư cảm ơn chính thức kèm báo cáo truyền thông.",
        completionNotes: "",
        attachments: [],
        predecessorTaskId: "TSK-010"
    },
    {
        id: "TSK-012",
        eventId: "E-2024-99X",
        name: "Quyết toán Ngân sách và hoàn thiện Báo cáo Tài chính",
        wbsId: "WBS-05",
        wbsName: "Tài chính & Vé",
        priority: "High",
        status: "To Do",
        startDate: "2026-09-16 08:30",
        dueDate: "2026-09-20 17:00",
        isOverdue: false,
        raci: {
            responsibleId: "USR-005",
            responsibleName: "Hoàng Mỹ Thiết Kế",
            accountableId: "USR-001",
            accountableName: "Nguyễn Văn Trưởng"
        },
        description: "Tổng hợp toàn bộ hóa đơn thực chi so sánh với dự toán ngân sách phê duyệt ban đầu.",
        completionNotes: "",
        attachments: [],
        predecessorTaskId: null
    }
];

export function getTasks(eventId) {
    let tasks = [];
    try {
        const raw = localStorage.getItem(TASKS_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                tasks = parsed;
            }
        }
    } catch (e) {
        console.error("Error reading tasks from localStorage", e);
    }

    if (!tasks || tasks.length === 0) {
        tasks = defaultTasks;
        try {
            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(defaultTasks));
        } catch (e) {
            console.error("Error writing default tasks to localStorage", e);
        }
    }

    if (eventId) {
        const filtered = tasks.filter(t => t && t.eventId === eventId);
        if (filtered.length === 0) {
            return defaultTasks.map(t => ({ ...t, eventId }));
        }
        return filtered;
    }
    return tasks;
}

export function saveTask(task) {
    const tasks = getTasks();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
        tasks[index] = task;
    } else {
        tasks.unshift(task);
    }
    try {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
        console.error("Error saving task", e);
    }
    return task;
}

export function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.id !== taskId);
    try {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
        console.error("Error deleting task", e);
    }
}

export function changeTaskStatus(taskId, newStatus) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;
        if (newStatus === "Done") {
            task.isOverdue = false;
        }
        try {
            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
        } catch (e) {
            console.error("Error changing task status", e);
        }
    }
    return task;
}

export function addTaskAttachment(taskId, attachment) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.attachments = task.attachments || [];
        task.attachments.unshift(attachment);
        try {
            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
        } catch (e) {
            console.error("Error adding attachment", e);
        }
    }
    return task;
}
