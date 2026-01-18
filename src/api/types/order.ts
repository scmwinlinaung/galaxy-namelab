// Order Type Definitions

// Business Info
export interface BusinessInfo {
  businessName: string;
  dateOfBirth: string;
}

// Payment Info
export interface PaymentInfo {
  paymentId: string;
  gateway: string;
  status: string;
}

// Order Status
export type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

// Package Info
export interface PackageInfo {
  _id: string;
  plan: {
    name: string;
  };
  price: {
    amount: number;
  };
}

// Order Model
export interface Order {
  _id: string;
  user: string;
  package: PackageInfo;
  businessInfo: BusinessInfo;
  status: OrderStatus;
  payment: PaymentInfo;
  pdfPath?: string | null;
  createdAt: string;
}

// Get My Orders Response
export interface MyOrdersResponse {
  orders: Order[];
}

// Download PDF Response (Blob)
export type DownloadPdfResponse = Blob;
