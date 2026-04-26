namespace JobTrackingSystem.Infrastructure.Data;

using JobTrackingSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class JobTrackingDbContext : DbContext
{
    public JobTrackingDbContext(DbContextOptions<JobTrackingDbContext> options) : base(options)
    {
    }

    public DbSet<Job> Jobs { get; set; }
    public DbSet<Template> Templates { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Job Configuration
        modelBuilder.Entity<Job>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.Category).IsRequired().HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.SourceMessage).IsRequired();
            entity.Property(e => e.ImagePath).HasMaxLength(500);
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.ApplicationChannel).HasMaxLength(50).HasDefaultValue("Manual");
            entity.Property(e => e.EmailStatus).HasMaxLength(50);
            entity.HasOne(e => e.Template).WithMany().HasForeignKey(e => e.TemplateId).IsRequired(false);
        });

        // Template Configuration
        modelBuilder.Entity<Template>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Category).IsRequired().HasMaxLength(50);
            entity.Property(e => e.MessageTemplate).IsRequired();
            entity.Property(e => e.EmailSubjectTemplate).HasMaxLength(500);
            entity.Property(e => e.EmailBodyTemplate);
            entity.Property(e => e.CvPath).IsRequired().HasMaxLength(500);
            entity.Property(e => e.GithubUrl).IsRequired().HasMaxLength(500);
            entity.Property(e => e.PortfolioUrl).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.UpdatedAt).IsRequired();
        });
    }
}
