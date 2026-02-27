import { httpClient } from '../utils/httpClient';
import { API_HOST } from '../config/host';
import { ApiResponse, LoginRequest, RegisterRequest, AuthResponse, User } from '../types';

// Authentication service
export class AuthService {
  // User login
  static async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return httpClient.post<AuthResponse>('/auth/login', credentials);
  }

  // User registration
  static async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return httpClient.post<AuthResponse>('/auth/register', userData);
  }

  // Refresh access token
  static async refreshToken(refreshToken: string): Promise<ApiResponse<{ token: string }>> {
    return httpClient.post<{ token: string }>('/auth/refresh', { refreshToken });
  }

  // User logout
  static async logout(): Promise<ApiResponse> {
    return httpClient.post('/auth/logout');
  }

  // Get current user profile
  static async getCurrentUser(): Promise<ApiResponse<User>> {
    return httpClient.get<User>('/auth/me');
  }

  // Update user profile
  static async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return httpClient.put<User>('/auth/profile', userData);
  }

  // Change password
  static async changePassword(data: { currentPassword: string; newPassword: string }): Promise<ApiResponse> {
    return httpClient.post('/auth/change-password', data);
  }

  // Request password reset
  static async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>('/auth/forgot-password', { email });
  }

  // Reset password with token
  static async resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    return httpClient.post('/auth/reset-password', { token, newPassword });
  }

  // Verify email address
  static async verifyEmail(token: string): Promise<ApiResponse> {
    return httpClient.post('/auth/verify-email', { token });
  }

  // Resend verification email
  static async resendVerificationEmail(): Promise<ApiResponse> {
    return httpClient.post('/auth/resend-verification');
  }

  // Get user by ID
  static async getUserById(userId: string, token: string): Promise<ApiResponse<User>> {
    return httpClient.get(`/auth/user/${userId}`);

  }
}