# Cursor rules

Rules give context-aware guidance for this **Contentstack HTML → JSON RTE migration CLI plugin** (`@contentstack/cli-cm-migrate-rte`).

## Rules overview

| File | Purpose |
|------|---------|
| `dev-workflow.md` | TDD, structure, validation commands (always applied) |
| `contentstack-cli.mdc` | Contentstack CLI utilities, migration flow, Management API habits |
| `testing.mdc` | Mocha / Chai / Sinon, nock, and coverage |
| `oclif-commands.mdc` | Command flags and delegation patterns |

## How they attach

- **Always**: `dev-workflow.md`
- **Commands** (`src/commands/**`): `oclif-commands.mdc`
- **Migration logic** (`src/lib/**`): `contentstack-cli.mdc`
- **Tests** (`test/**`): `testing.mdc`

## Chat shortcuts

You can `@`-mention rule topics (for example testing or OCLIF) depending on how your workspace maps rule names.
