# `hds_read_doc`

Retrieves focused Helios docs content for a specific document and optional section.

Use this after `hds_search_docs` when you need to cite guidance from docs content.

By default, read requests use full detail retrieval. If the response includes
`nextCursor`, call `hds_read_doc` again with
`cursor: nextCursor` before making final docs-based guidance claims.

## Input

```json
{
  "docId": "foundations/accessibility",
  "anchor": "overview",
  "detail": "full",
  "cursor": "eyJkb2NJZCI6ImZvdW5kYXRpb25zL2FjY2Vzc2liaWxpdHkiLCJhbmNob3IiOiJvdmVydmlldyIsIm9mZnNldCI6MH0",
  "maxSections": 3,
  "maxChars": 1200
}
```

- Provide at least one of `docId` or `url`.
- `anchor` is optional and narrows retrieval to a specific heading/anchor.
- `detail` is optional and defaults to full detail retrieval.
- `cursor` is optional and continues a previously truncated read.
- `maxSections` is optional (default: `3`, min `1`, max `10`).
- `maxChars` is optional (default: `1200`, min `200`, max `5000`).

## Output (found)

```json
{
  "found": true,
  "requested": {
    "docId": "foundations/accessibility",
    "anchor": "overview",
    "detail": "full",
    "maxSections": 3,
    "maxChars": 1200
  },
  "doc": {
    "docId": "foundations/accessibility",
    "url": "https://helios.hashicorp.design/foundations/accessibility",
    "title": "Accessibility",
    "section": "foundations"
  },
  "sections": [
    {
      "heading": "Overview",
      "anchor": "overview",
      "excerpt": "Guidance on accessibility requirements and testing.",
      "url": "https://helios.hashicorp.design/foundations/accessibility#overview"
    }
  ],
  "nextCursor": "eyJkb2NJZCI6ImZvdW5kYXRpb25zL2FjY2Vzc2liaWxpdHkiLCJhbmNob3IiOiJvdmVydmlldyIsIm9mZnNldCI6MX0"
}
```

## Output continuation (follow-up call)

When `nextCursor` is present, call again with the cursor from the prior
response:

```json
{
  "docId": "foundations/accessibility",
  "detail": "full",
  "cursor": "eyJkb2NJZCI6ImZvdW5kYXRpb25zL2FjY2Vzc2liaWxpdHkiLCJhbmNob3IiOiJvdmVydmlldyIsIm9mZnNldCI6MX0"
}
```

## Output (not found)

```json
{
  "found": false,
  "requested": {
    "docId": "foundations/does-not-exist",
    "detail": "full",
    "maxSections": 3,
    "maxChars": 1200
  },
  "sections": [],
  "message": "Requested doc was not found in the docs catalog."
}
```

## Notes

- Prefer passing `docId` or `url` returned by `hds_search_docs`.
- Excerpts remove MDX/include markup artifacts for cleaner learner-facing output.
- Retrieve focused sections before making docs-based guidance claims.
- If `nextCursor` is returned, continue reading with `cursor`
  until complete before final guidance claims.
- Output may include additive metadata fields over time; treat unknown fields as optional.
