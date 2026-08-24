/**
 * EventAZ Session & Auth Utility (Vue Application)
 */

const SESSION_KEY = 'eventaz_session_v1';

export const MOCK_USERS = {
  'organizer@eventaz.vn': {
    name: 'Nguyễn Văn Trưởng',
    email: 'organizer@eventaz.vn',
    role: 'organizer',
    roleVi: 'Ban Tổ Chức',
    redirectUrl: '/dashboard'
  },
  'admin@eventaz.vn': {
    name: 'Quản Trị Viên Hệ Thống',
    email: 'admin@eventaz.vn',
    role: 'admin',
    roleVi: 'Quản Trị Hệ Thống',
    redirectUrl: '/dashboard'
  },
  'supplier@eventaz.vn': {
    name: 'Công Ty Thiết Bị Pro',
    email: 'supplier@eventaz.vn',
    role: 'supplier',
    roleVi: 'Nhà Cung Cấp / Đối Tác',
    redirectUrl: '/dashboard'
  }
};

export function getSession() {
  try {
    const data = sessionStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Lỗi đọc sessionStorage:', e);
    return null;
  }
}

export function setSession(user) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
      user: user,
      loginTime: new Date().toISOString()
    }));
  } catch (e) {
    console.error('Lỗi ghi sessionStorage:', e);
  }
}

export function clearSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.error('Lỗi xóa sessionStorage:', e);
  }
}

export function loginUser(email, password) {
  const userKey = email.toLowerCase().trim();
  let targetUser = MOCK_USERS[userKey];

  if (!targetUser) {
    let redirectUrl = '/dashboard';
    let roleVi = 'Ban Tổ Chức';
    let role = 'organizer';

    if (email.includes('admin')) {
      role = 'admin';
      roleVi = 'Quản Trị Hệ Thống';
    } else if (email.includes('supplier')) {
      role = 'supplier';
      roleVi = 'Nhà Cung Cấp / Đối Tác';
    }

    targetUser = {
      name: email.split('@')[0] || 'Người dùng Test',
      email: email,
      role: role,
      roleVi: roleVi,
      redirectUrl: redirectUrl
    };
  }

  setSession(targetUser);
  return targetUser;
}

export function maskEmail(email) {
  if (!email || !email.includes('@')) return '****abc@gmail.com';
  const parts = email.split('@');
  const name = parts[0];
  const domain = parts[1];
  let maskedName = '****';
  if (name.length > 3) {
    maskedName += name.slice(-3);
  } else {
    maskedName += name;
  }
  return maskedName + '@' + domain;
}
