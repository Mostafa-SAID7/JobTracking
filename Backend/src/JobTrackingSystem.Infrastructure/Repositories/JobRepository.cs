namespace JobTrackingSystem.Infrastructure.Repositories;

using JobTrackingSystem.Domain.Entities;
using JobTrackingSystem.Domain.Interfaces;
using JobTrackingSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public class JobRepository : Repository<Job>, IJobRepository
{
    public JobRepository(JobTrackingDbContext context, ILogger<JobRepository> logger) 
        : base(context, logger)
    {
    }

    public async Task<IEnumerable<Job>> GetJobsByCategoryAsync(string category)
    {
        _logger.LogInformation("Getting jobs by category {Category}", category);
        return await _dbSet.Where(j => j.Category == category).ToListAsync();
    }

    public async Task<Job?> GetJobWithTemplateAsync(int jobId)
    {
        _logger.LogInformation("Getting job {JobId} with template", jobId);
        return await _dbSet.Include(j => j.Template).FirstOrDefaultAsync(j => j.Id == jobId);
    }
}
