using JobTrackingSystem.Application.DTOs;
using JobTrackingSystem.Domain.Entities;
using JobTrackingSystem.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace JobTrackingSystem.Application.Services;

public interface IWhatsAppService
{
    Task<bool> ProcessIncomingMessageAsync(WhatsAppMessageDto message);
    Task<bool> SendMessageAsync(string phoneNumber, string message);
}

public class WhatsAppService : IWhatsAppService
{
    private readonly IJobRepository _jobRepository;
    private readonly IConfiguration _configuration;
    private readonly ILogger<WhatsAppService> _logger;
    private readonly HttpClient _httpClient;

    public WhatsAppService(
        IJobRepository jobRepository,
        IConfiguration configuration,
        ILogger<WhatsAppService> logger,
        HttpClient httpClient)
    {
        _jobRepository = jobRepository;
        _configuration = configuration;
        _logger = logger;
        _httpClient = httpClient;
    }

    public async Task<bool> ProcessIncomingMessageAsync(WhatsAppMessageDto message)
    {
        try
        {
            _logger.LogInformation("Processing WhatsApp message from {From}: {Content}", message.From, message.TextContent);

            if (string.IsNullOrEmpty(message.TextContent))
            {
                _logger.LogWarning("Empty message content");
                return false;
            }

            // Parse job details from message
            var jobDetails = ParseJobDetails(message.TextContent);

            // Create job record
            var job = new Job
            {
                Title = jobDetails["title"] ?? "Job from WhatsApp",
                Description = message.TextContent,
                Category = jobDetails.ContainsKey("category") ? jobDetails["category"] : "General",
                PhoneNumber = jobDetails.ContainsKey("phone") ? jobDetails["phone"] : message.From,
                Email = jobDetails.ContainsKey("email") ? jobDetails["email"] : string.Empty,
                SourceMessage = message.TextContent,
                ApplicationChannel = "WhatsApp",
                CreatedAt = message.ReceivedAt
            };

            await _jobRepository.AddAsync(job);
            _logger.LogInformation("Job created from WhatsApp message: {JobId}", job.Id);

            // Send confirmation message
            await SendMessageAsync(message.From, "✓ Job received and saved successfully!");

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing WhatsApp message");
            return false;
        }
    }

    public async Task<bool> SendMessageAsync(string phoneNumber, string message)
    {
        try
        {
            var accessToken = _configuration["WhatsApp:AccessToken"];
            var phoneNumberId = _configuration["WhatsApp:PhoneNumberId"];

            if (string.IsNullOrEmpty(accessToken) || string.IsNullOrEmpty(phoneNumberId))
            {
                _logger.LogWarning("WhatsApp credentials not configured");
                return false;
            }

            var url = $"https://graph.instagram.com/v18.0/{phoneNumberId}/messages";

            var payload = new
            {
                messaging_product = "whatsapp",
                to = phoneNumber,
                type = "text",
                text = new { body = message }
            };

            var content = new StringContent(
                JsonSerializer.Serialize(payload),
                System.Text.Encoding.UTF8,
                "application/json");

            var request = new HttpRequestMessage(HttpMethod.Post, url)
            {
                Content = content
            };
            request.Headers.Add("Authorization", $"Bearer {accessToken}");

            var response = await _httpClient.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Message sent successfully to {PhoneNumber}", phoneNumber);
                return true;
            }

            _logger.LogWarning("Failed to send message: {StatusCode}", response.StatusCode);
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending WhatsApp message");
            return false;
        }
    }

    private Dictionary<string, string> ParseJobDetails(string messageText)
    {
        var details = new Dictionary<string, string>();

        try
        {
            // Simple parsing - look for common patterns
            // This is a basic implementation - enhance based on your message format

            var lines = messageText.Split(new[] { "\n", "\r\n" }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var line in lines)
            {
                var lowerLine = line.ToLower();

                if (lowerLine.Contains("title:") || lowerLine.Contains("job:") || lowerLine.Contains("position:"))
                {
                    details["title"] = line.Split(':', 2).LastOrDefault()?.Trim() ?? "Job Offer";
                }
                else if (lowerLine.Contains("category:") || lowerLine.Contains("field:"))
                {
                    details["category"] = line.Split(':', 2).LastOrDefault()?.Trim() ?? "General";
                }
                else if (lowerLine.Contains("phone:") || lowerLine.Contains("contact:"))
                {
                    details["phone"] = line.Split(':', 2).LastOrDefault()?.Trim() ?? string.Empty;
                }
                else if (lowerLine.Contains("email:"))
                {
                    details["email"] = line.Split(':', 2).LastOrDefault()?.Trim() ?? string.Empty;
                }
            }

            // If no title found, use first line
            if (!details.ContainsKey("title") && lines.Length > 0)
            {
                details["title"] = lines[0].Substring(0, Math.Min(100, lines[0].Length));
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error parsing job details from message");
        }

        return details;
    }
}
