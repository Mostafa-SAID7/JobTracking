namespace JobTrackingSystem.API.Controllers;

using JobTrackingSystem.Application.DTOs;
using JobTrackingSystem.Application.Services;
using JobTrackingSystem.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/v2/[controller]")]
public class JobsControllerV2 : ControllerBase
{
    private readonly IJobProcessingService _jobProcessingService;
    private readonly IJobRepository _jobRepository;
    private readonly IMessageGenerationService _messageGenerationService;
    private readonly IUnifiedMessageGenerationService _unifiedMessageGenerationService;
    private readonly IOcrService _ocrService;
    private readonly IEmailService _emailService;
    private readonly IEnhancedExtractionService _extractionService;
    private readonly IApplicationDecisionEngine _decisionEngine;
    private readonly ILogger<JobsControllerV2> _logger;

    public JobsControllerV2(
        IJobProcessingService jobProcessingService,
        IJobRepository jobRepository,
        IMessageGenerationService messageGenerationService,
        IUnifiedMessageGenerationService unifiedMessageGenerationService,
        IOcrService ocrService,
        IEmailService emailService,
        IEnhancedExtractionService extractionService,
        IApplicationDecisionEngine decisionEngine,
        ILogger<JobsControllerV2> logger)
    {
        _jobProcessingService = jobProcessingService;
        _jobRepository = jobRepository;
        _messageGenerationService = messageGenerationService;
        _unifiedMessageGenerationService = unifiedMessageGenerationService;
        _ocrService = ocrService;
        _emailService = emailService;
        _extractionService = extractionService;
        _decisionEngine = decisionEngine;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<JobResponseDto>> CreateJob([FromForm] CreateJobDto request)
    {
        try
        {
            _logger.LogInformation("Processing new job with text and/or image");

            var sourceMessage = request.Text ?? string.Empty;
            string? imagePath = null;

            // Process image if provided
            if (request.Image != null)
            {
                _logger.LogInformation("Image file provided, saving and running OCR");
                
                // Validate file
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".pdf" };
                var fileExtension = Path.GetExtension(request.Image.FileName).ToLower();
                
                if (!allowedExtensions.Contains(fileExtension))
                {
                    return BadRequest(new { message = "Invalid file type. Allowed: jpg, jpeg, png, pdf" });
                }

                if (request.Image.Length > 5242880) // 5MB
                {
                    return BadRequest(new { message = "File size exceeds 5MB limit" });
                }

                // Save file
                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads", "jobs");
                Directory.CreateDirectory(uploadPath);
                
                var fileName = $"{Guid.NewGuid()}{fileExtension}";
                imagePath = Path.Combine(uploadPath, fileName);
                
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await request.Image.CopyToAsync(stream);
                }

                // Run OCR
                var ocrResult = await _ocrService.ExtractTextFromImageAsync(imagePath);
                
                if (ocrResult.Success)
                {
                    sourceMessage = string.IsNullOrEmpty(sourceMessage)
                        ? ocrResult.ExtractedText
                        : $"{sourceMessage}\n\n[OCR Extracted]:\n{ocrResult.ExtractedText}";
                    _logger.LogInformation("OCR completed with confidence: {Confidence}", ocrResult.Confidence);
                }
                else
                {
                    _logger.LogWarning("OCR failed: {Error}", ocrResult.ErrorMessage);
                }
            }

            if (string.IsNullOrEmpty(sourceMessage))
            {
                return BadRequest(new { message = "Either text or image must be provided" });
            }

            // Process job
            var job = await _jobProcessingService.ProcessJobAsync(sourceMessage);
            job.ImagePath = imagePath;

            // Extract enhanced data
            var extractedData = _extractionService.ExtractAllData(sourceMessage);
            job.Email = extractedData.Email;
            job.ApplicationChannel = extractedData.ApplicationChannel;

            // Update job in repository
            await _jobRepository.UpdateAsync(job);

            // Make application decision
            var decision = _decisionEngine.MakeDecision(extractedData);

            // Get template and generate messages
            var jobWithTemplate = await _jobRepository.GetJobWithTemplateAsync(job.Id);
            if (jobWithTemplate?.Template != null)
            {
                var unifiedMessages = _unifiedMessageGenerationService.GenerateApplicationMessages(job, jobWithTemplate.Template);

                var response = new JobResponseDto
                {
                    Id = job.Id,
                    Title = job.Title,
                    Category = job.Category,
                    PhoneNumber = job.PhoneNumber,
                    Email = job.Email,
                    ApplicationChannel = decision.Channel,
                    GeneratedMessage = unifiedMessages.WhatsAppMessage,
                    EmailSubject = unifiedMessages.EmailSubject,
                    EmailBody = unifiedMessages.EmailBody,
                    WhatsAppLink = unifiedMessages.WhatsAppLink,
                    CvPath = unifiedMessages.CvPath
                };

                return CreatedAtAction(nameof(GetJob), new { id = job.Id }, response);
            }

            return BadRequest(new { message = "No template found for category" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing job");
            return BadRequest(new { message = "Error processing job", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<JobResponseDto>> GetJob(int id)
    {
        try
        {
            var job = await _jobRepository.GetJobWithTemplateAsync(id);
            if (job == null)
                return NotFound();

            var extractedData = _extractionService.ExtractAllData(job.Description);
            var decision = _decisionEngine.MakeDecision(extractedData);

            var response = new JobResponseDto
            {
                Id = job.Id,
                Title = job.Title,
                Category = job.Category,
                PhoneNumber = job.PhoneNumber,
                Email = job.Email,
                ApplicationChannel = decision.Channel,
                GeneratedMessage = job.GeneratedMessage ?? string.Empty,
                WhatsAppLink = _messageGenerationService.GenerateWhatsAppLink(
                    job.PhoneNumber,
                    job.GeneratedMessage ?? string.Empty),
                CvPath = job.Template?.CvPath ?? string.Empty
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving job {JobId}", id);
            return BadRequest(new { message = "Error retrieving job", error = ex.Message });
        }
    }

    [HttpGet("{id}/ocr-preview")]
    public async Task<ActionResult<OcrPreviewDto>> GetOcrPreview(int id)
    {
        try
        {
            var job = await _jobRepository.GetByIdAsync(id);
            if (job == null)
                return NotFound();

            if (string.IsNullOrEmpty(job.ImagePath))
                return BadRequest(new { message = "No image associated with this job" });

            var ocrResult = await _ocrService.ExtractTextFromImageAsync(job.ImagePath);

            return Ok(new OcrPreviewDto
            {
                ExtractedText = ocrResult.ExtractedText,
                Confidence = ocrResult.Confidence,
                Success = ocrResult.Success,
                ErrorMessage = ocrResult.ErrorMessage
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting OCR preview for job {JobId}", id);
            return BadRequest(new { message = "Error getting OCR preview", error = ex.Message });
        }
    }

    [HttpPost("{id}/send-email")]
    public async Task<ActionResult> SendEmail(int id, [FromBody] SendEmailDto request)
    {
        try
        {
            var job = await _jobRepository.GetJobWithTemplateAsync(id);
            if (job == null)
                return NotFound();

            if (job.Template == null)
                return BadRequest(new { message = "No template found for this job" });

            var unifiedMessages = _unifiedMessageGenerationService.GenerateApplicationMessages(job, job.Template);

            if (request.Preview)
            {
                return Ok(new
                {
                    subject = unifiedMessages.EmailSubject,
                    body = unifiedMessages.EmailBody,
                    recipientEmail = request.RecipientEmail
                });
            }

            var emailRequest = new EmailRequest
            {
                RecipientEmail = request.RecipientEmail,
                Subject = unifiedMessages.EmailSubject,
                Body = unifiedMessages.EmailBody,
                IsHtml = true
            };

            var result = await _emailService.SendEmailWithAttachmentAsync(emailRequest, unifiedMessages.CvPath);

            if (!result.Success)
            {
                return BadRequest(new { message = "Failed to send email", error = result.ErrorMessage });
            }

            job.EmailSentAt = DateTime.UtcNow;
            job.EmailStatus = "Sent";
            await _jobRepository.UpdateAsync(job);

            return Ok(new { message = "Email sent successfully", messageId = result.MessageId });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending email for job {JobId}", id);
            return BadRequest(new { message = "Error sending email", error = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobDto>>> GetAllJobs()
    {
        try
        {
            var jobs = await _jobRepository.GetAllAsync();
            var dtos = jobs.Select(j => new JobDto
            {
                Id = j.Id,
                Title = j.Title,
                Description = j.Description,
                Category = j.Category,
                PhoneNumber = j.PhoneNumber,
                Email = j.Email,
                SourceMessage = j.SourceMessage,
                CreatedAt = j.CreatedAt,
                GeneratedMessage = j.GeneratedMessage,
                ApplicationChannel = j.ApplicationChannel,
                TemplateId = j.TemplateId
            });

            return Ok(dtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving all jobs");
            return BadRequest(new { message = "Error retrieving jobs", error = ex.Message });
        }
    }

    [HttpGet("channel/{channel}")]
    public async Task<ActionResult<IEnumerable<JobDto>>> GetJobsByChannel(string channel)
    {
        try
        {
            var jobs = await _jobRepository.GetAllAsync();
            var filtered = jobs.Where(j => j.ApplicationChannel == channel);
            
            var dtos = filtered.Select(j => new JobDto
            {
                Id = j.Id,
                Title = j.Title,
                Description = j.Description,
                Category = j.Category,
                PhoneNumber = j.PhoneNumber,
                Email = j.Email,
                SourceMessage = j.SourceMessage,
                CreatedAt = j.CreatedAt,
                GeneratedMessage = j.GeneratedMessage,
                ApplicationChannel = j.ApplicationChannel,
                TemplateId = j.TemplateId
            });

            return Ok(dtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving jobs by channel {Channel}", channel);
            return BadRequest(new { message = "Error retrieving jobs", error = ex.Message });
        }
    }
}
