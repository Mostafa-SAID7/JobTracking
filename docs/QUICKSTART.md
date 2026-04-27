# ⚡ Quick Start Guide

Get the Job Tracking System running and process your first job in under 5 minutes.

---

## 1️⃣ Launch the System

### Option A: Docker (Recommended)
```bash
docker-compose up -d
```

### Option B: Manual Startup
```bash
# Terminal 1: Backend
cd Backend/src/JobTrackingSystem.API
dotnet run

# Terminal 2: Frontend
cd Frontend
npm start
```

---

## 2️⃣ Initial Setup

1.  **Open Dashboard**: [http://localhost:4200](http://localhost:4200)
2.  **Create a Template**: Go to the **Templates** tab and add a "Backend" template.
    *   *Message*: `Hi! I saw the {JobTitle} post. Here is my CV...`

---

## 3️⃣ Process a Job

Go to the **Dashboard** and paste a job description like this:

```text
Hiring: Senior .NET Developer
Must have ASP.NET Core experience. 
Contact: +1234567890
```

**The system will automatically:**
- ✅ Classify as **Backend**.
- ✅ Extract the **Phone Number**.
- ✅ Generate your **Personalized Message**.
- ✅ Provide a **WhatsApp Link**.

---

## 📚 What's Next?

- ⚙️ Need more control? See [Detailed Setup](SETUP.md).
- 📐 Curious about the internals? See [Architecture](ARCHITECTURE.md).
- 🔌 Building an integration? See [API Reference](API_REFERENCE.md).

---

<p align="center">
  <a href="INDEX.md">← Back to Index</a>
</p>
