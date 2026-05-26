# `hds://components`

Returns the canonical HDS component catalog index.

## Resource

- URI: `hds://components`
- MIME type: `application/json`

## Response shape

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "totalComponentCount": 123,
  "components": [
    {
      "name": "Accordion",
      "slug": "accordion",
      "summary": "An accordion is a vertically stacked list of container-like toggles that reveal or hide associated sections of content."
    }
  ]
}
```

## Notes

- Deterministic for a fixed manifest.
