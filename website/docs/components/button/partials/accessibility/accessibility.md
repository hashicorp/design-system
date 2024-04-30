## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Button vs. link

While buttons and links have been used interchangeably across the internet for years, understanding the difference between these two and striving for the semantic use of these elements can help make our products more conformant. 

### How to know which to use

- If it goes to a URL, use a Link. 
- If it triggers an action (toggles a state, submits a form, etc.), use a Button. 
- When submitting a form and redirecting the user to a different URL, use a Button.

### Why strive for semantic use

Users with assistive technology (AT) or keyboard-only users rely on the semantic use of Buttons and Links to determine how to activate the element. Buttons are activated with the `Enter/Return` key or the `Spacebar` key, while Links can only be activated with the `Enter/Return` key.

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.1.1" "2.4.7" "4.1.2" }} />

---

<Doc::A11ySupport />
