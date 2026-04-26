# Job Tracking System

A comprehensive job application tracking system with automated message generation, OCR processing, and multi-channel support (WhatsApp, Email).

## Quick Start

### Prerequisites
- .NET 8 SDK
- Node.js 18+
- Docker & Docker Compose (optional)
- SQL Server or compatible database

### Local Development

**Backend:**
```bash
cd Backend
dotnet restore
dotnet run --project src/JobTrackingSystem.API
```
Backend runs on `http://localhost:5001`

**Frontend:**
```bash
cd Frontend
npm install
npm start
```
Frontend runs on `http://localhost:4200`

### Docker

```bash
docker-compose up
```

## Project Structure

```
JobTrackingSystem/
├── Backend/              # .NET 8 API
│   └── src/
│       ├── JobTrackingSystem.API/
│       ├── JobTrackingSystem.Application/
│       ├── JobTrackingSystem.Domain/
│       └── JobTrackingSystem.Infrastructure/
├── Frontend/             # Angular 19 App
│   └── src/
│       └── app/
├── docs/                 # Documentation
├── docker-compose.yml
└── README.md
```

## Documentation

- [Setup Guide](docs/SETUP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [API Reference](docs/API_REFERENCE.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Quick Start](docs/QUICKSTART.md)

## Features

- ✅ Job message extraction and processing
- ✅ OCR support for image-based job postings
- ✅ Automated message generation
- ✅ Multi-channel support (WhatsApp, Email)
- ✅ Template management
- ✅ Email delivery integration
- ✅ Responsive UI with Tailwind CSS
- ✅ Docker support

## API Endpoints

**Jobs:**
- `POST /api/v2/jobs` - Create job
- `GET /api/v2/jobs` - List all jobs
- `GET /api/v2/jobs/{id}` - Get job details
- `GET /api/v2/jobs/{id}/ocr-preview` - Get OCR preview
- `POST /api/v2/jobs/{id}/send-email` - Send email
- `GET /api/v2/jobs/channel/{channel}` - Filter by channel

**Templates:**
- `POST /api/templates` - Create template
- `GET /api/templates` - List templates
- `GET /api/templates/{id}` - Get template
- `PUT /api/templates/{id}` - Update template
- `DELETE /api/templates/{id}` - Delete template

## Configuration

Copy `.env.example` to `.env` and configure:
```
DATABASE_CONNECTION_STRING=...
SMTP_HOST=...
SMTP_PORT=...
```

## License

MIT
