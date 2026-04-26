/**
 * Job Response Model
 * Represents a complete job response from the API
 */
export interface JobResponse {
  id: number;
  title: string;
  category: string;
  phoneNumber: string;
  email: string;
  applicationChannel: string;
  generatedMessage: string;
  emailSubject: string;
  emailBody: string;
  whatsAppLink: string;
  cvPath: string;
  createdAt: Date;
}

/**
 * Job DTO Model
 * Data Transfer Object for job listing and retrieval
 */
export interface JobDto {
  id: number;
  title: string;
  description: string;
  category: string;
  phoneNumber: string;
  email: string;
  sourceMessage: string;
  createdAt: Date;
  generatedMessage?: string;
  applicationChannel: string;
  templateId?: number;
}

/**
 * OCR Preview DTO
 * Response from OCR preview endpoint
 */
export interface OcrPreviewDto {
  extractedText: string;
  confidence: number;
  success: boolean;
  errorMessage?: string;
}

/**
 * Send Email Request
 * Payload for sending email endpoint
 */
export interface SendEmailRequest {
  recipientEmail: string;
  preview: boolean;
}
