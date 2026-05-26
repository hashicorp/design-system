# `hds_search_components`

Searches HDS components by text query across name, slug, and summary.

## Input

```json
{
  "query": "accordion",
  "limit": 10
}
```

- `query` (required): non-empty search text.
- `limit` (optional): max result count, default `10`, min `1`, max `50`.

## Response shape

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "query": "accordion",
  "limit": 10,
  "totalComponentCount": 123,
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

## Notes

- Deterministic for a fixed manifest and query.
