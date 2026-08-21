/**
 * EventAZ Mock Data - Management Approvals Center (Tab Phê Duyệt Quản Lý)
 */

const APPROVALS_STORAGE_KEY = "eventaz_mock_approvals_v1";

export const APPROVAL_TYPES = {
    "Budget": { code: "Budget", nameVi: "Kinh phí Ngân sách", icon: "payments", color: "bg-purple-100 text-purple-800 border-purple-300" },
    "Task": { code: "Task", nameVi: "Nghiệm thu Công việc", icon: "task_alt", color: "bg-blue-100 text-blue-800 border-blue-300" },
    "Media": { code: "Media", nameVi: "Bài viết Truyền thông", icon: "campaign", color: "bg-amber-100 text-amber-800 border-amber-300" },
    "VIP": { code: "VIP", nameVi: "Hậu cần VIP Diễn giả", icon: "stars", color: "bg-emerald-100 text-emerald-800 border-emerald-300" }
};

export const APPROVAL_STATUSES = {
    "Pending": { code: "Pending", nameVi: "Chờ phê duyệt", color: "bg-amber-100 text-amber-800 border-amber-300" },
    "Approved": { code: "Approved", nameVi: "Đã phê duyệt", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    "Rejected": { code: "Rejected", nameVi: "Từ chối", color: "bg-red-100 text-red-800 border-red-300" }
};

export const defaultApprovals = [
    {
        id: "APR-001",
        eventId: "E-2024-99X",
        type: "Budget",
        title: "Trình duyệt Khoản chi Đặt cọc địa điểm NCC 50% Hợp đồng",
        valueDisplay: "60.000.000 ₫",
        requesterId: "USR-002",
        requesterName: "Trần Thị Hậu Cần",
        requesterRole: "Trưởng ban Hậu cần",
        requestDate: "2026-08-05 10:30",
        status: "Pending",
        notes: "Đính kèm Hợp đồng đặt cọc số 12/HD-NCC phê duyệt đợt 1.",
        approverName: null,
        approvedDate: null
    },
    {
        id: "APR-002",
        eventId: "E-2024-99X",
        type: "Task",
        title: "Trình duyệt Nghiệm thu Task Khảo sát sơ đồ 50 gian hàng triển lãm",
        valueDisplay: "Task: TSK-001",
        requesterId: "USR-002",
        requesterName: "Trần Thị Hậu Cần",
        requesterRole: "Trưởng ban Hậu cần",
        requestDate: "2026-08-10 16:00",
        status: "Approved",
        notes: "Đã hoàn thành sơ đồ 50 booth triển lãm được NCC duyệt.",
        approverName: "Nguyễn Văn Trưởng",
        approvedDate: "2026-08-10 17:30"
    },
    {
        id: "APR-003",
        eventId: "E-2024-99X",
        type: "Media",
        title: "Trình duyệt Nội dung Bài PR Trang chủ VnExpress Công nghệ",
        valueDisplay: "25.000.000 ₫",
        requesterId: "USR-004",
        requesterName: "Phạm Hoàng Truyền Thông",
        requesterRole: "Trưởng ban Truyền thông",
        requestDate: "2026-08-12 11:15",
        status: "Approved",
        notes: "Duyệt kịch bản phỏng vấn Trưởng BTC trước khi gửi xuất bản.",
        approverName: "Nguyễn Văn Trưởng",
        approvedDate: "2026-08-12 14:00"
    },
    {
        id: "APR-004",
        eventId: "E-2024-99X",
        type: "VIP",
        title: "Trình duyệt Đặt phòng Khách sạn 5 sao JW Marriott cho Diễn giả Quốc tế",
        valueDisplay: "18.500.000 ₫",
        requesterId: "USR-003",
        requesterName: "Lê Văn Nội Dung",
        requesterRole: "Trưởng ban Nội dung",
        requestDate: "2026-08-15 09:45",
        status: "Pending",
        notes: "Đơn giá 4.500.000 ₫/đêm cho Dr. Alexander Wright (4 đêm).",
        approverName: null,
        approvedDate: null
    },
    {
        id: "APR-005",
        eventId: "E-2024-99X",
        type: "Budget",
        title: "Trình duyệt Hợp đồng Thuê Màn hình LED P2.5 12m x 5m Ánh sáng",
        valueDisplay: "35.000.000 ₫",
        requesterId: "USR-006",
        requesterName: "Vũ Anh Kỹ Thuật",
        requesterRole: "Trưởng ban Kỹ thuật",
        requestDate: "2026-08-16 14:20",
        status: "Pending",
        notes: "Công ty ProAudio báo giá cạnh tranh nhất trong 3 đơn vị.",
        approverName: null,
        approvedDate: null
    }
];

export function getApprovals(eventId) {
    try {
        const raw = localStorage.getItem(APPROVALS_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                if (eventId) return parsed.filter(a => a.eventId === eventId);
                return parsed;
            }
        }
    } catch (e) {
        console.error("Error reading approvals data", e);
    }
    localStorage.setItem(APPROVALS_STORAGE_KEY, JSON.stringify(defaultApprovals));
    return defaultApprovals;
}

export function approveRequest(requestId, notes) {
    const list = getApprovals();
    const target = list.find(a => a.id === requestId);
    if (target) {
        target.status = "Approved";
        target.approverName = "Nguyễn Văn Trưởng (Trưởng BTC)";
        target.approvedDate = new Date().toISOString().replace('T', ' ').slice(0, 16);
        if (notes) target.notes = `${target.notes} [Ghi chú duyệt: ${notes}]`;
        localStorage.setItem(APPROVALS_STORAGE_KEY, JSON.stringify(list));
    }
    return target;
}

export function rejectRequest(requestId, reason) {
    const list = getApprovals();
    const target = list.find(a => a.id === requestId);
    if (target) {
        target.status = "Rejected";
        target.approverName = "Nguyễn Văn Trưởng (Trưởng BTC)";
        target.approvedDate = new Date().toISOString().replace('T', ' ').slice(0, 16);
        target.notes = `${target.notes} [Lý do từ chối: ${reason || 'Chưa đạt yêu cầu'}]`;
        localStorage.setItem(APPROVALS_STORAGE_KEY, JSON.stringify(list));
    }
    return target;
}

export function calculateApprovalSummary(eventId) {
    const list = getApprovals(eventId);
    const total = list.length;
    const pending = list.filter(a => a.status === "Pending").length;
    const approved = list.filter(a => a.status === "Approved").length;
    const rejected = list.filter(a => a.status === "Rejected").length;

    return {
        total,
        pending,
        approved,
        rejected
    };
}
