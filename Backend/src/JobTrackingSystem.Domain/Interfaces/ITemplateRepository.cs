namespace JobTrackingSystem.Domain.Interfaces;

using JobTrackingSystem.Domain.Entities;

public interface ITemplateRepository : IRepository<Template>
{
    Task<Template?> GetByCategoryAsync(string category);
}
