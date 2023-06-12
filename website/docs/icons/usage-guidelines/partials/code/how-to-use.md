## How to use icons

Icons can be used in many ways. The package can be installed as an [Ember addon](#using-icons-in-ember-apps) for the convenience of using a component with strong defaults. It can also be [consumed in React applications](#using-icons-in-react-apps) via direct import of the SVG file or as a standalone React/SVG icon component.

The most basic invocation requires only the `@name` property to be passed with a value matching an existing name in [the Icon library](icons/library).

```markup
<FlightIcon @name="alert-circle" />
```

It renders to this (where the `id` will be unique each time):

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

### Color

The default value is `currentColor` which uses the inherited text color as the icon color. When setting a custom value, we recommend using one of the pre-defined variables to ensure consistency with our design language:

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

### Size

The default size is 16px. To use the alternative 24px icon size, set the `@size` value:

```handlebars
<FlightIcon @name="zap" @size="24" />
```

### Stretched

To have the icon fill the parent container (width: 100%, height: 100%, display: block), set the `@stretched` attribute to true:

```handlebars
<FlightIcon @name="zap" @size="24" @stretched={{true}} />
```

<!-- ##### CSS classes

To append additional classes to the component, add `class` with value(s):

```markup
<FlightIcon @name="triangle-fill" class="ds-rotate-90" />
``` -->

### isInlineBlock

To change the default display from `inline-block` to `block`, set `@isInlineBlock` to false:

```handlebars
<FlightIcon @name="triangle" @isInlineBlock={{false}} />
<FlightIcon @name="triangle-fill" @isInlineBlock={{false}} />
```

### Animated icons

Animated icons (e.g., "loading" and "running") are animated by default, meaning no additional properties are needed. 

!!! Information

**Note on accessibility**

A `prefers-reduced-motion` media query will automatically disable the animation if users set this preference in their environment.
!!!

```handlebars
<FlightIcon @name="loading" @size="24" />
```

### Using icons in Ember apps

Install the `ember-flight-icons` addon.

```bash
yarn add @hashicorp/ember-flight-icons
```

!!! Information

Because this addon exposes a `data-test-icon` helper, we recommend installing [`ember-test-selectors`](https://github.com/simplabs/ember-test-selectors) which strips out all `data-test-*` attributes for production builds.
!!!

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

<!-- #### Customizable properties

The component exposes the following _props_:

1.  `color`—the color (applied as _fill_) to the SVG—by default is `currentColor` but any valid HTML/CSS color is accepted.
2.  `title`—the title of the SVG—by default, the icon has an _aria-hidden_ attribute applied to it because it is expected to be used in context (check out [Accessibility](/icons/usage-guidelines?tab=accessibility)); if instead you need to use it without text associated to it, you have to pass a _title_ attribute to make it accessible.
3.  `...props` - any other _prop_ passed to the component will be applied via spread.

The size of the icon is determined by the size of the asset imported (each icon is exported in two sizes, _16_ and _24_). If you need a different size, use CSS to override its intrinsic size. -->

### Aligning icons

By default, the `FlightIcon` component has an `inline-block` display value (this can be changed using the `@isInlineBlock` argument). This means that the icon behaves like an inline element, and that if you want to vertically align it in relation to other sibling elements, you have to use CSS to achieve the expected result.

For example, to visually center an icon with a generic text node, you will need to use a parent `flex` container with `align-items: center`.

!!! Warning

**Avoid using `vertical-align: middle`**

Just setting `vertical-align: middle` in the parent container doesn’t necessarily achieve a vertical alignment.

This is because the [`middle` alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align#middle) is not calculated in relation to the whole text “block” but to its “x-height”. To learn more, read about [how `vertical-align` works in CSS](https://www.impressivewebs.com/css-vertical-align/).
!!!


### Animated icons

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

## Migrating from Structure

### Choosing the correct icon

When migrating icons from Structure, reference our [mapping of icon names between Structure and Helios](https://github.com/hashicorp/design-system/blob/main/packages/flight-icons/structure-mappings.json).

It’s possible to write codemods to automate this migration. If you’re interested in learning more, contact [#team-design-systems](https://hashicorp.slack.com/archives/C7KTUHNUS) (Internal only).
