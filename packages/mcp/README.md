# @hashicorp/design-system-mcp

Helios Design System MCP (Model Context Protocol) server.

## Usage

```sh
pnpm --filter @hashicorp/design-system-components generate:manifest
pnpm --filter @hashicorp/design-system-mcp build
pnpm --filter @hashicorp/design-system-mcp start
```

When using `pnpm start` for local development, the inspector runner persists a stable
proxy auth token at `packages/mcp/.mcp-inspector-auth-token` and disables automatic browser
open by default. This keeps the inspector URL stable across watch restarts and avoids opening
new tabs on each rebuild.

## Configuration

`hds_search_docs` uses a local MiniSearch index built at server startup.
It indexes content from:

- `website/dist/docs` (website docs JSON)

### Prerequisites

- Build website docs before starting MCP so `website/dist/docs` exists.

### Local manual runs (optional)

For local development, you can create `packages/mcp/.env` from
`packages/mcp/.env.example`:

```sh
cp packages/mcp/.env.example packages/mcp/.env
```

When present, `packages/mcp/.env` is loaded automatically by the server at startup.
Values already set in the runtime environment (for example by your MCP host) take precedence.

If docs source data is unavailable (for example `website/dist/docs` is missing),
the server still starts and deterministic manifest tools remain available.
In that case, `hds_search_docs` responds with `available: false` and an availability message.

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
- `hds://icons`
  - Returns a stable icon index envelope with `totalIconCount`, `totalAssetCount`, `categories`, and `icons`.
- `hds://icons/{iconName}`
  - Returns canonical per-icon context by icon name (`found`, `requestedIconName`, and either `icon` or `message`).

Resource listing behavior:

- `resources/list` is intentionally kept concise and returns top-level index resources.
- High-cardinality template resources (for example, `hds://tokens/{tokenKey}` and `hds://icons/{iconName}`) are resolved on-demand via direct URI reads instead of eager enumeration.

Current tools:

- `hds_search_components` (input: `query`, optional `limit`)
  - Returns filtered components for discovery-style text search.
- `hds_search_docs` (input: `query`, optional `scope`, optional `limit`)
  - Returns Helios documentation search results for discovery use cases (patterns, accessibility/content guidance, and docs reference pages).
  - Search uses a local MiniSearch index and deterministic tie-breaking over the same indexed snapshot.
  - Results can still change when source docs content changes between runs.
  - Optional `scope` values: `all`, `components`, `foundations`, `patterns`, `about`, `componentApi`, `content`.
  - Optional `limit`: defaults to `10`, minimum `1`, maximum `25`.
- `hds_resolve_figma_frame` (input: `fileKey`, `nodes[]`)
  - Resolves many Figma nodes to HDS components and returns matched/unmatched summary.
- `hds_search_tokens` (input: `query`, optional `limit`, optional `type`, optional `category`)
  - Returns filtered tokens for discovery-style token search by key/name/path/category/value text.
  - Optional `limit`: defaults to `10`, minimum `1`, maximum `50`.
- `hds_search_icons` (input: `query`, optional `limit`, optional `category`, optional `size`, optional `hasMapping`)
  - Returns filtered Flight icons for discovery-style search by icon name, file name, category, description, and mapping.
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
- `packages/mcp/docs/mcp/resources/hds_icons.md`
- `packages/mcp/docs/mcp/resources/hds_icon_by_name.md`

Tool docs:

- `packages/mcp/docs/mcp/tools/hds_search_components.md`
- `packages/mcp/docs/mcp/tools/hds_resolve_figma_frame.md`
- `packages/mcp/docs/mcp/tools/hds_search_docs.md`
- `packages/mcp/docs/mcp/tools/hds_search_tokens.md`
- `packages/mcp/docs/mcp/tools/hds_search_icons.md`
- `packages/mcp/docs/mcp/tools/response-contract.md`

Prompt docs:

- `packages/mcp/docs/mcp/prompts/hds_component_usage.md`
- `packages/mcp/docs/mcp/prompts/hds_implement_figma_frame.md`
- `packages/mcp/docs/mcp/prompts/response-contract.md`

## Internals

The MCP surface is organized under `src/mcp` by PVC pillars: prompts, resources, and tools.
Shared supporting infrastructure remains at the `src` root.

- `catalogs/components/store.ts` loads and validates manifest data, then exposes read-only lookup helpers.
- `catalogs/components/schema.ts` defines and validates the component catalog schema.
- `catalogs/components/lookup.ts` centralizes lookup key and name normalization logic.
- `mcp/tools/register-tools.ts` owns MCP tool registration.
- `mcp/tools/response-envelope.ts` centralizes response envelope formatting.
- `mcp/prompts/register-prompts.ts` owns MCP prompt registration.
- `mcp/prompts/response-prompt.ts` centralizes prompt message and envelope construction.
- `catalogs/docs/store.ts` builds the local docs index and exposes search + availability metadata.
- `catalogs/docs/scopes.ts` defines docs search scopes and scope filtering.
- `catalogs/docs/normalize-result.ts` normalizes docs search records into stable MCP result entries.
- `catalogs/docs/schema.ts` validates website docs page JSON records before indexing.
- `catalogs/tokens/store.ts` loads and validates token catalog data, then exposes read-only token lookup helpers.
- `catalogs/tokens/schema.ts` defines and validates the token catalog schema.
- `catalogs/tokens/lookup.ts` centralizes token lookup key and token type normalization logic.
- `catalogs/icons/store.ts` loads and validates icon catalog data, then exposes read-only icon lookup helpers.
- `catalogs/icons/schema.ts` defines and validates the icon catalog schema.
- `catalogs/icons/lookup.ts` centralizes icon lookup key normalization and icon aggregation logic.

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

`hds://icons`

```json
{
  "totalIconCount": 672,
  "totalAssetCount": 1344,
  "categories": ["Animated", "Services"],
  "icons": [
    {
      "iconName": "apple",
      "description": "apple, macos, ios",
      "category": "Services",
      "sizes": ["16", "24"],
      "hasMapping": true
    }
  ]
}
```

`hds_search_icons`

```json
{
  "query": "apple",
  "limit": 10,
  "category": "Services",
  "size": "16",
  "hasMapping": true,
  "totalIconCount": 672,
  "resultCount": 1,
  "results": [
    {
      "iconName": "apple",
      "description": "apple, macos, ios",
      "category": "Services",
      "sizes": ["16", "24"],
      "hasMapping": true
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
      "kind": "heading",
      "section": "foundations",
      "snippet": "Guidance on accessibility requirements and testing."
    }
  ]
}
```

`hds_search_docs` (unavailable)

```json
{
  "available": false,
  "query": "patterns",
  "scope": "all",
  "limit": 10,
  "resultCount": 0,
  "results": [],
  "message": "Docs catalog unavailable: website docs folder not found at /path/to/repo/website/dist/docs."
}
```
