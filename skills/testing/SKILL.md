---
name: testing
description: Mocha/Chai/Sinon/nock testing and TDD for @contentstack/cli-cm-migrate-rte. Use when writing or debugging tests under test/ or adjusting coverage.
---

# Testing Patterns

## Quick Reference

For comprehensive testing guidance, see:

- **[Testing Patterns](./references/testing-patterns.md)** — Mocha, Chai, Sinon, nock, fixtures
- **[Development Workflow](./references/development-workflow.md)** — TDD process and validation

## TDD workflow summary

**RED → GREEN → REFACTOR** for behavior changes; pure refactors / docs-only may skip new tests when behavior is unchanged.

## Key testing rules

- **~80% coverage** (lines, branches, functions) is **aspirational**, not a hard CI gate here
- **Use sinon** for stubs; **nock** for HTTP where tests already pattern-match CMA URLs
- **Never make real API calls** in tests
- **Mock at module boundaries** (SDK, `command.cmaAPIUrl`), not irrelevant internals
- **Test both success and failure paths**
- **Use descriptive test names**: "should [behavior] when [condition]"

## Quick test template

```javascript
const { expect } = require("chai");
const sinon = require("sinon");

describe("[ComponentName]", () => {
  beforeEach(() => {
    sinon.stub(ExternalApi.prototype, "fetch").resolves(mockData);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should [expected behavior] when [condition]", async () => {
    // Arrange, Act, Assert
  });
});
```

## Usage

Open **references/testing-patterns.md** for organization, nock patterns, and alignment with **`test/setup.js`**.
