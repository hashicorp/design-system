## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any accessibility issues with this component.

## Browser accessibility support

Accessibility support for SVGs is inconsistent across browsers and assistive technology. Currently, the best practice is to set the `aria-hidden` attribute to `true` on the SVG itself (as we do by default for the `Hds::Icon` component). This means that the icon (both the singular icon and the icon component) will need to be used _in context_. The icons themselves are for presentation purposes only and should never be used on their own.

[[code-snippets/icon-in-header]]

If you make a custom element, or want to use a `Hds::Icon` inside of a native HTML element like a `<button>` element, ensure that an `aria-label` attribute is added, like this:

[[code-snippets/icon-in-button]]
