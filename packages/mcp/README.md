# design-system-mcp

An MCP server for the Helios Design System.

## Scripts

- `pnpm lint`
- `pnpm typecheck`
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

The Inspector should connect successfully and show an MCP server.
