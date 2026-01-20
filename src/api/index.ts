// API services exports
export { AuthService } from './services/authService';
export { PricingService } from './services/pricingService';
export { EmailService } from './services/emailService';

// HTTP client and utilities
export { httpClient, HttpClient } from './utils/httpClient';
export { ErrorHandler, ErrorType, ErrorSeverity } from './utils/errorHandler';

// Type exports
export type {
  ApiResponse,
  ApiError,
  RequestConfig,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
} from './types';

export type { Package } from './types/pricing';
export type { SendEmailRequest, SendEmailResponse } from './types/email';