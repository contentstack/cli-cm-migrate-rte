---
name: code-review
description: PR review checklist for @contentstack/cli-cm-migrate-rte and similar CLI plugins. Use when reviewing changes to migrate-html-rte, lib/util, or tests.
---

# Code Review Skill

## Quick Reference

- **[Code Review Checklist](./references/code-review-checklist.md)** — Severity levels and full checklist

## Review process

### Severity levels

- **Critical**: Must fix before merge (security, correctness, breaking changes)
- **Important**: Should fix (performance, maintainability, best practices)
- **Suggestion**: Consider improving (style, optimization, readability)

### Quick categories

1. **Security** — No hardcoded secrets; safe logging
2. **Correctness** — Migration logic, path validation, entry updates
3. **Architecture** — Thin command, logic in `src/lib/util`
4. **Performance** — Batching, delays, avoid redundant API calls
5. **Testing** — nock/sinon boundaries, no live stack
6. **Conventions** — JavaScript style consistent with `src/`

## Quick checklist template

```markdown
## Security
- [ ] No secrets in code or logs

## Correctness
- [ ] HTML/JSON path rules and global-field behavior preserved
- [ ] Errors surfaced to the operator

## Architecture
- [ ] Command stays thin; util holds migration logic

## Testing
- [ ] Behavior changes covered; mocks at boundaries

## Conventions
- [ ] Matches existing JS patterns in repo
```

## Usage

Open **references/code-review-checklist.md** for the full structured review.
