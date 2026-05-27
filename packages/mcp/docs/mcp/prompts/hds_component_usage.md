# `hds_component_usage`

Generates an idiomatic, manifest-grounded usage example for a specific HDS
component. The prompt references the canonical
`hds://components/{slug}` resource as the source of truth and instructs the
model to use only documented arguments, blocks, and accessibility notes.

## Input

```json
{
  "nameOrSlug": "Button",
  "scenario": "with leading icon"
}
```

- `nameOrSlug` (required): component name or slug. Values like `Button`,
  `button`, and `Hds::Button` all resolve to the same component.
- `scenario` (optional): free-form context to tailor the example (e.g.
  `"destructive variant"`, `"in a form"`).

## Response shape (component matched)

```json
{
  "messages": [
    {
      "role": "user",
      "content": { "type": "text", "text": "Show idiomatic HDS usage..." }
    },
    {
      "role": "user",
      "content": {
        "type": "resource_link",
        "uri": "hds://components/button",
        "name": "HDS component: Button",
        "description": "Canonical context for the Button component.",
        "mimeType": "application/json"
      }
    },
    {
      "role": "user",
      "content": { "type": "text", "text": "Deliverable: ..." }
    }
  ]
}
```

## Response shape (component not matched)

When the input does not match any component, the prompt returns a single
`text` message that:

- States that no component matched the input.
- Suggests using `hds_search_components` or `hds://components` for discovery.
- Lists up to five nearest name/slug matches when any are found.

No `resource_link` content is included in this case.

## Notes

- Deterministic for a fixed manifest and inputs.
- Never inlines manifest fields into prompt text; manifest data is surfaced
  only by reference via `hds://components/{slug}`.
- See `packages/mcp/docs/mcp/prompts/response-contract.md` for the full envelope
  and policy.
