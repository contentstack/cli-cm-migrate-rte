# Skills

Reusable agent guidance for **`@contentstack/cli-cm-migrate-rte`** (HTML RTE → JSON RTE migration). Use with any tool that supports file references.

## Quick reference

| Skill | Use when |
|-------|----------|
| **contentstack-cli** | Command, `src/lib/util`, Contentstack Management API, migration flow |
| **testing** | Mocha, Chai, Sinon, nock, TDD, coverage |
| **framework** | Config schema, CLI confirmation, retries, progress, shared helpers |
| **code-review** | PR / change review |

## How to reference

```
Follow @skills/contentstack-cli and @skills/testing for this change.
```

## Project context

- **Stack:** JavaScript, OCLIF (via `@contentstack/cli-command`), Contentstack CLI utilities, Mocha / Chai / Sinon, nock, nyc
- **Layout:** `src/commands/cm/entries/migrate-html-rte.js` → `src/lib/util/` (`config_schema.json`, migration helpers)
- **Tests:** `test/**/*.test.js`
