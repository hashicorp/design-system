!!! Info

Helios does not publish any components that account for the layout of filter elements; these are the consumer’s responsibility. Instead, use these guidelines to combine Helios components and best support your application structure.

!!!

## Filter bar anatomy

![Pattern anatomy with filter bar](/assets/patterns/filter-patterns/filter-bar-anatomy.png =908x*)

| Element | Usage |
|---------|-------|
| Container | Required; spans the width of the data set and wraps filter elements. |
| Filters | Required; dictates what parameters are available to filter upon. |
| [Segmented Group](/components/segmented-group) | Optional, but recommended to group similar or related filters together. In the case of a single filter, use a [Dropdown](/components/dropdown). |
| [List](/components/dropdown#list) | Required; coupled with the [Dropdown](/components/dropdown), displays filter values that correspond with the parameter in the Dropdown Toggle |
| Filter functions | Optional; responsible for performing global functions on the data set. |

### Spacing

Use a `16px` gap between each filter element or Segmented Group within the filter bar.

![Multiple groups in a filter bar](/assets/patterns/filter-patterns/filter-bar-anatomy-spacing-01.png =643x*)

Align filter functions to the end of the container with space between the primary filters and the global functions.

![Functions within a filter bar](/assets/patterns/filter-patterns/filter-bar-anatomy-spacing-02.png =874x*)

### Filter bar within a pattern

Within a filter pattern, stack the filter bar on top of the data set and applied filters with a `16px` gap between each element.

![Pattern anatomy with filter bar](/assets/patterns/filter-patterns/pattern-anatomy-filter-bar-spacing.png =809x*)

## Filter sidebar anatomy

![Sidebar anatomy](/assets/patterns/filter-patterns/sidebar-anatomy.png =462x*)

| Element | Usage |
|---------|-------|
| Container | Required; wraps the filter elements and occupies the height of either the page or the data set depending on the scope of the filters. |
| Filters | Required; dictates what parameters are available to filter upon and the corresponding values. Can be represented by a [Checkbox group](/components/form/checkbox) or [Radio group](/components/form/radio) |
| Separator | Required to separate multiple filter parameters within a sidebar. |

### Spacing

Spacing within a filter sidebar extends the guidelines for spacing within a [form pattern](/patterns/form-patterns). Differentiate groups within a sidebar using a [Separator](/components/separator) with a vertical gap of `24px` on the top and bottom of the Separator.

![Sidebar spacing](/assets/patterns/filter-patterns/sidebar-spacing-divider.png =312x*)

### Filter sidebar within a pattern

Within a filter pattern, the filter sidebar can be positioned one of two ways:

1. At the page level, spanning the available height of the page or viewport.
2. In-line with the data set if the filter parameters are less complex.

#### Filter sidebar at the page level

Positioning filters in a sidebar at page level removes them from the normal layout flow. In this case, align the sidebar at the start of the viewport excluding any global navigation elements and use `24px` of internal padding within the sidebar.

![Sidebar spacing page level](/assets/patterns/filter-patterns/pattern-anatomy-sidebar-spacing.png =767x*)

#### Filter sidebar in-line with a data set

Positioning a filter sidebar in-line with the data set should only be done in cases where the number of filter parameters is small or complexity is low. Use a `24px` gap between the sidebar and the data set in this scenario.

![Sidebar spacing in-line](/assets/patterns/filter-patterns/pattern-anatomy-inline-sidebar-spacing.png =693x*)

## Applied filters

![Applied filters anatomy](/assets/patterns/filter-patterns/applied-filters-anatomy.png =620x*)

| Element | Usage |
|---------|-------|
| Container | Required; wraps the label and applied filters to enforce consistent spacing. |
| Label | Required; communicates whether filters have been applied or not. |
| Tag list | Required; consists of one or more dismissible [Tags](/component/tag) that communicate the specific filter value. |
| Bulk clear | Required; clear all applied filters with a single bulk action. Use a small [tertiary Button](/components/button) with an icon. |

### Spacing

- Use a `16px` gap between elements in the applied filters.
- Use a `8px` gap between tags in the tag list. Refer to the [Tag](/components/tag#spacing) spacing guidelines for more details.

![Applied filters spacing](/assets/patterns/filter-patterns/applied-filters-spacing.png =620x*)

If the number of tags spans more than one line, use a `12px` gap between lines.

![Tags span more than one line](/assets/patterns/filter-patterns/applied-filters-overflow-layout-spacing.png =611x*)

### Applied filters within a pattern

Within a filter pattern, position the applied filters above the data set with a `16px` gap. If paired with a filter bar, the applied filters should sit between the filter bar and the data set.

![Pattern anatomy with filter bar](/assets/patterns/filter-patterns/pattern-anatomy-filter-bar-spacing.png =809x*)

If not paired with a filter bar, the applied filters should still be positioned above the data set with a `16px` gap.

![Applied filters with a sidebar](/assets/patterns/filter-patterns/pattern-anatomy-applied-filters-sidebar.png =693x*)

## Pagination

Refer to the [Pagination](/components/pagination) guidelines for details around spacing and usage of the component.

### Pagination within a pattern

Within a filter pattern, position Pagination at the bottom of the data set using a `16px` gap between elements and ensure that the Pagination spans the width of the data set.

![Pattern anatomy with filter bar](/assets/patterns/filter-patterns/pattern-anatomy-pagination-spacing.png =1000x*)

## Pattern anatomy

The core anatomy of a filter pattern remains largely the same regardless of the layout or positioning method, as outlined in these generic examples.

**Vertical layout with a filter bar**

![Pattern anatomy](/assets/patterns/filter-patterns/pattern-anatomy-generic-filter-bar.png =929x*)

**Layout with a filter sidebar**

![Pattern anatomy](/assets/patterns/filter-patterns/pattern-anatomy-generic-sidebar.png =929x*)

| Element | Usage |
|---------|-------|
| Filters | Required; can be represented by a filter bar or a filter sidebar. |
| Applied filters | Required |
| Data set | Required |
| Pagination | Optional; recommended for larger data sets. |

### Vertical spacing

When spacing elements vertically within the pattern, use a `16px` gap.

![Pattern anatomy](/assets/patterns/filter-patterns/pattern-anatomy-filter-bar-spacing.png =809x*)

### Horizontal spacing

When spacing elements horizontally within the pattern, use a `24px` gap. 

![Pattern anatomy](/assets/patterns/filter-patterns/pattern-anatomy-inline-sidebar-spacing.png =693x*)

### Layout

Due to the complexity of the pattern and its contributing elements, a filter pattern should occupy the entire width of the page in most circumstances.

![Filter pattern layout page level](/assets/patterns/filter-patterns/pattern-anatomy-layout-full-page.png =660x*)

An exception to this is when the the data set or display method is less complex or the filters are displayed in-line with the data set.

![Filter pattern layout page level](/assets/patterns/filter-patterns/pattern-anatomy-layout-in-line.png =660x*)