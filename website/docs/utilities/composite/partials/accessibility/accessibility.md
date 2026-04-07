
## Conformance rating

<Doc::Badge @type="warning">Conditionally conformant</Doc::Badge>

The `Composite` component is a completely headless utility that solely manages focus routing and keyboard logic. It does not render any structural HTML or semantic attributes on its own. Consumers are strictly responsible for implementing the primitive with the correct semantic HTML elements, WAI-ARIA roles (such as menu, grid, or listbox), and visual focus indicators to ensure a fully conformant experience for the user.

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.13" "2.1.1" "2.1.2" "2.4.3" "2.4.7" "2.4.11" "3.2.1" "4.1.2"}} />

---

<Doc::A11ySupport />
