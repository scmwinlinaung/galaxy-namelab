import { httpClient } from '../utils/httpClient';
import { ApiResponse, SendEmailRequest, SendEmailResponse } from '../types';

// Email service
export class EmailService {
  // Send email
  static async sendEmail(data: SendEmailRequest): Promise<ApiResponse<SendEmailResponse>> {
    return httpClient.post<SendEmailResponse>('/email/send', data);
  }
}
