// Email types
export interface SendEmailRequest {
  to: string;
  subject: string;
  body: string;
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
}
