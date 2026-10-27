---
"@hashicorp/design-system-mcp": patch
---

Updated the bundled documentation catalog with the latest documentation, including the Tooling pages.

Changed the `search_hds_docs` `section` and `tab` filter descriptions to give examples instead of a fixed list. The sections and tabs that exist are returned in `availableSections` and `availableTabs` when a filter doesn't match.

Fixed the documentation catalog build to expand code snippets that use the `theming` option or JSON files, and to include page-level banners on every tab.
