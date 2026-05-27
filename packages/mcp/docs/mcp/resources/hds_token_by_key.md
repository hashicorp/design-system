# `hds://tokens/{tokenKey}`

Returns canonical token detail by token key.

## Resource template

- URI template: `hds://tokens/{tokenKey}`
- MIME type: `application/json`

## Response shape (found)

```json
{
  "found": true,
  "requestedTokenKey": "{color.foreground.action}",
  "token": {
    "key": "{color.foreground.action}",
    "name": "token-color-foreground-action",
    "type": "color",
    "value": "#1060ff",
    "cssVar": "--token-color-foreground-action",
    "category": "color",
    "path": ["color", "foreground", "action"],
    "original": {
      "$type": "color",
      "$value": "{color.palette.blue-200}",
      "key": "{color.foreground.action}"
    }
  }
}
```

## Response shape (not found)

```json
{
  "found": false,
  "requestedTokenKey": "{color.missing.demo}",
  "message": "Token not found for provided tokenKey."
}
```

## Notes

- `tokenKey` may be the canonical `{...}` key, dot path, or token name.
- Deterministic for a fixed token catalog build.
