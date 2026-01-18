import { httpClient } from '../utils/httpClient';
import { ApiResponse } from '../types';
import { Package } from '../types/pricing';
import { API_HOST } from '../config/host';

// Pricing service for packages
export class PricingService {
  private static baseURL = API_HOST;

  // Get available packages
  static async getPackages(): Promise<ApiResponse<Package[]>> {
    const response = await fetch(`${this.baseURL}/packages`);

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch packages: ${response.statusText}`,
        statusCode: response.status,
      };
    }

    try {
      const data = await response.json();
      return {
        success: true,
        data: data.data || data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to parse response',
        statusCode: response.status,
      };
    }
  }
}