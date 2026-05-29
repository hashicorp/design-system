# `hds://figma/{fileKey}/nodes/{nodeId}`

Returns the mapped HDS component for one Figma node identified by `fileKey` and `nodeId`.

## Resource template

- URI template: `hds://figma/{fileKey}/nodes/{nodeId}`
- MIME type: `application/json`

## Response shape (found)

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "found": true,
  "fileKey": "iweq3r2Pi8xiJfD9e6lOhF",
  "nodeId": "67397:95918",
  "component": {
    "name": "Button",
    "slug": "button",
    "summary": "Button summary",
    "api": {}
  }
}
```

## Response shape (not found)

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "found": false,
  "fileKey": "iweq3r2Pi8xiJfD9e6lOhF",
  "nodeId": "99999:1",
  "message": "No design mapping found for this fileKey/nodeId.",
  "warnings": [
    "No design mapping found for this fileKey/nodeId.",
    "Node ID formats often use \":\" separators; dash-delimited IDs are normalized automatically.",
    "Did you mean nodeId \"67397:95918\"?"
  ]
}
```

## Notes

- Matching is deterministic and normalizes common node ID variants (`123-456` -> `123:456`).
- Template listing only includes known mapped node URIs.
