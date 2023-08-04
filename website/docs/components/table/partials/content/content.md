## General content

While we are not prescriptive about what goes into a cell, there are some best practices to consider:

- We recommended keeping data within a column to one data type. Using more than one data type makes sorting difficult.
- While changing the text style/color within a cell is possible, we recommend only using Helios font styles and colors.

## Icon usage

Icons used within cells can help differentiate content, highlight additional metadata, increase the hierarchy of a value, or otherwise _enhance_ the text or value it is paired with. Use the outlined icon style by default and if contrast against other icons is important, use the filled style.

!!! Dont

Don’t use an icon as the sole communication method within a cell, even if the icon is explicit, e.g., a brand or service icon.

![Icon within a table without a label](/assets/components/table/icon-without-label.png)
!!!

!!! Dont

We don’t recommend using an icon to indicate the status of an object, row, or resource. Instead, consider using a [Badge](components/badge).

![Icons being used for status](/assets/components/table/icon-status.png)
!!!

### Service icons

Use service icons within a cell to communicate the source or provider of a service.

![Service icon within a table](/assets/components/table/with-service-icon.png)

### Grouping

Use icons to communicate commonalities between values or that a value is part of a larger object or hierarchical structure.

![Icons used for grouping in a table](/assets/components/table/icon-grouping.png)

### Product branding

Use icons to communicate that a specific item is a HashiCorp product or resource.

![Icon product branding](/assets/components/table/icon-product-branding.png)

!!! Dont

Don’t use an [Icon Tile](/assets/components/icon-tile) in place of an icon within a table cell.

![Icon Tile within a table cell](/assets/components/table/icon-tile-product-branding.png)
!!!

### Leading vs. trailing icons

In general, we recommend using **leading icons** because the text following the icon will remain aligned and thus be easier for the user to scan.

Take care not to mix and match different icon positions in the same column.

## Links within cells

!!! Info

This guidance is an extension of the [Inline Link](/components/link/inline) guidelines.
!!!

Within a table, use `secondary` (`Foreground / Strong`) links as the default.

Use `Body / 200 / Link` as the default typographic style within a table. This style increases the prominence a small amount to differentiate it from other string and non-interactive content.

![Link example](/assets/components/table/link-example.png)

#### Multiple links

If a table contains more than one column of links, consider using `Body / 200 / Link` for the most important link; usually the title of the row, ID, or other naming convention. For less important links use `Body / 200 / Regular` with an added underline in Figma.

![Multiple links within a table](/assets/components/table/multiple-links.png)

#### Long-form content

If a cell contains long-form or descriptive content, use the link style that is most appropriate for the hierarchy and frequency of links within the content. If there are a minimal number of links, `primary` styling may be appropriate, but if there are many links `secondary` styling may be more appropriate.

![Links in long-form content](/assets/components/table/longform-content-links.png)

## Null values

### Null cell values

If records within a table contain empty or null values, don’t reflect this literally with an empty cell. While a literal representation of a data set may seem logical when showcasing tabular data, a null value still intrinsically has an attribute of `none` or `empty` which should be communicated to user.

An empty cell can impact the user experience negatively by:

- Breaking the natural reading flow within the table and making the data harder to parse.
- Eroding user trust in the validity of the data; an empty cell may indicate an error but doesn’t communicate what the error is or its cause.
- Failing to communicate what value is used when filtering or sorting a data set.

!!! Dont

![Null empty cells](/assets/components/table/null-empty-cells.png)
!!!

Instead, explicitly communicate null values to the user and represent them with a similar visual treatment as non-null values.

!!! Do

Visually represent null values in an inverse and comparative manner with non-null values.

![Null value communicated with text](/assets/components/table/null-value-comparative-value.png)
!!!

#### Styling null values

In records that express a value with text, use the same text style as non-null values in the same column (in most cases this is `Body / 200 / Regular`). Consider reducing the prominence of the null values by using `Foreground / Faint` color instead of `Primary` or `Strong`.

![Null value in a text string](/assets/components/table/null-value-text-example.png)

#### Null values with badges

In records that express a value with a badge (e.g., status, health, etc), maintain consistency with cells of the same content type by communicating null values in a `neutral` badge.

![Null value communicated in a badge](/assets/components/table/null-value-badge-example.png)

#### Null value fallback

As a fallback, consider using an `em dash (—)` or `n/a (not available)` in place of the null value. This may occur when the content type of a value isnt able to be determined or if the value is null for an unknown reason.

![Null value communicated with an em-dash](/assets/components/table/null-value-fallback-em-dash.png)

![Null value communicated with n/a](/assets/components/table/null-value-fallback-na.png)

#### Communicating why a value is null

Depending on the data set and the type of content it expresses, consider communicating to the user _why_ a value is null by using a tooltip. This can communicate broader product-specific functions and terminology, but can also highlight errors or issues that need to be corrected.

![Null value cause communicated with a tooltip](/assets/components/table/null-value-cause-tooltip.png)

### Null or empty table state

In the case of an entire data set returning null or empty, use [Application State](/components/application-state) to communicate this and provide the user with next steps to correct the problem or create a new record in the data set.

Common examples of this include:

- A table expressing a data set that is dependent on user-created records which don’t exist.
- An error occurred when fetching the data for the table.
- A data set has been filtered to the point of not returning any records (see our [Filter patterns](/patterns/filter-patterns#empty-state) pattern guidance for more details).

![Null data set within a table](/assets/components/table/null-data-set-in-a-table.png)