/**
 * EventAZ Mock Data - Budget & Financial Management (Module 04: FR-04.1 -> FR-04.4)
 */

const BUDGET_STORAGE_KEY = "eventaz_mock_budget_v1";
const EXPENSES_STORAGE_KEY = "eventaz_mock_expenses_v1";

export const PAYMENT_STATUSES = {
    "Paid": { code: "Paid", nameVi: "Đã thanh toán", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    "Advanced": { code: "Advanced", nameVi: "Tạm ứng", color: "bg-blue-100 text-blue-800 border-blue-300" },
    "Pending": { code: "Pending", nameVi: "Chờ thanh toán", color: "bg-amber-100 text-amber-800 border-amber-300" }
};

export const defaultBudgets = {
    "E-2024-99X": {
        eventId: "E-2024-99X",
        totalApprovedBudget: 350000000, // 350 Triệu VNĐ
        contingencyReserve: 30000000,    // 30 Triệu VNĐ dự phòng
        wbsAllocations: [
            { wbsId: "WBS-01", wbsName: "Nội dung & Diễn giả", allocatedBudget: 60000000 },
            { wbsId: "WBS-02", wbsName: "Hậu cần & Địa điểm", allocatedBudget: 120000000 },
            { wbsId: "WBS-03", wbsName: "Truyền thông & Tiếp thị", allocatedBudget: 50000000 },
            { wbsId: "WBS-04", wbsName: "Đón tiếp & Khách mời", allocatedBudget: 30000000 },
            { wbsId: "WBS-05", wbsName: "Tài chính & Vé", allocatedBudget: 20000000 },
            { wbsId: "WBS-06", wbsName: "An ninh & Hạ tầng Kỹ thuật", allocatedBudget: 40000000 }
        ]
    }
};

export const defaultExpenses = [
    {
        id: "EXP-001",
        eventId: "E-2024-99X",
        invoiceNo: "HD-2026-8801",
        title: "Đặt cọc thuê hội trường lớn NCC (50% Hợp đồng)",
        wbsId: "WBS-02",
        wbsName: "Hậu cần & Địa điểm",
        vendor: "Trung tâm Hội nghị Quốc gia NCC",
        amount: 60000000,
        paymentStatus: "Paid",
        expenseDate: "2026-08-05 10:00",
        uploader: "Trần Thị Hậu Cần",
        notes: "Chuyển khoản đặt cọc đợt 1 theo Hợp đồng số 12/HD-NCC."
    },
    {
        id: "EXP-002",
        eventId: "E-2024-99X",
        invoiceNo: "HD-2026-9102",
        title: "Thanh toán vé máy bay khứ hồi & Khách sạn 20 Diễn giả VIP",
        wbsId: "WBS-01",
        wbsName: "Nội dung & Diễn giả",
        vendor: "Công ty Lữ hành VietnamTravel",
        amount: 45000000,
        paymentStatus: "Paid",
        expenseDate: "2026-08-12 14:30",
        uploader: "Lê Văn Nội Dung",
        notes: "Vé máy bay hạng Business cho 5 Diễn giả Quốc tế và Deluxe cho 15 Diễn giả trong nước."
    },
    {
        id: "EXP-003",
        eventId: "E-2024-99X",
        invoiceNo: "HD-2026-9504",
        title: "Thuê màn hình LED P2.5 12m x 5m & Hệ thống âm thanh Line Array",
        wbsId: "WBS-06",
        wbsName: "An ninh & Hạ tầng Kỹ thuật",
        vendor: "Công ty Âm thanh Ánh sáng ProAudio",
        amount: 35000000,
        paymentStatus: "Advanced",
        expenseDate: "2026-08-14 09:15",
        uploader: "Vũ Anh Kỹ Thuật",
        notes: "Đã tạm ứng 50% chi phí thuê thiết bị."
    },
    {
        id: "EXP-004",
        eventId: "E-2024-99X",
        name: "In ấn Băng rôn, Phướn đường & Standee bộ Key Visual",
        wbsId: "WBS-03",
        wbsName: "Truyền thông & Tiếp thị",
        vendor: "Xưởng in Quảng cáo Hà Nội",
        amount: 18000000,
        paymentStatus: "Paid",
        expenseDate: "2026-08-15 11:20",
        uploader: "Phạm Hoàng Truyền Thông",
        notes: "Bao gồm 500 standee và 20 băng rôn treo các tuyến phố chính."
    },
    {
        id: "EXP-005",
        eventId: "E-2024-99X",
        invoiceNo: "HD-2026-9905",
        title: "Tạm ứng mua Quà tặng Lưu niệm & Thẻ đeo Báo chí",
        wbsId: "WBS-04",
        wbsName: "Đón tiếp & Khách mời",
        vendor: "Công ty Quà tặng Doanh nghiệp Việt",
        amount: 15000000,
        paymentStatus: "Advanced",
        expenseDate: "2026-08-16 16:00",
        uploader: "Đỗ Minh Đối Ngoại",
        notes: "500 bộ quà tặng gồm sổ tay da và bình giữ nhiệt khắc logo."
    },
    {
        id: "EXP-006",
        eventId: "E-2024-99X",
        invoiceNo: "HD-2026-9988",
        title: "Chi phí thuê bảo vệ an ninh & Đội PCCC trực sự kiện",
        wbsId: "WBS-06",
        wbsName: "An ninh & Hạ tầng Kỹ thuật",
        vendor: "Công ty Dịch vụ An ninh Bảo An",
        amount: 12000000,
        paymentStatus: "Pending",
        expenseDate: "2026-08-17 08:30",
        uploader: "Vũ Anh Kỹ Thuật",
        notes: "Bố trí 15 nhân viên an ninh trực ca 12 tiếng."
    }
];

export function getEventBudget(eventId) {
    try {
        const raw = localStorage.getItem(BUDGET_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed[eventId]) return parsed[eventId];
        }
    } catch (e) {
        console.error("Error reading budget data", e);
    }
    return defaultBudgets["E-2024-99X"];
}

export function saveEventBudget(eventId, budgetData) {
    let allBudgets = {};
    try {
        const raw = localStorage.getItem(BUDGET_STORAGE_KEY);
        if (raw) allBudgets = JSON.parse(raw);
    } catch (e) {
        console.error("Error reading budgets", e);
    }
    allBudgets[eventId] = budgetData;
    localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(allBudgets));
}

export function getExpenses(eventId) {
    try {
        const raw = localStorage.getItem(EXPENSES_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                if (eventId) return parsed.filter(x => x.eventId === eventId);
                return parsed;
            }
        }
    } catch (e) {
        console.error("Error reading expenses data", e);
    }
    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(defaultExpenses));
    return defaultExpenses;
}

export function saveExpense(expenseData) {
    const expenses = getExpenses();
    const index = expenses.findIndex(x => x.id === expenseData.id);
    if (index !== -1) {
        expenses[index] = expenseData;
    } else {
        expenses.unshift(expenseData);
    }
    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
    return expenseData;
}

export function deleteExpense(expenseId) {
    let expenses = getExpenses();
    expenses = expenses.filter(x => x.id !== expenseId);
    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
}

export function calculateBudgetSummary(eventId) {
    const budgetInfo = getEventBudget(eventId);
    const expenses = getExpenses(eventId);

    const totalApproved = budgetInfo.totalApprovedBudget || 350000000;
    const totalActualSpend = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const remainingBalance = totalApproved - totalActualSpend;
    const disbursementRate = totalApproved > 0 ? Math.round((totalActualSpend / totalApproved) * 100) : 0;

    // Calculate actual spend per WBS
    const wbsSummary = (budgetInfo.wbsAllocations || []).map(wbs => {
        const actualForWbs = expenses
            .filter(e => e.wbsId === wbs.wbsId)
            .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
        const variance = wbs.allocatedBudget - actualForWbs;
        const isOverBudget = actualForWbs > wbs.allocatedBudget;

        return {
            ...wbs,
            actualSpend: actualForWbs,
            variance: variance,
            isOverBudget: isOverBudget,
            usageRate: wbs.allocatedBudget > 0 ? Math.round((actualForWbs / wbs.allocatedBudget) * 100) : 0
        };
    });

    return {
        totalApproved,
        totalActualSpend,
        remainingBalance,
        disbursementRate,
        contingencyReserve: budgetInfo.contingencyReserve || 30000000,
        wbsSummary
    };
}
