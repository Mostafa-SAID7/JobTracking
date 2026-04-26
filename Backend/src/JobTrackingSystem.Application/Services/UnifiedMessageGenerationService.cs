namespace JobTrackingSystem.Application.Services;

using JobTrackingSystem.Domain.Entities;
using Microsoft.Extensions.Logging;

public interface IUnifiedMessageGenerationService
{
    UnifiedApplicationMessage GenerateApplicationMessages(Job job, Template template);
}

public class UnifiedApplicationMessage
{
    public string WhatsAppMessage { get; set; } = string.Empty;
    public string EmailSubject { get; set; } = string.Empty;
    public string EmailBody { get; set; } = string.Empty;
    public string CvPath { get; set; } = string.Empty;
    public string WhatsAppLink { get; set; } = string.Empty;
}

public class UnifiedMessageGenerationService : IUnifiedMessageGenerationService
{
    private readonly ILogger<UnifiedMessageGenerationService> _logger;

    public UnifiedMessageGenerationService(ILogger<UnifiedMessageGenerationService> logger)
    {
        _logger = logger;
    }

    public UnifiedApplicationMessage GenerateApplicationMessages(Job job, Template template)
    {
        _logger.LogInformation("Generating unified messages for job {JobId}", job.Id);

        var message = new UnifiedApplicationMessage
        {
            CvPath = template.CvPath,
            WhatsAppMessage = GenerateWhatsAppMessage(job, template),
            EmailSubject = GenerateEmailSubject(job, template),
            EmailBody = GenerateEmailBody(job, template),
            WhatsAppLink = GenerateWhatsAppLink(job.PhoneNumber, GenerateWhatsAppMessage(job, template))
        };

        _logger.LogInformation("Unified messages generated for job {JobId}", job.Id);
        return message;
    }

    private string GenerateWhatsAppMessage(Job job, Template template)
    {
        var message = template.MessageTemplate
            .Replace("{JobTitle}", job.Title)
            .Replace("{Category}", job.Category)
            .Replace("{Github}", template.GithubUrl)
            .Replace("{Portfolio}", template.PortfolioUrl)
            .Replace("{Email}", template.Email);

        _logger.LogInformation("WhatsApp message generated for job {JobId}", job.Id);
        return message;
    }

    private string GenerateEmailSubject(Job job, Template template)
    {
        var subject = template.EmailSubjectTemplate ?? $"Application for {job.Title}";
        
        subject = subject
            .Replace("{JobTitle}", job.Title)
            .Replace("{Category}", job.Category);

        _logger.LogInformation("Email subject generated for job {JobId}", job.Id);
        return subject;
    }

    private string GenerateEmailBody(Job job, Template template)
    {
        var body = template.EmailBodyTemplate ?? template.MessageTemplate;
        
        body = body
            .Replace("{JobTitle}", job.Title)
            .Replace("{Category}", job.Category)
            .Replace("{Github}", template.GithubUrl)
            .Replace("{Portfolio}", template.PortfolioUrl)
            .Replace("{Email}", template.Email);

        // Add professional email formatting
        body = FormatEmailBody(body);

        _logger.LogInformation("Email body generated for job {JobId}", job.Id);
        return body;
    }

    private string GenerateWhatsAppLink(string phoneNumber, string message)
    {
        if (string.IsNullOrEmpty(phoneNumber))
            return string.Empty;

        var encodedMessage = Uri.EscapeDataString(message);
        var link = $"https://wa.me/{phoneNumber}?text={encodedMessage}";

        _logger.LogInformation("WhatsApp link generated for phone {Phone}", phoneNumber);
        return link;
    }

    private string FormatEmailBody(string body)
    {
        // Add professional email formatting
        var formatted = $@"
Dear Hiring Manager,

{body}

Best regards,
Your Name

---
This is an automated application. Please do not reply to this email.
";
        return formatted;
    }
}
