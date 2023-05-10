## Structure

A filtering pattern consists of a number of elements and Helios components that contribute to a holistic experience. These elements are variable depending on the content within the dataset and the context within the application and can be combined in different ways to achieve an experience that most beneifts the end-user.

For more specifications on the details of these elements, refer to the [specifications](/patterns/filter-patterns?tab=specifications).

### Filter bar

The filter bar is responsible for performing the functional aspect of filtering a dataset and for displaying the identifiers which a user can filter on. It often consists of numerous filterable identifiers that mirror the columns of a table or metadata contained within the dataset.

The most common example of a filter bar consists of or more dropdowns, buttons, or input components that is oriented horizontally and used to select a value from a set of identifiers. This is often best handled by the [Segmented Group](/components/segmented-group) component which can be used to group similar identifiers to supports complex filtering.

![Filter bar example](/assets/patterns/filter-patterns/filter-bar-segmented-group.png)

#### Horizontal orientation

##### Ex 1.0

![Horizontal orientation of the filter bar](/assets/patterns/filter-patterns/layout-horizontal-orientation.png)

#### Vertical orientation

If space permits, the filter bar can be oriented vertically on either side of the dataset.

##### Ex 1.1

Showcasing filters used with a dataset that is represented by a grid of objects.

![Vertical orientation of the filter bar](/assets/patterns/filter-patterns/layout-vertical-orientation.png)

##### Ex 1.2

Showcasing filters in a simple dataset represented by a table.

![Vertical orientation of the filter bar on the right](/assets/patterns/filter-patterns/layout-vertical-orientation-right.png)

### Applied filters

The applied filters displays which filters have been applied (if any) and provides a user with a method to clear or reset all filters at once. In most circumstances the filters that have been applied should be represented using a [Tag](/components/tag) component which allows for the individual dismissal of a filter.

![Applied filters](/assets/patterns/filter-patterns/applied-filters.png)

### Dataset

The dataset displays the items, objects, or tabular data that corresponds with the defined filters. This is often represented by a [Table](/components/table) but can take other forms as well.

Example dataset displaying tabular data:

![Tabular dataset](/assets/patterns/filter-patterns/example-dataset-tabular-data.png)

Example dataset displaying non-tabular data:

![Non-tabular dataset](/assets/patterns/filter-patterns/example-dataset-non-tabular-data.png)

### Pagination

Use pagination to break down the filtered dataset into pages. For more details refer to the [Pagination](/components/pagination) guidelines.

## Layout and orientation

Depending the type of data being filtered, it's complexity, and the context that the dataset is in, the layout of the filter pattern and the orientation of it's elements can change.

### Spacing

## Overflow

### Filter bar overflow

### Applied filters overflow

## Annotating filter values
