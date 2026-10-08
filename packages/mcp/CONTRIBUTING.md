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

In the Inspector, connect using stdio, list the tools, and call `get_hds_component` with `{"name":"Hds::Button"}` to verify a catalog lookup. You can also inspect the server's prompts and resources.

The server uses stdio, so application diagnostics must be written to stderr. Do not add logging to stdout in the server entry point or request handlers.

### Connecting an MCP client to a local build

To test a local build in a real MCP client, run `pnpm build`, then configure a stdio server that uses `node` as the command and the absolute path to `packages/mcp/dist/index.js` as its argument. Set `HDS_MCP_PROJECT_ROOT` in the server's `env` to query a separate application's installed catalogs. Restart the server after rebuilding.

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

Tests are split into unit tests and integration tests under `tests/`. New tools, prompts, and resources should include tests for their registration, input/output behavior, error handling, and catalog lookups as appropriate.

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
- Add prompts as individual files under `src/prompts/` and register them in the `PROMPTS` list in `src/prompts/index.ts`. Reference tools through their exported name constants rather than hard-coded strings so prompts stay in sync with tool renames, and reuse the argument and result helpers in `src/prompts/shared.ts`.
- Put shared catalog access and lookup behavior in the corresponding `src/stores/<domain>/` module.
- Add unit tests under the matching `tests/unit/` directory and integration coverage under `tests/integration/` when the behavior crosses the MCP request boundary. Prompt coverage lives under `tests/integration/prompts/`.

Tool, prompt, and resource descriptions are part of the client-facing API. Keep their names, schemas, descriptions, and response shapes explicit and update the README when a new public capability is added.

## Pull requests

Before opening a pull request:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Review generated files and the complete diff. Create a changeset for every consumer-facing change to the MCP package, including changes made before the package reaches v1. Consumer-facing changes are those that affect how the server behaves for clients, such as tools, prompts, resources, their schemas and descriptions, response shapes, catalog resolution, dependencies, and the bundled documentation snapshot. Changes limited to tests, internal refactoring, or repository documentation do not need a changeset.

From the monorepo root, create a changeset by running:

```bash
pnpm changeset
```

Select `@hashicorp/design-system-mcp` and describe the change in the generated file. Follow the repository's changeset guidance for choosing the release level and writing the summary.

See the [repository README](../../README.md) for the monorepo's workspace, changeset, and release guidance.
