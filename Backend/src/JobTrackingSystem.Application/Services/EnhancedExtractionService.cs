namespace JobTrackingSystem.Application.Services;

using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;

public interface IEnhancedExtractionService
{
    ExtractedData ExtractAllData(string message);
}

public class ExtractedData
{
    public string Title { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public List<string> Keywords { get; set; } = new();
    public string ApplicationChannel { get; set; } = "Manual"; // WhatsApp, Email, Manual
}

public class EnhancedExtractionService : IEnhancedExtractionService
{
    private readonly ILogger<EnhancedExtractionService> _logger;

    // Regex patterns
    private static readonly string PhonePattern = @"\+?[1-9]\d{1,14}";
    private static readonly string EmailPattern = @"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}";
    private static readonly string[] TechKeywords = new[]
    {
        ".net", "asp", "c#", "java", "python", "javascript", "typescript",
        "react", "angular", "vue", "node", "express", "django", "flask",
        "sql", "mongodb", "postgresql", "mysql", "docker", "kubernetes",
        "aws", "azure", "gcp", "devops", "ci/cd", "git", "agile"
    };

    public EnhancedExtractionService(ILogger<EnhancedExtractionService> logger)
    {
        _logger = logger;
    }

    public ExtractedData ExtractAllData(string message)
    {
        _logger.LogInformation("Starting enhanced data extraction");

        var data = new ExtractedData
        {
            Title = ExtractTitle(message),
            PhoneNumber = ExtractPhoneNumber(message),
            Email = ExtractEmail(message),
            Keywords = ExtractKeywords(message)
        };

        // Determine application channel
        data.ApplicationChannel = DetermineApplicationChannel(data);

        _logger.LogInformation(
            "Extraction complete - Title: {Title}, Phone: {Phone}, Email: {Email}, Channel: {Channel}",
            data.Title, data.PhoneNumber, data.Email, data.ApplicationChannel);

        return data;
    }

    private string ExtractTitle(string message)
    {
        var lines = message.Split(new[] { "\n", "\r\n" }, StringSplitOptions.RemoveEmptyEntries);
        var title = lines.FirstOrDefault()?.Trim() ?? "Job Opportunity";

        // Clean up common prefixes
        title = Regex.Replace(title, @"^(Hiring|Looking for|Seeking|Need|Required):\s*", "", RegexOptions.IgnoreCase);
        title = Regex.Replace(title, @"^(Job|Position|Role):\s*", "", RegexOptions.IgnoreCase);

        return title.Length > 500 ? title.Substring(0, 500) : title;
    }

    private string ExtractPhoneNumber(string message)
    {
        var match = Regex.Match(message, PhonePattern);
        if (match.Success)
        {
            var phone = match.Value;
            _logger.LogInformation("Phone number extracted: {Phone}", phone);
            return phone;
        }

        _logger.LogWarning("No phone number found in message");
        return string.Empty;
    }

    private string ExtractEmail(string message)
    {
        var match = Regex.Match(message, EmailPattern);
        if (match.Success)
        {
            var email = match.Value;
            _logger.LogInformation("Email extracted: {Email}", email);
            return email;
        }

        _logger.LogWarning("No email found in message");
        return string.Empty;
    }

    private List<string> ExtractKeywords(string message)
    {
        var lowerMessage = message.ToLower();
        var foundKeywords = new List<string>();

        foreach (var keyword in TechKeywords)
        {
            if (lowerMessage.Contains(keyword))
            {
                foundKeywords.Add(keyword);
            }
        }

        _logger.LogInformation("Found {KeywordCount} keywords", foundKeywords.Count);
        return foundKeywords;
    }

    private string DetermineApplicationChannel(ExtractedData data)
    {
        // Priority: Phone > Email > Manual
        if (!string.IsNullOrEmpty(data.PhoneNumber))
        {
            _logger.LogInformation("Channel determined: WhatsApp (phone available)");
            return "WhatsApp";
        }

        if (!string.IsNullOrEmpty(data.Email))
        {
            _logger.LogInformation("Channel determined: Email (email available)");
            return "Email";
        }

        _logger.LogInformation("Channel determined: Manual (no contact info)");
        return "Manual";
    }
}
