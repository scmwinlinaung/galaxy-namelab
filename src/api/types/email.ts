// Email types
export interface SendEmailRequest {
  to: string;
  subject: string;
  text: string;
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
}
