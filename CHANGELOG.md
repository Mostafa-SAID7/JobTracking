# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2026-04-27

### Added
- Multi-channel support: WhatsApp, Email, and Manual review
- OCR processing for image-based job postings
- Email delivery integration with SMTP
- WhatsApp Business API webhook integration
- Email templates with subject and body placeholders
- `GET /api/v2/jobs/channel/{channel}` endpoint to filter by channel
- `POST /api/v2/jobs/{id}/send-email` endpoint
- Docker Compose setup with SQL Server, backend, and frontend
- Tailwind CSS responsive UI
- Comprehensive documentation in `docs/`

### Changed
- API versioned to v2 (`/api/v2/jobs`)
- Template model extended with `emailSubjectTemplate` and `emailBodyTemplate`
- Frontend upgraded to Angular 19

### Fixed
- CORS configuration for production deployments
- Database migration ordering

## [1.0.0] - 2025-01-01

### Added
- Initial release
- Job message ingestion and classification (Backend, Frontend, Fullstack)
- Phone number extraction from job messages
- WhatsApp link generation
- Template management (CRUD)
- Angular frontend dashboard
- .NET 8 Clean Architecture backend
- Entity Framework Core with SQL Server
- Swagger UI

[Unreleased]: https://github.com/your-org/JobTrackingSystem/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/your-org/JobTrackingSystem/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/your-org/JobTrackingSystem/releases/tag/v1.0.0
