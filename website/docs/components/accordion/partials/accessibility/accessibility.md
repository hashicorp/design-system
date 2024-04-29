## Conformance rating

<!-- Update conformance rating badge with correct status and remove the others -->
<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Keyboard navigation

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Focus on a toggle.

![Keyboard accordion navigation example](/assets/components/accordion/accordion-focus.png =800x*)

<Doc::Badge @type="neutral">Spacebar</Doc::Badge>
<Doc::Badge @type="neutral">Enter</Doc::Badge>

Expand container to display hidden content.

![Keyboard accordion navigation example](/assets/components/accordion/accordion-spacebar-enter.png =800x*)

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Move to the first interactive element within the content area.

![Keyboard accordion navigation example](/assets/components/accordion/accordion-focus-to-content.png =800x*)

When `containsInteractive`, the focus will first move to the toggle button, then to the nested interactive elements in the toggle area.

![Keyboard accordion navigation example](/assets/components/accordion/contains-interactive-focus.png =800x*)


## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.1.1" "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.4.3" "2.4.6" "2.4.7" "2.5.3" "3.2.1" "3.2.4" "4.1.2" }} />

---

<Doc::A11ySupport />
