namespace JobTrackingSystem.Application.Services;

using JobTrackingSystem.Domain.Entities;
using Microsoft.Extensions.Logging;

public interface IMessageGenerationService
{
    string GenerateMessage(Job job, Template template);
    string GenerateWhatsAppLink(string phoneNumber, string message);
}

public class MessageGenerationService : IMessageGenerationService
{
    private readonly ILogger<MessageGenerationService> _logger;

    public MessageGenerationService(ILogger<MessageGenerationService> logger)
    {
        _logger = logger;
    }

    public string GenerateMessage(Job job, Template template)
    {
        var message = template.MessageTemplate
            .Replace("{JobTitle}", job.Title)
            .Replace("{Category}", job.Category)
            .Replace("{Github}", template.GithubUrl)
            .Replace("{Portfolio}", template.PortfolioUrl)
            .Replace("{Email}", template.Email);

        _logger.LogInformation("Generated message for job {JobId}", job.Id);
        return message;
    }

    public string GenerateWhatsAppLink(string phoneNumber, string message)
    {
        var encodedMessage = Uri.EscapeDataString(message);
        var link = $"https://wa.me/{phoneNumber}?text={encodedMessage}";

        _logger.LogInformation("Generated WhatsApp link for phone {Phone}", phoneNumber);
        return link;
    }
}
