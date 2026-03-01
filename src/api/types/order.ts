// Order Type Definitions

// Business Info
export interface BusinessInfo {
  fullName: string;
  dob: string;
  birthTime: string;
  birthPlace: string;
  details: string;
  preferredSyllables: []
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

// Submission Status
export type SubmissionStatus = 'pending' | 'reviewed' | 'approved' | 'rejected';

// User Info (simplified)
export interface UserInfo {
  _id: string;
  name: string;
  email: string;
}

// Submission Model
export interface Submission {
  _id: string;
  adminComment?: string;
  adminPdfPath?: string;
  createdAt: string;
  filePath: string;
  originalName: string;
  status: SubmissionStatus;
  user: string | UserInfo;
  order: Order;
}

// Get Submissions for Order Response
export interface OrderSubmissionsResponse {
  submissions: Submission[];
}
