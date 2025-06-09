// Admin Authentication Service
// Simulates role-based authentication system

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data - in real app this would come from backend
let currentUser = {
  id: 1,
  name: 'Admin User',
  email: 'admin@apper.com',
  role: 'admin', // 'admin' | 'user' | 'moderator'
  permissions: ['read', 'write', 'delete', 'manage_content'],
  isAuthenticated: true
};

export const getCurrentUser = async () => {
  await delay(100);
  return { ...currentUser };
};

export const isAdmin = async () => {
  await delay(50);
  return currentUser.isAuthenticated && currentUser.role === 'admin';
};

export const hasPermission = async (permission) => {
  await delay(50);
  return currentUser.isAuthenticated && 
         currentUser.permissions.includes(permission);
};

export const canManageContent = async () => {
  await delay(50);
  return await hasPermission('manage_content');
};

export const login = async (credentials) => {
  await delay(500);
  // Mock login logic
  if (credentials.email === 'admin@apper.com' && credentials.password === 'admin123') {
    currentUser.isAuthenticated = true;
    return { success: true, user: { ...currentUser } };
  }
  throw new Error('Invalid credentials');
};

export const logout = async () => {
  await delay(200);
  currentUser.isAuthenticated = false;
  return { success: true };
};

// For development - toggle admin status
export const toggleAdminMode = () => {
  currentUser.role = currentUser.role === 'admin' ? 'user' : 'admin';
  if (currentUser.role === 'admin') {
    currentUser.permissions = ['read', 'write', 'delete', 'manage_content'];
  } else {
    currentUser.permissions = ['read'];
  }
  return currentUser.role === 'admin';
};

export default {
  getCurrentUser,
  isAdmin,
  hasPermission,
  canManageContent,
  login,
  logout,
  toggleAdminMode
};