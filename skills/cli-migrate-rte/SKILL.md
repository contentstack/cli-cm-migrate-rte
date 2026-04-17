---
name: cli-migrate-rte
description: Use for migrate-html-rte command behavior, JSON RTE serializer, and DOM parsing in cli-cm-migrate-rte.
---

# Migrate RTE plugin – cli-cm-migrate-rte

## When to use

- Changing migration logic, stack entry updates, or `@contentstack/json-rte-serializer` usage
- Debugging jsdom-based HTML transforms

## Instructions

### Dependencies

- Relies on **`@contentstack/cli-command`**, **`@contentstack/cli-utilities`**, and **`@contentstack/json-rte-serializer`**—pin versions per Contentstack CLI compatibility matrix.

### Command UX

- Short name **`MGRTRTE`** is configured under `csdxConfig`—keep help text and flags aligned with Contentstack CLI standards.

### Safety

- Migrations mutate content—prefer dry-run or backup guidance in docs when adding destructive paths; validate on copies first.
