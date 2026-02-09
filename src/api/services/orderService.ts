import { httpClient } from '../utils/httpClient';
import { Order, MyOrdersResponse, Submission, OrderSubmissionsResponse } from '../types/order';

// Order service for managing user orders
export class OrderService {

  /**
   * Get logged in user's orders
   * GET /orders/myorders
   */
  static async getMyOrders(): Promise<{ success: boolean; data?: Order[]; error?: string }> {
    try {
      const response = await httpClient.get<Order[]>(`/orders/myorders`);

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data,
        };
      }

      return {
        success: false,
        error: response.error || 'Failed to fetch orders',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch orders',
      };
    }
  }

  /**
   * Download the final report PDF for a confirmed order
   * GET /orders/{orderId}/download
   */
  static async downloadOrderPdf(
    orderId: string
  ): Promise<{ success: boolean; blob?: Blob; error?: string }> {
    try {
      const response = await httpClient.getBlob<Blob>(
        `/orders/${orderId}/download`
      );

      if (response.success && response.data) {
        return {
          success: true,
          blob: response.data as Blob,
        };
      }

      // Handle specific error cases
      if (response.statusCode === 401) {
        return {
          success: false,
          error: 'Not authorized. Please login.',
        };
      }
      if (response.statusCode === 403) {
        return {
          success: false,
          error: 'Order not confirmed yet. PDF will be available once the order is confirmed.',
        };
      }
      if (response.statusCode === 404) {
        return {
          success: false,
          error: 'Order or PDF not found.',
        };
      }

      return {
        success: false,
        error: response.error || 'Failed to download PDF',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to download PDF',
      };
    }
  }

  /**
   * Helper method to trigger PDF download in browser
   */
  static downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  /**
   * Upload a PDF submission for an order
   * POST /submissions/{orderId}
   */
  static async uploadSubmission(
    orderId: string,
    file: File
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      console.log('uploadSubmission called with:', { orderId, fileName: file.name, fileSize: file.size });
      const response = await httpClient.upload<any>(
        `/submissions/${orderId}`,
        file
      );
      console.log('uploadSubmission response:', response);

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data,
        };
      }

      // Handle specific error cases
      if (response.statusCode === 401) {
        return {
          success: false,
          error: 'Not authorized. Please login.',
        };
      }
      if (response.statusCode === 404) {
        return {
          success: false,
          error: 'Order not found.',
        };
      }

      return {
        success: false,
        error: response.error || 'Failed to upload submission',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to upload submission',
      };
    }
  }

  /**
   * Get submissions for a specific order
   * GET /submissions/order/{orderId}
   */
  static async getOrderSubmissions(
    orderId: string
  ): Promise<{ success: boolean; data?: Submission[]; error?: string }> {
    try {
      const response = await httpClient.get<Submission[]>(
        `/submissions/order/${orderId}`
      );

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data,
        };
      }

      return {
        success: false,
        error: response.error || 'Failed to fetch submissions',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch submissions',
      };
    }
  }

  /**
   * Update submission status and admin response (Admin)
   * PUT /submissions/{id}
   */
  static async updateSubmission(
    submissionId: string,
    status: string,
    adminComment?: string,
    file?: File
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const additionalData: Record<string, string> = {
        status,
      };

      if (adminComment) {
        additionalData.adminComment = adminComment;
      }

      const response = await httpClient.uploadWithPut<any>(
        `/submissions/${submissionId}`,
        file,
        additionalData
      );

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data,
        };
      }

      // Handle specific error cases
      if (response.statusCode === 401) {
        return {
          success: false,
          error: 'Not authorized. Please login.',
        };
      }
      if (response.statusCode === 404) {
        return {
          success: false,
          error: 'Submission not found.',
        };
      }

      return {
        success: false,
        error: response.error || 'Failed to update submission',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to update submission',
      };
    }
  }

  /**
   * Replace submission file (User)
   * POST /submissions/{orderId} (creates new submission)
   */
  static async replaceSubmissionFile(
    orderId: string,
    file: File
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    return this.uploadSubmission(orderId, file);
  }

  /**
   * Download admin response PDF for a submission
   * GET /submissions/{submissionId}/download-admin
   */
  static async downloadAdminResponsePdf(
    submissionId: string
  ): Promise<{ success: boolean; blob?: Blob; error?: string }> {
    try {
      const response = await httpClient.getBlob<Blob>(
        `/submissions/${submissionId}/download-admin`
      );

      if (response.success && response.data) {
        return {
          success: true,
          blob: response.data as Blob,
        };
      }

      // Handle specific error cases
      if (response.statusCode === 401) {
        return {
          success: false,
          error: 'Not authorized. Please login.',
        };
      }
      if (response.statusCode === 404) {
        return {
          success: false,
          error: 'Admin response file not found.',
        };
      }

      return {
        success: false,
        error: response.error || 'Failed to download admin response',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to download admin response',
      };
    }
  }
}
