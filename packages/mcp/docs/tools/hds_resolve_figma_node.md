# `hds_resolve_figma_node`

Resolves one Figma node to an HDS component using `fileKey` + `nodeId`.

## Input

```json
{
  "fileKey": "iweq3r2Pi8xiJfD9e6lOhF",
  "nodeId": "67397:95918"
}
```

- `fileKey` is required.
- `nodeId` is required.
- `nodeName` and `nodeDescription` are optional metadata passthrough and do not affect matching.

## Output (matched)

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "query": {
    "fileKey": "iweq3r2Pi8xiJfD9e6lOhF",
    "nodeId": "67397:95918"
  },
  "match": {
    "nodeId": "67397:95918",
    "matched": true,
    "component": {
      "name": "Button",
      "slug": "button",
      "summary": "Button summary",
      "api": {}
    }
  },
  "warnings": []
}
```

## Output (unmatched)

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "query": {
    "fileKey": "iweq3r2Pi8xiJfD9e6lOhF",
    "nodeId": "99999:1"
  },
  "match": {
    "nodeId": "99999:1",
    "matched": false,
    "warnings": [
      "No design mapping found for this fileKey/nodeId."
    ]
  },
  "warnings": [
    "No design mapping found for this fileKey/nodeId."
  ]
}
```

## Notes

- Matching is deterministic and only based on exact `fileKey` + `nodeId` lookup.
- If design metadata coverage is incomplete, a coverage warning is included.
