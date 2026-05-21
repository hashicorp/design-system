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

Create `packages/mcp/.env` from `packages/mcp/.env.example` and populate real values:

```sh
cp packages/mcp/.env.example packages/mcp/.env
```

If any of these are missing, the server still starts and deterministic manifest tools remain available.
`hds_search_docs` responds with `available: false` and a message describing missing variables.

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
- `hds_search_docs` (input: `query`, optional `scope`, optional `limit`)
  - Returns Helios documentation search results for discovery use cases (patterns, accessibility/content guidance, foundations, icons, tokens).
  - This tool is search-backed and non-deterministic by relevance ranking and index freshness.
  - Optional `scope` values: `all`, `components`, `foundations`, `patterns`, `about`, `icons`, `tokens`, `componentApi`, `content`.
  - Optional `limit`: defaults to `10`, minimum `1`, maximum `25`.

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
