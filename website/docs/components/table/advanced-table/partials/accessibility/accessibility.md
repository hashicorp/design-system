## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Best practices

### Interactive rows

The table row element cannot receive interactions, meaning actions cannot be attached directly to a table row. If you need an interactive element, place it within a table cell element in that row (i.e., `<div role="gridcell"><a href="somelink.html">Some link</a></div>`).

### Focus in Advanced Tables

Unlike the Table component, each cell receives focus in the Advanced Table to let users navigate through the table efficiently with a keyboard. For any other interactions, you must use interactive elements (buttons, links, etc.) within the cells. 

### Row selection

You should clearly communicate to the user how many rows are selected and how many rows there are total outside of the Advanced Table. For additional considerations, read the [Multi-select usability and accessibility considerations](/components/table/advanced-table?tab=code#usability-and-accessibility-considerations).

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.1.4" "2.4.3" "2.4.7" "4.1.2" }} />

---

<Doc::A11ySupport />
