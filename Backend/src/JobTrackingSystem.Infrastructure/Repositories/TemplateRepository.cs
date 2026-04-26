namespace JobTrackingSystem.Infrastructure.Repositories;

using JobTrackingSystem.Domain.Entities;
using JobTrackingSystem.Domain.Interfaces;
using JobTrackingSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public class TemplateRepository : Repository<Template>, ITemplateRepository
{
    public TemplateRepository(JobTrackingDbContext context, ILogger<TemplateRepository> logger) 
        : base(context, logger)
    {
    }

    public async Task<Template?> GetByCategoryAsync(string category)
    {
        _logger.LogInformation("Getting template by category {Category}", category);
        return await _dbSet.FirstOrDefaultAsync(t => t.Category == category);
    }
}
