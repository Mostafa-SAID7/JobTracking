namespace JobTrackingSystem.Domain.Interfaces;

using JobTrackingSystem.Domain.Entities;

public interface IJobRepository : IRepository<Job>
{
    Task<IEnumerable<Job>> GetJobsByCategoryAsync(string category);
    Task<Job?> GetJobWithTemplateAsync(int jobId);
}
