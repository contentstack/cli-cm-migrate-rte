---
name: testing
description: Use for Mocha tests, nyc coverage, and test/setup.js patterns in cli-cm-migrate-rte.
---

# Testing – cli-cm-migrate-rte

## When to use

- Adding tests under `test/**/*.test.js`
- Mocking HTTP with **nock** for CLI flows

## Instructions

### Runner

- **`npm test`** runs Mocha with `test/setup.js` and **nyc** (coverage check relaxed via `--check-coverage=false` in script—still collect locally).

### Structure

- Keep one concern per test file; use fixtures for HTML/RTE samples instead of huge inline strings when possible.

### Integration

- Heavy integration tests may need CLI auth mocks—never commit API keys; use nock or env stubs.
