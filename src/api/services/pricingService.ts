import { httpClient } from '../utils/httpClient';
import { ApiResponse } from '../types';
import { Package } from '../types/pricing';

// Pricing service for packages
export class PricingService {

  /**
   * Get available packages
   * GET /packages
   */
  static async getPackages(): Promise<ApiResponse<Package[]>> {
    try {
      const response = await httpClient.get<Package[]>('/packages');

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data,
          statusCode: response.statusCode,
        };
      }

      return {
        success: false,
        error: response.error || 'Failed to fetch packages',
        statusCode: response.statusCode,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch packages',
      };
    }
  }
}