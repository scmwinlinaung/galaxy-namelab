import { httpClient } from '../utils/httpClient';

export class VisitorService {
  /**
   * Record a visit
   * POST /visitors/record
   */
  static async recordVisit(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await httpClient.post('/visitors/record');
      return { success: response.success, error: response.error };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get visitor count
   * GET /visitors/count
   */
  static async getVisitorCount(): Promise<{ success: boolean; data?: number; error?: string }> {
    try {
      const response = await httpClient.get<{ count: number }>('/visitors/count');
      if (response.success && response.data) {
        return { success: true, data: response.data.count };
      }
      return { success: false, error: response.error };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
