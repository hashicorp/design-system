# `hds://tokens`

Returns the canonical HDS token catalog index.

## Resource

- URI: `hds://tokens`
- MIME type: `application/json`

## Response shape

```json
{
  "totalTokenCount": 999,
  "tokens": [
    {
      "key": "{color.foreground.action}",
      "name": "token-color-foreground-action",
      "type": "color",
      "value": "#1060ff",
      "cssVar": "--token-color-foreground-action",
      "category": "color",
      "path": ["color", "foreground", "action"]
    }
  ]
}
```

## Notes

- Deterministic for a fixed token catalog build.
