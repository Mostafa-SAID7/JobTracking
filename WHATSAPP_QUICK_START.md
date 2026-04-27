# WhatsApp Integration - Quick Start

## Your Setup

- **Business Phone**: 01026296173
- **Channel**: https://whatsapp.com/channel/0029Va4NbVm9RZAYM1ObqK3W
- **Personal Phone**: 01067358073

## What You Need to Do

### 1. Get Credentials from Meta Dashboard

Visit: https://developers.facebook.com/apps

Find these values:
- `PhoneNumberId` - Your WhatsApp Business phone number ID
- `AccessToken` - API access token
- `AppSecret` - Your app secret
- Create a `VerifyToken` - Any random string (e.g., "job_tracker_verify_123")

### 2. Update Backend Configuration

Edit: `JobTrackingSystem/Backend/src/JobTrackingSystem.API/appsettings.json`

```json
"WhatsApp": {
  "VerifyToken": "job_tracker_verify_123",
  "AppSecret": "your_app_secret_from_meta",
  "PhoneNumberId": "your_phone_id_from_meta",
  "AccessToken": "your_access_token_from_meta",
  "BusinessPhoneNumber": "01026296173"
}
```

### 3. Expose Backend to Internet (for local testing)

```bash
# Install ngrok: https://ngrok.com/download
ngrok http 5001
# You'll get: https://abc123.ngrok.io
```

### 4. Configure Webhook in Meta Dashboard

1. Go to WhatsApp > Configuration
2. Click "Edit" on Webhook
3. Set:
   - **Callback URL**: `https://abc123.ngrok.io/api/v2/whatsappwebhook`
   - **Verify Token**: `job_tracker_verify_123`
4. Subscribe to: `messages`, `message_status`

### 5. Test It

Send a message to your WhatsApp Business number (01026296173):

```
Title: Senior Developer
Category: IT
Phone: 01234567890
Email: hr@company.com
```

You should get a confirmation message back!

## How It Works

1. **Message Received** → WhatsApp sends to your webhook
2. **Parsed** → System extracts job details
3. **Saved** → Job stored in database
4. **Confirmation** → Message sent back to user
5. **Dashboard** → Job appears in your dashboard

## Webhook Endpoint

```
POST /api/v2/whatsappwebhook
```

This endpoint:
- Receives messages from WhatsApp
- Parses job details
- Creates Job records
- Sends confirmations

## Message Format (Recommended)

```
Title: [Job Title]
Category: [Job Category]
Phone: [Contact Phone]
Email: [Contact Email]
Location: [Job Location]
Salary: [Salary Range]
```

Any format works - the system will extract what it can find.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Webhook not verifying | Check VerifyToken matches exactly |
| Messages not received | Verify webhook subscribed to "messages" |
| Backend not accessible | Use ngrok to expose local server |
| Messages not being sent | Check AccessToken and PhoneNumberId |

## Files Created

- `WhatsAppWebhookController.cs` - Receives messages
- `WhatsAppService.cs` - Processes messages
- `WhatsAppMessageDto.cs` - Data models
- `WHATSAPP_SETUP.md` - Full setup guide

## Next Steps

1. Get credentials from Meta Dashboard
2. Update `appsettings.json`
3. Set up ngrok
4. Configure webhook
5. Test with a message
6. Check dashboard for received jobs
