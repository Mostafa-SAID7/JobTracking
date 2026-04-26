# Deployment Guide

## Docker Deployment

### Prerequisites
- Docker Desktop installed
- Docker Compose installed
- 4GB RAM minimum

### Quick Start with Docker Compose

1. **Clone/Navigate to project root**
   ```bash
   cd JobTrackingSystem
   ```

2. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: https://localhost:5001
   - Swagger UI: https://localhost:5001/swagger

4. **Stop services**
   ```bash
   docker-compose down
   ```

### Docker Compose Services

#### SQL Server
- **Container**: jobtracking-db
- **Port**: 1433
- **Username**: sa
- **Password**: YourPassword123!
- **Database**: JobTrackingSystemDb

#### Backend API
- **Container**: jobtracking-api
- **Port**: 5001
- **Environment**: Production
- **Depends on**: SQL Server

#### Frontend
- **Container**: jobtracking-ui
- **Port**: 4200
- **Depends on**: Backend API

### Building Individual Docker Images

#### Backend Only
```bash
docker build -f Dockerfile.backend -t jobtracking-api:latest .
```

#### Frontend Only
```bash
docker build -f Dockerfile.frontend -t jobtracking-ui:latest .
```

### Running Individual Containers

#### Backend
```bash
docker run -d \
  -p 5001:5001 \
  -e ConnectionStrings__DefaultConnection="Server=sqlserver,1433;Database=JobTrackingSystemDb;User Id=sa;Password=YourPassword123!;TrustServerCertificate=true;" \
  --name jobtracking-api \
  jobtracking-api:latest
```

#### Frontend
```bash
docker run -d \
  -p 4200:4200 \
  -e API_URL="https://localhost:5001" \
  --name jobtracking-ui \
  jobtracking-ui:latest
```

## Azure Deployment

### Backend (App Service)

1. **Create App Service**
   ```bash
   az appservice plan create \
     --name jobtracking-plan \
     --resource-group myResourceGroup \
     --sku B2 --is-linux
   
   az webapp create \
     --resource-group myResourceGroup \
     --plan jobtracking-plan \
     --name jobtracking-api \
     --runtime "DOTNETCORE|8.0"
   ```

2. **Configure Connection String**
   ```bash
   az webapp config appsettings set \
     --resource-group myResourceGroup \
     --name jobtracking-api \
     --settings ConnectionStrings__DefaultConnection="Server=tcp:yourserver.database.windows.net,1433;Initial Catalog=JobTrackingSystemDb;Persist Security Info=False;User ID=sqladmin;Password=YourPassword123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
   ```

3. **Deploy Code**
   ```bash
   dotnet publish -c Release -o ./publish
   cd publish
   zip -r ../app.zip .
   az webapp deployment source config-zip \
     --resource-group myResourceGroup \
     --name jobtracking-api \
     --src ../app.zip
   ```

### Frontend (Static Web Apps)

1. **Create Static Web App**
   ```bash
   az staticwebapp create \
     --name jobtracking-ui \
     --resource-group myResourceGroup \
     --source https://github.com/yourrepo/JobTrackingSystem \
     --location westus2 \
     --branch main
   ```

2. **Configure API Endpoint**
   - Update `src/app/services/job.service.ts`
   - Set `apiUrl` to production backend URL

3. **Deploy**
   - Push to main branch
   - GitHub Actions automatically deploys

### Database (Azure SQL)

1. **Create SQL Server**
   ```bash
   az sql server create \
     --name jobtracking-server \
     --resource-group myResourceGroup \
     --admin-user sqladmin \
     --admin-password YourPassword123!
   ```

2. **Create Database**
   ```bash
   az sql db create \
     --resource-group myResourceGroup \
     --server jobtracking-server \
     --name JobTrackingSystemDb \
     --service-objective S0
   ```

3. **Run Migrations**
   ```bash
   dotnet ef database update \
     --connection "Server=tcp:jobtracking-server.database.windows.net,1433;Initial Catalog=JobTrackingSystemDb;Persist Security Info=False;User ID=sqladmin;Password=YourPassword123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
   ```

## AWS Deployment

### Backend (EC2 or ECS)

#### Using ECS
1. **Create ECR Repository**
   ```bash
   aws ecr create-repository --repository-name jobtracking-api
   ```

2. **Push Docker Image**
   ```bash
   docker build -f Dockerfile.backend -t jobtracking-api:latest .
   docker tag jobtracking-api:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/jobtracking-api:latest
   docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/jobtracking-api:latest
   ```

3. **Create ECS Task Definition**
   - Reference ECR image
   - Set environment variables
   - Configure port mappings

4. **Create ECS Service**
   - Launch tasks
   - Configure load balancer
   - Set auto-scaling

### Frontend (S3 + CloudFront)

1. **Build Production Bundle**
   ```bash
   cd Frontend
   npm run build
   ```

2. **Upload to S3**
   ```bash
   aws s3 sync dist/ s3://jobtracking-ui-bucket/
   ```

3. **Create CloudFront Distribution**
   - Origin: S3 bucket
   - Cache behavior: Aggressive caching
   - SSL certificate: ACM

### Database (RDS)

1. **Create RDS Instance**
   ```bash
   aws rds create-db-instance \
     --db-instance-identifier jobtracking-db \
     --db-instance-class db.t3.micro \
     --engine sqlserver-ex \
     --master-username admin \
     --master-user-password YourPassword123!
   ```

2. **Configure Security Group**
   - Allow inbound on port 1433
   - Restrict to API security group

## Environment Configuration

### Backend Environment Variables

```env
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=https://+:5001
ConnectionStrings__DefaultConnection=Server=...;Database=JobTrackingSystemDb;...
Logging__LogLevel__Default=Information
Logging__LogLevel__Microsoft=Warning
```

### Frontend Environment Variables

```env
API_URL=https://api.yourdomain.com
ENVIRONMENT=production
```

## SSL/TLS Configuration

### Self-Signed Certificate (Development)
```bash
dotnet dev-certs https --trust
```

### Production Certificate (Let's Encrypt)
```bash
# Using Certbot
certbot certonly --standalone -d api.yourdomain.com
```

## Database Migrations in Production

### Automated Migrations
```csharp
// In Program.cs
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<JobTrackingDbContext>();
    db.Database.Migrate();
}
```

### Manual Migrations
```bash
dotnet ef database update --connection "your-connection-string"
```

## Monitoring & Logging

### Application Insights (Azure)
```csharp
builder.Services.AddApplicationInsightsTelemetry();
```

### Serilog (All Platforms)
```csharp
builder.Host.UseSerilog((context, config) =>
    config.WriteTo.Console()
          .WriteTo.File("logs/app-.txt", rollingInterval: RollingInterval.Day)
);
```

## Backup & Recovery

### Database Backup
```bash
# Azure SQL
az sql db export \
  --resource-group myResourceGroup \
  --server jobtracking-server \
  --name JobTrackingSystemDb \
  --admin-user sqladmin \
  --admin-password YourPassword123! \
  --storage-key "key" \
  --storage-uri "https://storage.blob.core.windows.net/backups/db.bacpac"
```

### Restore from Backup
```bash
az sql db import \
  --resource-group myResourceGroup \
  --server jobtracking-server \
  --name JobTrackingSystemDb \
  --admin-user sqladmin \
  --admin-password YourPassword123! \
  --storage-key "key" \
  --storage-uri "https://storage.blob.core.windows.net/backups/db.bacpac"
```

## Performance Tuning

### Database Optimization
- Create indexes on frequently queried columns
- Monitor query performance
- Archive old data

### API Optimization
- Enable response compression
- Implement caching headers
- Use async/await throughout

### Frontend Optimization
- Enable gzip compression
- Minify and bundle code
- Use CDN for static assets

## Troubleshooting

### Container Won't Start
```bash
docker logs container-name
```

### Database Connection Issues
```bash
# Test connection
sqlcmd -S server -U user -P password
```

### API Not Responding
```bash
# Check logs
docker logs jobtracking-api

# Check health
curl https://localhost:5001/health
```

### Frontend Can't Connect to API
- Check CORS configuration
- Verify API URL in environment
- Check network connectivity
- Review browser console errors
