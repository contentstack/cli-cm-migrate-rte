---
name: dev-workflow
description: Use for oClif plugin lifecycle, npm scripts, Husky, and Contentstack CLI integration for cli-cm-migrate-rte.
---

# Development workflow – cli-cm-migrate-rte

## When to use

- Adding or renaming commands under `src/commands/`
- Preparing `npm pack` / publish with oClif manifest

## Instructions

### oClif

- Commands are discovered from **`./src/commands`** (`package.json` `oclif.commands`).
- **`prepack`** runs `oclif manifest` and `oclif readme`—ensure generated files stay consistent with git.

### Versioning

- **`npm version`** hook updates README via oClif—follow semver for CLI consumers.

### Node

- **`engines.node`** is **≥ 18**—test on supported Node LTS.

### Husky

- **`prepare`** sets up Husky—hooks run in dev after install.
