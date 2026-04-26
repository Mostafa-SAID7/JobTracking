namespace JobTrackingSystem.Application.Services;

using JobTrackingSystem.Domain.Entities;
using JobTrackingSystem.Domain.Interfaces;
using Microsoft.Extensions.Logging;

public interface IJobProcessingService
{
    Task<Job> ProcessJobAsync(string sourceMessage);
}

public class JobProcessingService : IJobProcessingService
{
    private readonly IJobClassificationService _classificationService;
    private readonly IJobExtractionService _extractionService;
    private readonly ITemplateRepository _templateRepository;
    private readonly IJobRepository _jobRepository;
    private readonly IMessageGenerationService _messageGenerationService;
    private readonly ILogger<JobProcessingService> _logger;

    public JobProcessingService(
        IJobClassificationService classificationService,
        IJobExtractionService extractionService,
        ITemplateRepository templateRepository,
        IJobRepository jobRepository,
        IMessageGenerationService messageGenerationService,
        ILogger<JobProcessingService> logger)
    {
        _classificationService = classificationService;
        _extractionService = extractionService;
        _templateRepository = templateRepository;
        _jobRepository = jobRepository;
        _messageGenerationService = messageGenerationService;
        _logger = logger;
    }

    public async Task<Job> ProcessJobAsync(string sourceMessage)
    {
        _logger.LogInformation("Starting job processing pipeline");

        // Step 1: Classification
        var category = _classificationService.ClassifyJob(sourceMessage);

        // Step 2: Data Extraction
        var (title, phoneNumber) = _extractionService.ExtractJobData(sourceMessage);

        // Step 3: Create Job Entity
        var job = new Job
        {
            Title = title,
            Description = sourceMessage,
            Category = category,
            PhoneNumber = phoneNumber,
            SourceMessage = sourceMessage,
            CreatedAt = DateTime.UtcNow
        };

        // Step 4: Template Matching
        var template = await _templateRepository.GetByCategoryAsync(category);
        if (template != null)
        {
            job.TemplateId = template.Id;
            job.GeneratedMessage = _messageGenerationService.GenerateMessage(job, template);
        }

        // Step 5: Save Job
        var savedJob = await _jobRepository.AddAsync(job);
        _logger.LogInformation("Job processed and saved with ID {JobId}", savedJob.Id);

        return savedJob;
    }
}
