namespace JobTrackingSystem.Infrastructure;

using JobTrackingSystem.Application.Services;
using JobTrackingSystem.Domain.Interfaces;
using JobTrackingSystem.Infrastructure.Data;
using JobTrackingSystem.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Database
        var useInMemory = configuration.GetValue<bool>("UseInMemoryDatabase", false);
        
        services.AddDbContext<JobTrackingDbContext>(options =>
        {
            if (useInMemory)
            {
                options.UseInMemoryDatabase("JobTrackingSystemDb");
            }
            else
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            }
        });

        // Repositories
        services.AddScoped<IJobRepository, JobRepository>();
        services.AddScoped<ITemplateRepository, TemplateRepository>();

        // Original Services
        services.AddScoped<IJobClassificationService, JobClassificationService>();
        services.AddScoped<IJobExtractionService, JobExtractionService>();
        services.AddScoped<IMessageGenerationService, MessageGenerationService>();
        services.AddScoped<IJobProcessingService, JobProcessingService>();

        // New Services for Multi-Channel Support
        services.AddScoped<IEnhancedExtractionService, EnhancedExtractionService>();
        services.AddScoped<IApplicationDecisionEngine, ApplicationDecisionEngine>();
        services.AddScoped<IUnifiedMessageGenerationService, UnifiedMessageGenerationService>();

        // WhatsApp Service
        services.AddScoped<IWhatsAppService, WhatsAppService>();
        services.AddHttpClient<IWhatsAppService, WhatsAppService>();

        // OCR Service (using Mock for now, replace with Tesseract in production)
        var ocrProvider = configuration.GetValue<string>("OcrSettings:Provider") ?? "Mock";
        if (ocrProvider == "Tesseract")
        {
            services.AddScoped<IOcrService>(sp =>
                new TesseractOcrService(
                    sp.GetRequiredService<ILogger<TesseractOcrService>>(),
                    configuration.GetValue<string>("OcrSettings:TesseractPath") ?? ""));
        }
        else
        {
            services.AddScoped<IOcrService, MockOcrService>();
        }

        // Email Service (using Mock for now, replace with SMTP in production)
        var emailProvider = configuration.GetValue<string>("EmailSettings:Provider") ?? "Mock";
        if (emailProvider == "Smtp")
        {
            services.AddScoped<IEmailService>(sp =>
                new SmtpEmailService(
                    sp.GetRequiredService<ILogger<SmtpEmailService>>(),
                    configuration.GetValue<string>("EmailSettings:SmtpServer") ?? "smtp.gmail.com",
                    configuration.GetValue<int>("EmailSettings:SmtpPort", 587),
                    configuration.GetValue<string>("EmailSettings:FromEmail") ?? "",
                    configuration.GetValue<string>("EmailSettings:FromName") ?? "Job Application System",
                    configuration.GetValue<string>("EmailSettings:Password") ?? "",
                    configuration.GetValue<bool>("EmailSettings:EnableSsl", true)));
        }
        else
        {
            services.AddScoped<IEmailService, MockEmailService>();
        }

        return services;
    }
}
