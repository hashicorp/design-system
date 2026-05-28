# `hds_extract_showcase_snippets`

Extracts reusable showcase code fragments for one or more HDS component slugs.

This tool is designed to ground implementation output in real showcase patterns,
including nested component examples and helper files.

## Input

```json
{
  "components": ["button", "copy/button"],
  "query": "loading",
  "limitPerComponent": 3,
  "includeSource": true
}
```

- `components` (required): list of requested component slugs, min `1`, max `20`.
  - Supports flat and nested slugs (for example `button`, `copy/button`, `form/super-select`).
- `query` (optional): text filter over snippet name/path/content.
- `limitPerComponent` (optional): max snippets per requested component,
  default `3`, min `1`, max `10`.
- `includeSource` (optional): include raw snippet source in each result,
  default `true`.

## Response shape

```json
{
  "query": "loading",
  "limitPerComponent": 3,
  "includeSource": true,
  "resultCount": 2,
  "results": [
    {
      "component": "button",
      "resolvedSlug": "button",
      "snippetCount": 1,
      "snippets": [
        {
          "id": "button:with-loading-state.gts",
          "name": "with-loading-state",
          "path": "showcase/app/components/page-components/button/code-fragments/with-loading-state.gts",
          "language": "gts",
          "kind": "example",
          "source": "..."
        }
      ]
    },
    {
      "component": "copy/button",
      "resolvedSlug": "copy/button",
      "snippetCount": 1,
      "snippets": [
        {
          "id": "copy/button:with-modal.gts",
          "name": "with-modal",
          "path": "showcase/app/components/page-components/copy/button/code-fragments/with-modal.gts",
          "language": "gts",
          "kind": "example",
          "source": "..."
        }
      ]
    }
  ]
}
```

For unresolved components, the tool returns a non-fatal miss in-group:

```json
{
  "component": "does-not-exist",
  "resolvedSlug": null,
  "snippetCount": 0,
  "snippets": [],
  "message": "No showcase code fragments found for this component."
}
```

## Notes

- Group ordering follows input `components[]` order.
- Snippets are deterministically sorted by `path` within each group.
- `helpers/**` paths under `code-fragments` are classified as `kind: "helper"`.
- Use this tool for implementation style grounding; keep API decisions anchored
  to `hds://components/{slug}`.
