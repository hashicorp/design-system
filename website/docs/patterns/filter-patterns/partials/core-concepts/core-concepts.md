Filtering consists of several conceptual foundations that contribute the larger pattern, filtering method, and communication of filters to the user.

## Concepts and terminology

| Concept | Usage |
|---------|-------|
| Parameter | Refers to the specific property or category that is being filtered on; often represented by the specific label of the filter. |
| Value | Refers to the specific value within a parameter that is referenced in the filter; e.g., a specific string, status, numerical range, etc. |
| Conditional | Refers to the relationship between the parameter and the value. |

The combination of the `Parameter`, `Conditional`, and `Value` results `Variable` and determines the specific records being included or excluded from a data set.

![Parameter + Conditional + Value = Variable](/assets/patterns/filter-patterns/filter-concept-variable.png =847x*)

### In the context of a filter bar

![Filter concept anatomy](/assets/patterns/filter-patterns/filter-concept-filter-bar-parameter.png =612x*)

### In the context of a filter sidebar

![Filter concept anatomy](/assets/patterns/filter-patterns/filter-concept-filter-sidebar-parameter.png =344x*)

## Conditionals

Conditionals express the relationship between a parameter and value, the most common being the `equality` conditional which signifies a parameter is equal to a value or array of values.

This example showcases an equality filter that would return records in a data set where the `Status` parameter is equal to values `Active` and `Pending`.

![Filter concept equality example](/assets/patterns/filter-patterns/filter-concept-conditional-example-equality.png =612x*)

Other types of conditionals can be used to account for different value types (booleans, strings, ranges, etc). Which conditional to use depends on the type of parameter and the values it contains.

### Comparative conditionals

- Equals (`=`)
- Does not equal (`≠`)
- Greater than (`>`)
- Less than (`<`)
- Greater than or equal to (`≥`)
- Less than or equal to (`≤`)

### Text and string conditionals

- Contains
- Does not contain
- Starts with
- Ends with

### Applied filters in context

The `Variable` should be communicated by the content within the tag. How explicit this communication is depends on the level of complexity, but more explicitness often benefits the user, especially when parameters might have similar labels and associated values.

#### Explicit communication of an applied filter

![filter concept value](/assets/patterns/filter-patterns/filter-concept-filter-value.png =265x*)

#### Implied communication of an applied filter

![Filter concept implied value](/assets/patterns/filter-patterns/filter-concept-filter-value-implied.png =202x*)

### Mirroring of parameters

Filterable parameters should mirror the columns in a table or other visible label in the data set. This is the most explicit method to communicate what parameters are available to filter on and how the results within a data set change based on the applied variables.

#### Mirroring parameters in a filter bar

This example showcases a 1:1 relationship with the columns of a data set and the available filter parameters in the filter bar.

![Mirroring the columns of a table in the available parameters](/assets/patterns/filter-patterns/filter-concept-mirror-parameters.png =1059x*)

While not always necessary to mirror _all_ parameters in a data set, including a parameter in the available filters that is not visually reflected in the data set can be confusing and cause uncertainty about the returned results.

#### Parameter and value relationship within a data set

![Parameters within a data set](/assets/patterns/filter-patterns/filter-concept-data-set-parameters.png =636x*)

#### Parameter and value relationship as a grid

![Grid data set parameter and value relationship](/assets/patterns/filter-patterns/filter-concept-data-set-parameters-grid.png =913x*)

