# Quick Start Guide

Get the system running and test it in 5 minutes.

## 1. Start the Backend

```bash
cd Backend
dotnet restore
cd src/JobTrackingSystem.API
dotnet ef database update
dotnet run
```

API: `https://localhost:5001` · Swagger: `https://localhost:5001/swagger`

## 2. Start the Frontend

```bash
cd Frontend
npm install
npm start
```

App: `http://localhost:4200`

## 3. Create a Template

**POST** `https://localhost:5001/api/templates` (via Swagger or UI):

```json
{
  "category": "Backend",
  "messageTemplate": "Hi, I'm interested in the {JobTitle} position. Check my work at {Github} and {Portfolio}. Contact: {Email}",
  "emailSubjectTemplate": "Application for {JobTitle}",
  "emailBodyTemplate": "Dear Hiring Manager,\n\nI am interested in the {JobTitle} position...",
  "cvPath": "/cvs/backend_cv.pdf",
  "githubUrl": "https://github.com/yourname",
  "portfolioUrl": "https://yourportfolio.com",
  "email": "your@email.com"
}
```

## 4. Submit a Job Message

Go to the Dashboard and paste a job message:

```
Hiring: Senior .NET Developer
We need an experienced .NET developer for our Web API project.
Contact: +1234567890
```

The system will:
- Classify as "Backend"
- Extract the phone number
- Generate a personalized message using your template
- Provide a WhatsApp link and email option

## Sample Job Messages

**Backend:**
```
Senior .NET Developer needed. ASP.NET Core experience required. Contact: +1234567890
```

**Frontend:**
```
Frontend Developer Needed. React and Angular experience required. Call: +9876543210
```

**Fullstack:**
```
Full Stack Developer position. Both backend and frontend skills needed. Phone: +1111111111
```

## Template Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{JobTitle}` | Extracted job title |
| `{Category}` | Classified category |
| `{Github}` | GitHub URL from template |
| `{Portfolio}` | Portfolio URL from template |
| `{Email}` | Email from template |

## Key Files to Customize

| What | File |
|------|------|
| Classification keywords | `Backend/src/JobTrackingSystem.Application/Services/JobClassificationService.cs` |
| API port | `Backend/src/JobTrackingSystem.API/Properties/launchSettings.json` |
| Frontend API URL | `Frontend/src/app/services/job.service.ts` |
| Frontend port | `Frontend/angular.json` |

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Backend won't start | Check `dotnet --version` (need 8.0+), verify SQL Server is running |
| Database error | Run `dotnet ef database update` from the API project folder |
| Frontend CORS error | Ensure backend is running, check API URL in `job.service.ts` |
| Port in use | Change port in `launchSettings.json` or `angular.json` |

For detailed setup, see [SETUP.md](SETUP.md).
