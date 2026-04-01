---
name: framework
description: Config validation, CLI UX, retries, and shared helpers for @contentstack/cli-cm-migrate-rte. Use when working in src/lib/util or changing confirmation/progress/delay behavior — align with @contentstack/cli-utilities.
---

# Framework Patterns Skill

## Quick Reference

- **[Framework Patterns](references/framework-patterns.md)** — Config schema, cliux, delays/retries, progress, lodash/jsdom/serializer usage

## Core topics (this repo)

- **Configuration** — **`getConfig`**, **`pathValidator`**, **jsonschema** + **`config_schema.json`**, **`normalizeFlags`** for legacy keys
- **CLI UX** — **`cliux.confirm`**, **`cliux.progress`**, **chalk** output in the command
- **Resilience** — **`delay`**, retry counters in **`updateEntriesInBatch`** and **`handleEntryUpdate`**
- **Transformation** — **JSDOM**, **`collapse-whitespace`**, **`htmlToJson`**, **`applyDirtyAttributesToBlock`**

## Usage

Use this skill when adjusting config shape, user prompts, pacing, or shared migration helpers in **`src/lib/util`**. Prefer extending existing functions over new parallel frameworks.
