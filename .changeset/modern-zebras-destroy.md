---
"@hashicorp/design-system-components": minor
---

`Table` - Multiple updates to the main component and its subcomponents:

- Updated table headers to support tooltips
- Updated visual treatment and location of the "sort" button in the table headers
- Refactored CSS code to simplify usage of `hds-table`-related class names

`Table::ThSort`:

- Added support for tooltip via the `@tooltip` argument
- Updated visual treatment and location of the "sort" button
- Updated DOM structure of the `<th>` content
- Remove class `hds-table__th-sort--button-content`
- Replaced class `hds-table__th-sort` with classes `hds-table__th` + `hds-table__th--sort`
- Replaced class `hds-table__th-sort--text--[left|center|right]` with `hds-table__th--align-[left|center|right]`

`Table::Th`:

- Added support for tooltip via the `@tooltip` argument
- Updated DOM structure of the `<th>` content
- Replaced class `hds-table__th--text-[left|center|right]` with `hds-table__th--align-[left|center|right]`

`Table::Td`:

- Replaced class `hds-table__td--text-[left|center|right]` with `hds-table__td--align-[left|center|right]`
