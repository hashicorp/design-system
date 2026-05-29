# `hds_resolve_figma_frame`

Resolves many Figma nodes in one request using `fileKey` + `nodeId` per node.

## Input

```json
{
  "fileKey": "iweq3r2Pi8xiJfD9e6lOhF",
  "nodes": [{ "nodeId": "67397:95918" }, { "nodeId": "99999:1" }]
}
```

- `fileKey` is required.
- `nodes` is required, min 1 and max 200.

## Output

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "query": {
    "fileKey": "iweq3r2Pi8xiJfD9e6lOhF",
    "nodeCount": 2
  },
  "summary": {
    "total": 2,
    "matched": 1,
    "unmatched": 1
  },
  "matches": [
    {
      "nodeId": "67397:95918",
      "matched": true,
      "component": {
        "name": "Button",
        "slug": "button",
        "summary": "Button summary",
        "api": {}
      }
    },
    {
      "nodeId": "99999:1",
      "matched": false,
      "warnings": [
        "No design mapping found for this fileKey/nodeId.",
        "Node ID formats often use \":\" separators; dash-delimited IDs are normalized automatically.",
        "Did you mean nodeId \"67397:95918\"?"
      ]
    }
  ],
  "warnings": []
}
```

## Notes

- Deterministic lookup with node ID normalization for common dash format (`123-456` -> `123:456`).
- Output preserves per-node results so agents can handle mixed matched/unmatched frames.
- `hds://manifest/meta` includes canonical `designCoverage`; this tool repeats a coverage warning for action-time visibility.
