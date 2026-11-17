---
"@hashicorp/design-system-mcp": minor
---

Added each theme's token value to `search_hds_tokens` and the `hds://tokens/{tokenKey}` resource:

- Results for a themed token now include `modes`, its value in the `default`, `cds-g0`, `cds-g10`, `cds-g90` and `cds-g100` themes.
- A `search_hds_tokens` query now also matches a token's value in every theme, so a value from a Carbon theme finds its token.

Fixed `search_hds_tokens` cutting the end off font stacks. Only inlined SVG data URLs are shortened now.

Updated the `search_hds_tokens` examples and description to use current token names and categories.
