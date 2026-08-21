/**
 * EventAZ Mock Data - Users & Personnel
 */
window.EventAZMockData = window.EventAZMockData || {};

window.EventAZMockData.users = [
    {
        id: "USR-001",
        name: "Nguyễn Văn Trưởng",
        email: "truong.nguyen@eventaz.vn",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Event Director",
        roleVi: "Trưởng BTC",
        department: "Ban Điều Hành",
        phone: "0903 123 456",
        status: "active"
    },
    {
        id: "USR-002",
        name: "Trần Thị Hậu Cần",
        email: "hau.tran@eventaz.vn",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        role: "Logistics Lead",
        roleVi: "Trưởng nhóm Hậu cần",
        department: "Ban Hậu Cần",
        phone: "0912 345 678",
        status: "active"
    },
    {
        id: "USR-003",
        name: "Lê Văn Nội Dung",
        email: "noidung.le@eventaz.vn",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
        role: "Content Lead",
        roleVi: "Trưởng nhóm Nội dung",
        department: "Ban Nội Dung",
        phone: "0988 765 432",
        status: "active"
    },
    {
        id: "USR-004",
        name: "Phạm Hoàng Truyền Thông",
        email: "media.pham@eventaz.vn",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        role: "Media Lead",
        roleVi: "Trưởng nhóm Truyền thông",
        department: "Ban Truyền Thông",
        phone: "0977 112 233",
        status: "active"
    },
    {
        id: "USR-005",
        name: "Đỗ Minh Đối Ngoại",
        email: "guest.do@eventaz.vn",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
        role: "Relations Lead",
        roleVi: "Trưởng nhóm Khách mời",
        department: "Ban Đối Ngoại",
        phone: "0933 445 566",
        status: "active"
    },
    {
        id: "USR-006",
        name: "Vũ Anh Kỹ Thuật",
        email: "tech.vu@eventaz.vn",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        role: "Technical Lead",
        roleVi: "Trưởng nhóm Kỹ thuật",
        department: "Ban Kỹ Thuật",
        phone: "0909 888 777",
        status: "active"
    },
    {
        id: "USR-007",
        name: "Hoàng Mỹ Thiết Kế",
        email: "design.hoang@eventaz.vn",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        role: "UI/UX Designer",
        roleVi: "Chuyên viên Thiết kế",
        department: "Ban Truyền Thông",
        phone: "0918 223 344",
        status: "active"
    },
    {
        id: "USR-008",
        name: "Bùi Văn Âm Thanh",
        email: "audio.bui@eventaz.vn",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        role: "Sound Engineer",
        roleVi: "Kỹ thuật viên Âm thanh",
        department: "Ban Kỹ Thuật",
        phone: "0966 554 433",
        status: "active"
    },
    {
        id: "USR-009",
        name: "Đặng Thu Thảo",
        email: "thao.dang@eventaz.vn",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Finance Executive",
        roleVi: "Chuyên viên Tài chính",
        department: "Ban Điều Hành",
        phone: "0944 332 211",
        status: "active"
    },
    {
        id: "USR-010",
        name: "Ngô Đức Quang",
        email: "quang.ngo@eventaz.vn",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        role: "Stage Manager",
        roleVi: "Quản lý Sân khấu",
        department: "Ban Hậu Cần",
        phone: "0922 110 099",
        status: "active"
    },
    {
        id: "USR-011",
        name: "Nguyễn Khánh Linh",
        email: "linh.nguyen@eventaz.vn",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        role: "Content Creator",
        roleVi: "Biên tập viên Nội dung",
        department: "Ban Nội Dung",
        phone: "0911 223 399",
        status: "active"
    },
    {
        id: "USR-012",
        name: "Lương Tiến Đạt",
        email: "dat.luong@eventaz.vn",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
        role: "Photographer Lead",
        roleVi: "Trưởng nhóm Quay chụp",
        department: "Ban Truyền Thông",
        phone: "0934 567 890",
        status: "active"
    }
];

window.EventAZMockData.getUsers = function() {
    const stored = localStorage.getItem('eventaz_users');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing stored users', e);
        }
    }
    return window.EventAZMockData.users;
};
