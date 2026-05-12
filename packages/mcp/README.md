# @hashicorp/design-system-mcp

Helios Design System MCP (Model Context Protocol) server.

## Usage

```sh
pnpm --filter @hashicorp/design-system-components generate:manifest
pnpm --filter @hashicorp/design-system-mcp build
pnpm --filter @hashicorp/design-system-mcp start
```

## Manifest

The server reads component context from
`@hashicorp/design-system-components/manifest/components.json` at startup.
Regenerate the manifest from the components package whenever component
signatures or docs metadata change.

Current basic tools:

- `hds_get_manifest_meta`
  - Returns manifest metadata: `generatedAt`, `componentCount`.
- `hds_list_components` (optional `query` filter)
  - Returns a stable envelope with `generatedAt`, `query`, `totalComponentCount`, `componentCount`, and `components`.
- `hds_get_component_context` (input: `nameOrSlug`)
  - Returns a stable envelope with `found`, `generatedAt`, `query`, and either `component` (when found) or `message` (when not found).

## Internals

- `component-catalog.ts` loads and validates manifest data, then exposes read-only lookup helpers.
- `tools/register-tools.ts` owns MCP tool registration.
- `tools/utils.ts` centralizes response envelope formatting.

## Example responses

`hds_get_manifest_meta`

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "componentCount": 4
}
```

`hds_list_components` (with `query`)

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "query": "accordion",
  "totalComponentCount": 4,
  "componentCount": 1,
  "components": [
    {
      "name": "Accordion",
      "slug": "accordion",
      "summary": "An accordion is a vertically stacked list of container-like toggles that reveal or hide associated sections of content."
    }
  ]
}
```

`hds_get_component_context` (not found)

```json
{
  "found": false,
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "query": "does-not-exist",
  "message": "Component not found. Use hds_list_components to discover valid names."
}
```
