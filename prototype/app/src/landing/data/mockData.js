/**
 * EventAZ Landing Page — Mock Data
 * Shape mirrors real RESTful API responses for easy swap later.
 * Fields: organizerId, organizerName included for multi-tenant readiness.
 */

/** @type {Array<{id:string,organizerId:string,organizerName:string,title:string,description:string,status:'ongoing'|'upcoming'|'past',coverImage:string,startDate:string,endDate:string,location:string,tags:string[],ticketPriceFrom:number|null}>} */
export const events = [
  {
    id: 'evt-001',
    organizerId: 'org-vibelab',
    organizerName: 'VibeLab',
    title: 'Vibe Festival 2024',
    description: 'Một ngày tràn đầy âm nhạc, nghệ thuật và những kết nối bất ngờ. Nơi những tâm hồn đồng điệu tìm thấy nhau.',
    status: 'ongoing',
    coverImage: '/events/festival.png',
    startDate: '2024-08-24T18:00:00',
    endDate: '2024-08-24T23:00:00',
    location: 'The Yard, Hà Nội',
    tags: ['music', 'art', 'community'],
    ticketPriceFrom: 350000,
  },
  {
    id: 'evt-002',
    organizerId: 'org-northstar',
    organizerName: 'NorthStar Events',
    title: 'Creative Summit 2024',
    description: 'Hội tụ những gương mặt sáng tạo hàng đầu Việt Nam để cùng nhau khám phá xu hướng thiết kế và marketing.',
    status: 'ongoing',
    coverImage: '/events/keynote.png',
    startDate: '2024-09-05T09:00:00',
    endDate: '2024-09-05T17:00:00',
    location: 'Trung tâm Hội nghị White Palace, TP.HCM',
    tags: ['design', 'marketing', 'creative'],
    ticketPriceFrom: null,
  },
  {
    id: 'evt-003',
    organizerId: 'org-viet-event',
    organizerName: 'Sự Kiện Việt',
    title: 'Tech & Music Fest — Hà Nội 2024',
    description: 'Sân chơi công nghệ kết hợp âm nhạc điện tử, nơi developer và DJ cùng trải nghiệm không gian sáng tạo độc đáo.',
    status: 'upcoming',
    coverImage: '/events/networking.png',
    startDate: '2024-10-15T16:00:00',
    endDate: '2024-10-15T22:00:00',
    location: 'Sân vận động Mỹ Đình, Hà Nội',
    tags: ['tech', 'music', 'networking'],
    ticketPriceFrom: 499000,
  },
]

/** @type {Array<{id:string,name:string,role:'speaker'|'mc'|'vip',eventId:string,eventName:string,bio:string,initials:string,tone:'cyan'|'coral'|'lilac'|'yellow',avatar:string}>} */
export const speakers = [
  {
    id: 'spk-001',
    name: 'Sơn Tùng M-TP',
    role: 'speaker',
    eventId: 'evt-001',
    eventName: 'Vibe Festival 2024',
    bio: 'Nghệ sĩ, Nhà sản xuất & Chủ tịch M-TP Entertainment.',
    initials: 'ST',
    tone: 'cyan',
    avatar: '/images/speakers/son-tung.png'
  },
  {
    id: 'spk-002',
    name: 'Trấn Thành',
    role: 'mc',
    eventId: 'evt-001',
    eventName: 'Vibe Festival 2024',
    bio: 'MC, Đạo diễn & Nghệ sĩ giải trí hàng đầu Việt Nam.',
    initials: 'TT',
    tone: 'coral',
    avatar: '/images/speakers/tran-thanh.png'
  },
  {
    id: 'spk-003',
    name: "H'Hen Niê",
    role: 'vip',
    eventId: 'evt-002',
    eventName: 'Creative Summit 2024',
    bio: 'Hoa hậu Hoàn vũ VN & Diễn giả truyền cảm hứng.',
    initials: 'HN',
    tone: 'lilac',
    avatar: '/images/speakers/hhen-nie.png'
  },
  {
    id: 'spk-004',
    name: 'Đen Vâu',
    role: 'speaker',
    eventId: 'evt-002',
    eventName: 'Creative Summit 2024',
    bio: 'Rapper & Nghệ sĩ truyền cảm hứng cộng đồng.',
    initials: 'ĐV',
    tone: 'yellow',
    avatar: '/images/speakers/den-vau.jpg'
  },
  {
    id: 'spk-005',
    name: 'Mỹ Tâm',
    role: 'speaker',
    eventId: 'evt-001',
    eventName: 'Vibe Festival 2024',
    bio: 'Nghệ sĩ, Nhạc sĩ & Biểu tượng âm nhạc đương đại Việt Nam.',
    initials: 'MT',
    tone: 'coral',
    avatar: '/images/speakers/my-tam.jpg'
  },
  {
    id: 'spk-006',
    name: 'Soobin Hoàng Sơn',
    role: 'speaker',
    eventId: 'evt-003',
    eventName: 'Tech & Music Fest',
    bio: 'Ca sĩ, Nhạc sĩ & Nhà sản xuất âm nhạc tài năng SpaceSpeakers.',
    initials: 'SB',
    tone: 'cyan',
    avatar: '/images/speakers/soobin.jpg'
  },
  {
    id: 'spk-007',
    name: 'Khánh Vy',
    role: 'mc',
    eventId: 'evt-002',
    eventName: 'Creative Summit 2024',
    bio: 'MC Đài Truyền hình Việt Nam, Nhà sáng tạo nội dung giáo dục & truyền cảm hứng trẻ.',
    initials: 'KV',
    tone: 'lilac',
    avatar: '/images/speakers/khanh-vy.png'
  },
  {
    id: 'spk-008',
    name: 'Suboi',
    role: 'speaker',
    eventId: 'evt-001',
    eventName: 'Vibe Festival 2024',
    bio: 'Nữ nghệ sĩ Hip-hop tiên phong & Giám khảo Rap Việt.',
    initials: 'SB',
    tone: 'yellow',
    avatar: '/images/speakers/suboi.jpg'
  },
  {
    id: 'spk-009',
    name: 'Ngô Thanh Vân',
    role: 'vip',
    eventId: 'evt-002',
    eventName: 'Creative Summit 2024',
    bio: 'Đạo diễn, Nhà sản xuất điện ảnh quốc tế & Giám đốc Studio68.',
    initials: 'NV',
    tone: 'coral',
    avatar: '/images/speakers/ngo-thanh-van.png'
  },
  {
    id: 'spk-010',
    name: 'Binz',
    role: 'vip',
    eventId: 'evt-003',
    eventName: 'Tech & Music Fest',
    bio: 'Rapper, Nhạc sĩ & Huấn luyện viên Rap Việt tiêu biểu.',
    initials: 'BZ',
    tone: 'cyan',
    avatar: '/images/speakers/binz.png'
  },
]

/**
 * Platform statistics
 * @type {{eventsHosted:string, ticketsSold:string, partners:string, satisfactionRate:string}}
 */
export const stats = {
  eventsHosted: '10K+',
  ticketsSold: '2M+',
  partners: '150+',
  satisfactionRate: '98%',
}

/** @type {Array<{id:string,name:string,price:string,period:string|null,desc:string,features:string[],highlighted:boolean}>} */
export const pricingPlans = [
  {
    id: 'plan-starter',
    name: 'Starter',
    price: 'Miễn phí',
    period: null,
    desc: 'Cho những sự kiện đầu tiên',
    features: ['1 sự kiện / tháng', '100 khách tham dự', 'Check-in QR cơ bản'],
    highlighted: false,
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    price: '499K',
    period: '/tháng',
    desc: 'Cho event team chuyên nghiệp',
    features: ['Sự kiện không giới hạn', 'Bán vé & thanh toán', 'Báo cáo realtime'],
    highlighted: true,
  },
  {
    id: 'plan-studio',
    name: 'Studio',
    price: 'Liên hệ',
    period: null,
    desc: 'Cho agency và thương hiệu',
    features: ['Tổ chức đa địa điểm', 'Branding theo yêu cầu', 'Hỗ trợ riêng 24/7'],
    highlighted: false,
  },
]

/** @type {Array<{id:string,eventId:string,eventName:string,originalPrice:number,salePrice:number,discountPercent:number,expiresAt:string}>} */
export const saleTickets = [
  { id: 'tkt-s-001', eventId: 'evt-001', eventName: 'Vibe Festival 2024', originalPrice: 500000, salePrice: 350000, discountPercent: 30, expiresAt: '2024-08-20T23:59:59' },
  { id: 'tkt-s-002', eventId: 'evt-003', eventName: 'Tech & Music Fest', originalPrice: 699000, salePrice: 499000, discountPercent: 29, expiresAt: '2024-10-01T23:59:59' },
]

/** @type {Array<{id:string,name:string,logoText:string,website:string,logoSvg:string}>} */
export const partners = [
  {
    id: 'ptn-001',
    name: 'VIBELAB',
    logoText: 'VIBELAB',
    website: '#',
    logoSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#6366F1"/><path d="M6 13V11M10 16V8M14 18V6M18 14V10" stroke="white" stroke-width="2.2" stroke-linecap="round"/></svg>'
  },
  {
    id: 'ptn-002',
    name: 'Mộc Studio',
    logoText: 'MỘC.',
    website: '#',
    logoSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#15803D"/><path d="M12 5C8.5 7.5 7.5 11.5 8 15C10 15.5 13 14.5 15 12.5C16.5 11 17 8 17 6C15 6 13 5.5 12 5Z" fill="white"/><path d="M10 14L14 8" stroke="#15803D" stroke-width="1.8" stroke-linecap="round"/></svg>'
  },
  {
    id: 'ptn-003',
    name: 'NorthStar',
    logoText: 'northstar',
    website: '#',
    logoSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#0F172A"/><path d="M12 4L13.8 9.8L19.5 11.5L13.8 13.2L12 19L10.2 13.2L4.5 11.5L10.2 9.8L12 4Z" fill="#38BDF8"/><circle cx="12" cy="11.5" r="1.5" fill="white"/></svg>'
  },
  {
    id: 'ptn-004',
    name: 'Sự Kiện Việt',
    logoText: 'SỰ KIỆN VIỆT',
    website: '#',
    logoSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#E11D48"/><path d="M12 5.5L13.8 9.5L18.2 9.8L14.8 12.6L15.9 16.9L12 14.5L8.1 16.9L9.2 12.6L5.8 9.8L10.2 9.5L12 5.5Z" fill="#FDE047"/></svg>'
  },
  {
    id: 'ptn-005',
    name: 'VNPay',
    logoText: 'VNPAY',
    website: '#',
    logoSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#005BAA"/><path d="M5.5 7H9L12 14.5L15 7H18.5L13.8 17H10.2L5.5 7Z" fill="white"/><path d="M12 14.5L15 7H18.5L13.8 17H12.5L12 14.5Z" fill="#ED1C24"/></svg>'
  },
  {
    id: 'ptn-006',
    name: 'MoMo',
    logoText: 'MoMo',
    website: '#',
    logoSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#A50064"/><path d="M6 16.5V7.5H8.6L12 12.2L15.4 7.5H18V16.5H15.6V11.2L12.4 15.5H11.6L8.4 11.2V16.5H6Z" fill="white"/></svg>'
  },
  {
    id: 'ptn-007',
    name: 'Ticket Box',
    logoText: 'TicketBox',
    website: '#',
    logoSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#00C16E"/><path d="M6 8.5C6 7.67 6.67 7 7.5 7H16.5C17.33 7 18 7.67 18 8.5C18 9.33 17.33 10 16.5 10C15.67 10 15 10.67 15 11.5C15 12.33 15.67 13 16.5 13C17.33 13 18 13.67 18 14.5C18 15.33 17.33 16 16.5 16H7.5C6.67 16 6 15.33 6 14.5C6 13.67 6.67 13 7.5 13C8.33 13 9 12.33 9 11.5C9 10.67 8.33 10 7.5 10C6.67 10 6 9.33 6 8.5Z" fill="white"/><circle cx="12" cy="11.5" r="1.5" fill="#00C16E"/></svg>'
  },
]
