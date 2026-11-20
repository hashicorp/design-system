---
applyTo: "packages/tokens/src/{global,products}/**"
description: "Organization and authoring context for hand-authored HDS source tokens"
---

## Overview

Hand-authored tokens are JSON files in `packages/tokens/src/global/` and `packages/tokens/src/products/shared/`. Nested object keys organize tokens and determine their reference paths and generated names.

## Organization

| Location | Contents |
| --- | --- |
| `src/global/color/core-*.json` | Foundational colors, and product palettes. |
| `src/global/color/semantic-*.json` | Semantic colors for border, focus, foreground, page, and surface roles. |
| `src/global/border/radius.json` | Border-radius values. |
| `src/global/elevation` | Box-shadow elevation values. |
| `src/global/css.json` and `focus-ring.json` | Shared CSS values and focus-ring definitions. |
| `src/products/shared/color/` | Company and product semantic colors. |
| `src/products/shared/typography.json` | Shared typography tokens. |
| `src/products/shared/*.json` | Component tokens such as accordion, button, modal, and table. |
| `src/products/shared/form/` | Shared form-control definitions and specific form elements. |
| `src/products/shared/copy/`, `link/`, and `stepper/` | Related component families split into focused files. |

Keep tokens in the existing file for their role or component. A new component family may merit a file or subdirectory; do not duplicate shared foundational or semantic values in component files.

## Format

The package uses DTCG-style `$value` and `$type` properties alongside repository-specific units, modes, comments, and metadata.

- A token object contains `$value`; surrounding objects form groups.
- Use `{dot.separated.path}` for references. Prefer semantic aliases for component values where an appropriate role exists.
- Preserve units, mode coverage, metadata, and existing composite-value conventions.
- Do not add a new metadata field or value shape without confirming the build supports it.

See [token format](format.instructions.md) for the complete current property inventory and examples.

## Paths and naming

The JSON path, not the filename or filesystem directory, supplies a token's identity:

```text
File: src/products/shared/accordion.json
JSON path: accordion.card.gap.small
Alias: {accordion.card.gap.small}
CSS custom property: --hds-accordion-card-gap-small
```

- Do not include `hds` or the leading CSS `--` in source keys; the build adds the prefix.
- Use lowercase kebab-case keys and meaningful nesting that produces the intended public name.

See [token naming](naming.instructions.md) for the naming grammar and examples. Existing legacy names are not a reason to rename published tokens during unrelated work.

## Making changes

1. Find the existing global, semantic, or component token and its consumers.
2. Reuse an appropriate alias, or add the value at the correct level.
3. Maintain the supported mode entries when changing a themed token.
4. Build and validate the generated names, values, units, and themed outputs with the [package checks](../context.instructions.md#common-build-commands).
