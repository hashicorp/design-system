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

- `hds://manifest/meta`, `hds://design/mappings`, `hds://components`, `hds://components/{slug}`, and `hds://figma/{fileKey}/nodes/{nodeId}` are deterministic for a fixed manifest.
- `hds_search_components` is deterministic for a fixed manifest and query.
- `hds_resolve_figma_frame` is deterministic for a fixed manifest and input values.
- `hds_extract_showcase_snippets` is deterministic for a fixed showcase snapshot and identical input values (group ordering follows input component order; snippets sort by path within each group).
- `hds_search_docs` uses a local index with deterministic ranking for a fixed indexed snapshot; results can change when source docs data changes.
- `hds_read_doc` is deterministic for a fixed indexed docs snapshot and identical read parameters; retrieved content can change when source docs data changes.

## Common envelope patterns

- Catalog-based responses usually include `generatedAt` from manifest metadata.
- Resolution tools return explicit matched/unmatched results instead of dropping unmatched nodes.
- Search tool includes `available: true|false` and explicit unavailable reasons when local source data is missing.
- Docs tool results include stable core fields, and may include additive metadata fields over time; callers should ignore unknown fields safely.
- `hds_read_doc` supports continuation semantics: responses may include `truncated: true` and `nextCursor`; callers should continue with `cursor: nextCursor` to retrieve remaining sections before final docs-based guidance claims.
