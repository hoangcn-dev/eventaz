/**
 * EventAZ Mock Data - Users & Personnel (Module Vue App)
 */

import initialUsers from './users.json';

const USERS_STORAGE_KEY = "eventaz_mock_users_v3";
const EVENT_ROSTER_KEY = "eventaz_mock_event_roster_v3";

export const DEPARTMENTS = [
    { code: "Ban Điều Hành", nameVi: "Ban Điều Hành / BTC" },
    { code: "Ban Nội Dung", nameVi: "Ban Nội Dung & Diễn Giả" },
    { code: "Ban Hậu Cần", nameVi: "Ban Hậu Cần & Địa Điểm" },
    { code: "Ban Truyền Thông", nameVi: "Ban Truyền Thông & Marketing" },
    { code: "Ban Đối Ngoại", nameVi: "Ban Đối Ngoại & VIP" },
    { code: "Ban Kỹ Thuật", nameVi: "Ban Kỹ Thuật & Hạ Tầng" }
];

export const ATTENDANCE_STATUSES = {
    "Checked-in": { code: "Checked-in", nameVi: "Đã có mặt", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    "On-duty": { code: "On-duty", nameVi: "Đang làm ca", color: "bg-blue-100 text-blue-800 border-blue-300" },
    "Absent": { code: "Absent", nameVi: "Vắng mặt", color: "bg-red-100 text-red-800 border-red-300" }
};

export const defaultUsers = initialUsers;

export const defaultEventRosters = {
    "E-2024-99X": [
        { userId: "USR-001", roleVi: "Trưởng Ban Tổ Chức", department: "Ban Điều Hành", wbsId: "WBS-05", managerId: "USR-001", managerName: "Nguyễn Văn Trưởng", attendanceStatus: "Checked-in", raciCount: 4 },
        { userId: "USR-002", roleVi: "Trưởng ban Hậu cần", department: "Ban Hậu Cần", wbsId: "WBS-02", managerId: "USR-001", managerName: "Nguyễn Văn Trưởng", attendanceStatus: "Checked-in", raciCount: 3 },
        { userId: "USR-003", roleVi: "Trưởng ban Nội dung", department: "Ban Nội Dung", wbsId: "WBS-01", managerId: "USR-001", managerName: "Nguyễn Văn Trưởng", attendanceStatus: "On-duty", raciCount: 3 },
        { userId: "USR-004", roleVi: "Trưởng ban Truyền thông", department: "Ban Truyền Thông", wbsId: "WBS-03", managerId: "USR-001", managerName: "Nguyễn Văn Trưởng", attendanceStatus: "Checked-in", raciCount: 2 },
        { userId: "USR-005", roleVi: "Trưởng ban Đối ngoại", department: "Ban Đối Ngoại", wbsId: "WBS-04", managerId: "USR-001", managerName: "Nguyễn Văn Trưởng", attendanceStatus: "Absent", raciCount: 1 },
        { userId: "USR-006", roleVi: "Trưởng ban Kỹ thuật", department: "Ban Kỹ Thuật", wbsId: "WBS-06", managerId: "USR-001", managerName: "Nguyễn Văn Trưởng", attendanceStatus: "Checked-in", raciCount: 2 },
        { userId: "USR-007", roleVi: "Chuyên viên Thiết kế", department: "Ban Truyền Thông", wbsId: "WBS-03", managerId: "USR-004", managerName: "Phạm Hoàng Truyền Thông", attendanceStatus: "On-duty", raciCount: 1 },
        { userId: "USR-008", roleVi: "Kỹ thuật viên Âm thanh", department: "Ban Kỹ Thuật", wbsId: "WBS-06", managerId: "USR-006", managerName: "Vũ Anh Kỹ Thuật", attendanceStatus: "Checked-in", raciCount: 1 }
    ]
};

export function getUsers() {
    try {
        const stored = localStorage.getItem(USERS_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
        console.error('Error parsing stored users', e);
    }
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
}

export function saveUsers(users) {
    try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
        console.error('Error saving users', e);
    }
}

export function createPersonnel(userData) {
    const users = getUsers();
    const newId = `USR-0${(users.length + 1).toString().padStart(2, '0')}`;
    const newUser = {
        id: newId,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '0908 123 456',
        avatar: userData.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
        role: userData.role || 'Member',
        roleVi: userData.roleVi || 'Thành viên BTC',
        department: userData.department || 'Ban Điều Hành',
        skills: userData.skills || ['Hậu cần', 'Điều phối'],
        joinDate: new Date().toISOString().slice(0, 10),
        status: userData.status || 'active'
    };
    users.unshift(newUser);
    saveUsers(users);
    return newUser;
}

export function importUsersFromExcel(parsedUsers) {
    const users = getUsers();
    const addedList = [];
    parsedUsers.forEach((u, i) => {
        const newId = `USR-0${(users.length + 1).toString().padStart(2, '0')}`;
        const newUser = {
            id: newId,
            name: u.name,
            email: u.email,
            phone: u.phone || '0912 888 999',
            avatar: u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            role: u.role || 'Member Specialist',
            roleVi: u.roleVi || u.title || 'Chuyên viên Bổ Sung',
            department: u.department || 'Ban Hậu Cần',
            skills: u.skills || ['Import Excel'],
            joinDate: new Date().toISOString().slice(0, 10),
            status: 'PendingApproval'
        };
        users.unshift(newUser);
        addedList.push(newUser);
    });
    saveUsers(users);
    return addedList;
}

export function approvePendingUsers(userIds) {
    const users = getUsers();
    users.forEach(u => {
        if (userIds.includes(u.id)) {
            u.status = 'active';
        }
    });
    saveUsers(users);
    return users;
}

export function getEventRosters() {
    try {
        const raw = localStorage.getItem(EVENT_ROSTER_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {
        console.error("Error reading event roster", e);
    }
    localStorage.setItem(EVENT_ROSTER_KEY, JSON.stringify(defaultEventRosters));
    return defaultEventRosters;
}

export function getEventPersonnel(eventId) {
    const rosters = getEventRosters();
    const users = getUsers();
    const eventRoster = rosters[eventId] || defaultEventRosters["E-2024-99X"];

    return eventRoster.map(r => {
        const userObj = users.find(u => u.id === r.userId) || {};
        return {
            ...userObj,
            ...r
        };
    });
}

export function assignPersonnelToEvent(eventId, assignmentData) {
    const rosters = getEventRosters();
    rosters[eventId] = rosters[eventId] || [];
    
    const existsIndex = rosters[eventId].findIndex(r => r.userId === assignmentData.userId);
    const newAssignment = {
        userId: assignmentData.userId,
        roleVi: assignmentData.roleVi || 'Thành viên Ban Tổ Chức',
        department: assignmentData.department || 'Ban Hậu Cần',
        wbsId: assignmentData.wbsId || 'WBS-01',
        managerId: assignmentData.managerId || 'USR-001',
        managerName: assignmentData.managerName || 'Nguyễn Văn Trưởng',
        attendanceStatus: 'Checked-in',
        raciCount: assignmentData.raciCount || 1
    };

    if (existsIndex !== -1) {
        rosters[eventId][existsIndex] = newAssignment;
    } else {
        rosters[eventId].unshift(newAssignment);
    }

    localStorage.setItem(EVENT_ROSTER_KEY, JSON.stringify(rosters));
}

export function removePersonnelFromEvent(eventId, userId) {
    const rosters = getEventRosters();
    if (rosters[eventId]) {
        rosters[eventId] = rosters[eventId].filter(r => r.userId !== userId);
        localStorage.setItem(EVENT_ROSTER_KEY, JSON.stringify(rosters));
    }
}

export function updateAttendanceStatus(eventId, userId, newStatus) {
    const rosters = getEventRosters();
    if (rosters[eventId]) {
        const target = rosters[eventId].find(r => r.userId === userId);
        if (target) {
            target.attendanceStatus = newStatus;
            localStorage.setItem(EVENT_ROSTER_KEY, JSON.stringify(rosters));
        }
    }
}
