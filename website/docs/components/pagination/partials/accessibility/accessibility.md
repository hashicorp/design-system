## Conformance rating

<!-- Update conformance rating badge with correct status and remove the others -->
<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Best practices

### Keyboard navigation

In most cases, the numbered pagination provides a greater user experience. It allows users to jump between pages and always return to the first page or go to the last page without navigating through the pages manually.

If your product only has cursor pagination, it won’t be able to support the numbered variant. Only applications with offset pagination can implement the numbered pagination variant.

Focus and move between pagination controls.

`tab`

![Keyboard navigation](/assets/components/pagination/pagination-keyboard-navigation-01.png =836x*)

Trigger button to navigate to another page.

`enter`

![Keyboard navigation](/assets/components/pagination/pagination-keyboard-navigation-02.png =836x*)

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG success criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.10" "1.4.11" "1.4.12" "2.1.1" "2.1.2" "2.2.1" "2.5.3" "4.1.2" "4.1.3" }} />

---

<Doc::A11ySupport />
