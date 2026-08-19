### :pushpin: Summary

If merged, this PR introduces shared abstractions and improves catalog dependency resolution in the MCP server, making the codebase more maintainable and enabling intelligent fallback when consumer dependencies are missing.

### :hammer_and_wrench: Detailed description

This refactoring addresses two key architectural concerns in the `packages/mcp` server:

**1. Improved Dependency Resolution**

The MCP server now uses a multi-anchor resolution strategy to locate catalog files:
- First tries the consumer's project directory (nearest `package.json`)
- Falls back to the `@hashicorp/design-system-components` dependency
- Finally uses bundled default catalogs

This allows the server to automatically use the consumer's installed catalog versions when available, while gracefully degrading when dependencies are missing. All catalog metadata now includes version tracking and resolution source for better debugging.

**2. Shared Abstractions**

Created six new utility modules under `packages/mcp/src/resources/shared/`:
- `catalog.ts` - Centralized lazy-loading catalog system with memoization
- `completions.ts` - Reusable completion logic with error handling
- `define-resource.ts` - Factory pattern for detail resource definitions
- `project-root.ts` - Project directory resolution with environment override support
- `responses.ts` - Standardized JSON response formatting
- `uri.ts` - URI encoding/decoding helpers

These abstractions eliminate ~500 lines of duplicated code across the components, flight-icons, and tokens resource domains, making the codebase significantly more maintainable.

**Testing**

Added comprehensive unit tests for all new shared utilities and updated integration tests to verify the new resolution behavior.

**Impact**: 33 files changed, 1,291 insertions(+), 537 deletions(-)
