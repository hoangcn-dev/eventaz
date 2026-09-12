/**
 * EventAZ Mock Data - System Admin Approvals Center
 */

import { approvePendingUsers } from './users.js';

const ADMIN_APPROVALS_KEY = "eventaz_mock_admin_approvals_v1";

const defaultAdminApprovals = [
    {
        id: "APR-001",
        type: "EventPublish",
        title: "Phê duyệt Xuất bản Sự kiện Công khai",
        requester: "Nguyễn Văn Trưởng",
        status: "Pending",
        createdAt: "2026-08-01 10:00:00"
    }
];

export function getAdminApprovalRequests() {
    try {
        const stored = localStorage.getItem(ADMIN_APPROVALS_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
        console.error("Error reading admin approvals data", e);
    }
    localStorage.setItem(ADMIN_APPROVALS_KEY, JSON.stringify(defaultAdminApprovals));
    return defaultAdminApprovals;
}

export function saveAdminApprovalRequests(list) {
    try {
        localStorage.setItem(ADMIN_APPROVALS_KEY, JSON.stringify(list));
    } catch (e) {
        console.error("Error saving admin approvals data", e);
    }
}

export function createPersonnelApprovalRequest(companyName, usersList) {
    const list = getAdminApprovalRequests();
    const userIds = usersList.map(u => u.id);

    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const newReq = {
        id: `ADM-APR-0${Date.now().toString().slice(-2)}`,
        companyId: "ORG-001",
        companyName: companyName || "Công ty TNHH Truyền thông & Sự kiện EventAZ (Công ty A)",
        requestType: "PersonnelImport",
        title: `Yêu cầu phê duyệt bổ sung ${usersList.length} Nhân sự mới từ File Excel`,
        requestDate: nowStr,
        status: "Pending",
        pendingUserIds: userIds,
        notes: `File Excel vừa tải lên ${usersList.length} nhân sự mới vào hệ thống.`
    };

    list.unshift(newReq);
    saveAdminApprovalRequests(list);
    return newReq;
}

export function approveAdminRequest(requestId) {
    const list = getAdminApprovalRequests();
    const req = list.find(r => r.id === requestId);
    if (req) {
        req.status = "Approved";
        if (req.pendingUserIds && req.pendingUserIds.length > 0) {
            approvePendingUsers(req.pendingUserIds);
        }
        saveAdminApprovalRequests(list);
    }
    return req;
}

export function rejectAdminRequest(requestId) {
    const list = getAdminApprovalRequests();
    const req = list.find(r => r.id === requestId);
    if (req) {
        req.status = "Rejected";
        saveAdminApprovalRequests(list);
    }
    return req;
}
