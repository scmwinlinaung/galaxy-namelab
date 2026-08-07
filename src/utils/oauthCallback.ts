import { STORAGE_KEYS } from '@constants/api';
import { AuthService } from '@api/services/authService';

/**
 * Stores OAuth token/userId and fetches the user's profile.
 * Shared by the dedicated callback pages and the root-level fallback handler
 * (the backend has been observed redirecting to `/` instead of the callback routes).
 */
export const completeOAuthLogin = async (token: string, userId: string): Promise<void> => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
  localStorage.removeItem(STORAGE_KEYS.USER_PASSWORD);

  try {
    const userData = await AuthService.getUserById(userId, token);
    localStorage.setItem(STORAGE_KEYS.USER_NAME, userData?.data?.name || "");
    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData?.data?.email || "");
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  } finally {
    window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: true } }));
  }
};
