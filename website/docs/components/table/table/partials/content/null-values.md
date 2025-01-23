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

In cells that contain values represented by text, use the same text style as non-null values in the column (in most cases this is `Body / 200 / Regular`). Consider reducing the prominence of the null values by using `Foreground / Faint` color instead of `Primary` or `Strong`.

![Null value in a text string](/assets/components/table/null-value-text-example.png)

#### Null values with badges

In cells that contain a badge (e.g., status, health, etc), communicate null values by using a `neutral` color badge to maintain visual consistency with other non-null cells.

![Null value communicated in a badge](/assets/components/table/null-value-badge-example.png)

#### Null value fallback

As a fallback, consider using an `em dash (—)` in place of the null value. This may occur when the content type of a value isn’t able to be determined or if the value is null for an unknown reason.

![Null value communicated with an em-dash](/assets/components/table/null-value-fallback-em-dash.png)

#### Communicating why a value is null

Depending on the data set and the type of content it expresses, consider communicating to the user _why_ a value is null by using a [Tooltip](/components/tooltip). This can communicate broader product-specific functions and terminology, but can also highlight errors or issues that need to be corrected.

![Null value cause communicated with a tooltip](/assets/components/table/null-value-cause-tooltip.png)

### Null or empty table state

In the case of an entire data set returning null or empty, use [Application State](/components/application-state) to communicate this and provide the user with next steps to correct the problem or create a new record in the data set.

Common examples of this include:

- A table expressing a data set that is dependent on user-created records which don’t exist.
- An error occurred when fetching the data for the table.
- A data set has been filtered to the point of not returning any records (see our [Filter patterns](/patterns/filter-patterns#empty-state) guidance for more details).

![Null data set within a table](/assets/components/table/null-data-set-in-a-table.png)