# Tool Response Contract

All MCP tools in this package return a text response envelope via `toTextResponse`.

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

## Determinism guarantees

- `hds_get_manifest_meta`, `hds_list_components`, and `hds_get_component_context` are deterministic for a fixed manifest.
- `hds_resolve_figma_node` and `hds_resolve_figma_frame` are deterministic for a fixed manifest and input values.
- `hds_search_docs` depends on Algolia relevance/index freshness and is not deterministic by ranking over time.

## Common envelope patterns

- Catalog-based tools usually include `generatedAt` from manifest metadata.
- Resolution tools return explicit matched/unmatched results instead of dropping unmatched nodes.
- Search tool includes `available: true|false` and explicit unavailable reasons when env vars are missing.
