## 0.3.0

**Minor changes**

Added each theme's token value to `search_hds_tokens` and the `hds://tokens/{tokenKey}` resource:

- Results for a themed token now include `modes`, its value in the `default`, `cds-g0`, `cds-g10`, `cds-g90` and `cds-g100` themes.
- A `search_hds_tokens` query now also matches a token's value in every theme, so a value from a Carbon theme finds its token.

Fixed `search_hds_tokens` cutting the end off font stacks. Only inlined SVG data URLs are shortened now.

Updated the `search_hds_tokens` examples and description to use current token names and categories.

<small class="doc-whats-new-changelog-metadata">[#4299](https://github.com/hashicorp/design-system/pull/4299)</small>

<div class="doc-whats-new-changelog-separator"></div>

**Patch changes**

Updated the bundled documentation catalog with the latest documentation:

- Added the missing "Carbon theme" tab of the Typography page.
- Added the 7.1.0 version history and the latest release notes.

Added "Carbon theme" to the example values of the `search_hds_docs` `tab` filter.

<small class="doc-whats-new-changelog-metadata">[#4298](https://github.com/hashicorp/design-system/pull/4298)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**
  - @hashicorp/design-system-components@7.1.1

## 0.2.3

**Patch changes**

Updated the bundled documentation catalog with the latest documentation, including the Tooling pages.

Changed the `search_hds_docs` `section` and `tab` filter descriptions to give examples instead of a fixed list. The sections and tabs that exist are returned in `availableSections` and `availableTabs` when a filter doesn't match.

Fixed the documentation catalog build to expand code snippets that use the `theming` option or JSON files, and to include page-level banners on every tab.

<small class="doc-whats-new-changelog-metadata">[#4247](https://github.com/hashicorp/design-system/pull/4247)</small>

<div class="doc-whats-new-changelog-separator"></div>

**🔄 Updated dependencies:**

- @hashicorp/design-system-components@7.1.0
- @hashicorp/design-system-tokens@6.0.1

## 0.2.2

**Patch changes**

**🔄 Updated dependencies:**

- @hashicorp/design-system-components@7.0.0
- @hashicorp/design-system-tokens@6.0.0
- @hashicorp/flight-icons@5.3.0

## 0.2.1

**Patch changes**

**🔄 Updated dependencies:**

- @hashicorp/design-system-components@6.6.0

## 0.2.0

**Minor changes**

Added four MCP prompts for selecting, implementing, reviewing, and troubleshooting Helios components and patterns using documentation and resolved component APIs:

- `choose_hds_component` provides component recommendations with rationale, alternatives, and accessibility considerations.
- `implement_hds_pattern` guides clients to produce focused Ember implementations with integration test examples.
- `review_hds_usage` guides code reviews for API usage, composition, and accessibility responsibilities.
- `troubleshoot_hds_component` guides diagnosis of unexpected behavior with evidence-backed causes, diagnostic steps, and suggested corrections.

<small class="doc-whats-new-changelog-metadata">[#4150](https://github.com/hashicorp/design-system/pull/4150)</small>

<div class="doc-whats-new-changelog-separator"></div>

**Patch changes**

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@5.2.0
- @hashicorp/design-system-components@6.5.1

## 0.1.0

**Minor changes**

Added npm distribution for the Helios MCP server, installed as an application development dependency and launched with the `helios-design-system-mcp` command.

Fixed token and icon catalog fallback resolution to use the application's components package before the MCP server's own dependencies.

<small class="doc-whats-new-changelog-metadata">[#4143](https://github.com/hashicorp/design-system/pull/4143)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 0.0.1

**Patch changes**

**🔄 Updated dependencies:**

- @hashicorp/design-system-components@6.5.0
- @hashicorp/flight-icons@5.1.0
