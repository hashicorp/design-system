## How to use icons

icons can be used in many ways. The package can be installed as an [Ember addon](#using-icons-in-ember-apps) for the convenience of using a component with strong defaults. It can also be [consumed in React applications](#using-icons-in-react-apps) via direct import of the SVG file or as a standalone React/SVG icon component.

### Using icons in Ember apps

#### Installing the `ember-flight-icons` addon

```bash
yarn add @hashicorp/ember-flight-icons
```

!!! Information

Because this addon exposes a `data-test-icon` helper, we recommend installing [`ember-test-selectors`](https://github.com/simplabs/ember-test-selectors) which strips out all `data-test-*` attributes for production builds.
!!!

#### Understanding the component

The component comes with the following defaults:

1.  `fill` attribute: set to currentColor.
2.  `id` attribute: a unique, automatically generated id.
3.  `aria-hidden` attribute: set to true.
4.  `height` and `width`: default size of 16x16 (px).
5.  `stretched`: if the SVG should have 100% width/height (stretch to fill the parent)—defaults to "false".
6.  (CSS) `class`: flight-icon, flight-icon-{name}, flight-icon-display-inline.
7.  CSS display: set to `display:inline-block`.
8.  `data-test-icon` attribute: for the author’s testing convenience; set to the value of the `@name` property.

This makes the base, required invocation quite terse—`@name` is the only property that requires specification. So this invocation:

```markup
<FlightIcon @name="alert-circle" />
```

Renders to this (where the ID will be unique each time):

```markup
<svg
    id="icon-ember115"
    class="flight-icon icon-alert-circle display-inline"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    aria-hidden="true"
    data-test-icon="alert-circle"
>
    <use href="/@hashicorp/ember-flight-icons/icons/sprite.svg#alert-circle-16"></use>
</svg>
```

The `<use>` element will then render the correct SVG to the shadow DOM.

#### Customizable properties

The following properties are customizable:

1.  [fill](#fill)
2.  [size](#size)
3.  [stretched](#stretched)
4.  [additional CSS classes](#css-classes)
5.  [display](#css-display)

##### Fill

To customize the fill attribute, set the `@color` value. To ensure consistency with our design language, we recommend using one of the pre-defined variables:

```handlebars
<FlightIcon @name="zap" @color="var(--brand)" />
```

Other accepted values include named colors and color values themselves (e.g., hex, rgb, etc).

```handlebars
<FlightIcon @name="zap" @color="rebeccapurple" />
```

```handlebars
<FlightIcon @name="zap" @color="rgb(46, 113, 229)" />
```

##### Size

To use the 24px icon size, set the `@size` value:

```handlebars
<FlightIcon @name="zap" @size="24" />
```

##### Stretched

To have the icon fill the parent container (width: 100%, height: 100%, display: block), set the `@stretched` attribute:

```handlebars
<FlightIcon @name="zap" @size="24" @stretched={{true}} />
```

##### CSS classes

To append additional classes to the component, add `class` with value(s):

```markup
<FlightIcon @name="triangle-fill" class="ds-rotate-90" />
```

##### CSS display

To change the default display from `inline-block` to `block`, set `@isInlineBlock` to false:

```handlebars
<FlightIcon @name="triangle" @isInlineBlock={{false}} />
<FlightIcon @name="triangle-fill" @isInlineBlock={{false}} />
```

##### Animated icons

Animated icons (e.g., "loading" and "running") are animated by default, meaning no additional properties are needed. 

!!! Information

**Note on accessibility**

A `prefers-reduced-motion` media query will automatically disable the animation if users set this preference in their environment.
!!!

```handlebars
<FlightIcon @name="loading" @size="24" />
```

### Using icons in React apps

To use icons in a React application, install the `@hashicorp/flight-icons` package and import the icons as either inline SVGs or as a standalone React/SVG component. 

!!! Info

For more details about the decision to add this functionality, visit this [pull-request](https://github.com/hashicorp/flight/pull/325).
!!!

#### Installing the `flight-icons` package

To install, run:

```bash
yarn install @hashicorp/flight-icons
```

#### Importing icons as inline SVGs

Single icons can be imported and used directly as SVG files using [&lt;InlineSvg&gt;](https://react-components.vercel.app/components/inlinesvg) provided by [@hashicorp/react-components](https://github.com/hashicorp/react-components).

Since this is just an SVG asset, no _props_ can be passed. You should refer to the [&lt;InlineSvg&gt;](https://react-components.vercel.app/components/inlinesvg) documentation to know how to apply color and size to the SVG icon.

```javascript
// import the SVG file (using 'require')
const iconArrowRight = require('@hashicorp/flight-icons/svg/arrow-right-24.svg?include');
// or import the SVG file (using 'import')
import iconArrowRight from '@hashicorp/flight-icons/svg/arrow-right-24.svg?include';

// elsewhere in the file
<InlineSvg src={iconArrowRight} />

// alternatively you can also use a similar approach
<InlineSvg src={require('@hashicorp/flight-icons/svg/arrow-right-24.svg?include')} />
```

#### Importing icons as React/SVG components

Single icons can be imported and used directly as standalone React/SVG components:

```javascript
// import the React/TypeScript file (using 'require')
const { IconArrowRight24 } = require('@hashicorp/flight-icons/svg-react/arrow-right-24');
// or import the React/TypeScript file (using 'import')
import { IconArrowRight24 } from '@hashicorp/flight-icons/svg-react/arrow-right-24';

// elsewhere in the file
<IconArrowRight24 />
```

#### Customizable properties

The component exposes the following _props_:

1.  `color`—the color (applied as _fill_) to the SVG—by default is `currentColor` but any valid HTML/CSS color is accepted.
2.  `title`—the title of the SVG—by default, the icon has an _aria-hidden_ attribute applied to it because it is expected to be used in context (check out [§ Accessibility](#accessibility)); if instead you need to use it without text associated to it, you have to pass a _title_ attribute to make it accessible.
3.  `...props` - any other _prop_ passed to the component will be applied via spread.

The size of the icon is determined by the size of the asset imported (each icon is exported in two sizes, _16_ and _24_). If you need a different size, use CSS to override its intrinsic size.

#### Animated icons

Some of the icons are meant to be animated (e.g., “loading” and “running”). To use them, import the CSS that controls the icons’ animation:

```scss
// the path here depends if you’re using 'svg-react' or 'svg' icons 
@import ~@hashicorp/flight-icons/svg-react/animation.css';
```

Then declare them the same way you would with any other icon.

```javascript
// if you’re using the 'svg-react' icons
import { IconLoading16 } from '@hashicorp/flight-icons/svg-react/loading-16'
<IconLoading16 />

// if you’re using the 'svg' icons
import svgLoading16 from '@hashicorp/flight-icons/svg/loading-16.svg?include'
<InlineSvg src={svgLoading16} />
```

!!! Information

**Note on accessibility**

A `prefers-reduced-motion` media query will automatically disable the animation if users set this preference in their environment.
!!!

## Accessibility

Accessibility support for SVGs is inconsistent across browsers and assistive technology. Currently, the best practice is to set the `aria-hidden` attribute to `true` on the SVG itself. This means that the icon (both the singular icon and the icon component) will need to be used _in context_. The icons themselves are for presentation purposes only and should never be used on their own.

However, as a _temporary_ bridge, while we work to provide the accessible components in the design system, we have provided the ability to add a title element to the Ember component by defining a value for the `@title` property. This is a temporary measure, and we strongly encourage UI engineering teams to work with their designers and plan to convert any standalone icon use.

### Examples of correct use

```markup
<button aria-label="Check activity">
    <FlightIcon @name="activity" />
</button>
```

```markup
<h2>
    Activity report <FlightIcon @name="activity" />
</h2>
```

Some additional best practices include:

- Use icons at 16px or 24px. Use at other sizes sparingly.
- Icons do not have a unique id generated; take precautions to avoid [related accessibility conformance failures](https://www.w3.org/TR/WCAG20-TECHS/F77.html).

## Migrating from Structure

### Choosing the correct icon

When migrating icons from Structure, reference our [mapping of icon names between Structure and Helios](https://github.com/hashicorp/design-system/blob/main/packages/flight-icons/structure-mappings.json).

It’s possible to write codemods to automate this migration. If you’re interested in learning more, contact [#team-design-systems](https://hashicorp.slack.com/archives/C7KTUHNUS) (Internal only).
