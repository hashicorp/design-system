---
"@hashicorp/design-system-mcp": minor
---

When usage telemetry is enabled, tool calls now also report tool-specific signals: query length and word counts, the top result, unrecognized filter kinds, documentation byte budgets, and requested component names that are shaped like HDS names (for example `Hds::Select::Multi`). Search queries, unrecognized filter values and other free text are never sent.
