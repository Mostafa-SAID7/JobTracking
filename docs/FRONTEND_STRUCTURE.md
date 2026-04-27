# 🎨 Frontend Structure

The frontend is a modern **Angular 19** application, styled with **Tailwind CSS** for a responsive and premium user interface.

---

## 📂 Project Tree

```text
Frontend/
├── 📁 src/
│   ├── 🧩 app/
│   │   ├── 📦 components/       # Dashboard, Template Management
│   │   ├── 🛠️ services/         # API Clients (Jobs, Templates)
│   │   └── 📄 models/           # TypeScript Interfaces
│   │
│   ├── 🖼️ assets/               # Static Images & Icons
│   └── 🎨 styles.scss           # Global Tailwind Directives
│
├── ⚙️ angular.json              # Build & Project Config
├── 📝 package.json              # Dependencies (Angular, Tailwind)
└── 🌊 tailwind.config.js        # Theme & Plugin Customization
```

---

## 🚦 Key Modules & Components

| Component | Responsibility |
| :--- | :--- |
| **`DashboardComponent`** | The main hub for job submission and status tracking. |
| **`TemplateListComponent`** | Manage response templates for different job categories. |
| **`JobService`** | Core service for interacting with the `/api/v2/jobs` endpoints. |
| **`WhatsAppService`** | Generates direct click-to-chat links for manual follow-ups. |

---

## 🛤️ Application Routes

| Path | Component | Purpose |
| :--- | :--- | :--- |
| `/` | `DashboardComponent` | View and manage incoming job posts. |
| `/templates` | `TemplateListComponent` | Create and edit automated response templates. |

---

<p align="center">
  <a href="INDEX.md">← Back to Index</a>
</p>
