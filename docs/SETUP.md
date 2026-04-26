# Installation and Setup Guide

## Prerequisites

### Backend
- .NET 8.0 SDK ([Download](https://dotnet.microsoft.com/download/dotnet/8.0))
- SQL Server 2019+ or LocalDB
- Visual Studio 2022 or VS Code

### Frontend
- Node.js 18+ ([Download](https://nodejs.org/))
- npm 9+ (comes with Node.js)

### Optional
- Docker & Docker Compose
- Git

## Backend Setup

### 1. Clone or Extract Project

```bash
cd JobTrackingSystem/Backend
```

### 2. Restore Dependencies

```bash
dotnet restore
```

### 3. Configure Database Connection

Edit `src/JobTrackingSystem.API/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=JobTrackingSystemDb;Trusted_Connection=true;"
  }
}
```

**Connection String Options:**
- **LocalDB**: `Server=(localdb)\mssqllocaldb;Database=JobTrackingSystemDb;Trusted_Connection=true;`
- **SQL Server Express**: `Server=.\SQLEXPRESS;Database=JobTrackingSystemDb;Trusted_Connection=true;`
- **Azure SQL**: `Server=tcp:your-server.database.windows.net,1433;Initial Catalog=JobTrackingSystemDb;Persist Security Info=False;User ID=username;Password=password;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`

### 4. Create Database

```bash
cd src/JobTrackingSystem.API
dotnet ef database update
```

This will:
- Create the database
- Run all migrations
- Create tables and schema

### 5. Build Project

```bash
cd ../..
dotnet build
```

### 6. Run API

```bash
dotnet run --project src/JobTrackingSystem.API
```

The API will start on:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger UI: `https://localhost:5001/swagger`

## Frontend Setup

### 1. Navigate to Frontend

```bash
cd JobTrackingSystem/Frontend
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages from `package.json`.

### 3. Configure API URL (Optional)

If backend is on a different URL, update `src/app/services/job.service.ts`:

```typescript
private apiUrl = 'http://localhost:5000/api';
```

### 4. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:4200`

## Docker Setup (Optional)

### Prerequisites
- Docker Desktop installed
- Docker Compose

### 1. Build Images

```bash
docker-compose build
```

### 2. Start Services

```bash
docker-compose up -d
```

### 3. Access Application

- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:5000`
- Swagger UI: `http://localhost:5000/swagger`

### 4. Stop Services

```bash
docker-compose down
```

## Verify Installation

### Backend Verification

1. Open browser and go to `https://localhost:5001/swagger`
2. You should see Swagger UI with API endpoints
3. Try GET `/api/templates` - should return empty array `[]`

### Frontend Verification

1. Open browser and go to `http://localhost:4200`
2. You should see the Job Tracking Dashboard
3. Check browser console (F12) for any errors

### Database Verification

1. Open SQL Server Management Studio or Azure Data Studio
2. Connect to your SQL Server instance
3. Verify database `JobTrackingSystemDb` exists
4. Check tables: `Jobs`, `Templates`

## Troubleshooting

### Backend Issues

**Error: "Unable to connect to database"**
- Verify SQL Server is running
- Check connection string in appsettings.json
- Verify database name is correct

**Error: "dotnet command not found"**
- Install .NET 8.0 SDK
- Verify installation: `dotnet --version`

**Error: "Port 5001 already in use"**
- Change port in `Properties/launchSettings.json`
- Or kill process using port: `netstat -ano | findstr :5001`

### Frontend Issues

**Error: "Cannot find module"**
- Delete `node_modules` folder
- Run `npm install` again

**Error: "CORS error in console"**
- Verify backend is running
- Check API URL in services
- Verify CORS is enabled in backend

**Error: "npm command not found"**
- Install Node.js
- Verify installation: `node --version`

### Database Issues

**Error: "LocalDB not found"**
- Install SQL Server LocalDB
- Or use SQL Server Express instead

**Error: "Migration failed"**
- Delete database and try again
- Check migration files in `Infrastructure/Migrations/`

## Environment Configuration

### Development

Backend automatically uses `appsettings.Development.json` when running with:
```bash
dotnet run
```

Frontend uses development configuration from `angular.json`.

### Production

Create `appsettings.Production.json`:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "your-production-connection-string"
  }
}
```

Build frontend for production:
```bash
npm run build
```

## Next Steps

1. ✅ Backend running on `https://localhost:5001`
2. ✅ Frontend running on `http://localhost:4200`
3. ✅ Database created and accessible
4. Read [Quick Start](./QUICKSTART.md) to test the system
5. Read [Configuration](./backend/CONFIGURATION.md) for advanced setup

## Support

For detailed configuration options, see:
- [Backend Configuration](./backend/CONFIGURATION.md)
- [Frontend Configuration](./frontend/STRUCTURE.md)
- [Docker Setup](./deployment/DOCKER.md)
