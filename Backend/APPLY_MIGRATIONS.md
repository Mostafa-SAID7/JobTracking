# Apply Entity Framework Migrations

Entity Framework Core handles database schema creation and updates through migrations. This is the proper way to manage your database with EF Core.

## Prerequisites

- Visual Studio with .NET 8 SDK installed
- SQL Server running and accessible
- Connection string configured in `appsettings.Development.json`

## Method 1: Using Package Manager Console (Recommended)

### Step 1: Open Package Manager Console

In Visual Studio:
1. Go to **Tools > NuGet Package Manager > Package Manager Console**
2. Or press: `Ctrl + ` (backtick)

### Step 2: Set Default Project

In the Package Manager Console dropdown, select:
```
JobTrackingSystem.Infrastructure
```

### Step 3: Apply Migrations

Run this command:
```powershell
Update-Database
```

This will:
1. Create the `JobTrackingSystemDb` database (if it doesn't exist)
2. Create all tables (Jobs, Templates)
3. Create indexes for performance
4. Record migration history in `__EFMigrationsHistory` table

### Step 4: Verify

You should see output like:
```
Build started...
Build succeeded.
Applying migration '20250101000000_InitialCreate'.
Done.
```

## Method 2: Using .NET CLI

### Step 1: Open Terminal/Command Prompt

Navigate to the Backend folder:
```bash
cd JobTrackingSystem/Backend
```

### Step 2: Apply Migrations

```bash
dotnet ef database update --project src/JobTrackingSystem.Infrastructure --startup-project src/JobTrackingSystem.API
```

## Method 3: Using Visual Studio (GUI)

### Step 1: Open SQL Server Object Explorer

In Visual Studio:
1. Go to **View > SQL Server Object Explorer**
2. Or press: `Ctrl + \, Ctrl + S`

### Step 2: Connect to Your SQL Server

1. Click the **Add SQL Server** icon
2. Enter your server name (usually `localhost` or `.\SQLEXPRESS`)
3. Click **Connect**

### Step 3: Run Migrations

In Package Manager Console:
```powershell
Update-Database
```

## Verify Migration Applied

### In SQL Server Management Studio (SSMS)

1. Open SSMS
2. Connect to your SQL Server
3. Expand **Databases > JobTrackingSystemDb > Tables**
4. You should see:
   - `dbo.Jobs`
   - `dbo.Templates`
   - `dbo.__EFMigrationsHistory`

### In Visual Studio SQL Server Object Explorer

1. Expand your server
2. Expand **JobTrackingSystemDb > Tables**
3. You should see the same tables

## Check Migration History

To see which migrations have been applied:

```powershell
Get-Migration
```

Output should show:
```
Id                                      Name
--                                      ----
20250101000000_InitialCreate            InitialCreate
```

## Troubleshooting

### "No database provider has been configured"

Make sure `appsettings.Development.json` has:
```json
"UseInMemoryDatabase": false
```

### "Cannot connect to SQL Server"

Check your connection string in `appsettings.Development.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost,1433;Database=JobTrackingSystemDb;User Id=sa;Password=YourPassword123!;TrustServerCertificate=true;"
}
```

Update:
- `Server`: Your SQL Server instance name
- `User Id`: Your SQL Server username
- `Password`: Your SQL Server password

### "Migration already applied"

If you run `Update-Database` again, it will skip already-applied migrations.

## Creating New Migrations

If you modify your entities (Job, Template), create a new migration:

```powershell
Add-Migration YourMigrationName
```

Then apply it:
```powershell
Update-Database
```

## Rollback Migration

To undo the last migration:

```powershell
Update-Database -Migration 0
```

Or to a specific migration:
```powershell
Update-Database -Migration 20250101000000_InitialCreate
```

## Next Steps

1. ✅ Apply migrations using `Update-Database`
2. ✅ Verify tables in SQL Server
3. ✅ Restart your backend application
4. ✅ Test API endpoint: `GET http://localhost:5001/api/v2/jobscontrollerv2`
5. ✅ Start receiving WhatsApp job offers!

## Why Entity Framework Migrations?

- **Version Control**: Track all database changes
- **Reproducible**: Same migrations work on any environment
- **Rollback**: Easy to undo changes
- **Team Collaboration**: Share migrations through git
- **Automatic**: EF Core generates migration code for you
