/**
 * EventAZ Mock Data - Event Documents Repository (Module 01 / Module 02 - Tab Tài Liệu)
 */

const DOCUMENTS_STORAGE_KEY = "eventaz_mock_documents_v3";
const CUSTOM_CATEGORIES_KEY = "eventaz_custom_doc_categories";

export const defaultDocumentCategories = [
    { code: "Giấy phép & Pháp lý", nameVi: "Giấy phép & Pháp lý" },
    { code: "Hợp đồng & Cam kết", nameVi: "Hợp đồng & Cam kết" },
    { code: "Kịch bản & Chương trình", nameVi: "Kịch bản & Chương trình" },
    { code: "Sơ đồ & Hậu cần", nameVi: "Sơ đồ & Hậu cần" },
    { code: "Thiết kế & Marketing", nameVi: "Thiết kế & Marketing" },
    { code: "Tài chính & Báo giá", nameVi: "Tài chính & Báo giá" },
    { code: "Biên bản & Nghiệm thu", nameVi: "Biên bản & Nghiệm thu" }
];

export const FORMAT_BADGES = {
    "PDF": { code: "PDF", color: "bg-red-100 text-red-700 border-red-300" },
    "DOCX": { code: "DOCX", color: "bg-blue-100 text-blue-700 border-blue-300" },
    "XLSX": { code: "XLSX", color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
    "PNG": { code: "PNG", color: "bg-purple-100 text-purple-700 border-purple-300" },
    "ZIP": { code: "ZIP", color: "bg-amber-100 text-amber-700 border-amber-300" },
    "CAD": { code: "CAD", color: "bg-cyan-100 text-cyan-700 border-cyan-300" }
};

export const defaultDocuments = [
    {
        id: "DOC-001",
        eventId: "E-2024-99X",
        name: "Giay_Phep_To_Chuc_Event_2026_So_Van_Hoa.pdf",
        typeCategory: "Giấy phép & Pháp lý",
        format: "PDF",
        sizeKb: "2,450 KB",
        uploadDate: "2026-08-01 09:30",
        uploaderId: "USR-001",
        uploaderName: "Nguyễn Văn Trưởng",
        uploaderRole: "Trưởng BTC",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
        id: "DOC-002",
        eventId: "E-2024-99X",
        name: "Kich_Ban_Chi_Tiet_Run_of_Show_v3.docx",
        typeCategory: "Kịch bản & Chương trình",
        format: "DOCX",
        sizeKb: "1,280 KB",
        uploadDate: "2026-08-10 14:15",
        uploaderId: "USR-003",
        uploaderName: "Lê Văn Nội Dung",
        uploaderRole: "Trưởng ban Nội dung",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
    },
    {
        id: "DOC-003",
        eventId: "E-2024-99X",
        name: "Hop_Dong_Thue_Mat_Bang_NCC_Chinh_Thuc.pdf",
        typeCategory: "Hợp đồng & Cam kết",
        format: "PDF",
        sizeKb: "4,820 KB",
        uploadDate: "2026-08-05 11:00",
        uploaderId: "USR-002",
        uploaderName: "Trần Thị Hậu Cần",
        uploaderRole: "Trưởng ban Hậu cần",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
        id: "DOC-004",
        eventId: "E-2024-99X",
        name: "So_Do_Bo_Tri_Booths_Trien_Lam_50_Gian.png",
        typeCategory: "Sơ đồ & Hậu cần",
        format: "PNG",
        sizeKb: "3,150 KB",
        uploadDate: "2026-08-08 16:45",
        uploaderId: "USR-002",
        uploaderName: "Trần Thị Hậu Cần",
        uploaderRole: "Trưởng ban Hậu cần",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
        id: "DOC-005",
        eventId: "E-2024-99X",
        name: "Bao_Gia_Am_Thanh_Man_Hinh_LED_P2.5.xlsx",
        typeCategory: "Tài chính & Báo giá",
        format: "XLSX",
        sizeKb: "950 KB",
        uploadDate: "2026-08-12 10:20",
        uploaderId: "USR-006",
        uploaderName: "Vũ Anh Kỹ Thuật",
        uploaderRole: "Trưởng ban Kỹ thuật",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
        id: "DOC-006",
        eventId: "E-2024-99X",
        name: "Bo_Nhan_Dien_KeyVisual_Standee_Vector.zip",
        typeCategory: "Thiết kế & Marketing",
        format: "ZIP",
        sizeKb: "18,400 KB",
        uploadDate: "2026-08-14 15:30",
        uploaderId: "USR-004",
        uploaderName: "Phạm Hoàng Truyền Thông",
        uploaderRole: "Trưởng ban Truyền thông",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
    },
    {
        id: "DOC-007",
        eventId: "E-2024-99X",
        name: "Bien_Ban_Nghiem_Thu_Thiet_Bi_Am_Thanh.pdf",
        typeCategory: "Biên bản & Nghiệm thu",
        format: "PDF",
        sizeKb: "1,620 KB",
        uploadDate: "2026-08-15 17:00",
        uploaderId: "USR-006",
        uploaderName: "Vũ Anh Kỹ Thuật",
        uploaderRole: "Trưởng ban Kỹ thuật",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    }
];

export function getDocumentCategories() {
    try {
        const stored = localStorage.getItem(CUSTOM_CATEGORIES_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
        console.error("Error reading custom document categories", e);
    }
    localStorage.setItem(CUSTOM_CATEGORIES_KEY, JSON.stringify(defaultDocumentCategories));
    return defaultDocumentCategories;
}

export function addCustomDocumentCategory(catName) {
    if (!catName || !catName.trim()) return;
    const cats = getDocumentCategories();
    const cleanName = catName.trim();
    if (!cats.some(c => c.code === cleanName)) {
        cats.push({ code: cleanName, nameVi: cleanName });
        localStorage.setItem(CUSTOM_CATEGORIES_KEY, JSON.stringify(cats));
    }
    return cats;
}

export function getDocuments() {
    try {
        const raw = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
        console.error("Error parsing stored documents", e);
    }
    localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(defaultDocuments));
    return defaultDocuments;
}

export function saveDocument(doc) {
    const docs = getDocuments();
    const index = docs.findIndex(d => d.id === doc.id);
    if (index !== -1) {
        docs[index] = doc;
    } else {
        docs.unshift(doc);
    }
    localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(docs));
    return doc;
}

export function deleteDocument(docId) {
    let docs = getDocuments();
    docs = docs.filter(d => d.id !== docId);
    localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(docs));
}
