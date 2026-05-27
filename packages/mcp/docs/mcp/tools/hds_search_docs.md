# `hds_search_docs`

Searches Helios documentation content through a local MiniSearch index.

## Input

```json
{
  "query": "accessibility",
  "scope": "content",
  "limit": 10
}
```

- `query` is required.
- `scope` is optional (default: `all`).
- `limit` is optional (default: `10`, min `1`, max `25`).

Supported scopes:

- `all`
- `components`
- `foundations`
- `patterns`
- `about`
- `componentApi`
- `content`

## Output (available)

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

## Output (unavailable)

```json
{
  "available": false,
  "query": "accessibility",
  "scope": "all",
  "limit": 10,
  "resultCount": 0,
  "results": [],
  "message": "Docs catalog unavailable: website docs folder not found at /path/to/repo/website/dist/docs."
}
```

## Notes

- Search index data is loaded from `website/dist/docs`.
- No docs search API credentials are required.
- Ranking uses deterministic tie-breaking for a fixed indexed snapshot.
- Results can change when the indexed source content changes.
