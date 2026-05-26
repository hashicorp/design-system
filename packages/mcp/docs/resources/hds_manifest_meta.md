# `hds://manifest/meta`

Returns top-level HDS component manifest metadata.

## Resource

- URI: `hds://manifest/meta`
- MIME type: `application/json`

## Response shape

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "componentCount": 123,
  "designCoverage": {
    "totalComponentCount": 123,
    "componentsWithDesignCount": 100,
    "componentsMissingDesignCount": 23
  }
}
```

## Notes

- Deterministic for a fixed manifest.
