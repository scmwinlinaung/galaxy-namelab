// API Type Definitions
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  code?: string;
  details?: any;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

// Naming Service Types (examples for name-lab functionality)
export interface NameGenerationRequest {
  type: 'business' | 'brand' | 'product' | 'domain';
  industry?: string;
  keywords: string[];
  preferences?: {
    style?: 'modern' | 'classic' | 'creative' | 'professional';
    length?: 'short' | 'medium' | 'long';
    language?: string;
  };
}

export interface NameSuggestion {
  name: string;
  available?: boolean;
  domainAvailable?: boolean;
  score?: number;
  reasoning?: string;
}

export interface NameGenerationResponse {
  suggestions: NameSuggestion[];
  totalCount: number;
  requestId: string;
}

// API Request Configuration
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}