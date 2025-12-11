// API Host Configuration
export const API_HOST = 'https://18.139.99.95/name-lab';

// API Endpoints
export const API_ENDPOINTS = {
  PACKAGES: '/api/packages',
  // Add other endpoints here as needed
} as const;

// Complete URLs for easy access
export const API_URLS = {
  PACKAGES: `${API_HOST}${API_ENDPOINTS.PACKAGES}`,
  // Add other complete URLs here as needed
} as const;