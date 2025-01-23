## Conformance rating

<!-- Update conformance rating badge with correct status -->
<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Focus in Tables

- Table headers and labels are not eligible to receive focus, rather, focus will move through interactive elements (sort and tooltip buttons) contained within the header sequentially.
- Interactive elements within cells will receive focus, but entire cells and entire rows will not. 

!!! Do

![Example of focus order being properly applied to a table](/assets/components/table/table-cell-focus-do.png)
!!!

!!! Dont

![Example of focus order being incorrectly applied to a table](/assets/components/table/table-cell-focus-dont.png)
!!!

## Best practices

### Interactive rows

The table row element (`tr`) is not eligible to receive interactions. That is, actions cannot be attached to a table row. If an interactive element is desired, place it within a table cell element (`td`) within that row (i.e., `<td><a href="somelink.html">Some link</a></td>`).

### For engineers

When providing additional or alternative styles to the table element, do not change the `display` property in the CSS. This alters how the table is presented to the user with assistive technology; they will no longer be presented with a table.

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.1.4" "2.4.3" "2.4.7" "4.1.2" }} />

---

<Doc::A11ySupport />
