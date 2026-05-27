# `hds_search_docs`

Searches Helios documentation content through Algolia.

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
- `icons`
- `tokens`
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
      "kind": "text",
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
  "message": "Docs search is unavailable. Missing environment variables: ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY_SEARCH, ALGOLIA_INDEX_ID."
}
```

## Notes

- Requires `ALGOLIA_APPLICATION_ID`, `ALGOLIA_API_KEY_SEARCH`, and `ALGOLIA_INDEX_ID`.
- Search ranking can vary with index state and relevance, so this tool is not deterministic over time.
