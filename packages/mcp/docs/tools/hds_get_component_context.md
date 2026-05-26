# `hds_get_component_context`

Returns full catalog context for one component by `name` or `slug`.

## Input

```json
{
  "nameOrSlug": "button"
}
```

- `nameOrSlug` is required.

## Output (found)

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "found": true,
  "query": "button",
  "component": {
    "name": "Button",
    "slug": "button",
    "summary": "Button summary",
    "api": {}
  }
}
```

## Output (not found)

```json
{
  "generatedAt": "2026-05-12T00:29:04.586Z",
  "found": false,
  "query": "does-not-exist",
  "message": "Component not found. Use hds_list_components to discover valid names."
}
```

## Notes

- Deterministic for a fixed manifest.
