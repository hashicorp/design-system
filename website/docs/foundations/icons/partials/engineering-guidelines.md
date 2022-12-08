## Engineering guidelines

There are multiple ways to use these icons in your codebase. The package can be installed as an [Ember addon](#ember-flight-icons) for the convenience of using a component with strong defaults, or it can be [consumed in React applications](#use-react) via direct import of the SVG file or as standalone React/SVG icon component.

### Accessibility

Accessibility (a11y) support for SVGs is inconsistent across browsers and assistive technology. Currently, best practice is to set the `aria-hidden` attribute to false on the SVG itself. This means that the icon (both the singular icon and the icon component) will need to be used _in context_. The icons themselves are for presentation purposes only and should never be used on their own.

However: As a _temporary_ bridge while we work to provide the accessible components in the design system, we have provided the ability to add a title element to the Ember component by defining a value for the `@title` property. This is a temporary measure and we strongly encourage UI engineering teams to work with their designers and plan to convert any standalone icon use.

#### Examples of correct use

```markup
<button aria-label="Check activity">
<FlightIcon @name="activity" />
</button>
```

```markup
<h2>Activity report <FlightIcon @name="activity" />
```

Authors should also follow the following guidelines:

- The icons are sized as 16x16(px) and 24x24(px) and should not be used at different sizes without a design consult.
- The icons do not have a unique id generated; authors should take precautions to avoid [related accessibility conformance failures](https://www.w3.org/TR/WCAG20-TECHS/F77.html).

### Use in Ember apps

#### Installation

To install, run:
```bash
yarn add @hashicorp/ember-flight-icons
```

Note: Because this addon exposes a `data-test-icon` helper it is suggested consumers install `ember-test-selectors`. [This Ember addon](https://github.com/simplabs/ember-test-selectors) strips out all `data-test-*` attributes for production builds.

#### Understanding the component

The component comes with the following defaults:

1.  `fill` attribute: set to currentColor
2.  `id` attribute: a unique, automatically generated id
3.  `aria-hidden` attribute: set to true
4.  `height` and `width`: default size of 16x16 (px)
5.  `stretched`: if the SVG should have 100% width/height (stretch to fill the parent) - defaults to "false"
6.  (CSS) `class`: flight-icon, flight-icon-NAME, flight-icon-display-inline
7.  CSS display: set to `display:inline-block`
8.  `data-test-icon` attribute: for the author's testing convenience; set to the value of the `@name` property.

This makes the base, required invocation quite terse — `@name` is the only property that requires specification. So this invocation:

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

The `<use>` element will then render the correct svg to the shadow dom.

#### Customizable properties

The following properties are customizable:

1.  fill (the color)
2.  size (at this time, only 16 (default) and 24 are supported)
3.  stretched (true/false)
4.  display (inline-block or block)
5.  additional CSS classes

##### Examples

**Fill:** To customize the fill attribute, set the `@color` value (multiple supported ways). The recommended approach to ensure consistency is to use one of the pre-defined variables:

```markup
<FlightIcon @name="zap" @color="var(--brand)" />
```

Other accepted values include named colors and color values themselves.

```markup
<FlightIcon @name="zap" @color="rebeccapurple" />
```

```markup
<FlightIcon @name="zap" @color="rgb(46, 113, 229)" />
```

**Size:** To use the 24x24 (px) icon size, set the `@size` value:

```markup
<FlightIcon @name="zap" @size="24" />
```

**Stretched:** To have the icon fill the parent container (width: 100%, height: 100%, display: block), set the `@stretched` attribute:

```markup
<flighticon="" @name="zap" @size="24" @stretched="{{true}}">
```

**CSS classes:** To append additional classes to the component, add `class` with value(s):

```markup
<FlightIcon @name="triangle-fill" class="ds-rotate-90" />
```

**CSS display:** To change the default display of _inline-block_ to _block_, set `@isInlineBlock` to false:
```markup
<flighticon="" @name="triangle-fill" @isinlineblock="{{false}}">
```

##### Animated icons

Some of the icons are animated by default (eg. "loading" and "running").
To use them just declare them in the same way that you would withany other icon.

```markup
<FlightIcon @name="loading" @size="24" />
```

Note: a `prefers-reduced-motion` media query will automatically take care for you of disabling the animation if the user sets this preference in their environment.

### Use in React apps

It is also possible to install `@hashicorp/flight-icons` and use the icons in React applications.

_Notice: if you want to have more context you can [see the pull-request here](https://github.com/hashicorp/flight/pull/325) where this implementation has been discussed and agreed upon._

#### Installation

To install, run:

```bash
yarn install @hashicorp/flight-icons
```

#### Inline SVG

Single icons can be imported and used directly as SVG files using the [&lt;InlineSvg&gt;](https://react-components.vercel.app/components/inlinesvg) provided by the [@hashicorp/react-components](https://github.com/hashicorp/react-components) library:

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

_Notice: the code above is an example, please update it accordingly to your codebase._

Since this is just an SVG asset, there are no _props_ that can be passed to it. You should refer to the [&lt;InlineSvg&gt;](https://react-components.vercel.app/components/inlinesvg) documentation to know how to apply color and size to the SVG icon.

#### React/SVG

Single icons can be also imported and used directly as standalone React/SVG components:

```javascript
// import the React/TypeScript file (using 'require')
const { IconArrowRight24 } = require('@hashicorp/flight-icons/svg-react/arrow-right-24');
// or import the React/TypeScript file (using 'import')
import { IconArrowRight24 } from '@hashicorp/flight-icons/svg-react/arrow-right-24';

// elsewhere in the file
<IconArrowRight24 />
```

_Notice: the code above is an example, please update it accordingly to your codebase._

#### Props

The component exposes the following _props_:

1.  `color` - the color (applied as _fill_) to the SVG - by default is `currentColor` but any valid HTML/CSS color is accepted
2.  `title` - the title of the SVG - by default the icon has an _aria-hidden_ attribute applied to it, because is expected to be used _in contex_ (see [§ Accessibility](#accessibility)); if instead you need to use it without text associated to it, you have to pass a _title_ attribute to make it accessible.
3.  `...props` - any other _prop_ passed to the component will be applied via spread

The size of the icon is determined by the size of the asset that is imported (each icon is exported in two sizes, _16_ and _24_). If you need a different size, you have to use CSS to override its intrinsic size.

##### Animated icons

Some of the icons are supposed to be animated (eg. "loading" and"running").
To use them first of all you have to import the CSS that controls th
e icons' animation in your CSS:

```css
// the path here depends if you're using 'svg-react' or 'svg' icons @import ~@hashicorp/flight-icons/svg-react/animation.css';
```

and the just declare them in the same way that you would with any other icon.

```javascript
// if you're using the 'svg-react' icons
import { IconLoading16 } from '@hashicorp/flight-icons/svg-react/loading-16'
<IconLoading16 />

// if you're using the 'svg' icons
import svgLoading16 from '@hashicorp/flight-icons/svg/loading-16.svg?include'
<InlineSvg src={svgLoading16} />
```

Note: a `prefers-reduced-motion` media query will automatically take care for you of disabling the animation if the user sets this preference in their environment.

### Updating existing interfaces

- We maintain [a mapping of icon names between Structure and Flight](https://github.com/hashicorp/design-system/blob/main/packages/flight-icons/structure-mappings.json) that can be referenced to migrate an icon from Structure to Flight. It is also possible to write codemods to automate this migration. If you are interested in learning more, reach out in [#team-design-systems](https://hashicorp.slack.com/archives/C7KTUHNUS).
