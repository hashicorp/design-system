# @hashicorp/design-system-mcp

Helios Design System MCP (Model Context Protocol) server.

## Usage

```sh
pnpm --filter @hashicorp/design-system-components generate:manifest
pnpm --filter @hashicorp/design-system-mcp build
pnpm --filter @hashicorp/design-system-mcp start
```

## Configuration

`hds_search_docs` requires Algolia search credentials and index metadata:

- `ALGOLIA_APPLICATION_ID`
- `ALGOLIA_API_KEY_SEARCH`
- `ALGOLIA_INDEX_ID`

### Recommended: configure env vars in your MCP host

This server reads credentials from `process.env`.
When running via an MCP client/host, configure env vars on the server entry in that host config
so they are injected into the MCP process at startup.

Example pattern (host-specific keys may vary):

```json
{
  "mcpServers": {
    "hds": {
      "command": "pnpm",
      "args": ["--filter", "@hashicorp/design-system-mcp", "start"],
      "env": {
        "ALGOLIA_APPLICATION_ID": "...",
        "ALGOLIA_API_KEY_SEARCH": "...",
        "ALGOLIA_INDEX_ID": "..."
      }
    }
  }
}
```

Prefer your host's secret-management feature when available instead of committing credentials.

### Local manual runs (optional)

For local development, you can create `packages/mcp/.env` from
`packages/mcp/.env.example` and populate real values:

```sh
cp packages/mcp/.env.example packages/mcp/.env
```

When present, `packages/mcp/.env` is loaded automatically by the server at startup.
Values that are already set in the runtime environment (for example by your MCP host) take precedence.

If any of these are missing, the server still starts and deterministic manifest tools remain available.
`hds_search_docs` responds with `available: false` and a message describing missing variables.

## Manifest

The server reads component context from
`@hashicorp/design-system-components/manifest/components.json` at startup.
Regenerate the manifest from the components package whenever component
signatures or docs metadata change.

Current resources:

- `hds://manifest/meta`
  - Returns manifest metadata: `generatedAt`, `componentCount`, and `designCoverage`.
- `hds://design/mappings`
  - Returns canonical mapped `fileKey`/`nodeId` pairs for components with design metadata.
- `hds://components`
  - Returns a stable component index envelope with `generatedAt`, `totalComponentCount`, and `components`.
- `hds://components/{slug}`
  - Returns canonical per-component context by slug (`found`, `slug`, and either `component` or `message`).
- `hds://figma/{fileKey}/nodes/{nodeId}`
  - Returns canonical mapping lookup for one Figma node (`found`, `fileKey`, `nodeId`, and either `component` or `message`).

Current tools:

- `hds_search_components` (input: `query`, optional `limit`)
  - Returns filtered components for discovery-style text search.
- `hds_search_docs` (input: `query`, optional `scope`, optional `limit`)
  - Returns Helios documentation search results for discovery use cases (patterns, accessibility/content guidance, foundations, icons, tokens).
  - This tool is search-backed and non-deterministic by relevance ranking and index freshness.
  - Optional `scope` values: `all`, `components`, `foundations`, `patterns`, `about`, `icons`, `tokens`, `componentApi`, `content`.
  - Optional `limit`: defaults to `10`, minimum `1`, maximum `25`.
- `hds_resolve_figma_frame` (input: `fileKey`, `nodes[]`)
  - Resolves many Figma nodes to HDS components and returns matched/unmatched summary.

## Tool docs

Detailed docs live in:

- `packages/mcp/docs/resources`
- `packages/mcp/docs/tools`

Resource docs:

- `packages/mcp/docs/resources/hds_manifest_meta.md`
- `packages/mcp/docs/resources/hds_design_mappings.md`
- `packages/mcp/docs/resources/hds_components.md`
- `packages/mcp/docs/resources/hds_component_by_slug.md`
- `packages/mcp/docs/resources/hds_figma_node.md`

Tool docs:

- `packages/mcp/docs/tools/hds_search_components.md`
- `packages/mcp/docs/tools/hds_resolve_figma_frame.md`
- `packages/mcp/docs/tools/hds_search_docs.md`
- `packages/mcp/docs/tools/response-contract.md`

## Internals

- `component-catalog/store.ts` loads and validates manifest data, then exposes read-only lookup helpers.
- `component-catalog/schema.ts` defines and validates the component catalog schema.
- `component-catalog/lookup.ts` centralizes lookup key and name normalization logic.
- `tools/register-tools.ts` owns MCP tool registration.
- `tools/response-envelope.ts` centralizes response envelope formatting.
- `docs-search/config.ts` parses and validates Algolia environment variables.
- `docs-search/scopes.ts` defines docs search scopes and scope filter mapping.
- `docs-search/normalize-result.ts` normalizes Algolia hits into stable MCP result entries.
- `docs-search/client.ts` handles docs search client availability and Algolia querying.

## Testing workflow

- `pnpm --filter @hashicorp/design-system-mcp test` triggers a clean rebuild before running tests.
- Tests execute from `dist/**/*.test.js` to validate emitted package output.

## Example responses

`hds://manifest/meta`

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "componentCount": 4,
  "designCoverage": {
    "totalComponentCount": 4,
    "componentsWithDesignCount": 2,
    "componentsMissingDesignCount": 2
  }
}
```

`hds://design/mappings`

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "totalMappingCount": 2,
  "mappings": [
    {
      "name": "Button",
      "slug": "button",
      "fileKey": "iweq3r2Pi8xiJfD9e6lOhF",
      "nodeId": "67397:95918"
    },
    {
      "name": "Alert",
      "slug": "alert",
      "fileKey": "iweq3r2Pi8xiJfD9e6lOhF",
      "nodeId": "67397:95940"
    }
  ]
}
```

`hds://components`

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "totalComponentCount": 4,
  "components": [
    {
      "name": "Accordion",
      "slug": "accordion",
      "summary": "An accordion is a vertically stacked list of container-like toggles that reveal or hide associated sections of content."
    }
  ]
}
```

`hds://components/{slug}` (not found)

```json
{
  "found": false,
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "slug": "does-not-exist",
  "message": "Component not found for provided slug."
}
```

`hds://figma/{fileKey}/nodes/{nodeId}` (not found)

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "found": false,
  "fileKey": "iweq3r2Pi8xiJfD9e6lOhF",
  "nodeId": "99999:1",
  "message": "No design mapping found for this fileKey/nodeId."
}
```

`hds_search_components`

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "query": "accordion",
  "limit": 10,
  "totalComponentCount": 4,
  "resultCount": 1,
  "results": [
    {
      "name": "Accordion",
      "slug": "accordion",
      "summary": "An accordion is a vertically stacked list of container-like toggles that reveal or hide associated sections of content."
    }
  ]
}
```

`hds_search_docs` (available)

```json
{
  "available": true,
  "query": "accessibility",
  "scope": "content",
  "limit": 10,
  "resultCount": 1,
  "results": [
    {
      "title": "Accessibility",
      "url": "https://helios.hashicorp.design/foundations/accessibility",
      "kind": "text",
      "section": "foundations",
      "snippet": "Guidance on accessibility requirements and testing."
    }
  ]
}
```

`hds_search_docs` (unavailable due to missing env)

```json
{
  "available": false,
  "query": "patterns",
  "scope": "all",
  "limit": 10,
  "resultCount": 0,
  "results": [],
  "message": "Docs search is unavailable. Missing environment variables: ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY_SEARCH, ALGOLIA_INDEX_ID."
}
```
