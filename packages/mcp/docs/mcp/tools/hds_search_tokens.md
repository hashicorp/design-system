# `hds_search_tokens`

Searches HDS tokens by text query across key, name, path, category, and string values.

## Input

```json
{
  "query": "foreground action",
  "limit": 10,
  "type": "color",
  "category": "color"
}
```

- `query` (required): non-empty search text.
- `limit` (optional): max result count, default `10`, min `1`, max `50`.
- `type` (optional): token type filter.
- `category` (optional): token category filter.

## Response shape

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

## Notes

- Deterministic for a fixed token catalog.
