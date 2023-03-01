## Conformance Rating

<Doc::Badge @type="warning">Conditionally conformant</Doc::Badge>

This component is conditionally conformant.

1. When truncation occurs, a keyboard-only user cannot access the truncated content.
2. The component is no longer conformant if the chevron icon is removed from the ToggleButton.

## Known issues

### ToggleIcon with no chevron

Setting `@hasChevron` to `false` on ToggleIcons doesn’t provide enough affordance; it’s not quickly seen as actionable.

### Color blind users and critical actions

Color blind users, specifically those with [Achromatopsia](https://en.wikipedia.org/wiki/Achromatopsia), may have a hard time perceiving Critical ListItems within our Dropdown component. 

To provide a more accessible experience, we recommend:

- Using strong, clear language for the text (e.g., “Delete...”, “Revoke...”, etc.).
- Adding a relevant icon that indicates the action is destructive (e.g., `trash`).
- Moving the Critical ListItem to the bottom of the list or the section.
    - If at the bottom of a list, consider adding a separator above the Critical ListItem to help separate it from other ListItems.
- Adding a second confirmation layer after the user clicks “Delete” (e.g., showing a confirmation [Modal](/components/modal) that requires the user to type “Delete” into a field before proceeding).

## Keyboard navigation

![Example of the focus order for a Dropdown](/assets/components/dropdown/dropdown-focus-order.png =668x*)

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.1.1" "2.1.2" "2.4.3" "2.4.7" }} />

---

<Doc::A11ySupport />
