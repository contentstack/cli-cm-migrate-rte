# Framework Patterns

Config, CLI UX, and helper patterns for **`@contentstack/cli-cm-migrate-rte`**. Prefer matching **`src/lib/util/index.js`** and **`@contentstack/cli-utilities`** before introducing new abstractions.

## Configuration

- **File config:** `require(pathValidator(configPath))` then **`checkConfig`** with **jsonschema** against **`config_schema.json`**.
- **Flag-only config:** build a minimal object with **`paths`**: `[{ from: html-path, to: json-path }]`, plus **`delay`**, **`batch-limit`**, **`locale`**, **`branch`**, **`alias`** / **`stack-api-key`** as set.
- **User confirmation:** **`confirmConfig`** prints **`prettyPrint`** and **`cliux.confirm`** unless **`--yes`**.
- **Errors:** **`throwConfigError`** maps schema validation to short user-facing messages.

```javascript
const Validator = require("jsonschema").Validator;
const configSchema = require("./config_schema.json");

function checkConfig(config) {
  const v = new Validator();
  const res = v.validate(config, configSchema, { throwError: true, nestedErrors: true });
  return res.valid;
}
```

## CLI utilities

- **`cliux`** — confirmations and progress (**`customBar`** in util)
- **`pathValidator`** — safe resolution of **`--config-path`**
- **`managementSDKClient`**, **`isAuthenticated`**, **`doesBranchExist`** — stack/session consistency

## Delays and retries

- **`delay(ms)`** — spacing between entry updates and between locale passes
- **Batch fetch** — up to **3** retries with **5s** pause on failure
- **`handleEntryUpdate`** — up to **3** retries; failures recorded under **`config.errorEntriesUid`**

When adding new network-heavy loops, follow the same **retry budget** and **user-visible logging** style.

## HTML → JSON

- **`convertHtmlToJson`** — **JSDOM** body, **`collapse-whitespace`**, **`htmlToJson`** from **`@contentstack/json-rte-serializer`**
- **`applyDirtyAttributesToBlock`** — post-process for block **`attrs.dirty`**

Keep DOM and serializer concerns inside these helpers so tests can stub **`htmlToJson`** or **`JSDOM`** at boundaries if needed.

## Lodash and paths

- Heavy use of **`get`**, **`set`**, **`find`**, **`cloneDeep`**, **`isEmpty`** for nested entry data and schema walking — stay consistent with existing **`setEntryData`** / **`traverseSchemaForField`** patterns when extending field types.
