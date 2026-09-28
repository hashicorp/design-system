# @hashicorp/design-system-mcp

## 0.2.0

### Minor Changes

Added four MCP prompts for selecting, implementing, reviewing, and troubleshooting Helios components and patterns using documentation and resolved component APIs:

- `choose_hds_component` provides component recommendations with rationale, alternatives, and accessibility considerations.
- `implement_hds_pattern` guides clients to produce focused Ember implementations with integration test examples.
- `review_hds_usage` guides code reviews for API usage, composition, and accessibility responsibilities.
- `troubleshoot_hds_component` guides diagnosis of unexpected behavior with evidence-backed causes, diagnostic steps, and suggested corrections.

<small class="doc-whats-new-changelog-metadata">[#4150](https://github.com/hashicorp/design-system/pull/4150)</small>

<div class="doc-whats-new-changelog-separator"></div>

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/flight-icons@5.2.0
- @hashicorp/design-system-components@6.5.1

## 0.1.0

### Minor Changes

Added npm distribution for the Helios MCP server, installed as an application development dependency and launched with the `helios-design-system-mcp` command.

Fixed token and icon catalog fallback resolution to use the application's components package before the MCP server's own dependencies.

<small class="doc-whats-new-changelog-metadata">[#4143](https://github.com/hashicorp/design-system/pull/4143)</small>

<div class="doc-whats-new-changelog-separator"></div>

## 0.0.1

### Patch Changes

**🔄 Updated dependencies:**

- @hashicorp/design-system-components@6.5.0
- @hashicorp/flight-icons@5.1.0
