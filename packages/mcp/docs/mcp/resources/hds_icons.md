# `hds://icons`

Returns the canonical Flight icon catalog index.

## Resource

- URI: `hds://icons`
- MIME type: `application/json`

## Response shape

```json
{
  "totalIconCount": 672,
  "totalAssetCount": 1344,
  "categories": ["Animated", "Services"],
  "icons": [
    {
      "iconName": "apple",
      "description": "apple, macos, ios",
      "category": "Services",
      "sizes": ["16", "24"],
      "hasMapping": true
    }
  ]
}
```

## Notes

- Deterministic for a fixed icon catalog build.
