import { ApiResponse, ApiError, RequestConfig } from '../types';

// Get API base URL from environment variables
// @ts-ignore
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

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
    return localStorage.getItem('authToken');
  }

  // Set authentication token
  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Remove authentication token
  removeAuthToken(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }

  // Build request headers
  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers = {
      ...this.defaultConfig.headers,
      ...customHeaders,
    };

    // Add authorization header if token exists
    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  // Handle API response
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          message: data.message || data.error || 'An error occurred',
          statusCode: response.status,
          code: data.code,
          details: data.details,
        };

        return {
          success: false,
          error: error.message,
          ...data,
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
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
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config?.timeout || this.defaultConfig.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return await this.handleResponse<T>(response);
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
    }, config);
  }

  // POST request
  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(config?.headers);

    return this.makeRequest<T>(url, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    }, config);
  }

  // PUT request
  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(config?.headers);

    return this.makeRequest<T>(url, {
      method: 'PUT',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    }, config);
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(config?.headers);

    return this.makeRequest<T>(url, {
      method: 'PATCH',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    }, config);
  }

  // DELETE request
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(config?.headers);

    return this.makeRequest<T>(url, {
      method: 'DELETE',
      headers,
    }, config);
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
    }, config);
  }
}

// Create and export singleton instance
export const httpClient = new HttpClient();

// Export class for custom instances if needed
export { HttpClient };