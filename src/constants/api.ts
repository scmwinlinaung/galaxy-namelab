/**
 * API configuration constants
 */

export const API_CONFIG = {
  HOST: 'https://18.139.99.95/name-lab',
  BASE_URL: 'http://localhost:3000/api',
  TIMEOUT: 10000,
  HEADERS: {
    CONTENT_TYPE: 'application/json',
  },
  ENDPOINTS: {
    PACKAGES: '/api/packages',
    AUTH: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
} as const;

export const API_URLS = {
  PACKAGES: `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.PACKAGES}`,
  LOGIN: `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.LOGIN}`,
  REGISTER: `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.REGISTER}`,
  LOGOUT: `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.LOGOUT}`,
  PROFILE: `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.PROFILE}`,
  REFRESH: `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.REFRESH}`,
  FORGOT_PASSWORD: `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.FORGOT_PASSWORD}`,
  RESET_PASSWORD: `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.RESET_PASSWORD}`,
  VERIFY_EMAIL: `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.VERIFY_EMAIL}`,
} as const;

export const TIMEOUTS = {
  DEFAULT: 10000,
  SHORT: 5000,
  LONG: 30000,
} as const;

export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timeout',
  PARSE: 'Failed to parse server response',
  UNEXPECTED: 'An unexpected error occurred',
  GENERIC: 'An error occurred',
} as const;