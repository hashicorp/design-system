## Core concepts

### Identifier, conditional, and value

Filtering a dataset requires the presence of three paramaters; an **identifier**, a **conditional**, and a value.

- **Identifier** refers to the specific property or category that is being filtered on.
- **Conditional** refers to the relationship between the identifier and the value.
- **Value** refers to the specific value, amount, or metadata attribute being included in the filter.

The combination of these results in a **criteria**. **Add more here**

### What does the dataset consist of?

### Mirroring of identifiers

## Structure

A filtering pattern consists of a number of elements and Helios components that contribute holistically.

**Insert structural diagram here**

For more specifications on the details of these elements, refer to the [specifications](/patterns/filter-patterns?tab=specifications).

### Filter bar

The filter bar is responsible for performing the functional aspect of filtering a dataset and for displaying the identifiers which a user can filter on. It often consists of numerous filterable identifiers that mirror the columns of a table or a piece a metadata contained within the dataset.

A filter bar consists of one or more dropdowns, buttons, or input components used to select a value from a set of identifiers. This often best handled by the [Segmented Group](/components/segmented-group) component which can be used to group like identifiers and supports complex filtering.

![Filter bar example](/assets/patterns/filter-patterns/filter-bar-segmented-group.png)

#### Orientation

The filter bar can either be oriented either horizontally or vertically. Each orientation has it's advantages and disadvantages and which one to use is dependent on the available space, the complexity of the dataset, and the type of data it contains.

##### Horizontal orientation

![Horizontal orientation of the filter bar](/assets/patterns/filter-patterns/layout-horizontal-orientation.png)

##### Vertical orientation

![Vertical orientation of the filter bar](/assets/patterns/filter-patterns/layout-vertical-orientation.png)

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
