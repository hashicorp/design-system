# Prompts Response Contract

All MCP prompts in this package return a `messages` envelope via `toPromptResponse`.

## Transport envelope

The MCP prompt response payload is wrapped as:

```json
{
  "messages": [
    {
      "role": "user",
      "content": { "type": "text", "text": "..." }
    },
    {
      "role": "user",
      "content": {
        "type": "resource_link",
        "uri": "hds://...",
        "name": "...",
        "description": "...",
        "mimeType": "application/json"
      }
    }
  ]
}
```

Each message has a `role` of `user` or `assistant`. Each content block is one of:

- `text` — instruction or framing text.
- `resource_link` — a reference to a canonical `hds://...` resource that the host
  can fetch via `resources/read`. Prompts in this package only embed resources by
  URI; they never inline manifest JSON.

## Embedded resource policy

Prompts MUST surface manifest-derived data through `resource_link` content blocks
that point at canonical `hds://...` URIs (e.g. `hds://components/{slug}`,
`hds://figma/{fileKey}/nodes/{nodeId}`, `hds://manifest/meta`).

Prompts MUST NOT inline manifest fields (names, summaries, args, API shapes,
`generatedAt`, etc.) into prompt text. This keeps the manifest as the single
source of truth and avoids drift between regenerated manifests and pre-baked
prompt text.

The only prompt-text content that should reference manifest data is the
user-supplied argument values themselves, plus structural guidance that names
known canonical URIs (`hds://components/{slug}`) or tool names
(`hds_resolve_figma_frame`).

## Determinism guarantees

- Prompt builder functions are deterministic for a fixed input. Two invocations
  of `buildComponentUsagePromptMessages` or
  `buildImplementFigmaFramePromptMessages` with identical inputs produce
  identical `messages` arrays.
- Prompts do NOT call tools or read resources themselves. They produce a
  template that guides the model and host to do so.
- Downstream behavior — what the model does with the prompt, which tools it
  calls, what other MCP servers it consults — is not deterministic and is not
  controlled by this package.

## Common envelope patterns

- A typical prompt emits a framing `text` message, one or more
  `resource_link` messages, and a trailing `text` message describing the
  deliverable shape.
- Validation failures (empty inputs, oversized inputs) return a single `text`
  message that explains the issue, with no resource links attached.
