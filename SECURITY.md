# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x     | ✅ Yes             |
| 1.x     | ❌ No              |

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not** open a public GitHub issue.

Instead, report it privately:

1. Email the details to the maintainers (see repository contacts)
2. Include a description of the vulnerability
3. Include steps to reproduce
4. Include potential impact

You can expect:
- Acknowledgement within 48 hours
- A fix or mitigation plan within 7 days for critical issues
- Credit in the changelog if desired

## Security Best Practices for Deployment

- Never commit `.env` files or `appsettings.json` with real credentials
- Use environment variables or secrets managers in production
- Rotate the `WhatsApp` access token regularly
- Keep `.NET` and `Node.js` dependencies up to date
- Enable HTTPS in all environments
- Restrict CORS to known origins in production
