## Concepts and terminology

A filter consists of several conceptual foundations that when combined determine what is included or excluded from the data set.

| Concept | Usage |
|---------|-------|
| Parameter | Refers to the specific property or category that is being filtered on and is often represented by the specific label of the filter. |
| Conditional | Refers to the relationship between the parameter and the value. |
| Value | Refers to the specific value or property within a parameter that is referenced in the filter; e.g., a specific string, numerical amount, date, etc. |

### Filter concepts in practice

The way in which these concepts materialize in practice establishes a visual connection with the conceptual methods.

#### In the context of a filter bar

![Filter concept anatomy](/assets/patterns/filter-patterns/filter-concept-filter-bar-parameter.png =612x*)

#### In the context of a filter sidebar

![Filter concept anatomy](/assets/patterns/filter-patterns/filter-concept-filter-sidebar-parameter.png =344x*)

## Conditionals

Conditionals are used to express the relationship between a filter parameter and filter value. The most common within a filter pattern is the `equality` conditional which signifies a parameter is the same or equivalent to a value or array of values.

This example showcases a simple equality filter and would return records in a data set where the `Status` parameter is equal to `Active` and `Pending`.

![Filter concept equality example](/assets/patterns/filter-patterns/filter-concept-conditional-example-equality.png =612x*)

Other types of conditionals can be used to account for different value types (booleans, strings, ranges, etc). Which conditional to use depends on the type of parameter and the values it contains.


### Text and string conditionals

- Equals (`=`)
- Does not equal (`≠`)
- Contains
- Does not contain
- Starts with
- Ends with

### Numerical conditionals

- Equals (`=`)
- Does not equal (`≠`)
- Greater than (`>`)
- Less than (`<`)
- Greater than or equal to (`≥`)
- Less than or equal to (`≤`)

### Applied filters in context

The conditional relationship between the parameter and the value should be communicated by the content within the tag. How explicit this communication is depends on the level of complexity, but more explicitness often benefits the user, especially when parameters might have similar labels and associated values.

#### Explicit communication of an applied filter

![filter concept value](/assets/patterns/filter-patterns/filter-concept-filter-value.png =265x*)

#### Implied communication of an applied filter

![Filter concept implied value](/assets/patterns/filter-patterns/filter-concept-filter-value-implied.png =202x*)

### Mirroring of parameters

Filterable parameters should mirror the columns in a table or other visible label in the data set. This is the most explicit method to communicate what parameters are available to filter on and how the results within a data set change based on the filtering outcome.

#### Mirroring parameters in a filter bar

This example showcases a 1:1 relationship with the columns of a data set and the available filter parameters in the filter bar.

![Mirroring the columns of a table in the available parameters](/assets/patterns/filter-patterns/filter-concept-mirror-parameters.png =1059x*)

While it's not always necessary to mirror all parameters in a data set, including a parameter in the available filters that is not visually reflected in the data set can be confusing and cause uncertainty about the returned results.

#### Parameter and value relationship within a data set

![Parameters within a data set](/assets/patterns/filter-patterns/filter-concept-data-set-parameters.png =636x*)

#### Parameter and value relationship as a grid

![Grid data set parameter and value relationship](/assets/patterns/filter-patterns/filter-concept-data-set-parameters-grid.png =913x*)

## Default filters

## Saving filters

