# design-system-mcp

An MCP server for the Helios Design System.

## Scripts

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm start`

## Documentation catalog

The documentation search tools use a generated catalog committed at
`src/catalogs/docs/catalog.json`. To rebuild the website and regenerate the
catalog:

```bash
pnpm catalog:docs:build
```

Tokens and icons are exposed separately as MCP resources and are not included
in documentation search.

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

The Inspector should connect successfully and show an MCP server.
