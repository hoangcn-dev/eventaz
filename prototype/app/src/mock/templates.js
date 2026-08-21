/**
 * EventAZ Mock Data - Event Templates (ESM Module)
 */
const TEMPLATES_STORAGE_KEY = "eventaz_mock_templates_v1";

export const defaultTemplates = [
    {
        id: "TPL-001",
        name: "Hội nghị Công nghệ Tiêu chuẩn",
        category: "Hội thảo / Triển lãm",
        description: "Template chuẩn quy mô 500 - 2.000 khách cho các sự kiện Tech Conference, tích hợp đầy đủ quy trình mời VIP, livestream và triển lãm Booth.",
        isGlobal: true,
        createdByName: "Hệ thống EventAZ",
        createdAt: "2026-07-10 10:00:00",
        usageCount: 14,
        wbsCategories: [
            { id: "TWBS-01", name: "Ban Nội dung & Diễn giả VIP", defaultLeadRole: "Trưởng nhóm Nội dung", taskCount: 8 },
            { id: "TWBS-02", name: "Hạ tầng Kỹ thuật & Sound/Light", defaultLeadRole: "Trưởng nhóm Kỹ thuật", taskCount: 6 },
            { id: "TWBS-03", name: "Đón tiếp & Quản lý Vé Check-in", defaultLeadRole: "Trưởng nhóm Hậu cần", taskCount: 5 },
            { id: "TWBS-04", name: "Truyền thông & Báo chí", defaultLeadRole: "Trưởng nhóm Truyền thông", taskCount: 7 }
        ]
    },
    {
        id: "TPL-002",
        name: "Product Launch & Khai Trương",
        category: "Event Doanh nghiệp",
        description: "Thiết kế tối ưu cho lễ ra mắt sản phẩm mới, yêu cầu bảo mật thông tin cao, kịch bản bùng nổ và trải nghiệm khách mời thương gia.",
        isGlobal: true,
        createdByName: "Hệ thống EventAZ",
        createdAt: "2026-07-15 14:20:00",
        usageCount: 9,
        wbsCategories: [
            { id: "TWBS-05", name: "Kịch bản Sân khấu & Key Visual", defaultLeadRole: "Trưởng nhóm Nội dung", taskCount: 10 },
            { id: "TWBS-06", name: "Quản lý PG/PB & Lễ tân", defaultLeadRole: "Trưởng nhóm Khách mời", taskCount: 4 },
            { id: "TWBS-07", name: "Quay phim / Chụp ảnh / PR Press", defaultLeadRole: "Trưởng nhóm Truyền thông", taskCount: 6 }
        ]
    },
    {
        id: "TPL-003",
        name: "Teambuilding & Gala Dinner Doanh Nghiệp",
        category: "Hoạt động Nội bộ",
        description: "Kế hoạch sự kiện gắn kết nội bộ từ 100 đến 1.000 nhân viên, bao gồm lưu trú, trò chơi bãi biển và đêm tiệc tri ân.",
        isGlobal: false,
        createdByName: "Nguyễn Văn Trưởng",
        createdAt: "2026-08-02 11:30:00",
        usageCount: 3,
        wbsCategories: [
            { id: "TWBS-08", name: "Vận chuyển & Khách sạn", defaultLeadRole: "Trưởng nhóm Hậu cần", taskCount: 6 },
            { id: "TWBS-09", name: "Game outdoor & Quà tặng", defaultLeadRole: "Trưởng nhóm Hậu cần", taskCount: 5 },
            { id: "TWBS-10", name: "Tiệc Gala & Đội ngũ MC", defaultLeadRole: "Trưởng nhóm Nội dung", taskCount: 8 }
        ]
    }
];

export function getTemplates() {
    const raw = localStorage.getItem(TEMPLATES_STORAGE_KEY);
    if (!raw) {
        localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(defaultTemplates));
        return defaultTemplates;
    }
    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error("Lỗi đọc dữ liệu Templates từ localStorage", e);
        return defaultTemplates;
    }
}

export function getTemplateById(templateId) {
    const templates = getTemplates();
    return templates.find(t => t.id === templateId) || null;
}

export function saveTemplate(newTemplate) {
    const templates = getTemplates();
    templates.unshift(newTemplate);
    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates));
    return newTemplate;
}
