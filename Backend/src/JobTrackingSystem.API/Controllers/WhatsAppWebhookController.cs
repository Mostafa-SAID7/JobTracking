using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace JobTrackingSystem.API.Controllers;

[ApiController]
[Route("api/v2/[controller]")]
public class WhatsAppWebhookController : ControllerBase
{
    private readonly ILogger<WhatsAppWebhookController> _logger;
    private readonly IConfiguration _configuration;

    public WhatsAppWebhookController(ILogger<WhatsAppWebhookController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    /// <summary>
    /// Webhook endpoint for WhatsApp messages
    /// GET request for verification
    /// </summary>
    [HttpGet]
    public IActionResult VerifyWebhook(
        [FromQuery(Name = "hub.mode")] string mode,
        [FromQuery(Name = "hub.challenge")] string challenge,
        [FromQuery(Name = "hub.verify_token")] string verifyToken)
    {
        try
        {
            var configuredToken = _configuration["WhatsApp:VerifyToken"];
            
            if (string.IsNullOrEmpty(configuredToken))
            {
                _logger.LogError("WhatsApp verify token not configured");
                return BadRequest("Verify token not configured");
            }

            if (mode == "subscribe" && verifyToken == configuredToken)
            {
                _logger.LogInformation("WhatsApp webhook verified successfully");
                return Ok(challenge);
            }

            _logger.LogWarning("WhatsApp webhook verification failed - invalid token");
            return Unauthorized("Invalid verify token");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error verifying WhatsApp webhook");
            return BadRequest(new { message = "Error verifying webhook", error = ex.Message });
        }
    }

    /// <summary>
    /// Webhook endpoint for receiving WhatsApp messages
    /// POST request for incoming messages
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> ReceiveMessage([FromBody] JsonElement body)
    {
        try
        {
            _logger.LogInformation("Received WhatsApp webhook: {Body}", body.ToString());

            // Verify webhook signature
            var signature = Request.Headers["X-Hub-Signature-256"].ToString();
            if (!VerifySignature(body.ToString(), signature))
            {
                _logger.LogWarning("Invalid webhook signature");
                return Unauthorized("Invalid signature");
            }

            // Parse the webhook payload
            if (body.TryGetProperty("entry", out var entries))
            {
                foreach (var entry in entries.EnumerateArray())
                {
                    if (entry.TryGetProperty("changes", out var changes))
                    {
                        foreach (var change in changes.EnumerateArray())
                        {
                            if (change.TryGetProperty("value", out var value))
                            {
                                await ProcessWebhookValue(value);
                            }
                        }
                    }
                }
            }

            return Ok(new { message = "Webhook received" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing WhatsApp webhook");
            return BadRequest(new { message = "Error processing webhook", error = ex.Message });
        }
    }

    private async Task ProcessWebhookValue(JsonElement value)
    {
        try
        {
            // Check for messages
            if (value.TryGetProperty("messages", out var messages))
            {
                foreach (var message in messages.EnumerateArray())
                {
                    await ProcessMessage(message);
                }
            }

            // Check for status updates
            if (value.TryGetProperty("statuses", out var statuses))
            {
                foreach (var status in statuses.EnumerateArray())
                {
                    ProcessStatus(status);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing webhook value");
        }
    }

    private async Task ProcessMessage(JsonElement message)
    {
        try
        {
            if (!message.TryGetProperty("from", out var fromElement) ||
                !message.TryGetProperty("type", out var typeElement))
            {
                return;
            }

            var from = fromElement.GetString();
            var type = typeElement.GetString();

            _logger.LogInformation("Processing WhatsApp message from {From}, type: {Type}", from, type);

            // Handle text messages
            if (type == "text" && message.TryGetProperty("text", out var textElement))
            {
                if (textElement.TryGetProperty("body", out var bodyElement))
                {
                    var messageText = bodyElement.GetString();
                    _logger.LogInformation("Received text message: {Message}", messageText);
                    
                    // TODO: Parse job details from message and save to database
                    // This is where you'd extract job information and create a Job record
                }
            }

            // Handle image messages with OCR
            if (type == "image" && message.TryGetProperty("image", out var imageElement))
            {
                if (imageElement.TryGetProperty("id", out var idElement))
                {
                    var mediaId = idElement.GetString();
                    _logger.LogInformation("Received image message with media ID: {MediaId}", mediaId);
                    
                    // TODO: Download image, run OCR, extract job details
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing message");
        }
    }

    private void ProcessStatus(JsonElement status)
    {
        try
        {
            if (status.TryGetProperty("status", out var statusElement))
            {
                var statusValue = statusElement.GetString();
                _logger.LogInformation("Message status update: {Status}", statusValue);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing status");
        }
    }

    private bool VerifySignature(string payload, string signature)
    {
        try
        {
            if (string.IsNullOrEmpty(signature))
            {
                return false;
            }

            var appSecret = _configuration["WhatsApp:AppSecret"];
            if (string.IsNullOrEmpty(appSecret))
            {
                _logger.LogWarning("WhatsApp app secret not configured");
                return false;
            }

            // Remove "sha256=" prefix if present
            var signatureValue = signature.Replace("sha256=", "");

            using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(appSecret)))
            {
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
                var computedSignature = BitConverter.ToString(hash).Replace("-", "").ToLower();

                return computedSignature == signatureValue.ToLower();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error verifying signature");
            return false;
        }
    }
}
