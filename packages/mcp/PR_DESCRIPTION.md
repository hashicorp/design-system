### :pushpin: Summary

Prepares `@hashicorp/design-system-mcp` for npm publication through the existing Changesets release pipeline. Consumers can install the server as an application dev dependency and launch it with the `helios-design-system-mcp` command, with catalog resolution preferring their installed HDS packages.

### :hammer_and_wrench: Detailed description

- Makes the package publishable and adds an executable entry point with a Node.js shebang. Requires Node.js 24 or later, matching the repository's tested runtime.
- Adds a clean build before publishing and an explicit published-file allowlist so releases contain compiled JavaScript, bundled documentation, the README, and the license rather than development source and tests.
- Keeps components, tokens, and icons as runtime dependencies of MCP to provide fallback catalogs when the consuming application does not supply them.
- Fixes token and icon resolution to locate the consumer's components package before falling back to MCP's dependencies. Uses the exported addon entry point so this also works with published components versions that do not export `package.json`.
- Documents local dev-dependency installation, MCP client configuration, project-root selection, catalog fallback behavior, and the bundled documentation snapshot.
- Follows the components package's `prepublishOnly` pattern: build, then check that required package files exist. CI runs the same build and file checks alongside the existing tests.
- Adds the MPL-2.0 license and a minor Changeset for the first public release. Stable and release-candidate publishing reuse the existing workflows without a separate MCP release process.

Validation passed: TypeScript, ESLint, all 462 tests, the build and required-file checks, and `git diff --check`. No package has been published as part of this change.
