import { ApiError } from '../types';

// Error types for better error handling
export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// Enhanced error interface
export interface EnhancedError extends ApiError {
  type: ErrorType;
  severity: ErrorSeverity;
  userMessage: string;
  timestamp: Date;
  requestId?: string;
}

// Error handler utility
export class ErrorHandler {
  // Get error type from status code and error message
  private static getErrorType(error: ApiError): ErrorType {
    if (error.statusCode) {
      switch (error.statusCode) {
        case 400:
          return ErrorType.VALIDATION_ERROR;
        case 401:
          return ErrorType.AUTHENTICATION_ERROR;
        case 403:
          return ErrorType.AUTHORIZATION_ERROR;
        case 404:
          return ErrorType.NOT_FOUND_ERROR;
        case 408:
          return ErrorType.TIMEOUT_ERROR;
        case 500:
        case 502:
        case 503:
        case 504:
          return ErrorType.SERVER_ERROR;
        default:
          return ErrorType.UNKNOWN_ERROR;
      }
    }

    if (error.message?.toLowerCase().includes('network')) {
      return ErrorType.NETWORK_ERROR;
    }

    if (error.message?.toLowerCase().includes('timeout')) {
      return ErrorType.TIMEOUT_ERROR;
    }

    return ErrorType.UNKNOWN_ERROR;
  }

  // Get error severity from error type
  private static getErrorSeverity(errorType: ErrorType): ErrorSeverity {
    switch (errorType) {
      case ErrorType.VALIDATION_ERROR:
      case ErrorType.NOT_FOUND_ERROR:
        return ErrorSeverity.LOW;
      case ErrorType.AUTHENTICATION_ERROR:
      case ErrorType.AUTHORIZATION_ERROR:
      case ErrorType.NETWORK_ERROR:
      case ErrorType.TIMEOUT_ERROR:
        return ErrorSeverity.MEDIUM;
      case ErrorType.SERVER_ERROR:
        return ErrorSeverity.HIGH;
      case ErrorType.UNKNOWN_ERROR:
        return ErrorSeverity.MEDIUM;
      default:
        return ErrorSeverity.LOW;
    }
  }

  // Get user-friendly error message
  private static getUserMessage(error: ApiError, errorType: ErrorType): string {
    switch (errorType) {
      case ErrorType.VALIDATION_ERROR:
        return error.message || 'Please check your input and try again.';
      case ErrorType.AUTHENTICATION_ERROR:
        return 'Please log in to continue.';
      case ErrorType.AUTHORIZATION_ERROR:
        return 'You don\'t have permission to perform this action.';
      case ErrorType.NOT_FOUND_ERROR:
        return 'The requested resource was not found.';
      case ErrorType.NETWORK_ERROR:
        return 'Network connection error. Please check your internet connection and try again.';
      case ErrorType.TIMEOUT_ERROR:
        return 'Request timed out. Please try again.';
      case ErrorType.SERVER_ERROR:
        return 'Server error occurred. Please try again later.';
      case ErrorType.UNKNOWN_ERROR:
        return 'An unexpected error occurred. Please try again.';
      default:
        return error.message || 'An error occurred.';
    }
  }

  // Create enhanced error object
  static createEnhancedError(error: ApiError, requestId?: string): EnhancedError {
    const errorType = this.getErrorType(error);
    const severity = this.getErrorSeverity(errorType);
    const userMessage = this.getUserMessage(error, errorType);

    return {
      ...error,
      type: errorType,
      severity,
      userMessage,
      timestamp: new Date(),
      requestId,
    };
  }

  // Check if error is authentication related
  static isAuthError(error: EnhancedError): boolean {
    return error.type === ErrorType.AUTHENTICATION_ERROR || error.type === ErrorType.AUTHORIZATION_ERROR;
  }

  // Check if error is network related
  static isNetworkError(error: EnhancedError): boolean {
    return error.type === ErrorType.NETWORK_ERROR || error.type === ErrorType.TIMEOUT_ERROR;
  }

  // Check if error is server related
  static isServerError(error: EnhancedError): boolean {
    return error.type === ErrorType.SERVER_ERROR;
  }

  // Check if error is client related (validation, not found, etc.)
  static isClientError(error: EnhancedError): boolean {
    return [
      ErrorType.VALIDATION_ERROR,
      ErrorType.NOT_FOUND_ERROR,
      ErrorType.AUTHENTICATION_ERROR,
      ErrorType.AUTHORIZATION_ERROR,
    ].includes(error.type);
  }

  // Log error to console (and potentially to external service)
  static logError(error: EnhancedError, context?: string): void {
    const logData = {
      message: error.message,
      type: error.type,
      severity: error.severity,
      statusCode: error.statusCode,
      code: error.code,
      details: error.details,
      timestamp: error.timestamp,
      requestId: error.requestId,
      context,
    };

    // Log different levels based on severity
    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
      case ErrorSeverity.HIGH:
        console.error('🔴 API Error:', logData);
        break;
      case ErrorSeverity.MEDIUM:
        console.warn('🟡 API Warning:', logData);
        break;
      case ErrorSeverity.LOW:
        console.log('🟢 API Info:', logData);
        break;
    }
  }

  // Handle error and return appropriate response
  static handleError(error: any, context?: string): EnhancedError {
    let apiError: ApiError;

    if (typeof error === 'string') {
      apiError = { message: error };
    } else if (error && typeof error === 'object') {
      apiError = {
        message: error.message || 'An error occurred',
        statusCode: error.statusCode,
        code: error.code,
        details: error.details,
      };
    } else {
      apiError = { message: 'An unknown error occurred' };
    }

    const enhancedError = this.createEnhancedError(apiError);
    this.logError(enhancedError, context);

    return enhancedError;
  }
}