# ⚙️ Installation & Setup Guide

This guide provides a comprehensive walkthrough for setting up the Job Tracking System on your local machine or server.

---

## 📋 Prerequisites

Ensure you have the following installed before proceeding:

### Required
- **.NET 8.0 SDK**: [Download here](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 18+**: [Download here](https://nodejs.org/)
- **SQL Server**: LocalDB (included with Visual Studio) or SQL Server Express.

### Optional
- **Docker Desktop**: For containerized deployment.
- **VS Code / Visual Studio 2022**: Recommended IDEs.

---

## 🖥️ Backend Setup (.NET)

### 1. Restore & Build
```bash
cd Backend
dotnet restore
dotnet build
```

### 2. Configure Database
Update `Backend/src/JobTrackingSystem.API/appsettings.json` with your connection string:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=JobTrackingSystemDb;Trusted_Connection=true;"
}
```

### 3. Initialize Database
Run the migrations to create the schema:
```bash
cd src/JobTrackingSystem.API
dotnet ef database update
```

### 4. Run API
```bash
dotnet run
```
> **Endpoints**:  
> 🌍 **API**: `https://localhost:5001`  
> 📖 **Swagger**: `https://localhost:5001/swagger`

---

## 🎨 Frontend Setup (Angular)

### 1. Install Dependencies
```bash
cd Frontend
npm install
```

### 2. Configure Environment (Optional)
If your API is running on a custom port, update `src/app/services/job.service.ts`:
```typescript
private apiUrl = 'https://localhost:5001/api';
```

### 3. Start Development Server
```bash
npm start
```
> 🌍 **App URL**: `http://localhost:4200`

---

## 🐳 Docker Deployment

To run the entire stack (API, Frontend, and SQL Server) in containers:

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f
```

---

## 🛠️ Troubleshooting

### ❌ Backend Issues
| Problem | Solution |
| :--- | :--- |
| **Database Connection Failed** | Verify SQL Server is running and your connection string is correct. |
| **Migrations Error** | Ensure `dotnet-ef` tool is installed: `dotnet tool install --global dotnet-ef`. |
| **Port 5001 in Use** | Kill the process or change the port in `launchSettings.json`. |

### ❌ Frontend Issues
| Problem | Solution |
| :--- | :--- |
| **CORS Error** | Ensure the Backend is running and allows requests from `http://localhost:4200`. |
| **Node Modules Missing** | Run `npm install` again. If it fails, delete `node_modules` and `package-lock.json` and retry. |
| **White Screen** | Check browser console (F12) for JS errors or API connection failures. |

---

## 📚 Next Steps

- ⚡ Got it running? Try the [Quick Start](QUICKSTART.md).
- 📐 Want to understand the code? Check the [Architecture](ARCHITECTURE.md).
- 🚢 Ready for production? See [Deployment Guide](DEPLOYMENT.md).

---

<p align="center">
  <a href="INDEX.md">← Back to Index</a>
</p>
