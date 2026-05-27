# `hds_search_icons`

Searches Flight icons by text query across icon name, file names, category, description, and mapping.

## Input

```json
{
  "query": "apple",
  "limit": 10,
  "category": "Services",
  "size": "16",
  "hasMapping": true
}
```

- `query` (required): non-empty search text.
- `limit` (optional): max result count, default `10`, min `1`, max `50`.
- `category` (optional): category filter.
- `size` (optional): variant size filter (`16` or `24`).
- `hasMapping` (optional): include only icons with/without Carbon mapping metadata.

## Response shape

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

## Notes

- Deterministic for a fixed icon catalog build.
