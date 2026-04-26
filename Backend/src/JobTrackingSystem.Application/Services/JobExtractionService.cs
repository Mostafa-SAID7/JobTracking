namespace JobTrackingSystem.Application.Services;

using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;

public interface IJobExtractionService
{
    (string title, string phoneNumber) ExtractJobData(string jobMessage);
}

public class JobExtractionService : IJobExtractionService
{
    private readonly ILogger<JobExtractionService> _logger;

    public JobExtractionService(ILogger<JobExtractionService> logger)
    {
        _logger = logger;
    }

    public (string title, string phoneNumber) ExtractJobData(string jobMessage)
    {
        var title = ExtractJobTitle(jobMessage);
        var phoneNumber = ExtractPhoneNumber(jobMessage);

        _logger.LogInformation("Extracted title: {Title}, phone: {Phone}", title, phoneNumber);
        return (title, phoneNumber);
    }

    private string ExtractJobTitle(string message)
    {
        var lines = message.Split(new[] { "\n", "\r\n" }, StringSplitOptions.RemoveEmptyEntries);
        return lines.FirstOrDefault()?.Trim() ?? "Job Opportunity";
    }

    private string ExtractPhoneNumber(string message)
    {
        var phonePattern = @"\+?[1-9]\d{1,14}";
        var match = Regex.Match(message, phonePattern);
        return match.Success ? match.Value : string.Empty;
    }
}
