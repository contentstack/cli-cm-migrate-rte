---
name: code-review
description: Use when reviewing PRs for cli-cm-migrate-rte—command safety, tests, and CLI dependency alignment.
---

# Code review – cli-cm-migrate-rte

## When to use

- Reviewing migration logic or dependency bumps on `@contentstack/*` packages

## Instructions

### Checklist

- **Safety**: Migration cannot silently corrupt entries; edge cases covered by tests.
- **CLI contract**: Flags, prompts, and exit codes match oClif expectations and docs.
- **Deps**: `@contentstack/cli-*` versions aligned with the CLI release train.
- **Tests**: `npm test` green; new behavior has Mocha coverage.

### Severity hints

- **Blocker**: Data loss risk, failing tests, or broken manifest/readme generation.
- **Major**: Missing tests for HTML edge cases or serializer upgrades.
- **Minor**: Logging, messages, internal structure.
