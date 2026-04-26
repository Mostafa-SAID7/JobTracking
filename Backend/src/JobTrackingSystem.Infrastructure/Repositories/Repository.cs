namespace JobTrackingSystem.Infrastructure.Repositories;

using JobTrackingSystem.Domain.Interfaces;
using JobTrackingSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly JobTrackingDbContext _context;
    protected readonly DbSet<T> _dbSet;
    protected readonly ILogger<Repository<T>> _logger;

    public Repository(JobTrackingDbContext context, ILogger<Repository<T>> logger)
    {
        _context = context;
        _dbSet = context.Set<T>();
        _logger = logger;
    }

    public async Task<T?> GetByIdAsync(int id)
    {
        _logger.LogInformation("Getting {Entity} by ID {Id}", typeof(T).Name, id);
        return await _dbSet.FindAsync(id);
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        _logger.LogInformation("Getting all {Entity}", typeof(T).Name);
        return await _dbSet.ToListAsync();
    }

    public async Task<T> AddAsync(T entity)
    {
        _logger.LogInformation("Adding new {Entity}", typeof(T).Name);
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<T> UpdateAsync(T entity)
    {
        _logger.LogInformation("Updating {Entity}", typeof(T).Name);
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        _logger.LogInformation("Deleting {Entity} with ID {Id}", typeof(T).Name, id);
        var entity = await GetByIdAsync(id);
        if (entity == null)
            return false;

        _dbSet.Remove(entity);
        await _context.SaveChangesAsync();
        return true;
    }
}
