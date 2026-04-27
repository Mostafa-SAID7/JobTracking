# Features

## Core Features

### Job Classification

The system automatically classifies job postings into three categories:

| Category | Keywords |
|----------|----------|
| **Backend** | .NET, C#, ASP.NET Core, Web API, SQL Server, Entity Framework, backend, server-side |
| **Frontend** | React, Angular, Vue, TypeScript, JavaScript, HTML, CSS, frontend, UI, client-side |
| **Fullstack** | Full stack, fullstack, both backend and frontend, full stack developer |

### Data Extraction

Automatically extracts key information from job messages:

- **Job Title** - Extracted from the message
- **Phone Number** - Detects international format (+1234567890)
- **Email** - Standard email pattern matching
- **Category** - Auto-classified based on keywords

### Message Generation

Generate personalized messages using templates with placeholders:

| Placeholder | Description |
|-------------|-------------|
| `{JobTitle}` | Extracted job title |
| `{Category}` | Classified category |
| `{Github}` | GitHub URL from template |
| `{Portfolio}` | Portfolio URL from template |
| `{Email}` | Email from template |

### Multi-Channel Support

#### WhatsApp
- Generates direct `wa.me` links
- Pre-filled with personalized message
- Supports international phone numbers

#### Email
- SMTP integration for sending emails
- Customizable subject and body templates
- HTML formatting support

#### Manual Review
- Preview generated messages
- Edit before sending
- Manual copy/paste option

## Advanced Features

### OCR Processing

Upload job postings as images (JPG, PNG, PDF):

- Automatic text extraction
- Supports multiple languages
- High accuracy for printed text

### Template Management

Create and manage templates via:

- **Dashboard UI** - Visual interface
- **API** - Full CRUD operations
- **Category-based** - One template per category

### Email Delivery

- SMTP configuration support
- Template-based email generation
- Delivery tracking
- Error handling

### Docker Support

- Complete containerization
- Docker Compose for easy setup
- SQL Server, Backend, Frontend containers
- Production-ready configuration

## Technology Stack

### Backend

| Technology | Purpose |
|------------|---------|
| .NET 8.0 | Modern, high-performance framework |
| Entity Framework Core 8.0 | ORM for data access |
| SQL Server | Relational database |
| ASP.NET Core | Web API framework |
| Dependency Injection | Loose coupling |
| Swagger | API documentation |

### Frontend

| Technology | Purpose |
|------------|---------|
| Angular 19 | Modern SPA framework |
| TypeScript | Type-safe development |
| RxJS | Reactive programming |
| Tailwind CSS | Utility-first styling |
| HttpClient | HTTP client |

### Infrastructure

| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| GitHub Actions | CI/CD pipeline |
| Azure / AWS | Cloud deployment options |

## Security Features

- Input validation on all endpoints
- SQL parameterized queries (EF Core)
- CORS configuration
- HTTPS enforcement
- Environment-based configuration
- No credentials in code

## Scalability

- Clean architecture for easy scaling
- Repository pattern for data access
- Service layer for business logic
- Async/await for I/O operations
- Database indexing support
- Caching ready (can be added)

## Deployment Options

| Platform | Description |
|----------|-------------|
| **Docker** | Local development and production |
| **Azure** | App Service, SQL Database, Static Web Apps |
| **AWS** | ECS, RDS, S3, CloudFront |
