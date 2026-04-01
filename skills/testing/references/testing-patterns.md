# Testing Patterns

Testing best practices and TDD workflow for **`@contentstack/cli-cm-migrate-rte`**.

## TDD workflow

**RED → GREEN → REFACTOR** for behavior changes. Pure refactors / docs-only may skip new tests when behavior is unchanged.

## Test structure

### Basic template

```javascript
const { expect } = require("chai");
const sinon = require("sinon");

describe("[ComponentName]", () => {
  beforeEach(() => {
    sinon.stub(SomeClient.prototype, "fetch").resolves(mockData);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should [expected behavior] when [condition]", async () => {
    const input = { /* test data */ };
    const result = await moduleUnderTest(input);
    expect(result).to.deep.equal(expectedOutput);
  });
});
```

### Command / integration-style tests

See **`test/commands/json-migration.test.js`**: **`@oclif/test`** **`runCommand`**, **nock** against CMA URLs, stubs on **`command`** from **`src/lib/util`**, fixtures from **`test/utils`** and **`test/dummy`**.

## Key testing rules

### Coverage

- **~80%** (lines, branches, functions) is **aspirational**, not a hard gate (`npm test` runs nyc with **`--check-coverage=false`**)
- Test both success and failure paths
- Include edge cases for config, locales, global fields, and path validation when touching that code

### Mocking standards

- **sinon** for stubs/spies on SDK and CLI helpers
- **nock** for HTTP; **`nock.cleanAll()`** in setup where needed
- **Never** hit a real stack from unit tests
- Restore mocks in **`afterEach`** to avoid leakage

### Test patterns

- Descriptive names: "should [behavior] when [condition]"
- Minimal focused setup
- Group related cases in **`describe`** blocks

## Test organization

### File structure

- Specs: **`test/**/*.test.js`** (e.g. **`test/commands/json-migration.test.js`**)
- Fixtures: **`test/dummy/**/*.json`**
- Shared helpers: **`test/utils/index.js`**
- Mocha entry: **`test/setup.js`** (required by **`npm test`**)

### Test run

```text
npm test
# → nyc --check-coverage=false mocha --require test/setup.js --forbid-only "test/**/*.test.js"
```

## Error testing

```javascript
it("should reject when config is invalid", async () => {
  try {
    await subject(invalidConfig);
    expect.fail("expected rejection");
  } catch (err) {
    expect(err.message).to.match(/mandatory|Invalid/i);
  }
});
```

## Coverage and quality checklist

- [ ] Public behavior you change has test coverage
- [ ] Error paths covered where risky
- [ ] Mocks restored; no **`.only`** / **`.skip`** committed
- [ ] No real Management API calls
