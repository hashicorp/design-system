---
name: add-changeset
description: "Instructions for how to write changelog entries"
---

## Context
All changelog entries are created using changesets. Upcoming changeset files are located in the `.changeset` folder. Changeset files are created using the `changeset` CLI tool, which prompts the user to input the relevant information for the changelog entry. After a changeset file is created, it can be edited manually to ensure it follows the correct format and includes all necessary information.

## Adding a changeset entry

### Parameters

For a given changeset the following parameters are required:
- **Package**: The package(s) affected by the change.
- **Version bump**: The level of change being made (patch, minor, major).
- **Summary**: A short description of the change, including relevant details.

### Generating a changeset file

1. Locate the `.changeset` directory where the changeset file should be placed

2. Create the changeset file
Under the `.changeset` directory create a file with a unique filename using the pattern: [random-adjective]-[random-noun]-[random-verb].md (e.g., happy-lions-jump.md)

3. Add the required parameters to the changeset file

Follow the below template to add the required parameters to the changeset file:
  - Specify the package(s) affected by the change
  - Specify the version bump (patch, minor, major)
  - Add a summary of the change, including relevant details

```
---
"@hashicorp/design-system-components": minor
---

{Summary}
```

**IMPORTANT** If changes are to the `@hashicorp/design-system-components` package, the summary must follow the formatting guidelines outlined in the "Components package changeset formatting" section.

## Components package changeset formatting
Each changeset entry related to the `@hashicorp/design-system-components` package should follow this template:

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

## Requirements
- Include a short description of the change with relevant details.
- List the component name associated with a change in this format:

```
`ComponentName` - Description of the change.
```

- Add an HTML comment before each change in the format `<!-- START components/path -->`.
  - The `components/path` should be the file path to the component's documentation in the website that the change is associated with, starting from `website/docs/`. Example: `components/accordion`.
- Add an HTML comment after each change in the format `<!-- END -->`.

## Formatting
- Always start an entry with a paragraph, not a list.
- Use a list instead of a long paragraph when communicating multiple changes for one element.
- If there are changes to multiple components in the same entry, describe each change in a new paragraph (and add a list of details if needed).
- Add additional notes to the bottom of the entry in a new paragraph.
- Use complete sentences that are short, clear, and descriptive.
- Use past tense.
- End entries with a period.

### Consistent terminology
- Bugfix: "Fixed"
- New component, token, variant: "Added"
- Update: "Changed", "Refactored"
- Removed or deleted: "Removed"
- Other possible cases: "Upgraded", "Reduced", "Prevented"

### Component references
- When referencing components, use the plain-text component name (for example, Accordion).
- Enclose all components or token names, including those in the summary, in backticks.
