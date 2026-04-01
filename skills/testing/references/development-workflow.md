# Development Workflow

Core development rules and Test-Driven Development (TDD) workflow for **`@contentstack/cli-cm-migrate-rte`**.

## TDD workflow (recommended)

For **new behavior or bug fixes**, prefer:

1. **RED** → Failing test (or extended test)
2. **GREEN** → Minimal code to pass
3. **REFACTOR** → Improve while tests stay green

**Exceptions:** pure refactors, documentation-only edits, and trivial non-behavior changes may skip new tests.

## Guidelines

- Prefer **clear tests** over heavy setup when you can
- **NO test.skip or .only** in commits
- **~80% coverage** (lines, branches, functions) is **aspirational**, not a CI gate
- **JavaScript** — match existing patterns in `src/`; favor readability and small functions

## File structure (this repo)

- **Command:** `src/commands/cm/entries/migrate-html-rte.js`
- **Migration logic:** `src/lib/util/index.js`, `src/lib/util/config_schema.json`
- **Tests:** `test/**/*.test.js`; fixtures `test/dummy/`; helpers `test/utils/`

## Naming conventions

- **Files:** `kebab-case.js` where used; tests `*.test.js`
- **Classes:** `PascalCase`
- **Functions / variables:** `camelCase`
- **Test descriptions:** "should [behavior] when [condition]"

## Code quality

### Error handling

- Throw **`Error`** with clear messages for users and tests
- Avoid swallowing errors; command layer maps to **`this.error`** where appropriate

### Import style

Follow **`src/lib/util/index.js`**: external packages first, then Node built-ins, then relative paths — stay consistent with neighboring files.

## Testing

### Coverage

- Aim high; **~80%** is a guideline
- Mock SDK and HTTP; use **`test/dummy`** JSON for API shapes

### Test structure

```javascript
describe("[ComponentName]", () => {
  beforeEach(() => {
    sinon.stub(ExternalService.prototype, "method").resolves(mockData);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should [expected behavior] when [condition]", async () => {
    const result = await component.method(input);
    expect(result).to.deep.equal(expectedOutput);
  });
});
```

## Commit suggestions

- Conventional commits are optional: `feat(scope): description`
- Include tests when you change behavior
- Run **`npm test`** before pushing
- No debugging code (`debugger`) left in

## Development process

1. **Understand** → Read relevant `@skills/*` and `.cursor/rules` as needed
2. **Plan** → Break work into testable units
3. **Test first** → When adding behavior, prefer failing test then implementation
4. **Validate** → `npm test`
5. **Review** → Self-review against `@skills/code-review`
