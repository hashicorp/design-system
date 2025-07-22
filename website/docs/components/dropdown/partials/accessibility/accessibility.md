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

Ensure you're using strong, clear language for the text, e.g., “Delete...”, “Revoke...”, etc.

![Example of a Dropdown with clear destructive language](/assets/components/dropdown/dropdown-accessibility-destructive-language.png)

To provide a more accessible experience, we recommend:

- Adding a relevant icon that indicates the action is destructive, e.g., `trash`.
- Moving the Critical ListItem to the bottom of the list or the section. Consider also adding a separator above the Critical ListItem to separate it from other ListItems.
- Adding a second confirmation layer when the user chooses to delete an object, e.g., showing a confirmation [Modal](/components/modal) that requires the user to type “Delete” into a field before proceeding.

![Example of a Dropdown with enhanced accessibility, including adding an icon and placing as the last item in the list](/assets/components/dropdown/dropdown-accessibility-destructive-icon.png)

## Keyboard navigation

![Example of the focus order for a Dropdown](/assets/components/dropdown/dropdown-focus-order.png)

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.1.1" "2.1.2" "2.4.3" "2.4.7" }} />

---

<Doc::A11ySupport />
