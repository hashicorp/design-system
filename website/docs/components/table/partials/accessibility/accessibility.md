## Conformance rating

<!-- Update conformance rating badge with correct status -->
<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Focus in Tables

- Focus will only move through sortable headers and will skip over non-sortable headers as they aren‘t interactive. 
- Interactive elements within cells will recieve focus, but entire cells and entire rows will not. 

!!! Do

![Example of focus order being properly applied to a table](/assets/components/table/table-cell-focus-do.png =936x*)
!!!

!!! Dont

![Example of focus order being incorrectly applied to a table](/assets/components/table/table-cell-focus-dont.png =938x*)
!!!

## Best practices

### Tooltips in headers

Since columns within the table header can control sorting within the table, the header column is not eligible to receive additional interactive elements such as tooltip/toggletip or other components that rely on interactivity to display content (nested interactive elements).

If you need a tooltip, there may not be enough contextual information about the table or the label within the header may not be clear enough.

![Example of a nested tooltip within a table header](/assets/components/table/table-accessibility-tooltip.png =900x*)

### Interactive rows

The table row element (`tr`) is not eligible to receive interactions. That is, actions cannot be attached to a table row. If an interactive element is desired, place it within a table cell element (`td`) within that row (i.e., `<td><a href="somelink.html">Some link</a></td>`).

### For engineers

When providing additional or alternative styles to the table element, do not change the `display` property in the CSS. This alters how the table is presented to the user with assistive technology; they will no longer be presented with a table.

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.1.4" "2.4.3" "2.4.7" "4.1.1" "4.1.2" }} />

---

## Support

If any accessibility issues have been found within this component, let us know by [submitting an issue](https://github.com/hashicorp/design-system/issues/new/choose).
