## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any accessibility issues with this component.

## Browser accessibility support

Accessibility support for SVGs is inconsistent across browsers and assistive technology. Currently, the best practice is to set the `aria-hidden` attribute to `true` on the SVG itself (as we do by default for the `Hds::Icon` component). This means that the icon (both the singular icon and the icon component) will need to be used _in context_. The icons themselves are for presentation purposes only and should never be used on their own.

TODO: <https://github.com/hashicorp/design-system/pull/2221#discussion_r1682994082>
> indicate that our chosen approach is to put the AccName on the parent element and leave the icon marked with aria-hidden.

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
