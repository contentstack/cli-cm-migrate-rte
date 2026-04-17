# CLI: Migrate HTML RTE to JSON RTE – Agent guide

**Universal entry point** for contributors and AI agents. Detailed conventions live in **`skills/*/SKILL.md`**.

## What this repo is

| Field | Detail |
|--------|--------|
| **Name:** | [cli-cm-migrate-rte](https://github.com/contentstack/cli-cm-migrate-rte) (`@contentstack/cli-cm-migrate-rte`) |
| **Purpose:** | **oClif** plugin for **Contentstack CLI** (`csdx`) to migrate HTML RTE fields to JSON RTE using serializers and DOM parsing. |
| **Out of scope:** | Not a general-purpose CLI—extends the Contentstack CLI command set only. |

## Tech stack (at a glance)

| Area | Details |
|------|---------|
| Language | JavaScript (Node **≥ 18**); commands under **`src/commands/`** |
| Build | oClif manifest (`oclif manifest` in `prepack`); no separate compile step for app code |
| Tests | **Mocha** + **nyc** — `npm test` → `test/**/*.test.js` with `test/setup.js` |
| Lint / coverage | **ESLint** with `eslint-config-oclif` (run `npx eslint .` if no script) |
| CI | `.github/workflows/unit-test.yml`, `check-version-bump.yml`, `sca-scan.yml`, `policy-scan.yml`, `issues-jira.yml` |

## Commands (quick reference)

| Command type | Command |
|--------------|---------|
| Test | `npm test` |
| Lint (manual) | `npx eslint .` (project uses ESLint 8 + oClif config) |

## Where the documentation lives: skills

| Skill | Path | What it covers |
|-------|------|----------------|
| **Development workflow** | [`skills/dev-workflow/SKILL.md`](skills/dev-workflow/SKILL.md) | oClif, Husky, versioning, CLI release |
| **Migrate RTE plugin** | [`skills/cli-migrate-rte/SKILL.md`](skills/cli-migrate-rte/SKILL.md) | Commands, serializers, jsdom usage |
| **Testing** | [`skills/testing/SKILL.md`](skills/testing/SKILL.md) | Mocha, nock, fixtures |
| **Code review** | [`skills/code-review/SKILL.md`](skills/code-review/SKILL.md) | PR checklist for CLI behavior |

## Using Cursor (optional)

If you use **Cursor**, [`.cursor/rules/README.md`](.cursor/rules/README.md) only points to **`AGENTS.md`**—same docs as everyone else.
