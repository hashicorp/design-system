---
applyTo: "packages/tokens/**"
description: "Context for the HDS design tokens package"
---

## Overview

`@hashicorp/design-system-tokens` provides Helios design tokens and CSS helper classes for product interfaces and cloud email. Style Dictionary transforms JSON source tokens into CSS custom properties, Sass variables, helper classes, themed stylesheets, and documentation JSON.

The package contains foundational values, semantic tokens, and component tokens. Prefer references to existing tokens over duplicating values, and preserve public token names when making changes.

## Key files

Paths are relative to `packages/tokens`.

- `src/global/` - Foundational values and shared semantic tokens
- `src/products/shared/` - Product semantics, typography, and component tokens
- `src/carbon-extracted/` - Generated Carbon inputs. Never edit these files manually
- `scripts/build.ts` and `scripts/build-parts/` - Build orchestration and custom Style Dictionary behavior
- `scripts/extract-carbon-tokens.ts` and `scripts/extract-carbon-parts/` - Regenerates Carbon inputs
- `dist/` - Generated package outputs. Change sources or build scripts, not generated files

## Common build commands

Run from `packages/tokens`:

- `pnpm build` - Regenerates `dist/` and copies themed CSS to showcase
- `pnpm start` - Watches `src/` and rebuilds on file changes
- `pnpm lint` - Runs ESLint to check package code
- `pnpm extract-carbon-tokens` - Regenerates Carbon inputs when explicitly needed

## Requirements

- Follow existing token conventions for naming, structure, and metadata.
- Never manually edit `src/carbon-extracted/` or use it as precedent for Helios token format or naming. Carbon references in hand-authored tokens are valid build inputs.
- Do not rename or remove published tokens as incidental cleanup.

## Related instructions

- `scripts.instructions.md`
  Instructions for token builds, transforms, themed outputs, and Carbon extraction.
- `tokens/context.instructions.md`
  Organization and authoring context for source tokens.
- `tokens/format.instructions.md`
  Guidelines for token JSON properties, metadata, aliases, units, and mode values.
- `tokens/naming.instructions.md`
  Guidelines for token names, semantic roles, component scopes, and modifiers.
- `../../../skills/run-checks/package-tokens-checks.md`
  Required checks for changes to the tokens package.
