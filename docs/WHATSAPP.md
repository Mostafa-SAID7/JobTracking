# 💬 WhatsApp Integration Guide

Learn how to connect your **WhatsApp Business API** to the Job Tracking System for automated message reception and processing.

---

## 📋 Prerequisites

- ✅ **WhatsApp Business Account**: (Current: `01026296173`)
- ✅ **Meta Developer Account**: Access to the [Meta App Dashboard](https://developers.facebook.com/apps).
- ✅ **Public URL**: Your backend must be accessible via HTTPS (use **ngrok** for local testing).

---

## 🛠️ Step-by-Step Setup

### 1️⃣ Get API Credentials
From your Meta App Dashboard, add the **WhatsApp** product and collect:
- **Phone Number ID**: Unique ID for your business number.
- **Access Token**: Long-lived token for API authorization.
- **Verify Token**: A custom string for webhook verification.

### 2️⃣ Configure Backend
Update your `.env` or `appsettings.json`:

```json
"WhatsApp": {
  "VerifyToken": "your_token",
  "AccessToken": "your_access_token",
  "PhoneNumberId": "your_id",
  "BusinessPhoneNumber": "01026296173"
}
```

### 3️⃣ Set Up Webhook
1.  **Public URL**: Start ngrok: `ngrok http 5001`.
2.  **Meta Dashboard**: Go to **WhatsApp > Configuration**.
3.  **Callback URL**: `https://your-public-url.com/api/v2/whatsappwebhook`.
4.  **Subscriptions**: Enable `messages`, `message_status`.

---

## 🔄 How it Works

When a message is received on your business number:
1.  **Webhook Trigger**: Meta sends a POST request to your API.
2.  **Processing**: `WhatsAppWebhookController` validates the signature.
3.  **Extraction**: The system parses the job title, phone, and email.
4.  **Creation**: A new job record is created and categorized.
5.  **Response**: An automated confirmation is sent back to the user.

---

## 🛠️ Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **Webhook Verification Failed** | Double-check the `Verify Token` matches in both Meta and your code. |
| **Messages Not Received** | Ensure your public URL is active and ngrok is running. |
| **Permission Error** | Verify your Access Token has `whatsapp_business_messaging` permissions. |

---

<p align="center">
  <a href="INDEX.md">← Back to Index</a>
</p>
