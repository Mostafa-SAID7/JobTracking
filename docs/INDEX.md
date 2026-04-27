# Documentation Index

## All Docs

| File | Description |
|------|-------------|
| [QUICKSTART.md](QUICKSTART.md) | 5-minute setup and first test |
| [SETUP.md](SETUP.md) | Full installation guide (backend, frontend, Docker) |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Clean Architecture layers, data flow, design patterns |
| [API_REFERENCE.md](API_REFERENCE.md) | All endpoints, request/response examples, placeholders |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Docker, Azure, and AWS deployment |
| [WHATSAPP.md](WHATSAPP.md) | WhatsApp Business API webhook setup |

## By Role

**New developer** → [QUICKSTART.md](QUICKSTART.md) → [ARCHITECTURE.md](ARCHITECTURE.md) → [API_REFERENCE.md](API_REFERENCE.md)

**DevOps / infra** → [DEPLOYMENT.md](DEPLOYMENT.md)

**API consumer** → [API_REFERENCE.md](API_REFERENCE.md)

**WhatsApp integration** → [WHATSAPP.md](WHATSAPP.md)

## Job Processing Flow

```
Raw message / image
  → OCR (if image)
  → Classification (Backend / Frontend / Fullstack)
  → Data extraction (phone, title, email)
  → Template matching by category
  → Message generation with placeholders
  → WhatsApp link / Email / Manual
```

## Application Channels

| Channel | How it works |
|---------|-------------|
| WhatsApp | Generates `wa.me` link with pre-filled message |
| Email | Sends via SMTP using email template |
| Manual | Displays generated message for manual copy/send |

## Common Tasks

**Add a new job category:**
1. Update `CategoryKeywords` in `JobClassificationService.cs`
2. Create a template for the new category via UI or API

**Change API or frontend port:**
- API: `Backend/src/JobTrackingSystem.API/Properties/launchSettings.json`
- Frontend: `Frontend/angular.json`

**Run database migrations:**
```bash
cd Backend/src/JobTrackingSystem.API
dotnet ef database update
```

**Deploy with Docker:**
```bash
docker-compose up --build
```
