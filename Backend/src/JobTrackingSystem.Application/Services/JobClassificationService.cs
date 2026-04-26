namespace JobTrackingSystem.Application.Services;

using Microsoft.Extensions.Logging;

public interface IJobClassificationService
{
    string ClassifyJob(string jobMessage);
}

public class JobClassificationService : IJobClassificationService
{
    private readonly ILogger<JobClassificationService> _logger;

    private static readonly Dictionary<string, string[]> CategoryKeywords = new()
    {
        { "Backend", new[] { ".net", "asp", "c#", "web api", "dotnet", "asp.net" } },
        { "Frontend", new[] { "angular", "react", "frontend", "vue", "typescript", "javascript" } },
        { "Fullstack", new[] { "fullstack", "full stack", "full-stack" } }
    };

    public JobClassificationService(ILogger<JobClassificationService> logger)
    {
        _logger = logger;
    }

    public string ClassifyJob(string jobMessage)
    {
        var lowerMessage = jobMessage.ToLower();

        foreach (var (category, keywords) in CategoryKeywords)
        {
            if (keywords.Any(keyword => lowerMessage.Contains(keyword)))
            {
                _logger.LogInformation("Job classified as {Category}", category);
                return category;
            }
        }

        _logger.LogWarning("Job could not be classified, defaulting to Backend");
        return "Backend";
    }
}
