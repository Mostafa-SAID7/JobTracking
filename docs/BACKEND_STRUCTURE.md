# 🏗️ Backend Structure

The backend is built using **.NET 8** following **Clean Architecture** principles, ensuring separation of concerns and testability.

---

## 📂 Project Tree

```text
JobTrackingSystem/
├── 🌐 API/                   # Entry point, Controllers, Middleware
│   ├── Controllers/          # REST Endpoints (v2)
│   └── Program.cs            # DI Container & Middleware
│
├── ⚙️ Application/           # Business Logic & Interfaces
│   ├── Services/             # OCR, Classification, Extraction
│   └── DTOs/                 # Data Transfer Objects
│
├── 💎 Domain/                # Core Entities & Logic
│   ├── Entities/             # Job, Template
│   └── Interfaces/           # Repository Contracts
│
└── 💾 Infrastructure/        # Data Access & External APIs
    ├── Data/                 # DB Context
    ├── Repositories/         # EF Implementations
    └── Migrations/           # Database Schema Evolution
```

---

## 🏛️ Layer Responsibilities

| Layer | Responsibility | Key Technologies |
| :--- | :--- | :--- |
| **API** | Request handling, Auth, Swagger | ASP.NET Core v8 |
| **Application** | Logic orchestration, DTO mapping | C# 12, AutoMapper |
| **Domain** | Business rules, POCO models | C# 12 |
| **Infrastructure** | SQL persistence, API integration | EF Core, SQL Server |

---

## 🛠️ Key Technical Components

| Component | Responsibility |
| :--- | :--- |
| **`JobClassificationService`** | Analyzes job descriptions to determine category (Backend/Frontend). |
| **`JobExtractionService`** | Uses Regex and Logic to extract emails and phone numbers. |
| **`WhatsAppService`** | Handles communication with the Meta WhatsApp Business API. |
| **`OCRService`** | Processes image uploads into searchable text. |

---

<p align="center">
  <a href="INDEX.md">← Back to Index</a>
</p>
