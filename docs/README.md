# Job Tracking System - Documentation

Welcome to the Job Tracking System documentation. This folder contains all guides, architecture documentation, and setup instructions.

## 📚 Documentation Structure

```
docs/
├── README.md                          # This file
├── QUICKSTART.md                      # Quick start guide
├── SETUP.md                           # Installation and setup
├── ARCHITECTURE.md                    # System architecture overview
│
├── backend/                           # Backend documentation
│   ├── API.md                         # API endpoints reference
│   ├── CONFIGURATION.md               # Backend configuration
│   ├── SERVICES.md                    # Service layer documentation
│   └── DATABASE.md                    # Database schema and migrations
│
├── frontend/                          # Frontend documentation
│   ├── STRUCTURE.md                   # Folder structure and organization
│   ├── ARCHITECTURE.md                # Frontend architecture
│   ├── STYLING.md                     # Tailwind CSS styling guide
│   ├── COMPONENTS.md                  # Component documentation
│   └── MODELS.md                      # Data models and interfaces
│
├── deployment/                        # Deployment guides
│   ├── DOCKER.md                      # Docker setup and deployment
│   ├── PRODUCTION.md                  # Production deployment
│   └── TROUBLESHOOTING.md             # Troubleshooting guide
│
└── development/                       # Development guides
    ├── CONTRIBUTING.md                # Contributing guidelines
    ├── TESTING.md                     # Testing strategies
    └── DEBUGGING.md                   # Debugging guide
```

## 🚀 Quick Links

### Getting Started
- **[Quick Start](./QUICKSTART.md)** - Get up and running in 5 minutes
- **[Setup Guide](./SETUP.md)** - Detailed installation instructions
- **[Architecture Overview](./ARCHITECTURE.md)** - System design and components

### Backend
- **[API Reference](./backend/API.md)** - All API endpoints
- **[Configuration](./backend/CONFIGURATION.md)** - Backend settings
- **[Services](./backend/SERVICES.md)** - Service layer details
- **[Database](./backend/DATABASE.md)** - Schema and migrations

### Frontend
- **[Folder Structure](./frontend/STRUCTURE.md)** - Project organization
- **[Architecture](./frontend/ARCHITECTURE.md)** - Frontend design
- **[Styling Guide](./frontend/STYLING.md)** - Tailwind CSS reference
- **[Components](./frontend/COMPONENTS.md)** - Component documentation
- **[Models](./frontend/MODELS.md)** - Data models and interfaces

### Deployment
- **[Docker Setup](./deployment/DOCKER.md)** - Docker configuration
- **[Production Deployment](./deployment/PRODUCTION.md)** - Deploy to production
- **[Troubleshooting](./deployment/TROUBLESHOOTING.md)** - Common issues

### Development
- **[Contributing](./development/CONTRIBUTING.md)** - How to contribute
- **[Testing](./development/TESTING.md)** - Testing strategies
- **[Debugging](./development/DEBUGGING.md)** - Debug techniques

## 📋 Features

### Core Features
- ✅ Job ingestion from multiple sources (WhatsApp, Email, Manual)
- ✅ Automatic job classification and data extraction
- ✅ OCR support for image-based job postings
- ✅ Smart application decision engine
- ✅ Multi-channel message generation (WhatsApp, Email)
- ✅ Template management system
- ✅ Email integration

### Technology Stack

**Backend**
- .NET Core 8.0
- Entity Framework Core
- SQL Server
- Clean Architecture

**Frontend**
- Angular 17
- TypeScript
- Tailwind CSS
- RxJS

**Infrastructure**
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Azure/AWS ready

## 🏗️ Architecture

The system follows **Clean Architecture** principles with clear separation of concerns:

```
┌─────────────────────────────────────┐
│      Frontend (Angular 17)          │
│  - Dashboard                        │
│  - Template Management              │
│  - Tailwind CSS Styling             │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      API Layer (ASP.NET Core)       │
│  - V2 REST API                      │
│  - Job endpoints                    │
│  - Template endpoints               │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Application Layer                 │
│  - Job Processing Service           │
│  - Classification Service           │
│  - Extraction Service               │
│  - Message Generation Service       │
│  - Email Service                    │
│  - OCR Service                      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Domain Layer                      │
│  - Job Entity                       │
│  - Template Entity                  │
│  - Business Rules                   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Infrastructure Layer              │
│  - Database (SQL Server)            │
│  - Repositories                     │
│  - External Services                │
└─────────────────────────────────────┘
```

## 🐳 Docker

The application is fully containerized:

```bash
# Build and run with Docker Compose
docker-compose up -d

# Access the application
# Frontend: http://localhost:4200
# Backend: http://localhost:5000
# API Docs: http://localhost:5000/swagger
```

See **[Docker Setup](./deployment/DOCKER.md)** for detailed instructions.

## 📦 Project Structure

```
JobTrackingSystem/
├── docs/                              # Documentation (this folder)
├── Backend/                           # .NET Core backend
│   ├── src/
│   │   ├── JobTrackingSystem.API/
│   │   ├── JobTrackingSystem.Application/
│   │   ├── JobTrackingSystem.Domain/
│   │   └── JobTrackingSystem.Infrastructure/
│   └── JobTrackingSystem.sln
├── Frontend/                          # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── components/
│   │   └── styles.scss
│   └── package.json
├── docker-compose.yml                 # Docker Compose configuration
├── Dockerfile.backend                 # Backend Docker image
├── Dockerfile.frontend                # Frontend Docker image
└── README.md                          # Root README
```

## 🔧 Development Setup

### Prerequisites
- .NET 8.0 SDK
- Node.js 18+
- Docker & Docker Compose (optional)
- SQL Server (or use Docker)

### Quick Start

```bash
# Backend
cd Backend
dotnet restore
dotnet build
dotnet run --project src/JobTrackingSystem.API

# Frontend (in new terminal)
cd Frontend
npm install
npm start
```

Access the application at `http://localhost:4200`

## 📖 Key Concepts

### Job Processing Flow
1. User submits job (text, image, or both)
2. System extracts data using OCR if needed
3. Job is classified into category
4. Template is matched based on category
5. Message is generated for selected channel
6. User can send via WhatsApp, Email, or Manual review

### Multi-Channel Support
- **WhatsApp**: Direct message link generation
- **Email**: Formatted email with subject and body
- **Manual**: For review before sending

### Template System
- Create templates per job category
- Define message templates with placeholders
- Define email templates with subject and body
- Reuse across multiple jobs

## 🧪 Testing

The system includes comprehensive testing:

- **Unit Tests**: Service and component logic
- **Integration Tests**: API endpoints
- **E2E Tests**: User workflows

See **[Testing Guide](./development/TESTING.md)** for details.

## 🚀 Deployment

### Development
```bash
npm start              # Frontend
dotnet run            # Backend
```

### Docker
```bash
docker-compose up -d
```

### Production
See **[Production Deployment](./deployment/PRODUCTION.md)** for cloud deployment options.

## 📞 Support

### Documentation
- Check the relevant documentation file in this folder
- See **[Troubleshooting](./deployment/TROUBLESHOOTING.md)** for common issues

### Common Issues
- **Port already in use**: Change port in configuration
- **Database connection**: Verify SQL Server is running
- **CORS errors**: Check backend CORS configuration
- **Build errors**: Clear node_modules and reinstall

## 📝 Contributing

See **[Contributing Guidelines](./development/CONTRIBUTING.md)** for how to contribute to this project.

## 📄 License

This project is licensed under the MIT License.

## 🎯 Next Steps

1. **Read [Quick Start](./QUICKSTART.md)** - Get the app running
2. **Review [Architecture](./ARCHITECTURE.md)** - Understand the design
3. **Explore [Backend Docs](./backend/)** - Learn the API
4. **Explore [Frontend Docs](./frontend/)** - Learn the UI
5. **Check [Deployment](./deployment/)** - Deploy to production

---

**Last Updated**: April 2026  
**Version**: 2.0 (Multi-Channel Support)
