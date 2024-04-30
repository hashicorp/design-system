## Conformance rating

### Form::RadioCard

<Doc::Badge @type="success">Conformant</Doc::Badge>

`Form::RadioCard` is conformant when used as directed.

### Form::RadioCard::Group

<Doc::Badge @type="success">Conformant</Doc::Badge>

`Form::RadioCard::Group` is conformant when used as directed.

!!! Info

**Links within labels, helper text, or error text**

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. We understand avoiding links within help/error text or labels may be impossible, but we recommend using this method sparingly. 
!!!

## Keyboard navigation

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Move focus to the selected card. If nothing is selected, focus will move to the first Radio Card.

![Keyboard tab focus in a RadioCard group](/assets/components/form/radio-card/radio-card-accessibility-tab.png =980x*)

<Doc::Badge @type="neutral"><FlightIcon @name="arrow-left" /></Doc::Badge>
<Doc::Badge @type="neutral"><FlightIcon @name="arrow-right" /></Doc::Badge>
<Doc::Badge @type="neutral"><FlightIcon @name="arrow-up" /></Doc::Badge>
<Doc::Badge @type="neutral"><FlightIcon @name="arrow-down" /></Doc::Badge>

Navigate between Radio Cards. As the card is focused it also becomes selected.

![Keyboard arrow key focus in a RadioCard group](/assets/components/form/radio-card/radio-card-accessibility-arrows.png =980x*)

## Applicable WCAG Success Criteria

This section is for reference only, some descriptions have been truncated for brevity.

This component intends to conform to the following WCAG Success Criteria:
<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.3.4" "1.3.5" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.4.6" "2.4.7" "3.2.1" "3.2.2" "3.2.4" "3.3.2" "4.1.2" }} />

---

<Doc::A11ySupport />
