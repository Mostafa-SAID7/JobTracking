# Backend Structure

```
Backend/
├── src/
│   ├── JobTrackingSystem.API/              # Entry point
│   │   ├── Controllers/
│   │   │   ├── JobsControllerV2.cs         # Job endpoints (v2)
│   │   │   ├── TemplatesController.cs      # Template CRUD
│   │   │   └── WhatsAppWebhookController.cs
│   │   ├── Properties/
│   │   │   └── launchSettings.json         # Ports, profiles
│   │   ├── appsettings.json                # Config (DB, WhatsApp)
│   │   ├── appsettings.Development.json
│   │   ├── Program.cs                      # WebApplicationBuilder
│   │   └── JobTrackingSystem.API.csproj
│   │
│   ├── JobTrackingSystem.Application/      # Business logic
│   │   ├── Services/
│   │   │   ├── JobProcessingService.cs
│   │   │   ├── JobClassificationService.cs
│   │   │   ├── JobExtractionService.cs
│   │   │   ├── MessageGenerationService.cs
│   │   │   ├── TemplateService.cs
│   │   │   └── WhatsAppService.cs
│   │   ├── DTOs/
│   │   │   ├── JobDto.cs
│   │   │   ├── TemplateDto.cs
│   │   │   └── WhatsAppMessageDto.cs
│   │   └── JobTrackingSystem.Application.csproj
│   │
│   ├── JobTrackingSystem.Domain/           # Core entities
│   │   ├── Entities/
│   │   │   ├── Job.cs
│   │   │   └── Template.cs
│   │   ├── Interfaces/
│   │   │   ├── IJobRepository.cs
│   │   │   └── ITemplateRepository.cs
│   │   └── JobTrackingSystem.Domain.csproj
│   │
│   └── JobTrackingSystem.Infrastructure/   # Data & external
│       ├── Data/
│       │   └── JobTrackingDbContext.cs
│       ├── Repositories/
│       │   ├── JobRepository.cs
│       │   └── TemplateRepository.cs
│       ├── Migrations/
│       │   └── *.cs                        # EF migrations
│       └── JobTrackingSystem.Infrastructure.csproj
│
└── JobTrackingSystem.sln
```

## Layer Responsibilities

| Layer | Purpose | Key Files |
|-------|---------|-----------|
| API | HTTP endpoints, validation | `Controllers/` |
| Application | Business logic, orchestration | `Services/`, `DTOs/` |
| Domain | Entities, interfaces, rules | `Entities/`, `Interfaces/` |
| Infrastructure | DB, repos, external APIs | `Data/`, `Repositories/`, `Migrations/` |

## Key Files

| File | Purpose |
|------|---------|
| `Program.cs` | DI setup, middleware, Swagger |
| `appsettings.json` | DB connection, WhatsApp credentials |
| `JobClassificationService.cs` | Category detection (Backend/Frontend/Fullstack) |
| `JobExtractionService.cs` | Phone, email, title extraction |
| `MessageGenerationService.cs` | Template replacement with placeholders |
| `WhatsAppService.cs` | Send messages via WhatsApp Business API |
