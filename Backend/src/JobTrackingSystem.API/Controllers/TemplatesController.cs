namespace JobTrackingSystem.API.Controllers;

using JobTrackingSystem.Application.DTOs;
using JobTrackingSystem.Domain.Entities;
using JobTrackingSystem.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TemplatesController : ControllerBase
{
    private readonly ITemplateRepository _templateRepository;
    private readonly ILogger<TemplatesController> _logger;

    public TemplatesController(
        ITemplateRepository templateRepository,
        ILogger<TemplatesController> logger)
    {
        _templateRepository = templateRepository;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<TemplateDto>> CreateTemplate([FromBody] CreateTemplateDto request)
    {
        try
        {
            _logger.LogInformation("Creating new template for category {Category}", request.Category);
            
            var template = new Template
            {
                Category = request.Category,
                MessageTemplate = request.MessageTemplate,
                EmailSubjectTemplate = request.EmailSubjectTemplate ?? $"Application for {{JobTitle}}",
                EmailBodyTemplate = request.EmailBodyTemplate ?? request.MessageTemplate,
                CvPath = request.CvPath,
                GithubUrl = request.GithubUrl,
                PortfolioUrl = request.PortfolioUrl,
                Email = request.Email,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var created = await _templateRepository.AddAsync(template);

            var dto = new TemplateDto
            {
                Id = created.Id,
                Category = created.Category,
                MessageTemplate = created.MessageTemplate,
                EmailSubjectTemplate = created.EmailSubjectTemplate,
                EmailBodyTemplate = created.EmailBodyTemplate,
                CvPath = created.CvPath,
                GithubUrl = created.GithubUrl,
                PortfolioUrl = created.PortfolioUrl,
                Email = created.Email
            };

            return CreatedAtAction(nameof(GetTemplate), new { id = created.Id }, dto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating template");
            return BadRequest(new { message = "Error creating template", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TemplateDto>> GetTemplate(int id)
    {
        try
        {
            var template = await _templateRepository.GetByIdAsync(id);
            if (template == null)
                return NotFound();

            var dto = new TemplateDto
            {
                Id = template.Id,
                Category = template.Category,
                MessageTemplate = template.MessageTemplate,
                EmailSubjectTemplate = template.EmailSubjectTemplate,
                EmailBodyTemplate = template.EmailBodyTemplate,
                CvPath = template.CvPath,
                GithubUrl = template.GithubUrl,
                PortfolioUrl = template.PortfolioUrl,
                Email = template.Email
            };

            return Ok(dto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving template {TemplateId}", id);
            return BadRequest(new { message = "Error retrieving template", error = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TemplateDto>>> GetAllTemplates()
    {
        try
        {
            var templates = await _templateRepository.GetAllAsync();
            var dtos = templates.Select(t => new TemplateDto
            {
                Id = t.Id,
                Category = t.Category,
                MessageTemplate = t.MessageTemplate,
                EmailSubjectTemplate = t.EmailSubjectTemplate,
                EmailBodyTemplate = t.EmailBodyTemplate,
                CvPath = t.CvPath,
                GithubUrl = t.GithubUrl,
                PortfolioUrl = t.PortfolioUrl,
                Email = t.Email
            });

            return Ok(dtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving all templates");
            return BadRequest(new { message = "Error retrieving templates", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TemplateDto>> UpdateTemplate(int id, [FromBody] CreateTemplateDto request)
    {
        try
        {
            var template = await _templateRepository.GetByIdAsync(id);
            if (template == null)
                return NotFound();

            template.Category = request.Category;
            template.MessageTemplate = request.MessageTemplate;
            template.EmailSubjectTemplate = request.EmailSubjectTemplate ?? template.EmailSubjectTemplate;
            template.EmailBodyTemplate = request.EmailBodyTemplate ?? template.EmailBodyTemplate;
            template.CvPath = request.CvPath;
            template.GithubUrl = request.GithubUrl;
            template.PortfolioUrl = request.PortfolioUrl;
            template.Email = request.Email;
            template.UpdatedAt = DateTime.UtcNow;

            var updated = await _templateRepository.UpdateAsync(template);

            var dto = new TemplateDto
            {
                Id = updated.Id,
                Category = updated.Category,
                MessageTemplate = updated.MessageTemplate,
                EmailSubjectTemplate = updated.EmailSubjectTemplate,
                EmailBodyTemplate = updated.EmailBodyTemplate,
                CvPath = updated.CvPath,
                GithubUrl = updated.GithubUrl,
                PortfolioUrl = updated.PortfolioUrl,
                Email = updated.Email
            };

            return Ok(dto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating template {TemplateId}", id);
            return BadRequest(new { message = "Error updating template", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTemplate(int id)
    {
        try
        {
            var success = await _templateRepository.DeleteAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting template {TemplateId}", id);
            return BadRequest(new { message = "Error deleting template", error = ex.Message });
        }
    }
}
