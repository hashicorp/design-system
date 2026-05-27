# `hds://design/mappings`

Returns the canonical mapping table from Figma `fileKey`/`nodeId` pairs to HDS components.

## Resource

- URI: `hds://design/mappings`
- MIME type: `application/json`

## Response shape

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "totalMappingCount": 2,
  "mappings": [
    {
      "name": "Button",
      "slug": "button",
      "fileKey": "iweq3r2Pi8xiJfD9e6lOhF",
      "nodeId": "67397:95918"
    },
    {
      "name": "Alert",
      "slug": "alert",
      "fileKey": "iweq3r2Pi8xiJfD9e6lOhF",
      "nodeId": "67397:95940"
    }
  ]
}
```

## Notes

- Includes only components that have complete design mappings (`fileKey` and `nodeId`).
- Deterministic for a fixed manifest.
