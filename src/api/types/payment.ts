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
  name: string;
  email: string;
  password: string;
  packageId: string;
  businessInfo: {
    businessName: string;
    dateOfBirth: string;
  };
  paymentMethod: 'stripe';
  paymentDetails: {
    paymentId: string;
  };
}

// Step 3: Create Order Response
export interface CreateOrderResponse {
  order: {
    _id: string;
    packageId: string;
    paymentMethod: string;
    paymentStatus: string;
    amount: number;
    currency: string;
    businessInfo?: {
      businessName?: string;
      dateOfBirth?: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

// Business Info for Order Form
export interface BusinessInfoForm {
  businessName: string;
  dateOfBirth: string;
}

// Checkout State
export interface CheckoutState {
  step: 'initialize' | 'payment' | 'complete' | 'error';
  packageId: string | null;
  clientSecret: string | null;
  paymentIntentId: string | null;
  error: string | null;
  loading: boolean;
}
