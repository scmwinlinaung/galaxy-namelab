import { ApiResponse, ApiError, RequestConfig } from '../types';
import { STORAGE_KEYS } from '@constants/api';

// Get API base URL from environment variables
// @ts-ignore
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.galaxynamelab.com/name-lab/api';
const API_BASE_URL =  'https://api.galaxynamelab.com/name-lab/api';
// Default request configuration
const DEFAULT_CONFIG: RequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
};

// HTTP Client class for API communication
class HttpClient {
  private baseURL: string;
  private defaultConfig: RequestConfig;

  constructor(baseURL: string = API_BASE_URL, defaultConfig: RequestConfig = DEFAULT_CONFIG) {
    this.baseURL = baseURL;
    this.defaultConfig = defaultConfig;
  }

  // Get authentication token from localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  // Set authentication token
  setAuthToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  // Remove authentication token
  removeAuthToken(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  // Build request headers with common auth interceptor
  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      ...this.defaultConfig.headers,
      ...customHeaders,
    };

    // Common auth interceptor: Add x-auth-token header if token exists
    const token = this.getAuthToken();
    if (token) {
      headers['x-auth-token'] = token;
    }

    return headers;
  }

  // Handle API response
  private async handleResponse<T>(response: Response, isBlob: boolean = false): Promise<ApiResponse<T>> {
    try {
      const data = isBlob ? await response.blob() : await response.json();

      if (!response.ok) {
        const error: ApiError = {
          message: isBlob ? response.statusText : (data.message || data.error || 'An error occurred'),
          statusCode: response.status,
          code: isBlob ? undefined : data.code,
          details: isBlob ? undefined : data.details,
        };

        return {
          success: false,
          error: error.message,
          ...(isBlob ? {} : { ...data }),
        };
      }

      return {
        success: true,
        data: isBlob ? (data as T) : (data.data || data),
        message: isBlob ? undefined : data.message,
        statusCode: response.status,
      };
    } catch (parseError) {
      return {
        success: false,
        error: 'Failed to parse server response',
        statusCode: response.status,
      };
    }
  }

  // Handle network errors
  private handleNetworkError(error: any): ApiResponse {
    if (error.name === 'AbortError') {
      return {
        success: false,
        error: 'Request timeout',
      };
    }

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Network error. Please check your connection.',
      };
    }

    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }

  // Make HTTP request with timeout
  private async makeRequest<T>(
    url: string,
    options: RequestInit,
    config?: RequestConfig,
    isBlob: boolean = false
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config?.timeout || this.defaultConfig.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return await this.handleResponse<T>(response, isBlob);
    } catch (error) {
      clearTimeout(timeoutId);
      return this.handleNetworkError(error);
    }
  }

  // GET request
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(config?.headers);

    return this.makeRequest<T>(url, {
      method: 'GET',
      headers,
    }, config, false);
  }

  // GET request with blob response
  async getBlob<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(config?.headers);

    return this.makeRequest<T>(url, {
      method: 'GET',
      headers,
    }, config, true);
  }

  // POST request
  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(config?.headers);

    return this.makeRequest<T>(url, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    }, config, false);
  }

  // PUT request
  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(config?.headers);

    return this.makeRequest<T>(url, {
      method: 'PUT',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    }, config, false);
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(config?.headers);

    return this.makeRequest<T>(url, {
      method: 'PATCH',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    }, config, false);
  }

  // DELETE request
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(config?.headers);

    return this.makeRequest<T>(url, {
      method: 'DELETE',
      headers,
    }, config, false);
  }

  // File upload (multipart/form-data)
  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const formData = new FormData();

    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const headers = this.buildHeaders({
      // Remove Content-Type to let browser set it with boundary
      // @ts-ignore
      "Content-Type": undefined,
      ...config?.headers,
    });

    // Remove Content-Type from headers for FormData
    delete headers['Content-Type'];

    return this.makeRequest<T>(url, {
      method: 'POST',
      headers,
      body: formData,
    }, config, false);
  }
}

// Create and export singleton instance
export const httpClient = new HttpClient();

// Export class for custom instances if needed
export { HttpClient };