## Conformance rating

<!-- Update conformance rating badge with correct status and remove the others -->
<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

<Doc::Badge @type="warning">Conditionally conformant</Doc::Badge>

Explain how the component is conditionally conformant. For example, any component that offers text truncation is conditionally conformant- it is conformant as long as the text truncation feature is not used.

<Doc::Badge @type="critical">Not conformant</Doc::Badge>

The `Component Name` component is not WCAG-conformant on its own. (Explain how to use it in a conformant way)

## Focus

When the SideNav receives focus via keyboard, the home link should focus as the first interactive element in the [DOM (document object model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction). Then, focus will follow through with the rest of the elements according to their order in the DOM.

Since the SideNav is a complex component that holds several nested components and can contain multiple types of content, nested elements must adhere to their individual accessibility criteria.

![Focus order in navigation](/assets/components/side-nav/focus-order.png)

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "..." }} />

---

<Doc::A11ySupport />
