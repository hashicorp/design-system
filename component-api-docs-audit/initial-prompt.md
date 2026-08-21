# Component API Documentation Audit

## Overview

The goal is to audit every HDS component and check the type definitions of component arguments in `packages/components/src/components/hds/` with its corresponding API documentation in `website/docs/components/`. The goal is to identify any inconsistencies in the documentation so they can be corrected to more accurately reflect our components to better serve our consumers and ongoing initiatives like the MCP server.

## Relevant Files

For each component, the source of truth definition lives in:
- `packages/components/src/components/hds/<name>/index.gts`, the `HdsXxxSignature` interface (`Args`, `Blocks`, `Element`)
- `packages/components/src/components/hds/<name>/types.ts`, exported enum values for each argument
- `.gts` files for contextual components yielded from the main component

The website component API documentation we are checking lives in:
- `website/docs/components/<name>/partials/code/component-api.md`

## Task requirements

All checks apply to **every argument** in both source and docs. Documentation should reflect the **consumer experience**. Internal implementation details (where a default lives, how a type is represented in TypeScript, the translation service) are not themselves findings. Source code bugs (e.g. an arg declared but never used) are worth noting but are not documentation inconsistencies.

### 1. Argument names
- Arg in source `Args` absent from docs: **missing arg**
- Arg in docs absent from source `Args`: **extra arg**
- Name differs between source and docs (camelCase vs kebab-case, typo, abbreviation): **wrong arg name**
- Never flag private fields, `@tracked` variables, or internal getters, as these are not consumer-facing
- Exception: link-routing args (`route`, `model`, `models`, `query`, `current-when`, `replace`) are grouped into one docs entry, do not flag as missing

### 2. Required/optional flag
- `arg?:` in source = optional, `arg:` = required
- Mismatch with `@required={{true}}` in docs: **wrong required flag**

### 3. Enum values
- Enum member names (e.g. `Light`, `Dark`) are internal. Always resolve to the string values on the right-hand side (e.g. `Light = 'light'` resolves to `'light'`), which is what consumers pass
- Compare resolved string values against `@values` in docs in both directions
- Mismatch: **wrong values**
- Intentionally omitted internal sentinels (e.g. `"default"`): flag for review

### 4. Defaults
- Check in this order: 1. `DEFAULT_*` constant 2. getter (`this.args.foo ?? <value>`) 3. translation string (use the `default:` fallback passed to `hdsIntl.t`)
- If a value references an enum member, resolve it to its string value
- Documented `@default` that matches the effective source value: no issue, regardless of where in source it lives
- Documented `@default` that doesn't match source: **wrong default**
- Documented `@default` with no corresponding source default: **default specified but none exists**
- No `@default` in docs but a default exists in source: **undocumented default**

### 5. Types
- Args typed as `HdsFooBarTypes` (template-literal string union) or `HdsFooBarValues` (enum) are correctly documented as `@type="string"`, do not flag
- Flag genuine mismatches: `number` as `@type="string"`, a function type as `@type="string"`, a `boolean` with string values `"true"`/`"false"`: **wrong type**

### 6. Named blocks
- Mismatch between `Blocks` interface in source and named block entries in docs: **wrong block**

### 7. WithBoundArgs exclusions
- If a contextual component is yielded with `WithBoundArgs<typeof Foo, 'argA' | 'argB'>`, those args are pre-bound by the parent and should not be documented on the child, do not flag as missing

## Output format

### Summary

At the top of the analysis document, maintain a summary section with the following stats:

- Components with issues out of total components audited (e.g. "7 / 9 audited")
- Total issue count (excluding potential source bugs)
- Count of potential source bugs noted separately
- Count of issues flagged for review, with the arg names listed
- A table of issue counts by type, with aligned columns, e.g.:

```
| Issue type                          | Count |
|-------------------------------------|-------|
| Wrong default                       | 3     |
| Wrong type                          | 6     |
| ...                                 | ...   |
```

### Findings

For each component, report findings as a structured bulleted list. Only include a component or contextual component if it has at least one issue. Components with no issues should be omitted entirely. Mark uncertain findings "FLAG FOR REVIEW" in the issue type. Do not fix anything, report only

Each issue must follow this structure exactly:

- **`argName`: issue type**
  - Description: one sentence explaining what is wrong
  - Source (`file:line`):
    - what the source defines for this arg
  - Docs (`file:line`):
    - what the docs currently say