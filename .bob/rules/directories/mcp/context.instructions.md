---
applyTo: "packages/mcp/**"
description: "Context for the HDS MCP server package"
---

## Overview
The `packages/mcp` package (`@hashicorp/design-system-mcp`) is a Model Context Protocol server that exposes Helios Design System knowledge — component APIs, design tokens, icons, and usage documentation — to MCP-capable clients. It runs locally over a stdio transport, and its tools are read-only lookups against local catalogs with no network requests.

## Key files
- `src/index.ts` - Server entry point; builds the server, registers prompts, resources, and tools, and connects the stdio transport
- `src/tools/<domain>/` - Tools, registered in each domain's `index.ts` and aggregated by `src/tools/index.ts`
- `src/resources/<domain>/` - Resources, registered in each domain's `index.ts` and aggregated by `src/resources/index.ts`
- `src/prompts/` - Prompts, registered by `src/prompts/index.ts`
- `src/stores/<domain>/` - Shared catalog access, lookup, and ranking behavior used by tools and resources
- `src/catalog/` - Catalog loading, normalization, and project root resolution
- `docs-catalog.json` - Generated documentation snapshot; do not edit by hand
- `scripts/build-docs-catalog/` - Generates `docs-catalog.json` from `website/docs`
- `tests/unit/` - Unit tests mirroring the `src/` structure
- `tests/integration/` - Integration tests for behavior that crosses the MCP request boundary, including prompts under `tests/integration/prompts/`
- `README.md` - Consumer-facing setup and usage documentation
- `CONTRIBUTING.md` - Development workflow, testing, and release guidance

## Common build commands
- `pnpm build` - Compiles the TypeScript source into `dist/`
- `pnpm start` - Rebuilds and restarts the server on file changes
- `pnpm start:dev` - Rebuilds on file changes and runs the server under the MCP Inspector
- `pnpm test` - Runs the Vitest suite (not QUnit or Jest)
- `pnpm typecheck` - Runs the TypeScript compiler without emitting
- `pnpm lint` - Runs ESLint to check code quality and style
- `pnpm catalog:docs` - Regenerates `docs-catalog.json` after website documentation changes

## Requirements
- The server uses stdio, so diagnostics must be written to stderr; never write to stdout from the server entry point or request handlers
- Tool, resource, and prompt names, schemas, descriptions, and response shapes are part of the client-facing API; keep them explicit and update `README.md` when a public capability is added or changed
- New tools, resources, and prompts must include tests for registration, input/output behavior, error handling, and catalog lookups as appropriate
- Do not edit generated catalogs; regenerate `docs-catalog.json` with `pnpm catalog:docs` and update component, token, and icon catalogs through their owning packages
- Consumer-facing changes to the package must be accompanied by a changeset

## Related instructions

- `changeset.instructions.md`
  Instructions for creating changesets when making changes to the MCP package.
