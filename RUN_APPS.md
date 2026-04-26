# Running the Job Tracking System

## Prerequisites
- .NET 8 SDK installed
- Node.js 18+ installed
- SQL Server LocalDB or compatible database

## Backend Setup & Run

```bash
cd Backend

# Restore NuGet packages
dotnet restore

# Run the API (runs on http://localhost:5001)
dotnet run --project src/JobTrackingSystem.API
```

The backend will start on `http://localhost:5001` with Swagger UI at `http://localhost:5001/swagger`

## Frontend Setup & Run

```bash
cd Frontend

# Install npm dependencies
npm install

# Start the development server (runs on http://localhost:4200)
npm start
```

The frontend will start on `http://localhost:4200`

## Access the Application

Once both are running:
- Frontend: http://localhost:4200
- Backend API: http://localhost:5001
- Swagger Docs: http://localhost:5001/swagger

## Using Docker

```bash
docker-compose up
```

This will start both backend and frontend in containers.

## Database

The backend uses LocalDB by default. Connection string in `Backend/src/JobTrackingSystem.API/appsettings.json`:
```
Server=(localdb)\\mssqllocaldb;Database=JobTrackingSystemDb;Trusted_Connection=true;
```

For production, update the connection string to your SQL Server instance.
