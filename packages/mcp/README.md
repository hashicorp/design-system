# @hashicorp/design-system-mcp

Helios Design System MCP (Model Context Protocol) server.

## Usage

```sh
pnpm --filter @hashicorp/design-system-mcp build
pnpm --filter @hashicorp/design-system-mcp start
```

## Manifest

The server reads component context from `manifest/components.json` at startup.

Current basic tools:

- `hds_list_components` (optional `query` filter)
- `hds_get_component_context` (input: `nameOrSlug`)
