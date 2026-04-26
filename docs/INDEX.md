# Documentation Index

Welcome to the Job Tracking System documentation. This guide will help you understand, set up, and deploy the application.

## Quick Navigation

### Getting Started
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide for development
- **[SETUP.md](SETUP.md)** - Detailed setup instructions for both backend and frontend

### Understanding the System
- **[README.md](README.md)** - Project overview and features
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and design patterns

### Development
- **[API_REFERENCE.md](API_REFERENCE.md)** - Complete API documentation with examples
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development guidelines and best practices

### Deployment
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Docker, Azure, and AWS deployment guides

---

## Documentation by Role

### For New Developers
1. Start with [QUICKSTART.md](QUICKSTART.md)
2. Read [ARCHITECTURE.md](ARCHITECTURE.md) to understand the system
3. Review [API_REFERENCE.md](API_REFERENCE.md) for available endpoints
4. Check [DEVELOPMENT.md](DEVELOPMENT.md) for coding standards

### For DevOps/Infrastructure
1. Read [DEPLOYMENT.md](DEPLOYMENT.md)
2. Review Docker configuration files
3. Check environment setup requirements

### For API Consumers
1. Review [API_REFERENCE.md](API_REFERENCE.md)
2. Check example requests and responses
3. Understand placeholder system

### For Project Managers
1. Read [README.md](README.md) for overview
2. Check [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
3. Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options

---

## Key Concepts

### Job Processing Pipeline
```
Raw Message → Classification → Data Extraction → Template Matching → Message Generation → WhatsApp Link
```

### Template System
- Templates are category-based (Backend, Frontend, Fullstack)
- Support dynamic placeholders: {JobTitle}, {Category}, {Github}, {Portfolio}, {Email}
- Can be created and managed via API or UI

### Application Channels
- **WhatsApp**: Direct messaging via WhatsApp Web
- **Email**: Automated email sending
- **Manual**: For manual review and processing

---

## Technology Stack

### Backend
- .NET 8.0
- Entity Framework Core 8.0
- SQL Server
- Clean Architecture

### Frontend
- Angular 17
- TypeScript
- RxJS
- Tailwind CSS

### Infrastructure
- Docker & Docker Compose
- Azure (App Service, SQL Database, Static Web Apps)
- AWS (ECS, RDS, S3, CloudFront)

---

## Common Tasks

### Create a New Template
1. Go to Template Management in the UI
2. Fill in category, message template, and contact details
3. Use placeholders: {JobTitle}, {Category}, {Github}, {Portfolio}, {Email}
4. Save template

### Process a Job
1. Go to Dashboard
2. Paste job message or upload image
3. System automatically classifies and generates message
4. Click "Send via WhatsApp" or "Send Email"

### Deploy to Production
1. Build Docker images
2. Push to registry (Docker Hub, ECR, ACR)
3. Deploy using docker-compose or cloud platform
4. Configure database connection
5. Run migrations

### Add New Classification Category
1. Update `JobClassificationService.cs` with new keywords
2. Create template for new category
3. Test with sample jobs

---

## Troubleshooting

### Common Issues

**Backend won't start**
- Check .NET 8.0 is installed
- Verify SQL Server is running
- Check connection string in appsettings.json

**Frontend can't connect to API**
- Ensure backend is running on port 5001
- Check CORS configuration
- Verify API URL in services

**Database errors**
- Check SQL Server connection
- Verify database exists
- Run migrations: `dotnet ef database update`

**Docker issues**
- Ensure Docker Desktop is running
- Check port availability (4200, 5001, 1433)
- Review container logs: `docker logs container-name`

See [DEPLOYMENT.md](DEPLOYMENT.md) for more troubleshooting tips.

---

## File Structure

```
docs/
├── INDEX.md                 ← You are here
├── README.md               ← Project overview
├── QUICKSTART.md           ← 5-minute setup
├── SETUP.md                ← Detailed setup
├── ARCHITECTURE.md         ← System design
├── API_REFERENCE.md        ← API documentation
├── DEVELOPMENT.md          ← Development guidelines
└── DEPLOYMENT.md           ← Deployment guides
```

---

## Getting Help

### Resources
- Check relevant documentation file
- Review API examples in [API_REFERENCE.md](API_REFERENCE.md)
- Check troubleshooting section in [DEPLOYMENT.md](DEPLOYMENT.md)

### Reporting Issues
- Include error messages and logs
- Describe steps to reproduce
- Specify environment (Windows/Mac/Linux, Docker/Local)

---

## Contributing

When contributing to documentation:
1. Keep language clear and concise
2. Include examples where helpful
3. Update INDEX.md if adding new docs
4. Test instructions before committing

---

## Version History

- **v1.0** - Initial release with core features
- **v1.1** - Added Docker support
- **v1.2** - Added Azure and AWS deployment guides
- **v2.0** - Reorganized documentation structure

---

## License

All documentation is provided under the MIT License.

---

**Last Updated**: January 2024
**Maintained By**: Development Team
