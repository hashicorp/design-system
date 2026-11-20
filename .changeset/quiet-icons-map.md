---
"@hashicorp/design-system-mcp": minor
---

Added the Carbon icon name to `search_hds_icons` results and the `hds://icons` resources:

- An icon that maps to a Carbon icon now includes `carbonIconName`, e.g. `Arrow--right`.
- Searching a whole Carbon icon name now ranks the HDS icons mapped to it just below an icon with that exact name. For example, `Close` now finds `x` first.
- The `hasMapping` filter is now described as "maps to a Carbon icon" instead of a Figma component mapping.

Fixed free-text notes in the `mapping` field of `@hashicorp/flight-icons` 5.0.0 being treated as Carbon mappings.
