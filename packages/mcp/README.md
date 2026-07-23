# design-system-mcp

An MCP server for the Helios Design System.

## Tools

### Documentation tools

> These tools are provided by the [zamoore/hds-6535/mcp_tools_website](https://github.com/hashicorp/design-system/tree/zamoore/hds-6535/mcp_tools_website) branch and are not yet on `main`.

| Tool | Description |
|---|---|
| `hds_search_docs` | Search Helios documentation for components, foundations, patterns, and accessibility guidance. |
| `hds_read_doc` | Read focused sections of a Helios documentation page. |

### Code example tools

| Tool | Description |
|---|---|
| `hds_search_code_examples` | Search working Ember/GTS code examples from the Helios Showcase app by component name, example title, or imported Helios component. |
| `hds_read_code_example` | Retrieve the complete GTS source and dependency metadata for a single Showcase code example. |

Code example tools complement documentation tools:

- **Documentation tools** answer _when_, _why_, and _how_ a component should be used.
- **Code example tools** return concrete Ember/GTS implementations from the Showcase app.

#### Code examples catalog generation

The code examples catalog is generated from Showcase source files at build time. The Showcase app itself does not need to be compiled — only its tracked source files are consumed.

```bash
# From packages/mcp
pnpm catalog:code-examples          # generate src/catalogs/code-examples/catalog.json
pnpm catalog:code-examples:check    # generate and verify the catalog is up to date
```

The catalog is committed to `src/catalogs/code-examples/catalog.json` and copied to `dist/` as part of `pnpm build`.

Source dependency: `showcase/app/components/**/code-fragments/**/*.gts`

#### Notes on code examples

- Examples are compiled Glimmer components, not a standalone snippet catalog.
- The `isStandalone` field indicates whether a fragment has no relative or Showcase-specific imports and could be copied directly into a consumer application.
- Snippets in search results are short normalized excerpts. Use `hds_read_code_example` to retrieve the full source.
- `showcaseUrl` is omitted in the MVP. Code fragments do not have their own routes; they appear on the owning component's Showcase page.

## Scripts

- `pnpm catalog:code-examples` — Generate the code examples catalog
- `pnpm catalog:code-examples:check` — Verify the code examples catalog is up to date
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm start`

## Local usage

From the monorepo root:

```bash
pnpm -F @hashicorp/design-system-mcp build
pnpm -F @hashicorp/design-system-mcp start
```

## Verify with MCP Inspector

From the monorepo root:

```bash
npx -y @modelcontextprotocol/inspector node packages/mcp/dist/index.js
```

The Inspector should connect successfully and show an MCP server with the registered tools.
