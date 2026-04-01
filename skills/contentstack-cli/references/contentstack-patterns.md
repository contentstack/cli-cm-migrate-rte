# Contentstack patterns — migrate HTML RTE plugin

Guidance for **`@contentstack/cli-cm-migrate-rte`**: migrate entry field data from HTML RTE to JSON RTE using the Management API.

## Repository layout

| Area | Role |
|------|------|
| `src/commands/cm/entries/migrate-html-rte.js` | CLI entry: flags, `normalizeFlags`, `getConfig`, `getStack`, dispatch migration |
| `src/lib/util/index.js` | Stack client, config loading/validation, batching, path validation, HTML→JSON, global-field fan-out |
| `src/lib/util/config_schema.json` | JSON Schema for migration config (paths, locale, delay, batch-limit, etc.) |

There is **no** `src/core/` or `src/services/` directory in this repo.

## Command pattern

Use **`@contentstack/cli-command`** and **`@contentstack/cli-utilities`**:

```javascript
const { Command } = require("@contentstack/cli-command");
const { flags } = require("@contentstack/cli-utilities");
const {
  getStack,
  getConfig,
  getToken,
  updateSingleContentTypeEntries,
  updateContentTypeForGlobalField,
  normalizeFlags,
} = require("../../../lib/util");

class JsonMigrationCommand extends Command {
  async run() {
    const { flags: migrateRteFlags } = await this.parse(JsonMigrationCommand);
    const normalizedFlags = normalizeFlags(migrateRteFlags);
    const config = await getConfig(normalizedFlags);
    const stackOptions = { host: this.cmaHost };
    if (config.alias) stackOptions.token = getToken(config.alias);
    if (config["stack-api-key"]) stackOptions.stackApiKey = config["stack-api-key"];
    if (config.branch) stackOptions.branch = config.branch;
    const stack = await getStack(stackOptions);
    if (config["global-field"]) {
      await updateContentTypeForGlobalField(stack, config["content-type"], config);
    } else {
      await updateSingleContentTypeEntries(stack, config["content-type"], config);
    }
  }
}

JsonMigrationCommand.flags = {
  "config-path": flags.string({ char: "c", ... }),
  alias: flags.string({ char: "a", ... }),
  // see migrate-html-rte.js for full flags
};

module.exports = JsonMigrationCommand;
```

### Conventions

- Validate config early (**`paths`** required); surface schema errors via **`throwConfigError`** messages.
- Use **`cliux.confirm`** for interactive confirmation unless **`--yes`**.
- Prefer **chalk** for user-visible success/error lines in the command.

## Migration pipeline (conceptual)

1. **Load config** — file (**`pathValidator`**) or flags; **jsonschema** validation against **`config_schema.json`**.
2. **Resolve stack** — **`managementSDKClient`** with branch validation (**`doesBranchExist`**).
3. **Content type or global field** — fetch schema; for global fields, expand **`paths`** with **`getGlobalFieldPath`** / **`updateMigrationPath`**.
4. **Validate paths** — **`isPathValid`** ensures HTML RTE (**`allow_rich_text`**) and JSON RTE (**`allow_json_rte`**) exist, same parent depth, matching multiple/single.
5. **Entries** — paginated **query** + **find**, **`delay`** between entries, **`convertHtmlToJson`** per field path; **`handleEntryUpdate`** with retries; collect **`errorEntriesUid`** on persistent failure.

## Authentication and secrets

- **`alias`**: management token from CLI (**`getToken`**).
- **`stack-api-key`**: requires authenticated CLI session (**`isAuthenticated`**) in **`getStack`**.
- Do not print tokens or keys in logs or migration output.

## API and rate limits

- Contentstack Management API is rate-limited; existing code uses **delays** and **retries** on batch fetch and entry update.
- In tests, stub **`command.cmaAPIUrl`**, use **nock** for `/v3/` routes, and stub **`managementSDKClient`** as in **`test/commands/json-migration.test.js`**.

---

## Other CLI plugins (context)

Other Contentstack CLI packages may use **bulk-operation** logs or **BaseBulkCommand**. **This plugin** uses a single command class and **`src/lib/util`** batching only.
