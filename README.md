# 📋 Job Tracking System

A comprehensive job application tracking system with automated message generation, OCR processing, and multi-channel support (WhatsApp, Email).

---

## 🚀 Quick Start

**Prerequisites:** .NET 8 SDK · Node.js 18+ · SQL Server · Docker (optional)

```bash
# Backend
cd Backend
dotnet restore
dotnet run --project src/JobTrackingSystem.API
# → https://localhost:5001 · Swagger: https://localhost:5001/swagger

# Frontend (new terminal)
cd Frontend
npm install
npm start
# → http://localhost:4200
```

Or with Docker:

```bash
docker-compose up
```

---

## 📁 Project Structure

| Layer | Path | Description |
|-------|------|-------------|
| **Backend API** | `Backend/src/JobTrackingSystem.API/` | Controllers, Program.cs |
| **Backend Application** | `Backend/src/JobTrackingSystem.Application/` | Services, DTOs |
| **Backend Domain** | `Backend/src/JobTrackingSystem.Domain/` | Entities, interfaces |
| **Backend Infrastructure** | `Backend/src/JobTrackingSystem.Infrastructure/` | EF Core, repositories |
| **Frontend** | `Frontend/src/app/` | Angular components, services |
| **Documentation** | `docs/` | All guides and references |

Full details:
- [Backend Structure](docs/BACKEND_STRUCTURE.md)
- [Frontend Structure](docs/FRONTEND_STRUCTURE.md)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📝 **Job Classification** | Auto-detects Backend / Frontend / Fullstack |
| 📸 **OCR Support** | Extract data from image-based job postings |
| 🤖 **Message Generation** | Automated personalized messages with templates |
| 💬 **WhatsApp** | Generate direct WhatsApp links |
| 📧 **Email** | Send automated emails via SMTP |
| 📋 **Manual Review** | Preview and manually send messages |
| 🎨 **Responsive UI** | Tailwind CSS styling |
| 🐳 **Docker Ready** | Full containerization |

Full details: [docs/FEATURES.md](docs/FEATURES.md)

---

## 🔌 API

**Base URL:** `https://localhost:5001/api/v2`

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/jobs` | Create and process a job |
| `GET` | `/jobs` | List all jobs |
| `GET` | `/jobs/{id}` | Get job by ID |
| `GET` | `/jobs/{id}/ocr-preview` | Get OCR preview |
| `POST` | `/jobs/{id}/send-email` | Send email for job |
| `GET` | `/jobs/channel/{channel}` | Filter by channel |

### Templates

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/templates` | Create template |
| `GET` | `/templates` | List templates |
| `GET` | `/templates/{id}` | Get template |
| `PUT` | `/templates/{id}` | Update template |
| `DELETE` | `/templates/{id}` | Delete template |

Full details: [docs/API_REFERENCE.md](docs/API_REFERENCE.md)

---

## ⚙️ Configuration

Copy `.env.example` to `.env`:

```env
MSSQL_SA_PASSWORD=YourPassword123!
ConnectionStrings__DefaultConnection=Server=sqlserver,1433;Database=JobTrackingSystemDb;...
SMTP_HOST=smtp.example.com
SMTP_PORT=587
```

---

## 📚 Documentation

| File | Description |
|------|-------------|
| [docs/QUICKSTART.md](docs/QUICKSTART.md) | 5-minute setup and first test |
| [docs/SETUP.md](docs/SETUP.md) | Full installation guide |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Clean Architecture layers |
| [docs/API_REFERENCE.md](docs/API_REFERENCE.md) | Full API reference |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Docker, Azure, AWS |
| [docs/WHATSAPP.md](docs/WHATSAPP.md) | WhatsApp Business API setup |
| [docs/BACKEND_STRUCTURE.md](docs/BACKEND_STRUCTURE.md) | Backend folder structure |
| [docs/FRONTEND_STRUCTURE.md](docs/FRONTEND_STRUCTURE.md) | Frontend folder structure |

---

## 🤝 Contributing

See [.github/CONTRIBUTING.md](.github/CONTRIBUTING.md) for branch naming, commit conventions, and PR guidelines.

---

## 🔒 Security

Report vulnerabilities privately — see [SECURITY.md](SECURITY.md).

---

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md).

---

## 📄 License

MIT — see [LICENSE](LICENSE).
