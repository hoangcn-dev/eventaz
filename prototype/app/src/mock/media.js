/**
 * EventAZ Mock Data - Media & Communication Campaigns (Module 06: FR-06.1 -> FR-06.5)
 */

const MEDIA_STORAGE_KEY = "eventaz_mock_media_v1";

export const MEDIA_CHANNELS = {
    "Facebook Ads": { code: "Facebook Ads", nameVi: "Facebook Ads & Fanpage", icon: "share", color: "bg-blue-100 text-blue-800 border-blue-300" },
    "PR Báo chí": { code: "PR Báo chí", nameVi: "PR Báo chí (VnExpress, Dân Trí)", icon: "newspaper", color: "bg-red-100 text-red-800 border-red-300" },
    "Email Marketing": { code: "Email Marketing", nameVi: "Email Marketing Broadcast", icon: "mail", color: "bg-purple-100 text-purple-800 border-purple-300" },
    "Seeding Group": { code: "Seeding Group", nameVi: "Seeding Group & Diễn đàn", icon: "forum", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    "KOLs / Influencers": { code: "KOLs / Influencers", nameVi: "KOLs & Influencer Review", icon: "verified", color: "bg-amber-100 text-amber-800 border-amber-300" },
    "Phướn & Standee": { code: "Phướn & Standee", nameVi: "Phướn đường & Standee", icon: "campaign", color: "bg-slate-100 text-slate-800 border-slate-300" }
};

export const PUBLISH_STATUSES = {
    "Published": { code: "Published", nameVi: "Đã phát hành", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    "Scheduled": { code: "Scheduled", nameVi: "Đã duyệt - Hẹn giờ đăng", color: "bg-amber-100 text-amber-800 border-amber-300" },
    "Draft": { code: "Draft", nameVi: "Bản nháp biên tập", color: "bg-slate-100 text-slate-700 border-slate-300" }
};

export const defaultCampaigns = [
    {
        id: "CAM-001",
        eventId: "E-2024-99X",
        title: "Chạy chiến dịch Facebook Ads nhắm mục tiêu Doanh nghiệp Công nghệ",
        channel: "Facebook Ads",
        publishDate: "2026-08-05 09:00",
        assigneeId: "USR-004",
        assigneeName: "Phạm Hoàng Truyền Thông",
        reach: 150000,
        clicks: 12500,
        adSpend: 18000000,
        status: "Published",
        notes: "Nhắm mục tiêu CEO, CTO, Product Manager tại Hà Nội & TPHCM."
    },
    {
        id: "CAM-002",
        eventId: "E-2024-99X",
        title: "Đăng 5 bài PR báo chí bảo trợ trên Trang chủ VnExpress Công nghệ",
        channel: "PR Báo chí",
        publishDate: "2026-08-10 10:30",
        assigneeId: "USR-004",
        assigneeName: "Phạm Hoàng Truyền Thông",
        reach: 220000,
        clicks: 18200,
        adSpend: 25000000,
        status: "Published",
        notes: "Bài PR phỏng vấn Trưởng BTC và giới thiệu dàn Diễn giả VIP."
    },
    {
        id: "CAM-003",
        eventId: "E-2024-99X",
        title: "Gửi Email Broadcast giới thiệu 20 Diễn giả VIP & Vé Early Bird",
        channel: "Email Marketing",
        publishDate: "2026-08-15 14:00",
        assigneeId: "USR-007",
        assigneeName: "Hoàng Mỹ Thiết Kế",
        reach: 45000,
        clicks: 8900,
        adSpend: 3500000,
        status: "Published",
        notes: "Gửi tới danh sách 45.000 data khách hàng sự kiện năm 2025."
    },
    {
        id: "CAM-004",
        eventId: "E-2024-99X",
        title: "Book 3 KOLs Công nghệ Review và Check-in vé VIP trước sự kiện",
        channel: "KOLs / Influencers",
        publishDate: "2026-08-25 11:00",
        assigneeId: "USR-004",
        assigneeName: "Phạm Hoàng Truyền Thông",
        reach: 95000,
        clicks: 6200,
        adSpend: 15000000,
        status: "Scheduled",
        notes: "Lịch đăng bài đồng loạt 3 ngày trước giờ G khai mạc."
    },
    {
        id: "CAM-005",
        eventId: "E-2024-99X",
        title: "Treo 50 phướn đường dọc tuyến đại lộ Phạm Hùng & NCC",
        channel: "Phướn & Standee",
        publishDate: "2026-08-28 08:00",
        assigneeId: "USR-002",
        assigneeName: "Trần Thị Hậu Cần",
        reach: 80000,
        clicks: 0,
        adSpend: 12000000,
        status: "Scheduled",
        notes: "Đã được Sở Văn hóa cấp phép treo từ 28/08 đến 15/09."
    },
    {
        id: "CAM-006",
        eventId: "E-2024-99X",
        title: "Seeding bài thảo luận chủ đề Kỷ nguyên AI Agentic trên Group Công nghệ",
        channel: "Seeding Group",
        publishDate: "2026-08-20 20:00",
        assigneeId: "USR-011",
        assigneeName: "Nguyễn Khánh Linh",
        reach: 35000,
        clicks: 4100,
        adSpend: 2000000,
        status: "Draft",
        notes: "Đang hoàn thiện kịch bản thảo luận kéo tương tác tự nhiên."
    }
];

export function getMediaCampaigns(eventId) {
    try {
        const raw = localStorage.getItem(MEDIA_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                if (eventId) return parsed.filter(c => c.eventId === eventId);
                return parsed;
            }
        }
    } catch (e) {
        console.error("Error reading media data", e);
    }
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(defaultCampaigns));
    return defaultCampaigns;
}

export function saveMediaCampaign(campaignData) {
    const campaigns = getMediaCampaigns();
    const index = campaigns.findIndex(c => c.id === campaignData.id);
    if (index !== -1) {
        campaigns[index] = campaignData;
    } else {
        campaigns.unshift(campaignData);
    }
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(campaigns));
    return campaignData;
}

export function deleteMediaCampaign(campaignId) {
    let campaigns = getMediaCampaigns();
    campaigns = campaigns.filter(c => c.id !== campaignId);
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(campaigns));
}

export function changeCampaignStatus(campaignId, newStatus) {
    const campaigns = getMediaCampaigns();
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
        campaign.status = newStatus;
        localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(campaigns));
    }
    return campaign;
}

export function calculateMediaSummary(eventId) {
    const campaigns = getMediaCampaigns(eventId);
    const total = campaigns.length;
    const totalReach = campaigns.reduce((sum, item) => sum + (Number(item.reach) || 0), 0);
    const totalClicks = campaigns.reduce((sum, item) => sum + (Number(item.clicks) || 0), 0);
    const totalAdSpend = campaigns.reduce((sum, item) => sum + (Number(item.adSpend) || 0), 0);

    const publishedCount = campaigns.filter(c => c.status === "Published").length;
    const scheduledCount = campaigns.filter(c => c.status === "Scheduled").length;
    const draftCount = campaigns.filter(c => c.status === "Draft").length;

    const publishingRate = total > 0 ? Math.round((publishedCount / total) * 100) : 0;
    const avgCpc = totalClicks > 0 ? Math.round(totalAdSpend / totalClicks) : 0;

    return {
        total,
        totalReach,
        totalClicks,
        totalAdSpend,
        publishedCount,
        scheduledCount,
        draftCount,
        publishingRate,
        avgCpc
    };
}
