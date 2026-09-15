# design-system-mcp

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server for the Helios Design System. It gives MCP clients local access to Helios component APIs, documentation, design tokens, and Flight icons over a stdio transport.

## Capabilities

The server exposes these tools:

| Tool | Purpose |
| --- | --- |
| `search_hds_components` | Find components by invocation name, class name, module path, or docs path. |
| `get_hds_component` | Read a component's arguments, blocks, yielded components, and accepted values. |
| `search_hds_docs` | Search the bundled Helios documentation snapshot. |
| `read_hds_docs` | Read a documentation passage returned by `search_hds_docs`. |
| `search_hds_icons` | Search the Flight icon catalog. |
| `search_hds_tokens` | Search the Helios design token catalog. |

It also exposes catalog resources for clients that support MCP resources:

| Resource | Purpose |
| --- | --- |
| `hds://components` and `hds://components/{componentName}` | Component summaries and individual component details. |
| `hds://icons` and `hds://icons/{iconName}` | Icon summaries and individual icon details. |
| `hds://tokens` and `hds://tokens/{tokenKey}` | Token summaries and individual token details. |

Catalog and documentation data is read locally. Tool calls do not make network requests. Documentation results include canonical Helios URLs so a client can fetch the live page when needed.

## Requirements

- Node.js 24.x
- pnpm 10.11.0

The required Node.js and pnpm versions are pinned in the repository's `.nvmrc` and `.tool-versions` files. Install dependencies from the monorepo root before working in this package:

```bash
pnpm install
```

## Local usage

Build and run the server from the monorepo root:

```bash
pnpm -F @hashicorp/design-system-mcp build
pnpm -F @hashicorp/design-system-mcp serve
```

The server communicates using stdio. Do not pipe its stdout through another diagnostic tool; stdout is reserved for MCP protocol messages and diagnostics are written to stderr.

For a build watcher and server watcher, use:

```bash
pnpm -F @hashicorp/design-system-mcp start
```

## MCP Inspector

The Inspector provides a browser UI for checking the server's tools and resources during development. Start it with the package's build and Inspector watchers:

```bash
pnpm -F @hashicorp/design-system-mcp start:dev
```

Alternatively, after building, run the Inspector directly:

```bash
pnpm -F @hashicorp/design-system-mcp inspect
```

The Inspector should connect successfully and show the `helios-design-system-mcp` server.

## Connecting an MCP client

Configure an MCP client to run the compiled entry point with Node.js. The path must be absolute in clients that do not resolve paths relative to the repository:

```json
{
  "mcpServers": {
    "helios-design-system": {
      "command": "node",
      "args": [
        "/absolute/path/to/design-system/packages/mcp/dist/index.js"
      ]
    }
  }
}
```

Build the package again after source changes so the client runs the latest compiled server.

## Catalog data

The server loads component, token, and icon catalogs from package data and includes a committed documentation snapshot in `docs-catalog.json`, generated from `website/docs`.

Catalog resolution differs by data source:

- The component catalog checks the project root first, then resolves the catalog from the MCP package's installed components dependency.
- The token and icon catalogs check the project root first, then the installed components package, then the MCP package's installed dependency.
- The documentation catalog always loads the committed `docs-catalog.json` from this package. It is not replaced by a consumer project's documentation.

The project-root lookup uses the nearest directory containing a `package.json`, starting from the server's current working directory. Set `HDS_MCP_PROJECT_ROOT` to override that directory when the server is launched from somewhere else:

```bash
HDS_MCP_PROJECT_ROOT=/absolute/path/to/consumer-project \
  pnpm -F @hashicorp/design-system-mcp serve
```

Regenerate the documentation snapshot after documentation changes:

```bash
pnpm -F @hashicorp/design-system-mcp catalog:docs
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the complete development workflow.

## License

This project is licensed under the [Mozilla Public License 2.0](../../LICENSE).
