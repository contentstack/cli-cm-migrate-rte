---
name: contentstack-cli
description: Contentstack CLI migrate-html-rte plugin — OCLIF command, src/lib/util, cli-utilities, and HTML→JSON RTE migration. Use for commands, migration logic, and Management API usage in this repo.
---

# Contentstack CLI — migrate HTML RTE

## Quick reference

- **[Contentstack patterns](references/contentstack-patterns.md)** — Command shape, migration pipeline, API habits
- **[Framework patterns](../framework/references/framework-patterns.md)** — Config, CLI UX, retries

## This package

- **Command:** `JsonMigrationCommand` in `src/commands/cm/entries/migrate-html-rte.js` extends **`Command`** from **`@contentstack/cli-command`**.
- **Orchestration:** `src/lib/util/index.js` — stack client, config, batch updates, HTML→JSON conversion, global-field handling.
- **Schema:** `src/lib/util/config_schema.json` validated with **jsonschema**.
- **Integration:** **`@contentstack/cli-utilities`**, **`@contentstack/json-rte-serializer`**, **jsdom**, **oclif** (manifest / readme).

## Practices

- Authenticate and build the management client via **`@contentstack/cli-utilities`**; never log secrets.
- Keep **`run()`** thin; delegate to **`src/lib/util`** helpers.
- Respect rate limits; align retries and delays with existing **`updateEntriesInBatch`** / **`handleEntryUpdate`** behavior when adding API calls.
- Tests: mock SDK and HTTP (**nock**); no real stack access in unit tests.

## Usage

Use this skill when changing migration behavior, flags, config, or Contentstack API usage. Open **references/contentstack-patterns.md** for longer detail.
