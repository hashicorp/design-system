---
title: Tables
caption: Writing guidance for tabular data.
description: Writing guidance for tabular data.
previewImage: assets/illustrations/content/component/tables.jpg
related:
  - components/table/table
  - components/table/advanced-table
---

This documentation provides best practices for writing tabular content in [Table](/components/table/table) and [Advanced Table](/components/table/advanced-table) components.

## General recommendations

While we are not prescriptive about what goes into table cells, there are some best practices to consider:

- Keep data within columns to one data type. Sorting on multiple data types adds technical complexity and makes content confusing for assistive technologies.
- While changing the text style/color within a cell is possible, we recommend only using Helios font styles and colors.

## Icon usage

Icons used within cells can help differentiate content, highlight metadata, increase text hierarchy, or enhance text. Use the outlined icon style in most cases. However, if contrast with other icons is important, you can use the filled style.

!!! Dont

Don’t use an icon as the sole content within a cell, even if the icon is explicit, e.g., a brand or service icon.

![Icon within a table without a label](/assets/content/component/tables/icon-without-label.png)
!!!

!!! Dont

Don’t use an icon to indicate the status of an object, row, or resource. Instead, use a [Badge](/components/badge).

![Icons being used for status](/assets/content/component/tables/icon-status.png)
!!!

### Service icons

Use service icons within a cell to communicate the source or provider of a service.

![Service icon within a table](/assets/content/component/tables/with-service-icon.png)

### Grouping

Use icons to communicate commonalities between values or that a value is part of a larger object or hierarchical structure.

![Icons used for grouping in a table](/assets/content/component/tables/icon-grouping.png)

### Product branding

Use icons to communicate that a specific item is a HashiCorp product or resource.

![Icon product branding](/assets/content/component/tables/icon-product-branding.png)

!!! Dont

Don’t use an [Icon Tile](/components/icon-tile) in place of an icon within a table cell.

![Icon Tile within a table cell](/assets/content/component/tables/icon-tile-product-branding.png)
!!!

### Leading vs. trailing icons

We recommend using **leading icons** so the text following the icon remains aligned down the column for better scannability.

Don’t mix and match different icon positions in the same column.

## Links within cells

We recommend using `secondary` [Inline Links](/components/link/inline) within tables, to avoid overloading the UI with the actionable blue color used by the `primary` color variant.

To increase the prominence and further differentiate links from other text content, we recommend using a font-weight of `medium`. In code, you can use the CSS helper classes `hds-typography-body-200` and `hds-font-weight-medium`. In Figma, you can use the text style `Body/200/Link`.

![Link example](/assets/content/component/tables/link-example.png)

### Multiple links

If a table contains more than one column of links, consider using a `font-weight` of `medium` for only the most important links, usually the title of the row or ID. For the other links, use a `font-weight` of `regular`.

![Multiple links within a table](/assets/content/component/tables/multiple-links.png)

### Links in long-form content

If a cell contains long-form or descriptive content, use the link style that is most appropriate for the hierarchy and frequency of links within the content. For a minimal number of links, `primary` [Inline Links](/components/link/inline) may be appropriate, but if there are many links within the content `secondary` [Inline Links](/components/link/inline) may work better.

![Links in long-form content](/assets/content/component/tables/longform-content-links.png)

## Badge usage

Use [Badges](/components/badge) to communicate status and high-priority metadata within tables. Ensure that Badge usage within tables is consistent across features and within an application holistically so that it is easier to understand and quicker to parse.

### Badge type

We recommend using `outlined` [Badges](/components/badge) within tables. This variant provides sufficient differentiation between the component, the value in the cell, and the background of a table row without being too visually heavy.

![Outlined Badges within a table](/assets/content/component/tables/outlined-badge-within-table.png)

### Badge color

Use Badge color logically to communicate status within tables.

- `Success` for positive communication, e.g., "Active", "Passing", "Up-to-date", etc.
- `Warning` for cautionary communication, e.g., "Out-of-date", "Degraded", etc.
- `Critical` for negative communication and errors, e.g., "Failing", "Deprecated", "Errored", etc.
- `Highlight` for communicating a dynamic value or a value that indicates a change in state of a record, e.g., "Updating", "In progress", "Starting up", etc.
- `Neutral` for [null and empty values](#null-values), e.g., "None", "No status", etc.

<Doc::Layout @direction="horizontal" @spacing="16px">
  <Hds::Badge @text="Active" @color="success" @icon="check" @type="outlined" />
  <Hds::Badge @text="Degraded" @color="warning" @icon="alert-triangle" @type="outlined" />
  <Hds::Badge @text="Failed" @color="critical" @icon="x" @type="outlined" />
  <Hds::Badge @text="Starting up" @color="highlight" @icon="loading" @type="outlined" />
  <Hds::Badge @text="No status" @color="neutral" @type="outlined" />
</Doc::Layout>

### Badge icon usage

Use logical icons when communicating status in a Badge. Some common examples when paired with Badge `color` include:

- `check` for positive communication.
- `alert-triangle` for cautionary communication.
- `x` for negative communication and errors.
- `loading` for communicating a dynamic value or status and when using `color=highlight`.

!!! Do

In the case of a [null or empty](#null-values) value, use the text-only variant of the Badge.

![Null value represented by a badge within a table](/assets/content/component/tables/badge-table-null-value.png)
!!!

### Badge size

Use the `medium` Badge size by default as this creates more visual consistency between the Badge and text values within tables.

If the table row [density](#density) is set to `short`, use the `small` Badge size to account for the reduction in vertical spacing and padding.

![Small badge in a short density table](/assets/content/component/tables/table-density-small-badge.png)

!!! Dont

Don’t use the `large` Badge size in tables as this elevates the Badge too prominently in the hierarchy and can create inconsistency between Badges and text.

![Large badge within a table](/assets/content/component/tables/large-badge-in-table.png)
!!!

!!! Dont

Don’t use different Badge sizes in the same table.

![Different badge sizes in a table](/assets/content/component/tables/different-badge-sizes.png)
!!!

## Null values

### Null cell values

If records within a table contain empty or null values, don’t reflect this literally with an empty cell. While a literal representation of a data set may seem logical when showcasing tabular data, a null value still intrinsically has an attribute of `none` or `empty` which should be communicated to user.

An empty cell can impact the user experience negatively by:

- Breaking the natural reading flow within a table and making the data harder to parse.
- Eroding user trust in the validity of the data; an empty cell may indicate an error but doesn’t communicate what the error is or its cause.
- Failing to communicate what value is used when filtering or sorting a data set.

!!! Dont

![Null empty cells](/assets/content/component/tables/null-empty-cells.png)
!!!

Instead, explicitly communicate null values to the user and represent them with a similar visual treatment as non-null values.

!!! Do

Visually represent null values in an inverse and comparative manner with non-null values.

![Null value communicated with text](/assets/content/component/tables/null-value-comparative-value.png)
!!!

#### Styling null values

In cells that contain values represented by text, use the same text style as non-null values in the column (in most cases this is `Body / 200 / Regular`). Consider reducing the prominence of the null values by using `Foreground / Faint` color instead of `Primary` or `Strong`.

![Null value in a text string](/assets/content/component/tables/null-value-text-example.png)

#### Null values with badges

In cells that contain a badge (e.g., status, health, etc), communicate null values by using a `neutral` color badge to maintain visual consistency with other non-null cells.

![Null value communicated in a badge](/assets/content/component/tables/null-value-badge-example.png)

#### Null value fallback

As a fallback, consider using an `em dash (—)` in place of the null value. This may occur when the content type of a value isn’t able to be determined or if the value is null for an unknown reason.

![Null value communicated with an em-dash](/assets/content/component/tables/null-value-fallback-em-dash.png)

#### Communicating why a value is null

Depending on the data set and the type of content it expresses, consider communicating to the user _why_ a value is null by using a [Tooltip](/components/tooltip). This can communicate broader product-specific functions and terminology, but can also highlight errors or issues that need to be corrected.

![Null value cause communicated with a tooltip](/assets/content/component/tables/null-value-cause-tooltip.png)

### Null or empty table state

In the case of an entire data set returning null or empty, use [Application State](/components/application-state) to communicate this and provide the user with next steps to correct the problem or create a new record in the data set.

Common examples of this include:

- A table expressing a data set that is dependent on user-created records which don’t exist.
- An error occurred when fetching the data for the table.
- A data set has been filtered to the point of not returning any records (see our [Filter patterns](/patterns/filter-patterns#empty-state) guidance for more details).

![Null data set within a table](/assets/content/component/tables/null-data-set-in-a-table.png)