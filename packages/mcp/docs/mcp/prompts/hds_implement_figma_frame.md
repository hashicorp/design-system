# `hds_implement_figma_frame`

Generates an HDS-conformant Ember or Glimmer template for one or more Figma
nodes. The prompt references canonical manifest resources, names the
`hds_resolve_figma_frame` tool as the authoritative batched matcher, and
includes an optional, capability-described integration hint for any sibling
Figma MCP server that might also be connected.

## Input

```json
{
  "fileKey": "iweq3r2Pi8xiJfD9e6lOhF",
  "nodeIds": "67397:95918, 67397:95940",
  "framework": "ember",
  "notes": "this is a destructive flow"
}
```

- `fileKey` (required): Figma file key the target nodes belong to.
- `nodeIds` (required): one or more Figma node IDs as a single string.
  Separate multiple IDs with commas, spaces, or newlines. The prompt parses
  this into an ordered list of unique trimmed values, preserves input order,
  and rejects empty input or more than 200 IDs.
- `framework` (optional): `ember` (default) or `gts`. Selects the deliverable
  code-fence (` ```hbs ` or ` ```gts `). Unknown values fall back to `ember`.
- `notes` (optional): free-form context surfaced verbatim in the framing
  message.

MCP prompt arguments are protocol-level strings; the `nodeIds` argument
accepts a delimited string rather than an array.

## Response shape

The prompt always emits exactly the following sequence when inputs are valid:

1. A framing `text` message that interpolates the file key, node IDs,
   framework, and notes.
2. One `resource_link` to `hds://manifest/meta`.
3. One `resource_link` to `hds://figma/{fileKey}/nodes/{nodeId}` per input
   node, in the same order as the input.
4. A workflow `text` message that names `hds_resolve_figma_frame` and
   `hds://components/{slug}` as the canonical resolution path, describes the
   deliverable, and provides the optional Figma MCP integration hint.

## Optional Figma MCP integration

The workflow message includes a capability-described paragraph that instructs
the model to prefer a sibling Figma MCP server (if one is connected) for
fetching design data — without requiring any specific tool name. Phrasing is
of the form "a tool like `get_code`, `get_image`, `get_variable_defs`,
`get_code_connect_map`, or `get_figma_data`", which intentionally accommodates
both Figma's official Dev Mode MCP and community Figma MCPs while remaining a
no-op when no such capability is available.

The HDS manifest is always treated as authoritative for component APIs.
Figma-sourced data is used only to disambiguate variants (size, color,
intent, etc.).

## Validation responses

When inputs are invalid the prompt returns a single `text` message with no
resource links:

- Empty `fileKey` or `nodeIds` → "Cannot build an implementation prompt
  without a non-empty `fileKey` and at least one `nodeId`."
- More than 200 node IDs → "Too many node IDs (N); the maximum supported per
  invocation is 200."

## Notes

- Builder output is deterministic for a fixed input. Downstream model and
  tool behavior is not.
- Never inlines manifest fields into prompt text; manifest data is surfaced
  only by reference.
- See `packages/mcp/docs/mcp/prompts/response-contract.md` for the full envelope
  and policy.
