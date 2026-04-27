# 🚀 Deployment Guide

Deploy the **Job Tracking System** to various environments using Docker, Azure, or AWS.

---

## 🐳 Docker Orchestration

The recommended way to deploy is using **Docker Compose** for a seamless, multi-container setup.

### 📋 Prerequisites
- ✅ **Docker Desktop** (latest)
- ✅ **4GB RAM** minimum
- ✅ **Ports 4200 & 5001** available

### ⚡ Quick Start
1.  **Navigate to Root**: `cd JobTrackingSystem`
2.  **Spin Up Services**:
    ```bash
    docker-compose up --build -d
    ```
3.  **Access App**:
    - **UI**: [http://localhost:4200](http://localhost:4200)
    - **API**: [https://localhost:5001/swagger](https://localhost:5001/swagger)

---

## ☁️ Cloud Platforms

### 🟦 Microsoft Azure
Recommended for seamless .NET integration.

| Component | Service | Deployment Method |
| :--- | :--- | :--- |
| **Backend** | App Service (Linux) | `az webapp deployment` |
| **Frontend** | Static Web Apps | GitHub Actions (Auto) |
| **Database** | Azure SQL | Managed SQL Instance |

**Key Command (Migrations):**
```bash
dotnet ef database update --connection "your_azure_connection_string"
```

### 🟧 Amazon Web Services (AWS)
High-performance infrastructure scaling.

| Component | Service | Deployment Method |
| :--- | :--- | :--- |
| **Backend** | ECS (Fargate) | ECR Image Push |
| **Frontend** | S3 + CloudFront | `aws s3 sync` |
| **Database** | RDS (SQL Server) | Managed RDS Instance |

---

## 🔐 Environment Configuration

### 🖥️ Backend (.env)
```env
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings__DefaultConnection=Server=...;Database=JobTrackingSystemDb;...
WhatsApp__AccessToken=your_token
```

### 🎨 Frontend (environment.prod.ts)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com'
};
```

---

## 🛠️ Maintenance & Monitoring

- **Logs**: Access container logs via `docker logs jobtracking-api`.
- **Health**: Check status at `https://localhost:5001/health`.
- **SSL**: Production environments should use **Let's Encrypt** via Certbot or Cloudflare.

---

<p align="center">
  <a href="INDEX.md">← Back to Index</a>
</p>
