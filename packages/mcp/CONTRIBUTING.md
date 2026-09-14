# How to contribute

## Initial setup

The MCP package is part of the design-system pnpm workspace. Make sure Node.js 24.x and pnpm 10.11.0 are installed, then run these commands from the monorepo root:

```bash
git clone <repository-url>
cd design-system
pnpm install
cd packages/mcp
```

Create a branch from an up-to-date `main` branch before making changes.

## Development commands

Run these commands from `packages/mcp`, or use the equivalent `pnpm -F @hashicorp/design-system-mcp <command>` form from the monorepo root.

### Build

Compile the TypeScript source into `dist/`:

```bash
pnpm build
```

To rebuild automatically when files in `src/` change:

```bash
pnpm build:watch
```

To run the compiled server with a watcher for both the build and server:

```bash
pnpm start
```

### MCP Inspector

Use the Inspector to exercise the server's tools and resources interactively:

```bash
pnpm start:dev
```

This builds the package, watches TypeScript output, and starts the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector). After a one-time build, `pnpm inspect` starts the Inspector without starting the TypeScript watcher.

The server uses stdio, so application diagnostics must be written to stderr. Do not add logging to stdout in the server entry point or request handlers.

### Linting and type checking

```bash
pnpm lint
pnpm typecheck
```

### Tests

Run the full Vitest suite:

```bash
pnpm test
```

Run Vitest in watch mode while developing:

```bash
pnpm test:watch
```

Tests are split into unit tests and integration tests under `tests/`. New tools and resources should include tests for their registration, input/output behavior, error handling, and catalog lookups as appropriate.

## Updating the documentation catalog

`docs-catalog.json` is generated data. Do not edit it by hand. The catalog builder reads Markdown pages from `website/docs`, joins component documentation metadata from `packages/components/component-catalog.json`, validates the result, and writes the snapshot to `packages/mcp/docs-catalog.json`.

After changing the website documentation, run this command from `packages/mcp`:

```bash
pnpm catalog:docs
```

Review the generated diff to make sure the expected pages, routes, content, and metadata changed. The script preserves the existing `bundledAt` timestamp when the generated catalog content is unchanged.

The component, token, and icon catalogs are also generated or synchronized by their owning packages. Update those source packages through their own documented workflows rather than editing copied catalog output in the MCP package.

## Adding MCP functionality

Keep tools and resources organized by domain:

- Add tools under `src/tools/<domain>/` and register them in that domain's `src/tools/<domain>/index.ts`.
- Add resources under `src/resources/<domain>/` and register them in that domain's `src/resources/<domain>/index.ts`.
- If adding a new domain, import its domain index from the corresponding root index: `src/tools/index.ts` or `src/resources/index.ts`.
- Put shared catalog access and lookup behavior in the corresponding `src/stores/<domain>/` module.
- Add unit tests under the matching `tests/unit/` directory and integration coverage under `tests/integration/` when the behavior crosses the MCP request boundary.

Tool and resource descriptions are part of the client-facing API. Keep their names, schemas, descriptions, and response shapes explicit and update the README when a new public capability is added.

## Pull requests

Before opening a pull request:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Review generated files and the complete diff. Create a changeset for every change to the MCP package. This is required for consumer-facing changes and is the default for all other MCP package changes as well, including changes made before the package reaches v1.

From the monorepo root, create a changeset by running:

```bash
pnpm changeset
```

Select `@hashicorp/design-system-mcp` and describe the change in the generated file. Follow the repository's changeset guidance for choosing the release level and writing the summary.

See the [repository README](../../README.md) for the monorepo's workspace, changeset, and release guidance.
