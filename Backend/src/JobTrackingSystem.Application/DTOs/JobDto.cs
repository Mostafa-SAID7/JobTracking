namespace JobTrackingSystem.Application.DTOs;

using Microsoft.AspNetCore.Http;

public class JobDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string SourceMessage { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public string? GeneratedMessage { get; set; }
    public string ApplicationChannel { get; set; } = string.Empty;
    public int? TemplateId { get; set; }
}

public class CreateJobDto
{
    public string? Text { get; set; }
    public IFormFile? Image { get; set; }
    public string? ManualEmail { get; set; }
}

public class JobResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string ApplicationChannel { get; set; } = string.Empty;
    public string GeneratedMessage { get; set; } = string.Empty;
    public string EmailSubject { get; set; } = string.Empty;
    public string EmailBody { get; set; } = string.Empty;
    public string WhatsAppLink { get; set; } = string.Empty;
    public string CvPath { get; set; } = string.Empty;
}

public class OcrPreviewDto
{
    public string ExtractedText { get; set; } = string.Empty;
    public decimal Confidence { get; set; }
    public bool Success { get; set; }
    public string? ErrorMessage { get; set; }
}

public class SendEmailDto
{
    public string RecipientEmail { get; set; } = string.Empty;
    public bool Preview { get; set; } = false;
}
