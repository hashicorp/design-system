---
applyTo: "packages/mcp/**"
description: "Context for the HDS MCP server"
---

## Overview

The `packages/mcp` package is the Model Context Protocol (MCP) server for the Helios Design System. It exposes design system knowledge — component APIs, tokens, and usage guidance — to MCP-capable clients over a stdio transport, so that AI tools can consume HDS data directly.

## Key files

- `src/index.ts` - Server entry point; builds the `McpServer`, installs lifecycle handlers, and connects the stdio transport
- `src/prompts/` - Prompt descriptors and the `registerPrompts` registration loop
- `src/resources/` - Resource descriptors, the `registerResources` registration loop, and shared response/error helpers
- `src/tools/` - Tool descriptors and the `registerTools` registration loop
- `src/resources/<name>/store/` - Loads the catalog data for a resource from the workspace dependency that ships it, validated by the Zod schema in its `schema.ts`
- `tests/` - Vitest suites, with shared helpers under `tests/support/`

## Common build commands

- `pnpm build` - Compiles the server to `dist/`
- `pnpm start` - Rebuilds on file changes and restarts the server
- `pnpm start:dev` - Rebuilds on file changes and runs the server under the MCP Inspector
- `pnpm typecheck` - Runs the TypeScript compiler without emitting output
- `pnpm lint` - Runs ESLint to check code quality and style
- `pnpm test` - Runs the Vitest suites

## Requirements

- All user-facing changes to the server must be accompanied by a changeset
- Never write to stdout; the stdio transport reserves it for protocol messages, so all diagnostics must go to stderr
- Register prompts, resources, and tools by adding descriptors to the arrays in the relevant `index.ts`, rather than calling the server registration methods directly
- Catalog data is read from the workspace dependency that ships it, and must conform to the Zod schema at `src/resources/<name>/store/schema.ts`

## Related instructions

- `changeset.instructions.md`
  Instructions for creating changesets when making changes to the MCP server.
