// Payment Type Definitions

// Step 1: Initialize Payment Request
export interface CreateStripeIntentRequest {
  packageId: string;
}

// Step 1: Initialize Payment Response
export interface CreateStripeIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  packageId: string;
}

// Step 3: Create Order Request
export interface CreateOrderRequest {
  name?: string;
  email?: string;
  password?: string;
  packageId: string;
  businessInfo: {
    fullName: string;
    dob: string;
    birthTime: string;
    birthPlace: string;
    details: string;
    preferredSyllables: number[];
  };
  paymentMethod: 'stripe';
  paymentDetails: {
    paymentIntentId: string;
  };
}

// Step 3: Create Order Response
export interface CreateOrderResponse {
  order: {
    id: string;
    user: string;
    package: string;
    businessInfo: {
      fullName: string;
      dob: string;
      birthTime: string;
      birthPlace: string;
      details: string;
      preferredSyllables: number[];
    };
    status: string;
    payment: {
      paymentId: string;
      gateway: string;
      status: string;
    };
    pdfPath?: string;
    createdAt: string;
  };
  message: string;
}

// Business Info for Order Form
export interface BusinessInfoForm {
  fullName: string;
  dob: string;
  birthTime: string;
  birthPlace: string;
  details: string;
  preferredSyllables: number[];
}

// Order Type: 'business' for Business Name, 'nickname' for Personal Name
export type OrderType = 'BUSINESS' | 'PERSONAL';

// Checkout State
export interface CheckoutState {
  step: 'initialize' | 'payment' | 'complete' | 'error';
  packageId: string | null;
  clientSecret: string | null;
  paymentIntentId: string | null;
  error: string | null;
  loading: boolean;
}
