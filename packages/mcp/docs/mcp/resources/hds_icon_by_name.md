# `hds://icons/{iconName}`

Returns canonical icon detail by icon name.

## Resource template

- URI template: `hds://icons/{iconName}`
- MIME type: `application/json`

## Response shape (found)

```json
{
  "found": true,
  "requestedIconName": "apple",
  "icon": {
    "iconName": "apple",
    "description": "apple, macos, ios",
    "category": "Services",
    "sizes": ["16", "24"],
    "hasMapping": true,
    "variants": [
      {
        "id": "707:41",
        "fileName": "apple-16",
        "size": "16",
        "width": 16,
        "height": 16,
        "mapping": "Apple"
      }
    ]
  }
}
```

## Response shape (not found)

```json
{
  "found": false,
  "requestedIconName": "missing-icon",
  "message": "Icon not found for provided iconName."
}
```

## Notes

- Supports icon name and file name aliases as lookup inputs.
- Deterministic for a fixed icon catalog build.
