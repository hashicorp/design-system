---
"@hashicorp/design-system-components": patch
---

<!-- START components/form/file-input -->
`FileInput` - Removed invalid selectors from the file selector button styles, such as `::file-selector-button.mock-hover` and `::file-selector-button:focus-visible::before`. Browsers ignored these rules, and CSS tools like Lightning CSS (used by Vite) reject them and fail the build.
<!-- END -->
