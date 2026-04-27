# WhatsApp Integration Setup Guide

This guide explains how to set up WhatsApp Business API integration with your Job Tracking System.

## Prerequisites

- WhatsApp Business Account (you have: 01026296173)
- Meta Business Account
- Access to Meta App Dashboard
- Your backend running on a public URL (for webhook)

## Step 1: Get WhatsApp Business API Credentials

1. Go to [Meta App Dashboard](https://developers.facebook.com/apps)
2. Create a new app or use existing one
3. Add "WhatsApp" product to your app
4. Go to **WhatsApp > Getting Started**
5. You'll need:
   - **Phone Number ID**: Your WhatsApp Business phone number ID
   - **Access Token**: Long-lived access token for API calls
   - **App Secret**: Your app's secret key
   - **Verify Token**: Create a random string (e.g., "my_verify_token_123")

## Step 2: Configure Backend

Update `appsettings.json` with your credentials:

```json
"WhatsApp": {
  "VerifyToken": "your_verify_token_here",
  "AppSecret": "your_app_secret_here",
  "PhoneNumberId": "your_phone_number_id_here",
  "AccessToken": "your_access_token_here",
  "BusinessPhoneNumber": "01026296173"
}
```

## Step 3: Set Up Webhook

### For Local Development (Testing)

Use a tunneling service like **ngrok** to expose your local backend:

```bash
ngrok http 5001
```

This gives you a public URL like: `https://abc123.ngrok.io`

### For Production

Use your actual domain/server URL.

## Step 4: Configure Webhook in Meta Dashboard

1. Go to **WhatsApp > Configuration**
2. Under **Webhook**, click **Edit**
3. Set **Callback URL**: `https://your-domain.com/api/v2/whatsappwebhook`
4. Set **Verify Token**: Same as in your `appsettings.json`
5. Subscribe to these webhook fields:
   - `messages`
   - `message_status`
   - `message_template_status_update`

## Step 5: Test Webhook

Send a test message to your WhatsApp Business number from your personal WhatsApp:

```
Title: Software Developer
Category: IT
Phone: 01234567890
Email: contact@example.com
```

The system will:
1. Receive the message
2. Parse job details
3. Create a Job record in the database
4. Send a confirmation message back

## Message Format

For best results, format messages like this:

```
Title: Senior Developer
Category: Information Technology
Phone: 01234567890
Email: hr@company.com
Location: Cairo, Egypt
Salary: 5000-7000 EGP
```

The system will extract these fields automatically.

## API Endpoints

### Webhook Verification (GET)
```
GET /api/v2/whatsappwebhook?hub.mode=subscribe&hub.challenge=CHALLENGE&hub.verify_token=TOKEN
```

### Receive Messages (POST)
```
POST /api/v2/whatsappwebhook
```

## Troubleshooting

### Webhook Not Verifying
- Check that `VerifyToken` matches exactly in Meta Dashboard and `appsettings.json`
- Ensure your backend is accessible from the internet
- Check backend logs for verification attempts

### Messages Not Being Received
- Verify webhook is subscribed to `messages` field
- Check that your access token is valid and not expired
- Ensure your phone number is properly configured

### Messages Not Being Sent
- Verify `AccessToken` and `PhoneNumberId` are correct
- Check that recipient phone number is in correct format (with country code)
- Review backend logs for API errors

## Security Notes

- Never commit credentials to git
- Use environment variables in production
- Rotate access tokens regularly
- Verify webhook signatures (already implemented)

## Next Steps

1. Update `appsettings.json` with your credentials
2. Set up ngrok for local testing
3. Configure webhook in Meta Dashboard
4. Test by sending a message to your WhatsApp Business number
5. Check backend logs to verify message processing
