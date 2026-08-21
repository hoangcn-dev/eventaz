/**
 * EventAZ Mock Data - Equipment, Supplies & Vendors (Module 09: FR-09.1 -> FR-09.5)
 */

const EQUIPMENT_STORAGE_KEY = "eventaz_mock_equipment_v1";

export const EQUIPMENT_CATEGORIES = {
    "AudioLight": { code: "AudioLight", nameVi: "Âm thanh & Ánh sáng", icon: "volume_up", color: "bg-purple-100 text-purple-800 border-purple-300" },
    "LedVisual": { code: "LedVisual", nameVi: "Màn hình LED & Máy chiếu", icon: "tv", color: "bg-blue-100 text-blue-800 border-blue-300" },
    "StageTruss": { code: "StageTruss", nameVi: "Khung giàn Stage & Bục", icon: "foundation", color: "bg-amber-100 text-amber-800 border-amber-300" },
    "DecorFurniture": { code: "DecorFurniture", nameVi: "Bàn ghế, Thảm đỏ & Decor", icon: "chair", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    "BannerStandee": { code: "BannerStandee", nameVi: "Standee, Phướn & POSM", icon: "campaign", color: "bg-slate-100 text-slate-800 border-slate-300" }
};

export const HANDOVER_STATUSES = {
    "HandedOver": { code: "HandedOver", nameVi: "Đã bàn giao tại NCC", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    "InTransit": { code: "InTransit", nameVi: "Đang vận chuyển", color: "bg-amber-100 text-amber-800 border-amber-300" },
    "Pending": { code: "Pending", nameVi: "Chưa bàn giao", color: "bg-red-100 text-red-800 border-red-300" }
};

export const defaultEquipment = [
    {
        id: "EQP-001",
        eventId: "E-2024-99X",
        name: "Màn hình LED P2.5 Indoor Cabinet (Kích thước 12m x 5m)",
        category: "LedVisual",
        quantity: 1,
        unit: "Bộ",
        unitPrice: 35000000,
        totalCost: 35000000,
        vendorName: "Công ty Cổ phần Sự kiện Hà Nội Sound Light Pro",
        vendorPhone: "0912 345 678",
        vendorRating: 5,
        receiverName: "Vũ Anh Kỹ Thuật (Tech Lead)",
        handoverStatus: "HandedOver",
        notes: "Đã lắp đặt hoàn thiện tại Hội trường Main Hall NCC, test video 4K sắc nét."
    },
    {
        id: "EQP-002",
        eventId: "E-2024-99X",
        name: "Hệ thống Loa Line Array D&B Audiotechnik (12 Cụm công suất lớn)",
        category: "AudioLight",
        quantity: 12,
        unit: "Cụm",
        unitPrice: 2000000,
        totalCost: 24000000,
        vendorName: "Tập đoàn Âm thanh Việt Âm ProSound",
        vendorPhone: "0903 888 999",
        vendorRating: 5,
        receiverName: "Vũ Anh Kỹ Thuật (Tech Lead)",
        handoverStatus: "HandedOver",
        notes: "Bàn giao kèm 5 Mic không dây cao cấp & Mixer Digital Allen & Heath."
    },
    {
        id: "EQP-003",
        eventId: "E-2024-99X",
        name: "Bộ Bộ đàm Motorola P8668i Chống nhiễu (Dành cho Ban Điều Hành)",
        category: "AudioLight",
        quantity: 35,
        unit: "Chiếc",
        unitPrice: 100000,
        totalCost: 3500000,
        vendorName: "Công ty Thiết bị Sự kiện EventAZ Supply",
        vendorPhone: "0988 777 666",
        vendorRating: 4,
        receiverName: "Trần Thị Hậu Cần (Logistics Lead)",
        handoverStatus: "HandedOver",
        notes: "Cài đặt sẵn 4 Kênh: Ban Nội dung, Ban Hậu cần, Ban Truyền thông & Security."
    },
    {
        id: "EQP-004",
        eventId: "E-2024-99X",
        name: "Bộ Khung giàn Aluminium Truss 16m x 8m & Bục phát biểu A",
        category: "StageTruss",
        quantity: 1,
        unit: "Gói",
        unitPrice: 18000000,
        totalCost: 18000000,
        vendorName: "Công ty Thi công Sân khấu ProStage Vietnam",
        vendorPhone: "0977 111 222",
        vendorRating: 5,
        receiverName: "Trần Thị Hậu Cần (Logistics Lead)",
        handoverStatus: "InTransit",
        notes: "Đang xe tải chở đến cổng kho NCC, dự kiến thi công lúc 14:00."
    },
    {
        id: "EQP-005",
        eventId: "E-2024-99X",
        name: "Bộ Bàn ghế Sofa VIP 5 chỗ Tọa đàm & 300 Ghế nệm bọc áo xanh",
        category: "DecorFurniture",
        quantity: 1,
        unit: "Gói",
        unitPrice: 15000000,
        totalCost: 15000000,
        vendorName: "Công ty Nội thất & Decor Sự kiện Royal Event",
        vendorPhone: "0933 555 444",
        vendorRating: 4,
        receiverName: "Trần Thị Hậu Cần (Logistics Lead)",
        handoverStatus: "InTransit",
        notes: "Đã bốc xếp xong 50%, kiểm kê chất lượng vải bọc sạch sẽ."
    },
    {
        id: "EQP-006",
        eventId: "E-2024-99X",
        name: "50 Standee Cuộn Nhôm & 10 Hashtag Cầm tay Check-in Khách mời",
        category: "BannerStandee",
        quantity: 60,
        unit: "Cái",
        unitPrice: 80000,
        totalCost: 4800000,
        vendorName: "Xưởng In Ấn & POSM Quảng Cáo Hưng Phát",
        vendorPhone: "0944 222 333",
        vendorRating: 4,
        receiverName: "Phạm Hoàng Truyền Thông",
        handoverStatus: "Pending",
        notes: "Xưởng đang in hoàn thiện 10 hashtag cuối, giao trước 17:00 chiều."
    }
];

export function getEquipmentList(eventId) {
    try {
        const raw = localStorage.getItem(EQUIPMENT_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                if (eventId) return parsed.filter(e => e.eventId === eventId);
                return parsed;
            }
        }
    } catch (e) {
        console.error("Error reading equipment data", e);
    }
    localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(defaultEquipment));
    return defaultEquipment;
}

export function saveEquipmentItem(itemData) {
    const list = getEquipmentList();
    const index = list.findIndex(e => e.id === itemData.id);
    if (index !== -1) {
        list[index] = itemData;
    } else {
        list.unshift(itemData);
    }
    localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(list));
    return itemData;
}

export function deleteEquipmentItem(itemId) {
    let list = getEquipmentList();
    list = list.filter(e => e.id !== itemId);
    localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(list));
}

export function changeHandoverStatus(itemId, newStatus) {
    const list = getEquipmentList();
    const item = list.find(e => e.id === itemId);
    if (item) {
        item.handoverStatus = newStatus;
        localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(list));
    }
    return item;
}

export function calculateEquipmentSummary(eventId) {
    const list = getEquipmentList(eventId);
    const total = list.length;
    const totalCost = list.reduce((sum, item) => sum + (Number(item.totalCost) || 0), 0);

    const handedOverCount = list.filter(e => e.handoverStatus === "HandedOver").length;
    const inTransitCount = list.filter(e => e.handoverStatus === "InTransit").length;
    const pendingCount = list.filter(e => e.handoverStatus === "Pending").length;

    const handoverRate = total > 0 ? Math.round((handedOverCount / total) * 100) : 0;

    // Count unique vendors
    const vendorSet = new Set(list.map(e => e.vendorName).filter(Boolean));
    const activeVendors = vendorSet.size;

    return {
        total,
        totalCost,
        handedOverCount,
        inTransitCount,
        pendingCount,
        handoverRate,
        activeVendors
    };
}
