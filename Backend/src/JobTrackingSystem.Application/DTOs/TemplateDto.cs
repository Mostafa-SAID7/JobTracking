namespace JobTrackingSystem.Application.DTOs;

public class TemplateDto
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty;
    public string MessageTemplate { get; set; } = string.Empty;
    public string EmailSubjectTemplate { get; set; } = string.Empty;
    public string EmailBodyTemplate { get; set; } = string.Empty;
    public string CvPath { get; set; } = string.Empty;
    public string GithubUrl { get; set; } = string.Empty;
    public string PortfolioUrl { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}

public class CreateTemplateDto
{
    public string Category { get; set; } = string.Empty;
    public string MessageTemplate { get; set; } = string.Empty;
    public string EmailSubjectTemplate { get; set; } = string.Empty;
    public string EmailBodyTemplate { get; set; } = string.Empty;
    public string CvPath { get; set; } = string.Empty;
    public string GithubUrl { get; set; } = string.Empty;
    public string PortfolioUrl { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}
