## Badge usage

Use [Badges](/components/badge) to communicate status and high-priority metadata within a Table.

### Badge type

We recommend using `outlined` [Badges](/components/badge) within Tables. This variant provides enough differentiation between the component, the value in the cell, and the background of the Table row.

![Outlined Badges within a Table](/assets/components/table/outlined-badge-within-table.png)

### Badge color

Use Badge color logically to communicate status within a Table.

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

![Null value represented by a badge within a Table](/assets/components/table/badge-table-null-value.png)
!!!

### Badge consistency

Ensure that Badge usage within a Table is consistent across features and within an application holistically. For example, if communicating that a record is "active", use the same combination of text, icon, and color in each instance. This consistency in communication and visual language can make complex information easier to understand and quicker to parse.

### Badge size

Use the `medium` Badge size by default as this creates more visual consistency between the Badge and text values within a Table.

If the Table row [density](#density) is set to `short`, use the `small` Badge size to account for the reduction in vertical spacing and padding.

![Small badge in a short density Table](/assets/components/table/table-density-small-badge.png)

!!! Dont

Don’t use the `large` Badge size in the Table as this elevates the Badge too prominently in the hierarchy and can create inconsistency between Badges and text.

![Large badge within a Table](/assets/components/table/large-badge-in-table.png)
!!!

!!! Dont

Don’t use different Badge sizes in the same Table.

![Different badge sizes in a Table](/assets/components/table/different-badge-sizes.png)
!!!

