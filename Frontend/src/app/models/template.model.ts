/**
 * Template DTO Model
 * Represents a complete template from the API
 */
export interface TemplateDto {
  id: number;
  category: string;
  messageTemplate: string;
  emailSubjectTemplate: string;
  emailBodyTemplate: string;
  cvPath: string;
  githubUrl: string;
  portfolioUrl: string;
  email: string;
}

/**
 * Create Template DTO
 * Payload for creating or updating a template
 */
export interface CreateTemplateDto {
  category: string;
  messageTemplate: string;
  emailSubjectTemplate?: string;
  emailBodyTemplate?: string;
  cvPath: string;
  githubUrl: string;
  portfolioUrl: string;
  email: string;
}
