/**
 * Centralized LocalStorage Service for VK Fest Hub
 * Stores & validates User and Vendor credentials with pre-seeded default accounts.
 */

const STORAGE_KEYS = {
  USERS: 'vk_users',
  VENDORS: 'vk_vendors',
  SESSION: 'vk_current_session',
};

// Default seed accounts
const DEFAULT_USERS = [
  {
    id: 'user_001',
    username: 'vishnu',
    fullName: 'VishnuVK',
    email: 'vis@vkkalyanam.com',
    mobileNo: '9876543210',
    password: 'user@123',
    createdAt: new Date().toISOString(),
  },
];

const DEFAULT_VENDORS = [
  {
    id: 'vendor_001',
    username: 'vis',
    businessName: 'VishnuVendor',
    ownerName: 'VishnuVendor',
    email: 'vishnu@vkmar.com',
    mobileNo: '9876543210',
    password: 'vendor@123',
    serviceCategory: 'Stage Decoration',
    createdAt: new Date().toISOString(),
  },
];

/**
 * Initialize storage with default accounts if not already present
 * and ensure default seed accounts are synchronized with latest credentials.
 */
export const initAuthStorage = () => {
  if (typeof window === 'undefined') return;

  try {
    const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    let users = existingUsers ? JSON.parse(existingUsers) : [];
    const userIdx = users.findIndex(
      (u) => u.id === 'user_001' || u.username === 'karthik' || u.username === 'vishnu'
    );
    if (userIdx >= 0) {
      users[userIdx] = DEFAULT_USERS[0];
    } else {
      users.unshift(DEFAULT_USERS[0]);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    const existingVendors = localStorage.getItem(STORAGE_KEYS.VENDORS);
    let vendors = existingVendors ? JSON.parse(existingVendors) : [];
    const vendorIdx = vendors.findIndex(
      (v) => v.id === 'vendor_001' || v.username === 'srikrishnadecors' || v.username === 'vis'
    );
    if (vendorIdx >= 0) {
      vendors[vendorIdx] = DEFAULT_VENDORS[0];
    } else {
      vendors.unshift(DEFAULT_VENDORS[0]);
    }
    localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(vendors));
  } catch (err) {
    console.error('Failed to initialize auth storage:', err);
  }
};

// Self-initialize on module load
initAuthStorage();

/**
 * Fetch all registered users
 */
export const getUsers = () => {
  try {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : DEFAULT_USERS;
  } catch {
    return DEFAULT_USERS;
  }
};

/**
 * Fetch all registered vendors
 */
export const getVendors = () => {
  try {
    const vendors = localStorage.getItem(STORAGE_KEYS.VENDORS);
    return vendors ? JSON.parse(vendors) : DEFAULT_VENDORS;
  } catch {
    return DEFAULT_VENDORS;
  }
};

/**
 * Authenticate User with Email/Mobile/Username + Password
 */
export const loginUser = (identifier, password) => {
  if (!identifier || !password) {
    return { success: false, message: 'Please enter both identifier and password.' };
  }

  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = password.trim();
  const users = getUsers();

  const matchedUser = users.find(
    (u) =>
      (u.email && u.email.toLowerCase() === cleanId) ||
      (u.mobileNo && u.mobileNo === cleanId) ||
      (u.username && u.username.toLowerCase() === cleanId)
  );

  if (!matchedUser) {
    return {
      success: false,
      message: 'Account not found. Please check your Email/Mobile or Register as a new Member.',
    };
  }

  if (matchedUser.password !== cleanPass) {
    return { success: false, message: 'Incorrect password. Please try again.' };
  }

  // Create active session without exposing password
  const { password: _, ...userSession } = matchedUser;
  const sessionData = {
    role: 'user',
    user: userSession,
    loggedInAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData));
    window.dispatchEvent(new Event('vk_auth_change'));
  } catch (err) {
    console.error('Failed to save session:', err);
  }

  return { success: true, user: userSession };
};

/**
 * Authenticate Vendor with Business Email/Mobile/Username + Password
 */
export const loginVendor = (identifier, password) => {
  if (!identifier || !password) {
    return { success: false, message: 'Please enter both identifier and password.' };
  }

  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = password.trim();
  const vendors = getVendors();

  const matchedVendor = vendors.find(
    (v) =>
      (v.email && v.email.toLowerCase() === cleanId) ||
      (v.mobileNo && v.mobileNo === cleanId) ||
      (v.username && v.username.toLowerCase() === cleanId) ||
      (v.businessName && v.businessName.toLowerCase() === cleanId)
  );

  if (!matchedVendor) {
    return {
      success: false,
      message: 'Vendor account not found. Please check your credentials or Register as a Partner.',
    };
  }

  if (matchedVendor.password !== cleanPass) {
    return { success: false, message: 'Incorrect password. Please try again.' };
  }

  const { password: _, ...vendorSession } = matchedVendor;
  const sessionData = {
    role: 'vendor',
    user: vendorSession,
    loggedInAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData));
    window.dispatchEvent(new Event('vk_auth_change'));
  } catch (err) {
    console.error('Failed to save session:', err);
  }

  return { success: true, vendor: vendorSession };
};

/**
 * Register a new User
 */
export const registerUser = ({ username, fullName, email, mobileNo, password }) => {
  const users = getUsers();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanMobile = (mobileNo || '').trim();

  // Check duplicates
  const duplicate = users.find(
    (u) =>
      (cleanEmail && u.email && u.email.toLowerCase() === cleanEmail) ||
      (cleanMobile && u.mobileNo && u.mobileNo === cleanMobile)
  );

  if (duplicate) {
    return {
      success: false,
      message: 'An account with this Email or Mobile Number already exists.',
    };
  }

  const newUser = {
    id: 'user_' + Date.now(),
    username: (username || '').trim() || cleanEmail.split('@')[0],
    fullName: (fullName || username || '').trim(),
    email: cleanEmail,
    mobileNo: cleanMobile,
    password: password.trim(),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to register user:', err);
    return { success: false, message: 'Storage error. Please try again.' };
  }

  return { success: true, user: newUser };
};

/**
 * Register a new Vendor
 */
export const registerVendor = ({
  username,
  ownerName,
  businessName,
  email,
  mobileNo,
  password,
  serviceCategory,
}) => {
  const vendors = getVendors();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanMobile = (mobileNo || '').trim();

  const duplicate = vendors.find(
    (v) =>
      (cleanEmail && v.email && v.email.toLowerCase() === cleanEmail) ||
      (cleanMobile && v.mobileNo && v.mobileNo === cleanMobile)
  );

  if (duplicate) {
    return {
      success: false,
      message: 'A vendor with this Email or Mobile Number is already registered.',
    };
  }

  const newVendor = {
    id: 'vendor_' + Date.now(),
    username: (username || '').trim() || cleanEmail.split('@')[0],
    businessName: (businessName || username || '').trim(),
    ownerName: (ownerName || username || '').trim(),
    email: cleanEmail,
    mobileNo: cleanMobile,
    password: password.trim(),
    serviceCategory: serviceCategory || 'Wedding Services',
    createdAt: new Date().toISOString(),
  };

  vendors.push(newVendor);
  try {
    localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(vendors));
  } catch (err) {
    console.error('Failed to register vendor:', err);
    return { success: false, message: 'Storage error. Please try again.' };
  }

  return { success: true, vendor: newVendor };
};

/**
 * Current Session Helpers
 */
export const getCurrentSession = () => {
  try {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
};

export const isUserLoggedIn = () => {
  const s = getCurrentSession();
  return Boolean(s && s.role === 'user');
};

export const isVendorLoggedIn = () => {
  const s = getCurrentSession();
  return Boolean(s && s.role === 'vendor');
};

export const logoutSession = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    window.dispatchEvent(new Event('vk_auth_change'));
  } catch (err) {
    console.error('Failed to logout session:', err);
  }
};

