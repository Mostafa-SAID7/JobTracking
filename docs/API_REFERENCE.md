# API Reference

## Base URL
```
https://localhost:5001/api/v2
```

## Authentication
Currently no authentication required. Future versions will use JWT tokens.

## Response Format

### Success Response
```json
{
  "id": 1,
  "title": "Senior .NET Developer",
  "category": "Backend",
  "phoneNumber": "+1234567890",
  "email": "contact@company.com",
  "applicationChannel": "WhatsApp",
  "generatedMessage": "Hi, I'm interested in the Senior .NET Developer position...",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Error Response
```json
{
  "message": "Error description",
  "statusCode": 400,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Jobs Endpoints

### Create Job
**POST** `/jobs`

Create and process a new job from text or image.

**Request**
```bash
curl -X POST https://localhost:5001/api/jobs \
  -H "Content-Type: multipart/form-data" \
  -F "sourceMessage=Looking for .NET Developer" \
  -F "image=@job_image.jpg"
```

**Parameters**
- `sourceMessage` (string, optional): Raw job message text
- `image` (file, optional): Job image (JPG, PNG, PDF)

**Response** (201 Created)
```json
{
  "id": 1,
  "title": ".NET Developer",
  "category": "Backend",
  "phoneNumber": "+1234567890",
  "email": "hr@company.com",
  "applicationChannel": "WhatsApp",
  "generatedMessage": "Hi, I'm interested in the .NET Developer position...",
  "emailSubject": "Application for .NET Developer",
  "emailBody": "Dear Hiring Manager...",
  "whatsAppLink": "https://wa.me/1234567890?text=Hi%2C%20I%27m%20interested...",
  "cvPath": "/cvs/my_cv.pdf",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Responses**
- `400 Bad Request`: No message or image provided
- `500 Internal Server Error`: Processing failed

---

### Get All Jobs
**GET** `/jobs`

Retrieve all jobs with pagination.

**Query Parameters**
- `page` (integer, default: 1): Page number
- `pageSize` (integer, default: 10): Items per page
- `sortBy` (string, default: "createdAt"): Sort field
- `sortOrder` (string, default: "desc"): "asc" or "desc"

**Response** (200 OK)
```json
{
  "items": [
    {
      "id": 1,
      "title": ".NET Developer",
      "category": "Backend",
      "phoneNumber": "+1234567890",
      "email": "hr@company.com",
      "applicationChannel": "WhatsApp",
      "generatedMessage": "...",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "totalCount": 42,
  "pageNumber": 1,
  "pageSize": 10,
  "totalPages": 5
}
```

---

### Get Job by ID
**GET** `/jobs/{id}`

Retrieve a specific job with full details.

**Path Parameters**
- `id` (integer, required): Job ID

**Response** (200 OK)
```json
{
  "id": 1,
  "title": ".NET Developer",
  "category": "Backend",
  "phoneNumber": "+1234567890",
  "email": "hr@company.com",
  "applicationChannel": "WhatsApp",
  "generatedMessage": "Hi, I'm interested in the .NET Developer position...",
  "emailSubject": "Application for .NET Developer",
  "emailBody": "Dear Hiring Manager...",
  "whatsAppLink": "https://wa.me/1234567890?text=Hi%2C%20I%27m%20interested...",
  "cvPath": "/cvs/my_cv.pdf",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Responses**
- `404 Not Found`: Job not found

---

### Get Jobs by Category
**GET** `/jobs/category/{category}`

Retrieve jobs filtered by category.

**Path Parameters**
- `category` (string, required): "Backend", "Frontend", or "Fullstack"

**Query Parameters**
- `page` (integer, default: 1): Page number
- `pageSize` (integer, default: 10): Items per page

**Response** (200 OK)
```json
{
  "items": [
    {
      "id": 1,
      "title": ".NET Developer",
      "category": "Backend",
      "phoneNumber": "+1234567890",
      "email": "hr@company.com",
      "applicationChannel": "WhatsApp",
      "generatedMessage": "...",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "totalCount": 15,
  "pageNumber": 1,
  "pageSize": 10,
  "totalPages": 2
}
```

---

### Get Jobs by Channel
**GET** `/jobs/channel/{channel}`

Retrieve jobs filtered by application channel.

**Path Parameters**
- `channel` (string, required): "WhatsApp", "Email", or "Manual"

**Response** (200 OK)
```json
{
  "items": [...],
  "totalCount": 25,
  "pageNumber": 1,
  "pageSize": 10,
  "totalPages": 3
}
```

---

### Send Email
**POST** `/jobs/{id}/send-email`

Send generated email for a job.

**Path Parameters**
- `id` (integer, required): Job ID

**Request Body**
```json
{
  "recipientEmail": "recipient@example.com",
  "preview": false
}
```

**Response** (200 OK)
```json
{
  "success": true,
  "message": "Email sent successfully",
  "sentAt": "2024-01-15T10:35:00Z"
}
```

**Error Responses**
- `404 Not Found`: Job not found
- `400 Bad Request`: Invalid email address
- `500 Internal Server Error`: Email sending failed

---

## Templates Endpoints

### Create Template
**POST** `/templates`

Create a new response template.

**Request Body**
```json
{
  "category": "Backend",
  "messageTemplate": "Hi, I'm interested in the {JobTitle} position. I have experience with {Category} development. Check my work at {Github} and {Portfolio}. Contact: {Email}",
  "emailSubjectTemplate": "Application for {JobTitle}",
  "emailBodyTemplate": "Dear Hiring Manager,\n\nI am interested in the {JobTitle} position...",
  "cvPath": "/cvs/backend_cv.pdf",
  "githubUrl": "https://github.com/yourname",
  "portfolioUrl": "https://yourportfolio.com",
  "email": "your@email.com"
}
```

**Response** (201 Created)
```json
{
  "id": 1,
  "category": "Backend",
  "messageTemplate": "Hi, I'm interested in the {JobTitle} position...",
  "emailSubjectTemplate": "Application for {JobTitle}",
  "emailBodyTemplate": "Dear Hiring Manager...",
  "cvPath": "/cvs/backend_cv.pdf",
  "githubUrl": "https://github.com/yourname",
  "portfolioUrl": "https://yourportfolio.com",
  "email": "your@email.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Responses**
- `400 Bad Request`: Missing required fields
- `409 Conflict`: Template for category already exists

---

### Get All Templates
**GET** `/templates`

Retrieve all templates.

**Response** (200 OK)
```json
[
  {
    "id": 1,
    "category": "Backend",
    "messageTemplate": "...",
    "emailSubjectTemplate": "...",
    "emailBodyTemplate": "...",
    "cvPath": "/cvs/backend_cv.pdf",
    "githubUrl": "https://github.com/yourname",
    "portfolioUrl": "https://yourportfolio.com",
    "email": "your@email.com",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### Get Template by ID
**GET** `/templates/{id}`

Retrieve a specific template.

**Path Parameters**
- `id` (integer, required): Template ID

**Response** (200 OK)
```json
{
  "id": 1,
  "category": "Backend",
  "messageTemplate": "...",
  "emailSubjectTemplate": "...",
  "emailBodyTemplate": "...",
  "cvPath": "/cvs/backend_cv.pdf",
  "githubUrl": "https://github.com/yourname",
  "portfolioUrl": "https://yourportfolio.com",
  "email": "your@email.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Responses**
- `404 Not Found`: Template not found

---

### Update Template
**PUT** `/templates/{id}`

Update an existing template.

**Path Parameters**
- `id` (integer, required): Template ID

**Request Body**
```json
{
  "category": "Backend",
  "messageTemplate": "Updated message template...",
  "emailSubjectTemplate": "Updated subject...",
  "emailBodyTemplate": "Updated body...",
  "cvPath": "/cvs/backend_cv_v2.pdf",
  "githubUrl": "https://github.com/newname",
  "portfolioUrl": "https://newportfolio.com",
  "email": "newemail@example.com"
}
```

**Response** (200 OK)
```json
{
  "id": 1,
  "category": "Backend",
  "messageTemplate": "Updated message template...",
  "emailSubjectTemplate": "Updated subject...",
  "emailBodyTemplate": "Updated body...",
  "cvPath": "/cvs/backend_cv_v2.pdf",
  "githubUrl": "https://github.com/newname",
  "portfolioUrl": "https://newportfolio.com",
  "email": "newemail@example.com",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

**Error Responses**
- `404 Not Found`: Template not found
- `400 Bad Request`: Invalid data

---

### Delete Template
**DELETE** `/templates/{id}`

Delete a template.

**Path Parameters**
- `id` (integer, required): Template ID

**Response** (204 No Content)

**Error Responses**
- `404 Not Found`: Template not found

---

## Placeholder Reference

Use these placeholders in message and email templates:

| Placeholder | Description | Example |
|------------|-------------|---------|
| `{JobTitle}` | Extracted job title | "Senior .NET Developer" |
| `{Category}` | Classified job category | "Backend" |
| `{Github}` | GitHub URL from template | "https://github.com/username" |
| `{Portfolio}` | Portfolio URL from template | "https://portfolio.com" |
| `{Email}` | Email from template | "your@email.com" |

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 204 | No Content - Successful deletion |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting

Currently no rate limiting. Future versions will implement:
- 100 requests per minute per IP
- 1000 requests per hour per IP

---

## Versioning

Current API version: **v2**

Endpoints use `/api/v2/` prefix for future compatibility.

---

## Examples

### Create Job and Send via WhatsApp
```bash
# 1. Create job
curl -X POST https://localhost:5001/api/jobs \
  -H "Content-Type: multipart/form-data" \
  -F "sourceMessage=Looking for .NET Developer with 5+ years experience. Contact: +1234567890"

# Response includes whatsAppLink
# 2. Open WhatsApp link in browser
# https://wa.me/1234567890?text=Hi%2C%20I%27m%20interested...
```

### Create Template and Use for Jobs
```bash
# 1. Create template
curl -X POST https://localhost:5001/api/templates \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Backend",
    "messageTemplate": "Hi, interested in {JobTitle}...",
    "cvPath": "/cvs/cv.pdf",
    "githubUrl": "https://github.com/me",
    "portfolioUrl": "https://portfolio.com",
    "email": "me@example.com"
  }'

# 2. Create job (automatically uses template)
curl -X POST https://localhost:5001/api/jobs \
  -H "Content-Type: multipart/form-data" \
  -F "sourceMessage=Backend Developer needed. Contact: +1234567890"

# Response includes generated message using template
```
