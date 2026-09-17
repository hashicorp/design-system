---
"@hashicorp/design-system-mcp": minor
---

Added npm distribution for the Helios MCP server, installed as an application development dependency and launched with the `helios-design-system-mcp` command.

Fixed token and icon catalog fallback resolution to use the application's components package before the MCP server's own dependencies.
