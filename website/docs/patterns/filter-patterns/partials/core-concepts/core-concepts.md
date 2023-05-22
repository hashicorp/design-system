## Filter concepts and terminology

A filter consists of several conceptual foundations that when combined determine what is included or removed from the data set.

| Concept | Usage |
|---------|-------|
| Parameter | Refers to the specific property or category that is being filtered on and is often represented by the specific label of the filter. |
| Conditional | Refers to the relationship between the parameter and the value. |
| Value | Refers to the specific value or property within a parameter that is referenced in the filter; e.g., a specific string, numerical amount, date, etc. |

**Ex 1.0: Concepts of a filter in practice within a horiztonal filter bar**

![Filter concept anatomy](/assets/patterns/filter-patterns/filter-concept-filter-bar-parameter.png)

**Ex 1.1: Concepts of a filter in practice within a vertical filter sidebar**

![Filter concept anatomy](/assets/patterns/filter-patterns/filter-concept-filter-sidebar-parameter.png =400x*)

### Using conditionals

The most common conditional within a filter is the `equality` conditional which signifies a parameter is the same or equivalent to a value or array of values. 

While the `equality` conditional is the most common for string and related types of values, there are many other types of conditionals that account for different value types (booleans, strings, ranges, etc). Which conditional to use depends on the type of parameter and the values it contains.

#### Text and string conditionals

- Equals (`=`)
- Does not equal (`≠`)
- Contains
- Does not contain ()
- Starts with
- Ends with

#### Numerical conditionals

- Equals (`=`)
- Does not equal (`≠`)
- Greater than (`>`)
- Less than (`<`)
- Greater than or equal to (`≥`)
- Less than or equal to (`≤`)

### Applied filters in context

Communicating the conditional relationship between the parameter and value can be communicated via the content within a tag. While how explicit this communication is depends on the level of complexity, more explicitness often benefits the user, especially when parameters might have similar labels and associated values.

**Ex 2.0: Explicit communication of an applied tag.** In this example the conditional creates an explicit relationship between parameter and value.

![filter concept value](/assets/patterns/filter-patterns/filter-concept-filter-value.png =400x*)

**Ex 2.1: Implied communication of an applied tag.** In this example the equals conditional may be implied by the absence of the parameter.

![Filter concept implied value](/assets/patterns/filter-patterns/filter-concept-filter-value-implied.png =300x*)

### Mirroring of parameters

In most use-cases the filterable parameters should mirror 

**Ex 3.0: Mirroring parameters of the data set within the filter bar**

![Mirror the columns of a table in the available parameters](/assets/patterns/filter-patterns/filter-concept-mirror-parameters.png)

**Ex 3.1: Parameter and value relationship within a data set**

![Parameters within a data set](/assets/patterns/filter-patterns/filter-concept-data-set-parameters.png)

**Ex 3.2: Parameter and value relationship when the data set is expressed in a grid**

![Grid data set parameter and value relationship](/assets/patterns/filter-patterns/filter-concept-data-set-parameters-grid.png)

## Data fetching

### Live filtering

### Per filter

### Batch filtering

## Default filters

## Saving filters

## What does the data set consist of?

