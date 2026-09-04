---
applyTo: ".changeset/**"
description: "Instructions for how changeset files should be formatted for the MCP package."
---

For every consumer-facing change made to the `@hashicorp/design-system-mcp` package, a changeset file must be created in the `.changeset` folder. The changeset file should follow the formatting rules outlined below.

## MCP package changeset formatting

Each changeset entry related to the `@hashicorp/design-system-mcp` package should follow this template:

```
---
"@hashicorp/design-system-mcp": minor
---

Added the `list-components` tool for querying the component catalog.
```

For further instructions on changesets review the `.bob/skills/add-changeset/SKILL.md` file.
