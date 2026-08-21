/**
 * EventAZ Mock Data - Run-of-Show Timeline & Stage Control (Module 07: FR-07.1 -> FR-07.5)
 */

const ROS_STORAGE_KEY = "eventaz_mock_runofshow_v1";

export const CUE_STATUSES = {
    "Ongoing": { code: "Ongoing", nameVi: "Đang diễn ra (Live)", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    "Scheduled": { code: "Scheduled", nameVi: "Chờ lên sóng", color: "bg-amber-100 text-amber-800 border-amber-300" },
    "Completed": { code: "Completed", nameVi: "Đã hoàn thành", color: "bg-slate-100 text-slate-700 border-slate-300" }
};

export const defaultCues = [
    {
        id: "CUE-001",
        eventId: "E-2024-99X",
        order: 1,
        timeSlot: "08:00 - 08:30",
        durationMin: 30,
        title: "Đón tiếp Khách mời VIP & Check-in Thẻ QR Code Sảnh Chính",
        mcScript: "MC phát thanh thông báo chào mừng đại biểu tiến vào sảnh A và nhận tài liệu hội thảo.",
        performer: "Ban Lễ tân & Đội Check-in",
        cues: {
            sound: "Nhạc nền Acoustic nhẹ nhàng (Audio Track 01)",
            led: "Màn hình LED chạy Loop Key Visual Tech Summit 2026",
            light: "Ánh sáng sảnh mở sáng 100% (Warm Light)"
        },
        stageManager: "Ngô Đức Quang (Floor Manager)",
        status: "Completed"
    },
    {
        id: "CUE-002",
        eventId: "E-2024-99X",
        order: 2,
        timeSlot: "08:30 - 08:45",
        durationMin: 15,
        title: "Tiết mục Khai mạc Nghệ thuật Động từ Múa Đèn LED & Trống Khai hội",
        mcScript: "Tắt đèn toàn bộ hội trường. MC cất lời dẫn nhập huyền bí từ hậu trường.",
        performer: "Đoàn Múa Nghệ Thuật Việt",
        cues: {
            sound: "Nhạc trống dồn dập (Track 02 - High Energy)",
            led: "Video Visual đếm ngược 10s hiệu ứng 3D Mapping",
            light: "Tắt toàn bộ đèn khán phòng, mở 2 đèn Spotlight chiếu sân khấu"
        },
        stageManager: "Ngô Đức Quang (Floor Manager)",
        status: "Completed"
    },
    {
        id: "CUE-003",
        eventId: "E-2024-99X",
        order: 3,
        timeSlot: "08:45 - 09:00",
        durationMin: 15,
        title: "Phát biểu Khai mạc Sự kiện & Tuyên bố Lý do từ Trưởng BTC",
        mcScript: "Trân trọng kính mời Ông Nguyễn Văn Trưởng - Trưởng Ban Tổ Chức lên phát biểu khai mạc.",
        performer: "Ông Nguyễn Văn Trưởng (Trưởng BTC)",
        cues: {
            sound: "Nhạc chào mừng đại biểu (Track 03)",
            led: "Hiển thị Slide Presentation Khai mạc & Logo EventAZ",
            light: "Spotlight tập trung vào Bục phát biểu A"
        },
        stageManager: "Ngô Đức Quang (Floor Manager)",
        status: "Ongoing"
    },
    {
        id: "CUE-004",
        eventId: "E-2024-99X",
        order: 4,
        timeSlot: "09:00 - 10:00",
        durationMin: 60,
        title: "Bài Tham luận Keynote 01: Kỷ nguyên AI Agentic & Tương lai phần mềm 2026",
        mcScript: "Xin trân trọng giới thiệu bài tham luận chính từ Diễn giả VIP - Dr. Alexander Wright.",
        performer: "Dr. Alexander Wright (TechCorp US)",
        cues: {
            sound: "Mic không dây VIP 01 & Nhạc chuyển giao (Track 04)",
            led: "Trình chiếu Slide Keynote AI Agentic (HDMI 1)",
            light: "Đèn trắng sân khấu & Đèn bục nói"
        },
        stageManager: "Ngô Đức Quang (Floor Manager)",
        status: "Scheduled"
    },
    {
        id: "CUE-005",
        eventId: "E-2024-99X",
        order: 5,
        timeSlot: "10:00 - 10:30",
        durationMin: 30,
        title: "Nghỉ giải lao Teabreak & Giao lưu tại Khu vực Booth Nhà tài trợ",
        mcScript: "Kính mời quý đại biểu di chuyển ra khu vực Foyer thưởng thức tiệc trà và tham quan 50 booth.",
        performer: "Toàn bộ Đại biểu & Nhà tài trợ",
        cues: {
            sound: "Nhạc Jazz nhẹ nhàng Foyer (Track 05)",
            led: "Chạy Video Cảm ơn Nhà tài trợ Kim Cương",
            light: "Bật 100% đèn khán phòng và sảnh triển lãm"
        },
        stageManager: "Trần Thị Hậu Cần",
        status: "Scheduled"
    },
    {
        id: "CUE-006",
        eventId: "E-2024-99X",
        order: 6,
        timeSlot: "10:30 - 11:45",
        durationMin: 75,
        title: "Tọa đàm Q&A Đa phương thức: Tương lai Truyền thông & Công nghệ Sự kiện",
        mcScript: "Trân trọng kính mời 4 Diễn giả cùng lên sân khấu tham gia phiên Tọa đàm Q&A trực tiếp.",
        performer: "4 Diễn giả VIP & MC Điều phối",
        cues: {
            sound: "5 Mic không dây cầm tay (Mics 01-05)",
            led: "Background Tọa đàm & Cổng quét câu hỏi QR Slido",
            light: "Đèn chụp khu vực Sofa Tọa đàm 5 ghế"
        },
        stageManager: "Ngô Đức Quang (Floor Manager)",
        status: "Scheduled"
    },
    {
        id: "CUE-007",
        eventId: "E-2024-99X",
        order: 7,
        timeSlot: "11:45 - 12:00",
        durationMin: 15,
        title: "Lễ Bế mạc, Trao Kỷ niệm chương & Chụp ảnh Lưu niệm Chốt Sự kiện",
        mcScript: "Kính mời các Diễn giả và Nhà tài trợ tiến lên sân khấu nhận Kỷ niệm chương từ Ban Tổ Chức.",
        performer: "Ban Tổ Chức, Diễn giả & Nhà tài trợ",
        cues: {
            sound: "Nhạc trao giải hoành tráng (Track 06 - Victory)",
            led: "Visual pháo hoa 3D chúc mừng thành công sự kiện",
            light: "Sáng toàn bộ dàn đèn sân khấu & Đèn chớp pháo hiệu"
        },
        stageManager: "Ngô Đức Quang (Floor Manager)",
        status: "Scheduled"
    }
];

export function getRunOfShow(eventId) {
    try {
        const raw = localStorage.getItem(ROS_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                if (eventId) return parsed.filter(c => c.eventId === eventId);
                return parsed;
            }
        }
    } catch (e) {
        console.error("Error reading run of show data", e);
    }
    localStorage.setItem(ROS_STORAGE_KEY, JSON.stringify(defaultCues));
    return defaultCues;
}

export function saveCueItem(cueData) {
    const list = getRunOfShow();
    const index = list.findIndex(c => c.id === cueData.id);
    if (index !== -1) {
        list[index] = cueData;
    } else {
        list.push(cueData);
    }
    localStorage.setItem(ROS_STORAGE_KEY, JSON.stringify(list));
    return cueData;
}

export function deleteCueItem(cueId) {
    let list = getRunOfShow();
    list = list.filter(c => c.id !== cueId);
    localStorage.setItem(ROS_STORAGE_KEY, JSON.stringify(list));
}

export function changeCueStatus(cueId, newStatus) {
    const list = getRunOfShow();
    const cue = list.find(c => c.id === cueId);
    if (cue) {
        cue.status = newStatus;
        localStorage.setItem(ROS_STORAGE_KEY, JSON.stringify(list));
    }
    return cue;
}

export function advanceNextCue(eventId) {
    const list = getRunOfShow(eventId);
    const ongoingIndex = list.findIndex(c => c.status === "Ongoing");
    if (ongoingIndex !== -1) {
        list[ongoingIndex].status = "Completed";
        if (ongoingIndex + 1 < list.length) {
            list[ongoingIndex + 1].status = "Ongoing";
        }
    } else {
        const firstScheduled = list.findIndex(c => c.status === "Scheduled");
        if (firstScheduled !== -1) {
            list[firstScheduled].status = "Ongoing";
        }
    }
    localStorage.setItem(ROS_STORAGE_KEY, JSON.stringify(list));
    return list;
}

export function calculateRosSummary(eventId) {
    const list = getRunOfShow(eventId);
    const total = list.length;
    const totalDurationMin = list.reduce((sum, item) => sum + (Number(item.durationMin) || 0), 0);
    const completedCount = list.filter(c => c.status === "Completed").length;
    const ongoingCount = list.filter(c => c.status === "Ongoing").length;
    const scheduledCount = list.filter(c => c.status === "Scheduled").length;

    const remainingDurationMin = list
        .filter(c => c.status === "Scheduled" || c.status === "Ongoing")
        .reduce((sum, item) => sum + (Number(item.durationMin) || 0), 0);

    const completionRate = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    return {
        total,
        totalDurationMin,
        completedCount,
        ongoingCount,
        scheduledCount,
        remainingDurationMin,
        completionRate
    };
}
