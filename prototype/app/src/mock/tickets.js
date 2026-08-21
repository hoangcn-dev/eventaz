/**
 * EventAZ Mock Data - Tickets, QR Gate Check-in & Seating Zones (Module 08: FR-08.1 -> FR-08.5)
 */

const TICKETS_STORAGE_KEY = "eventaz_mock_tickets_v1";
const CHECKIN_LOGS_STORAGE_KEY = "eventaz_mock_checkin_logs_v1";

export const defaultTicketTiers = [
    {
        id: "TKT-001",
        eventId: "E-2024-99X",
        name: "Vé VIP Diamond (Diễn giả & Sponsor)",
        price: 3500000,
        totalQty: 100,
        soldQty: 100,
        checkedInQty: 85,
        zone: "Khu A — Ghế VIP Hàng 1 - 2 (Bục Chính)",
        benefits: "Vị trí hàng 1, tiệc Teabreak riêng, xe đón đưa VIP & quà lưu niệm 2.000.000 ₫",
        color: "bg-purple-100 text-purple-800 border-purple-300",
        status: "SoldOut"
    },
    {
        id: "TKT-002",
        eventId: "E-2024-99X",
        name: "Vé Business Gold (Doanh nhân & Lãnh đạo)",
        price: 1800000,
        totalQty: 300,
        soldQty: 260,
        checkedInQty: 210,
        zone: "Khu B — Ghế Trung Tâm Hàng 3 - 8",
        benefits: "Vị trí khu vực trung tâm, tài liệu hội thảo in bìa da & tiệc trưa Networking",
        color: "bg-amber-100 text-amber-800 border-amber-300",
        status: "Active"
    },
    {
        id: "TKT-003",
        eventId: "E-2024-99X",
        name: "Vé Standard Press (Báo chí & Đơn vị truyền thông)",
        price: 0,
        totalQty: 100,
        soldQty: 100,
        checkedInQty: 95,
        zone: "Khu Báo Chí — Hàng Ghế Media B1 - B10",
        benefits: "Cấp Thẻ Báo chí, bàn Press Booth, cổng wifi tốc độ cao & ổ cắm sạc",
        color: "bg-emerald-100 text-emerald-800 border-emerald-300",
        status: "SoldOut"
    },
    {
        id: "TKT-004",
        eventId: "E-2024-99X",
        name: "Vé Thường (Khách tham quan & Sinh viên)",
        price: 450000,
        totalQty: 1000,
        soldQty: 840,
        checkedInQty: 680,
        zone: "Khu C — Khán Phòng Tầng 2 (Tự Do)",
        benefits: "Vé vào cổng xem toàn bộ phiên tham luận & nhận Slide tài liệu qua Email",
        color: "bg-blue-100 text-blue-800 border-blue-300",
        status: "Active"
    }
];

export const defaultCheckInLogs = [
    { id: "LOG-101", eventId: "E-2024-99X", ticketCode: "QR-GUEST-001-ALEX", holderName: "Dr. Alexander Wright", tierName: "Vé VIP Diamond", gateName: "Cổng A1 (Sảnh VIP)", checkInTime: "2026-08-28 08:05:12", status: "Success" },
    { id: "LOG-102", eventId: "E-2024-99X", ticketCode: "QR-GUEST-002-HA", holderName: "Bà Nguyễn Thu Hà", tierName: "Vé VIP Diamond", gateName: "Cổng A1 (Sảnh VIP)", checkInTime: "2026-08-28 08:12:45", status: "Success" },
    { id: "LOG-103", eventId: "E-2024-99X", ticketCode: "QR-GUEST-003-TAM", holderName: "Ông Trần Minh Tâm", tierName: "Vé VIP Diamond", gateName: "Cổng A1 (Sảnh VIP)", checkInTime: "2026-08-28 08:18:02", status: "Success" },
    { id: "LOG-104", eventId: "E-2024-99X", ticketCode: "QR-GUEST-004-LINH", holderName: "Bà Hoàng Phương Linh", tierName: "Vé Standard Press", gateName: "Cổng B2 (Press Corner)", checkInTime: "2026-08-28 08:22:30", status: "Success" },
    { id: "LOG-105", eventId: "E-2024-99X", ticketCode: "QR-TKT-991-GOLD", holderName: "Nguyễn Hoàng Nam", tierName: "Vé Business Gold", gateName: "Cổng C1 (Main Gate)", checkInTime: "2026-08-28 08:28:19", status: "Success" }
];

export const defaultTicketOrders = [
    { id: "ORD-901", eventId: "E-2024-99X", customerName: "Nguyễn Hoàng Nam", customerEmail: "nam.nguyen@techcorp.vn", customerPhone: "0912 345 678", tierName: "Vé Business Gold", quantity: 2, totalAmount: 3600000, paymentGateway: "VNPAY QR", paymentStatus: "Paid", orderDate: "2026-08-10 14:20:15" },
    { id: "ORD-902", eventId: "E-2024-99X", customerName: "Trần Minh Quang", customerEmail: "quang.tm@vnpay.vn", customerPhone: "0903 111 222", tierName: "Vé Business Gold", quantity: 1, totalAmount: 1800000, paymentGateway: "Momo E-Wallet", paymentStatus: "Paid", orderDate: "2026-08-12 09:15:30" },
    { id: "ORD-903", eventId: "E-2024-99X", customerName: "Phạm Thu Thảo", customerEmail: "thao.pt@gmail.com", customerPhone: "0988 555 444", tierName: "Vé Thường", quantity: 4, totalAmount: 1800000, paymentGateway: "Chuyển Khoản Ngân Hàng", paymentStatus: "Paid", orderDate: "2026-08-15 16:45:00" },
    { id: "ORD-904", eventId: "E-2024-99X", customerName: "Lê Văn Hùng", customerEmail: "hung.lv@solution.com.vn", customerPhone: "0933 666 777", tierName: "Vé Business Gold", quantity: 3, totalAmount: 5400000, paymentGateway: "VNPAY QR", paymentStatus: "Pending", orderDate: "2026-08-18 11:30:10" }
];

export function getTicketOrders(eventId) {
    if (eventId) return defaultTicketOrders.filter(o => o.eventId === eventId);
    return defaultTicketOrders;
}

export function getTicketTiers(eventId) {
    try {
        const raw = localStorage.getItem(TICKETS_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                if (eventId) return parsed.filter(t => t.eventId === eventId);
                return parsed;
            }
        }
    } catch (e) {
        console.error("Error reading ticket tiers data", e);
    }
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(defaultTicketTiers));
    return defaultTicketTiers;
}

export function saveTicketTier(tierData) {
    const list = getTicketTiers();
    const index = list.findIndex(t => t.id === tierData.id);
    if (index !== -1) {
        list[index] = tierData;
    } else {
        list.unshift(tierData);
    }
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(list));
    return tierData;
}

export function deleteTicketTier(tierId) {
    let list = getTicketTiers();
    list = list.filter(t => t.id !== tierId);
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(list));
}

export function getCheckInLogs(eventId) {
    try {
        const raw = localStorage.getItem(CHECKIN_LOGS_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                if (eventId) return parsed.filter(l => l.eventId === eventId);
                return parsed;
            }
        }
    } catch (e) {
        console.error("Error reading check-in logs", e);
    }
    localStorage.setItem(CHECKIN_LOGS_STORAGE_KEY, JSON.stringify(defaultCheckInLogs));
    return defaultCheckInLogs;
}

export function performQrCheckIn(eventId, ticketCode, gateName = "Cổng C1 (Main Gate)") {
    const logs = getCheckInLogs();
    const tiers = getTicketTiers(eventId);

    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19);

    // Check duplicate
    const existingLog = logs.find(l => l.ticketCode === ticketCode && l.status === "Success");
    if (existingLog) {
        const dupLog = {
            id: `LOG-${Date.now().toString().slice(-3)}`,
            eventId,
            ticketCode,
            holderName: existingLog.holderName,
            tierName: existingLog.tierName,
            gateName,
            checkInTime: nowStr,
            status: "Duplicate"
        };
        logs.unshift(dupLog);
        localStorage.setItem(CHECKIN_LOGS_STORAGE_KEY, JSON.stringify(logs));
        return { success: false, message: `Mã QR [${ticketCode}] đã được Check-in trước đó lúc ${existingLog.checkInTime}!`, log: dupLog };
    }

    // Success checkin
    const newLog = {
        id: `LOG-${Date.now().toString().slice(-3)}`,
        eventId,
        ticketCode,
        holderName: `Khách tham dự (${ticketCode.slice(-4)})`,
        tierName: "Vé Hợp Lệ Sự Kiện",
        gateName,
        checkInTime: nowStr,
        status: "Success"
    };

    logs.unshift(newLog);
    localStorage.setItem(CHECKIN_LOGS_STORAGE_KEY, JSON.stringify(logs));

    // Update checkedInQty in tiers
    if (tiers.length > 0) {
        tiers[0].checkedInQty += 1;
        localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tiers));
    }

    return { success: true, message: `XÁC THỰC THÀNH CÔNG! Đủ điều kiện vào cổng [${gateName}].`, log: newLog };
}

export function calculateTicketsSummary(eventId) {
    const tiers = getTicketTiers(eventId);
    const logs = getCheckInLogs(eventId);

    const totalIssuedQty = tiers.reduce((sum, item) => sum + (Number(item.totalQty) || 0), 0);
    const totalSoldQty = tiers.reduce((sum, item) => sum + (Number(item.soldQty) || 0), 0);
    const totalCheckedInQty = tiers.reduce((sum, item) => sum + (Number(item.checkedInQty) || 0), 0);
    const totalRevenue = tiers.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.soldQty) || 0)), 0);

    const checkInRate = totalSoldQty > 0 ? Math.round((totalCheckedInQty / totalSoldQty) * 100) : 0;

    return {
        totalIssuedQty,
        totalSoldQty,
        totalCheckedInQty,
        totalRevenue,
        checkInRate,
        recentLogsCount: logs.length
    };
}
