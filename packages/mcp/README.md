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
- `hds://tokens`
  - Returns a stable token index envelope with `totalTokenCount` and `tokens`.
- `hds://tokens/{tokenKey}`
  - Returns canonical per-token context by token key (`found`, `requestedTokenKey`, and either `token` or `message`).

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
- `hds_search_tokens` (input: `query`, optional `limit`, optional `type`, optional `category`)
  - Returns filtered tokens for discovery-style token search by key/name/path/category/value text.
  - Optional `limit`: defaults to `10`, minimum `1`, maximum `50`.

Current prompts:

- `hds_component_usage` (args: `nameOrSlug`, optional `scenario`)
  - Generates an idiomatic, manifest-grounded usage example for a specific HDS component.
  - References `hds://components/{slug}` by URI; never inlines manifest data into prompt text.
- `hds_implement_figma_frame` (args: `fileKey`, `nodeIds`, optional `framework`, optional `notes`)
  - Generates an HDS-conformant Ember or Glimmer template for one or more Figma nodes.
  - References `hds://manifest/meta` and one `hds://figma/{fileKey}/nodes/{nodeId}` per input node, and names `hds_resolve_figma_frame` and `hds://components/{slug}` as the canonical resolution path.
  - Includes a capability-described integration hint so that any sibling Figma MCP server (e.g. Figma Dev Mode MCP) is used opportunistically without being required.
  - MCP prompt args are protocol-level strings; pass multiple node IDs as a single comma/space/newline-separated string.

## Tool docs

Detailed docs live in:

- `packages/mcp/docs/mcp/resources`
- `packages/mcp/docs/mcp/tools`
- `packages/mcp/docs/mcp/prompts`

Resource docs:

- `packages/mcp/docs/mcp/resources/hds_manifest_meta.md`
- `packages/mcp/docs/mcp/resources/hds_design_mappings.md`
- `packages/mcp/docs/mcp/resources/hds_components.md`
- `packages/mcp/docs/mcp/resources/hds_component_by_slug.md`
- `packages/mcp/docs/mcp/resources/hds_figma_node.md`
- `packages/mcp/docs/mcp/resources/hds_tokens.md`
- `packages/mcp/docs/mcp/resources/hds_token_by_key.md`

Tool docs:

- `packages/mcp/docs/mcp/tools/hds_search_components.md`
- `packages/mcp/docs/mcp/tools/hds_resolve_figma_frame.md`
- `packages/mcp/docs/mcp/tools/hds_search_docs.md`
- `packages/mcp/docs/mcp/tools/hds_search_tokens.md`
- `packages/mcp/docs/mcp/tools/response-contract.md`

Prompt docs:

- `packages/mcp/docs/mcp/prompts/hds_component_usage.md`
- `packages/mcp/docs/mcp/prompts/hds_implement_figma_frame.md`
- `packages/mcp/docs/mcp/prompts/response-contract.md`

## Internals

The MCP surface is organized under `src/mcp` by PVC pillars: prompts, resources, and tools.
Shared supporting infrastructure remains at the `src` root.

- `component-catalog/store.ts` loads and validates manifest data, then exposes read-only lookup helpers.
- `component-catalog/schema.ts` defines and validates the component catalog schema.
- `component-catalog/lookup.ts` centralizes lookup key and name normalization logic.
- `mcp/tools/register-tools.ts` owns MCP tool registration.
- `mcp/tools/response-envelope.ts` centralizes response envelope formatting.
- `mcp/prompts/register-prompts.ts` owns MCP prompt registration.
- `mcp/prompts/response-prompt.ts` centralizes prompt message and envelope construction.
- `docs-search/config.ts` parses and validates Algolia environment variables.
- `docs-search/scopes.ts` defines docs search scopes and scope filter mapping.
- `docs-search/normalize-result.ts` normalizes Algolia hits into stable MCP result entries.
- `docs-search/client.ts` handles docs search client availability and Algolia querying.
- `tokens/store.ts` loads and validates token catalog data, then exposes read-only token lookup helpers.
- `tokens/schema.ts` defines and validates the token catalog schema.
- `tokens/lookup.ts` centralizes token lookup key and token type normalization logic.

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

`hds://tokens`

```json
{
  "totalTokenCount": 999,
  "tokens": [
    {
      "key": "{color.foreground.action}",
      "name": "token-color-foreground-action",
      "type": "color",
      "value": "#1060ff",
      "cssVar": "--token-color-foreground-action",
      "category": "color",
      "path": ["color", "foreground", "action"]
    }
  ]
}
```

`hds_search_tokens`

```json
{
  "query": "foreground action",
  "limit": 10,
  "type": "color",
  "category": "color",
  "totalTokenCount": 999,
  "resultCount": 1,
  "results": [
    {
      "key": "{color.foreground.action}",
      "name": "token-color-foreground-action",
      "type": "color",
      "value": "#1060ff",
      "cssVar": "--token-color-foreground-action",
      "category": "color",
      "path": ["color", "foreground", "action"]
    }
  ]
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
