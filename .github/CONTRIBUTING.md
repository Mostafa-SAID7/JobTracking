# Contributing to Job Tracking System

Thank you for your interest in contributing! Here's how to get started.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/JobTrackingSystem.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Push and open a Pull Request

## Development Setup

See [docs/SETUP.md](../docs/SETUP.md) for full setup instructions.

**Quick start:**
```bash
# Backend
cd Backend
dotnet restore
dotnet run --project src/JobTrackingSystem.API

# Frontend
cd Frontend
npm install
npm start
```

## Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/description` | `feature/add-linkedin-channel` |
| Bug fix | `fix/description` | `fix/phone-extraction-regex` |
| Docs | `docs/description` | `docs/update-api-reference` |
| Chore | `chore/description` | `chore/upgrade-dotnet` |

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add LinkedIn channel support
fix: correct phone number extraction for Egyptian numbers
docs: update WhatsApp setup guide
chore: upgrade to .NET 8.1
```

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Update relevant documentation
- Ensure the app builds and runs without errors
- Describe what changed and why in the PR description

## Code Style

**Backend (.NET):**
- Follow standard C# conventions
- Use `async/await` for I/O operations
- Add XML doc comments on public methods

**Frontend (Angular):**
- Follow Angular style guide
- Use `OnPush` change detection where possible
- Keep components small and focused

## Reporting Issues

Use GitHub Issues with the appropriate template:
- Bug report: describe steps to reproduce
- Feature request: describe the use case

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).
