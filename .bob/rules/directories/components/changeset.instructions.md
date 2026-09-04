---
applyTo: ".changeset/**"
description: "Instructions for how changeset files should be formatted for the components package."
---

For every consumer-facing change made to the `@hashicorp/design-system-components` package, a changeset file must be created in the `.changeset` folder. The changeset file should follow the formatting rules outlined below.

## Components package changeset formatting
Each changeset entry related to the `@hashicorp/design-system-components` package should follow this template:

Note: The `{components/path}` placeholder should be replaced with the path to the component that was changed, relative to a component's documentation path in the `website/docs/` directory. For example, if the `Button` component was changed, the `{components/path}` placeholder would be replaced with `components/button`.

```
<!-- START {components/path} -->
`ComponentName` - Fixed {...additional details}.
<!-- END -->
```

### Other formatting scenarios

Multiple changes to the same component in a single changeset entry:
```
<!-- START {components/path} -->
`ComponentName` - Brief description of the change.

- {...additional details #1}.
- {...additional details #2}.
<!-- END -->
```

Changes to multiple components in a single changeset entry:
```
<!-- START {components/path1} -->
`ComponentName1` - Fixed {...additional details}.
<!-- END -->

<!-- START {components/path2} -->
`ComponentName2` - Fixed {...additional details}.
<!-- END -->
```

For further instructions on changesets review the `.bob/skills/add-changeset/SKILL.md` file.