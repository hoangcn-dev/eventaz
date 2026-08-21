/**
 * EventAZ Mock Data - B2B Enterprise Quotations & Service Contracts (Module 11: FR-11.1 -> FR-11.5)
 */

const QUOTATIONS_STORAGE_KEY = "eventaz_mock_quotations_v1";

export const QUOTATION_STATUSES = {
    "ContractSigned": { code: "ContractSigned", nameVi: "Đã ký hợp đồng", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    "PendingApproval": { code: "PendingApproval", nameVi: "Chờ khách duyệt", color: "bg-amber-100 text-amber-800 border-amber-300" },
    "Rejected": { code: "Rejected", nameVi: "Từ chối / Hủy", color: "bg-red-100 text-red-800 border-red-300" }
};

export const defaultQuotations = [
    {
        id: "QUO-2026-001",
        eventId: "E-2024-99X",
        companyName: "Tập đoàn Công nghệ TechCorp Vietnam",
        contactPerson: "Ông Nguyễn Hoàng Nam (Giám đốc Marketing)",
        contactPhone: "0912 345 678",
        attendeesCount: 1000,
        subtotal: 320000000,
        vatPercent: 10,
        discountAmount: 20000000,
        totalAmount: 332000000,
        creatorName: "Nguyễn Văn Trưởng (Trưởng BTC)",
        createdDate: "2026-08-01 10:00",
        status: "ContractSigned",
        milestones: [
            { step: "Đợt 1", name: "Tạm ứng cọc 50% Hợp đồng sau khi ký", amount: 166000000, status: "Paid" },
            { step: "Đợt 2", name: "Thanh toán 50% sau khi nghiệm thu kết thúc sự kiện", amount: 166000000, status: "Pending" }
        ],
        lineItems: [
            { name: "Thuê Trọn gói Hội trường Main Hall NCC (1 ngày)", qty: 1, unitPrice: 120000000, total: 120000000 },
            { name: "Hệ thống Màn hình LED P2.5 & Ánh sáng Sân khấu Pro", qty: 1, unitPrice: 80000000, total: 80000000 },
            { name: "Tiệc Trà Teabreak VIP 1.000 Khách (Menu 8 món)", qty: 1000, unitPrice: 80000, total: 80000000 },
            { name: "Đội ngũ Nhân sự Điều phối EventAZ (40 nhân viên)", qty: 1, unitPrice: 40000000, total: 40000000 }
        ]
    },
    {
        id: "QUO-2026-002",
        eventId: "E-2024-99X",
        companyName: "Tập đoàn Tài chính & Quỹ Đầu tư V-Capital",
        contactPerson: "Bà Phạm Phương Anh (Head of PR)",
        contactPhone: "0903 888 777",
        attendeesCount: 500,
        subtotal: 180000000,
        vatPercent: 8,
        discountAmount: 10000000,
        totalAmount: 184400000,
        creatorName: "Phạm Hoàng Truyền Thông",
        createdDate: "2026-08-10 14:30",
        status: "PendingApproval",
        milestones: [
            { step: "Đợt 1", name: "Tạm ứng cọc 50% Hợp đồng", amount: 92200000, status: "Pending" },
            { step: "Đợt 2", name: "Thanh toán 50% sau nghiệm thu", amount: 92200000, status: "Pending" }
        ],
        lineItems: [
            { name: "Thuê Hội trường Sảnh A VIP NCC (1/2 ngày)", qty: 1, unitPrice: 70000000, total: 70000000 },
            { name: "Thiết kế & Thi công Backstage 3D Mapping", qty: 1, unitPrice: 50000000, total: 50000000 },
            { name: "Tiệc Teabreak Cao cấp (500 suất)", qty: 500, unitPrice: 120000, total: 60000000 }
        ]
    }
];

export function getQuotations(eventId) {
    try {
        const raw = localStorage.getItem(QUOTATIONS_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                if (eventId) return parsed.filter(q => q.eventId === eventId);
                return parsed;
            }
        }
    } catch (e) {
        console.error("Error reading quotations data", e);
    }
    localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(defaultQuotations));
    return defaultQuotations;
}

export function saveQuotation(quoData) {
    const list = getQuotations();
    const index = list.findIndex(q => q.id === quoData.id);
    if (index !== -1) {
        list[index] = quoData;
    } else {
        list.unshift(quoData);
    }
    localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(list));
    return quoData;
}

export function deleteQuotation(quoId) {
    let list = getQuotations();
    list = list.filter(q => q.id !== quoId);
    localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(list));
}

export function changeQuotationStatus(quoId, newStatus) {
    const list = getQuotations();
    const target = list.find(q => q.id === quoId);
    if (target) {
        target.status = newStatus;
        localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(list));
    }
    return target;
}

export function calculateQuotationsSummary(eventId) {
    const list = getQuotations(eventId);
    const total = list.length;
    const signedCount = list.filter(q => q.status === "ContractSigned").length;
    const pendingCount = list.filter(q => q.status === "PendingApproval").length;
    const rejectedCount = list.filter(q => q.status === "Rejected").length;

    const totalB2bRevenue = list
        .filter(q => q.status === "ContractSigned")
        .reduce((sum, item) => sum + (Number(item.totalAmount) || 0), 0);

    const conversionRate = total > 0 ? Math.round((signedCount / total) * 100) : 0;

    return {
        total,
        signedCount,
        pendingCount,
        rejectedCount,
        totalB2bRevenue,
        conversionRate
    };
}
