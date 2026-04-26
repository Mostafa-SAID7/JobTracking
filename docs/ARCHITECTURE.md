# System Architecture

## Overview

The Job Tracking System follows **Clean Architecture** principles with clear separation of concerns across multiple layers.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Angular)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Components (Dashboard, Templates)                   │   │
│  │  Services (Job, Template)                            │   │
│  │  Models (DTOs)                                       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                    Backend API (.NET 8)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Layer (Controllers, Endpoints)                  │   │
│  │  ├─ JobsControllerV2                                 │   │
│  │  └─ TemplatesController                              │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Application Layer (Services, DTOs)                  │   │
│  │  ├─ JobProcessingService                             │   │
│  │  ├─ JobClassificationService                         │   │
│  │  ├─ JobExtractionService                             │   │
│  │  ├─ MessageGenerationService                         │   │
│  │  └─ TemplateService                                  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Domain Layer (Entities, Interfaces)                 │   │
│  │  ├─ Job (Entity)                                     │   │
│  │  ├─ Template (Entity)                                │   │
│  │  ├─ IJobRepository                                   │   │
│  │  └─ ITemplateRepository                              │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Infrastructure Layer (Data, Repositories)           │   │
│  │  ├─ JobTrackingDbContext                             │   │
│  │  ├─ JobRepository                                    │   │
│  │  ├─ TemplateRepository                               │   │
│  │  └─ Migrations                                       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ SQL
┌─────────────────────────────────────────────────────────────┐
│                    SQL Server Database                       │
│  ├─ Jobs Table                                              │
│  ├─ Templates Table                                         │
│  └─ Migrations                                              │
└─────────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### API Layer
- **Purpose**: HTTP request/response handling
- **Components**:
  - `JobsControllerV2`: Job CRUD and processing endpoints
  - `TemplatesController`: Template management endpoints
- **Responsibilities**:
  - Route requests to appropriate services
  - Validate input parameters
  - Return formatted responses
  - Handle HTTP status codes

### Application Layer
- **Purpose**: Business logic and orchestration
- **Key Services**:
  - `JobProcessingService`: Orchestrates job processing pipeline
  - `JobClassificationService`: Categorizes jobs
  - `JobExtractionService`: Extracts data from messages
  - `MessageGenerationService`: Creates personalized messages
  - `TemplateService`: Template management logic
- **Responsibilities**:
  - Implement business rules
  - Coordinate between domain and infrastructure
  - Transform DTOs
  - Handle cross-cutting concerns

### Domain Layer
- **Purpose**: Core business entities and contracts
- **Components**:
  - `Job`: Job entity with properties
  - `Template`: Template entity with properties
  - `IJobRepository`: Job data access contract
  - `ITemplateRepository`: Template data access contract
- **Responsibilities**:
  - Define entities
  - Define repository interfaces
  - Encapsulate business logic in entities

### Infrastructure Layer
- **Purpose**: Data persistence and external services
- **Components**:
  - `JobTrackingDbContext`: EF Core context
  - `JobRepository`: Job data access implementation
  - `TemplateRepository`: Template data access implementation
  - `Migrations`: Database schema changes
- **Responsibilities**:
  - Implement repository interfaces
  - Handle database operations
  - Manage migrations
  - Configure EF Core

## Data Flow

### Job Processing Pipeline

```
1. User submits job message (text or image)
   ↓
2. API receives request (POST /api/jobs)
   ↓
3. JobProcessingService orchestrates:
   a) Extract data (phone, title)
   b) Classify category
   c) Find matching template
   d) Generate message
   ↓
4. Save to database
   ↓
5. Return response with generated message
   ↓
6. Frontend displays message and WhatsApp link
```

### Template Matching

```
Job Category (e.g., "Backend")
   ↓
Query Templates by Category
   ↓
Found? → Use Template
   ↓
Not Found? → Use Default Template
   ↓
Replace Placeholders with Job Data
   ↓
Generate Final Message
```

## Key Design Patterns

### Repository Pattern
- Abstracts data access logic
- Enables easy testing with mocks
- Allows switching data sources

### Dependency Injection
- Loose coupling between layers
- Easy to test with mock dependencies
- Configured in `Program.cs`

### Service Layer Pattern
- Encapsulates business logic
- Reusable across controllers
- Single responsibility principle

### DTO Pattern
- Separates API contracts from domain entities
- Prevents exposing internal structure
- Enables API versioning

## Technology Stack

### Backend
- **.NET 8.0**: Modern, high-performance framework
- **Entity Framework Core 8.0**: ORM for data access
- **SQL Server**: Relational database
- **Dependency Injection**: Built-in .NET DI container

### Frontend
- **Angular 17**: Modern SPA framework
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming
- **Tailwind CSS**: Utility-first styling

## Scalability Considerations

### Current Architecture
- Single API instance
- Single database
- Suitable for small to medium workloads

### Future Enhancements
- **Horizontal Scaling**: Load balancer + multiple API instances
- **Caching**: Redis for template caching
- **Message Queue**: Background job processing with Hangfire
- **Microservices**: Separate services for classification, extraction, generation
- **Database Replication**: Read replicas for reporting

## Security Architecture

### Authentication & Authorization
- Currently: No authentication (can be added)
- Future: JWT tokens, role-based access control

### Data Protection
- Connection strings in configuration
- SQL parameterized queries (EF Core)
- Input validation on all endpoints

### API Security
- CORS configuration
- HTTPS enforcement
- Rate limiting (can be added)

## Error Handling Strategy

### Layers
1. **API Layer**: Catches exceptions, returns HTTP error codes
2. **Application Layer**: Business logic validation
3. **Infrastructure Layer**: Database error handling

### Logging
- Structured logging at all layers
- Error details for debugging
- Audit trail for important operations

## Testing Strategy

### Unit Tests
- Test services in isolation
- Mock repositories
- Test business logic

### Integration Tests
- Test API endpoints
- Use test database
- Verify data persistence

### E2E Tests
- Test complete workflows
- Frontend + Backend
- Real database

## Deployment Architecture

### Development
- Local SQL Server (LocalDB)
- Local API (localhost:5001)
- Local Frontend (localhost:4200)

### Production
- Cloud SQL Server (Azure SQL, AWS RDS)
- Cloud API (Azure App Service, AWS Lambda)
- CDN for Frontend (Azure Static Web Apps, CloudFront)
- Load balancer for API
- Monitoring and logging

## Performance Optimization

### Backend
- Database indexing on frequently queried columns
- Query optimization with EF Core
- Caching for templates
- Async/await for I/O operations

### Frontend
- Lazy loading of components
- OnPush change detection
- Tree-shaking for bundle size
- Compression and minification

## Monitoring & Observability

### Metrics
- API response times
- Database query performance
- Error rates
- User activity

### Logging
- Structured logging (Serilog)
- Log aggregation (Application Insights)
- Error tracking (Sentry)

### Alerting
- High error rates
- Slow API responses
- Database connection issues
- Disk space warnings
