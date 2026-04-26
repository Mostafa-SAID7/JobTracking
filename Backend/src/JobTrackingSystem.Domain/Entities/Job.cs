namespace JobTrackingSystem.Domain.Entities;

public class Job
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string SourceMessage { get; set; } = string.Empty;
    public string? ImagePath { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? GeneratedMessage { get; set; }
    public string ApplicationChannel { get; set; } = "Manual"; // WhatsApp, Email, Manual
    public DateTime? EmailSentAt { get; set; }
    public string? EmailStatus { get; set; }
    public int? TemplateId { get; set; }
    public Template? Template { get; set; }
}
