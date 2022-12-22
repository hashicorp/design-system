## Focus and focus order

- When the Modal is triggered via the keyboard, focus is trapped within the Modal.
  - If there are no interactive elements within the body of the Modal the dismiss button should receive focus as the first interactive element in the [DOM (document object model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).
  - If there is an interactive element within the body of the Modal (like a form input or link), that element should be targeted for focus first.
- Since a Modal is a complex pattern that can contain any combination of nested components and content, nested elements must adhere to their individual accessibility criteria.

### Focus order within a simple Modal

Given the Modal is triggered via a keyboard, the dismiss button is first in the focus order since there isn't any content within the body eligible to receive focus.

![Simple focus within a modal](/assets/components/modal/modal-focus-order-simple.png)

### Focus order within a complex Modal

- If the Modal body contains interactive content, the first element should receive focus first.
- This is true regardless of how the Modal is triggered; either via a mouse click or via the keyboard.

![Complex focus within a modal](/assets/components/modal/modal-focus-order-complex.png)

#### Applicable WCAG Success Criteria (Reference)

This section is for reference only, some descriptions have been truncated for brevity. This component intends to conform to the following WCAG success criteria:

<Doc::WcagList @criteriaList={{array "1.1.1" "1.3.1" "1.3.2" "1.3.3" "1.3.5" "1.4.1" "1.4.3" "1.4.4" "1.4.5" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.1.4" "2.4.2" "2.4.3" "2.4.6" "2.4.7" "3.2.1" "3.2.2" "3.3.1" "3.3.2" "3.3.3" "3.3.4" "4.1.1" "4.1.2" "4.1.3" }} />
