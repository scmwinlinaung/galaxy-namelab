import { httpClient } from '../utils/httpClient';
import { Order, MyOrdersResponse } from '../types/order';

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
}
