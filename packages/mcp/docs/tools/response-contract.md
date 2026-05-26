# Response Contract

All MCP tools in this package return a text response envelope via `toTextResponse`.

All MCP resources in this package return JSON contents via `toJsonResourceResponse`.

## Transport envelope

The MCP response payload is wrapped as:

```json
{
  "content": [
    {
      "type": "text",
      "text": "{\n  \"...\": \"...\"\n}"
    }
  ]
}
```

The `text` field contains pretty-printed JSON (`JSON.stringify(payload, null, 2)`).

## Resource envelope

Resource reads return `contents[]` entries with JSON text:

```json
{
  "contents": [
    {
      "uri": "hds://components",
      "mimeType": "application/json",
      "text": "{\n  \"...\": \"...\"\n}"
    }
  ]
}
```

## Determinism guarantees

- `hds://manifest/meta`, `hds://components`, and `hds://components/{slug}` are deterministic for a fixed manifest.
- `hds_search_components` is deterministic for a fixed manifest and query.
- `hds_resolve_figma_node` and `hds_resolve_figma_frame` are deterministic for a fixed manifest and input values.
- `hds_search_docs` depends on Algolia relevance/index freshness and is not deterministic by ranking over time.

## Common envelope patterns

- Catalog-based responses usually include `generatedAt` from manifest metadata.
- Resolution tools return explicit matched/unmatched results instead of dropping unmatched nodes.
- Search tool includes `available: true|false` and explicit unavailable reasons when env vars are missing.
