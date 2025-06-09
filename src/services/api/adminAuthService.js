// Mock admin authentication service
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock admin user data
const mockAdmins = [
  { id: 1, username: 'admin', role: 'admin' },
  { id: 2, username: 'moderator', role: 'moderator' }
];
// Mock current user (simulate logged-in admin)
let currentUser = { 
  ...mockAdmins[0], 
  isAuthenticated: true, 
  permissions: ['read', 'write', 'delete', 'manage_content'] 
}; // Default to admin for demo

export const isAdmin = async () => {
  await delay(100);
  return currentUser?.role === 'admin' || currentUser?.role === 'moderator';
};

export const getCurrentUser = async () => {
  await delay(100);
  return currentUser ? { ...currentUser } : null;
};

export const setCurrentUser = (user) => {
  currentUser = user;
};

export const logout = async () => {
  await delay(100);
  currentUser = null;
};

export const hasPermission = async (permission) => {
  await delay(100);
  if (!currentUser || !currentUser.permissions) {
    return false;
  }
  return currentUser.permissions.includes(permission);
};

export const canManageContent = async () => {
  await delay(100);
  return await hasPermission('manage_content');
};

export const login = async (credentials) => {
  await delay(500);
  // Mock login logic
  if (credentials.email === 'admin@apper.com' && credentials.password === 'admin123') {
    currentUser.isAuthenticated = true;
    currentUser.permissions = ['read', 'write', 'delete', 'manage_content'];
    return { success: true, user: { ...currentUser } };
  }
  throw new Error('Invalid credentials');
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
  toggleAdminMode,
  setCurrentUser
};