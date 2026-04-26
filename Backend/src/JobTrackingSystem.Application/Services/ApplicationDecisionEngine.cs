namespace JobTrackingSystem.Application.Services;

using Microsoft.Extensions.Logging;

public interface IApplicationDecisionEngine
{
    ApplicationDecision MakeDecision(ExtractedData data);
}

public class ApplicationDecision
{
    public string Channel { get; set; } = string.Empty; // WhatsApp, Email, Manual
    public string? TargetAddress { get; set; } // Phone or Email
    public bool CanAutomate { get; set; }
    public string Reason { get; set; } = string.Empty;
    public List<string> RequiredFields { get; set; } = new();
}

public class ApplicationDecisionEngine : IApplicationDecisionEngine
{
    private readonly ILogger<ApplicationDecisionEngine> _logger;

    public ApplicationDecisionEngine(ILogger<ApplicationDecisionEngine> logger)
    {
        _logger = logger;
    }

    public ApplicationDecision MakeDecision(ExtractedData data)
    {
        _logger.LogInformation("Making application decision for channel: {Channel}", data.ApplicationChannel);

        return data.ApplicationChannel switch
        {
            "WhatsApp" => MakeWhatsAppDecision(data),
            "Email" => MakeEmailDecision(data),
            _ => MakeManualDecision(data)
        };
    }

    private ApplicationDecision MakeWhatsAppDecision(ExtractedData data)
    {
        var decision = new ApplicationDecision
        {
            Channel = "WhatsApp",
            TargetAddress = data.PhoneNumber,
            CanAutomate = true,
            Reason = "Phone number available - WhatsApp link can be generated"
        };

        _logger.LogInformation("Decision: WhatsApp to {Phone}", data.PhoneNumber);
        return decision;
    }

    private ApplicationDecision MakeEmailDecision(ExtractedData data)
    {
        var decision = new ApplicationDecision
        {
            Channel = "Email",
            TargetAddress = data.Email,
            CanAutomate = !string.IsNullOrEmpty(data.Email),
            Reason = "Email available - application can be sent automatically"
        };

        if (!decision.CanAutomate)
        {
            decision.RequiredFields.Add("Email");
            decision.Reason = "Email required for automated sending";
        }

        _logger.LogInformation("Decision: Email to {Email}", data.Email);
        return decision;
    }

    private ApplicationDecision MakeManualDecision(ExtractedData data)
    {
        var decision = new ApplicationDecision
        {
            Channel = "Manual",
            CanAutomate = false,
            Reason = "No contact information found - manual review required"
        };

        if (string.IsNullOrEmpty(data.PhoneNumber))
            decision.RequiredFields.Add("PhoneNumber");

        if (string.IsNullOrEmpty(data.Email))
            decision.RequiredFields.Add("Email");

        _logger.LogInformation("Decision: Manual review required");
        return decision;
    }
}
