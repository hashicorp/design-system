## Conformance rating

<!-- Update conformance rating badge with correct status and remove the others -->
<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Focus and focus order

- When the dialog is open, focus moves to the first interactive element within the dialog and is trapped within the component.
- Since a dialog is a complex pattern that can contain any combination of nested components and content, nested elements must adhere to their individual accessibility criteria.

### Focus order within a simple dialog

In the case the dialog is triggered via a keyboard, the dismiss button must be first in the focus order since there isn’t any content within the body that is eligible to receive focus.

![Simple focus within a modal](/assets/components/modal/modal-focus-order-simple.png =1042x*)

### Focus order within a complex dialog

If the dialog body contains interactive content, such as input fields, the first element should receive focus first regardless of how the dialog is triggered; either via a mouse click or via the keyboard. This behaviour should be implemented by [setting the focus on the first element](/components/modal?tab=code#form-within-a-modal-dialog).

![Complex focus within a modal](/assets/components/modal/modal-focus-order-complex.png =1042x*)

#### Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.1.1" "1.3.1" "1.3.2" "1.3.3" "1.3.5" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.4.2" "2.4.3" "2.4.6" "2.4.7" "3.2.1" "3.2.2" "3.3.1" "3.3.2" "3.3.3" "3.3.4" "4.1.1" "4.1.2" "4.1.3" }} />

---

<Doc::A11ySupport />
