# 🛡️ Security Policy

We take the security of the **Job Tracking System** seriously. This document outlines our supported versions and how to report vulnerabilities.

---

## ✅ Supported Versions

| Version | Supported |
| :--- | :--- |
| **2.x** | ✅ **Active Support** |
| **1.x** | ❌ End of Life |

---

## 🛑 Reporting a Vulnerability

If you discover a security vulnerability, please **do not** open a public GitHub issue. Public disclosure puts all users at risk.

**Instead, follow these steps:**

1.  **Email**: Send the details to our security team (see repository contact info).
2.  **Details**: Include a full description of the vulnerability.
3.  **Reproduce**: Provide clear steps to reproduce the issue.
4.  **Impact**: Explain the potential impact of the vulnerability.

**What you can expect from us:**
- 🕒 Acknowledgement of your report within **48 hours**.
- 🛠️ A fix or mitigation plan within **7 days** for critical issues.
- 🎖️ Credit in the [Changelog](CHANGELOG.md) (if requested).

---

## 🔒 Security Best Practices

To ensure your deployment remains secure, please follow these guidelines:

- 🔑 **Secrets Management**: Never commit `.env` or `appsettings.json` with real credentials. Use Environment Variables or Secrets Managers (Azure Key Vault, AWS Secrets Manager).
- 🔄 **Token Rotation**: Rotate your **WhatsApp Access Tokens** and **API Keys** regularly.
- 📦 **Updates**: Keep `.NET` and `Node.js` dependencies updated to patch known vulnerabilities.
- 🌐 **Network**: Always enable **HTTPS** and restrict **CORS** origins to your trusted frontend domain in production.

---

<p align="center">
  <a href="README.md">← Back to README</a>
</p>
