## Conformance

**Note:** Putting this in for now, can adjust when the component is built.

<Doc::Badge @type='success'>Conformant</Doc::Badge>

The Flyout component is conformant when used as directed.

## Focus

- When a Flyout is triggered, focus is trapped within the component.
    - If there are no interactive elements within the body of the Flyout, the dismiss button should receive focus as the first interactive element in the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).
    - If there is an interactive element within the body (link a link), that element should receive focus first.
- Since a Flyout is a complex component that can contain any combination of nested components and content, nested elements must adhere to their individual accessibility criteria.

### Focus within a simple Flyout

If the Flyout is triggered via the keyboard and there isn't any content in the body eligible to recieve focus, the dismiss button recieves focus first.

![Focus order within a simple Flyout](/assets/components/flyout/flyout-focus-order-simple.png)

### Focus within a complex Flyout

If the Flyout body contains interactive content (like a link), the first interactive element should receive focus first and the dismiss button should receive focus last.

![Focus order with a complex Flyout](/assets/components/flyout/flyout-focus-order-complex.png)