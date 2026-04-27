# Frontend Structure

```
Frontend/
├── src/
│   ├── app/
│   │   ├── models/                         # TypeScript interfaces
│   │   │   ├── job.model.ts
│   │   │   ├── template.model.ts
│   │   │   └── whatsapp.model.ts
│   │   │
│   │   ├── services/                       # API clients
│   │   │   ├── job.service.ts              # Job API calls
│   │   │   ├── template.service.ts         # Template CRUD
│   │   │   └── whatsapp.service.ts         # WhatsApp link generation
│   │   │
│   │   ├── components/                     # UI components
│   │   │   ├── dashboard/                  # Main dashboard
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.component.scss
│   │   │   ├── template-management/        # Template CRUD
│   │   │   │   ├── template-list.component.ts
│   │   │   │   ├── template-form.component.ts
│   │   │   │   └── template-form.component.html
│   │   │   └── shared/                     # Reusable
│   │   │       ├── header.component.ts
│   │   │       └── loading-spinner.component.ts
│   │   │
│   │   ├── app.component.ts                # Root component
│   │   ├── app.component.html
│   │   ├── app-routing.module.ts           # Routes
│   │   └── app.module.ts                   # Module imports
│   │
│   ├── assets/                             # Static files
│   │   └── images/
│   │
│   ├── styles.scss                         # Global styles (Tailwind)
│   ├── index.html
│   └── main.ts                             # Bootstrap
│
├── angular.json                            # Build config, serve ports
├── package.json                            # Dependencies
├── tsconfig.json                           # TS config
└── tailwind.config.js                      # Tailwind config
```

## Key Files

| File | Purpose |
|------|---------|
| `app.component.html` | Main layout with navigation |
| `dashboard.component.ts` | Job submission, message display |
| `template-list.component.ts` | Template CRUD UI |
| `job.service.ts` | HTTP calls to `/api/v2/jobs` |
| `template.service.ts` | HTTP calls to `/api/templates` |
| `tailwind.config.js` | Tailwind theme, plugins |

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `DashboardComponent` | Job submission and results |
| `/templates` | `TemplateListComponent` | Template management |
