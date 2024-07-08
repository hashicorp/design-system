## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any accessibility issues with this component.

## Browser accessibility support

Accessibility support for SVGs is inconsistent across browsers and assistive technology. Currently, the best practice is to set the `aria-hidden` attribute to `true` on the SVG itself (as we do by default for the `Hds::Icon` component). This means that the icon (both the singular icon and the icon component) will need to be used _in context_. The icons themselves are for presentation purposes only and should never be used on their own.

However, as a _temporary_ bridge, while we work to provide the accessible components in the design system, we have provided the ability to add a title element to the Ember component by defining a value for the `@title` property. This is a temporary measure, and we strongly encourage UI engineering teams to work with their designers and plan to convert any standalone icon use.

### Examples of correct use

```markup
<button aria-label="Check activity">
    <Hds::Icon @name="activity" />
</button>
```

```markup
<h2>
    Activity report <Hds::Icon @name="activity" />
</h2>
```
