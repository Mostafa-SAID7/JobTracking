namespace JobTrackingSystem.Application.DTOs;

public class WhatsAppMessageDto
{
    public string From { get; set; } = string.Empty;
    public string MessageType { get; set; } = string.Empty;
    public string? TextContent { get; set; }
    public string? MediaId { get; set; }
    public DateTime ReceivedAt { get; set; } = DateTime.UtcNow;
    public string? MessageId { get; set; }
}

public class WhatsAppWebhookPayload
{
    public string? Object { get; set; }
    public List<WhatsAppEntry>? Entry { get; set; }
}

public class WhatsAppEntry
{
    public string? Id { get; set; }
    public List<WhatsAppChange>? Changes { get; set; }
}

public class WhatsAppChange
{
    public string? Field { get; set; }
    public WhatsAppValue? Value { get; set; }
}

public class WhatsAppValue
{
    public string? MessagingProduct { get; set; }
    public List<WhatsAppMessage>? Messages { get; set; }
    public List<WhatsAppStatus>? Statuses { get; set; }
}

public class WhatsAppMessage
{
    public string? From { get; set; }
    public string? Id { get; set; }
    public string? Type { get; set; }
    public WhatsAppTextMessage? Text { get; set; }
    public WhatsAppImageMessage? Image { get; set; }
}

public class WhatsAppTextMessage
{
    public string? Body { get; set; }
}

public class WhatsAppImageMessage
{
    public string? Id { get; set; }
    public string? Mime_Type { get; set; }
}

public class WhatsAppStatus
{
    public string? Id { get; set; }
    public string? Status { get; set; }
    public string? RecipientId { get; set; }
}
