# Code Review Checklist

PR review guidelines for **`@contentstack/cli-cm-migrate-rte`** and related CLI work.

## Review process

### Severity levels

- **Critical**: Must fix before merge (security, correctness, breaking changes)
- **Important**: Should fix (performance, maintainability, best practices)
- **Suggestion**: Consider improving (style, optimization, readability)

## 1. Security

### Authentication and secrets

- [ ] No hardcoded API keys, tokens, or credentials
- [ ] Sensitive data not logged to console or files
- [ ] Management tokens and stack keys never echoed in error messages

### Input validation

- [ ] Flags and config validated (**jsonschema** / required paths)
- [ ] Config file path resolved via **`pathValidator`**
- [ ] API responses handled before mutating entry payloads

### Error handling

- [ ] Errors do not leak secrets
- [ ] User-facing messages are actionable

## 2. Correctness

### Migration logic

- [ ] HTML and JSON RTE paths validated (**`isPathValid`**) when schema changes touch migration
- [ ] Global-field path expansion (**`getGlobalFieldPath`**, **`updateMigrationPath`**) remains correct for referred content types
- [ ] **`errorEntriesUid`** updated consistently on persistent update failures

### Async and API usage

- [ ] Async flows properly awaited
- [ ] Batching (**skip** / **limit**, **include_count**) correct for large entry sets
- [ ] Locale filtering behaves as documented when **`config.locale`** is set

## 3. Architecture

### Code organization

- [ ] **`migrate-html-rte.js`** stays focused on parse → config → stack → dispatch
- [ ] Heavy logic remains in **`src/lib/util/index.js`**
- [ ] New helpers colocated with related functions (path traversal, conversion, batching)

### Modularity

- [ ] Functions testable without running full CLI
- [ ] Duplication avoided between global-field and content-type paths where possible

## 4. Performance

- [ ] **`delay`** and **`batch-limit`** respected; no busy loops
- [ ] Retries bounded (same spirit as existing **3**-attempt patterns)
- [ ] No unnecessary duplicate fetches of content types or entries

## 5. Testing

- [ ] New or changed behavior covered in **`test/**/*.test.js`**
- [ ] **nock** / **sinon** used; no live Management API calls
- [ ] No **`.only`** / **`.skip`** committed

## 6. CLI-specific

### Command

- [ ] **`JsonMigrationCommand.flags`** documented and consistent with **`normalizeFlags`**
- [ ] **`examples`** updated if usage changes
- [ ] Exit code **2** on command error via **`this.error`**

### User experience

- [ ] Progress and summaries understandable
- [ ] Confirmation path still clear when not using **`--yes`**

## 7. Contentstack integration

- [ ] Auth paths (**alias** vs **stack-api-key**) unchanged in intent unless explicitly documented
- [ ] Branch handling uses **`doesBranchExist`** when branch is set
- [ ] Rate limits and pacing considered when adding Management API calls

## Before approving

- [ ] Critical issues resolved
- [ ] **`npm test`** passes
- [ ] Migration safety considered (data loss, partial updates, idempotency where relevant)
- [ ] README / oclif docs updated if command surface changes
