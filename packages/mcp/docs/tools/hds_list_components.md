# `hds_list_components`

Lists components available in the catalog, with optional text filtering.

## Input

```json
{
  "query": "button"
}
```

- `query` is optional.
- Matching is performed against component `name`, `slug`, and `summary`.

## Output

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "query": "button",
  "totalComponentCount": 70,
  "componentCount": 1,
  "components": [
    {
      "name": "Button",
      "slug": "button",
      "summary": "Button summary"
    }
  ]
}
```

## Notes

- Deterministic for a fixed manifest and query.
- Use this tool to discover canonical component names/slugs before requesting full context.
