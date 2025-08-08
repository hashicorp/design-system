## Conformance rating

<Doc::Badge @type="warning">Conditionally conformant</Doc::Badge>

By default, the Card container component has `@overflow="hidden"` applied to it. This means you may need to handle cases where text is truncated, to make it accessible for keyboard-only users.

If the Card `tag` argument is set to `li`, it must be contained within either a `ul` or `ol` parent element in order for the HTML markup to be valid.

Additionally, if the component is altered to be an interactive element, and also contains interactive elements like links or buttons, it can cause a conformance failure for having nested interactive elements.

To implement accessible interactive cards, a helpful resource is the ["Inclusive Components" blog on Cards](https://inclusive-components.design/cards/).

---

<Doc::A11ySupport />
