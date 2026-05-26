# `hds://components/{slug}`

Returns canonical per-component context by component slug.

## Resource template

- URI template: `hds://components/{slug}`
- MIME type: `application/json`

## Response shape (found)

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "found": true,
  "slug": "accordion",
  "component": {
    "name": "Accordion",
    "slug": "accordion",
    "summary": "An accordion is a vertically stacked list of container-like toggles that reveal or hide associated sections of content.",
    "api": {}
  }
}
```

## Response shape (not found)

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "found": false,
  "slug": "does-not-exist",
  "message": "Component not found for provided slug."
}
```

## Notes

- Slug is the canonical identifier for this resource.
- Deterministic for a fixed manifest.
