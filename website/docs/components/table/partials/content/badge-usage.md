## Badge usage

[Badges](/components/badge) should be used to communicate status and high-priority metadata within a table.

### Badge type

Use `filled` [Badges](/components/badge) by default.

_Image of filled badge_

If less prominence is needed, consider using the `outlined` badge to reduce its prominence in the table. 

_Insert image of outlined badges in a non-striped table_

If the rows within the table are [striped](table?tab=guidelines#striping), the `outlined` badge **must** be used to account for the reduction in contrast between the badge and the background of the row. This is both an accessibilty and a usability concern.

_Insert image of outlined badges on the striped background_

!!! Dont

Don’t used the `inverted` badge variant as this increases the prominence of the badge too much in the hierarchy of the table.

_Insert image here_
!!!

!!! Dont

Don’t pair different badge types in the same table.

_Insert image with multiple badge types_
!!!

### Badge color

Use Badge color logically to communicate status within the table.

- `Success` for positive communication, e.g., "Active", "Passing", "Up-to-date", etc.
- `Warning` for cautionary communication, e.g., "Out-of-date", "Degraded", etc.
- `Critical` for negative communication and errors, e.g., "Failing", "Deprecated", "Errored", etc.
- `Highlight` for communicating a dynamic value or a value indicates a change in state of a record, e.g., "Updating", "In progress", "Starting up", etc.
- `Neutral` for [null and empty values](#null-values), e.g., "None", "No status", etc.

### Badge icon usage

Use logical icons when communicating status in a Badge. Some common examples when paired with Badge `color` include: 

- `check` for positive communication.
- `alert-triangle` for cautionary communication.
- `x` for negative communication and errors.
- `loading` for communicating a dynamic value or status and when using `color=highlight`.

!!! Do

In the case of a [null or empty](#null-values) value, use the text-only variant of the Badge.

_Insert image of a text-only badge with null value_
!!!

### Badge size

Use the `medium` Badge size by default as this creates more visual consistency between the Badge and text strings within a table.

_Insert image of badge in medium density table_

If the Table row [density](#density) is set to `short`, use the `small` Badge size to account for the reduction in vertical spacing and padding.

_Insert image of short density table_

!!! Dont

Don’t use the `large` Badge size in the Table as this elevates the Badge too prominently in the hiearchy and can create inconsistency between Badges and text.

_Insert image of large badge size_
!!!

!!! Dont

Don’t use different Badge sizes in the same Table.

_Insert image of different badge sizes_
!!!