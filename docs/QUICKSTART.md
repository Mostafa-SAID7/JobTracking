# Quick Start Guide

## 5-Minute Setup

### Backend (Windows)

1. **Open PowerShell in Backend folder**
   ```powershell
   cd Backend
   ```

2. **Update Database Connection**
   - Edit `src/JobTrackingSystem.API/appsettings.json`
   - Change connection string if needed (LocalDB is default)

3. **Create Database**
   ```powershell
   cd src/JobTrackingSystem.API
   dotnet ef database update
   ```

4. **Run API**
   ```powershell
   dotnet run
   ```
   - API available at: `https://localhost:5001`
   - Swagger UI: `https://localhost:5001/swagger`

### Frontend (Windows)

1. **Open PowerShell in Frontend folder**
   ```powershell
   cd Frontend
   ```

2. **Install Dependencies**
   ```powershell
   npm install
   ```

3. **Start Development Server**
   ```powershell
   npm start
   ```
   - App available at: `http://localhost:4200`

## Testing the System

### 1. Create a Template (via Swagger or UI)

**POST** `/api/templates`
```json
{
  "category": "Backend",
  "messageTemplate": "Hi, I'm interested in the {JobTitle} position. I have experience with .NET and Web APIs. Check my work at {Github} and {Portfolio}. Contact: {Email}",
  "cvPath": "/cvs/backend_cv.pdf",
  "githubUrl": "https://github.com/yourname",
  "portfolioUrl": "https://yourportfolio.com",
  "email": "your@email.com"
}
```

### 2. Submit a Job Message

Go to Dashboard and paste a sample job message:
```
Looking for .NET Developer
We need an experienced .NET developer for our Web API project.
Contact: +1234567890
```

### 3. View Generated Message

- System classifies as "Backend"
- Extracts phone number
- Generates personalized message
- Provides WhatsApp link

### 4. Send via WhatsApp

Click "Send via WhatsApp" button to open WhatsApp with pre-filled message.

## Sample Job Messages

### Backend Job
```
Hiring: Senior .NET Developer
We're looking for a .NET expert with ASP.NET Core experience.
Web API development required.
Contact: +1234567890
```

### Frontend Job
```
Frontend Developer Needed
React and Angular experience required.
TypeScript mandatory.
Call: +9876543210
```

### Fullstack Job
```
Full Stack Developer
Fullstack position - both backend and frontend skills needed.
Phone: +1111111111
```

## Troubleshooting

### Backend Won't Start
- Check .NET 8.0 is installed: `dotnet --version`
- Verify SQL Server is running
- Check connection string in appsettings.json

### Frontend Won't Load
- Ensure backend is running on port 5001
- Check browser console for CORS errors
- Verify API URL in services

### Database Issues
- Delete database and run migrations again
- Check SQL Server connection string
- Verify LocalDB is installed: `sqllocaldb info`

## Project Structure Quick Reference

```
Backend/
├── src/
│   ├── JobTrackingSystem.API/          ← Start here (Program.cs)
│   ├── JobTrackingSystem.Application/  ← Business logic
│   ├── JobTrackingSystem.Domain/       ← Entities & interfaces
│   └── JobTrackingSystem.Infrastructure/ ← Database & repos

Frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/              ← Main UI
│   │   │   └── template-management/    ← Template CRUD
│   │   └── services/
│   │       ├── job.service.ts          ← Job API calls
│   │       └── template.service.ts     ← Template API calls
│   └── index.html
```

## Key Files to Modify

### Add New Classification Keywords
- File: `Backend/src/JobTrackingSystem.Application/Services/JobClassificationService.cs`
- Update `CategoryKeywords` dictionary

### Customize Message Templates
- Use Dashboard UI or API
- Placeholders: `{JobTitle}`, `{Category}`, `{Github}`, `{Portfolio}`, `{Email}`

### Change API Port
- File: `Backend/src/JobTrackingSystem.API/Properties/launchSettings.json`
- Update `applicationUrl`

### Change Frontend Port
- File: `Frontend/angular.json`
- Update `serve` configuration

## Next Steps

1. ✅ Set up database
2. ✅ Create templates for each category
3. ✅ Test with sample job messages
4. ✅ Customize message templates
5. ✅ Deploy to production

## Production Checklist

- [ ] Update connection string for production database
- [ ] Configure CORS for production domain
- [ ] Set up HTTPS certificates
- [ ] Enable logging and monitoring
- [ ] Create database backups
- [ ] Test WhatsApp link generation
- [ ] Deploy backend to cloud
- [ ] Deploy frontend to CDN
- [ ] Set up CI/CD pipeline
- [ ] Monitor application health

## Support

For issues or questions:
1. Check logs in backend console
2. Check browser console (F12)
3. Review API responses in Network tab
4. Check database for data integrity
