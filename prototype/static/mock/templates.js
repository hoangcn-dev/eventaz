/**
 * EventAZ Mock Data - Templates Library (FR-01.5 & FR-01.2)
 */
window.EventAZMockData = window.EventAZMockData || {};

// Trạng thái lưu trữ mẫu sự kiện trong localStorage
const TEMPLATES_STORAGE_KEY = "eventaz_mock_templates_v1";

const defaultTemplates = [
    {
        id: "TPL-001",
        name: "Hội nghị Công nghệ & Triển lãm (Tech Summit)",
        category: "Hội thảo / Triển lãm",
        description: "Template chuẩn dành cho các sự kiện hội thảo công nghệ quy mô 500 - 2000 khách với 2 phiên thảo luận chính, khu triển lãm boot và tiệc Gala.",
        scope: "organization", // 'organization' | 'private'
        scopeVi: "Toàn tổ chức",
        createdBy: "Nguyễn Văn Trưởng",
        createdAt: "2026-01-15",
        usageCount: 14,
        wbsGroups: [
            { id: "WBS-T1", name: "Nội dung & Diễn giả", leadId: "USR-003", leadName: "Lê Văn Nội Dung", taskCount: 8 },
            { id: "WBS-T2", name: "Hậu cần & Địa điểm", leadId: "USR-002", leadName: "Trần Thị Hậu Cần", taskCount: 12 },
            { id: "WBS-T3", name: "Truyền thông & Báo chí", leadId: "USR-004", leadName: "Phạm Hoàng Truyền Thông", taskCount: 6 },
            { id: "WBS-T4", name: "Đón tiếp & VIP Guests", leadId: "USR-005", leadName: "Đỗ Minh Đối Ngoại", taskCount: 5 },
            { id: "WBS-T5", name: "Tài chính & Ngân sách", leadId: "USR-001", leadName: "Nguyễn Văn Trưởng", taskCount: 4 },
            { id: "WBS-T6", name: "An ninh & Kỹ thuật", leadId: "USR-002", leadName: "Trần Thị Hậu Cần", taskCount: 7 }
        ]
    },
    {
        id: "TPL-002",
        name: "Lễ Ra mắt Sản phẩm Mới (Product Launch)",
        category: "Event Doanh nghiệp",
        description: "Kịch bản chuẩn ra mắt sản phẩm cao cấp, trình diễn sân khấu 3D mapping, trải nghiệm sản phẩm trực tiếp và họp báo.",
        scope: "organization",
        scopeVi: "Toàn tổ chức",
        createdBy: "Phạm Hoàng Truyền Thông",
        createdAt: "2026-02-10",
        usageCount: 9,
        wbsGroups: [
            { id: "WBS-T21", name: "Sân khấu & Âm thanh Ánh sáng", leadId: "USR-002", leadName: "Trần Thị Hậu Cần", taskCount: 10 },
            { id: "WBS-T22", name: "Kịch bản Trình diễn & MC", leadId: "USR-003", leadName: "Lê Văn Nội Dung", taskCount: 7 },
            { id: "WBS-T23", name: "Thông cáo Báo chí & KOLs", leadId: "USR-004", leadName: "Phạm Hoàng Truyền Thông", taskCount: 9 },
            { id: "WBS-T24", name: "Quà tặng & Check-in", leadId: "USR-005", leadName: "Đỗ Minh Đối Ngoại", taskCount: 4 }
        ]
    },
    {
        id: "TPL-003",
        name: "Teambuilding & Ngày hội Gia đình (Company Trip)",
        category: "Hoạt động Nội bộ",
        description: "Template tổ chức teambuilding ngoài trời cho 100 - 500 nhân sự kết hợp đêm Gala Dinner trao giải.",
        scope: "private",
        scopeVi: "Chỉ mình tôi",
        createdBy: "Trần Thị Hậu Cần",
        createdAt: "2026-03-01",
        usageCount: 3,
        wbsGroups: [
            { id: "WBS-T31", name: "Trò chơi Teambuilding", leadId: "USR-003", leadName: "Lê Văn Nội Dung", taskCount: 6 },
            { id: "WBS-T32", name: "Xe đưa đón & Khách sạn", leadId: "USR-002", leadName: "Trần Thị Hậu Cần", taskCount: 8 },
            { id: "WBS-T33", name: "Tiệc Gala Dinner & Đồng phục", leadId: "USR-002", leadName: "Trần Thị Hậu Cần", taskCount: 5 }
        ]
    }
];

// Hàm load danh sách templates
window.EventAZMockData.getTemplates = function () {
    const stored = localStorage.getItem(TEMPLATES_STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(defaultTemplates));
        return defaultTemplates;
    }
    try {
        return JSON.parse(stored);
    } catch (e) {
        return defaultTemplates;
    }
};

// Hàm thêm template mới (FR-01.5)
window.EventAZMockData.addTemplate = function (templateData) {
    const list = window.EventAZMockData.getTemplates();
    const newTpl = {
        id: "TPL-" + String(list.length + 1).padStart(3, "0"),
        name: templateData.name,
        category: templateData.category || "Hội thảo / Sự kiện",
        description: templateData.description || "",
        scope: templateData.scope || "private",
        scopeVi: templateData.scope === "organization" ? "Toàn tổ chức" : "Chỉ mình tôi",
        createdBy: "Nguyễn Văn Trưởng",
        createdAt: new Date().toISOString().split("T")[0],
        usageCount: 0,
        wbsGroups: templateData.wbsGroups || []
    };
    list.unshift(newTpl);
    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(list));
    return newTpl;
};
