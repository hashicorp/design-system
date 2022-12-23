## Conformance rating

### Form::RadioCard

<Doc::Badge @type="success">Conformant</Doc::Badge>

`Form::RadioCard` is conformant when used as directed.

### Form::RadioCard::Group

<Doc::Badge @type="success">Conformant</Doc::Badge>

`Form::RadioCard::Group` is conformant when used as directed.

!!! Info

**Links within labels, help text, or error text**

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, it is generally preferable to avoid links within help/error text or labels; however, we understand that this may not be avoidable in some cases. Please use sparingly until a good known alternative approach is determined.
!!!

## Keyboard navigation

Move focus to the selected card. If nothing is selected, focus will move to the first radio card.

![Keyboard tab focus in a RadioCard group](/assets/components/form/radio-card/radio_card-accessibility-keyboard_tab.png)

Navigate between radio cards. As the card is focused it also becomes selected.

![Keyboard arrow key focus in a RadioCard group](/assets/components/form/radio-card/radio_card-accessibility-keyboard_arrows.png)

## Applicable WCAG Success Criteria

This section is for reference only, some descriptions have been truncated for brevity.

This component intends to conform to the following WCAG success criteria:
<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.3.4" "1.3.5" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.4.6" "2.4.7" "3.2.1" "3.2.2" "3.2.4" "3.3.2" "4.1.1" "4.1.2" }} />

## Support

If any accessibility issues have been found within this component, please let us know by [submitting an issue](https://github.com/hashicorp/design-system/issues/new/choose).
