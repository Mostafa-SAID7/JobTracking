namespace JobTrackingSystem.Application.Services;

using Microsoft.Extensions.Logging;
using System.Net;
using System.Net.Mail;

public interface IEmailService
{
    Task<EmailResult> SendApplicationEmailAsync(EmailRequest request);
    Task<EmailResult> SendEmailWithAttachmentAsync(EmailRequest request, string attachmentPath);
}

public class EmailRequest
{
    public string RecipientEmail { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public bool IsHtml { get; set; } = true;
}

public class EmailResult
{
    public bool Success { get; set; }
    public string? MessageId { get; set; }
    public string? ErrorMessage { get; set; }
    public DateTime SentAt { get; set; }
}

public class SmtpEmailService : IEmailService
{
    private readonly ILogger<SmtpEmailService> _logger;
    private readonly string _smtpServer;
    private readonly int _smtpPort;
    private readonly string _fromEmail;
    private readonly string _fromName;
    private readonly string _password;
    private readonly bool _enableSsl;

    public SmtpEmailService(
        ILogger<SmtpEmailService> logger,
        string smtpServer,
        int smtpPort,
        string fromEmail,
        string fromName,
        string password,
        bool enableSsl = true)
    {
        _logger = logger;
        _smtpServer = smtpServer;
        _smtpPort = smtpPort;
        _fromEmail = fromEmail;
        _fromName = fromName;
        _password = password;
        _enableSsl = enableSsl;
    }

    public async Task<EmailResult> SendApplicationEmailAsync(EmailRequest request)
    {
        try
        {
            _logger.LogInformation("Sending email to {RecipientEmail}", request.RecipientEmail);

            using (var client = new SmtpClient(_smtpServer, _smtpPort))
            {
                client.EnableSsl = _enableSsl;
                client.Credentials = new NetworkCredential(_fromEmail, _password);
                client.Timeout = 10000;

                using (var message = new MailMessage(_fromEmail, request.RecipientEmail))
                {
                    message.From = new MailAddress(_fromEmail, _fromName);
                    message.Subject = request.Subject;
                    message.Body = request.Body;
                    message.IsBodyHtml = request.IsHtml;

                    await client.SendMailAsync(message);

                    _logger.LogInformation("Email sent successfully to {RecipientEmail}", request.RecipientEmail);

                    return new EmailResult
                    {
                        Success = true,
                        MessageId = Guid.NewGuid().ToString(),
                        SentAt = DateTime.UtcNow
                    };
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending email to {RecipientEmail}", request.RecipientEmail);
            return new EmailResult
            {
                Success = false,
                ErrorMessage = ex.Message,
                SentAt = DateTime.UtcNow
            };
        }
    }

    public async Task<EmailResult> SendEmailWithAttachmentAsync(EmailRequest request, string attachmentPath)
    {
        try
        {
            _logger.LogInformation("Sending email with attachment to {RecipientEmail}", request.RecipientEmail);

            if (!File.Exists(attachmentPath))
            {
                _logger.LogWarning("Attachment file not found: {AttachmentPath}", attachmentPath);
                return new EmailResult
                {
                    Success = false,
                    ErrorMessage = "Attachment file not found",
                    SentAt = DateTime.UtcNow
                };
            }

            using (var client = new SmtpClient(_smtpServer, _smtpPort))
            {
                client.EnableSsl = _enableSsl;
                client.Credentials = new NetworkCredential(_fromEmail, _password);
                client.Timeout = 10000;

                using (var message = new MailMessage(_fromEmail, request.RecipientEmail))
                {
                    message.From = new MailAddress(_fromEmail, _fromName);
                    message.Subject = request.Subject;
                    message.Body = request.Body;
                    message.IsBodyHtml = request.IsHtml;

                    var attachment = new Attachment(attachmentPath);
                    message.Attachments.Add(attachment);

                    await client.SendMailAsync(message);

                    _logger.LogInformation("Email with attachment sent successfully to {RecipientEmail}", request.RecipientEmail);

                    return new EmailResult
                    {
                        Success = true,
                        MessageId = Guid.NewGuid().ToString(),
                        SentAt = DateTime.UtcNow
                    };
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending email with attachment to {RecipientEmail}", request.RecipientEmail);
            return new EmailResult
            {
                Success = false,
                ErrorMessage = ex.Message,
                SentAt = DateTime.UtcNow
            };
        }
    }
}

public class MockEmailService : IEmailService
{
    private readonly ILogger<MockEmailService> _logger;

    public MockEmailService(ILogger<MockEmailService> logger)
    {
        _logger = logger;
    }

    public async Task<EmailResult> SendApplicationEmailAsync(EmailRequest request)
    {
        _logger.LogInformation("Mock Email: Sending to {RecipientEmail}", request.RecipientEmail);
        await Task.Delay(500); // Simulate sending

        return new EmailResult
        {
            Success = true,
            MessageId = Guid.NewGuid().ToString(),
            SentAt = DateTime.UtcNow
        };
    }

    public async Task<EmailResult> SendEmailWithAttachmentAsync(EmailRequest request, string attachmentPath)
    {
        _logger.LogInformation("Mock Email: Sending to {RecipientEmail} with attachment {AttachmentPath}", 
            request.RecipientEmail, attachmentPath);
        await Task.Delay(500); // Simulate sending

        return new EmailResult
        {
            Success = true,
            MessageId = Guid.NewGuid().ToString(),
            SentAt = DateTime.UtcNow
        };
    }
}
