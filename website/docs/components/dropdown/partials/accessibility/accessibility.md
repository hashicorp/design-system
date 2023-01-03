## Conformance Rating

<Doc::Badge @type="warning">Conditionally conformant</Doc::Badge>

This component is conditionally conformant.

1. In any instance where data truncation occurs, there is no current method to access that data for the keyboard-only user.
2. If the chevron icon is removed from the dropdown’s toggle button, the component is no longer conformant.

## Best Practices

Color blind users (specifically those with [Achromatopsia](https://en.wikipedia.org/wiki/Achromatopsia)) may have a hard time perceiving Critical ListItems within our dropdown. To provide a more accessible experience, we recommend:

- Using strong, clear language for the text (e.g., “Delete...”, “Revoke...”, etc.)
- Adding a relevant icon
- Moving the Critical ListItem to the bottom of the list or the section
    - If at the bottom of a list, consider adding a separator above the Critical ListItem to help separate it from other ListItems
- Adding a second confirmation layer after the user clicks “Delete” (ie. showing a confirmation modal that requires the user to type “Delete” into a field before proceeding)

<Hds::Dropdown::Toggle::Icon @text="Icon" @icon="more-horizontal" @isOpen={{true}} />
<Doc::ListContainer class="hds-dropdown-list">
  <Hds::Dropdown::ListItem::Interactive @text="Rename" @color="action" />
  <Hds::Dropdown::ListItem::Interactive @text="Restore" @color="action" />
  <Hds::Dropdown::ListItem::Separator />
  <Hds::Dropdown::ListItem::Interactive @text="Delete" @color="critical" @icon="trash" />
</Doc::ListContainer>

### Keyboard navigation

[Many types of users](https://webaim.org/techniques/keyboard/) rely on their keyboard to navigate the web, so it’s important that our designs have annotations for the [focus order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html#:~:text=3%3A%20Focus%20Order-,Success%20Criterion%202.4.,that%20preserves%20meaning%20and%20operability) (how keyboard users navigate the web) to ensure we’re providing them with a natural path and great experience.

!!! Info

Focus order annotated with Figma plugin, [A11y Focus Order](https://www.figma.com/community/plugin/731310036968334777/A11y---Focus-Orderer).

!!!

![Dropdown focus order](/assets/components/dropdown/dropdown-focus_order-01.png)

![Dropdown focus order](/assets/components/dropdown/dropdown-focus_order-02.png)

![Dropdown focus order](/assets/components/dropdown/dropdown-focus_order-03.png)

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG success criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.1.1" "2.1.2" "2.4.3" "2.4.7" }} />

## Support

If any accessibility issues have been found within this component, please let us know by [submitting an issue](https://github.com/hashicorp/design-system/issues/new/choose).
