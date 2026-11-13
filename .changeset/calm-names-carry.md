---
"@hashicorp/design-system-mcp": minor
---

Added support for token names from before `@hashicorp/design-system-tokens` 6.0:

- `search_hds_tokens` now answers a renamed name such as `--token-color-foreground-action` with `migration`, and returns its replacement's results.
- `hds://tokens/{tokenKey}` now names the replacement for a renamed token, or says it was removed.

Added lookup of a token by its name without the `hds-` prefix, as the documentation writes it, e.g. `hds://tokens/foreground-color-action`.

Added support for a `search_hds_docs` tab written as it appears in passage ids, e.g. `carbon-theme`.

Added guidance on design tokens, icons and Carbon themes to the `review_hds_usage` and `implement_hds_pattern` prompts.

Updated the icon resource descriptions to call the icon set HDS icons.
