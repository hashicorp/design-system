# `hds_search_docs`

Searches Helios documentation content through a local MiniSearch index.

Use this tool as a discovery step. For any guidance claim, follow with
`hds_read_doc` to retrieve the exact section content.

When chaining into `hds_read_doc`, pass identifiers from the selected search
result (`docId`, `url`, optional `anchor`) and rely on full detail retrieval by
default. If the read response includes `truncated: true` or `nextCursor`, call
`hds_read_doc` again with `cursor: nextCursor` before making final guidance
claims.

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
      "snippet": "Guidance on accessibility requirements and testing.",
      "docId": "foundations/accessibility",
      "anchor": "overview"
    }
  ]
}
```

`results[]` always include core fields (`title`, `url`, `kind`, `section`,
`snippet`). Additional metadata fields may be included over time (for example
`docId`, `anchor`) to help callers chain into `hds_read_doc`.

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
- `hds_search_docs` is for discovery, not citation; use `hds_read_doc` to fetch
  focused source text before citing docs guidance.
- For complete retrieval, continue `hds_read_doc` calls with `cursor` whenever
  `nextCursor` is returned.
