## Conformance rating

<Doc::Badge @type="warning">Conditionally conformant</Doc::Badge>

By default, the Card Container component has `@overflow="hidden"` applied to it. This means you may need to handle any cases where text is truncated, to make it accessible for keyboard-only users.

Additionally, if the component is altered to be an interactive element, and also contains interactive elements like links or buttons, it can cause a conformance failure for having nested interactive elements.

## Support

If any accessibility issues have been found within this component, please let us know by [submitting an issue](https://github.com/hashicorp/design-system/issues/new/choose).
