## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Focus

When the App Header receives focus via keyboard, the home link should focus as the first interactive element in the [DOM (document object model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction). Then, focus will follow through with the rest of the elements according to their order in the DOM.

Since the App Header is a complex component that holds several nested components and can contain multiple types of content, nested elements must adhere to their individual accessibility criteria.

![Focus order in the App Header](/assets/components/app-header/app-header-focus-order.png)

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.1.1" "1.3.1" "1.3.2" "1.3.3" "1.3.4" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.1.4" "2.4.3" "2.4.7" "3.2.1" "3.2.3" "3.2.4" "4.1.2" }} />

---

<Doc::A11ySupport />
