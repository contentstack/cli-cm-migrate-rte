---
description: "Core development workflow and TDD patterns - always applied"
globs: ["**/*.js", "**/*.json"]
alwaysApply: true
---

# Development Workflow

## Quick Reference

For detailed patterns, see project skills:

- `@skills/testing` — Testing and TDD
- `@skills/contentstack-cli` — Migration command, `src/lib/util`, Contentstack APIs
- `@skills/framework` — Config validation, CLI UX, retries, shared helpers
- `@skills/code-review` — PR review checklist

## TDD workflow (recommended)

For **new behavior or bug fixes**, prefer working in three steps:

1. **RED** → Write a failing test (or extend an existing one)
2. **GREEN** → Minimal code to pass
3. **REFACTOR** → Clean up while tests stay green

**Exceptions (no new test required when behavior is unchanged):** pure refactors, documentation-only edits, comments/config-only tweaks, trivial typos.

## Guidelines

- **Coverage:** aim high; **~80%** (lines/branches/functions) is an **aspirational target**, not a CI gate in this repo
- **JavaScript** — follow existing style in `src/`; prefer small, focused functions and clear naming
- **NO test.skip or .only** in commits

## File structure (this repo)

- **Command**: `src/commands/cm/entries/migrate-html-rte.js` — `JsonMigrationCommand`, flags, thin `run()`
- **Migration logic**: `src/lib/util/index.js` — stack client, config, batch entry updates, HTML→JSON via `@contentstack/json-rte-serializer` + jsdom
- **Config schema**: `src/lib/util/config_schema.json`
- **Tests**: `test/**/*.test.js` (Mocha); fixtures under `test/dummy/`, helpers under `test/utils/`

## Naming conventions

- **Files**: `kebab-case.js` where the codebase already uses it; test files `*.test.js`
- **Classes**: `PascalCase`
- **Functions**: `camelCase`
- **Tests**: `should [behavior] when [condition]`

## Before coding

1. Read relevant `@skills/*` references
2. For behavior changes: prefer a failing test first, then implement
3. Refactor and run tests

## Validation commands

- `npm test` — All tests with nyc (`mocha --require test/setup.js --forbid-only "test/**/*.test.js"`)
- `npm run prepack` — Regenerate `oclif.manifest.json` and README (run before release packaging as needed)

## Commit suggestions

- Conventional commits are helpful but optional: `feat(scope): description`
- Tests passing before merge
- No stray `console.log` / `debugger` (beyond intentional CLI output already in the command)
